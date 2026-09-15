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
  function cardHTML(g) {
    const co = colorOf(g.company);
    const plats = normPlatforms(g);
    const isNew = g.bucket === "new";
    const dateChip = /^\d{4}-\d{2}-\d{2}/.test(g.release)
      ? `<span class="chip date">发售 ${fmtDate(g.release)}</span>`
      : `<span class="chip">发售 ${esc(g.release)}</span>`;

    const yt = (g.videos || []).filter(v => v.platform === "YouTube")[0];
    const xv = (g.videos || []).filter(v => v.platform === "X")[0];
    const nw = (g.news || [])[0];

    return `
    <article class="card" data-id="${esc(g.id)}" style="--co:${co};--hs:${hypeColor(g.hype.score)}">
      <div class="card-rail"></div>
      <div class="card-head">
        <div class="card-top">
          <div class="company"><span class="company-dot"></span>${esc(g.company)}</div>
          ${isCross(g) ? `<span class="cross-tag">跨平台 · 手游区亦有收录</span>` : ""}
          <span class="bucket-tag ${isNew ? "new" : ""}">${isNew ? "新作发表" : "定档/进展"} · ${esc(fmtDate(g.announceDate))}</span>
        </div>
        <h3 class="card-title">${esc(g.title.cn)}</h3>
        <div class="card-title-en">${esc(g.title.jp)}${g.title.en && g.title.en !== g.title.jp ? " ／ " + esc(g.title.en) : ""}</div>
        <div class="card-meta">
          <span class="chip">${esc(g.genre)}</span>
          ${plats.map(p => `<span class="chip plat">${esc(p)}</span>`).join("")}
          ${dateChip}
        </div>
      </div>
      <div class="card-body">
        <p class="card-summary">${esc(g.summary)}</p>
        ${g.highlight ? `<div class="card-highlight">${esc(g.highlight)}</div>` : ""}
      </div>
      <div class="hype">
        <div class="hype-head">
          <span class="hype-label">全球舆论期待度</span>
          <span class="hype-score">${g.hype.score}<small>/100</small></span>
        </div>
        <div class="hype-bar"><div class="hype-fill" style="width:${g.hype.score}%"></div></div>
      </div>
      <div class="card-foot">
        ${yt ? `<a class="link-btn yt" href="${esc(yt.url)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>实机/预告</a>` : ""}
        ${xv ? `<a class="link-btn x" href="${esc(xv.url)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">𝕏 官方</a>` : ""}
        ${nw ? `<a class="link-btn news" href="${esc(nw.url)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">新闻原文</a>` : ""}
        <span class="foot-spacer"></span>
        <button class="more-btn">详情 +</button>
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
    const s = (g.mobile && g.mobile.status) || g.release || "";
    if (/事前登録/.test(s)) return 0;
    if (/配信予定|未定/.test(s)) return 1;
    if (/サービス中|開服|已开服/.test(s)) return 2;
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
                    g.mobile.ipSource, g.mobile.status, (g.mobile.features || []).join(" ")].join(" ") : ""
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
          ${isCross(g) ? `<span class="cross-tag">跨平台</span>` : ""}
          <span class="mob-date">${esc(fmtDate(g.announceDate))} 发表</span>
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

        <div class="mob-foot">
          ${(g.videos || []).slice(0, 5).map(v => `
            <a class="link-btn ${linkClass(v.platform)}" href="${esc(v.url)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${esc(v.platform)}</a>
          `).join("")}
          <span class="foot-spacer"></span>
          <button class="more-btn">详情 +</button>
        </div>
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
    box.querySelectorAll(".mob-card").forEach(el => {
      el.addEventListener("click", () => openDrawer(el.dataset.id));
    });
  }

  /* ============================================================
     主机・PC 卡片（次要区）
     ============================================================ */
  function renderGrid() {
    const list = getFiltered();
    const grid = document.getElementById("grid");
    const empty = document.getElementById("emptyState");
    grid.className = "grid" + (state.view === "list" ? " compact" : "");
    grid.innerHTML = list.map(cardHTML).join("");
    empty.hidden = list.length > 0;
    grid.querySelectorAll(".card").forEach(el => {
      el.addEventListener("click", () => openDrawer(el.dataset.id));
    });
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

    document.getElementById("drawer").innerHTML = `
      <button class="drawer-close" id="drawerClose">✕</button>
      <div class="d-company" style="--co:${co};color:${co}">${esc(g.company)}</div>
      <h2>${esc(g.title.cn)}</h2>
      <div class="d-en">${esc(g.title.jp)}${g.title.en && g.title.en !== g.title.jp ? " ／ " + esc(g.title.en) : ""}</div>

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
      </div>`;

    document.getElementById("drawer").hidden = false;
    document.getElementById("drawerMask").hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("drawerClose").addEventListener("click", closeDrawer);
    document.getElementById("drawer").scrollTop = 0;
  }

  function closeDrawer() {
    document.getElementById("drawer").hidden = true;
    document.getElementById("drawerMask").hidden = true;
    document.body.style.overflow = "";
  }

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

    // 状态排序仅在手游区提供
    const sel = document.getElementById("sortSelect");
    const stOpt = [...sel.options].find(o => o.value === "status");
    if (stOpt) stOpt.hidden = !isMob;
    if (!isMob && state.sort === "status") { state.sort = "fresh"; sel.value = "fresh"; }

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
