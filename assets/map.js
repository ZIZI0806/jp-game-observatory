/* ============================================================================
   日本ゲーム観測台 — 会社地図（company map）
   - タイル：国土地理院 淡色地図（ローカル同梱の Leaflet 1.9.4 を使用）
   - データ：data/map.js（window.OBSERVATORY_MAP）
   - 作品データ：data/data.js（window.OBSERVATORY）
   依存：assets/vendor/leaflet/leaflet.js + leaflet.css
        assets/vendor/oms/oms.js（重なりピンの扇状展開・MIT）

   ■ 表示スコープ（2 モード）
     首都圏 … 本社（hq）は本社に、本社が道府県外の社（branch）は東京拠点にピン。
               東京拠点がない社（out）は地図に打点せず【東京以外】パネルに収める。
     全国   … 全社を「本社位置」にピン。山形の拠点ではなく本社の地理的分布を見るモード。
               東京拠点しかない社も本社（大阪・京都・福岡など）にピンが立つ。
               海外法人（pref:"海外"）は位置を正確に示せないためピンを打たずパネルへ。

   ピンの意味（officeKind）
     hq     … 東京都内に本社がある社。ピン＝本社。
     branch … 本社は道府県外。首都圏表示ではピン＝東京拠点（東京支社／東京オフィス等）。
              全国表示ではピン＝本社。カード側で両方を必ず明示する。
     out    … 東京拠点がない社。首都圏表示では【東京以外】パネルへ、全国表示では本社にピン。
   ========================================================================== */
