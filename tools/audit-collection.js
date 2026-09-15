#!/usr/bin/env node
/**
 * audit-collection.js —— 收录逻辑审计（本体，直接读 data/data.js）
 *
 * 用法：
 *   node tools/audit-collection.js
 *   退出码 0 = 无硬违例；1 = 存在硬违例（可接进 CI / 提交前钩子）
 *
 * 审计四条规则（与 README「收录逻辑硬规则」一节一一对应）：
 *   R1 1 作品 = 1 条目：展会 / 发布会公布的「作品清单」不得成为一个条目
 *   R2 字段缺席语义：console / mobile 的必填字段不许空值
 *   R3 日文段卫生：日文子块（console.* / mobile.*）不得混入「日文里不存在的简体字」
 *   R4 条目 id 唯一
 *
 * 设计要点：R1 的判据只认「结构性证据」，不认标题里的标点 —— 因为
 * 『クロニクル・オブ・エコーズ』『レゾナンス・ペダイズム』这类正经副标题
 * 本身就含「・」「/」。因此 R1 命中一律输出为 **待人工确认**，不直接判错。
 */

const fs = require("fs");
const path = require("path");

const DATA = path.join(__dirname, "..", "data", "data.js");
const src = fs.readFileSync(DATA, "utf8");
const win = {};
new Function("window", src)(win);
const D = win.OBSERVATORY;
const list = D.games;
const pc = g => g.platformClass || "mobile";

let hard = 0;   // 硬违例
let soft = 0;   // 待人工确认
const line = s => console.log(s);

/* ---------- R1：1 作品 = 1 条目 ---------- */
line("=== R1  1 作品 = 1 条目（展会作品清单不得成为条目）===");
line("");

// 结构性证据：条目自称「N 款出展作品」
const COUNT_WORDS = /等\s*\d+\s*[款作]|[0-9]+\s*タイトル|ほか\s*\d+\s*タイトル/;
// 聚合型 id 形态
const AGG_ID = /-tgs-\d{4}$|-tgs-new$|-lineup$|-booth$/;

list.forEach(g => {
  const reasons = [];
  const titleAll = [(g.title || {}).jp || "", (g.title || {}).cn || "", (g.title || {}).en || ""].join(" ");
  const plats = (g.platforms || []).join(" ");

  if (COUNT_WORDS.test(titleAll)) reasons.push("标题自称「等 N 款 / N タイトル」");
  if (COUNT_WORDS.test(plats)) reasons.push("platforms 含「等 N 款」");
  if (AGG_ID.test(g.id)) reasons.push("id 形如展会聚合条目");
  // genre 里直接写「N 款」
  if (/[两二三四五六七八九十0-9]+\s*款/.test(g.genre || "")) reasons.push("genre 以「N 款」为主语");

  if (reasons.length) {
    soft++;
    line("⚠ 待人工确认  " + g.id + "  [" + pc(g) + "]");
    line("    title : " + ((g.title || {}).jp || ""));
    line("    genre : " + (g.genre || ""));
    line("    理由  : " + reasons.join(" / "));
    line("    → 若确为清单，逐款拆条目，清单本身只进 tgs.booths / companies.extra");
    line("");
  }
});

// 副标题含分隔符 ≠ 违例，单独列出击数供人工扫一眼
const slashy = list.filter(g => /[／\/・]/.test((g.title || {}).jp || ""));
line("（参考）标题含并列分隔符的条目 " + slashy.length + " 条 —— 多数是正当副标题，非违例：");
slashy.forEach(g => line("    · " + g.id + " ：「" + g.title.jp + "」"));
line("");

/* ---------- R2：字段缺席语义 ---------- */
line("=== R2  console / mobile 子块必填字段不许空值 ===");
line("");

const announced = g => {
  if (g.platformClass === "console" && /DLC|追加|ダウンロードコンテンツ/i.test(JSON.stringify(g.title))) return false;
  const p = (g.platforms || []).join("");
  return p && p.indexOf("未発表") < 0 && p.indexOf("等") < 0;
};
const isEmpty = v => v == null || (typeof v === "string" && v.trim() === "") || (Array.isArray(v) && v.length === 0);

/* 两个子块并非同构 —— 这是有意为之，不是遗漏：
 *   console 有 stores（买断制要区分パッケージ/DL 与具体商店页）
 *   mobile  有 payment / launch / preReg（手游要区分支付方式与开服日；商店由 distribution 承载）
 */
const SCHEMA = {
  console: {
    req:  ["status", "monetization", "developer", "publisher", "region", "distribution", "features", "synopsis", "ipSource", "series"],
    cond: ["os", "stores"],            // 仅当对应机种已公布
    opt:  ["preOrder", "cast", "caution"]
  },
  mobile: {
    req:  ["status", "os", "monetization", "preReg", "developer", "publisher", "region", "distribution", "features", "synopsis", "ipSource", "series"],
    cond: [],                          // 商店由 distribution 承载，不另设 stores
    opt:  ["cast", "payment", "launch", "caution"]
  }
};

