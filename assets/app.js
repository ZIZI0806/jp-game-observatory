/* ============================================================
   日本ゲーム観測台 — 前端渲染
   ============================================================ */

(function () {
  const D = window.OBSERVATORY;
  if (!D) { document.body.innerHTML = "<p style='padding:40px'>数据未加载 (data/data.js)</p>"; return; }

  /* ---------- 公司配色 ---------- */
  const COMPANY_COLORS = [
    [/GAME FREAK/i,              "#ffcb05"],
    [/GungHo/i,                  "#ff7a45"],
    [/KONAMI/i,                  "#4da3ff"],
    [/Bandai Namco/i,            "#ff6b35"],
    [/COLOPL/i,                  "#7dd3a0"],
    [/Cygames/i,                 "#5b8cff"],
    [/HYPER REAL|産経/i,          "#c084fc"],
    [/松竹/i,                     "#f0a58c"],
    [/Square Enix/i,             "#e0556d"],
    [/ATLUS/i,                   "#ff5c7a"],
    [/Nintendo|任天堂/i,          "#ff5c6c"],
    [/Capcom|カプコン/i,          "#4dd4c0"],
    [/FromSoftware|フロム/i,      "#b8a06a"],
    [/Marvelous|マーベラス/i,     "#ffab5c"],
    [/Falcom|ファルコム/i,        "#8fa9ff"],
    [/LEVEL-5|レベルファイブ/i,   "#ffd166"],
    [/Good Smile|グッドスマイル/i, "#9ad8ff"]
  ];
  const colorOf = (c) => {
    for (const [re, col] of COMPANY_COLORS) if (re.test(c)) return col;
    return "#8b98a9";
  };

  /* ---------- 平台归一化 ---------- */
  const PLAT_RULES = [
    [/Nintendo Switch 2|Switch 2/i, "Switch 2"],
    [/Nintendo Switch(?!\s*2)|\bNSW\b/i, "Switch"],
    [/PS5|PlayStation 5/i, "PS5"],
    [/Xbox/i, "Xbox"],
    [/Steam|Epic|PC/i, "PC"],
    [/iOS|Android/i, "手机"],
    [/Web|浏览器/i, "浏览器"]
  ];
  function normPlatforms(g) {
    const set = new Set();
    g.platforms.forEach(p => {
      for (const [re, name] of PLAT_RULES) if (re.test(p)) { set.add(name); return; }
      set.add(p);
    });
    return [...set];
  }

  /* ---------- 期待度配色 ---------- */
  const hypeColor = (s) => s >= 85 ? "#ff5c7a" : s >= 70 ? "#4dd4c0" : "#8b98a9";

  /* ---------- 工具 ---------- */
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  const fmtDate = (d) => {
    if (!d) return "—";
    const m = String(d).match(/(\d{4})-(\d{2})-(\d{2})/);
    return m ? `${+m[2]}/${+m[3]}` : String(d);
  };
  const fmtDateTime = (iso) => {
    const m = String(iso).match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    return m ? `${m[1]}/${+m[2]}/${+m[3]} ${m[4]}:${m[5]}` : iso;
  };
  const platClass = (p) => /Steam|YouTube/i.test(p) ? "yt"
                        : /^X$/i.test(p) ? "x" : "news";

  /* 日期 → 可比较数值 (YYYYMMDD)。
     announceDate 存在只到月份的写法（如「2026-09」「2026-09（TGS 展出确认）」），
     这类一律按「月初」处理，使其排在同年月内具体日期条目之后——即信息更精确的靠前。 */
  const dateKey = (d) => {
    const m = String(d == null ? "" : d).match(/(\d{4})-(\d{2})(?:-(\d{2}))?/);
    return m ? (+m[1]) * 10000 + (+m[2]) * 100 + (+m[3] || 0) : 0;
  };

  /* ---------- 平台类别判定 ---------- */
  function platformClassOf(g) {
    if (g.platformClass) return g.platformClass;
    const p = (g.platforms || []).join(" ").toLowerCase();
    const hasMobile = /ios|android|ブラウザ|web（|手机/.test(p);
    const hasHD = /switch|ps5|playstation|xbox|steam|epic/.test(p);
    if (hasMobile && !hasHD) return "mobile";
    if (hasMobile && hasHD) return "multi";
    if (/steam|epic|pc/.test(p) && !/switch|ps5|xbox/.test(p)) return "pc";
    return "console";
  }

  /* ---------- 状态 ---------- */
  let state = { tab: "mobile", q: "", platform: "", sort: "fresh", view: "grid" };

  /* ============================================================
     顶栏 / KPI / 综述
     ============================================================ */
  function renderHeader() {
    document.getElementById("metaWindow").textContent = D.meta.window;
    document.getElementById("metaUpdated").textContent = fmtDateTime(D.meta.updatedAt);
    document.getElementById("metaCount").textContent = D.games.length + " 条目";

    const newCount = D.games.filter(g => g.bucket === "new").length;
    const updCount = D.games.filter(g => g.bucket === "update").length;
    const companies = new Set(D.games.map(g => g.company)).size;
    const dated = D.games.filter(g => /^\d{4}-\d{2}-\d{2}/.test(g.release)).length;
    const tgsCount = D.games.filter(g => (g.tags || []).includes("TGS2026")).length;

    const mobAll = D.games.filter(g => isMobileZone(g));
    const crossCount = mobAll.filter(g => isCross(g)).length;
    const consoleAll = D.games.filter(g => platformClassOf(g) !== "mobile");
    document.getElementById("cntMobile").textContent = mobAll.length;
    document.getElementById("cntConsole").textContent = consoleAll.length;

    let covCount = 0;
    if (D.companies) {
      const listed = D.companies.categories.flatMap(c => c.items);
      covCount = listed.filter(x => x.status === "covered").length;
      document.getElementById("cntCompanies").textContent = covCount + "/" + D.companies.listTotal;
    }

    const mobPre = mobAll.filter(g => g.mobile && /事前登録/.test(g.mobile.status || "")).length;
    const mobLive = mobAll.filter(g => g.mobile && /サービス中/.test(g.mobile.status || "")).length;
    const mobVendors = new Set(mobAll.map(g => g.company)).size;

    const kpis = [
      { c: "#ff6b9d", v: mobAll.length, l: "手游条目", s: crossCount ? `含 ${crossCount} 款跨平台作品` : "本期监测到的日本厂商手游" },
      { c: "#4dd4c0", v: mobPre,       l: "事前登录中", s: "未配信、可预约" },
      { c: "#5b8cff", v: mobLive,      l: "已配信",    s: "已正式上线运营" },
      { c: "#ffd166", v: mobVendors,   l: "手游厂商",  s: "手游条目的发行 / 开发方" },
      { c: "#a78bfa", v: consoleAll.length, l: "主机・PC 条目", s: crossCount ? `含 ${crossCount} 款跨平台作品` : "次要监测区" },
      { c: "#7dd3a0", v: covCount + "/" + (D.companies ? D.companies.listTotal : "—"), l: "厂商覆盖", s: "指定 50 家清单已建卡比例" }
    ];
    document.getElementById("kpiRow").innerHTML = kpis.map(k => `
      <div class="kpi" style="--kpi-c:${k.c}">
        <div class="kpi-val" style="color:${k.c}">${k.v}</div>
        <div class="kpi-label">${esc(k.l)}</div>
        <div class="kpi-sub">${esc(k.s)}</div>
      </div>`).join("");
  }

  function renderDigest() {
    const d = D.digest;
    document.getElementById("digestPanel").innerHTML = `
      <h2>${esc(d.headline)}</h2>
      <ul>${d.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul>`;
  }

  function renderSources() {
    document.getElementById("sourcesPanel").innerHTML = `
      <h3>数据源 / SOURCES</h3>
      <div class="source-list">
        ${D.meta.sources.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a>`).join("")}
      </div>`;
  }

  /* ============================================================
     卡片
     ============================================================ */
  /* ============================================================
     主机・PC 卡片（与手游区同精度 · 同款大卡）
     ============================================================ */

  /* 主机・PC 侧的情报规格。字段名与手游侧 mobile 一一对位：
       手 游 侧          主 机 侧
       ─────────────────────────────────────────────
       status            发售状况（発売中 / 発売予定 / 未定）
       os ↔ os           对应机种（= 全平台列表）
       monetization      版本形态与价格（通常版 / 限定版 / DL 专售）
       developer         开发          publisher 发行
       region            发售区域
       distribution      流通方式（パッケージ / ダウンロード）
       stores            对应商店（eShop / PS Store / Steam）
       preReg            preOrder      预约・早期购入特典
       features / synopsis / cast / ipSource / series 同名同义
     尚未补齐 console 块的条目，退化为用既有字段推导；推导不出的维度直接不渲染，
     不写「未発表」占位——避免把「我们还没查到」伪装成「官方尚未发表」。 */
  function consoleSpecOf(g) {
    const c = g.console || {};
    const m = g.mobile || {};
    return {
      status:       c.status || g.release,
      os:           c.os || g.platforms || [],
      monetization: c.monetization || "",
      developer:    c.developer || m.developer || g.company,
      publisher:    c.publisher || m.publisher || "",
      region:       c.region || m.region || "",
      distribution: c.distribution || "",
      stores:       c.stores || [],
      preOrder:     c.preOrder || null,
      features:     c.features || [],
      synopsis:     c.synopsis || "",
      cast:         c.cast || g.voice || "",
      ipSource:     c.ipSource || m.ipSource || "",
      series:       c.series || m.series || ""
    };
  }

  /* 卡片右上角的「存为 JPG」按钮。
     放在卡片顶部而不是底部——卡片很高，放底部会滚到看不见。 */
  const jpgBtn = (g, kind) =>
    `<button class="jpg-btn" data-jpg="${esc(g.id)}" data-kind="${esc(kind)}" title="把这张卡片另存为 JPG 图片">存为 JPG</button>`;

  /* 卡片底部动作条：手游区与主机・PC 区共用同一个函数，
     两个区的卡片才会真正「同款」而不是看起来像。 */
  function cardFootHTML(g) {
    const vids = (g.videos || []).slice(0, 5).map(v =>
      `<a class="link-btn ${linkClass(v.platform)}" href="${esc(v.url)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${esc(v.platform)}</a>`).join("");
    const nw = (g.news || [])[0];
    const nws = nw ? `<a class="link-btn news" href="${esc(nw.url)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">新闻原文</a>` : "";
    return `${vids}${nws}<span class="foot-spacer"></span><button class="more-btn">详情 +</button>`;
  }

  function consoleCardHTML(g) {
    const co = colorOf(g.company);
    const s = consoleSpecOf(g);
    const isNew = g.bucket === "new";

    /* 与手游卡片的 6 行规格逐位对位：配信状況 / 対応OS / 課金形態 /
       開発配信 / 配信地域 / ジャンル → 発売状況 / 対応機種 / 販売形態 /
       開発発売 / 発売区域 / ジャンル */
    const specs = [
      ["発売状況", s.status],
      ["対応機種", (s.os || []).join(" ／ ")],
      ["販売形態", s.monetization],
      ["開発 / 発売", [...new Set([s.developer, s.publisher].filter(Boolean))].join(" ／ ")],
      ["発売区域", s.region],
      ["ジャンル", g.genre]
    ].filter(r => r[1]);

    const preOrder = s.preOrder && s.preOrder.open ? `
      <div class="mob-prereg">
        <div class="mob-prereg-head">
          <span class="prereg-badge">予約受付中</span>
          <span class="prereg-since">${esc(s.preOrder.since || "")} 開始</span>
        </div>
        ${s.preOrder.reward ? `<div class="mob-prereg-body">${esc(s.preOrder.reward)}</div>` : ""}
      </div>` : "";

    const blocks = [];
    if (s.features && s.features.length) blocks.push(`
      <div class="mob-block">
        <div class="mob-block-t">玩法特征</div>
        <ul class="mob-list">${s.features.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
      </div>`);
    if (s.synopsis) blocks.push(`
      <div class="mob-block">
        <div class="mob-block-t">世界观 / 故事</div>
        <p class="mob-text">${esc(s.synopsis)}</p>
      </div>`);
    if (s.cast) blocks.push(`
      <div class="mob-block">
        <div class="mob-block-t">CV 阵容</div>
        <p class="mob-text">${esc(s.cast)}</p>
      </div>`);
    if (s.ipSource || s.series) blocks.push(`
      <div class="mob-block">
        <div class="mob-block-t">IP / 系列背景</div>
        <p class="mob-text">${esc([s.ipSource, s.series].filter(Boolean).join("　·　"))}</p>
      </div>`);

    return `
    <article class="mob-card is-console" data-id="${esc(g.id)}" style="--co:${co};--hs:${hypeColor(g.hype.score)}">
      <div class="mob-rail"></div>
      <div class="mob-main">
        <div class="mob-head">
          <div class="company"><span class="company-dot"></span>${esc(g.company)}</div>
          <div class="mob-head-r">
            ${isCross(g) ? `<span class="cross-tag">跨平台</span>` : ""}
            <span class="bucket-tag ${isNew ? "new" : ""}">${isNew ? "新作发表" : "定档/进展"} · ${esc(fmtDate(g.announceDate))}</span>
            ${jpgBtn(g, "console")}
          </div>
        </div>
        <h3 class="mob-title">${esc(g.title.cn)}</h3>
        <div class="mob-title-sub">
          <span class="mob-jp">${esc(g.title.jp)}</span>
          ${g.title.en && g.title.en !== g.title.jp && g.title.en !== g.title.cn
            ? `<span class="mob-en">${esc(g.title.en)}</span>` : ""}
        </div>

        <div class="mob-specs">
          ${specs.map(r => `<div class="mob-spec">
            <span class="mob-k">${esc(r[0])}</span>
            <span class="mob-v">${esc(r[1])}</span>
          </div>`).join("")}
        </div>

        ${preOrder}

        <p class="mob-summary">${esc(g.summary)}</p>
        ${g.highlight ? `<div class="mob-highlight">${esc(g.highlight)}</div>` : ""}

        <div class="mob-blocks">${blocks.join("")}</div>

        <div class="hype">
          <div class="hype-head">
            <span class="hype-label">全球舆论期待度</span>
            <span class="hype-score">${g.hype.score}<small>/100</small></span>
          </div>
          <div class="hype-bar"><div class="hype-fill" style="width:${g.hype.score}%"></div></div>
        </div>

        <div class="mob-foot">${cardFootHTML(g)}</div>
      </div>
    </article>`;
  }

  /* ============================================================
     过滤
     ============================================================ */
  function baseList() {
    const isMob = state.tab === "mobile";
    return D.games.filter(g => isMob
      ? isMobileZone(g)
      : platformClassOf(g) !== "mobile");
  }

  /* 手游区收录口径：纯手游 + 跨平台（multi）。
     跨平台作品确实能在手机上玩，因此同时出现在手游区与主机・PC 区。 */
  function isMobileZone(g) {
    const c = platformClassOf(g);
    return c === "mobile" || c === "multi";
  }

  /* 是否跨平台（手游区卡片上加徽章提示） */
  function isCross(g) { return platformClassOf(g) === "multi"; }

  function statRank(g) {
    const s = (g.mobile && g.mobile.status) || (g.console && g.console.status) || g.release || "";
    if (/事前登録|予約受付/.test(s)) return 0;
    if (/配信予定|発売予定|未定|未発表/.test(s)) return 1;
    if (/サービス中|開服|已开服|発売中|発売済|已发售/.test(s)) return 2;
    return 3;
  }

  function getFiltered() {
    let list = baseList();

    if (state.q) {
      const q = state.q.toLowerCase();
      list = list.filter(g => [
        g.company, g.companyJp, g.genre,
        g.title.jp, g.title.cn, g.title.en,
        (g.tags || []).join(" "), g.summary, g.release,
        g.mobile ? [g.mobile.developer, g.mobile.publisher, g.mobile.region,
                    g.mobile.ipSource, g.mobile.status, (g.mobile.features || []).join(" ")].join(" ") : "",
        g.console ? [g.console.developer, g.console.publisher, g.console.region, g.console.status,
                     g.console.monetization, g.console.distribution, (g.console.stores || []).join(" "),
                     g.console.ipSource, g.console.series, g.console.cast, g.console.synopsis,
                     (g.console.features || []).join(" ")].join(" ") : ""
      ].join(" ").toLowerCase().includes(q));
    }
    if (state.platform) {
      list = list.filter(g => normPlatforms(g).includes(state.platform));
    }

    /* 最新抓取 = 先比本条目最后一次被抓取的日期（观测台侧时间），
       同一次抓取收录的条目之间再比作品情报日（发表 / 更新日，作品侧时间）。
       两者都取倒序，「最新的排最前」。 */
    const byFresh = (a, b) =>
      (dateKey(b.capturedAt) - dateKey(a.capturedAt)) ||
      (dateKey(b.announceDate) - dateKey(a.announceDate));

    const cmp = {
      fresh:   byFresh,
      hype:    (a, b) => b.hype.score - a.hype.score,
      date:    (a, b) => dateKey(b.announceDate) - dateKey(a.announceDate),
      company: (a, b) => a.company.localeCompare(b.company, "ja"),
      status:  (a, b) => statRank(a) - statRank(b)
    }[state.sort] || byFresh;
    return [...list].sort(cmp);
  }

  /* ============================================================
     手游卡片（重点区 · 多维信息）
     ============================================================ */
  const linkClass = (p) => /YouTube/i.test(p) ? "yt"
                        : /^X$/i.test(p) ? "x"
                        : /App Store|Google Play|Steam/i.test(p) ? "store" : "news";

  function mobileCardHTML(g) {
    const co = colorOf(g.company);
    const m = g.mobile || {};

    const specs = [
      ["配信状況", m.status || g.release],
      ["対応OS", (m.os || g.platforms).join(" ／ ")],
      ["課金形態", m.monetization || "未発表"],
      ["開発 / 配信", m.developer || g.company],
      ["配信地域", m.region || "—"],
      ["ジャンル", g.genre]
    ];
    // 跨平台作品：把完整平台列表也摆出来，避免只写 iOS/Android 造成误解
    if (isCross(g)) specs.splice(1, 0, ["全平台", (g.platforms || []).join(" ／ ")]);

    const prereg = m.preReg && m.preReg.open ? `
      <div class="mob-prereg">
        <div class="mob-prereg-head">
          <span class="prereg-badge">事前登録受付中</span>
          <span class="prereg-since">${esc(m.preReg.since || "")} 開始</span>
        </div>
        ${m.preReg.reward ? `<div class="mob-prereg-body">${esc(m.preReg.reward)}</div>` : ""}
      </div>` : "";

    const blocks = [];
    if (m.features && m.features.length) blocks.push(`
      <div class="mob-block">
        <div class="mob-block-t">玩法特征</div>
        <ul class="mob-list">${m.features.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
      </div>`);
    if (m.synopsis) blocks.push(`
      <div class="mob-block">
        <div class="mob-block-t">世界观 / 故事</div>
        <p class="mob-text">${esc(m.synopsis)}</p>
      </div>`);
    if (m.cast) blocks.push(`
      <div class="mob-block">
        <div class="mob-block-t">角色 / 配音</div>
        <p class="mob-text">${esc(m.cast)}</p>
      </div>`);
    if (m.ipSource || m.series) blocks.push(`
      <div class="mob-block">
        <div class="mob-block-t">IP / 系列背景</div>
        <p class="mob-text">${esc([m.ipSource, m.series].filter(Boolean).join("　·　"))}</p>
      </div>`);

    return `
    <article class="mob-card" data-id="${esc(g.id)}" style="--co:${co};--hs:${hypeColor(g.hype.score)}">
      <div class="mob-rail"></div>
      <div class="mob-main">
        <div class="mob-head">
          <div class="company"><span class="company-dot"></span>${esc(g.company)}</div>
          <div class="mob-head-r">
            ${isCross(g) ? `<span class="cross-tag">跨平台</span>` : ""}
            <span class="mob-date">${esc(fmtDate(g.announceDate))} 发表</span>
            ${jpgBtn(g, "mobile")}
          </div>
        </div>
        <h3 class="mob-title">${esc(g.title.cn)}</h3>
        <div class="mob-title-sub">
          <span class="mob-jp">${esc(g.title.jp)}</span>
          ${g.title.en && g.title.en !== g.title.jp && g.title.en !== g.title.cn
            ? `<span class="mob-en">${esc(g.title.en)}</span>` : ""}
        </div>

        <div class="mob-specs">
          ${specs.map(s => `<div class="mob-spec">
            <span class="mob-k">${esc(s[0])}</span>
            <span class="mob-v">${esc(s[1])}</span>
          </div>`).join("")}
        </div>

        ${prereg}

        <p class="mob-summary">${esc(g.summary)}</p>
        ${g.highlight ? `<div class="mob-highlight">${esc(g.highlight)}</div>` : ""}

        <div class="mob-blocks">${blocks.join("")}</div>

        <div class="hype">
          <div class="hype-head">
            <span class="hype-label">全球舆论期待度</span>
            <span class="hype-score">${g.hype.score}<small>/100</small></span>
          </div>
          <div class="hype-bar"><div class="hype-fill" style="width:${g.hype.score}%"></div></div>
        </div>

        <div class="mob-foot">${cardFootHTML(g)}</div>
      </div>
    </article>`;
  }

  function renderMobile() {
    const list = getFiltered();
    const box = document.getElementById("mobGrid");
    const empty = document.getElementById("mobEmpty");

    const all = baseList();
    const pre = all.filter(g => g.mobile && /事前登録/.test(g.mobile.status || "")).length;
    const live = all.filter(g => g.mobile && /サービス中/.test(g.mobile.status || "")).length;
    const soon = all.length - pre - live;

    document.getElementById("mobileKpi").innerHTML = `
      <div class="mkpi">
        <div class="mkpi-v" style="color:#ff6b9d">${all.length}</div>
        <div class="mkpi-l">手游条目总数</div>
      </div>
      <div class="mkpi">
        <div class="mkpi-v" style="color:#4dd4c0">${pre}</div>
        <div class="mkpi-l">事前登录受理中</div>
      </div>
      <div class="mkpi">
        <div class="mkpi-v" style="color:#5b8cff">${live}</div>
        <div class="mkpi-l">已正式配信</div>
      </div>
      <div class="mkpi">
        <div class="mkpi-v" style="color:#ffab5c">${soon}</div>
        <div class="mkpi-l">配信日未定</div>
      </div>
      <div class="mkpi-note">
        <strong>手游为重点监测区</strong>　以下条目包含配信状况 / 对应 OS / 课金形态 / 开发配信体制 /
        配信地域 / 事前登录 / 玩法特征 / 世界观 / CV 阵容 / IP 系谱共 10 类维度。
      </div>`;

    box.innerHTML = list.map(mobileCardHTML).join("");
    empty.hidden = list.length > 0;
    bindCards(box, list, "mobile");
  }

  /* ============================================================
     主机・PC 卡片（次要区）
     ============================================================ */
  function renderGrid() {
    const list = getFiltered();
    const box = document.getElementById("grid");
    const empty = document.getElementById("emptyState");
    const all = baseList();

    /* 主机・PC 区 KPI：与手游区同构，指标换成主机侧语义 */
    const stOf = (g) => consoleSpecOf(g).status || "";
    const out   = all.filter(g => /已发售|発売中|発売済/.test(stOf(g))).length;
    const undec = all.filter(g => /未定|未発表/.test(stOf(g))).length;
    const fixed = all.length - out - undec;
    const vendors = new Set(all.map(g => g.company)).size;

    const kpi = document.getElementById("consoleKpi");
    if (kpi) {
      kpi.className = "mobile-kpi console-kpi";
      kpi.innerHTML = `
      <div class="mkpi">
        <div class="mkpi-v" style="color:#a78bfa">${all.length}</div>
        <div class="mkpi-l">主机・PC 条目总数</div>
      </div>
      <div class="mkpi">
        <div class="mkpi-v" style="color:#5b8cff">${fixed}</div>
        <div class="mkpi-l">已定发售档期</div>
      </div>
      <div class="mkpi">
        <div class="mkpi-v" style="color:#4dd4c0">${out}</div>
        <div class="mkpi-l">已发售 / 在售</div>
      </div>
      <div class="mkpi">
        <div class="mkpi-v" style="color:#ffab5c">${undec}</div>
        <div class="mkpi-l">发售日未定</div>
      </div>
      <div class="mkpi">
        <div class="mkpi-v" style="color:#ffd166">${vendors}</div>
        <div class="mkpi-l">涉及厂商</div>
      </div>
      <div class="mkpi-note">
        <strong>主机・PC 区已与手游区同精度</strong>　以下条目包含发售状况 / 对应机种 / 版本与价格 /
        开发发行体制 / 发售区域 / 预约特典 / 玩法特征 / 世界观 / CV 阵容 / IP 系谱共 10 类维度。
      </div>`;
    }

    box.className = "mob-grid" + (state.view === "list" ? " compact" : "");
    box.innerHTML = list.map(consoleCardHTML).join("");
    empty.hidden = list.length > 0;
    bindCards(box, list, "console");
  }

  /* ============================================================
     厂商覆盖名单
     ============================================================ */
  const STATUS_META = {
    covered: { label: "已建卡", cls: "covered" },
    partial: { label: "部分覆盖", cls: "partial" },
    watch:   { label: "待观察", cls: "watch" }
  };

  function companyCard(x) {
    const st = STATUS_META[x.status] || STATUS_META.watch;
    const games = (x.gameIds || []).map(id => D.games.find(g => g.id === id)).filter(Boolean);
    const clickable = games.length > 0;

    return `
      <div class="co-card ${clickable ? "clickable" : ""}" data-status="${x.status}" ${clickable ? `data-games="${x.gameIds.join(",")}"` : ""}>
        <div class="co-head">
          <span class="co-dot"></span>
          <span class="co-name">${esc(x.name)}</span>
          ${x.focus ? `<span class="co-focus">本职相关</span>` : ""}
          <span class="co-badge ${st.cls}">${st.label}</span>
        </div>
        <div class="co-sub">
          <span class="co-short">${esc(x.short)}</span>
          ${games.length ? `<span class="co-count">${games.length} 条作品 · 点击展开</span>` : ""}
        </div>
        ${x.note ? `<div class="co-note">${esc(x.note)}</div>` : ""}
        ${clickable ? `<div class="co-games" hidden>
          ${games.map(g => `<button class="co-game" data-gid="${esc(g.id)}">
            <span class="co-game-rail" style="background:${colorOf(g.company)}"></span>
            <span class="co-game-t">${esc(g.title.cn)}</span>
            <span class="co-game-h" style="color:${hypeColor(g.hype.score)}">${g.hype.score}</span>
          </button>`).join("")}
        </div>` : ""}
      </div>`;
  }

  function renderCompanies() {
    const C = D.companies;
    if (!C) return;
    const listed = C.categories.flatMap(c => c.items);
    const cov = listed.filter(x => x.status === "covered").length;
    const par = listed.filter(x => x.status === "partial").length;
    const wat = listed.filter(x => x.status === "watch").length;
    const pct = (cov / C.listTotal * 100).toFixed(0);

    const stat = [
      { c: "var(--accent)", v: C.listTotal, l: "指定清单厂商" },
      { c: "#4dd4c0", v: cov, l: "已建作品卡" },
      { c: "#ffab5c", v: par, l: "部分覆盖" },
      { c: "#6b7a90", v: wat, l: "待观察" },
      { c: "#5b8cff", v: C.extra.items.length, l: "清单外补充" }
    ];

    document.getElementById("panelCompanies").innerHTML = `
      <div class="co-summary">
        <div class="co-summary-l">
          <h2>厂商监测覆盖状态</h2>
          <p>按指定清单建档　·　统计时点 ${esc(C.asOf)}</p>
          <div class="co-progress">
            <div class="co-progress-bar"><div class="co-progress-fill" style="width:${pct}%"></div></div>
            <span class="co-progress-num">${cov} / ${C.listTotal}　${pct}%</span>
          </div>
        </div>
        <div class="co-stats">
          ${stat.map(s => `<div class="co-stat">
            <div class="co-stat-v" style="color:${s.c}">${s.v}</div>
            <div class="co-stat-l">${esc(s.l)}</div>
          </div>`).join("")}
        </div>
      </div>

      ${C.categories.map(cat => `
        <section class="co-group">
          <div class="co-group-head">
            <h3>${esc(cat.label)}</h3>
            ${cat.sub ? `<span>${esc(cat.sub)}</span>` : ""}
            <span class="co-group-n">${cat.items.length} 社</span>
          </div>
          <div class="co-grid">${cat.items.map(companyCard).join("")}</div>
        </section>`).join("")}

      <section class="co-group">
        <div class="co-group-head">
          <h3>${esc(C.extra.label)}</h3>
          <span>${esc(C.extra.note)}</span>
          <span class="co-group-n">${C.extra.items.length} 社</span>
        </div>
        <div class="co-grid">${C.extra.items.map(companyCard).join("")}</div>
      </section>`;

    const panel = document.getElementById("panelCompanies");
    panel.addEventListener("click", (e) => {
      const card = e.target.closest(".co-card.clickable");
      if (card && !e.target.closest(".co-game")) {
        const box = card.querySelector(".co-games");
        if (box) box.hidden = !box.hidden;
        card.classList.toggle("open", box && !box.hidden);
        return;
      }
      const btn = e.target.closest(".co-game");
      if (btn) { e.stopPropagation(); openDrawer(btn.dataset.gid); }
    });
  }

  /* ============================================================
     期待榜
     ============================================================ */
  function renderWanted() {
    const w = D.mostWanted;
    const max = Math.max(...w.list.map(x => x.votes));
    document.getElementById("panelWanted").innerHTML = `
      <div class="wanted-wrap">
        <div class="wanted-head">
          <div>
            <h2>Famitsu 读者期待榜 TOP</h2>
            <p>统计时点 ${esc(w.asOf)}　·　来源 ${esc(w.source)}</p>
            <p style="margin-top:4px">榜单含少量非日本厂商作品（如 GTA6），本观测台仅为本国厂商条目建立作品卡。</p>
          </div>
          <a href="${esc(w.url)}" target="_blank" rel="noopener">查看原始榜单 →</a>
        </div>
        ${w.list.map(x => `
          <div class="wanted-row">
            <div class="wanted-rank">${x.rank}</div>
            <div class="wanted-name">${esc(x.title)}</div>
            <div class="wanted-plat">${esc(x.platform)}</div>
            <div class="wanted-votes">
              <div class="wanted-vbar"><div class="wanted-vfill" style="width:${(x.votes / max * 100).toFixed(1)}%"></div></div>
              <div class="wanted-vnum">${x.votes}</div>
            </div>
          </div>`).join("")}
      </div>`;
  }

  /* ============================================================
     TGS
     ============================================================ */
  function renderTgs() {
    const t = D.tgs;
    document.getElementById("panelTgs").innerHTML = `
      <div class="tgs-hero">
        <h2>東京ゲームショウ 2026 — 30 周年纪念展</h2>
        <div class="tgs-meta">
          <div>会期　<b>${esc(t.dates)}</b></div>
          <div>会场　<b>${esc(t.venue)}</b></div>
          <div>主题　<b>${esc(t.theme)}</b></div>
        </div>
        <p class="tgs-note">${esc(t.note)}</p>
      </div>
      <div class="booth-grid">
        ${t.booths.map(b => `
          <div class="booth">
            <div class="booth-top">
              <div class="booth-name">${esc(b.company)}</div>
              <div class="booth-hall">${esc(b.hall)}</div>
            </div>
            <div class="booth-items">${esc(b.items)}</div>
          </div>`).join("")}
      </div>`;
  }

  /* 卡片事件：点卡片开抽屉，点「存为 JPG」导出该卡（需阻止冒泡，否则会同时开抽屉） */
  function bindCards(box, list, kind) {
    const byId = {};
    (list || []).forEach(g => { byId[g.id] = g; });
    box.querySelectorAll(".mob-card").forEach(el => {
      el.addEventListener("click", () => openDrawer(el.dataset.id));
    });
    box.querySelectorAll(".jpg-btn").forEach(b => {
      b.addEventListener("click", e => {
        e.stopPropagation();
        const card = b.closest(".mob-card");
        const g = byId[b.dataset.jpg] || (card ? byId[card.dataset.id] : null);
        saveJpg(g, b.dataset.kind || kind || "console", b);
      });
    });
  }

  /* ============================================================
     抽屉详情
     ============================================================ */
  function openDrawer(id) {
    const g = D.games.find(x => x.id === id);
    if (!g) return;
    const co = colorOf(g.company);

    let mobileSection = "";
    if (g.mobile) {
      const m = g.mobile;
      const rows = [
        ["配信状況", m.status],
        ["対応OS", (m.os || g.platforms).join(" ／ ")],
        ["課金形態", m.monetization],
        ["開発", m.developer],
        ["配信", m.publisher],
        ["配信地域", m.region],
        ["配信方式", m.distribution],
        ["決済手段", m.payment ? m.payment.join(" ／ ") : null],
        ["IP 出处", m.ipSource],
        ["系列背景", m.series]
      ].filter(r => r[1]);

      mobileSection = `
      <div class="d-section d-mobile">
        <h4>手游情报 · Mobile Spec</h4>
        <div class="d-grid">
          ${rows.map(r => `<div class="d-cell"><div class="k">${esc(r[0])}</div><div class="v">${esc(r[1])}</div></div>`).join("")}
        </div>
        ${m.preReg && m.preReg.open ? `<div class="d-prereg">
          <div class="d-prereg-t">事前登录进行中<span>${esc(m.preReg.since || "")} 开始</span></div>
          <div class="d-prereg-b">${esc(m.preReg.reward || "")}</div>
        </div>` : ""}
        ${m.features && m.features.length ? `<div class="d-sub">
          <div class="d-sub-t">玩法特征</div>
          <ul class="d-list">${m.features.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
        </div>` : ""}
        ${m.synopsis ? `<div class="d-sub"><div class="d-sub-t">世界观 / 故事</div>
          <p class="d-summary">${esc(m.synopsis)}</p></div>` : ""}
        ${m.cast ? `<div class="d-sub"><div class="d-sub-t">角色 / 配音</div>
          <p class="d-summary">${esc(m.cast)}</p></div>` : ""}
      </div>`;
    }

    let consoleSection = "";
    if (g.console) {
      const s = consoleSpecOf(g);
      const rows = [
        ["発売状況", s.status],
        ["対応機種", (s.os || []).join(" ／ ")],
        ["販売形態 / 価格", s.monetization],
        ["開発", s.developer],
        ["発売", s.publisher],
        ["発売区域", s.region],
        ["流通方式", s.distribution],
        ["対応ストア", s.stores.join(" ／ ")],
        ["IP 出处", s.ipSource],
        ["系列背景", s.series]
      ].filter(r => r[1]);

      consoleSection = `
      <div class="d-section d-mobile d-console">
        <h4>主机・PC 情报 · Console Spec</h4>
        <div class="d-grid">
          ${rows.map(r => `<div class="d-cell"><div class="k">${esc(r[0])}</div><div class="v">${esc(r[1])}</div></div>`).join("")}
        </div>
        ${s.preOrder && s.preOrder.open ? `<div class="d-prereg">
          <div class="d-prereg-t">预约受理中<span>${esc(s.preOrder.since || "")} 开始</span></div>
          <div class="d-prereg-b">${esc(s.preOrder.reward || "")}</div>
        </div>` : ""}
        ${s.features && s.features.length ? `<div class="d-sub">
          <div class="d-sub-t">玩法特征</div>
          <ul class="d-list">${s.features.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
        </div>` : ""}
        ${s.synopsis ? `<div class="d-sub"><div class="d-sub-t">世界观 / 故事</div>
          <p class="d-summary">${esc(s.synopsis)}</p></div>` : ""}
        ${s.cast ? `<div class="d-sub"><div class="d-sub-t">CV 阵容</div>
          <p class="d-summary">${esc(s.cast)}</p></div>` : ""}
      </div>`;
    }

    document.getElementById("drawer").innerHTML = `
      <button class="drawer-close" id="drawerClose">✕</button>
      <div class="d-inner" id="drawerBody">
      <div class="d-company" style="--co:${co};color:${co}">${esc(g.company)}</div>
      <h2>${esc(g.title.cn)}</h2>
      <div class="d-en">${esc(g.title.jp)}${g.title.en && g.title.en !== g.title.jp ? " ／ " + esc(g.title.en) : ""}</div>

      <div class="d-actions"><button class="jpg-btn" id="drawerJpg" title="把这份详情另存为 JPG 图片">存为 JPG（整页详情）</button></div>

      <div class="d-section">
        <h4>基本信息</h4>
        <div class="d-grid">
          <div class="d-cell"><div class="k">公司（日文名）</div><div class="v">${esc(g.companyJp)}</div></div>
          <div class="d-cell"><div class="k">类型</div><div class="v">${esc(g.genre)}</div></div>
          <div class="d-cell"><div class="k">平台</div><div class="v">${g.platforms.map(esc).join(" / ")}</div></div>
          <div class="d-cell"><div class="k">发售</div><div class="v">${esc(g.release)}</div></div>
          <div class="d-cell"><div class="k">发表 / 更新日</div><div class="v">${esc(g.announceDate)}</div></div>
          <div class="d-cell"><div class="k">资料抓取日</div><div class="v">${esc(g.capturedAt || "—")}</div></div>
          <div class="d-cell"><div class="k">全球舆论期待度</div><div class="v" style="color:${hypeColor(g.hype.score)};font-family:var(--mono);font-weight:600">${g.hype.score} / 100</div></div>
        </div>
      </div>

      ${mobileSection}
      ${consoleSection}

      <div class="d-section">
        <h4>内容摘要</h4>
        <p class="d-summary">${esc(g.summary)}</p>
      </div>

      ${g.highlight ? `<div class="d-section"><h4>要点</h4><p class="d-summary">${esc(g.highlight)}</p></div>` : ""}
      ${g.voice ? `<div class="d-section"><h4>配音</h4><p class="d-summary">${esc(g.voice)}</p></div>` : ""}

      <div class="d-section">
        <h4>期待度评估依据</h4>
        <ul class="d-list">${g.hype.signals.map(s => `<li>${esc(s)}</li>`).join("")}</ul>
      </div>

      ${(g.news || []).length ? `
      <div class="d-section">
        <h4>新闻原文 / 参考来源</h4>
        <div class="d-links">
          ${g.news.map(n => `<a class="d-link" href="${esc(n.url)}" target="_blank" rel="noopener">
            <span class="d-plat">NEWS</span>
            <span class="d-txt">${esc(n.source)}</span>
            <span class="d-arrow">↗</span></a>`).join("")}
        </div>
      </div>` : ""}

      ${(g.videos || []).length ? `
      <div class="d-section">
        <h4>实机 / 预告 / 官方渠道</h4>
        <div class="d-links">
          ${g.videos.map(v => `<a class="d-link" href="${esc(v.url)}" target="_blank" rel="noopener">
            <span class="d-plat">${esc(v.platform)}</span>
            <span class="d-txt">${esc(v.label)}</span>
            <span class="d-arrow">↗</span></a>`).join("")}
        </div>
      </div>` : ""}

      ${g.caution ? `<div class="d-caution">⚠ ${esc(g.caution)}</div>` : ""}

      <div class="d-section">
        <h4>标签</h4>
        <div class="card-meta">${(g.tags || []).map(t => `<span class="chip">${esc(t)}</span>`).join("")}</div>
      </div>
      </div>`;

    document.getElementById("drawer").hidden = false;
    document.getElementById("drawerMask").hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("drawerClose").addEventListener("click", closeDrawer);
    document.getElementById("drawerJpg").addEventListener("click", () =>
      saveJpg(g, "drawer", document.getElementById("drawerJpg")));
    document.getElementById("drawer").scrollTop = 0;
  }

  function closeDrawer() {
    document.getElementById("drawer").hidden = true;
    document.getElementById("drawerMask").hidden = true;
    document.body.style.overflow = "";
  }

  /* ============================================================
     卡片 / 详情 → JPG（Canvas 2D 直接绘制 · 零外部依赖）

     ⚠️ 为什么不用「DOM → <svg><foreignObject> → <img> → canvas」：
        把图片绘进 canvas 之后 Chrome 判定画布被污染，
        toBlob() 直接抛 "Tainted canvases may not be exported"。
        换句话说那条路在浏览器里根本走不通，不是配置问题。
        改成自己用 Canvas 2D 逐笔画：没有图片来源，就不存在污染，
        file:// 与线上（GitHub Pages）表现一致。

     布局与绘制分离：layoutSheet() 只产出「画什么」的模型（纯函数，
     可以在没有 canvas 的环境里用假测量函数单测），drawSheet() 才碰真实 canvas。
     ============================================================ */
  const SHEET = {
    W: 900, PAD: 40, BOT: 30, PANEL_R: 16,
    FONT: '"Segoe UI","Microsoft YaHei",Meiryo,sans-serif',
    t: {
      bg: "#0a0e15", panel: "#111722", soft: "#0d1119", track: "#151c29", line: "#1e2836",
      text: "#e3ebf5", dim: "#93a2b8", faint: "#5d6c81",
      teal: "#4dd4c0", hot: "#ff6b9d", warm: "#ffab5c", gold: "#ffd166",
      blue: "#5b8cff", violet: "#a78bfa"
    }
  };
  const SF = (size, weight) => (weight || 400) + " " + size + "px " + SHEET.FONT;

  function jpgFilename(g) {
    const t = (g.title && (g.title.cn || g.title.jp)) || g.id || "card";
    const safe = String((g.company || "") + "_" + t)
      .replace(/[\\/:*?"<>|]+/g, "_").replace(/\s+/g, " ").trim().slice(0, 78);
    return "观测台_" + safe + "_" + (g.capturedAt || "") + ".jpg";
  }

  function toast(msg, ok) {
    const el = document.createElement("div");
    el.setAttribute("style",
      "position:fixed;left:50%;bottom:26px;transform:translateX(-50%);z-index:200;"
      + "padding:10px 18px;border-radius:10px;font-size:12.5px;line-height:1.65;max-width:min(620px,88vw);"
      + "background:" + (ok ? "rgba(77,212,192,.14)" : "rgba(255,92,122,.16)") + ";"
      + "border:1px solid " + (ok ? "rgba(77,212,192,.45)" : "rgba(255,92,122,.5)") + ";"
      + "color:" + (ok ? "#4dd4c0" : "#ff8fa3") + ";"
      + "font-family:" + SHEET.FONT + ";box-shadow:0 12px 34px rgba(0,0,0,.5);");
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), ok ? 3000 : 9000);
  }

  /* ---------- 文本度量与折行 ---------- */
  /* 没有 canvas 的环境（jsdom 冒烟测试）用的兜底度量：中日文按 1 em，其余 0.55 em */
  function fallbackMeasure(text, font) {
    const m = String(font).match(/([\d.]+)px/);
    const size = m ? parseFloat(m[1]) : 14;
    let w = 0;
    for (const ch of String(text)) w += /[\u2E80-\u9FFF\uFF00-\uFFEF]/.test(ch) ? size : size * 0.55;
    return w;
  }

  /* 折行：中日文逐字断，行首避头点 */
  const NO_HEAD = "）』」】》〉”’、。，．：；！？!?,:;%…ー～";
  function wrapText(s, maxw, font, measure) {
    const src = String(s == null ? "" : s);
    const lines = [];
    let line = "";
    for (let i = 0; i < src.length; i++) {
      const ch = src.charAt(i);
      if (ch === "\n") { lines.push(line); line = ""; continue; }
      if (line && measure(line + ch, font) > maxw) {
        if (NO_HEAD.indexOf(ch) >= 0 && line.length > 1) {
          lines.push(line.slice(0, -1));
          line = line.slice(-1) + ch;
        } else { lines.push(line); line = ch; }
      } else line += ch;
    }
    if (line || !lines.length) lines.push(line);
    return lines;
  }

  /* 单行放不下：先降字号（30 → 10），仍放不下再截断加省略号 */
  function fitLine(s, maxw, size, weight, measure) {
    let text = String(s == null ? "" : s);
    for (let sz = size; sz >= 10; sz -= 0.5) {
      const f = SF(sz, weight);
      if (measure(text, f) <= maxw) return { s: text, font: f };
    }
    const f = SF(10, weight);
    while (text.length > 1 && measure(text + "…", f) > maxw) text = text.slice(0, -1);
    return { s: text + "…", font: f };
  }

  /* ---------- 两套规格（与卡片 / 抽屉同标签） ---------- */
  /* 手游侧兜底链与 mobileCardHTML 一致；字段为空则该行不出现——
     不写「未発表」占位，避免把「我们还没查到」伪装成「官方尚未发表」。 */
  function mobileSpecOf(g) {
    const m = g.mobile || {};
    return {
      status: m.status || g.release,
      os: m.os || g.platforms || [],
      monetization: m.monetization,
      developer: m.developer || g.company,
      publisher: m.publisher,
      region: m.region,
      distribution: m.distribution,
      payment: m.payment || [],
      ipSource: m.ipSource,
      series: m.series,
      features: m.features || [],
      synopsis: m.synopsis || "",
      cast: m.cast || g.voice
    };
  }

  /* kind 决定出哪一套：
     mobile  → 只出手游规格（与手游卡恒定出行一致）
     console → 只出主机规格（与主机卡恒定出行一致）
     drawer  → 有哪套出哪套（与 openDrawer 的 if (g.mobile) / if (g.console) 一致） */
  function sheetSpecGroups(g, kind) {
    const out = [];
    if (kind === "mobile" || (kind === "drawer" && g.mobile)) {
      const m = mobileSpecOf(g);
      const rows = [
        ["配信状況", m.status],
        ["対応OS", (m.os || []).join(" ／ ")],
        ["課金形態", m.monetization],
        ["開発 / 配信", [...new Set([m.developer, m.publisher].filter(Boolean))].join(" ／ ")],
        ["配信地域", m.region],
        ["配信方式", m.distribution],
        ["決済手段", (m.payment || []).join(" ／ ")],
        ["IP 出处", m.ipSource],
        ["系列背景", m.series],
        ["ジャンル", g.genre]
      ];
      if (isCross(g)) rows.splice(1, 0, ["全平台", (g.platforms || []).join(" ／ ")]);
      out.push({ kind: "mobile", title: "手游情报 · Mobile Spec", rows: rows.filter(r => r[1]) });
    }
    if (kind === "console" || (kind === "drawer" && g.console)) {
      const c = consoleSpecOf(g);
      out.push({ kind: "console", title: "主机・PC 情报 · Console Spec", rows: [
        ["発売状況", c.status],
        ["対応機種", (c.os || []).join(" ／ ")],
        ["販売形態 / 価格", c.monetization],
        ["開発 / 発売", [...new Set([c.developer, c.publisher].filter(Boolean))].join(" ／ ")],
        ["発売区域", c.region],
        ["流通方式", c.distribution],
        ["対応ストア", c.stores.join(" ／ ")],
        ["ジャンル", g.genre],
        ["IP 出处", c.ipSource],
        ["系列背景", c.series]
      ].filter(r => r[1]) });
    }
    return out;
  }

  /* ---------- 布局（纯数据模型，不碰 canvas） ---------- */
  function layoutSheet(g, kind, measure) {
    const T = SHEET.t, W = SHEET.W, PAD = SHEET.PAD;
    const x0 = PAD + 30, iw = W - (PAD + 30) * 2, xr = W - PAD - 30;
    const co = colorOf(g.company);
    const hs = hypeColor(g.hype ? g.hype.score : 0);
    const M = { w: W, h: 0, bg: T.bg, rects: [], texts: [], rules: [], bars: [] };
    const put = (x, y, s, font, color, align) =>
      M.texts.push({ x: x, y: y, s: s, font: font, color: color, align: align || "left" });
    const fit = (x, y, s, size, weight, color, maxw, align) => {
      const r = fitLine(s, maxw, size, weight, measure);
      put(x, y, r.s, r.font, color, align);
    };
    let y = PAD + 40;

    // ① 顶栏：厂商 + 分区·发表日
    fit(x0, y, String(g.company || "").toUpperCase(), 13, 700, co, iw * 0.55);
    fit(xr, y + 1, (g.bucket === "new" ? "新作发表" : "定档/进展") + " · " + (g.announceDate || "—"),
        12, 600, T.faint, iw * 0.42, "right");
    y += 34;

    // ② 标题
    fit(x0, y, g.title.cn || g.title.jp || g.id, 30, 700, T.text, iw);
    y += 42;
    const sub = [g.title.jp, (g.title.en && g.title.en !== g.title.jp && g.title.en !== g.title.cn) ? g.title.en : ""]
      .filter(Boolean).join(" ／ ");
    if (sub) { fit(x0, y, sub, 15, 400, T.faint, iw); y += 24; }

    // ③ 徽章行：类型 / 平台 / 发售日（自动换行）
    y += 12;
    (function chips() {
      const list = [{ s: g.genre, k: "g" }]
        .concat(normPlatforms(g).map(p => ({ s: p, k: "plat" })))
        .concat([{ s: "发售 " + (g.release || "—"), k: "date" }])
        .filter(c => c.s);
      let cx = x0, cy = y;
      list.forEach(c => {
        const f = SF(12.5, 500);
        const cw = measure(c.s, f) + 22;
        if (cx > x0 && cx + cw > x0 + iw) { cx = x0; cy += 34; }
        M.rects.push({ x: cx, y: cy, w: cw, h: 26, r: 7, fill: T.soft,
                       stroke: c.k === "plat" ? "rgba(91,140,255,.34)" : c.k === "date" ? "rgba(77,212,192,.34)" : T.line });
        put(cx + 11, cy + 6.5, c.s, f, c.k === "plat" ? T.blue : c.k === "date" ? T.teal : T.dim);
        cx += cw + 8;
      });
      y = cy + 26;
    })();

    // ④ 规格网格（3 列 × 若干行）
    sheetSpecGroups(g, kind).forEach(gr => {
      y += 22;
      put(x0, y, gr.title, SF(11.5, 700), gr.kind === "mobile" ? T.hot : T.violet);
      y += 19;
      M.rules.push({ x: x0, y: y, w: iw });
      y += 13;
      const cols = 3, gap = 12, cw = (iw - gap * (cols - 1)) / cols, chh = 58;
      gr.rows.forEach((r, i) => {
        const cx = x0 + (i % cols) * (cw + gap);
        const cy = y + Math.floor(i / cols) * (chh + gap);
        M.rects.push({ x: cx, y: cy, w: cw, h: chh, r: 9, fill: T.soft, stroke: T.line });
        const kf = fitLine(r[0], cw - 26, 10.5, 400, measure);
        const vf = fitLine(r[1], cw - 26, 13, 500, measure);
        put(cx + 13, cy + 11, kf.s, kf.font, T.faint);
        put(cx + 13, cy + 30, vf.s, vf.font, T.text);
      });
      y += Math.ceil(gr.rows.length / cols) * (chh + gap) - gap;
    });

    // ⑤ 事前登录 / 预约特典
    const pre = (g.mobile && g.mobile.preReg && g.mobile.preReg.open) ? { d: g.mobile.preReg, badge: "事前登録受付中" }
              : (g.console && g.console.preOrder && g.console.preOrder.open) ? { d: g.console.preOrder, badge: "予約受付中" }
              : null;
    if (pre) {
      const lines = String(pre.d.reward || "").trim() ? wrapText(pre.d.reward, iw - 32, SF(13), measure) : [];
      const bh = 44 + (lines.length ? lines.length * 22 + 10 : 0);
      y += 20;
      M.rects.push({ x: x0, y: y, w: iw, h: bh, r: 10, fill: "rgba(77,212,192,.07)", stroke: "rgba(77,212,192,.34)" });
      put(x0 + 16, y + 13, pre.badge, SF(13, 700), T.teal);
      if (pre.d.since) put(xr - 16, y + 14, pre.d.since + " 開始", SF(11), T.faint, "right");
      lines.forEach((ln, i) => put(x0 + 16, y + 42 + i * 22, ln, SF(13), T.dim));
      y += bh;
    }

    // ⑥ 内容摘要（完整，不截断）
    y += 24;
    put(x0, y, "内容摘要", SF(11.5, 700), T.faint);
    y += 22;
    const sumF = SF(15), sumLines = wrapText(g.summary || "", iw, sumF, measure);
    sumLines.forEach((ln, i) => put(x0, y + i * 27, ln, sumF, T.dim));
    y += sumLines.length * 27;

    // ⑦ 要点
    if (g.highlight) {
      const hf = SF(13.5), hl = wrapText(g.highlight, iw - 30, hf, measure);
      const hh = hl.length * 23 + 22;
      y += 16;
      M.rects.push({ x: x0, y: y, w: iw, h: hh, r: 0, fill: "rgba(167,139,250,.08)" });
      M.rects.push({ x: x0, y: y, w: 3, h: hh, r: 0, fill: "rgba(167,139,250,.6)" });
      hl.forEach((ln, i) => put(x0 + 16, y + 11 + i * 23, ln, hf, T.dim));
      y += hh;
    }

    // ⑧ 情报区块。卡片导出只用本区那一套；抽屉两套都看，先有先取。
    const SRC = kind === "mobile" ? [mobileSpecOf(g)]
              : kind === "console" ? [consoleSpecOf(g)]
              : [mobileSpecOf(g), consoleSpecOf(g)];
    const pick = (k) => {
      for (const o of SRC) { const v = o[k]; if (Array.isArray(v) ? v.length : v) return v; }
      return Array.isArray(SRC[0][k]) ? [] : "";
    };
    const blocks = [];
    const feats = pick("features");
    if (feats.length) blocks.push({ t: "玩法特征", list: feats });
    if (pick("synopsis")) blocks.push({ t: "世界观 / 故事", text: pick("synopsis") });
    if (pick("cast")) blocks.push({ t: "CV 阵容 / 角色配音", text: pick("cast") });
    const ipTxt = [pick("ipSource"), pick("series")].filter(Boolean).join("　·　");
    if (ipTxt) blocks.push({ t: "IP / 系列背景", text: ipTxt });
    blocks.forEach(b => {
      y += 24;
      put(x0, y, b.t, SF(11.5, 700), T.faint);
      y += 18;
      M.rules.push({ x: x0, y: y, w: iw });
      y += 13;
      const bf = SF(13.5);
      if (b.list) {
        b.list.forEach(it => {
          const lines = wrapText(it, iw - 18, bf, measure);
          put(x0, y + 1, "·", SF(13.5, 700), T.teal);
          lines.forEach((ln, i) => put(x0 + 18, y + i * 23, ln, bf, T.dim));
          y += lines.length * 23 + 7;
        });
      } else {
        const lines = wrapText(b.text, iw, bf, measure);
        lines.forEach((ln, i) => put(x0, y + i * 23, ln, bf, T.dim));
        y += lines.length * 23;
      }
    });

    // ⑨ 期待度
    y += 26;
    M.rules.push({ x: x0, y: y, w: iw });
    y += 15;
    put(x0, y + 3, "全球舆论期待度", SF(11.5, 700), T.faint);
    put(xr, y, String((g.hype || {}).score) + " / 100", SF(19, 700), hs, "right");
    y += 32;
    const score = Math.max(0, Math.min(100, (g.hype || {}).score || 0));
    M.bars.push({ x: x0, y: y, w: iw, h: 6, r: 3, fill: T.track });
    M.bars.push({ x: x0, y: y, w: iw * score / 100, h: 6, r: 3, fill: hs });

    // ⑩ 脚注（出处与口径）
    y += 30;
    M.rules.push({ x: x0, y: y, w: iw });
    y += 13;
    const srcs = (g.news || []).slice(0, 3).map(n => n.source).join("　·　");
    const vids = (g.videos || []).slice(0, 4).map(v => v.platform).join(" / ");
    [
      "日本ゲーム観測台（每日自动巡检）　·　资料抓取日 " + (g.capturedAt || "—") + "　·　发表 / 更新日 " + (g.announceDate || "—"),
      "来源：" + (srcs || "—") + (vids ? "　·　影像 / 官方渠道：" + vids : ""),
      "期待度为公开信号定性综合评估（日本侧期待榜 / 全球媒体覆盖 / 社媒与预告片声量），非平台真实流量数据。"
    ].forEach(line => {
      const ls = wrapText(line, iw, SF(11.5), measure);
      ls.forEach((ln, i) => put(x0, y + i * 19, ln, SF(11.5), T.faint));
      y += ls.length * 19 + 5;
    });

    // ⑪ 面板与顶部色条：垫在最底层，必须插到内容前面
    const panelH = y - PAD + 34;
    M.rects.splice(0, 0, { x: PAD, y: PAD, w: W - PAD * 2, h: panelH, r: SHEET.PANEL_R, fill: T.panel, stroke: T.line });
    M.rects.splice(1, 0, { x: PAD + 16, y: PAD + 1, w: W - PAD * 2 - 32, h: 6, r: 3, fill: co });
    M.h = PAD + panelH + SHEET.BOT;
    return M;
  }

  /* ---------- 绘制 ---------- */
  function drawSheet(cv, M, scale) {
    const ctx = cv.getContext("2d");
    if (!ctx) throw new Error("当前环境不支持 Canvas 2D");
    if (typeof ctx.setTransform !== "function" || typeof cv.toBlob !== "function") {
      throw new Error("当前环境不支持 Canvas 导出");
    }
    cv.width = Math.round(M.w * scale);
    cv.height = Math.round(M.h * scale);
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.fillStyle = M.bg;
    ctx.fillRect(0, 0, M.w, M.h);

    // 圆角路径：优先用原生 roundRect，老浏览器手搓（四角二次贝塞尔）
    const path = (o) => {
      ctx.beginPath();
      const r = Math.min(o.r || 0, Math.abs(o.w) / 2, Math.abs(o.h) / 2);
      if (typeof ctx.roundRect === "function") { ctx.roundRect(o.x, o.y, o.w, o.h, r); }
      else if (r > 0) {
        ctx.moveTo(o.x + r, o.y);
        ctx.lineTo(o.x + o.w - r, o.y); ctx.quadraticCurveTo(o.x + o.w, o.y, o.x + o.w, o.y + r);
        ctx.lineTo(o.x + o.w, o.y + o.h - r); ctx.quadraticCurveTo(o.x + o.w, o.y + o.h, o.x + o.w - r, o.y + o.h);
        ctx.lineTo(o.x + r, o.y + o.h); ctx.quadraticCurveTo(o.x, o.y + o.h, o.x, o.y + o.h - r);
        ctx.lineTo(o.x, o.y + r); ctx.quadraticCurveTo(o.x, o.y, o.x + r, o.y);
      } else { ctx.rect(o.x, o.y, o.w, o.h); }
      ctx.closePath();
    };
    M.rects.forEach(o => {
      path(o);
      if (o.fill) { ctx.fillStyle = o.fill; ctx.fill(); }
      if (o.stroke) { ctx.lineWidth = 1; ctx.strokeStyle = o.stroke; ctx.stroke(); }
    });
    M.rules.forEach(o => {
      ctx.beginPath();
      ctx.moveTo(o.x, Math.round(o.y) + 0.5);
      ctx.lineTo(o.x + o.w, Math.round(o.y) + 0.5);
      ctx.lineWidth = 1;
      ctx.strokeStyle = SHEET.t.line;
      ctx.stroke();
    });
    M.bars.forEach(o => { path(o); ctx.fillStyle = o.fill; ctx.fill(); });

    ctx.textBaseline = "top";
    M.texts.forEach(o => {
      ctx.font = o.font;
      ctx.fillStyle = o.color;
      ctx.textAlign = o.align || "left";
      ctx.fillText(o.s, o.x, o.y);
    });
    ctx.textAlign = "left";
  }

  /* ---------- 主流程 ---------- */
  function saveJpg(g, kind, btn) {
    if (!g) { toast("导出失败：找不到要导出的条目", false); return; }
    const label = btn ? btn.textContent : "";
    if (btn) { btn.disabled = true; btn.textContent = "生成中…"; }
    const restore = () => { if (btn) { btn.disabled = false; btn.textContent = label; } };

    try {
      // 量文本用一个离屏 2D 上下文；没有 canvas 的环境退回估宽
      const scratch = document.createElement("canvas").getContext("2d");
      const measure = scratch
        ? (t, f) => { scratch.font = f; return scratch.measureText(String(t)).width; }
        : fallbackMeasure;

      const M = layoutSheet(g, kind, measure);
      // 2 倍高清；万一卡片特别长，降倍率保证不超过浏览器画布上限
      let scale = 2;
      while (scale > 1 && M.h * scale > 12000) scale -= 0.25;

      const cv = document.createElement("canvas");
      drawSheet(cv, M, scale);

      cv.toBlob(blob => {
        restore();
        if (!blob) { toast("导出失败：图片编码失败", false); return; }
        const name = jpgFilename(g);
        const dl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = dl;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(dl), 5000);
        toast("已保存 " + name + "（" + cv.width + " × " + cv.height + "）", true);
      }, "image/jpeg", 0.93);
    } catch (e) {
      restore();
      toast("导出失败：" + e.message, false);
    }
  }

  /* 供冒烟测试调用：布局是纯函数，没有 canvas 也能验；
     drawSheet 一并暴露，便于用真实 canvas（如 @napi-rs/canvas）跑一遍绘制 */
  window.__observatoryExport = {
    layoutSheet: layoutSheet,
    drawSheet: drawSheet,
    sheetSpecGroups: sheetSpecGroups,
    mobileSpecOf: mobileSpecOf,
    wrapText: wrapText,
    fitLine: fitLine,
    jpgFilename: jpgFilename,
    fallbackMeasure: fallbackMeasure,
    SHEET: SHEET,
    SF: SF
  };

  /* ============================================================
     初始化
     ============================================================ */
  function initPlatforms() {
    const set = new Set();
    D.games.forEach(g => normPlatforms(g).forEach(p => set.add(p)));
    const sel = document.getElementById("platformFilter");
    [...set].sort().forEach(p => {
      const o = document.createElement("option");
      o.value = p; o.textContent = p;
      sel.appendChild(o);
    });
  }

  function switchTab(tab) {
    state.tab = tab;
    document.querySelectorAll(".tab").forEach(t =>
      t.classList.toggle("active", t.dataset.tab === tab));

    const isMob = tab === "mobile";
    const isConsole = tab === "console";
    const isGames = isMob || isConsole;

    document.getElementById("panelMobile").hidden = !isMob;
    document.getElementById("panelConsole").hidden = !isConsole;
    document.getElementById("toolbar").hidden = !isGames;
    document.getElementById("panelCompanies").hidden = tab !== "companies";
    document.getElementById("panelWanted").hidden = tab !== "wanted";
    document.getElementById("panelTgs").hidden = tab !== "tgs";

    // 两个作品区现在都带发售 / 配信状况，状态排序全面开放
    const sel = document.getElementById("sortSelect");
    const stOpt = [...sel.options].find(o => o.value === "status");
    if (stOpt) stOpt.hidden = !isGames;
    if (!isGames && state.sort === "status") { state.sort = "fresh"; sel.value = "fresh"; }

    // 平台筛选与视图切换对主机・PC 才有区分度
    document.getElementById("platformFilter").style.display = isConsole ? "" : "none";
    document.querySelector(".view-toggle").style.display = isConsole ? "" : "none";

    if (isMob) renderMobile();
    if (isConsole) renderGrid();
  }

  function bind() {
    document.querySelectorAll(".tab").forEach(t =>
      t.addEventListener("click", () => switchTab(t.dataset.tab)));

    const refresh = () => state.tab === "mobile" ? renderMobile() : renderGrid();
    document.getElementById("searchInput").addEventListener("input", e => {
      state.q = e.target.value.trim(); refresh();
    });
    document.getElementById("platformFilter").addEventListener("change", e => {
      state.platform = e.target.value; refresh();
    });
    document.getElementById("sortSelect").addEventListener("change", e => {
      state.sort = e.target.value; refresh();
    });
    document.querySelectorAll(".vt").forEach(b => b.addEventListener("click", () => {
      document.querySelectorAll(".vt").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      state.view = b.dataset.view; refresh();
    }));

    document.getElementById("drawerMask").addEventListener("click", closeDrawer);
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeDrawer(); });
  }

  renderHeader();
  renderDigest();
  renderSources();
  renderCompanies();
  renderWanted();
  renderTgs();
  initPlatforms();
  bind();
  switchTab("mobile");

  console.log(`[観測台] ${D.games.length} 条目 / 更新于 ${D.meta.updatedAt}`);
})();