(function () {
  "use strict";

  var M = window.OBSERVATORY_MAP;
  var D = window.OBSERVATORY;
  if (!M || !D) return;

  /* ---------------------------------------------------------------- utils */
  var esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };
  var dateKey = function (d) {
    var m = String(d == null ? "" : d).match(/(\d{4})-(\d{2})(?:-(\d{2}))?/);
    return m ? (+m[1]) * 10000 + (+m[2]) * 100 + (+m[3] || 0) : 0;
  };
  var latin = function (s) { return (String(s).match(/[A-Za-z0-9]/g) || []).length; };
  var abbr = function (c) {
    var s = String(c.short || "");
    if (latin(s) >= 2) return (s.match(/[A-Za-z0-9]+/g) || []).join("").slice(0, 3).toUpperCase();
    return s.slice(0, 2);
  };

  /* ------------------------------------------------------------ 会社の集合 */
  var ALL = M.companies;
  var OUTSIDE = ALL.filter(function (c) { return c.officeKind === "out"; });
  var BYID = {};
  ALL.forEach(function (c) { BYID[c.id] = c; });

  /* ------------------------------------------------------------ スコープ */
  /* "kanto" = 首都圏（本社＋東京拠点）／ "national" = 全国（全社の本社） */
  var MODE = "kanto";
  var CUR = [];      // 現モードで打点する社
  var POS = {};      // id -> [lat, lng]（重なり回避オフセット適用後）
  var SPREAD = {};   // id -> [dlng, dlat]

  var hqMode = function () { return MODE === "national"; };
  var isOverseas = function (c) { return c.pref === "海外"; };
  var baseOf = function (c) {
    if (!hqMode()) return [c.lat, c.lng];
    return [c.hqLat != null ? c.hqLat : c.lat, c.hqLng != null ? c.hqLng : c.lng];
  };
  /* 現モードで地図に載らない社（＝【東京以外】パネル行き） */
  function unplotted() {
    return ALL.filter(function (c) {
      return hqMode() ? isOverseas(c) : c.officeKind === "out";
    });
  }

  /* ------------------------------------------------ company -> game index */
  var IDX = {};
  ALL.forEach(function (c) { IDX[c.id] = { c: c, games: [] }; });
  var PAT = {};
  ALL.forEach(function (c) {
    PAT[c.id] = (c.match || []).map(function (p) { try { return new RegExp(p, "i"); } catch (e) { return null; } }).filter(Boolean);
  });
  D.games.forEach(function (g) {
    var hay = String(g.company || "") + " ／ " + String(g.companyJp || "");
    ALL.forEach(function (c) {
      if (PAT[c.id].some(function (re) { return re.test(hay); })) IDX[c.id].games.push(g);
    });
  });
  function byHype(a, b) {
    return (((b.hype || {}).score) || 0) - (((a.hype || {}).score) || 0) || dateKey(b.announceDate) - dateKey(a.announceDate);
  }
  function latestGame(id) {
    return IDX[id].games.slice().sort(function (a, b) { return dateKey(b.announceDate) - dateKey(a.announceDate); })[0] || null;
  }
  function loudestGame(id) { return IDX[id].games.slice().sort(byHype)[0] || null; }
  function flagshipGame(id) { return loudestGame(id); }   // 収益非公表の社に出す参考枠

  /* ------------------------------------------------------------ geometry */
  // 同一座標（同じビル）に入る社を小さな円周上に散らす。モードごとに再計算する。
  function rebuildGeom() {
    CUR = ALL.filter(function (c) { return !isOverseas(c) && (hqMode() || c.officeKind !== "out"); });

    var groups = {};
    CUR.forEach(function (c) {
      var b = baseOf(c);
      var k = b[0].toFixed(5) + "," + b[1].toFixed(5);
      (groups[k] = groups[k] || []).push(c.id);
    });
    SPREAD = {};
    Object.keys(groups).forEach(function (k) {
      var ids = groups[k];
      if (ids.length < 2) { SPREAD[ids[0]] = [0, 0]; return; }
      var R = 0.00034 + 0.00013 * ids.length;   // ≈ 38m + 15m × n
      ids.forEach(function (id, i) {
        var a = (Math.PI * 2 * i) / ids.length - Math.PI / 2;
        SPREAD[id] = [Math.cos(a) * R, Math.sin(a) * R * 1.28];
      });
    });

    POS = {};
    CUR.forEach(function (c) {
      var b = baseOf(c), s = SPREAD[c.id] || [0, 0];
      POS[c.id] = [b[0] + s[1], b[1] + s[0]];
    });
  }
  var posOf = function (c) { return POS[c.id] || baseOf(c); };
  var isShared = function (c) { var s = SPREAD[c.id]; return !!(s && (s[0] || s[1])); };

  /* -------------------------------------------------------------- labels */
  var REL = { listed: "上場", parent: "親会社", sub: "子会社・出資先", holder: "株主", partner: "協業・共同開発", note: "備考" };
  var TIER = { major: "大手", mid: "中堅", small: "独立系・小規模" };

  function gameLine(g, fallbackMsg) {
    if (!g) return '<p class="mp-none">' + esc(fallbackMsg || "本台に該当条目なし") + "</p>";
    var t = (g.title && (g.title.cn || g.title.jp)) || g.id;
    var hype = (g.hype && g.hype.score) ? "<em>期待度 " + g.hype.score + "</em>" : "";
    return '<button class="mp-game" data-gid="' + esc(g.id) + '">' +
      '<span class="mp-game-t">『' + esc(t) + "』</span>" +
      '<span class="mp-game-m">' + esc(g.announceDate || "—") + " ／ " + esc(g.release || "—") + " " + hype + "</span>" +
      "</button>";
  }

  function panelHTML(c) {
    var latest = latestGame(c.id), loud = loudestGame(c.id), flag = flagshipGame(c.id);
    var logo = c.logo ? '<img src="' + esc(c.logo) + '" alt="">' : "<span>" + esc(abbr(c)) + "</span>";
    var eq = (c.eq || []).map(function (e) {
      var pct = e.pct ? "<b>" + esc(e.pct) + "</b>" : "";
      return '<li class="mp-rel mp-rel-' + esc(e.rel) + '"><span class="mp-rel-k">' + esc(REL[e.rel] || e.rel) + "</span>" +
        '<span class="mp-rel-v">' + esc(e.name) + " " + pct + "</span>" +
        (e.note ? '<span class="mp-rel-n">' + esc(e.note) + "</span>" : "") + "</li>";
    }).join("");

    var topHTML;
    if (c.top) {
      topHTML = '<div class="mp-top"><strong>' + esc(c.top.t) + "</strong><span>" + esc(c.top.b) + "</span></div>";
    } else {
      topHTML = '<p class="mp-none">公開情報なし（単作の収益を開示していない）</p>' +
        (flag ? '<p class="mp-alt">本台収録内の代表タイトル：『' + esc((flag.title && (flag.title.cn || flag.title.jp)) || flag.id) + "』</p>" : "");
    }

    /* 拠点の種別をバッジで明示（本社か東京拠点かを取り違えないように） */
    var officeBadge = "";
    if (c.officeKind === "branch") {
      officeBadge += '<span class="mp-badge branch" title="本社は' + esc(c.hqPref || "") + '">東京拠点・' + esc(c.officeLabel || "") + "</span>";
    } else if (c.officeKind === "out") {
      officeBadge += '<span class="mp-badge outside">東京以外</span>';
    }
    /* 全国表示では、道府県外の社のピンは「本社位置」を指す */
    if (hqMode() && c.officeKind !== "hq") {
      officeBadge += '<span class="mp-badge hqpin" title="現在の表示は全国（本社位置）">本社位置</span>';
    }

    var addrBlock;
    if (c.officeKind === "branch") {
      addrBlock =
        '<p class="mp-addr"><span class="mp-addr-k">東京拠点</span>' + esc(c.addr || "住所未確認") + "</p>" +
        '<p class="mp-hq"><span class="mp-addr-k">本社</span>' + esc(c.hqAddr || c.hqPref || "未確認") + "</p>";
    } else {
      addrBlock = '<p class="mp-addr"><span class="mp-addr-k">本社</span>' + esc(c.addr || "住所未確認") + "</p>";
    }
    if (c.overseas) {
      addrBlock += '<p class="mp-hq">海外法人のため日本国内の位置は参考値です（地図には打点していません）。</p>';
    }

    var badges = '<span class="mp-badge t-' + esc(c.tier) + '">' + esc(TIER[c.tier] || c.tier) + "</span>" +
      officeBadge +
      (c.precision !== "block" && c.officeKind !== "out" ? '<span class="mp-badge approx" title="都道府県・市区町村レベルまでの確認">位置 参考値</span>' : "") +
      (isShared(c) ? '<span class="mp-badge shared" title="同ビルに他社も所在">同ビル複数社</span>' : "");

    return '' +
      '<div class="mp-head">' +
        '<div class="mp-logo" style="--c:' + esc(c.color) + '">' + logo + "</div>" +
        "<div class=\"mp-headtxt\">" +
          "<h3>" + esc(c.name) + "</h3>" +
          '<p class="mp-sub">' + badges + "</p>" +
          addrBlock +
          '<p class="mp-count">本台収録 ' + (c.games || 0) + " 件</p>" +
        "</div>" +
      "</div>" +
      '<section class="mp-sec"><h4>最新の発表作</h4>' + gameLine(latest) + "</section>" +
      '<section class="mp-sec"><h4>宣伝量が最大の作<span class="mp-tag">本台推算</span></h4>' + gameLine(loud) + "</section>" +
      '<section class="mp-sec"><h4>史上最高収益作<span class="mp-tag">公開情報ベース</span></h4>' + topHTML + "</section>" +
      '<section class="mp-sec"><h4>資本関係</h4>' +
        (eq ? '<ul class="mp-rels">' + eq + "</ul>" : '<p class="mp-none">確認できた資本関係はなし</p>') +
      "</section>";
  }

  /* ---------------------------------------------------------------- map */
  var TILES = "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png";
  var map = null, markers = {}, edgeLayer = null, edgeOn = true, inited = false, currentId = null, oms = null;
  var sharedRings = null;

  function sizeOf(z, tier) {
    var base = z <= 6 ? 14 : z <= 9 ? 18 : z <= 11 ? 21 : z <= 13 ? 27 : 32;
    if (tier === "major") base += 6; else if (tier === "mid") base += 2;
    return base;
  }

  function makeIcon(c) {
    var logo = c.logo ? '<img src="' + esc(c.logo) + '" alt="">' : "<span>" + esc(abbr(c)) + "</span>";
    var cls = "cmp-wrap tier-" + (c.tier || "small") +
      (c.precision !== "block" ? " approx" : "") +
      (hqMode()
        ? (c.officeKind === "hq" ? "" : " nonTokyo")     // 全国図：道府県外本社は別色リング
        : (c.officeKind === "branch" ? " branch" : ""));
    return L.divIcon({
      className: cls,
      html: '<div class="cmp" style="--c:' + esc(c.color) + '">' +
              '<div class="cmp-in">' + logo + "</div>" +
              '<div class="cmp-tip">' + esc(c.short) + "</div>" +
            "</div>",
      iconSize: [30, 30], iconAnchor: [15, 15]
    });
  }

  function applyZoom() {
    if (!map) return;
    var z = map.getZoom();
    var box = map.getContainer();
    box.dataset.zl = z <= 6 ? "far" : z <= 9 ? "mid" : z <= 11 ? "near" : "close";
    CUR.forEach(function (c) {
      var el = markers[c.id] && markers[c.id].getElement();
      var cmp = el && el.querySelector(".cmp");
      if (!cmp) return;
      var px = sizeOf(z, c.tier);
      cmp.style.width = px + "px";
      cmp.style.height = px + "px";
    });
  }

  function clearActive() {
    currentId = null;
    Array.prototype.forEach.call(document.querySelectorAll(".map-list-item, .mo-item"), function (el) { el.classList.remove("active"); });
    Object.keys(markers).forEach(function (k) {
      var e = markers[k].getElement(); if (e) e.classList.remove("is-active");
      markers[k].setZIndexOffset(0);
    });
  }

  function openDetail(id) {
    var c = BYID[id];
    if (!c) return;
    if (oms) oms.unspiderfy();       // 開いた後に蜘蛛の脚が残らないように
    currentId = id;
    var box = document.getElementById("mapDetail");
    box.innerHTML = '<button class="mp-close" type="button" aria-label="閉じる">×</button>' + panelHTML(c);
    box.hidden = false;
    box.querySelector(".mp-close").addEventListener("click", function () {
      box.hidden = true; clearActive();
    });
    Array.prototype.forEach.call(box.querySelectorAll(".mp-game"), function (b) {
      b.addEventListener("click", function () {
        if (window.__obsOpenDrawer) window.__obsOpenDrawer(b.dataset.gid);
      });
    });
    Array.prototype.forEach.call(document.querySelectorAll(".map-list-item, .mo-item"), function (el) {
      el.classList.toggle("active", el.dataset.cid === id);
    });
    Object.keys(markers).forEach(function (k) {
      var m = markers[k], on = k === id;
      m.setZIndexOffset(on ? 1200 : 0);
      var e = m.getElement(); if (e) e.classList.toggle("is-active", on);
    });
    /* ピンを持たない社（パネル行き）は地図を動かさない */
    if (map && POS[id]) {
      var z = map.getZoom();
      if (hqMode() && z < 11) map.setView(POS[id], 12, { animate: true });   // 全国図は寄らないと見えない
      else map.panTo(POS[id], { animate: true, duration: 0.35 });
    }
    var side = box.closest(".map-side");
    var li = side && side.querySelector('.map-list-item[data-cid="' + id + '"]');
    if (li && li.scrollIntoView) li.scrollIntoView({ block: "nearest" });
    var oi = document.querySelector('.mo-item[data-cid="' + id + '"]');
    if (oi && oi.scrollIntoView) oi.scrollIntoView({ block: "nearest" });
  }
  window.__mapOpenDetail = openDetail;

  function buildEdges() {
    var grp = L.layerGroup(), pos = {};
    CUR.forEach(function (c) { pos[c.id] = posOf(c); });
    (M.edges || []).forEach(function (e) {
      if (!pos[e.a] || !pos[e.b]) return;      // 打点していない社が絡む線は引かない
      var cap = e.kind === "capital";
      L.polyline([pos[e.a], pos[e.b]], {
        color: cap ? "#ff5c7a" : "#4dd4c0",
        weight: cap ? 1.6 : 1.1,
        opacity: cap ? 0.6 : 0.5,
        dashArray: cap ? null : "4 6",
        interactive: false
      }).addTo(grp);
    });
    return grp;
  }

  function buildList(q) {
    var box = document.getElementById("mapList");
    var s = String(q || "").trim().toLowerCase();
    var rank = { major: 0, mid: 1, small: 2 };
    var items = CUR.filter(function (c) {
      if (!s) return true;
      var hay = (c.short + " " + c.name + " " + (c.pref || "") + " " + (c.addr || "") + " " + (c.hqAddr || "")).toLowerCase();
      return hay.indexOf(s) !== -1;
    }).sort(function (a, b) {
      return (rank[a.tier] - rank[b.tier]) || String(a.short).localeCompare(String(b.short), "ja");
    });
    box.innerHTML = items.map(function (c) {
      var logo = c.logo ? '<img src="' + esc(c.logo) + '" alt="">' : "<span>" + esc(abbr(c)) + "</span>";
      var tag = "";
      if (hqMode()) { if (c.officeKind !== "hq") tag = '<em class="mli-tag">本社</em>'; }
      else if (c.officeKind === "branch") tag = '<em class="mli-tag">東京拠点</em>';
      return '<button class="map-list-item' + (c.id === currentId ? " active" : "") + '" data-cid="' + esc(c.id) + '" style="--c:' + esc(c.color) + '">' +
        '<span class="mli-logo">' + logo + "</span>" +
        '<span class="mli-txt"><b>' + esc(c.short) + "</b><i>" + esc((c.pref || "") + (c.games ? " · " + c.games + "件" : "")) + "</i></span>" +
        tag +
        "</button>";
    }).join("") || '<p class="mp-none">該当なし</p>';
    Array.prototype.forEach.call(box.querySelectorAll(".map-list-item"), function (el) {
      el.addEventListener("click", function () { openDetail(el.dataset.cid); });
    });
  }

  /* ------------------------------------------------- 地図に載らない社のパネル */
  function buildOutside() {
    var btn = document.getElementById("mapOutsideBtn");
    var pan = document.getElementById("mapOutsidePanel");
    var lst = document.getElementById("mapOutsideList");
    var num = document.getElementById("mapOutsideN");
    var note = pan && pan.querySelector(".mo-note");
    if (!btn || !pan || !lst) return;

    var list = unplotted();
    if (num) num.textContent = String(list.length);
    btn.hidden = list.length === 0;
    if (note) {
      note.textContent = hqMode()
        ? "海外法人のため、日本地図上に正確な打点ができない会社です。会社名を押すと詳細が開きます。"
        : "東京拠点が確認できない会社です。地図には打点していません。会社名を押すと詳細が開きます。";
    }

    lst.innerHTML = list.slice().sort(function (a, b) {
      return String(a.pref || "").localeCompare(String(b.pref || ""), "ja") ||
             String(a.short).localeCompare(String(b.short), "ja");
    }).map(function (c) {
      var logo = c.logo ? '<img src="' + esc(c.logo) + '" alt="">' : "<span>" + esc(abbr(c)) + "</span>";
      return '<button class="mo-item' + (c.id === currentId ? " active" : "") + '" data-cid="' + esc(c.id) + '" style="--c:' + esc(c.color) + '">' +
        '<span class="mo-logo">' + logo + "</span>" +
        '<span class="mo-txt"><b>' + esc(c.short) + "</b><i>" + esc(c.addr) + "</i></span>" +
        "</button>";
    }).join("");

    Array.prototype.forEach.call(lst.querySelectorAll(".mo-item"), function (el) {
      el.addEventListener("click", function () { openDetail(el.dataset.cid); });
    });

    var setOpen = function (open) {
      pan.hidden = !open;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.classList.toggle("is-open", open);
    };
    if (!btn.__wired) {
      btn.__wired = true;
      btn.addEventListener("click", function () { setOpen(pan.hidden); });
      var cls = pan.querySelector(".mo-close");
      if (cls) cls.addEventListener("click", function () { setOpen(false); });
    }
    setOpen(false);
  }

  /* ------------------------------------------------------ ピンの貼り直し */
  function mountMarkers() {
    Object.keys(markers).forEach(function (k) {
      if (oms) oms.removeMarker(markers[k]);
      if (map) map.removeLayer(markers[k]);
    });
    markers = {};
    if (sharedRings) sharedRings.clearLayers();

    CUR.forEach(function (c) {
      var title = hqMode()
        ? (c.short + "｜本社：" + (c.hqAddr || c.addr))
        : (c.short + "｜" + c.addr);
      var m = L.marker(posOf(c), { icon: makeIcon(c), riseOnHover: true, title: title });
      m.__cid = c.id;
      if (oms) oms.addMarker(m);                       // クリックは OMS 経由で拾う
      else m.on("click", function () { openDetail(c.id); });
      m.addTo(map);
      markers[c.id] = m;
      if (isShared(c)) {
        L.circle([baseOf(c)[0], baseOf(c)[1]], { radius: 46, color: "#ff8fa3", weight: 1, opacity: 0.45, fill: false, interactive: false })
          .addTo(sharedRings);
      }
    });
    applyZoom();
  }

  function updateFoot() {
    var foot = document.getElementById("mapFoot");
    if (!foot) return;
    var nOut = ALL.filter(function (c) { return c.officeKind === "out"; }).length;
    var nBranch = ALL.filter(function (c) { return c.officeKind === "branch"; }).length;
    var nHq = ALL.filter(function (c) { return c.officeKind === "hq"; }).length;
    var panel = unplotted().length;
    var scope = document.getElementById("mapScope");
    if (scope) scope.textContent = hqMode() ? "全国表示：本社位置" : "首都圏表示：本社／東京拠点";
    foot.innerHTML = hqMode()
      ? "打点 " + CUR.length + " 社（全社を本社位置に表示）／全国図に載せられない海外法人 " + panel +
        " 社。本社の内訳は東京 " + nHq + " 社・道府県外 " + (nBranch + nOut) + " 社。会社情報は毎回の定時巡検で更新しています。"
      : "打点 " + CUR.length + " 社（本社 " + nHq + " 社／東京拠点 " + nBranch +
        " 社）／東京以外 " + panel + " 社。会社情報は毎回の定時巡検で更新しています。";
  }

  /* ------------------------------------------------------------ スコープ切替 */
  function setMode(next) {
    if (!map) { MODE = next; return; }
    if (oms) oms.unspiderfy();
    MODE = next;
    rebuildGeom();
    mountMarkers();
    if (edgeLayer) { map.removeLayer(edgeLayer); }
    edgeLayer = buildEdges();
    if (edgeOn) edgeLayer.addTo(map);
    buildList(document.getElementById("mapSearch") ? document.getElementById("mapSearch").value : "");
    buildOutside();
    updateFoot();
    Array.prototype.forEach.call(document.querySelectorAll(".map-jump"), function (x) {
      x.classList.toggle("active", x.dataset.jump === (hqMode() ? "jp" : "kanto"));
    });
    clearActive();
    var box = document.getElementById("mapDetail");
    if (box) box.hidden = true;
  }

  function initMap() {
    if (inited) { setTimeout(function () { if (map) map.invalidateSize(); }, 80); return; }
    if (!window.L || !document.getElementById("tokyoMap")) return;
    inited = true;

    MODE = "kanto";
    rebuildGeom();

    var box = document.getElementById("tokyoMap");
    map = L.map(box, {
      center: M.center || [35.6812, 139.7671], zoom: 11, minZoom: 4, maxZoom: 18,
      zoomControl: true, attributionControl: true, worldCopyJump: false
    });
    L.tileLayer(TILES, {
      maxZoom: 18, crossOrigin: true,
      attribution: '地図：<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">国土地理院</a>／位置情報：OpenStreetMap contributors'
    }).addTo(map);
    box.dataset.theme = "dark";
    sharedRings = L.layerGroup().addTo(map);

    /* 密集して重なったピンをクリックで円形／スパイラルに展開する。
       SPREAD は「完全に同一座標」用、こちらは「近接して重なっている」用で役割が違う。
       公式: https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet （MIT・同梱） */
    if (typeof window.OverlappingMarkerSpiderfier === "function") {
      oms = new window.OverlappingMarkerSpiderfier(map, {
        keepSpiderfied: false,          // 選択したら脚を畳む（Google Earth 流）
        nearbyDistance: 18,             // この画素半径内を「重なり」とみなす
        circleSpiralSwitchover: 6
      });
      // 🔴 同梱の OMS は v0.2.6。legColors はフラットな文字列
      //    （v0.2.7 以降の {usual:{normal,highlighted}} ではない）。
      //    誤ってネスト前提で書くと strict mode で TypeError になり initMap ごと落ちる。
      oms.legColors.usual = "#4dd4c0";
      oms.legColors.highlighted = "#ff5c7a";
      oms.addListener("click", function (m) { if (m && m.__cid) openDetail(m.__cid); });
    }

    mountMarkers();
    edgeLayer = buildEdges().addTo(map);
    map.on("zoomend", applyZoom);

    var sIn = document.getElementById("mapSearch");
    if (sIn) sIn.addEventListener("input", function (e) { buildList(e.target.value); });

    var tg = document.getElementById("mapEdgeToggle");
    if (tg) tg.addEventListener("change", function () {
      edgeOn = tg.checked;
      if (!map) return;
      if (edgeOn) edgeLayer.addTo(map); else map.removeLayer(edgeLayer);
    });

    var th = document.getElementById("mapThemeToggle");
    if (th) th.addEventListener("change", function () {
      box.dataset.theme = th.checked ? "dark" : "light";
    });

    wireScopeButtons();
    buildList("");
    buildOutside();
    updateFoot();

    setTimeout(function () { map.invalidateSize(); }, 100);
  }

  /* 全国 / 首都圏 / 東京23区 … スコープ切替ボタン */
  function wireScopeButtons() {
    Array.prototype.forEach.call(document.querySelectorAll(".map-jump"), function (b) {
      if (b.__wired) return;
      b.__wired = true;
      b.addEventListener("click", function () {
        var v = b.dataset.jump, c = M.center || [35.672, 139.71];
        if (v === "jp") {
          setMode("national");
          map.setView([36.6, 137.4], 6, { animate: true });
        } else if (v === "tokyo") {
          setMode("kanto");
          map.setView(c, 12, { animate: true });
        } else {
          setMode("kanto");
          map.setView(c, 11, { animate: true });
        }
      });
    });
  }
  window.__obsInitMap = initMap;

  function maybeInit() {
    var p = document.getElementById("panelMap");
    if (p && !p.hidden && window.L) initMap();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", maybeInit);
  else maybeInit();
})();