Object.keys(SCHEMA).forEach(sub => {
  const S = SCHEMA[sub];
  let n = 0;
  const blocks = list.filter(g => g[sub]);
  blocks.forEach(g => {
    const need = announced(g) ? S.req.concat(S.cond) : S.req;
    need.forEach(k => {
      if (!(k in g[sub])) { line("MISSING  " + g.id + "." + sub + " → " + k); hard++; n++; return; }
      if (isEmpty(g[sub][k])) { line("EMPTY    " + g.id + "." + sub + " → " + k); hard++; n++; }
    });
    // 契约外的新键 = schema 漂移，必须显式登记（否则下次巡检会悄悄扩散）
    Object.keys(g[sub]).forEach(k => {
      if (S.req.indexOf(k) < 0 && S.cond.indexOf(k) < 0 && S.opt.indexOf(k) < 0) {
        line("EXTRA    " + g.id + "." + sub + " → " + k); hard++; n++;
      }
    });
  });
  line("  " + sub + " 子块数 " + blocks.length + "，问题 " + n + " 处");
});
line("");

/* 已知且已接受的缺口 —— 每次审计显式列出，避免「消失的字段」被当成修好了 */
const KNOWN_GAPS = [
  { id: "alchemist-portmasters",    key: "mobile.cast", why: "官方尚未公布任何声优（已核实，非漏填）" },
  { id: "onepiece-marine-gourmet",  key: "mobile.preReg.since", why: "值存在但为空串，待补具体日期" }
];
line("  —— 已知缺口台账 ——");
KNOWN_GAPS.forEach(g => line("    · " + g.id + " / " + g.key + "：" + g.why));
line("");

/* ---------- R3：日文段卫生 ---------- */
line("=== R3  日文子块不得混入「日文里不存在的简体字」===");
line("");

// 只保留「日语中确实不用」的字。
// 已剔除的假阳性（日语正字，勿再加回）：制 断 那 须 韩 播 点 声 国 号 旧
const SIMP = [
  "价", "发", "开", "关", "为", "东", "乐", "术", "统", "记", "录", "买", "费",
  "译", "网", "页", "备", "标", "题", "图", "优", "级", "线", "团", "币", "带",
  "这", "个", "么", "怀", "广", "场", "议", "谈", "险", "诞", "迹", "预", "约",
  "终", "强", "历", "师", "军", "园", "执", "观", "览", "扩", "换", "无", "显"
];

let r3 = 0;
list.forEach(g => {
  ["console", "mobile"].forEach(sub => {
    if (!g[sub]) return;
    const txt = JSON.stringify(g[sub]);
    const hit = SIMP.filter(ch => txt.indexOf(ch) >= 0);
    if (hit.length) { line("SIMP     " + g.id + "." + sub + " → " + hit.join("")); hard++; r3++; }
  });
});
// 顶层日文字段单列一条（title.jp / companyJp）；顶层中文段（summary・highlight・title.cn・news.source）豁免
list.forEach(g => {
  const txt = [(g.title || {}).jp || "", g.companyJp || ""].join(" ");
  const hit = SIMP.filter(ch => txt.indexOf(ch) >= 0);
  if (hit.length) { line("SIMP     " + g.id + ".title.jp/companyJp → " + hit.join("")); hard++; r3++; }
});
line("  问题 " + r3 + " 处（豁免：summary・highlight・title.cn・news.source 等中文段）");
line("");

/* ---------- R4：id 唯一 ---------- */
line("=== R4  条目 id 唯一 ===");
const seen = {};
let r4 = 0;
list.forEach(g => { if (seen[g.id]) { line("DUP      " + g.id); hard++; r4++; } seen[g.id] = 1; });
line("  重复 " + r4 + " 处");
line("");

/* ---------- 汇总 ---------- */
const cnt = {};
list.forEach(g => { const p = pc(g); cnt[p] = (cnt[p] || 0) + 1; });
line("=== 汇总 ===");
line("  条目总数          " + list.length + "  " + JSON.stringify(cnt));
line("  手游区（mobile+multi） " + list.filter(g => pc(g) === "mobile" || pc(g) === "multi").length);
line("  主机・PC 区       " + list.filter(g => pc(g) !== "mobile").length);
line("  console 子块 " + list.filter(g => g.console).length + " / mobile 子块 " + list.filter(g => g.mobile).length);
line("");
line("  硬违例（R2/R3/R4）：" + hard + (hard === 0 ? "  ✅" : "  ❌"));
line("  待人工确认（R1）：  " + soft + (soft === 0 ? "  ✅" : "  ⚠ 见上"));
line("");

process.exit(hard === 0 ? 0 : 1);
