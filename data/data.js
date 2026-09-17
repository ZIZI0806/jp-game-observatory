/* ============================================================
 * 日本ゲーム観測台 / Japan Game Observatory
 * 数据文件 — 由每日自动巡检任务维护
 * 最后更新: 2026-09-17
 *
 * 数据结构:
 *   meta    — 元信息与数据源清单
 *   games[] — 作品条目
 *     announceDate — 作品情报的发表 / 更新日（作品侧时间）
 *     capturedAt   — 本条目最后一次被巡检抓取（写入）的日期（观测台侧时间）
 *                    排序「最新抓取」= capturedAt 倒序 → announceDate 倒序；
 *                    每次巡检只对新收录 / 有情报更新的条目重置为该次运行日期。
 *     hype  — 全球舆论期待度评分 (0-100, 定性综合评估, 见 signals 依据)
 * ============================================================ */

window.OBSERVATORY = {

  meta: {
    updatedAt: "2026-09-17T11:58:00+08:00",
    edition: "2026-09-17",
    window: "2026-07-17 ~ 2026-09-17（滚动最近 2 个月）",
    sources: [
      { name: "Famitsu (週刊ファミ通)", url: "https://www.famitsu.com/" },
      { name: "AppBank ゲーム", url: "https://www.appbank.net/category/game" },
      { name: "Anime News Network", url: "https://www.animenewsnetwork.com/" },
      { name: "Nintendo Everything", url: "https://nintendoeverything.com/" },
      { name: "GameApps.hk", url: "https://www.gameapps.hk/" },
      { name: "PR TIMES", url: "https://prtimes.jp/" },
      { name: "4Gamer.net", url: "https://www.4gamer.net/" },
      { name: "Quest Board.JP 日刊", url: "https://quest-board.jp/" },
      { name: "GameMeca", url: "https://www.gamemeca.com/" },
      { name: "GameBiz（手游/在线ゲーム）", url: "https://gamebiz.jp/" },
      { name: "QooApp（スマホゲーム情報）", url: "https://www.qoo-app.com/" }
    ],
    hypeFormula: "期待度=日本侧信号(Famitsu读者期待榜票数)×40% + 全球媒体覆盖广度×30% + 社媒/预告片声量×30%。均为公开信号定性评估,非平台真实流量数据。"
  },

  /* ---------------------------------------------------------
   * A. 新作发表 — 本期首次公开的作品
   * ------------------------------------------------------- */
  games: [

    /* ---------- 2026-09-15 粒度修正：TGS2026 出展名单拆分 ----------
     * 起因：NHN PlayArt 的 TGS2026 出展 3 款新作原先被合并写成 1 条条目，
     *       导致「1 作品 = 1 条目」失守，且 mobile 块内混着两款作品的数据。
     * 处置：删除合并条目，按作品各建 1 条；展会本身的信息移入 tgs.booths。
     * 同时补收此前完全漏收的 EXE ARENA（小厂新作、不在厂商册内）。 */

    {
      id: "touken-ranbu-pazugiri",
      company: "EXNOA（DMM GAMES）／ NHN PlayArt",
      companyJp: "合同会社EXNOA（DMM GAMES）／ NHNプレイアート株式会社",
      bucket: "new",
      platformClass: "multi",
      announceDate: "2026-09（事前登録40万人突破・50万人特典を追加）",
      capturedAt: "2026-09-15",
      title: { jp: "刀剣乱舞 ぱずぎり", cn: "刀剑乱舞 ぱずぎり", en: "Touken Ranbu Pazu-giri" },
      genre: "拼图 RPG（パズル RPG）",
      platforms: ["iOS", "Android", "PC（DMM GAMES PLAYER）"],
      release: "2026年内",
      releasePrecision: "年",
      summary: "《刀剑乱舞 ONLINE》首款拼图派生作。世界观、剧本与角色设计由 Nitroplus 监修，拼图部分的开发由 NHN PlayArt 负责，合同会社 EXNOA 开发运营。核心玩法是把盘面上同色的「刀垣」连成一线发动连续斩击，刀剑男士以 Q 版形象登场，可编组能力各异的刀剑男士出战；每日游玩会被记录进「活动日志」，保留战斗记录与角色成长轨迹。2026-07-12 开放事前登录，9 月中旬事前登录人数已突破 40 万，官方随即加开 50 万档奖励（含稀有刀剑男士「三日月宗近（战斗服）」）。TGS2026 在 DMM GAMES 出展区域提供试玩，9/20 15:40 于主舞台举办特别舞台活动。",
      highlight: "《刀剑乱舞》IP 首次进入拼图品类，事前登录一个多月破 40 万，是本期女性向市场最大的单一新品。",
      mobile: {
        status: "事前登録受付中（2026年内 配信予定）",
        os: ["iOS", "Android"],
        monetization: "基本無料（アイテム課金あり）",
        preReg: {
          open: true,
          since: "2026-07-12",
          reward: "累計登録者数に応じて段階配布。10万人：事前登録限定召喚券×10／宝玉×100、20万人：同×20／宝玉×200、30万人：同×30／宝玉×300／刀剣男士必中召喚券×1。40万人を突破したことで50万人档を追加し、達成時は事前登録専用召喚券×50／宝玉×500／必中刀剣男士召喚券×1／希少刀剣男士「三日月宗近（戦闘服）」×1を配布"
        },
        developer: "NHNプレイアート株式会社（パズル部分の開発）／ 合同会社EXNOA（開発運営）",
        publisher: "合同会社EXNOA（DMM GAMES）",
        region: "日本（日本語のみ）",
        distribution: "App Store / Google Play／PC（DMM GAMES PLAYER 版）",
        ipSource: "『刀剣乱舞 ONLINE』（2015年1月14日サービス開始。DMM GAMES × Nitroplus 開発、合同会社EXNOA 運営）。本作は同 IP を題材に、パズル部分の開発を NHN PlayArt が担当する",
        series: "『刀剣乱舞』は刀剣男士を育成するシミュレーションゲームとして2015年に始まり、アニメ・舞台・ミュージカルへ展開する長期 IP。2025年に10周年、2026年1月14日に11周年を迎え、その記念生配信で本作が発表された。シリーズとしてパズルジャンルに進出するのは初",
        features: [
          "盤面上の同色の敵「刀垣」をなぞって連続斬撃を発動するパズル RPG",
          "刀剣男士はミニキャラ（Q 版）で登場し、それぞれ固有の能力と密技・新形態を持つ",
          "必殺奥義で敵をまとめて一掃でき、軽度プレイヤーでも扱いやすい操作を志向",
          "刀剣男士を編成して部隊を組み、歴史を改変から守るストーリーを進める",
          "日々のプレイが「活動日誌」に記録され、戦闘記録・刀剣男士の成長・交流の瞬間が残る",
          "TGS2026 は DMM GAMES の出展エリアで試遊を用意。9月20日 15:40 から主舞台で特別ステージを開催"
        ],
        synopsis: "歴史を書き換えようとする者たちに対し、審神者が刀剣男士を率いて立ち向かう。これまでの育成シミュレーションとは異なり、同色の「刀垣」を連結させて「すぱすぱ」と斬り倒すパズルバトルが中心で、刀剣男士ごとに異なる能力を組み合わせて部隊を編成する。",
        cast: "三日月宗近 役：鳥海浩輔、陸奥守吉行 役：濱健人、二条貞宗 役：田所陽向（TGS2026 特別ステージ出演者の発表より）"
      },
      console: {
        status: "2026年内 配信予定（PC 版は DMM GAMES PLAYER 版／事前登録受付中）",
        os: ["PC（DMM GAMES PLAYER 版）"],
        monetization: "基本無料（アイテム課金あり）。パッケージ販売はなし",
        developer: "NHNプレイアート株式会社（パズル部分の開発）／ 合同会社EXNOA（開発運営）",
        publisher: "合同会社EXNOA（DMM GAMES）",
        region: "日本（日本語のみ）",
        distribution: "ダウンロード（DMM GAMES PLAYER）",
        stores: ["DMM GAMES"],
        features: [
          "スマホ版と同一内容を PC（DMM GAMES PLAYER 版）で遊べる構成",
          "盤面上の同色の「刀垣」を連結させて連続斬撃を発動するパズル RPG",
          "刀剣男士を編成して部隊を組み、歴史を改変から守るストーリーを進める",
          "毎日のプレイが「活動日誌」に記録される",
          "9月20日 15:40 から TGS2026 主舞台で特別ステージを開催"
        ],
        synopsis: "『刀剣乱舞 ONLINE』の刀剣男士がミニキャラで登場するパズル RPG。同色の「刀垣」をなぞって連続斬撃を放ち、歴史を改変しようとする敵に立ち向かう。PC では DMM GAMES PLAYER 版として配信される予定。",
        ipSource: "『刀剣乱舞 ONLINE』（合同会社EXNOA／Nitroplus）",
        series: "シリーズ初のパズルジャンル進出。開発は NHN PlayArt、世界観・脚本・キャラクターデザインは Nitroplus が担当",
        cast: "三日月宗近 役：鳥海浩輔、陸奥守吉行 役：濱健人、二条貞宗 役：田所陽向"
      },
      news: [
        { source: "QooApp（事前登録開始・システム紹介）", url: "https://news.qoo-app.com/post/440436" },
        { source: "Holiday Travel（TGS2026 出展・40万人突破と50万人档）", url: "https://www.haveagood-holiday.com/zh-TW/articles/touken-ranbu-pazugiri-tokyo-game-show-2026-booth" },
        { source: "Ludens Media（事前登録と多平台展開）", url: "https://www.ludens.com.tw/touken-ranbu-pazzugiri-pre-registration" }
      ],
      videos: [
        { label: "官方 PV（Q 版刀剑男士与消除战斗实机）", platform: "官方 YouTube", url: "https://www.youtube.com/@touken_puzzle" },
        { label: "官方站（刀剣乱舞 ぱずぎり）", platform: "官方站", url: "https://touken-puzzle.com" }
      ],
      hype: {
        score: 64,
        signals: [
          "事前登録が一個月余りで40万人を突破、50万人档まで追加",
          "『刀剣乱舞』は10周年を越えた長期 IP で女性向け市場の基盤が厚い",
          "TGS2026 の主舞台に特別ステージを用意（出演声優3名＋プロデューサー）",
          "配信時期は「2026年内」で、日付はまだ未公表"
        ]
      },
      tags: ["新作", "手游", "跨平台", "パズルRPG", "刀剣乱舞", "TGS2026"]
    },

    {
      id: "over-rush",
      company: "NHN PlayArt",
      companyJp: "NHNプレイアート株式会社",
      bucket: "new",
      platformClass: "mobile",
      announceDate: "2026-09-02（TGS2026 出展発表で初公開）",
      capturedAt: "2026-09-15",
      title: { jp: "OVER RUSH", cn: "OVER RUSH", en: "OVER RUSH" },
      genre: "高速卡牌对战 RPG（カードバトル RPG）",
      platforms: ["iOS", "Android"],
      release: "2026年冬（予定）",
      releasePrecision: "季",
      summary: "NHN PlayArt 的完全新作卡牌战斗 RPG，在 2026-09-02 的 TGS2026 出展发表中首次公开。官方定位为「高速カードバトル RPG」，玩法特征是玩家与新登场的 AI 机器人协力作战。「高速」指向卡牌效果与发动时机的紧凑对决。本作与《刀剑乱舞 ぱずぎり》《幻想世界的软绵绵波呦》同为该社时隔 8 年重返 TGS 时公开的 3 款新作，TGS2026 在 2 号馆 NHN PlayArt 展台提供试玩。",
      highlight: "NHN PlayArt 在拼图品类之外开辟的卡牌战线，是 TGS2026 该社三款新作里唯一没有 IP 背书的原创作品。",
      mobile: {
        status: "配信予定（2026年冬／TGS2026 で初公開）",
        os: ["iOS", "Android"],
        monetization: "未公表（基本無料＋アイテム課金型と見られる）",
        preReg: {
          open: false,
          reward: "2026-09 時点で事前登録の開始は未発表。TGS2026 の NHN PlayArt ブース（第2ホール）で試遊を出展予定"
        },
        developer: "NHNプレイアート株式会社",
        publisher: "NHNプレイアート株式会社",
        region: "日本",
        distribution: "App Store / Google Play（予定。詳細は続報待ち）",
        ipSource: "NHN PlayArt の完全新規オリジナル IP",
        series: "NHN PlayArt は『#コンパス』（累計2,000万DL）『妖怪ウォッチ ぷにぷに』（国内3,600万DL）『DISSIDIA DUELLUM FINAL FANTASY』を運営。本作は同社が8年ぶりに TGS へ復帰するタイミングで初公開された新作3本のうちの1本",
        features: [
          "カードの効果と発動タイミングを読み合う高速なカードバトル RPG",
          "新たな AI ロボットと協力して戦うことが本作の特徴とされる",
          "TGS2026 の NHN PlayArt ブース（第2ホール）で試遊を出展",
          "同社の新作3本（刀剣乱舞 ぱずぎり／幻想世界のぷちぽよん／OVER RUSH）の1本として同時初公開された"
        ],
        synopsis: "カードの効果と発動のタイミングを読み合う高速カードバトル RPG。プレイヤーは新たな AI ロボットと協力して戦う。2026-09-02 の TGS2026 出展発表で初公開され、ゲーム内容の詳細は会場と続報で順次公開される見込み。",
        cast: "未発表"
      },
      news: [
        { source: "Inven Global（TGS2026 出展・三款新作首次公开）", url: "https://www.invenglobal.com/articles/25465/nhn-playart-to-exhibit-at-tgs-for-first-time-in-8-years-unveiling-7-titles" },
        { source: "Third News（OVER RUSH＝高速卡牌对战 RPG／与新型 AI 机器人协力）", url: "https://third-news.com/article/b628cf02-a5ca-11f1-812f-9ca3ba08e13f" },
        { source: "Chosun Biz（NHN PlayArt TGS2026 三款新作发表）", url: "https://biz.chosun.com/en/en-it/2026/09/02/P2P5LCCVNRGAZATCJGRTWHKYD4/" }
      ],
      videos: [
        { label: "TGS2026 出展阵容报道（三款新作首次公开）", platform: "媒体", url: "https://en.edaily.co.kr/news/eda202609025197" },
        { label: "NHN PlayArt 官方站（TGS2026 特设页）", platform: "官方站", url: "https://www.nhn-playart.com/" }
      ],
      hype: {
        score: 50,
        signals: [
          "NHN PlayArt 在拼图品类有成熟用户盘，但卡牌对战是该公司的新战线",
          "TGS2026 三款新作同时首发，展台曝光集中",
          "公式の配信日・事前登録はいずれも未発表で、情報量はまだ薄い"
        ]
      },
      tags: ["新作", "手游", "カードバトル", "NHN", "TGS2026"],
      caution: "配信時期「今冬」は外部トラッキング情報。NHN PlayArt の公式発表時点では本作の配信日は未公表で、TGS2026（9/17-21）での続報待ち"
    },

    {
      id: "exe-arena",
      company: "BOUNTYKINDS SOLUTIONS",
      companyJp: "BOUNTYKINDS SOLUTIONS INC.（日本語表記は未確認）",
      bucket: "new",
      platformClass: "mobile",
      announceDate: "2026-09（TGS2026 出展詳細・10月リリース告知）",
      capturedAt: "2026-09-15",
      title: { jp: "EXE ARENA", cn: "EXE ARENA", en: "EXE ARENA" },
      genre: "策略卡牌 × 实时动作（リアルタイムカードアクション）",
      platforms: ["iOS", "Android"],
      release: "2026-10",
      releasePrecision: "月",
      summary: "BOUNTYKINDS SOLUTIONS 开发发行的实时卡牌动作手游，把卡组构筑的策略性与实时操作融合——卡牌的摆放位置与发动时机直接左右战局。世界观与角色设计由曾参与《FINAL FANTASY VII》《FINAL FANTASY VIII》《クロノ・トリガー》的 Nakatani Yukio 监修，制作人为松林悠太（前 Good 8 Squad 社长，电竞业务出身）。部分卡牌以区块链形式记录、可作为玩家自有的数字资产交易，并计划导入观战投注功能。2026 年 10 月正式上线，事前登录进行中；TGS2025（09-W09）与 TGS2026（11 号馆 11-E08）两届连续出展并提供试玩。",
      highlight: "Web3 × 卡牌 × 实时动作的混合体；TGS 两届连续出展、10 月即上线，是 TGS2026 手游展区里最贴近上线窗口的新作之一。",
      mobile: {
        status: "事前登録受付中（2026年10月 正式リリース予定）",
        os: ["iOS", "Android"],
        monetization: "基本無料（アイテム課金あり）",
        preReg: {
          open: true,
          since: "2026年（iOS / Android で事前登録キャンペーン実施中）",
          reward: "登録者数に応じて段階配布。10,000人：ARK 150（ガチャ1回分）／50,000人：プラチナ以上確定チケット（全員）／100,000人：ARK 1,050（ガチャ7回分）。参加チャネルは X・LINE・メールアドレス・アプリストア予約の4系統で、カウントは全チャネル合算。報酬はサービス開始後に1人1回受け取り"
        },
        developer: "BOUNTYKINDS SOLUTIONS INC.",
        publisher: "BOUNTYKINDS SOLUTIONS INC.",
        region: "日本（日本語。海外展開は未発表）",
        distribution: "App Store / Google Play",
        ipSource: "オリジナル。世界観・キャラクターデザイン監修に『FINAL FANTASY VII』『VIII』『クロノ・トリガー』参加のアーティスト（Nakatani Yukio）を起用",
        series: "BOUNTYKINDS SOLUTIONS は 2022 年設立。同名のブロックチェーンゲーム『Bountykinds』を運営しており、本作は同社の新規 IP にあたる。TGS は 2025・2026 と2年連続で出展",
        features: [
          "カードゲームの戦略性にリアルタイムアクションを融合した「リアルタイムカードアクション」。カードの配置と発動タイミングが勝敗を左右する",
          "自分でデッキを組んで戦略を立てる構築要素",
          "毎日プレイしてデッキを強化するサイクル。勝利でガチャチケットを獲得し、新カード入手とデッキ強化を繰り返す成長ループ",
          "一部のカードはブロックチェーン上に記録され、プレイヤーが所有するデジタル資産になる。マーケットプレイス取引や外部サービス連携を予定",
          "正式リリース後にトーナメントを開催予定（上位入賞者に限定報酬）",
          "観戦者が特定プレイヤーにベットできる観戦ベッティング機能を計画",
          "TGS2026 は 11 号館スマートフォンゲームコーナー 11-E08 に出展し試遊台を設置。来場者にオリジナルスクイーズ、試遊者にメッシュエコバッグと特製ステッカーを配布（数量限定）"
        ],
        synopsis: "カードの効果と発動タイミングを読み合うリアルタイムのカードバトル。プレイヤーは自分だけのデッキを組み、相手の出方を伺いながらリアルタイムで操作して戦う。一部のカードはブロックチェーン上に記録され、プレイヤーが保有・取引できる資産として設計されている。",
        cast: "世界観・キャラクターデザイン監修：Nakatani Yukio（『FINAL FANTASY VII』『FINAL FANTASY VIII』『クロノ・トリガー』に参加）。プロデューサー：松林悠太"
      },
      news: [
        { source: "Yomimono（ASCII.jp ほか6媒体集約：TGS2026 出展・10月リリース）", url: "https://www.yomimono.id/exe-arena-gets-trial-play-booth-at-tokyo-game-show-2026" },
        { source: "Yomimono（事前登録キャンペーン開始と報酬段階）", url: "http://yomimono.id/exe-arena-pre-registration-campaign-begins-on-ios-and-android" },
        { source: "GAME NEWS TOKYO（TGS2025 出展・2026年リリース発表と監修者）", url: "https://game-news.asia/article/840886" },
        { source: "Saiga NAK（TGS2025 ブース発表・5つの次世代ゲーム特徴）", url: "https://saiganak.com/event/tgs2025-exearena-booth-announcement/amp" }
      ],
      videos: [
        { label: "TGS2026 出展・試遊台の告知（配布物含む）", platform: "媒体", url: "https://www.yomimono.id/exe-arena-gets-trial-play-booth-at-tokyo-game-show-2026" },
        { label: "TGS2025 ブース出展と製品概要", platform: "媒体", url: "https://saiganak.com/event/tgs2025-exearena-booth-announcement/amp" }
      ],
      hype: {
        score: 46,
        signals: [
          "TGS2025・TGS2026 と2年連続で出展し、試遊台を常設",
          "10月の正式リリースが告知済みで、上线窗口が最も近い新作のひとつ",
          "Web3（カードの資産化）を前面に出した設計で、国内スマホ市場での受け止めは未知数",
          "開発元は 2022 年設立の小規模スタジオで、既存 IP を持たない"
        ]
      },
      tags: ["新作", "手游", "カードゲーム", "Web3", "TGS2026"],
      caution: "開発元 BOUNTYKINDS SOLUTIONS INC. の所在地・資本関係は公式ページで確認できず（日本語 PR リリースと TGS スマートフォンゲームコーナー出展から日本法人として扱う）。監修者の日本語表記は未確認のため英語表記のまま記録"
    },

    /* ---------- 观测窗口扩展补收：2026-07-15 ~ 2026-08-31 ----------
     * 注意：本数组的书写顺序仅供人工维护阅读，**不是页面展示顺序**。
     * 页面卡片顺序由前端 assets/app.js 的排序器决定（默认「最新抓取」）。
     * 每次巡检把新条目补在本数组头部，便于 diff 与人工核对。 */

    /* ---------- LEVEL-5「LEVEL5 VISION 2026 II 夢」（2026-09-10 发表） ---------- */

    /* 本体在窗口外发售、但窗口内有付费 DLC 发表 —— 按 2026-09-15 新口径建条目。
       本体『ファンタジーライフi』2025 年発売、DLC は 2026-09-10 の
       「LEVEL5 VISION 2026 II 夢」内で発表。 */
    {
      id: "fantasy-life-i-celestial-express",
      company: "LEVEL-5",
      companyJp: "株式会社レベルファイブ",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09-10",
      capturedAt: "2026-09-15",
      title: { jp: "ファンタジーライフi 有料大型DLC「天界列車としあわせの終着駅」", cn: "幻想生活 i 付费大型 DLC「天界列车与幸福终点站」", en: "FANTASY LIFE i: The Girl Who Steals Time — The Celestial Express" },
      genre: "慢生活 RPG（大型付费追加内容）",
      platforms: ["Nintendo Switch 2", "Nintendo Switch", "PlayStation 5", "PlayStation 4", "Xbox Series X|S", "PC (Steam)"],
      release: "未定",
      releasePrecision: "未定",
      summary: "LEVEL-5 在线上发表会「LEVEL5 VISION 2026 II 夢」公布了《幻想生活 i 转圈圈的龙和偷取时间的少女》的付费大型追加内容《天界列车与幸福终点站》。本体已发售且累计出货据报突破百万，这次 DLC 面向已通关玩家扩展终盘内容：在既存最高职业等级「英雄」之上新增「神候补（神みならい）」与「神（ゴッド）」两个等级；制作系统新增同一配方可产出不同外观的模式，部分「神配方」制成品会附带「神技能」；新增会飞行随行的支援系配件；新增特殊坐骑，装配神级制作部件后外观与性能会变化、且骑乘时可攻击；另追加新家具套装与房屋设计、新怪物与采集物，以及比「金冠」更强的「神冠」等级。发售日与价格官方均未公布。",
      highlight: "本体销量破百万的长卖作品首次推出付费大型 DLC，把职业上限从「英雄」直接推到「神」，属终盘内容的大幅扩容；也是本站首次按「DLC 也收」口径收录的条目。",
      console: {
        status: "発売時期未定（2026-09-10 の「LEVEL5 VISION 2026 II 夢」で発表）",
        os: ["Nintendo Switch 2", "Nintendo Switch", "PlayStation 5", "PlayStation 4", "Xbox Series X|S", "PC (Steam)"],
        monetization: "未発表（「有料大型DLC」と告知。価格は未公表）",
        developer: "レベルファイブ 大阪開発室",
        publisher: "レベルファイブ",
        region: "日本（本体は世界展開済み。DLC の地域展開は未発表）",
        distribution: "ダウンロード（本体の各ストア経由とみられるが、DLC 単体の配信方法は公式に明示なし）",
        features: [
          "既存最高ランク「英雄」の上に「神みならい」「ゴッド」の 2 ランクを新設、各ライフごとに新たな試練へ挑戦",
          "クラフトに新モードを追加：同一レシピから見た目の異なるアイテムを作成でき、ゴッドレシピ製の一部には「ゴッドスキル」が付く",
          "飛び回って冒険を助ける新アクセサリーを追加（媒体により「Wingmate」／「Otomobile」と表記が分かれる）",
          "新たな特殊マウント：ゴッドランクのクラフトで作るパーツを装着すると外観と性能が変化し、騎乗したまま攻撃も可能",
          "新家具セット・新たな家のデザイン、新モンスター、新採集物を追加",
          "ゴールドクラウンより上位の「ゴッドクラウン」を新設"
        ],
        synopsis: "本体『ファンタジーライフi グルグルの竜と時をぬすむ少女』の物語を終えた後の暮らしを拡張する有料大型コンテンツ。各ライフの最上位ランクと、それに紐づくクラフト・装備・拠点要素をまとめて追加する。",
        ipSource: "『ファンタジーライフ』シリーズ（LEVEL-5）",
        series: "本体は世界累計出荷 100 万本超と報じられる長寿タイトル。シリーズでは 3DS『ファンタジーライフ LINK!』以来となる「神みならい／ゴッド」ランクの復活"
      },
      news: [
        { source: "Nintendo Everything（DLC 発表・日野晃博コメント）", url: "https://nintendoeverything.com/fantasy-life-i-the-girl-who-steals-time-announces-the-celestial-express-dlc/" },
        { source: "GoNintendo（価格・発売日いずれも未公表と明記）", url: "https://gonintendo.com/contents/64833-fantasy-life-i-the-celestial-express-paid-dlc-announced" },
        { source: "Gematsu（LEVEL-5 タグ／発表一覧）", url: "https://www.gematsu.com/tag/level-5" },
        { source: "Nintendo Life（Vision 2026 II 全発表まとめ）", url: "https://www.nintendolife.com/news/2026/09/round-up-everything-announced-in-the-level-5-vision-2026-ii-showcase" }
      ],
      videos: [
        { label: "「LEVEL5 VISION 2026 II 夢」配信内で発表（LEVEL-5 公式サイト）", platform: "官方站", url: "https://www.level5.co.jp/" },
        { label: "Nintendo Life 全発表まとめ", platform: "媒体", url: "https://www.nintendolife.com/news/2026/09/round-up-everything-announced-in-the-level-5-vision-2026-ii-showcase" }
      ],
      hype: {
        score: 71,
        signals: [
          "本体は世界累計 100 万本超（中国語メディア報道）の長寿タイトルで、追加コンテンツへの関心は高い",
          "発売日・価格がいずれも未公表のため、話題は即時爆発型ではなく持続型",
          "Nintendo Everything / GoNintendo / Nintendo Life など英米メディアが一斉に報道、海外カバレッジ良好"
        ]
      },
      tags: ["追加内容", "DLC", "慢生活RPG", "多平台", "LEVEL-5"],
      caution: "① DLC 自身の対応機種・価格・配信日・配信方法は公式に未発表。ここには本体の家庭用・PC 対応機種を記載した（本体は iOS / Android 版も 2026-08-20 より配信）。② 新アクセサリーは Nintendo Everything が「Wingmate」、yomimono 経由の報道が「Otomobile」と表記し、同一物かは未確認——判定せず両方記録。③ 本体の価格帯は DLC 価格とは無関係。"
    },

    {
      id: "layton-curious-village-remake",
      company: "LEVEL-5",
      companyJp: "株式会社レベルファイブ",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09-10",
      capturedAt: "2026-09-15",
      title: { jp: "レイトン教授と不思議な町 Remake", cn: "雷顿教授与不可思议的小镇 重制版", en: "Professor Layton and the Curious Village Remake" },
      genre: "解谜冒险（重制）",
      platforms: ["Nintendo Switch", "Nintendo Switch 2", "PlayStation 5", "PC (Steam)"],
      release: "2027年",
      releasePrecision: "年",
      summary: "「LEVEL5 VISION 2026 II 夢」压轴公开的系列原点重制。2007 年 Nintendo DS 版《雷顿教授与不可思议的小镇》以 3D 角色模型重建，动画过场做高解析度与宽屏化重制，原本依赖双屏与触控笔的解谜流程改为单屏点选操作。故事不变：雷顿教授与助手路克受已故大富翁雷恩霍德男爵的遗产分配之谜所托，前往奇异小镇 St. Mystere 寻找隐藏的家宝「黄金果实」。初代配音阵容原样保留（雷顿：大泉洋／路克：堀北真希）。这是系列主线首次登陆 PlayStation 硬件。",
      highlight: "系列原点首次离开 DS：2027 年登陆 Switch / Switch 2 / PS5 / Steam，是系列主线第一次上 PlayStation。",
      console: {
        status: "2027年発売予定",
        os: ["Nintendo Switch", "Nintendo Switch 2", "PlayStation 5", "PC (Steam)"],
        monetization: "未発表",
        developer: "レベルファイブ",
        publisher: "レベルファイブ",
        region: "未発表（日本での発売は確定）",
        distribution: "未発表",
        stores: ["Nintendo eShop", "PlayStation Store", "Steam"],
        features: [
          "2007 年ニンテンドー DS 版『レイトン教授と不思議な町』を 3D キャラクターモデルで全面的に再構築",
          "アニメーションカットは HD 化・ワイド画面化。二画面＋タッチペン前提だった謎解きを 1 画面のポイント操作に再設計",
          "初代の声優陣をそのまま起用（レイトン：大泉洋／ルーク：堀北真希）",
          "シリーズ本編としては初の PlayStation ハード展開"
        ],
        synopsis: "亡くなった大富豪レインホルド男爵の遺産分配の謎を解くため、レイトン教授と助手ルークが不思議な町セント・ミスティを訪れ、隠された家宝「黄金の果実」を探す。物語は初代から変更なし。",
        cast: "レイトン教授：大泉洋 ／ ルーク：堀北真希",
        ipSource: "『レイトン教授』シリーズ第 1 作（2007 年／ニンテンドー DS）のリメイク",
        series: "シリーズ累計は 2,000 万本超。本作はシリーズ本編初の PlayStation 展開"
      },

      news: [
        { source: "Anime News Network（重制发表与系列沿革）", url: "https://www.animenewsnetwork.com/news/2026-09-10/professor-layton-and-the-curious-village-game-gets-remake/.241627" },
        { source: "Saiga NAK（发表内容与配音阵容）", url: "https://saiganak.com/zh/news/level5-professor-layton-fushigi-remake-announcement/" }
      ],
      videos: [
        { label: "Vision 2026 II 公开前导 PV 报道", platform: "媒体", url: "https://www.animenewsnetwork.com/news/2026-09-10/professor-layton-and-the-curious-village-game-gets-remake/.241627" },
        { label: "官方站（レイトン教授と不思議な町 Remake）", platform: "官方站", url: "https://www.layton.jp/fushigi-remake/" },
        { label: "官方 X @L5_layton", platform: "X", url: "https://x.com/L5_layton" }
      ],
      hype: {
        score: 72,
        signals: [
          "系列原点重制，且是系列主线首次登陆 PlayStation，海外多语种媒体覆盖广",
          "初代声优阵容（大泉洋／堀北真希）原样保留，情怀信号强",
          "发行窗口仅标注 2027 年、无月份；谜题是否扩充、触控解谜如何改为手柄操作均未公开"
        ]
      },
      tags: ["新作", "重制", "解谜", "IP回归", "多平台"],
      caution: "中文对应：中文媒体汇总提到本作「将支持中文」，官方日文口径未见明确记载，待后续确认。"
    },

    {
      id: "yokai-watch-2-hadou",
      company: "LEVEL-5",
      companyJp: "株式会社レベルファイブ",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09-10",
      capturedAt: "2026-09-15",
      title: { jp: "妖怪ウォッチ2 覇道", cn: "妖怪手表2 霸道", en: "YO-KAI WATCH 2: Haunted Domain" },
      genre: "RPG（クロスメディア企画）",
      platforms: ["Nintendo Switch 2", "PlayStation 5", "PC (Steam)"],
      release: "未定（発売時期未発表）",
      releasePrecision: "未定",
      summary: "《妖怪手表2》系列首款完全重制。以 2014 年 Nintendo 3DS 版三个版本（元祖／本家／真打）为基础、以内容最完整的《真打》为开发基准，把三版本整合进一部作品——所有妖怪都能在单一游戏内成为伙伴，不再需要版本间交换或重复购买。画面全面翻新，并追加原版没有的新剧情与新妖怪。9/9 Nintendo Direct 首次预告（当时只公布 Switch 2），9/10「LEVEL5 VISION 2026 II 夢」补上 PS5 与 Steam。官方站已开设，后续情报由官方站与系列官方 X 发布。",
      highlight: "把「元祖／本家／真打」三版本合而为一并追加新剧情与新妖怪，是该系列首款完全重制，也是系列首次登陆 PS5 / Steam。",
      console: {
        status: "発売時期未発表（正式な発売時期は公式から告知されていない）",
        os: ["Nintendo Switch 2", "PlayStation 5", "PC (Steam)"],
        monetization: "未発表",
        developer: "レベルファイブ",
        publisher: "レベルファイブ",
        region: "全世界向け発売を予定（初出は Nintendo Direct の Nintendo Switch 2）",
        distribution: "未発表",
        stores: ["Nintendo eShop", "PlayStation Store", "Steam"],
        features: [
          "2014 年ニンテンドー 3DS 版『妖怪ウォッチ2 元祖／本家／真打』の完全リメイク。開発は最も内容の厚い『真打』を基準にする",
          "3 バージョンを 1 本に統合し、バージョン間の交換や複数購入をせずに全ての妖怪を仲間にできる",
          "グラフィックを全面的に刷新（3DS のスプライトからフル 3D のキャラクターモデルと環境へ）",
          "オリジナルにはなかった追加ストーリーと新妖怪を制作中",
          "戦闘はメダル召喚システムを踏襲しつつ、演出とロード時間を改善"
        ],
        synopsis: "主人公ケータがウィスパー、ジバニャンとともに、妖怪が引き起こす怪事件に巻き込まれながら日常を過ごす。拡張版『真打』の物語を軸に、追加エピソードと新妖怪が加わる。",
        cast: "未発表",
        ipSource: "『妖怪ウォッチ』シリーズ／『妖怪ウォッチ2』（2014 年／ニンテンドー 3DS）",
        series: "『妖怪ウォッチ2』はシリーズで最も売れた一作。本作はシリーズ初の PS5／Steam 展開"
      },

      news: [
        { source: "Inven Global（Vision 2026 II 重制详情）", url: "https://www.invenglobal.com/articles/25802/professor-layton-and-the-curious-village-remake-revealed-at-level-5-vision-showcase" },
        { source: "Quest Board.JP（发表内容与官方渠道）", url: "https://quest-board.jp/en/quests/buzz-2-nintendoswitch2-20260910" }
      ],
      videos: [
        { label: "Vision 2026 II 公开预告片报道（含新画面）", platform: "媒体", url: "https://saiganak.com/news/level5-yw2-hadou-announcement/amp" },
        { label: "官方站（妖怪ウォッチ2 覇道）", platform: "官方站", url: "https://www.youkai-watch.jp/yw2-hadou" },
        { label: "官方 X @game_yokai", platform: "X", url: "https://x.com/game_yokai" }
      ],
      hype: {
        score: 71,
        signals: [
          "《妖怪手表2》是系列销量最高的一作，重制消息在 Nintendo Direct 与 Vision 两场连续曝光",
          "三版本合一 + 新增妖怪，直接解决老玩家的收集与换版痛点；海外关注点集中在「首次登陆 PS5 / Steam」",
          "发售时期未定、无实机战斗画面，玩法改动幅度仍是未知数"
        ]
      },
      tags: ["新作", "重制", "RPG", "IP回归", "多平台"]
    },

    {
      id: "inazuma-eleven-bold-revolution",
      company: "LEVEL-5",
      companyJp: "株式会社レベルファイブ",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09-10",
      capturedAt: "2026-09-15",
      title: { jp: "イナズマイレブン 烈火の革命", cn: "闪电十一人 烈火的革命", en: "Inazuma Eleven: Bold Revolution" },
      genre: "足球 RPG（正统续作）",
      platforms: ["未発表"],
      release: "未定（対応機種・発売時期ともに未発表）",
      releasePrecision: "未定",
      summary: "《闪电十一人 英雄们的胜利之路》的正统续作，发表时仅公开标题与 LOGO，并首次亮相新主角「降星凪（ふるほし なぎ）」。日野晃博说明降星凪与笹波云明一样拥有非寻常的身世，两人将在故事中正面交汇；前作主角笹波云明亦确认继续登场，形成双主角结构。对应平台、发售时期与标题含义均保留到下一次「LEVEL5 VISION」公开。",
      highlight: "前作《胜利之路》年内销量突破 80 万套后立刻公布正统续作，但只给了标题与新主角——情报刻意留白。",
      console: {
        status: "対応機種・発売時期ともに未発表",
        monetization: "未発表",
        developer: "レベルファイブ",
        publisher: "レベルファイブ",
        region: "未発表",
        distribution: "未発表",
        features: [
          "『イナズマイレブン 英雄たちのヴィクトリーロード』の正統続編",
          "発表時点で公開されたのはタイトルとロゴのみで、実機映像・対応機種・発売時期は非公開",
          "新主人公「降星ナギ（ふるほし なぎ）」が初登場",
          "日野晃博は、降星ナギが笹波雲明と同様に尋常でない出自を持ち、物語で正面から交わると説明",
          "前作主人公の笹波雲明も引き続き登場し、ダブル主人公構成になる見込み"
        ],
        synopsis: "新主人公の降星ナギと前作主人公の笹波雲明の二人を軸に展開するサッカー RPG。タイトルの意味や舞台は次回の『LEVEL5 VISION』まで伏せられている。",
        cast: "未発表",
        ipSource: "『イナズマイレブン』シリーズ",
        series: "前作『英雄たちのヴィクトリーロード』は 2026 年内に累計 80 万本を突破し、IP は回復基調にある"
      },

      news: [
        { source: "RPG Site（发表内容与主角设定）", url: "https://www.rpgsite.net/news/21344-inazuma-eleven-bold-revolution-revealed-as-sequel-to-victory-road" },
        { source: "Ludens Media（新角色降星凪报道）", url: "https://www.ludens.com.tw/inazuma-eleven-victory-road-fire-revolution" }
      ],
      videos: [
        { label: "发表影片报道（标题与新主角登场）", platform: "媒体", url: "https://www.rpgsite.net/news/21344-inazuma-eleven-bold-revolution-revealed-as-sequel-to-victory-road" },
        { label: "官方站（イナズマイレブン 英雄たちのヴィクトリーロード）", platform: "官方站", url: "https://www.inazuma.jp/victory-road/" }
      ],
      hype: {
        score: 66,
        signals: [
          "系列最新作的直接续作，官方 X 公布后当日即成为日本社媒话题",
          "前作《勝利之路》2026 年内销量突破 80 万套，IP 处于回升期",
          "发表仅标题与主角，无实机画面、无平台、无档期，信息量偏薄"
        ]
      },
      tags: ["新作", "发表", "RPG", "足球", "IP续作"]
    },

    {
      id: "holy-horror-mansion",
      company: "LEVEL-5",
      companyJp: "株式会社レベルファイブ",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09-10",
      capturedAt: "2026-09-15",
      title: { jp: "ホーリーホラーマンション", cn: "幽幽灵公寓", en: "HOLY HORROR MANSION" },
      genre: "幽灵创造 RPG（クロスメディア企画）",
      platforms: ["Nintendo Switch 2", "PlayStation 5", "PC (Steam)"],
      release: "2027年",
      releasePrecision: "年",
      summary: "以「家庭」为主题、继承《妖怪手表》精神内核的幽灵创造 RPG，本次首次公开 2027 年发售窗口与全平台。玩家用幽灵相机「Cameron」拍摄灵魂强烈的物体，把物件变成可成为伙伴的「物怪（Mononoke）」；把遮阳伞、树篱等物件「游乐场化」成蹦床；甚至把拍摄对象整个变成可探索的迷宫（演示中出现了钻进蛋糕内部探索的段落）。入夜后城镇氛围转为诡异并出现 Boss 战，战斗背景音乐为舞曲。剧情围绕主角与伙伴物怪对抗邪恶企业 De Ville Corp。LEVEL-5 称本作是其史上最大规模的跨媒体企划，玩具与周边线将在日后专门的跨媒体发表会上公开。TGS2026 提供试玩。",
      highlight: "LEVEL-5 自认「史上最大跨媒体企划」，2027 年登陆 Switch 2 / PS5 / Steam，TGS2026 首次提供试玩。",
      console: {
        status: "2027年発売予定",
        os: ["Nintendo Switch 2", "PlayStation 5", "PC (Steam)"],
        monetization: "未発表",
        developer: "レベルファイブ",
        publisher: "レベルファイブ",
        region: "未発表（日本での発売は確定）",
        distribution: "未発表",
        stores: ["Nintendo eShop", "PlayStation Store", "Steam"],
        features: [
          "霊を撮影して仲間にする「ゴースト創造 RPG」。撮影用カメラ「Cameron」で強い魂が宿る物体を撮ると「物怪（モノノ怪）」になる",
          "撮影した物体を遊具に変える（パラソルや生け垣をトランポリンにする等）、撮影対象そのものを探索可能な迷宮に変える",
          "夜になると町の雰囲気が一変してボス戦が発生、戦闘 BGM はダンスミュージック",
          "物語は、主人公と仲間の物怪が悪徳企業 De Ville Corp に立ち向かう内容",
          "3 体のゴーストのモーション原型は WARPs UP の SANTA、ピコ太郎、avantgardey から取材",
          "レベルファイブ史上最大規模のクロスメディア企画と位置づけられ、玩具・関連グッズは別途の発表会で公開予定",
          "TGS2026 で試遊出展"
        ],
        synopsis: "「家族」をテーマに、『妖怪ウォッチ』の精神的な後継として作られる新規 IP。祖母のアパートの鍵のかかった部屋でカメラを見つけた少年が幽霊と出会い、そこから物語が始まる。",
        cast: "未発表",
        ipSource: "レベルファイブの新規オリジナル IP（『妖怪ウォッチ』の精神を継ぐ企画）",
        series: "新規 IP。LEVEL-5 は本作を「社史上最大規模のクロスメディア企画」と説明している"
      },

      news: [
        { source: "Gematsu（2027 窗口与玩法说明）", url: "https://www.gematsu.com/2026/09/holy-horror-mansion-launches-in-2027-for-ps5-switch-2-and-pc" },
        { source: "Anime News Network（幽灵动作取材自真实表演者）", url: "https://www.animenewsnetwork.com/news/2026-09-10/level-5-holy-horror-mansion-game-trailer-reveals-2027-release-for-switch-2-ps5-pc/.241630" }
      ],
      videos: [
        { label: "Vision 2026 II 公开预告与实机演示报道", platform: "媒体", url: "https://finalweapon.net/2026/09/10/holy-horror-mansion-releases-in-2027-for-pc-ps5-and-switch-2/" },
        { label: "官方站（ホーリーホラーマンション）", platform: "官方站", url: "https://www.holy-horror.jp/" }
      ],
      hype: {
        score: 74,
        signals: [
          "「什么东西都能互动」的实机演示在海外多语种媒体获得较高评价",
          "被定位为 LEVEL-5 史上最大跨媒体企划，玩具・周边线规模尚未公开",
          "三个幽灵的动作原型分别取自 WARPs UP 的 SANTA、ピコ太郎、avantgardey，话题性强"
        ]
      },
      tags: ["定档", "RPG", "IP新企划", "跨媒体", "TGS2026"]
    },

    {
      id: "decapolice",
      company: "LEVEL-5",
      companyJp: "株式会社レベルファイブ",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09-10",
      capturedAt: "2026-09-15",
      title: { jp: "デカポリス", cn: "DECAPOLICE", en: "DECAPOLICE" },
      genre: "犯罪悬疑 RPG",
      platforms: ["Nintendo Switch 2", "PlayStation 5", "PC (Steam)"],
      release: "2027年",
      releasePrecision: "年",
      summary: "2023 年首次发表、此后长期沉寂的犯罪悬疑 RPG。本次公开新 PV，同时把档期从 2026 年推迟到 2027 年——这是第四次延期。玩法在现实与虚拟空间之间往返：在虚拟空间重现的犯罪现场搜集证据、取得相关人员证言，再把情报连接起来推断犯人。特色是把「搜查 → 推理 → 逮捕 → 战斗」串成一个不中断的流程，而不是查到犯人就结束。主线本身埋有贯穿全作的大谜团，另有独立于主线的案件委托（案件任务的谜题设计由 SCRAP 负责）。TGS2026 提供试玩。",
      highlight: "第四次延期，正式落入 2027 年；作为补偿，TGS2026 首次提供现场试玩。",
      console: {
        status: "2027年発売予定（2026 年から延期）",
        os: ["Nintendo Switch 2", "PlayStation 5", "PC (Steam)"],
        monetization: "未発表",
        developer: "レベルファイブ",
        publisher: "レベルファイブ",
        region: "未発表（日本での発売は確定）",
        distribution: "未発表",
        stores: ["Nintendo eShop", "PlayStation Store", "Steam"],
        features: [
          "現実と仮想空間を行き来して事件を解決する犯罪サスペンス RPG",
          "仮想空間に再現された犯罪現場で証拠を集め、関係者の証言を確保し、情報を繋いで犯人を推理する",
          "「捜査 → 推理 → 逮捕 → 戦闘」を途切れさせず一連の流れとして繋ぐのが本作の特徴",
          "本編には全編を貫く大きな謎が埋め込まれ、過去作にはない予想外の展開が用意されている",
          "本編とは別に、様々な事件を扱うケースクエストを用意（謎解きの設計は SCRAP が担当）",
          "TGS2026 でシリーズ初の試遊出展"
        ],
        synopsis: "近未来の犯罪都市を舞台に、刑事となって仮想空間と現実を往復しながら様々な事件を解決していく。開発には時間を要しているが、従来のゲームとは異なる新しい遊びを目指して作り込んでいるという。",
        cast: "未発表",
        ipSource: "レベルファイブの新規オリジナル IP",
        series: "2023 年に初発表。今回で 4 度目の延期となり、発売時期が 2026 年から 2027 年に変更された"
      },

      news: [
        { source: "Inven Global（玩法说明与 2027 档期）", url: "https://www.invenglobal.com/articles/25802/professor-layton-and-the-curious-village-remake-revealed-at-level-5-vision-showcase" },
        { source: "Android Hire（历次延期的沿革）", url: "https://www.androidhire.com/level-5-vision-2026-announcements" }
      ],
      videos: [
        { label: "Vision 2026 II 公开新 PV 报道", platform: "媒体", url: "https://simulationdaily.com/news/professor-layton-curious-village-remake-level-5/" },
        { label: "官方站（デカポリス）", platform: "官方站", url: "https://www.decapolice.jp/" }
      ],
      hype: {
        score: 68,
        signals: [
          "长期延宕反而积累了关注度，海外媒体以「终于有新情报」为报道角度",
          "SCRAP 参与案件任务设计，推理品类的差异化点清晰",
          "四次延期削弱信任，且「2027 年」仍无月份"
        ]
      },
      tags: ["定档", "RPG", "悬疑", "延期", "TGS2026"]
    },

    {
      id: "snack-world-reloaded",
      company: "LEVEL-5",
      companyJp: "株式会社レベルファイブ",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09-10",
      capturedAt: "2026-09-15",
      title: { jp: "スナックワールド RELOADED", cn: "点心大冒险 Reloaded", en: "Snack World: Reloaded" },
      genre: "动作 RPG（重制）",
      platforms: ["Nintendo Switch 2", "PlayStation 5", "PC (Steam)"],
      release: "2027年",
      releasePrecision: "年",
      summary: "《点心大冒险》系列重制新作，以 2017 年 Nintendo 3DS《スナックワールド トレジャラーズ》的加强版《トレジャラーズ ゴールド》为基础重新制作。日野晃博强调本作不只是提高画质，而是对游戏性、操作手感与故事内容都做大幅调整，规模「几乎可称为新作」：战斗动作与演出手感重做、打宝循环强化、画面重绘成宛如精致立体模型的质感。并追加原版没有的新模式，可操作动画版主角「恰普（チャップ）」从另一个视角体验故事。TGS2026 提供试玩。",
      highlight: "官方定位是「几乎可称为新作」的重制，新增可操作动画主角恰普的模式，2027 年登陆 Switch 2 / PS5 / Steam。",
      console: {
        status: "2027年発売予定",
        os: ["Nintendo Switch 2", "PlayStation 5", "PC (Steam)"],
        monetization: "未発表",
        developer: "レベルファイブ",
        publisher: "レベルファイブ",
        region: "未発表（日本での発売は確定）",
        distribution: "未発表",
        stores: ["Nintendo eShop", "PlayStation Store", "Steam"],
        features: [
          "2017 年ニンテンドー 3DS『スナックワールド トレジャラーズ』の強化版『トレジャラーズ ゴールド』をベースに再制作",
          "日野晃博は「単なる画質向上ではなく、ゲーム性・操作感・物語の内容にも大きく手を入れる」と説明",
          "公式は「ほぼ新作と言える規模」と位置づけ、戦闘アクションと演出の手触りを作り直し、トレジャーハントのループを強化",
          "グラフィックは精巧なジオラマの中を冒険しているような質感に描き直し",
          "オリジナルにはなかった新モードを追加し、アニメ版主人公「チャップ」を操作して別の視点から物語を追える",
          "TGS2026 で試遊出展"
        ],
        synopsis: "お菓子と宝探しをテーマにしたアクション RPG。アニメ版主人公チャップを操作する新モードにより、本編とは異なる視点から物語を体験できる。",
        cast: "未発表",
        ipSource: "『スナックワールド』シリーズ（2017 年／ニンテンドー 3DS）",
        series: "原作はテレビアニメ全 50 話を展開したクロスメディア企画。本作はシリーズ初の PS5／Steam 展開"
      },

      news: [
        { source: "Gematsu（2027 档期与日野晃博发言）", url: "https://www.gematsu.com/2026/09/snack-world-reloaded-launches-in-2027" },
        { source: "巴哈姆特（重制基础与新模式的说明）", url: "https://m.gamer.com.tw/forum/C.php?bsn=31587&snA=36147" }
      ],
      videos: [
        { label: "Vision 2026 II 公开新预告报道（战斗演出）", platform: "媒体", url: "https://finalweapon.net/2026/09/10/snack-world-reloaded-launches-in-2027-playable-at-tgs-2026" },
        { label: "官方站（スナックワールド RELOADED）", platform: "官方站", url: "https://www.snack-world.jp/reloaded/" }
      ],
      hype: {
        score: 61,
        signals: [
          "原作是 2017 年 3DS 作品并有 50 集电视动画，IP 认知度集中在日本国内",
          "官方以「几乎可称为新作」定位重制，老玩家期待值被抬升",
          "海外媒体反应平淡，主要作为 TGS 阵容的一部分被报道"
        ]
      },
      tags: ["定档", "动作RPG", "重制", "TGS2026"]
    },

    {
      id: "puchipoyon-fantasy-world",
      company: "LEVEL-5",
      companyJp: "株式会社レベルファイブ（開発・配信：株式会社NHN PlayArt）",
      bucket: "update",
      platformClass: "mobile",
      announceDate: "2026-09-10",
      capturedAt: "2026-09-15",
      title: { jp: "幻想世界のぷちぽよん", cn: "幻想世界的软绵绵波呦", en: "Pufflings: Journey Through a Fantasy World" },
      genre: "休闲拼图（スマートフォン）",
      platforms: ["iOS", "Android"],
      release: "2026年冬（予定）",
      releasePrecision: "季",
      summary: "LEVEL-5 与 NHN PlayArt 共同推出的手游，是继《妖怪手表 噗尼噗尼》（国内累计 3,600 万下载）之后两家再度合作。玩法为合体进化型拼图：把场上相同的「ぷちぽよん」连起来合体，逐步进化并组成连锁拿高分；把「クリスタルルーン」一次性破坏可积攒技能槽，用来冲击更高分数；按得分回收「ぷよオーブ」推进关卡。本次「LEVEL5 VISION 2026 II 夢」首次公开游戏片头动画与新情报，预定今年冬季上线，并计划以短篇动画与周边商品同步扩展 IP。TGS2026 在 NHN PlayArt 展台（第 2 馆）提供试玩。",
      highlight: "LEVEL-5 × NHN PlayArt 继《妖怪手表 噗尼噗尼》后的第二款合作手游，今冬上线，走「合体进化」拼图路线。",
      news: [
        { source: "Inven Global（玩法机制与新情报）", url: "https://www.invenglobal.com/articles/25802/professor-layton-and-the-curious-village-remake-revealed-at-level-5-vision-showcase" },
        { source: "Chosun Biz（NHN PlayArt TGS2026 三款新作发表）", url: "https://biz.chosun.com/en/en-it/2026/09/02/P2P5LCCVNRGAZATCJGRTWHKYD4/" }
      ],
      videos: [
        { label: "Vision 2026 II 公开片头动画与游玩影像报道", platform: "媒体", url: "https://simulationdaily.com/news/professor-layton-curious-village-remake-level-5/" },
        { label: "官方站（幻想世界のぷちぽよん）", platform: "官方站", url: "https://puchipoyon.com/" }
      ],
      hype: {
        score: 58,
        signals: [
          "NHN PlayArt 的《妖怪手表 噗尼噗尼》国内 3,600 万下载，同门拼图品类有现成用户基础",
          "LEVEL-5 首个从自家 IP 之外延伸的新拼图品牌，计划动画＋周边同步展开",
          "TGS2026 提供试玩，但事前登录尚未开始，配信日只到「今冬」"
        ]
      },
      tags: ["手游", "拼图", "新作", "NHN", "TGS2026"],
      mobile: {
        status: "配信予定（2026年冬）",
        os: ["iOS", "Android"],
        monetization: "未公表（アイテム課金型と見られる）",
        preReg: { open: false, reward: "2026年9月10日の発表時点で事前登録は未開始。TGS2026 の NHN PlayArt ブース（第2ホール）で試遊を出展予定" },
        developer: "株式会社NHN PlayArt（企画・制作：株式会社レベルファイブ）",
        publisher: "株式会社レベルファイブ / 株式会社NHN PlayArt",
        region: "日本",
        distribution: "App Store / Google Play（予定）",
        payment: [],
        ipSource: "LEVEL-5 の完全新規オリジナル IP。『妖怪ウォッチ ぷにぷに』以来となる LEVEL-5 × NHN PlayArt の共同タイトル",
        series: "両社は『妖怪ウォッチ ぷにぷに』（国内累計3,600万DL）で共同展開の実績。本作はゲームに加え、短編アニメ・関連グッズでの IP 展開を予定",
        features: ["同じ「ぷちぽよん」同士を合体させて少しずつ進化させるパズル", "画面上のぷちぽよんを連結して連鎖を組み、高得点を狙う", "「クリスタルルーン」をまとめて破壊するとスキルゲージが上昇", "獲得スコアに応じて「ぷよオーブ」を回収しステージを進める", "TGS2026 の NHN PlayArt ブース（第2ホール）で試遊出展"],
        synopsis: "同じ姿の「ぷちぽよん」同士を合体させることで一歩ずつ進化させ、画面上で連鎖をつないで高得点を目指すカジュアルパズル。クリスタルルーンを一気に壊してスキルを発動させ、貯めたぷよオーブでステージを進めていく。",
        cast: "公式にキャストの発表はなし"
      }
    },

    {
      id: "inazuma-eleven-cross",
      company: "LEVEL-5",
      companyJp: "株式会社レベルファイブ（開発・運営：株式会社Aiming）",
      bucket: "update",
      platformClass: "mobile",
      announceDate: "2026-09-10",
      capturedAt: "2026-09-15",
      title: { jp: "イナズマイレブン クロス", cn: "闪电十一人 交锋", en: "Inazuma Eleven: Cross" },
      genre: "养成模拟（スマートフォン）",
      platforms: ["iOS", "Android"],
      release: "2026-06-09（サービス開始済み）",
      releasePrecision: "日",
      summary: "《闪电十一人》系列首款智能手机向养成模拟游戏，由 LEVEL-5 发行、Aiming 开发与运营。玩家以监督身份育成选手、编成专属球队，战术判断直接决定比赛走向；比赛可完全自动进行，不擅长动作操作或只想利用碎片时间的玩家也能推进。2026 年 1 月 13 日公布配信决定，4 月 10 日开放事前登录并突破 20 万人，6 月 9 日正式开服，6 月 22 日突破 100 万下载。系列历代角色（円堂守、豪炎寺修也、松风天马、剑城京介、神童拓人、雾野兰丸、Fey、黄名子等）陆续以转蛋与活动形式登场。本次「LEVEL5 VISION 2026 II 夢」公开新内容宣传片，TGS2026 播放新游玩影像。",
      highlight: "系列首款手游，开服 13 天即突破 100 万下载；本次发布会公开新内容宣传片。",
      news: [
        { source: "Aiming 官方新闻稿一览（开服・100万DL・活动沿革）", url: "https://aiming-inc.com/ja/news/game-news/?tag=inazuma-cross" },
        { source: "Notebookcheck（TGS2026 阵容含本作新影像）", url: "https://www.notebookcheck.net/Level-5-reveals-nine-title-Tokyo-Game-Show-2026-lineup.1397681.0.html" }
      ],
      videos: [
        { label: "Vision 2026 II 公开新内容宣传片报道", platform: "媒体", url: "https://www.notebookcheck.net/Level-5-reveals-nine-title-Tokyo-Game-Show-2026-lineup.1397681.0.html" },
        { label: "官方站（イナズマイレブン クロス）", platform: "官方站", url: "https://www.inazuma-cross.jp/" },
        { label: "官方 X @inazuma_cross", platform: "X", url: "https://x.com/inazuma_cross" }
      ],
      hype: {
        score: 63,
        signals: [
          "开服 13 天突破 100 万 DL，第三方应用监测显示其在日本 Google Play 模拟类畅销榜曾进入前 20 位",
          "系列历代角色持续以转蛋形式回流，靠 IP 粉丝盘驱动",
          "游戏本体开服已过 3 个月，本次属内容更新而非新作发表"
        ]
      },
      tags: ["手游", "养成模拟", "IP改编", "已上线", "TGS2026"],
      mobile: {
        status: "正式サービス中",
        os: ["iOS", "Android"],
        monetization: "基本無料（アイテム課金制）",
        preReg: { open: false, since: "2026-04-10", reward: "累計事前登録者数 20万人を突破（2026年5月21日時点）。2026年6月9日のサービス開始に伴い受付終了" },
        developer: "株式会社Aiming",
        publisher: "株式会社レベルファイブ",
        region: "日本",
        distribution: "App Store / Google Play（日本区）",
        payment: [],
        ipSource: "LEVEL-5 のオリジナル IP『イナズマイレブン』シリーズ（2008年発のゲーム／アニメ）",
        series: "シリーズ初のスマートフォン向け育成シミュレーション。2026年1月13日に配信決定を発表、6月9日サービス開始、6月22日に100万DL突破",
        features: ["選手を育成し、オリジナルチームを編成する育成シミュレーション", "監督として戦術を組み、試合の行方を左右する", "試合は完全自動進行にも対応（操作が苦手な層・すき間時間向け）", "シリーズ歴代キャラクターがガチャ・イベントで順次登場", "シーズン制でメインストーリーとイベントを追加"],
        synopsis: "プレイヤーは監督となり、選手を育成して自分だけのチームを作り上げる。戦術の組み方で試合結果が変わる戦略性と、完全自動進行による手軽さを両立させた育成シミュレーション。",
        cast: "シリーズ歴代キャラクターが登場：円堂守／豪炎寺修也（帝国学園）／松風天馬・剣城京介（イナズマイレブンGO）／神童拓人・霧野蘭丸／フェイ・黄名子 ほか。個別のCVは公式リリースに記載なし"
      }
    },

    {
      id: "digimon-up",
      company: "Bandai Namco Entertainment",
      companyJp: "株式会社バンダイナムコエンターテインメント",
      bucket: "update",
      platformClass: "mobile",
      announceDate: "2026-07-15",
      capturedAt: "2026-09-15",
      title: { jp: "デジモンUP", cn: "数码宝贝 UP", en: "Digimon UP" },
      genre: "育成 RPG（スマートフォン）",
      platforms: ["iOS", "Android"],
      release: "2026-07-15（已开服）",
      releasePrecision: "日",
      summary: "万代南梦宫于 2026 年 7 月 15 日全球上线的《数码宝贝》系列全新手游。作品以「跟着你生活节奏走的数码宝贝之旅」为主题：玩家先选一枚数码蛋，孵化并育成属于自己的拍档数码兽，通过喂食、训练推动它跨越各个成长阶段一路进化到究极体；战斗中由拍档兽搭配援护数码兽组队出战，数码机与数码卡也承担成长线的一部分。全作以像素美术重绘系列角色。2026 年 3 月的 DIGIMON CON 2026 首次公开，事前登录突破 100 万后追加配发八神太一与亚古兽。",
      highlight: "系列首款以「日常伴走」为概念的手游，全球同步上线，像素美术重绘全部数码兽。",
      mobile: {
        status: "正式サービス中",
        os: ["iOS", "Android"],
        monetization: "基本無料（アイテム課金制）",
        preReg: { open: false, since: "2026-05-01", reward: "10万人：援護型デジモン「ゲッコモン」／30万人：サポーター召喚チケット150枚／50万人：デジエメラルド1,000／100万人：八神太一＆アグモンを配布（配信開始に伴い受付終了）" },
        developer: "株式会社バンダイナムコエンターテインメント",
        publisher: "株式会社バンダイナムコエンターテインメント",
        region: "グローバル（日本・北米・欧州・アジアほか）",
        distribution: "App Store / Google Play（日本・北米・欧州ほか）。iOS 15 以上",
        payment: [],
        ipSource: "「デジタルモンスター」（1997年発の育成玩具）を起源とする『デジモン』シリーズ。本作は同シリーズのゲーム作品",
        series: "1999年アニメ『デジモンアドベンチャー』以降、アニメ・ゲーム・玩具で長期展開。2026年3月の「DIGIMON CON 2026」で初公開",
        features: ["デジタマから孵したパートナーデジモンを育成", "成長期15体（アグモン、ブイモン、ギルモン等）から1体を選択", "授食・訓練で育て、進化段階を経て究極体まで成長", "デジヴァイス／デジカードなどシリーズ由来の育成要素", "援護デジモンを加えたパーティ編成バトル", "ドット絵（ピクセルアート）で描き直したキャラクター表現"],
        synopsis: "プレイヤーはテイマーとなり、自分のデジタマから孵ったパートナーデジモンと暮らしながら育てていく。卵から孵化、成長期を経て進化を重ね、援護デジモンとチームを組んでバトルに挑む。",
        cast: "公式に主要キャストの発表はなし（テイマーはプレイヤーによるカスタマイズ形式）"
      },
      news: [
        { source: "公式サイト（バンダイナムコエンターテインメント）", url: "https://dgup.bn-ent.net/news?p=125" },
        { source: "GameRant（7月15日配信確定の報道）", url: "https://gamerant.com/digimon-up-game-release-date/" },
        { source: "RPG Site（事前登録開始と報酬段階）", url: "https://www.rpgsite.net/news/20284-digimon-up-pre-registration-ios-" }
      ],
      videos: [
        { label: "事前登録記念ティザー映像（RPG Site 記事内に埋め込み）", platform: "媒体", url: "https://www.rpgsite.net/news/20284-digimon-up-pre-registration-ios-" },
        { label: "公式サイト（事前登録・最新情報）", platform: "官方站", url: "https://dgup.bn-ent.net/" }
      ],
      hype: {
        score: 76,
        signals: [
          "事前登録100万突破、日本国外の比率が高いグローバル配信",
          "同月に『デジモンストーリー タイムストレンジャー』Switch版が発売され、シリーズの話題が連続",
          "グローバル同時配信のため、Famitsu 読者期待榜には登場していない"
        ]
      },
      tags: ["新作", "手游", "育成RPG", "バンダイナムコ", "デジモン", "グローバル"]
    },

    {
      id: "yowamushi-pedal-resonance-pedaism",
      company: "enish × G Holdings",
      companyJp: "株式会社enish／株式会社Gホールディングス（共同）",
      bucket: "update",
      platformClass: "mobile",
      announceDate: "2026-07-23",
      capturedAt: "2026-09-15",
      title: { jp: "弱虫ペダル レゾナンス・ペダイズム", cn: "飙速宅男 Resonance Pedaism", en: "Yowamushi Pedal: Resonance Pedaism" },
      genre: "育成シミュレーション（ロードレース）",
      platforms: ["iOS", "Android"],
      release: "2026-07-23（已开服）",
      releasePrecision: "日",
      summary: "enish 与 G Holdings 共同开发的 TV 动画《飙速宅男》改编手游，2026 年 7 月 23 日在日本上线，是系列首款正式的育成式公路竞速游戏。玩家以教练身份，把「推」的选手从基础训练一路培养起来，再编成自己的队伍去赢下公路赛；作品收录了游戏专属原创剧情（以合同集训为舞台）、新录语音与全新绘制插画。事前登录 5 月 27 日开启、7 月 7 日突破 20 万人，上线后拿下 App Store 模拟类排行榜第 1 位。发行渠道除两大应用商店外，还包括 Animate 集团旗下 Moviec 的游戏平台 animate Games Online。",
      highlight: "系列首款本格育成式公路竞速手游，同时登陆 Animate 集团自营游戏平台 AGO。",
      mobile: {
        status: "正式サービス中",
        os: ["iOS", "Android"],
        monetization: "基本プレイ無料（アイテム課金制）",
        preReg: { open: false, since: "2026-05-27", reward: "事前登録者数20万人突破（2026-07-07時点）。配信開始に伴い受付終了" },
        developer: "株式会社enish（株式会社Gホールディングスとの共同開発）",
        publisher: "株式会社enish",
        region: "日本",
        distribution: "App Store / Google Play（日本）＋ animate Games Online（アニメイトグループ・ムービックのゲームプラットフォーム。クラブアニメイト会員登録およびAGOユーザー登録が必要）",
        payment: [],
        ipSource: "渡辺航『弱虫ペダル』（秋田書店『週刊少年チャンピオン』連載、累計発行3,200万部超）を原作とするTVアニメ（2013〜2023年、全5期）",
        series: "原作漫画は2026年5月に100巻へ到達。アプリとしてはシリーズ初の本格育成ロードレースゲーム",
        features: ["トレーナーとして「推し」の選手を育成", "ゲームオリジナルストーリー「合同合宿」を収録", "新録ボイスと描き下ろしイラスト", "育てた選手でチームを編成しロードレースを勝ち抜く"],
        synopsis: "プレイヤーはトレーナーとなり、原作・アニメに登場する選手たちを育成する。育てた選手で自分だけのチームを組み、ロードレースの頂点を目指す。ゲームだけのオリジナルストーリーが展開。",
        cast: "山下大輝（小野田坂道）、代永翼（真波山岳）、遊佐浩二（御堂筋翔）ほか"
      },
      news: [
        { source: "enish 公式プレスリリース（配信開始日の決定・製品概要）", url: "https://www.enish.jp/wp-uploads/2026/05/pressrelease_260527yowapedaism.pdf" },
        { source: "PR TIMES（App Store シミュレーションカテゴリ1位獲得）", url: "https://prtimes.jp/a/?c=12086&f=d12086-1112-02bfaf61ee5212cc176fe784fabc709d.pdf&r=1112" },
        { source: "animate Games Online 作品ページ", url: "https://animate-go.com/game/detail/yowapeda-ism" }
      ],
      videos: [
        { label: "App Store 作品ページ（PV・スクリーンショット）", platform: "App Store", url: "https://apps.apple.com/jp/app/id6758927408" },
        { label: "Google Play 作品ページ", platform: "Google Play", url: "https://play.google.com/store/apps/details?id=jp.enish.yowapedaism" },
        { label: "公式 X @yowapeda_ism", platform: "X", url: "https://x.com/yowapeda_ism" }
      ],
      hype: {
        score: 68,
        signals: [
          "事前登録20万人突破、配信後 App Store シミュレーション部門1位",
          "原作漫画100巻到達とアニメ全5期の長期ファンベース",
          "Animate グループのプラットフォームへの同時展開でアニメ層へのリーチを拡大"
        ]
      },
      tags: ["新作", "手游", "育成", "IP改编", "アニメ", "弱虫ペダル"]
    },

    {
      id: "hololive-dreams",
      company: "COVER × QualiArts",
      companyJp: "カバー株式会社／株式会社QualiArts（サイバーエージェント連結子会社）",
      bucket: "update",
      platformClass: "multi",
      announceDate: "2026-07-23",
      capturedAt: "2026-09-15",
      title: { jp: "hololive Dreams", cn: "hololive Dreams", en: "hololive Dreams" },
      genre: "リズム & RPG（テーマパーク運営）",
      platforms: ["iOS", "Android", "Steam"],
      release: "2026-07-23（已开服・全球同步）",
      releasePrecision: "日",
      summary: "COVER 与 CyberAgent 旗下 QualiArts 联合开发的 hololive 首个官方手游，2026 年 7 月 23 日全球同步上线（部分地域除外），并同步推出 Steam 版、与手机版数据互通。核心玩法是六轨下落式音游，使用官方 MV 与演唱会影像，收录曲目 150 首以上并支持玩家自制谱面；音游之外还包含可自由改造的无人岛主题乐园经营、角色剧情解锁，以及最多 5 人的线上街机小游戏。事前登录突破 150 万人，上线后冲上 App Store 与 Google Play 榜首。",
      highlight: "hololive 官方首款手游，手机＋Steam 双平台全球同步，事前登录 150 万。",
      mobile: {
        status: "正式サービス中",
        os: ["iOS", "Android"],
        monetization: "基本無料（アプリ内課金あり）",
        preReg: { open: false, since: "2026-03", reward: "50万人：ダイヤ2,500個（ガチャ10回分）／80万人：★4以上確定ガチャチケット／90万人：楽曲ディスク×3／100万人：全54名分ピクセルサングラス／150万人：ガチャチケット×5＋全54名分カワイイヘアピン（配信開始に伴い受付終了）" },
        developer: "株式会社QualiArts（サイバーエージェント連結子会社）／カバー株式会社",
        publisher: "株式会社QualiArts",
        region: "グローバル（一部地域を除く）",
        distribution: "App Store / Google Play（日本・北米・欧州ほか）＋ Steam（PC版、スマホ版とのデータ連携に対応）",
        payment: [],
        ipSource: "カバー株式会社が運営する女性VTuberグループ「hololive」の公式ライセンス作品。hololive 初の公式スマートフォンゲーム",
        series: "hololive は2018年始動、2026年に9周年。登場タレントは50名以上（開始時54名）",
        features: ["6レーン下落式のリズムゲーム（公式MV・ライブ映像を使用）", "収録150曲以上、ユーザー製カスタムビートマップに対応", "無人島にテーマパーク「Dream Park」を建設する経営要素", "キャラクタークエストでビジュアルノベル形式の物語を解放", "最大5人のフレンドと遊べるアーケード風ミニゲーム", "開始時に推しタレントを最高レアで取得できるリドローガチャ"],
        synopsis: "世界のどこかにある無人島が舞台。プレイヤーは hololive のタレントたちのために施設を整え、誰もが楽しめる夢のようなテーマパーク「Dream Park」の完成を目指す。",
        cast: "hololive 所属タレント54名（サービス開始時点）"
      },
      news: [
        { source: "サイバーエージェント 公式ニュースリリース（配信日確定・Steam版発表）", url: "https://www.cyberagent.co.jp/en/news/detail/id=33532" },
        { source: "PR TIMES（公式サービス開始の発表）", url: "https://prtimes.jp/main/html/rd/p/000001254.000030268.html" },
        { source: "Mogura VR（正式サービス開始の報道）", url: "https://www.moguravr.com/hololive-dreams-official-service-start-en/" }
      ],
      videos: [
        { label: "Steam ストアページ（トレーラー・ウィッシュリスト登録）", platform: "Steam", url: "https://store.steampowered.com/app/4282500/hololive_Dreams/" },
        { label: "App Store 作品ページ", platform: "App Store", url: "https://apps.apple.com/jp/app/id6756641135" },
        { label: "公式サイト", platform: "官方站", url: "https://hololive-dreams.com/" },
        { label: "公式 X @hololive_dreams", platform: "X", url: "https://x.com/hololive_dreams" }
      ],
      hype: {
        score: 87,
        signals: [
          "事前登録150万突破、配信直後に App Store / Google Play で首位を獲得",
          "hololive 初の公式スマホゲームという位置づけでファン側の期待が突出",
          "スマホ＋Steam のクロスプラットフォーム配信で PC 層も取り込む",
          "hololive 9周年（2026年10月頃）との連動イベントが予告されている"
        ]
      },
      tags: ["新作", "手游", "跨平台", "音ゲー", "VTuber", "グローバル"]
    },

    {
      id: "mushoku-tensei-chronicle-of-echoes",
      company: "GREE Entertainment / Asobimo",
      companyJp: "グリーエンターテインメント株式会社（企画・配信）／株式会社アソビモ（開発・運営）",
      bucket: "update",
      platformClass: "multi",
      announceDate: "2026-07-27",
      capturedAt: "2026-09-15",
      title: { jp: "無職転生 ～異世界行ったら本気だす～ クロニクル・オブ・エコーズ", cn: "无职转生 ～到了异世界就拿出真本事～ Chronicle of Echoes", en: "Mushoku Tensei: Jobless Reincarnation - Chronicle of Echoes" },
      genre: "異世界×3Dバトル RPG",
      platforms: ["iOS", "Android", "PC（DMM GAMES）"],
      release: "2026-07-27（已开服）",
      releasePrecision: "日",
      summary: "GREE Entertainment 企划发行、Asobimo 开发运营的《无职转生》新作手游，2026 年 7 月 27 日正式开服，同步提供手机版与 DMM GAMES 的 PC 版。作品定位「本気だす異世界×3D 战斗 RPG」，以 3D 战斗重现原作剧情，并收录由原作者监修的原创故事线；上线前累计事前登录突破 50 万，开服后冲上 App Store 免费游戏榜第 1 位。开服同期推出限定剧情活动与纪念登录奖励。",
      highlight: "原作声优阵全数回归，手机＋DMM GAMES 双端同日开服，事前登录 50 万。",
      mobile: {
        status: "正式サービス中",
        os: ["iOS", "Android"],
        monetization: "基本プレイ無料（アプリ内課金あり）",
        preReg: { open: false, since: "2026-06", reward: "事前登録50万突破：魔石7,500個＋選べる★5チケット。配信開始に伴い受付終了" },
        developer: "株式会社アソビモ",
        publisher: "グリーエンターテインメント株式会社",
        region: "日本",
        distribution: "App Store / Google Play＋DMM GAMES（PC版）",
        payment: [],
        ipSource: "理不尽な孫の手『無職転生 ～異世界行ったら本気だす～』（MFブックス／KADOKAWA刊）。アニメ『無職転生III』製作委員会",
        series: "原作はシリーズ累計発行部数が1000万部を超える人気作。アニメは第3期が進行中",
        features: ["原作ストーリーを3Dバトルで再現", "原作者監修によるゲームオリジナルシナリオ", "キャラクター収集と編成", "限定シナリオイベントと記念ログインボーナス"],
        synopsis: "34歳・童貞・無職の男がトラックに轢かれ、剣と魔法の異世界で赤ん坊として転生する。ルーデウスとして生まれ変わった彼は、前世の記憶を抱えながら本気で生き直そうと決意する。",
        cast: "内山夕実（ルーデウス）、杉田智和（前世の男）、茅野愛衣（シルフィエット）、小原好美（ロキシー）、加隈亜衣（エリス）、森川智之（パウロ）、金元寿子（ゼニス）、Lynn（リーリャ）、浪川大輔（ルイジェルド）、田中理恵（エリナリーゼ）ほか"
      },
      news: [
        { source: "公式サイト（作品情報）", url: "https://mushokutensei-coe.com/" },
        { source: "公式 X @mushokutensei_C（開服告知・キャンペーン）", url: "https://x.com/mushokutensei_C" }
      ],
      videos: [
        { label: "公式 YouTube（PV）", platform: "YouTube", url: "https://youtu.be/dexyhauux_w" },
        { label: "公式サイト", platform: "官方站", url: "https://mushokutensei-coe.com/" }
      ],
      hype: {
        score: 74,
        signals: [
          "事前登録50万突破、開服直後に App Store 無料ランキング1位",
          "原作アニメ第3期と連動する IP の話題性",
          "原作声優陣が多数参加するフルボイス演出"
        ]
      },
      tags: ["新作", "手游", "跨平台", "RPG", "IP改编", "アニメ"]
    },

    {
      id: "mha-united-survival",
      company: "KLab × gumi",
      companyJp: "KLab株式会社／株式会社gumi（共同開発）",
      bucket: "update",
      platformClass: "multi",
      announceDate: "2026-08-06",
      capturedAt: "2026-09-15",
      title: { jp: "僕のヒーローアカデミア UNITED SURVIVAL", cn: "我的英雄学院 UNITED SURVIVAL", en: "My Hero Academia: UNITED SURVIVAL" },
      genre: "ローグライト・ヒーローアクション RPG",
      platforms: ["iOS", "Android", "PC（Windows）"],
      release: "2026-08-06（已开服・全球同步）",
      releasePrecision: "日",
      summary: "KLab 与 gumi 共同开发、经《我的英雄学院》制作委员会授权的手游新作，2026 年 8 月 6 日全球同步开服（中国大陆除外），除 App Store / Google Play 外还提供 PC（Windows）版。玩法是带有 Roguelite 要素的爽快动作游戏：玩家编成 3 人小队，在每一局中强化角色的「个性」横扫敌群，把不同个性组合起来发动合体必杀技；每局成长路线都不同。内容除原作剧情外，还收录游戏原创剧本与专属必杀技。事前登录全球突破 80 万，开服时达成 100 万并追加配发。",
      highlight: "集英社人气 IP 的 Roguelite 动作化，3 人小队＋合体必杀技，全球（除中国大陆）同步。",
      mobile: {
        status: "正式サービス中",
        os: ["iOS", "Android"],
        monetization: "基本無料（アイテム課金制）",
        preReg: { open: false, since: "2026-06-25", reward: "50万人：SR緑谷出久・SR爆豪勝己・SR轟焦凍から1名を選べるガチャチケット×1／80万人：LRコレクション「最高のヒーローになるまでの物語」×1／100万人：LRコレクション「勝利!! 立!!」×1。配信開始に伴い受付終了" },
        developer: "KLab株式会社／株式会社gumi（共同開発）",
        publisher: "KLab株式会社",
        region: "グローバル（中国本土を除く）",
        distribution: "App Store / Google Play＋PC（Windows 11、Steam 版を予定）。iOS 15.0／Android 9.0 以上",
        payment: [],
        ipSource: "堀越耕平『僕のヒーローアカデミア』（集英社『週刊少年ジャンプ』に10年連載、コミックス世界累計1億部突破）のアニメシリーズ。僕のヒーローアカデミア製作委員会より許諾",
        series: "アニメは2016年放送開始、10周年を迎える長期シリーズ。キービジュアルは Bones Film 制作",
        features: ["簡単操作のローグライト・ヒーローアクション", "3人1組のチームアップで敵の大群に挑む", "「個性」の組み合わせで発動する合体必殺技", "毎回異なる成長ルートを引くローグライト体験", "原作本編に加えゲームオリジナルシナリオと専用必殺技を収録"],
        synopsis: "総人口の約8割が超常能力「個性」を持つ世界。プレイヤーはヒーローと敵＜ヴィラン＞が入り乱れる戦場で3人編成のチームを組み、個性を強化しながら押し寄せる敵をなぎ倒していく。",
        cast: "公式に本作独自のキャスト発表はなし（原作アニメのキャラクターが登場）"
      },
      news: [
        { source: "KLab 公式プレスリリース（全世界同時事前登録開始）", url: "https://www.klab.com/jp/press/release/2026/0625/_united_survival.html" },
        { source: "Games Press（80万突破と8月6日配信の公式発表）", url: "https://www.gamespress.com/New-My-Hero-Academia-Anime-Game-App-My-Hero-Academia-UNITED-SURVIVAL-S" },
        { source: "巴哈姆特 GNN（8月6日開服の報道）", url: "https://m.gamer.com.tw/gnn/detail.php?sn=309270" }
      ],
      videos: [
        { label: "公式事前登録サイト（PV・最新情報）", platform: "官方站", url: "https://www.heroaca-unitedsurvival.com/en/" },
        { label: "公式 X @MHA_HS_en", platform: "X", url: "https://x.com/MHA_HS_en" },
        { label: "巴哈姆特 GNN 报道（内嵌宣传影像）", platform: "媒体", url: "https://m.gamer.com.tw/gnn/detail.php?sn=309270" }
      ],
      hype: {
        score: 79,
        signals: [
          "事前登録が世界で80万→100万へ到達、KLab の主力ライセンス作品",
          "原作コミックス世界累計1億部という IP 規模",
          "KLab は『BLEACH Brave Souls』『キャプテン翼』で同種のライセンス運営実績を持つ"
        ]
      },
      tags: ["新作", "手游", "跨平台", "ローグライト", "IP改编", "集英社"]
    },

    {
      id: "suikoden-star-leap",
      company: "KONAMI",
      companyJp: "株式会社コナミデジタルエンタテインメント",
      bucket: "update",
      platformClass: "mobile",
      announceDate: "2026-08-07",
      capturedAt: "2026-09-15",
      title: { jp: "幻想水滸伝 STAR LEAP", cn: "幻想水浒传 STAR LEAP", en: "Suikoden STAR LEAP" },
      genre: "RPG（スマートフォン）",
      platforms: ["iOS", "Android"],
      release: "2026-08-07（日本国内开服）",
      releasePrecision: "日",
      summary: "KONAMI 代表作《幻想水浒传》系列的完全新作手游，2026 年 8 月 7 日先行在日本国内上线 iOS / Android 版，全球版与 Steam 版的发行时间另行公布。作品被定位为系列「正史」的新章，讲述新的 108 星故事，画面在系列标志性点阵美术基础上大幅演进，并配以有冲击力的音效。开服前分批公开了新角色 PV 与配音阵容，包括艾维利、贝拉多娜、梦、卢阿尔四名新角色。",
      highlight: "1995 年起的系列完全新作，以「正史」续写新的 108 星物语，日本先行开服。",
      mobile: {
        status: "正式サービス中",
        os: ["iOS", "Android"],
        monetization: "基本無料（アイテム課金制）",
        preReg: { open: false, since: "2026-07", reward: "App Store / Google Play での事前登録者向け特典を配布。配信開始に伴い受付終了" },
        developer: "株式会社コナミデジタルエンタテインメント",
        publisher: "株式会社コナミデジタルエンタテインメント",
        region: "日本（グローバル版は配信日未定）",
        distribution: "App Store / Google Play（日本国内）。Steam 版は配信日を後日告知",
        payment: [],
        ipSource: "コナミの『幻想水滸伝』シリーズ（1995年第一作、本編・外伝あわせて全11作）",
        series: "シリーズ完全新作。正史として紡がれる新たな108星の物語",
        features: ["シリーズ伝統の108星の仲間集め", "ドット絵を大きく進化させたグラフィック", "1人プレイの RPG", "豪華声優陣によるキャラクターボイス", "開服に合わせた声優サイン色紙キャンペーン（公式X）"],
        synopsis: "『幻想水滸伝』の正史として描かれる新章。108人の仲間たちとともに、戦乱の時代を生き抜く物語が展開する。",
        cast: "蒼井翔太（エイヴェリー）、木下紗華（ベラドンナ）、井口裕香（ユメ）、鬼頭明里（ルアール）、中村悠一（フリック）、白石晴香（オデッサ）、小西克幸（ビクトール）ほか"
      },
      news: [
        { source: "Saiga NAK（8月7日上架と声優・繪師陣容的報道）", url: "https://saiganak.com/zh/news/suikoden-star-leap-release-date/amp" },
        { source: "公式 X @GensoSuikodenSP（配信日・新キャラPV告知）", url: "https://x.com/GensoSuikodenSP" }
      ],
      videos: [
        { label: "新キャラクター4名のPV（Saiga NAK 記事内／公式YouTubeでも公開）", platform: "媒体", url: "https://saiganak.com/zh/news/suikoden-star-leap-release-date/amp" },
        { label: "公式 X @GensoSuikodenSP（PV更新）", platform: "X", url: "https://x.com/GensoSuikodenSP" }
      ],
      hype: {
        score: 77,
        signals: [
          "1995年からの30年級シリーズの完全新作というブランド力",
          "開服前から新キャラPVと声優陣の発表を段階的に実施",
          "TGS2026 の KONAMI 公式生放送でも本作が扱われている"
        ]
      },
      tags: ["新作", "手游", "RPG", "コナミ", "幻想水滸伝", "日本先行"]
    },

    {
      id: "shinobi-nexus-senran-kagura",
      company: "HONEY∞PARADE GAMES / Marvelous",
      companyJp: "株式会社HONEY∞PARADE GAMES（マーベラスグループ）",
      bucket: "new",
      platformClass: "multi",
      announceDate: "2026-08-14",
      capturedAt: "2026-09-15",
      title: { jp: "シノビNEXUS –閃乱カグラ–", cn: "忍者NEXUS -闪乱神乐-", en: "Shinobi NEXUS -Senran Kagura-" },
      genre: "コマンド RPG（ハイパーシノビバトル）",
      platforms: ["iOS", "Android", "Windows 11（DMM GAMES）"],
      release: "2026年内（配信日未定・事前登录中）",
      releasePrecision: "年",
      summary: "HONEY∞PARADE GAMES 的《闪乱神乐》系列新作手游，2026 年 8 月 14 日在 Google Play 开启事前登录，iOS 与 DMM GAMES（Windows 11 64bit）版同步受理，预计 2026 年内开服。故事舞台设定在前作《忍者大师 闪乱神乐 NEW LINK》三年后，描写忍者学生们在善与恶交错之中各自背负信念、直面残酷命运的成长过程。战斗是洗练的指令式 RPG 与忍法结合的「超忍战斗」，角色表现采用卡通渲染 3D，并延续该工作室惯有的「换装、交流、立体场景」功能。角色设计仍由系列元老八重樫南担任。",
      highlight: "系列新作回归手机端，前作三年后的全新忍者少女阵容，指令制 RPG＋忍法战斗。",
      mobile: {
        status: "事前登録受付中",
        os: ["iOS", "Android"],
        monetization: "基本無料（アイテム課金制）",
        preReg: { open: true, since: "2026-08-14", reward: "DMM GAMES版では総額30万円分のDMMポイントが当たる抽選キャンペーンを実施中。ミニゲームを遊ぶとご褒美動画を視聴可能。App Store／Google Play／DMM GAMES の3ストアで受付中" },
        developer: "株式会社HONEY∞PARADE GAMES（マーベラスグループ）",
        publisher: "株式会社マーベラス",
        region: "日本",
        distribution: "App Store / Google Play（日本）＋ DMM GAMES（Windows 11 64bit）",
        payment: [],
        ipSource: "マーベラスの『閃乱カグラ』シリーズ。キャラクターデザインはシリーズ当初から担当する八重樫南",
        series: "前作アプリ『シノビマスター 閃乱カグラ NEW LINK』から3年後が舞台",
        features: ["洗練されたコマンド RPG と忍法を組み合わせた「ハイパーシノビバトル」", "セルルック3Dによるキャラクター表現", "同スタジオ恒例の「着せ替え・コミュ・ジオラマ」機能", "八重樫南デザインによる新キャラクター陣", "公式サイトで各シノビ少女のプロフィールと秘伝忍法映像を公開"],
        synopsis: "善と悪とが交錯する世界で、それぞれの信念を胸に過酷な運命へ立ち向かうシノビの少女たち。プレイヤーは彼女たちを導く教師として、その青春を見届ける。",
        cast: "公式に声優陣の発表はなし（キャラクターデザイン：八重樫南）"
      },
      news: [
        { source: "ゲームハック（マーベラス公式プレスリリース転載・8/14 Google Play 事前登録開始）", url: "https://gamehack.jp/381554" },
        { source: "QooApp ニュース（Android 事前登録開始と作品概要）", url: "https://news.qoo-app.com/post/442839" },
        { source: "公式サイト（キャラクター紹介・秘伝忍法映像）", url: "https://hpgames.jp/shinovi-nexus/" }
      ],
      videos: [
        { label: "タイトル発表PV", platform: "YouTube", url: "https://youtu.be/_avt71u1eZc" },
        { label: "公式 YouTube チャンネル @shinovi_nexus", platform: "YouTube", url: "https://www.youtube.com/@shinovi_nexus" },
        { label: "DMM GAMES 版 事前登録ページ", platform: "官方站", url: "https://dmg-shinovi-nexus.hpgames.jp/" },
        { label: "App Store 事前登録ページ", platform: "App Store", url: "https://apps.apple.com/jp/app/id6569243522" }
      ],
      hype: {
        score: 71,
        signals: [
          "『閃乱カグラ』シリーズ新作という固定ファンベース",
          "八重樫南デザインの新キャラクター群とセルルック3D表現",
          "DMM GAMES 版で総額30万円分のポイントキャンペーンを実施し話題を喚起"
        ]
      },
      tags: ["新作", "手游", "跨平台", "事前登録中", "コマンドRPG", "閃乱カグラ"]
    },

    {
      id: "beast-of-reincarnation",
      company: "GAME FREAK / Fictions",
      companyJp: "株式会社ゲームフリーク（開発）／Fictions, Inc.（販売）",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-08-04",
      capturedAt: "2026-09-15",
      title: { jp: "Beast of Reincarnation", cn: "转生之兽", en: "Beast of Reincarnation" },
      genre: "アクション RPG",
      platforms: ["PlayStation 5", "Xbox Series X|S", "PC"],
      release: "2026-08-04（已发售）",
      releasePrecision: "日",
      summary: "GAME FREAK 完全新作动作 RPG，2026 年 8 月 4 日登陆 PS5 / Xbox Series X|S / PC，日本与亚洲由 Happinet 发行 PS5 实体版，售价 7,980 日元。舞台设定在西历 4026 年、崩坏后的日本：被称作「秽人」而遭疏远的少女艾玛，与腐蚀体「库乌」一同踏上讨伐秽之元凶「轮回之兽」的旅程。战斗采用「一人一兽」的双轨系统——艾玛以实时剑技格斗，库乌则以指令方式释放技能，艾玛成功格挡时累积点数用于发动库乌的能力；该作也是 GAME FREAK 首个非宝可梦体系的 AAA 级完全新作。",
      highlight: "GAME FREAK 三十年来的首个非宝可梦 AAA 新作，「一人一兽」实时＋指令混合战斗。",
      console: {
        status: "2026年8月4日発売（発売済み）",
        os: ["PlayStation 5", "Xbox Series X|S（ダウンロード版のみ）", "PC（Steam・ダウンロード版のみ）"],
        monetization: "PS5 パッケージ版 8,980 円（税込）／ ダウンロード版 Standard Edition 7,980 円（税込）・デジタルデラックスエディション 8,980 円（税込）（ハピネット発表）",
        developer: "ゲームフリーク",
        publisher: "Fictions（日本国内パッケージはハピネット）",
        region: "日本／海外（字幕：日本語・英語・仏・伊・独・西・伯・韓・繁中・簡中、音声：日本語・英語）",
        distribution: "パッケージ版（PS5 のみ）・ダウンロード版",
        stores: ["PlayStation Store", "Microsoft Store", "Steam", "全国のゲーム取扱店"],
        features: [
          "エマのリアルタイムアクションと、犬のクゥへのコマンドベースの戦術を融合させた「1 人と 1 匹」の協同戦闘システム",
          "エマとクゥが共鳴して発動する「開花技」。強敵を討つほど新しい戦闘技術を身につける",
          "西暦 4026 年、文明が崩壊した日本を舞台にした探索型アクション RPG",
          "Xbox Series X|S 版は Xbox Game Pass 対応、PS5 版は PS5 Pro 強化に対応",
          "CERO C（15 歳以上対象）、プレイ人数 1 人（オンラインプレイ非対応）"
        ],
        synopsis: "世界を蝕む「穢れ」の元凶「輪廻の獣」を討つため、記憶と感情を失った穢れ人の少女エマと、白毛の腐蝕犬クゥが遥か西の地を目指す。道中で出会う人々はそれぞれ秘密を抱え、選択が物語を多層にしていく。",
        ipSource: "オリジナル（ゲームフリーク）",
        series: "『ポケットモンスター』シリーズを生んだゲームフリークの完全新作アクション RPG。2025 年設立の Fictions がパブリッシングを担当",
        cast: "エマ（CV：石川由依）、ミコト（CV：石田彰）、シドウ（CV：三上哲）、バウエラ（CV：佐藤利奈）、都の王（CV：金尾哲夫）"
      },
      news: [
        { source: "ハピネット 公式プレスリリース（PS5 パッケージ版 8/4 発売・予約開始）", url: "https://happinet-games.com/release/260420/happinet0420.pdf" },
        { source: "製品情報特設ページ", url: "https://beast-of-reincarnation.happinet-games.com/" },
        { source: "海外公式サイト（Fictions）", url: "https://fictions.com/ja/games/beast-of-reincarnation" },
        { source: "Shane the Gamer（発売週の報道）", url: "https://www.shanethegamer.com/news/game-freaks-beast-of-reincarnation-marvel-tokon-fighting-souls-launch-this-week/" }
      ],
      videos: [
        { label: "公式トレーラー（ハピネット プレスリリース記載）", platform: "YouTube", url: "https://youtu.be/0Zz-hCsuAQs" },
        { label: "製品情報特設ページ", platform: "官方站", url: "https://beast-of-reincarnation.happinet-games.com/" }
      ],
      hype: {
        score: 83,
        signals: [
          "GAME FREAK 初の非ポケモン AAA 作品として海外メディアの露出が大きい",
          "ディレクター古島康太のインタビューが DenFamiNicoGamer / GamesRadar+ 等で拡散",
          "フォトリアルなアートスタイルにより「どこの国のゲームか判別しづらい」と評されるほどの作風刷新"
        ]
      },
      tags: ["新作", "主机", "アクションRPG", "ゲームフリーク", "オリジナルIP"]
    },

    {
      id: "marvel-tokon-fighting-souls",
      company: "Arc System Works",
      companyJp: "株式会社アークシステムワークス（開発）／PlayStation Publishing（販売）",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-08-06",
      capturedAt: "2026-09-15",
      title: { jp: "MARVEL Tōkon: Fighting Souls", cn: "MARVEL Tōkon: Fighting Souls", en: "MARVEL Tōkon: Fighting Souls" },
      genre: "4v4 タッグチーム対戦格闘",
      platforms: ["PlayStation 5", "PC（Steam / Epic Games Store）"],
      release: "2026-08-06（全球）／日本・韓国・豪州・NZ は 08-07",
      releasePrecision: "日",
      summary: "由《罪恶装备》系列的 Arc System Works 开发、PlayStation Studios 与 Marvel Games 联合推出的 4v4 组队对战格斗游戏，2026 年 8 月 6 日全球同步发售 PS5 与 PC（Steam / Epic）版，日本、韩国、澳大利亚与新西兰因时差在 8 月 7 日解锁，售价 7,980 日元。首发 20 名 Marvel 角色，比赛以 1 名主控加 3 名援护的形式进行，四人共享一条「Vital Gauge」而非各自独立的血条；操作上提供传统输入与简易输入两套方案，并支持 PS5 与 PC 之间的完整跨平台联机。",
      highlight: "Arc System Works 用《罪恶装备》的技术力承接 Marvel 授权，四人共享血条的 4v4 结构。",
      console: {
        status: "2026年8月6日 グローバル発売（日本・韓国・豪州・NZ は 8月7日／発売済み）",
        os: ["PlayStation 5", "PC（Steam / Epic Games Store）"],
        monetization: "Standard Edition 7,980 円（税込）、デジタルデラックスエディション 10,480 円（税込）、Ultimate Edition 11,980 円（税込）（日本価格）",
        developer: "アークシステムワークス",
        publisher: "Sony Interactive Entertainment",
        region: "日本／北米／欧州（音声 10 言語、画面言語 15 言語以上）",
        distribution: "ダウンロード版（日本国内のパッケージ版は未確認）",
        stores: ["PlayStation Store", "Steam", "Epic Games Store"],
        features: [
          "4 対 4 のタッグチーム格闘。1 チーム 4 人のうち 1 人を主戦、3 人を援護に配置する",
          "試合開始時に選べるのは 2 人だけ。場面破壊や相手の吹き飛ばしなどで条件を満たすと残りのメンバーが解禁される",
          "チーム全体で 1 本の体力ゲージを共有する独自ルール。三本勝負",
          "従来のコマンド入力に加え、ボタン 1 つで技が出せる「クイック入力」を用意",
          "モーションコミック形式の Episode Mode を収録（約 10 時間、10 言語のボイス）",
          "PS5 Pro Enhanced／DualSense のハプティクスと Tempest 3D オーディオに対応"
        ],
        synopsis: "宇宙勇者（Champion of the Universe）が次の戦場に地球を選び、開催者（Promoter）が「勇者挑戦賽」を宣告する。5 チームが 4 対 4 で角逐し、宇宙勇者に挑む資格を得る者が決まる。",
        ipSource: "MARVEL コミック（Marvel Games 協力）",
        series: "『ギルティギア』『ドラゴンボールファイターズ』を手がけたアークシステムワークスが開発、SIE が発売。ローンチ時のプレイアブルは 20 体／5 チームで、DLC で 4 体以上を追加予定",
        cast: "未発表"
      },
      news: [
        { source: "MARVEL 公式作品ページ（発売告知・映像一覧）", url: "https://www.marvel.com/games/marvel-tokon-fighting-souls" },
        { source: "PlayStation 公式 作品ページ（FAQ・発売日と地域差）", url: "https://playstation.com/zh-hans-hk/games/marvel-tokon-fighting-souls" },
        { source: "GameUpNews（ローンチトレーラー公開の報道）", url: "https://gameupnews.com/marvel-tokon-fighting-souls-launch-trailer-released/" },
        { source: "PCGamingWiki（PC 版の技術情報・発売日）", url: "https://www.pcgamingwiki.com/wiki/Marvel_T%C5%8Dkon%3A_Fighting_Souls" }
      ],
      videos: [
        { label: "ローンチトレーラー（GameUpNews 記事内に埋め込み）", platform: "媒体", url: "https://gameupnews.com/marvel-tokon-fighting-souls-launch-trailer-released/" },
        { label: "公式 X @MARVELTokon（トレーラー告知）", platform: "X", url: "https://x.com/MARVELTokon" },
        { label: "PlayStation 公式作品ページ（映像一覧）", platform: "官方站", url: "https://playstation.com/en-sg/games/marvel-tokon-fighting-souls/" }
      ],
      hype: {
        score: 81,
        signals: [
          "オープンベータが Steam 同時接続3.3万を記録",
          "Marvel という世界規模 IP とアークシステムワークスの格闘ゲーム開発力の組み合わせ",
          "高ランク帯で Blade と Magik が最多使用キャラになるなど対戦コミュニティが活発"
        ]
      },
      tags: ["新作", "主机", "格闘", "アークシステムワークス", "Marvel", "グローバル"]
    },

    {
      id: "unme",
      company: "Shueisha Games / Historia",
      companyJp: "株式会社集英社ゲームズ（発信元）／株式会社ヒストリア（開発）",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-08-26",
      capturedAt: "2026-09-15",
      title: { jp: "UN:Me", cn: "UN:Me", en: "UN:Me" },
      genre: "ソウル・トリアージ アドベンチャー",
      platforms: ["Nintendo Switch 2", "PlayStation 5", "Steam"],
      release: "2026年内（发售预定）",
      releasePrecision: "年",
      summary: "集英社游戏品牌「集英社ゲームズ」于 2026 年 8 月 26 日公布的全新企划，由以 Unreal Engine 见长、参与过《Faaast Penguin》《Caligula2》开发的日本工作室 Historia（ヒストリア）担纲制作，预定 2026 年内在 Switch 2 / PS5 / Steam 发售。游戏被归类为「灵魂·检伤分类冒险」：围绕寄宿在少女体内的四个灵魂展开，玩家通过与被分割的记忆碎片对话、探索环境变化，最终对「灵魂」作出选择——包括消去。官方网站将集中承载情报，并内置便于玩家分享与讨论的考察功能。",
      highlight: "集英社游戏品牌新企划，Historia 开发，以「与灵魂对话并作出裁决」为核心的检伤分类式冒险。",
      news: [
        { source: "プレスリリース要約（発信元：株式会社集英社ゲームズ／発表日時 2026-08-26 12:00）", url: "https://bestcalendar.jp/press/149029" },
        { source: "集英社ゲームズ 作品ページ", url: "https://shueisha-games.com/games/unme/" },
        { source: "PlayStation Store 商品ページ", url: "https://store.playstation.com/ja-jp/concept/10019807" },
        { source: "ヒストリア 公式サイト（開発実績）", url: "https://historia.co.jp/" }
      ],
      videos: [
        { label: "公式サイト（情報集約・映像）", platform: "官方站", url: "https://unme.shueisha-games.com/" },
        { label: "ヒストリア 公式 X @historia_Inc", platform: "X", url: "https://x.com/historia_Inc" }
      ],
      hype: {
        score: 63,
        signals: [
          "集英社ゲームズの自社パブリッシング企画として発表",
          "開発は Unreal Engine 専門の国内スタジオ Historia（『Faaast Penguin』『Caligula2』）",
          "発表直後で映像・試遊情報は限定的、期待度は今後の続報に依存"
        ]
      },
      tags: ["新作", "主机", "アドベンチャー", "集英社ゲームズ", "オリジナルIP"]
    },

    {
      id: "kyoto-xanadu",
      company: "Nihon Falcom",
      companyJp: "日本ファルコム株式会社",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-07-16",
      capturedAt: "2026-09-15",
      title: { jp: "亰都ザナドゥ -桜花幻舞-", cn: "京都幻都 -樱花幻舞-", en: "Kyoto Xanadu" },
      genre: "デュアルディメンショナル ARPG（双维度动作 RPG）",
      platforms: ["Nintendo Switch 2", "Nintendo Switch", "PlayStation 5", "Steam"],
      release: "2026-07-16（已发售）",
      releasePrecision: "日",
      summary: "日本 Falcom 的完全新作动作 RPG，2026 年 7 月 16 日登陆 Switch 2 / Switch / PS5 / Steam，通常版 7,920 日元，同日推出同捆特制艺术盒的 Limited Edition。《东亰幻都》的舞台被整体重置为「亰都」——成为首都的现代日本，故事围绕觉醒为《适格者》的少年少女与异界「XANADU」展开。战斗由两套动作构成：以射击与属性解谜探索迷宫的 2D 动作，以及可用《ソウルアクセル》强化自身、以精准格挡触发一击必杀反击《一閃》的 3D 动作。学园日常部分则通过卡牌牌组上课提升参数、与同学交流、在京都街区探索美食与景点。繁体中文版由云豹娱乐同日同步推出。",
      highlight: "《东亰幻都》十周年，舞台移到「亰都」，2D 探索＋3D 战斗的双维度 ARPG。",
      console: {
        status: "2026年7月16日発売（発売済み）",
        os: ["Nintendo Switch 2", "Nintendo Switch", "PlayStation 5", "Steam"],
        monetization: "通常版 7,920 円（税込・小売店の希望小売価格表記／日本ファルコム）。アジア版は一般版 HK$417 / NT$1,690、Nintendo Switch 2 Edition HK$427 / NT$1,721、Switch 2 Edition アップグレードパス HK$10 / NT$31（クラウディッドレパードエンタテインメント）",
        developer: "日本ファルコム",
        publisher: "日本ファルコム（日本）／ クラウディッドレパードエンタテインメント（アジア）",
        region: "日本／アジア（字幕：日本語・簡体中文・繁体中文・韓国語、音声：日本語）",
        distribution: "パッケージ版・ダウンロード版",
        stores: ["Nintendo eShop", "PlayStation Store", "Steam", "全国のゲーム取扱店"],
        features: [
          "2D と 3D を切り替える「双维度（デュアルディメンション）」ARPG。学園地下の巨大迷宮は横スクロールの 2D 戦闘、異界門の先は 3D 戦闘",
          "「ソウルデバイス」の強化に加え、3D 戦闘で得た「ガーディアン」カードを装備して能力を大幅に引き上げる育成",
          "授業前に「行動カード」を配置する学園パート。科目の能力値と他キャラとの好感度が変化する",
          "放課後は京都の街を自由に散策。観光地での情報収集、商店街での買い物、同級生との食事など",
          "チャット会話やサイドクエストなど、日常パートの要素が豊富"
        ],
        synopsis: "2015 年『東亰ザナドゥ』の世界観を土台にした完全新作。首都を京都とする現代日本で、少年少女が「資格者」として次々に覚醒し、異界を巡る冒険が始まる。主人公・神矢伶はある事件を機に異獣と対抗する力を得て比良坂学園へ転入し、異界の完全攻略を目指す。",
        ipSource: "『東亰ザナドゥ』（日本ファルコム）の世界観を継承した新規タイトル",
        series: "ファルコムの新規 IP。Famitsu 週榜で Switch 版 15,431 本・PS5 版 13,206 本、実体版首週合計 28,637 本",
        cast: "未発表"
      },
      news: [
        { source: "日本ファルコム 公式プレスリリース（7月16日発売決定）", url: "https://www.falcom.co.jp/page/wp-content/uploads/2026/03/260313_KX_ReleaseDate_jp.pdf" },
        { source: "公式サイト 最新情報（ローンチPV 2026-07-16／Ver.1.04 2026-08-13）", url: "https://www.falcom.co.jp/kyoxana/topics/" },
        { source: "GameWith ゲームDB（作品概要・価格情報）", url: "https://gamewith.jp/gamedb/10831" },
        { source: "ファミ通発売週レビュー（9/8/8/9＝34点）", url: "https://www.nintendonewshub.com/news/famitsu-review-scores-july-12-2026-first-scores-for-kyoto-xanadu-culdcept-begins" }
      ],
      videos: [
        { label: "ローンチPV（公式サイト映像ページ・2026-07-16 公開）", platform: "官方站", url: "https://www.falcom.co.jp/kyoxana/topics/" },
        { label: "繁体中文版 35秒 Web CM（云豹娱乐）", platform: "YouTube", url: "https://youtu.be/ulAvztkCmOs" },
        { label: "繁体中文版 15秒 Web CM", platform: "YouTube", url: "https://youtu.be/Gt_LqThEA0Y" }
      ],
      hype: {
        score: 69,
        signals: [
          "『東亰ザナドゥ』生誕10周年を冠した完全新作",
          "ファミ通クロスレビュー34点（9/8/8/9）",
          "Switch版15,431本・PS5版13,206本の初週実売で、既存ファン層の安定需要を確認"
        ]
      },
      tags: ["新作", "主机", "ARPG", "ファルコム", "リメイク/新章"]
    },

    {
      id: "honogurashi-no-niwa",
      company: "Nippon Ichi Software",
      companyJp: "株式会社日本一ソフトウェア",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-07-30",
      capturedAt: "2026-09-15",
      title: { jp: "ほの暮しの庭", cn: "恬静生活之庭", en: "Honogurashi no Niwa" },
      genre: "生活シミュレーション",
      platforms: ["Nintendo Switch 2", "Nintendo Switch", "PlayStation 5", "Steam", "Windows"],
      release: "2026-07-30（已发售）",
      releasePrecision: "日",
      summary: "日本一软件于 2026 年 7 月 30 日推出的完全新作生活模拟游戏，由《夜回》系列团队打造。玩家在乡村经营农作、畜牧、钓鱼、狩猎，并与村民往来；作品在可理解的生活模拟框架上叠加了「村规」「安心暮し模式」等设定，把「因习村」的悬疑与恐怖要素编进日常循环，形成明显的题材差异化。实体版在发售前受注 6 万本，三平台首周实体合计约 4 万本；2026 年 9 月 2 日公司公告宣布国内累计销量突破 20 万本。",
      highlight: "《夜回》团队的乡村生活模拟，把悬疑恐怖揉进日常劳作，国内销量突破 20 万本。",
      console: {
        status: "2026年7月30日発売（発売済み）",
        os: ["Nintendo Switch 2", "Nintendo Switch", "PlayStation 5", "Steam", "Windows"],
        monetization: "9,020 円（税込・小売店の希望小売価格表記）。Nippon1.jp ショップ プレミアム限定版は Switch 2 版 25,850 円（税込）・Switch 版 24,750 円（税込）",
        developer: "日本一ソフトウェア",
        publisher: "日本一ソフトウェア",
        region: "日本（Nintendo Switch 2 版は日本語・国内専用ソフト）",
        distribution: "パッケージ版（Nintendo Switch 2 版はキーカード仕様）・ダウンロード版",
        stores: ["Nintendo eShop", "Nintendo Store", "PlayStation Store", "Steam", "Nippon1.jp ショップ", "全国のゲーム取扱店"],
        features: [
          "山あいに佇む小さな村「彼ヶ津村」を舞台にした生活シミュレーション。農作・畜産・釣り・狩り・村人との交流を軸にする",
          "村はずれの古びた小屋と荒れた庭から始まり、素材を集めて道具を手作りすると「できること」が広がっていく",
          "村の祭事や手伝いを通じて村人との交流を深める進行。老若男女さまざまな住民が暮らす",
          "『夜廻』シリーズのスタッフが手がけ、郷愁のある田舎暮らしに村の因習とサスペンスの要素を重ねている",
          "難易度選択に対応（「安心暮しモード」など）。Nintendo Switch 2 版と Switch 版はセーブデータの互換性がない",
          "追加コンテンツ『デジタルアートブック&サウンドトラック』を発売同日に配信"
        ],
        synopsis: "山の中で彷徨っていた幼い主人公が村の人々に保護され、村のために働くことを条件に暮らしを許される。まずは荒れた庭を耕して畑を作るところから始まる、日本の原風景を描いた生活シミュレーション。",
        ipSource: "オリジナル（日本一ソフトウェア）",
        series: "『夜廻』シリーズのスタッフによる新規 IP。発売前に実体版の受注が 6 万本に達し、Famitsu 週榜の実体版首週（Switch 2 / Switch / PS5 合計）は約 40,303 本",
        cast: "未発表"
      },
      news: [
        { source: "日本一ソフトウェア 公式サイト（製品情報）", url: "https://nippon1.jp/consumer/honogurashi/product.html" },
        { source: "日本一ソフトウェア 公式サイト（発表・予約受付開始）", url: "https://nippon1.jp/consumer/honogurashi/topics/debut" },
        { source: "国内販売20万本達成のプレスリリース（2026-09-02）", url: "https://www.nippon1.co.jp/news/pdf/2026/20260902_01.pdf" },
        { source: "Nintendo Store 商品ページ（配信日・対応機種）", url: "https://store-jp.nintendo.com/item/software/D70010000101687" }
      ],
      videos: [
        { label: "公式サイト（PV・製品情報）", platform: "官方站", url: "https://nippon1.jp/consumer/honogurashi/product.html" },
        { label: "Nintendo Store 商品ページ（紹介映像）", platform: "商店", url: "https://store-jp.nintendo.com/item/software/D70010000101687" }
      ],
      hype: {
        score: 67,
        signals: [
          "国内累計20万本突破（2026-09-02 公式発表）",
          "ファミ通7月28日〜8月2日週で三機種合計約40,303本の初週実売",
          "『夜廻』スタッフという開発陣の知名度による事前注目"
        ]
      },
      tags: ["新作", "主机", "生活シミュレーション", "日本一ソフトウェア", "オリジナルIP"]
    },

    {
      id: "splatoon-raiders",
      company: "Nintendo",
      companyJp: "任天堂株式会社",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-07-23",
      capturedAt: "2026-09-15",
      title: { jp: "スプラトゥーン レイダース", cn: "斯普拉遁 涂击队", en: "Splatoon Raiders" },
      genre: "探索アクション（スプラトゥーンシリーズ初の外伝）",
      platforms: ["Nintendo Switch 2（独占）"],
      release: "2026-07-23（已发售）",
      releasePrecision: "日",
      summary: "《斯普拉遁》系列首部外传作品，2026 年 7 月 23 日在 Switch 2 独占发售，售价 6,480 日元。主角「机械师」与「鱼浆帮」迫降在布满漩涡的「涡潮群岛」，一边击退挡路的鲑鱼、一边围绕岛上的宝藏展开冒险。玩家在武器之外还能装备并强化「配件」，用迅捷动作、重击或技术型道具打出不同流派；鱼浆帮可乘上调查机甲支援，使用奥义一举清场。制作人为井上精太，导演伊藤嘉彦，支持 1 人与 2〜4 人游玩。本作把系列惯有的涂地对战重构为带 RPG 数值与装备构筑要素的单人/合作探索。",
      highlight: "系列首个外传，把 PVE 打工手感重构为 RPG 式刷宝与装备构筑，首周实体 47.5 万本。",
      console: {
        status: "2026年7月23日発売（発売済み）",
        os: ["Nintendo Switch 2（専用）"],
        monetization: "ダウンロード版 6,480 円（税込）／ パッケージ版 7,480 円（税込）（任天堂公式サイト表記）",
        developer: "任天堂",
        publisher: "任天堂",
        region: "日本／北米／欧州（日本語・英語・仏・伊・独・西・蘭・韓・簡体中文・繁体中文）",
        distribution: "パッケージ版・ダウンロード版",
        stores: ["Nintendo eShop", "Nintendo Store", "全国のゲーム取扱店"],
        features: [
          "『スプラトゥーン』シリーズ初のスピンオフ。対人戦ではなく、島の探索とシャケ討伐を軸にした「オタカラ・ハント」",
          "ブキは 100 種類以上。スピード／パワー／テクニカルの 3 タイプから最大 2 つまで同時装備できる「ガジェット」で自分好みに調整",
          "拾った「ガジェットパーツ」で性能を強化・変化させ、タンクやブキも素材から開発する成長要素",
          "ローカル通信・インターネット通信で最大 4 人の協力プレイ。シャケのレベルは自動調整される",
          "ソロ中でも「ヘルプ」を要請して一時的に最大 3 人と一緒に探索できる",
          "amiibo 3 種が同時発売"
        ],
        synopsis: "「ウズシオ諸島」に不時着した新主人公「メカニック」と「すりみ連合」が、狂暴なシャケを退けて島のオタカラを目指す。本編の PvP 主軸を外し、探索と強化を中心に据えたシリーズ初の派生作。",
        ipSource: "『スプラトゥーン』シリーズ（任天堂）",
        series: "本編ではなくソロ／協力向けのスピンオフとして展開。ニンテンドーeショップと Nintendo Store で早期購入キャンペーンを実施。Famitsu 7/20-26 週の実体版首週は約 47.5 万本、8/2 時点の累計は約 54.8 万本",
        cast: "未発表"
      },
      news: [
        { source: "任天堂（香港）TOPICS（本日発売・CM・開発者インタビュー）", url: "https://nintendo.com/hk/topics/article/4mwivan6eArpr1VQNuIaGz" },
        { source: "任天堂 公式製品ページ（Switch 2）", url: "https://www.nintendo.com/hk/games/switch2/aadla?modal=multi" },
        { source: "Famitsu 国内週販（7/20〜7/26 初週 474,684 本）", url: "https://www.nintendonewshub.com/news/famitsu-software-sales-7-20-26-7-26-26-top-30" }
      ],
      videos: [
        { label: "任天堂 公式製品ページ（紹介映像・CM）", platform: "官方站", url: "https://www.nintendo.com/hk/games/switch2/aadla?modal=multi" },
        { label: "任天堂（香港）TOPICS（CM・開発者インタビュー映像）", platform: "官方站", url: "https://nintendo.com/hk/topics/article/4mwivan6eArpr1VQNuIaGz" }
      ],
      hype: {
        score: 88,
        signals: [
          "Famitsu 初週実売 474,684 本、8月2日時点で累計約548,226本",
          "Switch 2 独占の第一方ラインアップとして7月のソフト牽引役",
          "メディアスコア Metacritic 80／OpenCritic 80、IGN 9点"
        ]
      },
      tags: ["新作", "主机", "アクション", "任天堂", "Switch2独占"]
    },

    {
      id: "alchemist-portmasters",
      company: "KMS / K3 Studio",
      companyJp: "株式会社KMS ゲームスタジオ「K3 Studio」",
      bucket: "new",
      platformClass: "mobile",
      announceDate: "2026-09-02",
      capturedAt: "2026-09-15",
      title: { jp: "誰ガ為のアルケミスト ポートマスターズ", cn: "为了谁的炼金术师 港口大师", en: "Alchemist Portmasters" },
      genre: "高速战斗 RPG（战略向）",
      platforms: ["iOS", "Android"],
      release: "未定（事前登录受理中）",
      releasePrecision: "未定",
      summary: "KMS 旗下工作室 K3 Studio 于 9 月 2 日开启事前登录。本作继承《为了谁的炼金术师》世界观，描写另一条命运线的平行世界。舞台是炼金术光与影交错的巴贝尔大陆——国家间纷争、圣石暴走、罪兽威胁令世界走向混沌；来自异邦的主人公与「命运的见证者」乌洛波洛斯缔结契约，获得炼金术之力，与过去的幻影兵并肩作战。",
      highlight: "原系列全球累计下载突破 1250 万，事前登录按人数阶梯发放幻晶石与十连召唤券。",
      mobile: {
        status: "事前登録受付中",
        os: ["iOS", "Android"],
        monetization: "基本無料（一部アプリ内課金）",
        preReg: { open: true, since: "2026-09-02", reward: "1万人：幻晶石1,000＋10連ユニット召喚チケット／3万人：幻晶石1,000＋武具&戦術10連召喚チケット／5万人：幻晶石1,000＋SSR以上1枠確定10連召喚チケット＋URウロボロス" },
        developer: "K3 Studio（株式会社KMS）",
        publisher: "K3 Studio",
        region: "日本（App Store / Google Play）",
        distribution: "App Store / Google Play（日本区）",
        ipSource: "『誰ガ為のアルケミスト』シリーズ",
        series: "シリーズ全世界累計 1,250万DL 突破",
        features: ["戦略を研ぎ澄ますハイスピードバトル", "幻影兵（過去の英雄）を仲間に編成", "事前登録者数連動の報酬キャンペーン", "公式X フォロー&リポスト キャンペーン同時開催（9/16 23:59 まで）"],
        synopsis: "錬金術の光と影が交錯するバベル大陸。国家間の争い、聖石の暴走、罪獣の脅威により世界は混沌へ。異邦より訪れた主人公は「運命の見届け人」ウロボロスと契約し、《錬金術》の力を手にする。"
      },
      news: [
        { source: "AppBank（事前登録開始と報酬詳細）", url: "https://www.appbank.net/2026/09/02/game/3093171.php" }
      ],
      videos: [
        { label: "AppBank 报道（公开正式 PV 与事前登录奖励明细）", platform: "媒体", url: "https://www.appbank.net/2026/09/02/game/3093171.php" },
        { label: "官方网站（事前登录入口）", platform: "官方站", url: "https://al-portmasters.com/" },
        { label: "App Store 预约页", platform: "App Store", url: "https://apps.apple.com/jp/app/id6781944992" },
        { label: "官方 X @tagatame_pm", platform: "X", url: "https://x.com/tagatame_pm" }
      ],
      hype: {
        score: 55,
        signals: [
          "前作全球 1250 万 DL 的用户基础",
          "事前登录阶段，热度取决于突破人数节奏",
          "系列向平行世界线扩张，老玩家关注度高于新玩家"
        ]
      },
      tags: ["新作", "手游", "事前登録中", "RPG", "IP续作"]
    },

    {
      id: "sakamoto-days-rogue-dawn",
      company: "Rudel Inc.",
      companyJp: "株式会社Rudel（本社：東京都新宿区）",
      bucket: "new",
      platformClass: "mobile",
      announceDate: "2026-09-11",
      capturedAt: "2026-09-15",
      title: { jp: "SAKAMOTO DAYS Mission: Rogue Dawn", cn: "SAKAMOTO DAYS Mission: Rogue Dawn", en: "SAKAMOTO DAYS Mission: Rogue Dawn" },
      genre: "养成 × Roguelite 动作",
      platforms: ["iOS", "Android"],
      release: "2026-09-11（已开服）",
      releasePrecision: "日",
      summary: "东京新宿的 Rudel 于 9 月 11 日正式开服，改编自电视动画《SAKAMOTO DAYS》。玩法为「角色养成 × Roguelite 动作」：训练模式自由培养已获得角色，战斗模式检验成果并面对大量敌人与机关；采用直觉式闪避与攻击操作，并可构筑卡组。战斗中可切换编队内的同伴角色，实现协力突破。",
      highlight: "动画改编手游中少见的 Roguelite 构筑路线，单局短、重复游玩驱动强。",
      mobile: {
        status: "正式サービス中",
        os: ["iOS 15 以上", "Android 9.0 以上（予定）"],
        monetization: "基本無料（アプリ内課金あり）",
        preReg: { open: false, since: "2026-05-25", reward: "事前登録者数に応じて段階的にアプリ内アイテムを配布するキャンペーン（受付期間：2026年5月25日〜サービス開始まで）。サービス開始に伴い受付終了。" },
        launch: "2026-09-11",
        developer: "Rudel Inc.",
        publisher: "Rudel Inc.",
        region: "日本",
        distribution: "App Store / Google Play",
        payment: [],
        ipSource: "TVアニメ『SAKAMOTO DAYS』（原作：鈴木祐斗／集英社）",
        series: "原作は鈴木祐斗『SAKAMOTO DAYS』（集英社『週刊少年ジャンプ』連載、単行本24巻、全世界累計発行部数1,500万部超・2025年8月時点）。TVアニメ化（TMS ENTERTAINMENT制作）を経て、実写映画が2026年GWに公開予定。同IPでは先行して GOODROID によるパズルゲーム版が発表されており、本作は2作目のスマホゲームにあたる。",
        features: ["育成モード＋バトルモードの二本立て", "デッキ構築による戦略性", "編隊内の仲間キャラを戦闘中に切替", "キャラごとに異なる戦闘スタイル（打撃・斬撃・銃撃）", "短時間で遊べるローグライト設計"],
        synopsis: "迫りくる殺し屋たちを退け、勝利をつかみ取る。育成したキャラクターで武器と技を組み合わせ、一撃で戦況を覆す。",
        cast: "ゲーム独自のボイスクレジットは未発表。原作アニメ側の主要キャストは坂本太郎：杉田智和／朝倉シン：島﨑信長／陸少糖：佐倉綾音／坂本葵：東山奈央／坂本花：木野日菜 ほか。",
      },
      news: [
        { source: "Holiday Travel（开服公告・游戏概览）", url: "https://haveagood-holiday.com/en/articles/sakamoto-days-mission-rogue-dawn-launch" }
      ],
      videos: [
        { label: "开服公告（含游戏画面与玩法说明）", platform: "媒体", url: "https://haveagood-holiday.com/en/articles/sakamoto-days-mission-rogue-dawn-launch" },
        { label: "官方网站", platform: "官方站", url: "http://sakarogu.jp/" },
        { label: "官方 X @sakarogu_jp", platform: "X", url: "https://x.com/sakarogu_jp" }
      ],
      hype: {
        score: 58,
        signals: [
          "动画 IP 热度直接转化为首发用户",
          "已开服，后续取决于运营节奏与卡池设计",
          "Roguelite 设计在同类动画改编手游中属差异化"
        ]
      },
      tags: ["已上线", "手游", "IP改编", "Roguelite"]
    },

    {
      id: "re-survival-unit",
      company: "Aniplex（アニプレックス）",
      companyJp: "株式会社アニプレックス",
      bucket: "update",
      platformClass: "mobile",
      announceDate: "2026-07-02（〜07-29 モンスターハンターコラボ開催）",
      capturedAt: "2026-09-15",
      title: { jp: "Resident Evil Survival Unit", cn: "生化危机 Survival Unit", en: "Resident Evil Survival Unit" },
      genre: "实时战略（RTS）",
      platforms: ["iOS", "Android"],
      release: "2025-11-18（世界151の国と地域でサービス開始）",
      releasePrecision: "日",
      summary: "Aniplex 与韩国 JOYCITY 共同开发的《生化危机》系列首款正统 RTS 手游，Capcom 提供 IP 监修。玩家指挥单位、经营作为据点的洋馆，把系列标志性的生存恐怖重构为实时战略体验；本编的里昂、克里斯、瑞贝卡、比利、艾丽莎等角色在「平行世界」设定下首次同队。2025 年 11 月 18 日在全球 151 个国家和地区上线，首日下载即突破 100 万；2026 年 1 月追加新地图与三名角色，7 月与《怪物猎人》实施联动。",
      highlight: "系列首次转向实时战略品类，且由音乐系发行商 Aniplex 主导发行、韩国 JOYCITY 开发——Capcom 仅提供 IP 监修，是少见的组合。",
      mobile: {
        status: "正式サービス中",
        os: ["iOS", "Android"],
        monetization: "基本無料（アプリ内課金あり）",
        preReg: { open: false, since: "2025-08", reward: "予約注文・事前登録者に、序盤攻略と育成を支援するアイテムセットを配布（サービス開始後、ゲーム内メールボックスで受け取り）。事前登録者数は2025年10月23日時点で200万人を突破。" },
        developer: "JOYCITY Corporation",
        publisher: "Aniplex（一部地域は JOYCITY Corporation が配信）",
        region: "世界151の国と地域（日本・韓国・北米・欧州・アジアほか）",
        distribution: "App Store / Google Play（世界151の国と地域）",
        payment: [],
        ipSource: "『バイオハザード（Resident Evil）』シリーズ（株式会社カプコン）。本作はカプコンの IP 提供・監修のもと、Aniplex と JOYCITY が開発・配信する。",
        series: "『バイオハザード』シリーズ（1996年の第1作に始まるカプコンの看板サバイバルホラー）を題材にした、シリーズ初の本格リアルタイムストラテジー。本編のレオン、クリス、レベッカ、ビリー、アリッサらが並行世界設定で共演し、プレイヤーは洋館を拠点に運営する。クリーチャー原案は天野喜孝。2026年7月には『モンスターハンター』とのコラボを実施。",
        features: ["リアルタイムストラテジーへのジャンル転換", "ユニット指揮による戦術設計", "拠点となる洋館の運営・拡張", "シリーズ初の本格RTS展開", "本編キャラが並行世界設定で共演", "クリーチャー原案：天野喜孝"],
        synopsis: "『バイオハザード』の世界観を、ゾンビシューターでも屋敷探索でもなく、ユニットを指揮する戦略体験として再構築。",
        cast: "レオン・S・ケネディ、クリス・レッドフィールド、レベッカ・チェンバース、ビリー・コーエン、アリッサ・アシュクロフトら本編キャラクターが並行世界設定で共演。ボイスクレジットは公式未発表。",
      },
      news: [
        { source: "Games Press（全球上线公告・151 国地域）", url: "https://www.gamespress.com/zh-CN/Resident-Evil-Survival-Unit-Launches-Worldwide-on-November-18-th" },
        { source: "AppBank（日本国内上线报道）", url: "https://www.appbank.net/2025/11/10/game/2862182.php" },
        { source: "GameMeca（《怪物猎人》联动上线）", url: "https://www.gamemeca.com/en/view.php?gid=1777313" }
      ],
      videos: [
        { label: "全球上线公告（151 国・地域，官方新闻稿）", platform: "媒体", url: "https://www.gamespress.com/zh-CN/Resident-Evil-Survival-Unit-Launches-Worldwide-on-November-18-th" },
        { label: "《怪物猎人》联动更新（Rathalos・限定英雄）", platform: "媒体", url: "https://www.gamemeca.com/en/view.php?gid=1777313" },
        { label: "官方网站", platform: "官方站", url: "https://www.residentevil-survivalunit.com/" }
      ],
      hype: {
        score: 72,
        signals: [
          "《生化危机》IP 全球认知度，上线首日下载突破 100 万",
          "系列首次 RTS 转向，品类讨论度高",
          "上线后以新地图、新角色与《怪物猎人》联动持续供给内容"
        ]
      },
      tags: ["已上线", "手游", "IP改编", "RTS", "全球发行"]
    },

    {
      id: "ame-nochi-hare-onna",
      company: "GAME FREAK",
      companyJp: "株式会社ゲームフリーク",
      bucket: "update",
      platformClass: "mobile",
      announceDate: "2026-09-16（事前予約開始・公式サイト開設）",
      capturedAt: "2026-09-17",
      title: { jp: "雨のちハレ女", cn: "雨过天晴女", en: "Ame nochi Hare Onna / Rainy Day, Sunny Girl" },
      genre: "天气联动魔法少女（官方自称「洗衣游戏」）",
      platforms: ["iOS", "Android"],
      release: "2026年冬",
      releasePrecision: "季",
      summary: "《宝可梦》系列开发商 GAME FREAK 公布完全新 IP。舞台为现代日本，主角为能把天气转化为魔力的「晴女（ハレ女）」，与搭档精灵「クモリン」一同活动。核心机制是接入 Weathernews 的实时天气数据——现实中的晴雨会直接改变战斗与可选择行动，并包含换洗、晾晒等生活要素。由宝可梦系列监督大森滋担任总监兼制作人，与 CHRONOGATE 联合开发。",
      highlight: "现实天气 = 游戏变量。大森滋自述灵感源于「洗衣服前先查天气预报」的日常习惯。",
      mobile: {
        status: "事前登録受付中",
        os: ["iOS", "Android"],
        monetization: "基本無料（アイテム課金あり）",
        preReg: { open: true, since: "2026-09-16", reward: "App Store・Google Play および公式サイトで事前予約を受付中（2026-09-16 開始）。開始と同時に公式サイト・最新キービジュアル 2 種・ゲーム画面・主要キャラクター詳細を公開。人数マイルストーン型の特典内容は公式発表待ち。" },
        developer: "GAME FREAK × CHRONOGATE",
        publisher: "GAME FREAK",
        region: "日本先行（海外配信は未発表）",
        distribution: "App Store / Google Play（日本先行配信。両ストアで予約受付中）",
        payment: [],
        ipSource: "GAME FREAK の完全新規オリジナル IP。ポケットモンスターシリーズとは無関係で、The Pokémon Company は関与していない。",
        series: "GAME FREAK は『ポケットモンスター』シリーズのほか、オリジナル作品として『Beast of Reincarnation』などを手がけてきた。本作は同社のオリジナル IP によるスマホ向けタイトル。共同開発は横浜拠点の CHRONOGATE（『Pokémon Champions』『TRIBE NINE』などに関与）。監督兼プロデューサーは大森滋。",
        features: ["現実の天気予報データ（Weathernews）と連動", "晴れ／雨でキャラクターの能力が変化", "「ハレ女」×「クモリン」の変身バトル", "洗濯・乾燥などの生活要素をゲーム化", "TGS2026（9/17-21）に特別ブースを出展"],
        synopsis: "現代日本の日常が舞台。天気を魔法の力に変える「ハレ女（晴女）」と、その相棒「クモリン」が日本の各地を巡り、人々の気持ちを明るくしていく。",
        cast: "晴渡向日葵：河野日和／洗井ぽん：長野佑紀／天ノ原ゆうり：河野みりか ほか"
      },
      news: [
        { source: "Anime News Network", url: "https://animenewsnetwork.com/news/2026-09-14/pokemon-developer-game-freak-announces-ame-nochi-hare-onna-mobile-game/.241755" },
        { source: "巴哈姆特 GNN（事前予約開始・TGS 参展情報）", url: "https://gnn.gamer.com.tw/detail.php?sn=311703" },
        { source: "ThisIsGame SEA（開発体制と気象連動の解説）", url: "https://thisisgamesea.com/game/mobile-game/game-freak-ame-no-chi-hare-onna-mobile-laundry-game" },
        { source: "Game8（事前登録状況・配信地域）", url: "https://game8.co/articles/release-dates/ame-nochi-hare-onna-release-date-and-time" },
        { source: "VICE", url: "https://www.vice.com/en/article/game-freak-new-game-rainy-day-sunny-girl/" },
        { source: "Game8", url: "https://game8.co/articles/latest/pokemon-devs-next-game-is-a-free-to-play-mobile-game-about-magical-girls" }
      ],
      videos: [
        { label: "公式サイト（最新キービジュアル「巡回」「戦闘」・ゲーム画面を公開）", platform: "官方站", url: "https://hare-onna.jp/" },
        { label: "巴哈姆特 GNN 报道（事前予約開始・TGS2026 展位情报）", platform: "媒体", url: "https://gnn.gamer.com.tw/detail.php?sn=311703" },
        { label: "Anime News Network 报道（含正式预告 PV 与角色视觉）", platform: "媒体", url: "https://animenewsnetwork.com/news/2026-09-14/pokemon-developer-game-freak-announces-ame-nochi-hare-onna-mobile-game/.241755" },
        { label: "Android Hire 报道（配信地域・事前登录状况梳理）", platform: "媒体", url: "https://www.androidhire.com/ame-nochi-hare-onna-game-freak-mobile-game" },
        { label: "VICE 报道（玩法机制与开发体制说明）", platform: "媒体", url: "https://www.vice.com/en/article/game-freak-new-game-rainy-day-sunny-girl/" }
      ],
      hype: {
        score: 76,
        signals: [
          "宝可梦开发商 + 大森滋监督，IP 关注度天然高",
          "9/16 事前预约开放当日即被日台两地媒体同步报道，事前登录启动本身成为二次话题",
          "「现实天气联动」机制在日英双语媒体被反复解读为话题点",
          "TGS2026 设专用展台（9/17-21），热度将续接至公众日"
        ]
      },
      tags: ["新IP", "手游", "天气联动", "事前登录", "TGS2026"]
    },

    {
      id: "blue-nova",
      company: "GungHo Online Entertainment",
      companyJp: "ガンホー・オンライン・エンターテイメント",
      bucket: "new",
      platformClass: "pc",
      announceDate: "2026-09-14",
      capturedAt: "2026-09-15",
      title: { jp: "B.L.U.E. NOVA", cn: "B.L.U.E. NOVA", en: "B.L.U.E. NOVA" },
      genre: "共斗弹幕射击 / Co-op PvE TPS",
      platforms: ["PC (Steam)"],
      release: "2027年",
      releasePrecision: "年",
      summary: "《智龙迷城》《仙境传说》开发商 GungHo 公布免费游玩共斗 PvE 第三人称射击新作。舞台为殖民星球 DIVAL，人类对抗失控 AI「EVE」及其机械军团。招牌机制「R.I.N.G.」把与陌生玩家的偶遇变成火力——踏入光环并肩即触发「Infinite Barrage」，无限弹药无需装填。主模式 Tower Raid 支持最多 30 人，另有 6 人 Boss Raid。",
      highlight: "把「路上遇到的陌生人」本身设计成核心机制，而非赛前组队的固定小队。",
      console: {
        status: "2027年配信予定",
        os: ["PC (Steam)"],
        monetization: "基本プレイ無料（F2P）",
        developer: "ガンホー・オンライン・エンターテイメント（発表は GungHo Online Entertainment America）",
        publisher: "ガンホー・オンライン・エンターテイメント",
        region: "グローバル（公式 SNS・Steam ストアページともに世界向け）",
        distribution: "ダウンロード専売（Steam）",
        stores: ["Steam"],
        features: [
          "リングシステム：戦場で味方とリング内に並ぶと「Infinite Barrage（無限の弾丸）」が発動",
          "メインモード「Tower Raid」は最大 30 人の協力プレイに対応",
          "ヒーローを選び、アーマーとスキルツリーでロードアウトをカスタム",
          "オープンワールドを舞台にした次世代型の協力 PvE シューター"
        ],
        synopsis: "西暦 2200 年、地球の終焉を前に人類は地球に酷似した惑星 DIVAL へ移住。しかし開発を統括していた AI「EVE」が暴走し、機械兵器の反乱が勃発。世界は革新と希望を求める傭兵、すなわち「ヒーロー」の到来を待っていた。",
        cast: "未発表",
        ipSource: "ガンホー・オンライン・エンターテイメントの新規オリジナル IP",
        series: "新規 IP（同社は『パズル＆ドラゴンズ』『ニンジャラ』『LET IT DIE』などを手がける）"
      },

      news: [
        { source: "GungHo 官方新闻稿", url: "https://gunghoonline.com/2026/09/14/gungho-online-entertainment-reveals-co-op-pve-shooter-b-l-u-e-nova-supporting-up-to-30-players/" },
        { source: "AppBank（VTuber SNIVPA 联动细节）", url: "https://www.appbank.net/2026/09/15/game/3104757.php" },
        { source: "Pixels In Orbit（机制深读）", url: "https://pixelsinorbit.com/news/blue-nova-announced-gungho-online-entertainment-september-14-2026-free-to-play-co-op-pve-third-person-shooter-pc-2027-unlimited-attack-ring-infinite-ammo-tower-raid-30-players-master-tower-boss-raid-six-players-eve-singula-deval-usf-seraphy-rico-jj-logi-super-teaser-pv" }
      ],
      videos: [
        { label: "GungHo 官方新闻稿（附正式预告 PV）", platform: "官方", url: "https://gunghoonline.com/2026/09/14/gungho-online-entertainment-reveals-co-op-pve-shooter-b-l-u-e-nova-supporting-up-to-30-players/" },
        { label: "AppBank 报道（VTuber SNIVPA 联动与主题曲 MV）", platform: "媒体", url: "https://www.appbank.net/2026/09/15/game/3104757.php" },
        { label: "Steam 商店页（愿望单开放中）", platform: "Steam", url: "https://store.steampowered.com/app/4881120/" },
        { label: "官方网站", platform: "官方站", url: "https://bluenova-thegame.com/" }
      ],
      hype: {
        score: 66,
        signals: [
          "VTuber「SNIVPA」跨媒介企划（游戏角色同时以真实 VTuber 出道）制造次级话题",
          "30 人大型 PvE 与 F2P 定位在射击品类中属差异化切口",
          "TGS2026 ガンホーブース 06-C06 出展"
        ]
      },
      tags: ["新IP", "F2P", "射击", "VTuber联动", "TGS2026"]
    },

    {
      id: "rhapsody-in-scarlet",
      company: "KONAMI",
      companyJp: "コナミデジタルエンタテインメント",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09-03",
      capturedAt: "2026-09-15",
      title: { jp: "Rhapsody in Scarlet", cn: "绯红狂想曲", en: "Rhapsody in Scarlet" },
      genre: "魔法动作冒险",
      platforms: ["PS5", "Xbox Series X|S", "PC (Steam)"],
      release: "未定",
      releasePrecision: "未定",
      summary: "KONAMI 完全新作。舞台为爵士乐鼎盛的 1920 年代纽约，玩家扮演年轻魔法师 Ellie Myers（表面身份是追逐梦想的爵士歌手），与精锐魔法师组织「探索者」领袖 Ilya 相遇，共同追查神秘黑手党的阴谋。战斗以「魔法 × 魔兽」组合连段为特色，可按战况切换近距、远距与范围攻击。",
      highlight: "音乐由 SOIL & \"PIMP\" SESSIONS 与创作歌手 Emi Meyer 合作主题曲《Cool/Hot》，配乐本身即是卖点。",
      news: [
        { source: "KONAMI 官方（PRESS START 内容汇总）", url: "https://www.konami.com/games/eu/en/topics/19295/" },
        { source: "GameApps.hk（角色与配音阵容）", url: "https://www.gameapps.hk/news/70724/rhapsody-in-scarlet/" },
        { source: "Eurogamer（State of Play 汇总）", url: "https://www.eurogamer.net/everything-announced-at-sonys-state-of-play-september-2026" }
      ],
      videos: [
        { label: "Announcement Trailer 官方预告", platform: "YouTube", url: "https://youtu.be/JbV1RSQ3bjg" },
        { label: "Story Trailer 故事预告", platform: "YouTube", url: "https://youtu.be/ok5z5wsgJXs" },
        { label: "主题曲《Cool/Hot》特别影像", platform: "YouTube", url: "https://www.youtube.com/watch?v=qaYFGhohwEE" },
        { label: "KONAMI PRESS START 完整直播", platform: "YouTube", url: "https://youtu.be/us-U1NKynio" },
        { label: "KONAMI 官方作品页（愿望单入口）", platform: "官方站", url: "https://www.konami.com/games/ris/" }
      ],
      hype: {
        score: 75,
        signals: [
          "State of Play Japan 单独环节 + KONAMI PRESS START 双重曝光",
          "日英双语 CV 阵容（鬼头明里 / Cherami Leigh）覆盖两市场",
          "爵士 × 魔法 × 1920s 纽约的题材在社媒辨识度高"
        ]
      },
      tags: ["新IP", "动作", "音乐", "PS"],
      voice: "Ellie: Cherami Leigh / 鬼头明里　Ilya: Hannah Grace / 大西沙织"
    },

    {
      id: "project-zircon",
      company: "KONAMI",
      companyJp: "コナミデジタルエンタテインメント",
      bucket: "new",
      platformClass: "pc",
      announceDate: "2026-09-03",
      capturedAt: "2026-09-15",
      title: { jp: "PROJECT ZIRCON", cn: "PROJECT ZIRCON", en: "PROJECT ZIRCON" },
      genre: "Deck-building Roguelike / 卡牌",
      platforms: ["PC (Steam)"],
      release: "未定",
      releasePrecision: "未定",
      summary: "KONAMI 同场公布的另一款完全新作。玩家构筑卡组、经营国家，对抗「深渊灾厄龙」再度降临的威胁。包含「战略阶段」与「内政阶段」双循环——扩张领土、获取卡牌与设施，再以组合打法闯关；支持多结局与分支剧情。Steam 愿望单已开放。",
      highlight: "KONAMI 少见地一次性公布两张全新 IP 牌，产品线明显向 PC / Steam 倾斜。",
      news: [
        { source: "KONAMI 官方 topics", url: "https://www.konami.com/games/eu/en/topics/19295/" }
      ],
      videos: [
        { label: "KONAMI PRESS START 直播（本作公开环节）", platform: "YouTube", url: "https://youtu.be/us-U1NKynio" },
        { label: "KONAMI 官方 topics（两款新作汇总）", platform: "官方", url: "https://www.konami.com/games/eu/en/topics/19295/" }
      ],
      hype: {
        score: 58,
        signals: [
          "卡牌 Roguelike 品类受众相对垂直",
          "与同场 Rhapsody in Scarlet 相比媒体曝光有限",
          "Steam 愿望单已开放，数据待累积"
        ]
      },
      tags: ["新IP", "Roguelike", "卡牌", "Steam"]
    },

    {
      id: "idolmaster-sidem-console",
      company: "Bandai Namco Entertainment",
      companyJp: "株式会社バンダイナムコエンターテインメント",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09-14",
      capturedAt: "2026-09-15",
      title: { jp: "アイドルマスター SideM 初の家庭用ゲーム企画", cn: "偶像大师 SideM 首款主机游戏企划", en: "THE IDOLM@STER SideM (home console project)" },
      genre: "偶像养成 / 主机游戏",
      platforms: ["Nintendo Switch", "Nintendo Switch 2"],
      release: "未定",
      releasePrecision: "未定",
      summary: "万代南梦宫公布《偶像大师 SideM》系列首款家用主机游戏企划。玩家将从 315 Production 的 49 位偶像、16 个组合中展开制作人工作，故事为完全新作。这是 SideM 自 2014 年手游上线以来首次登陆主机平台。",
      highlight: "IP 十年后首次主机化，对系列老粉属高情绪价值事件。",
      console: {
        status: "発売時期未定（正式タイトルも未発表）",
        os: ["Nintendo Switch", "Nintendo Switch 2"],
        monetization: "未発表",
        developer: "バンダイナムコエンターテインメント × D3パブリッシャー",
        publisher: "バンダイナムコエンターテインメント",
        region: "日本（海外展開は未発表）",
        distribution: "未発表",
        stores: ["Nintendo eShop（予定）"],
        features: [
          "315 Production 所属の 49 名のアイドル・16 ユニットを育成する、アイドル育成＋スケジュール管理型アドベンチャー",
          "ブランドページで展開中の物語世界観を引き継ぎつつ、家庭用版は完全新作ストーリー",
          "1 年後に開催される大型ライブに向け、各ユニットがそれぞれの目標へ進む群像劇",
          "Dramatic Stars / Jupiter / F-LAGS / C.First など既存ユニットが揃って登場"
        ],
        synopsis: "プレイヤーは 315 Production のプロデューサー。医師など「前職」を持つ 49 名の男性アイドルを支え、1 年後の大型ライブへ向けた各ユニットの歩みを描く完全新作ストーリー。",
        cast: "未発表",
        ipSource: "『THE IDOLM@STER』シリーズ（SideM ブランド）",
        series: "SideM 初の単独家庭用ゲーム。シリーズの家庭用新作は 2021 年『スターリットシーズン』以来"
      },

      news: [
        { source: "Quest Board.JP 日刊（9/14 汇总）", url: "https://quest-board.jp/en/quests/daily-2026-09-14" }
      ],
      videos: [
        { label: "发表日刊报道（作品概要）", platform: "媒体", url: "https://quest-board.jp/en/quests/daily-2026-09-14" },
        { label: "バンダイナムコエンターテインメント 官方站", platform: "官方站", url: "https://www.bandainamcoent.co.jp/" }
      ],
      hype: {
        score: 69,
        signals: [
          "IP 既有粉丝盘厚实，公布当日日本社媒讨论集中",
          "Switch / Switch 2 双平台，避开单一硬件风险",
          "尚未公布发售日，热度可持续期长"
        ]
      },
      tags: ["新企划", "IP改编", "偶像", "Switch2"]
    },

    {
      id: "active-cinema-rpg-369",
      company: "COLOPL",
      companyJp: "株式会社コロプラ",
      bucket: "new",
      platformClass: "mobile",
      announceDate: "2026-09-01",
      capturedAt: "2026-09-15",
      title: { jp: "アクティブシネマRPG 369", cn: "Active Cinema RPG 369", en: "Active Cinema RPG 369" },
      genre: "浏览器 RPG（影视化叙事）",
      platforms: ["Web（手机 / PC 浏览器）"],
      release: "2026-09-01 已开服",
      releasePrecision: "日",
      summary: "COLOPL 旗下品牌「Kuma the Bear」新作，已正式开服。最大特点是不经 App 商店、以浏览器技术直接呈现影视级画质，无需下载安装。舞台围绕拥有灵感的女子高中生「草薙ウル」与特务机关 369 的阴阳搜查官「立丸シノ」，二人追查怪异事件并与异形「モウジャ」对峙。战斗为即时制，含式神「シキガミ」养成。",
      highlight: "绕开 App Store / Google Play 的浏览器分发路线，支付已接 PayPay / Apple Pay / 信用卡。",
      mobile: {
        status: "正式サービス中（2026-09-01 開服）",
        os: ["iOS", "Android", "PC ブラウザ"],
        monetization: "基本無料（アイテム課金）",
        preReg: { open: false, reward: "事前登録キャンペーンは実施していない。2026年8月5日の第3四半期決算説明会でタイトルのみを電撃発表し、9月1日にそのままサービス開始した。" },
        launch: "2026-09-01",
        developer: "COLOPL",
        publisher: "COLOPL（ブランド：Kuma the Bear）",
        region: "日本",
        distribution: "ブラウザ配信（App ストア経由なし）",
        payment: ["PayPay", "Apple Pay", "クレジットカード"],
        ipSource: "COLOPL のオリジナル IP（新ブランド「Kuma the Bear」）。既存 IP のタイアップではなく完全新作。読みは「ミロク」。",
        series: "COLOPL は『白猫プロジェクト』や『ドラゴンクエストウォーク』（スクウェア・エニックスとの共同開発）を手がけてきた。本作はクリエイティブと先端技術を組み合わせる新ブランド「Kuma the Bear」の第1弾で、生成 AI による実写ドラマ風映像をゲームの中核に据えた点が特徴。",
        features: ["ブラウザのみで動作、インストール不要", "AI 演算でシネマティックな映像体験を最適化", "リアルタイム戦闘＋式神（シキガミ）育成", "好感度・育成度に応じてキャラ背景ストーリー解放", "カメラワークを活かした「アクティブシネマ」演出"],
        synopsis: "霊感を持つ女子高生「草薙ウル」と、特務機関369の陰陽捜査官「立丸シノ」。連続する怪異を追う二人は、異形「モウジャ」と対峙し、都市伝説の裏に隠された陰謀へと踏み込む。",
        cast: "実写俳優によるアンサンブルドラマ形式。個別のキャストクレジットは未確認。",
      },
      news: [
        { source: "Ludens Media（引自 GameBiz）", url: "https://www.ludens.com.tw/colopl-active-cinema-rpg-369-browser-game" }
      ],
      videos: [
        { label: "开服报道（含玩法、世界观与支付方式说明）", platform: "媒体", url: "https://www.ludens.com.tw/colopl-active-cinema-rpg-369-browser-game" },
        { label: "COLOPL 官方站", platform: "官方站", url: "https://www.colopl.co.jp/" }
      ],
      hype: {
        score: 52,
        signals: [
          "已开服，靠运营数据而非 PV 声量说话",
          "浏览器分发属差异化尝试，业界关注点在商业模式",
          "海外媒体报道量有限"
        ]
      },
      tags: ["已上线", "浏览器游戏", "手游"],
      caution: "进度绑定浏览器缓存，官方提示优先完成账号联动。"
    },

    {
      id: "where-the-seeds-fall",
      company: "Cygames Edge",
      companyJp: "Cygames Edge",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09",
      capturedAt: "2026-09-15",
      title: { jp: "Where the Seeds Fall", cn: "Where the Seeds Fall", en: "Where the Seeds Fall" },
      genre: "垂直平台动作 / 动作冒险",
      platforms: ["PS5 等"],
      release: "2026-11-05",
      releasePrecision: "日",
      summary: "Cygames 新设立的工作室「Cygames Edge」的首部项目。玩家操控角色沿世界树向下穿行，主轴为垂直方向的平台跳跃挑战；主线约三小时，另有额外关卡与计时挑战供深度玩家挖掘。",
      highlight: "大厂内部新工作室的出道作，被视为 Cygames 拓展主机单机路线的试探。",
      news: [
        { source: "CQ-Esports（State of Play Japan 汇总）", url: "https://cq-esports.com/news/state-of-play-japan-september-2026-every-major-game-update" }
      ],
      videos: [
        { label: "State of Play Japan 汇总（本作首秀解析）", platform: "媒体", url: "https://cq-esports.com/news/state-of-play-japan-september-2026-every-major-game-update" },
        { label: "Eurogamer State of Play 全程汇总", platform: "媒体", url: "https://www.eurogamer.net/everything-announced-at-sonys-state-of-play-september-2026" }
      ],
      hype: {
        score: 61,
        signals: [
          "Cygames 品牌背书 + State of Play 首秀",
          "短篇精悍定位与主流长线 JRPG 形成反差，媒体评价偏好奇",
          "发售日近（11/5），转化窗口短"
        ]
      },
      tags: ["工作室首作", "动作", "StateOfPlay"]
    },

    {
      id: "hyperreal-tgs-new",
      company: "HYPER REAL（産経デジタル）",
      companyJp: "株式会社産経デジタル ゲームブランド「HYPER REAL」",
      bucket: "new",
      platformClass: "pc",
      announceDate: "2026-09",
      capturedAt: "2026-09-15",
      title: { jp: "NAME OF THE WILL: 集団後遺症 / Helcast（地獄呪鋳）", cn: "NAME OF THE WILL：集团后遗症 / Helcast", en: "NAME OF THE WILL / Helcast" },
      genre: "独立游戏发行（两款日本首发）",
      platforms: ["PC 等"],
      release: "未定",
      releasePrecision: "未定",
      summary: "产经 Digital 旗下游戏品牌 HYPER REAL 将在 TGS2026 首次于日本公开两款新发行作品，并以品牌史上最大展位展出共 6 款作品。同期公开 Sukeban Games（《VA-11 Hall-A》开发商）游戏导演 Chris 参与制作的《DIGITAL EXORCIST》最新主视觉。",
      highlight: "从独立游戏专区升格至一般展示区，是发行商层面扩张的信号。",
      news: [
        { source: "産経デジタル（中文版）", url: "https://cn.sankei-digital.co.jp/topic-17840" },
        { source: "Sankei Digital（英文版 · TGS2026 出展详情）", url: "https://en.sankei-digital.co.jp/topic-18397" },
        { source: "Gamers & Games（NAME OF THE WILL 深度报道）", url: "https://www.gamersegames.com.br/?p=230141" }
      ],
      videos: [
        { label: "産経デジタル 中文版（6 款出展作品全览＋展位信息）", platform: "官方新闻稿", url: "https://cn.sankei-digital.co.jp/topic-17840" },
        { label: "産経デジタル 英文版（2 款日本首发新作详情）", platform: "官方新闻稿", url: "https://en.sankei-digital.co.jp/topic-18397" },
        { label: "NAME OF THE WILL 官网 Steam 页（含预告影像）", platform: "Steam", url: "https://store.steampowered.com/app/2079920/NAME_OF_THE_WILL/" },
        { label: "Helcast 官网 Steam 页（含预告影像）", platform: "Steam", url: "https://store.steampowered.com/app/3430620/Helcast/" }
      ],
      hype: {
        score: 54,
        signals: [
          "独立游戏圈层关注，大众声量有限",
          "TGS2026 展位 02-C14，现场可试玩",
          "《Helcast》设高分竞赛，现场互动设计加分"
        ]
      },
      tags: ["独立游戏", "发行", "TGS2026"]
    },

    {
      id: "shochiku-tgs-2026",
      company: "松竹ゲームズ（松竹株式会社 ゲーム事業室）",
      companyJp: "松竹株式会社 ゲーム事業室",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09-11",
      capturedAt: "2026-09-15",
      title: { jp: "ムーミン:ムーミン谷の夏まつり ほか TGS2026 出展 11 タイトル", cn: "姆明：姆明谷的夏祭 等 11 款参展作品", en: "Moomin: Summer Festival in Moominvalley & 10 more" },
      genre: "多品类（点击式冒险 / Roguelite 等）",
      platforms: ["Nintendo Switch", "Nintendo Switch 2", "PC (Steam)", "PS5", "Xbox Series X|S"],
      release: "2026-11-12（ムーミン）等，逐作不同",
      releasePrecision: "日",
      summary: "松竹游戏事业室公布 TGS2026 展位信息与 11 款出展作品，为历届最多。带头新作《ムーミン:ムーミン谷の夏まつり》（11/12 发售）之外，还包括与电猫游戯共同推出的 Roguelite 3D 动作《夢幻桜楼閣》（2026 秋）、自研视觉小说《Algorithm Prescription》等。展位位于 4 号馆 04-C02。",
      highlight: "传统影视公司以发行商身份大规模参展，是日本内容产业跨界游戏的一手案例。",
      console: {
        status: "出展 11 タイトルのうち『ムーミン:ムーミン谷の夏まつり』のみ発売日確定（2026-11-12）、他は逐作で異なる",
        os: ["Nintendo Switch", "Nintendo Switch 2", "PC (Steam)", "PS5", "Xbox Series X|S"],
        monetization: "作品ごとに異なる（『ムーミン』＝Steam 版 2,300 円／Switch・Switch 2 DL 版 2,550 円／通常版 4,480 円／限定版 10,120 円・すべて税込）",
        developer: "作品ごとに異なる（『ムーミン』＝Crossbridge Game Studios／『夢幻桜楼閣』＝電猫遊戯）",
        publisher: "松竹ゲームズ（松竹株式会社 ゲーム事業室）",
        region: "日本（Steam 版は世界向けに配信）",
        distribution: "パッケージ＋ダウンロード（『ムーミン』Switch・Switch 2 実体版の予約受付中）",
        stores: ["Nintendo eShop", "PlayStation Store", "Steam", "Microsoft Store"],
        preOrder: { open: true, since: "2026-08-21", reward: "『ムーミン』実体版：通常版の初回生産分にオリジナル透明ステッカー、限定版はそれに加えてムーミン谷ポストカードブック／刺繍ハンカチ／メッシュポーチ／すりガラス風キーホルダー。楽天ブックス・Amazon・ジョーシン・アニメイト等の店舗別特典も予定" },
        features: [
          "TGS2026 の出展は 11 タイトルで過去最多、ブースは第 4 ホール 04-C02",
          "『ムーミン:ムーミン谷の夏まつり』＝トーベ・ヤンソン原作小説を基にしたポイント＆クリックアドベンチャー",
          "『夢幻桜楼閣』＝電猫遊戯との共同による Roguelite 3D アクション（2026 年秋予定）",
          "『OKU』＝俳句を詠んで進む和風アドベンチャー、Steam フォロワー数 30 万超",
          "会場では 4 作品の試作版が試遊可能で、来場者特典としてオリジナルグッズを配布"
        ],
        synopsis: "『ムーミン:ムーミン谷の夏まつり』では、スナフキンの帰りを待つムーミントロールの日常に大洪水が襲い、ムーミン谷が水没。一家とリトルミイは屋根に避難し、流れてきた謎の劇場に乗り込んでいく。手描きの絵本風アートで原作の名場面と新規エピソードを描く。",
        cast: "未発表",
        ipSource: "『ムーミン』＝Tove Jansson 原作（Moomin Characters Oy Ltd が著作権を保有）。その他は各社オリジナル",
        series: "松竹ゲームズは 2024 年 6 月に松竹社内のゲーム事業室として発足、日本・アジア・海外向けに PC／家庭用タイトルを展開"
      },

      news: [
        { source: "AppBank（出展全清单）", url: "https://www.appbank.net/2026/09/14/game/3103671.php" }
      ],
      videos: [
        { label: "TGS2026 出展 11 款作品全清单（AppBank）", platform: "媒体", url: "https://www.appbank.net/2026/09/14/game/3103671.php" },
        { label: "《ムーミン:ムーミン谷の夏まつり》官方网站", platform: "官方站", url: "https://game.shochiku.co.jp/lp/moomin-mm/" },
        { label: "《夢幻桜楼閣》Steam 商店页", platform: "Steam", url: "https://store.steampowered.com/app/2991310/" }
      ],
      hype: {
        score: 50,
        signals: [
          "姆明 IP 认知度广，但游戏向关注度中等",
          "11 款合展的规模本身成为 TGS 话题",
          "偏中小体量作品集群，缺少旗舰爆款"
        ]
      },
      tags: ["发行", "IP改编", "TGS2026", "多平台"]
    },

    /* ---------------------------------------------------------
     * B. 定档与进展 — 已有作品的发售日确认 / 新预告 / 试玩
     * ------------------------------------------------------- */
    {
      id: "pokemon-winds-waves",
      company: "The Pokémon Company / GAME FREAK",
      companyJp: "株式会社ポケモン / 株式会社ゲームフリーク",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09（期待榜蝉联首位）",
      capturedAt: "2026-09-15",
      title: { jp: "ポケモン Winds / Waves", cn: "宝可梦 Winds / Waves", en: "Pokémon Winds / Waves" },
      genre: "RPG（系列正统新作）",
      platforms: ["Nintendo Switch 2"],
      release: "2027年",
      releasePrecision: "年",
      summary: "宝可梦系列正统新作，面向 Nintendo Switch 2 开发。9/13 发表的 Famitsu 读者期待榜中以 657 票蝉联首位，且与第二名拉开明显差距，是日本玩家目前最期待的作品。官方尚未公布具体发售日。",
      highlight: "期待榜第一的领先幅度达 153 票，领先第二名《Fire Emblem: Fortune's Weave》约 30%，且榜单位置已连续多期未变。",
      news: [
        { source: "Nintendo Everything（Famitsu 期待榜）", url: "https://nintendoeverything.com/famitsus-most-wanted-games-september-13-2026" }
      ],
      videos: [
        { label: "Famitsu 期待榜（本作蝉联首位报道）", platform: "媒体", url: "https://nintendoeverything.com/famitsus-most-wanted-games-september-13-2026" },
        { label: "ポケモン官方站", platform: "官方站", url: "https://www.pokemon.co.jp/" }
      ],
      hype: {
        score: 93,
        signals: [
          "Famitsu 读者期待榜第 1 位（657 票），领先幅度显著",
          "宝可梦 IP 全球认知度为日厂最高梯队",
          "Switch 2 独占预期推高硬件连带关注"
        ]
      },
      tags: ["高期待", "RPG", "Switch2独占"]
    },

    {
      id: "dq-monsters-withered-world",
      company: "Square Enix",
      companyJp: "株式会社スクウェア・エニックス",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09-16（DQ 系列全世界累計 1 億本突破を発表）",
      capturedAt: "2026-09-17",
      title: { jp: "ドラゴンクエストモンスターズ 朽ちた世界", cn: "勇者斗恶龙 怪物篇 The Withered World", en: "Dragon Quest Monsters: The Withered World" },
      genre: "怪物收集 RPG",
      platforms: ["Nintendo Switch", "Nintendo Switch 2", "PS5", "Xbox Series X|S", "PC"],
      release: "2026-12-03",
      releasePrecision: "日",
      summary: "《勇者斗恶龙 V》女主角 Bianca 与 Nera 担任主角的怪物收集作品，舞台为 Witherwood 王国。玩家可侦查、培育并合成怪物，Square Enix 称登场怪物超过 500 种，并计划加入线上 PvP。Demo 已配信且存档可继承至正式版。9/16 Square Enix 宣布 DQ 系列全球累计出货＋数字销量突破 1 亿套，本作是该里程碑后的首个系列新作，TGS2026 展台可与之相关的怪物合影。",
      highlight: "DQ 系列全球累计突破 1 亿套的官宣与本作 12/03 发售形成接力；TGS2026 展台设可合影的怪物特设区。",
      console: {
        status: "2026年12月3日発売予定（Demo 配信中・セーブ引き継ぎ可）",
        os: ["Nintendo Switch", "Nintendo Switch 2", "PlayStation 5", "Xbox Series X|S", "PC"],
        monetization: "7,700 円（税込・小売リスト集計値）",
        developer: "スクウェア・エニックス",
        publisher: "スクウェア・エニックス",
        region: "日本",
        distribution: "パッケージ版・ダウンロード版",
        stores: ["Nintendo eShop", "PlayStation Store", "Microsoft Store", "Steam"],
        features: [
          "モンスターをスカウト・育成・配合して部隊を作る収集型 RPG。登場モンスターは 500 種以上",
          "オンライン PvP の実装が予告されている",
          "TGS2026 では「Fluffy Meet and Greet」と題した記念撮影企画を実施"
        ],
        synopsis: "『ドラゴンクエスト V』のヒロイン、ビアンカとフローラが主人公を務める。舞台はウィザウッド王国。同社は State of Play Japan で闘技場バトルと物語の演出を披露した。",
        ipSource: "『ドラゴンクエスト』シリーズ（スクウェア・エニックス）",
        series: "『ドラゴンクエストモンスターズ』シリーズ最新作"
      },
      news: [
        { source: "CQ-Esports（State of Play Japan）", url: "https://cq-esports.com/news/state-of-play-japan-september-2026-every-major-game-update" },
        { source: "Games Reviews（TGS 展台阵容）", url: "https://gamesreviews.com/news/09/square-enixs-tgs-2026-lineup-playable-ff7-revelation-resonance-demos-kh-collection-ports/" }
      ],
      videos: [
        { label: "State of Play Japan 汇总（斗技场战斗展示）", platform: "媒体", url: "https://cq-esports.com/news/state-of-play-japan-september-2026-every-major-game-update" },
        { label: "TGS2026 展台阵容（Square Enix 官方名单解读）", platform: "媒体", url: "https://gamesreviews.com/news/09/square-enixs-tgs-2026-lineup-playable-ff7-revelation-resonance-demos-kh-collection-ports/" }
      ],
      hype: {
        score: 80,
        signals: [
          "Famitsu 期待榜 NS2 版 228 票（第 9 位），另有 NSW/PS5 版分列",
          "DQ 品牌在日本本土的号召力稳定",
          "12/3 发售 + Demo 已配信，转化路径短"
        ]
      },
      tags: ["定档", "RPG", "怪物收集", "Demo已配信"]
    },

    {
      id: "kingdom-hearts-4",
      company: "Square Enix",
      companyJp: "株式会社スクウェア・エニックス",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09（TGS 展出确认）",
      capturedAt: "2026-09-15",
      title: { jp: "キングダム ハーツ IV", cn: "王国之心 IV", en: "KINGDOM HEARTS IV" },
      genre: "动作 RPG",
      platforms: ["Nintendo Switch 2", "PS5", "Xbox Series X|S", "PC"],
      release: "2027年后期",
      releasePrecision: "期",
      summary: "系列正统编号新作，延续 Sora 在神秘都市 Quadratum 的旅程，Switch 2 版与其他平台同日推出。TGS2026 Square Enix 展台将以「仅展示、不可试玩」形式出展。系列累计出货量已突破 3900 万套，另有由野村哲也参与的同名动画系列在开发中。",
      highlight: "TGS 采取「看得到摸不到」的展出策略，属刻意维持悬念的宣发手法。",
      console: {
        status: "2027年後半発売予定。価格未発表。TGS2026 は「展示のみ」で試遊不可",
        os: ["Nintendo Switch 2", "PlayStation 5", "Xbox Series X|S", "PC"],
        monetization: "未発表（小売リストでも TBA）",
        developer: "スクウェア・エニックス",
        publisher: "スクウェア・エニックス",
        region: "日本（EN / FR / IT / DE / ES / PT 対応）",
        distribution: "パッケージ版・ダウンロード版",
        stores: ["Nintendo eShop", "PlayStation Store", "Microsoft Store", "Steam"],
        features: [
          "シリーズ正統ナンバリング最新作。謎の都市クアドラトゥムにいるソラの物語を継続する",
          "Nintendo Switch 2 版は他機種と同日発売",
          "TGS2026 のスクウェア・エニックス ブースは「見られるが触れない」展示方針で、試遊枠を設けていない"
        ],
        synopsis: "ソラが辿り着いた謎の都市クアドラトゥムでの旅を描くシリーズ正統ナンバリング。Switch 2 版を含む全プラットフォームで展開予定。",
        ipSource: "『KINGDOM HEARTS』シリーズ（スクウェア・エニックス × ディズニー）",
        series: "シリーズ累計出荷 3,900 万本超。野村哲也が参加する同名アニメシリーズも開発中"
      },
      news: [
        { source: "Games Reviews（TGS 展台阵容）", url: "https://gamesreviews.com/news/09/square-enixs-tgs-2026-lineup-playable-ff7-revelation-resonance-demos-kh-collection-ports/" },
        { source: "Eurogamer", url: "https://www.eurogamer.net/everything-announced-at-sonys-state-of-play-september-2026" }
      ],
      videos: [
        { label: "Eurogamer State of Play 汇总（含官方影像）", platform: "媒体", url: "https://www.eurogamer.net/everything-announced-at-sonys-state-of-play-september-2026" },
        { label: "TGS2026 展台阵容（展出形式说明）", platform: "媒体", url: "https://gamesreviews.com/news/09/square-enixs-tgs-2026-lineup-playable-ff7-revelation-resonance-demos-kh-collection-ports/" }
      ],
      hype: {
        score: 82,
        signals: [
          "Famitsu 期待榜 PS5 版 76 票",
          "系列 3900 万套 + 动画化带来的跨媒介放大",
          "发售窗口偏后（2027 后期），热度需长期经营"
        ]
      },
      tags: ["发表", "动作RPG", "IP", "TGS2026"]
    },

    {
      id: "ff7-revelation",
      company: "Square Enix",
      companyJp: "株式会社スクウェア・エニックス",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09-17（TGS2026 で世界初の一般試遊を公開）",
      capturedAt: "2026-09-17",
      title: { jp: "FINAL FANTASY VII REVELATION", cn: "最终幻想 VII 启示录", en: "FINAL FANTASY VII REVELATION" },
      genre: "RPG（Remake 三部曲终章）",
      platforms: ["PS5", "Nintendo Switch 2", "Xbox Series X|S", "PC (Steam / Epic)"],
      release: "2027-04-08",
      releasePrecision: "日",
      summary: "Nintendo Direct 9/9 确认最终发售日为 2027 年 4 月 8 日，全平台同步。玩家可搭乘飞空艇 Highwind 自由飞行、跳伞任意降落，实现无缝天地切换；新增可操作角色 Vincent Valentine 与 Cid Highwind，并导入可切换职业动作的「FITS」系统。TGS2026 提供三部曲终章的全球首个可玩 Demo，公开飞空艇世界地图探索与「Trinity」三人连携战斗系统。",
      highlight: "三部曲终章在 TGS2026 首次开放全球试玩，飞空艇世界地图与 Trinity 连携战斗是两大看点。",
      news: [
        { source: "Square Enix 官方新闻稿", url: "https://press.na.square-enix.com/FINAL-FANTASY-VII-REVELATION-ANNOUNCED-EXPERIENCE-THE-JOURNEYS-END-IN-" },
        { source: "Siliconera（gamescom 预告解析）", url: "https://www.siliconera.com/see-the-gamescom-2026-ffvii-revelation-trailer/" },
        { source: "Games Reviews（TGS 展台阵容）", url: "https://gamesreviews.com/news/09/square-enixs-tgs-2026-lineup-playable-ff7-revelation-resonance-demos-kh-collection-ports/" }
      ],
      videos: [
        { label: "Reveal Trailer 官方预告", platform: "YouTube", url: "https://youtu.be/PH3ox5krci8" },
        { label: "Extended Gameplay 实机演示", platform: "YouTube", url: "https://youtu.be/uVMg1Ub-6-Y" },
        { label: "gamescom 2026 预告（Weapons 篇）", platform: "YouTube", url: "https://www.youtube.com/watch?v=87TNASkXOWQ" },
        { label: "Square Enix 官方新闻稿", platform: "官方", url: "https://press.na.square-enix.com/FINAL-FANTASY-VII-REVELATION-ANNOUNCED-EXPERIENCE-THE-JOURNEYS-END-IN-" }
      ],
      hype: {
        score: 88,
        signals: [
          "Famitsu 读者期待榜 257 票（PS5 第 6 位）",
          "remake 企划数年的情绪积累在终章集中释放",
          "TGS2026 试玩 + 三个主题拍照点，线下转化力强"
        ]
      },
      tags: ["定档", "RPG", "三部曲终章", "TGS2026"]
    },

    {
      id: "ff-resonance",
      company: "Square Enix",
      companyJp: "株式会社スクウェア・エニックス",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09-17（TGS2026 で新トレーラー公開・10-22 発売確定）",
      capturedAt: "2026-09-17",
      title: { jp: "FINAL FANTASY RESONANCE", cn: "最终幻想 Resonance", en: "FINAL FANTASY RESONANCE" },
      genre: "HD-2D 回合制 RPG",
      platforms: ["Switch", "Switch 2", "PS5", "Xbox Series X|S", "PC"],
      release: "2026-10-22",
      releasePrecision: "日",
      summary: "系列首款 HD-2D 作品，将 2015 年手游《FF Brave Exvius》的开篇剧情重编为完整单机游戏，并且不含抽卡。战斗为经典回合制（非 ATB），带可见时间轴、Stagger 窗口、Limit Burst、幻兽与历代英雄「Visions」。第一章 Demo 已配信且存档可继承。9/17 的 TGS2026 公开新预告并确认 2026 年 10 月 22 日登陆 Switch 与 Switch 2，eShop 提供免费试玩版，试玩存档可继承至正式版。",
      highlight: "TGS2026 新预告把发售日锁死在 10/22，并让 eShop 试玩存档直接继承——本作是 Square Enix 展台两大试玩之一。",
      console: {
        status: "2026年10月22日発売予定（第一章 Demo 配信中）",
        os: ["Nintendo Switch", "Nintendo Switch 2", "PlayStation 5", "Xbox Series X|S", "PC"],
        monetization: "7,678 円（税込・小売リスト集計値／Switch 2 版は Game Key Card 形式）。買い切りでガチャ要素はなし",
        developer: "スクウェア・エニックス",
        publisher: "スクウェア・エニックス",
        region: "日本（EN / FR / DE / ES 対応）",
        distribution: "パッケージ版（Switch 2 版は Game Key Card）・ダウンロード版",
        stores: ["Nintendo eShop", "PlayStation Store", "Microsoft Store", "Steam"],
        features: [
          "シリーズ初の HD-2D 作品。ドット絵と 3D を組み合わせた表現で「現代の FF を 16-bit の水晶冒険のように」描く",
          "バトルは ATB ではなくコマンド式のターン制。可視タイムライン、Stagger ウィンドウ、Limit Burst を採用",
          "幻獣と、歴代 FF の英雄「Visions」を軸にした編成・強化",
          "第一章 Demo のセーブデータは製品版へ引き継ぎ可能"
        ],
        synopsis: "2015 年に配信されたスマートフォン向け『FINAL FANTASY ブレイブエクスヴィアス』の序盤シナリオを、家庭用の単体タイトルとして再構成した作品。TGS2026 では『FFVII REVELATION』と並ぶ 2 大試遊の一角。",
        ipSource: "『FINAL FANTASY』シリーズ／『FF ブレイブエクスヴィアス』",
        series: "シリーズ初の HD-2D タイトル"
      },
      news: [
        { source: "Eurogamer（State of Play 汇总）", url: "https://www.eurogamer.net/everything-announced-at-sonys-state-of-play-september-2026" },
        { source: "Gurugamer（JRPG 盘点）", url: "https://gurugamer.com/pc-console/top-10-upcoming-jrpgs-to-release-in-2026-and-2027-27290" }
      ],
      videos: [
        { label: "Eurogamer 汇总（含 Demo 公布预告影像）", platform: "媒体", url: "https://www.eurogamer.net/everything-announced-at-sonys-state-of-play-september-2026" },
        { label: "JRPG 盘点（发售窗口与系统说明）", platform: "媒体", url: "https://gurugamer.com/pc-console/top-10-upcoming-jrpgs-to-release-in-2026-and-2027-27290" }
      ],
      hype: {
        score: 79,
        signals: [
          "Famitsu 期待榜 NS2 版 186 票 / PS5 版 90 票（跨平台合计居前）",
          "Demo 已可试玩，口碑扩散早于发售",
          "10/22 发售，处于年末商战窗口"
        ]
      },
      tags: ["定档", "HD-2D", "RPG", "Demo已配信"]
    },

    {
      id: "persona-6",
      company: "ATLUS（SEGA）",
      companyJp: "株式会社アトラス",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09-09（Switch 2 版确认）",
      capturedAt: "2026-09-15",
      title: { jp: "Persona 6", cn: "女神异闻录 6", en: "Persona 6" },
      genre: "RPG",
      platforms: ["Xbox Series X|S", "Xbox on PC", "PS5", "Steam", "Nintendo Switch 2"],
      release: "未定",
      releasePrecision: "未定",
      summary: "系列正统编号新作，继承「日常生活 × 社交关系 × 超自然冒险」三大支柱，舞台与角色全新。Nintendo Direct 9/9 确认将登陆 Switch 2。此前在 Xbox Games Showcase 2026 首发时，ATLUS 同时公布系列全球累计销量突破 3000 万套。",
      highlight: "Switch 2 版加入后，Persona 6 成为极少数确认覆盖微软 / 索尼 / 任天堂 / PC 全阵营的日式 RPG。",
      news: [
        { source: "ATLUS 官方新闻稿", url: "https://www.chalgyr.com/2026/06/news-persona6-comingsoon.html" },
        { source: "GameMeca（Nintendo Direct 汇总）", url: "https://www.gamemeca.com/en/view.php?gid=1780300" },
        { source: "Nintendo Everything（Famitsu 期待榜）", url: "https://nintendoeverything.com/famitsus-most-wanted-games-september-13-2026" }
      ],
      videos: [
        { label: "Persona 6 Teaser Trailer", platform: "YouTube", url: "https://youtu.be/W97r1qli5_k" },
        { label: "ATLUS 公告全文（系列销量与新作情报）", platform: "媒体", url: "https://www.chalgyr.com/2026/06/news-persona6-comingsoon.html" },
        { label: "Persona 系列官方网站", platform: "官方站", url: "https://p-ch.jp/" }
      ],
      hype: {
        score: 91,
        signals: [
          "Famitsu 读者期待榜 466 票（PS5 第 3 位）",
          "距《Persona 5》(2016) 已十年，全球粉丝蓄积已久",
          "系列 3000 万销量背书 + 平台全覆盖"
        ]
      },
      tags: ["高期待", "RPG", "全平台"]
    },

    {
      id: "persona-4-revival",
      company: "ATLUS（SEGA）",
      companyJp: "株式会社アトラス",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09-09（Switch 2 版日期）",
      capturedAt: "2026-09-15",
      title: { jp: "Persona 4 Revival", cn: "女神异闻录 4 Revival", en: "Persona 4 Revival" },
      genre: "RPG（完全重制）",
      platforms: ["Xbox Series X|S", "Xbox on PC", "PS5", "Steam", "Nintendo Switch 2（2027-05-20）"],
      release: "2027-02-18（Switch 2 版 2027-05-20）",
      releasePrecision: "日",
      summary: "2008 年《Persona 4》的完全重制版，保留原作的剧情与角色，对画面与游玩体验全面重建。2027 年 2 月 18 日全球同步发售；Nintendo Switch 2 版确认于同年 5 月 20 日推出。首日加入 Xbox Game Pass Ultimate 与 PC Game Pass。",
      highlight: "PS5 / Xbox / PC 与 Switch 2 之间存在约三个月的发售时间差，是本次少见的平台窗口安排。",
      console: {
        status: "Nintendo Switch 2 版 2027年5月20日発売予定／他機種 2027年2月18日。価格はいずれも未発表",
        os: ["Nintendo Switch 2", "PlayStation 5", "Xbox Series X|S", "PC (Steam / Microsoft Store)"],
        monetization: "未発表（小売リストでも TBA、価格は未公表）",
        developer: "アトラス",
        publisher: "アトラス（セガ）",
        region: "日本（多言語対応）",
        distribution: "パッケージ版・ダウンロード版",
        stores: ["Nintendo eShop", "PlayStation Store", "Microsoft Store", "Steam"],
        features: [
          "2008 年『ペルソナ 4』の完全リメイク。物語とキャラクターは原作を踏襲し、グラフィックと遊びを全面再構築",
          "Xbox Game Pass Ultimate / PC Game Pass に初日から対応",
          "Nintendo Switch 2 版は他機種から約 3 か月遅れの 2027-05-20 発売"
        ],
        synopsis: "2008 年に発売された『ペルソナ 4』の完全リメイク。原作の物語・キャラクターを保ちつつ、映像表現とプレイフィールを現行ハード向けに作り直す。",
        ipSource: "『ペルソナ』シリーズ（アトラス）",
        series: "『ペルソナ 3 Reload』に続くシリーズのリメイク路線"
      },
      news: [
        { source: "ATLUS 官方（发售日与版本情报）", url: "http://haveagood-holiday.com/en/articles/persona-4-revival-release-date-persona-6-announced" },
        { source: "IGN Brasil（Nintendo Direct 确认）", url: "https://br.ign.com/metroid-ravenous/155985/metroid-ravenous-kirby-and-the-world-beyond-e-mais-tudo-o-que-foi-anunciado-no-nintendo-direct-de-se" }
      ],
      videos: [
        { label: "PRE-ORDER TRAILER 官方预告", platform: "YouTube", url: "https://youtu.be/xIAdTyoUkIo" },
        { label: "官方发售日与各版本情报", platform: "媒体", url: "http://haveagood-holiday.com/en/articles/persona-4-revival-release-date-persona-6-announced" },
        { label: "Persona 4 Revival 官方网站", platform: "官方站", url: "https://p4re.jp/" }
      ],
      hype: {
        score: 86,
        signals: [
          "Famitsu 读者期待榜 440 票（PS5 第 4 位）",
          "经典重制 + 首个可玩 Demo 活动（日本抽选制）",
          "Switch 2 版滞后发售，可能延后任天堂侧热度顶点"
        ]
      },
      tags: ["定档", "重制", "RPG"]
    },

    {
      id: "metroid-ravenous",
      company: "Nintendo",
      companyJp: "任天堂株式会社",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09-09",
      capturedAt: "2026-09-15",
      title: { jp: "メトロイド レイヴェナス", cn: "银河战士 Ravenous", en: "Metroid Ravenous" },
      genre: "2D 横版动作冒险",
      platforms: ["Nintendo Switch 2"],
      release: "2027-01-28",
      releasePrecision: "日",
      summary: "《Metroid Dread》(2021) 的横版续作，为系列 40 周年作品。萨姆斯被神秘敌人袭击重伤，困于未知星球求生，主题是「吃或被吃」——预告中展示了萨姆斯吞噬敌人的新能力。同步公布 amiibo 阵容与同日发售的 Special Edition。",
      highlight: "回归 2D 硬核生存路线，被媒体解读为对 Dread 口碑的正面延续。",
      console: {
        status: "2027年1月28日発売予定（Nintendo eShop / Nintendo Store で予約受付中）",
        os: ["Nintendo Switch 2"],
        monetization: "ダウンロード版 7,980 円／パッケージ版 8,980 円／Special Edition 12,980 円（税込）。※小売リストには 8,990 円との記載もあり、パッケージ版は 8,980 円と 8,990 円の二口径が併存（どちらが正式かは未確認のため両記）",
        developer: "任天堂",
        publisher: "任天堂",
        region: "日本（多言語対応）",
        distribution: "パッケージ版・ダウンロード版。Special Edition は Switch 2 カードケース（SteelBook 仕様）と「サムス（メトロイドスーツ）」amiibo を同梱",
        stores: ["Nintendo eShop", "Nintendo Store", "全国のゲーム取扱店・オンラインストア"],
        preOrder: {
          open: true,
          since: "",
          reward: "Special Edition（12,980 円）に SteelBook 仕様カードケースと「サムス（メトロイドスーツ）」amiibo が同梱。「サムス」「鳥人像」の amiibo も発売日同日（2027-01-28）に発売"
        },
        features: [
          "2D 横スクロールのメトロイド完全新作。『メトロイド ドレッド』(2021) 以来 5 年ぶり",
          "敵の攻撃をジャストパリィすると「捕食」が発動し、生物エネルギーを奪って生存に回す「食うか、食われるか」の戦闘循環",
          "精鋭暗殺者集団「スペースニンジャ」との戦闘では、カメラが斜め後方の越肩視点へシームレスに切り替わる"
        ],
        synopsis: "サムス・アランは墜落した衛星で謎の武装集団に襲撃され、生態系の異変した地下深部に閉じ込められる。新たに覚醒した「エネルギー吸収」能力を使い、地下迷宮を踏破して生還を図る。",
        ipSource: "『メトロイド』シリーズ（任天堂）",
        series: "2D メトロイドシリーズの完全新作。シリーズ 40 周年の節目に発表"
      },
      news: [
        { source: "Mandatory（预告与发售日）", url: "https://www.mandatory.com/culture/1847443-nintendo-metroid-ravenous-kirby-world-beyond-announced" },
        { source: "GameMeca", url: "https://www.gamemeca.com/en/view.php?gid=1780300" }
      ],
      videos: [
        { label: "公布报道（含官方预告影像）", platform: "媒体", url: "https://www.mandatory.com/culture/1847443-nintendo-metroid-ravenous-kirby-world-beyond-announced" },
        { label: "Nintendo Direct 2026.9.9 汇总", platform: "媒体", url: "https://www.gamemeca.com/en/view.php?gid=1780300" }
      ],
      hype: {
        score: 78,
        signals: [
          "Dread 口碑延续 + 40 周年节点",
          "「吞噬」新机制在社媒衍生大量讨论",
          "Switch 2 独占，硬件装机量决定上限"
        ]
      },
      tags: ["定档", "动作", "Switch2独占"]
    },

    {
      id: "kirby-world-beyond",
      company: "Nintendo / HAL Laboratory",
      companyJp: "任天堂株式会社 / 株式会社ハル研究所",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09-09",
      capturedAt: "2026-09-15",
      title: { jp: "カービィ ワールドビヨンド", cn: "星之卡比 World Beyond", en: "Kirby and the World Beyond" },
      genre: "3D 开放区域平台动作",
      platforms: ["Nintendo Switch 2"],
      release: "2027年春",
      releasePrecision: "季",
      summary: "Nintendo Direct 9/9 压轴公布，为系列 35 周年作品。天空出现裂痕，卡比在帝帝帝大王的帮助下击穿天幕，坠入「World Beyond」。相较《探索发现》(2022) 的关卡制，本作相机可自由旋转、场景互联，呈开放区域结构；追加新伙伴角色，复制能力与 Super Ability 回归，并可与场景互动破坏（预告中出现大师之剑）。",
      highlight: "卡比系列首次真正意义上的开放区域探索，被安排在 Direct 压轴位。",
      console: {
        status: "2027年春 発売予定（価格・詳細は未発表／2026-09-09 の発表で告知）",
        os: ["Nintendo Switch 2"],
        monetization: "未発表（小売リストでは Price TBA と表記・小売リスト集計値）",
        developer: "ハル研究所",
        publisher: "任天堂",
        region: "日本／北米／欧州",
        distribution: "未発表",
        stores: ["Nintendo eShop（予定）"],
        features: [
          "2026-09-09 の発表で、2027 年春の発売が告知された『カービィ』シリーズ新作",
          "多言語対応が予定されている（EN / FR / IT / DE / ES / NL / PT / KO / ZH）",
          "価格・ダウンロード容量・パッケージ仕様などの詳細は公式に未発表"
        ],
        synopsis: "2027 年春に発売予定の『カービィ』シリーズ新作。2026-09-09 の発表ではタイトルと発売時期のみが公開され、ゲーム内容の詳細はまだ明らかにされていない。",
        ipSource: "『星のカービィ』シリーズ（任天堂／ハル研究所）",
        series: "開発はハル研究所。2027 年春の Nintendo Switch 2 向けラインナップとして告知された段階で、価格は未公表",
        cast: "未発表"
      },
      news: [
        { source: "Radio Times（公布细节）", url: "https://www.radiotimes.com/technology/gaming/kirby-a-world-beyond-revealed-nintendo-3d-platformer-release-window-confirmed-newsupdate" },
        { source: "GameTrader.SG（结构解析）", url: "https://www.gametrader.sg/blog/kirby-and-the-world-beyond-switch-2-spring-2027" }
      ],
      videos: [
        { label: "公布细节报道（含官方预告影像）", platform: "媒体", url: "https://www.radiotimes.com/technology/gaming/kirby-a-world-beyond-revealed-nintendo-3d-platformer-release-window-confirmed-newsupdate" },
        { label: "开放区域结构解析", platform: "媒体", url: "https://www.gametrader.sg/blog/kirby-and-the-world-beyond-switch-2-spring-2027" }
      ],
      hype: {
        score: 81,
        signals: [
          "Direct 压轴位 + 35 周年，官方信心信号明确",
          "「天空是壳」的叙事钩子在社媒传播度高",
          "发售窗口为 2027 春，热度需长期维持"
        ]
      },
      tags: ["发表", "平台动作", "Switch2独占", "周年作"]
    },

    {
      id: "fire-emblem-fortunes-weave",
      company: "Intelligent Systems / Nintendo",
      companyJp: "株式会社インテリジェントシステムズ / 任天堂株式会社",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09-17（発売当日）",
      capturedAt: "2026-09-17",
      title: { jp: "ファイアーエムブレム フォーチュンズウィーブ", cn: "火焰之纹章 Fortune's Weave", en: "Fire Emblem: Fortune's Weave" },
      genre: "策略 SRPG",
      platforms: ["Nintendo Switch 2"],
      release: "2026-09-17（発売済み・Switch 2 独占）",
      releasePrecision: "已发售",
      summary: "系列最新正统作。故事从四位主角在 Dagdan 帝国「英雄竞技会」角逐开始，五年后魔神 Balor 归来，玩家可借「Fortuna」之力回溯改变主角命运。战斗为网格战棋，间场在首都 Dagsion 探索、育成、招募，并有时间限制的支线地图。9 月 17 日已正式发售，同日推出 Ver.1.0.1 更新，推进主线后可在 Dagsion 城等地领取历代《火焰纹章》特殊武器，IGN 给出 10/10 评价。",
      highlight: "9/17 与 TGS 开幕同日发售，首日即推送 Ver.1.0.1 并发放历代武器；媒体端 IGN 10/10 落地。",
      console: {
        status: "2026年9月17日発売予定（予約受付中）",
        os: ["Nintendo Switch 2"],
        monetization: "9,980 円（税込・小売リスト集計値／パッケージ版）。ダウンロード版の単価は未確認",
        developer: "インテリジェントシステムズ",
        publisher: "任天堂",
        region: "日本（多言語対応：EN / FR / IT / DE / ES / KO / ZH）",
        distribution: "パッケージ版・ダウンロード版",
        stores: ["Nintendo eShop", "Nintendo Store", "全国のゲーム取扱店"],
        features: [
          "グリッド制のターン制 SRPG。首都ダグシオンで探索・育成・勧誘を行い、時間制限付きのサイドマップも用意",
          "「Fortuna」の力で主人公の命運を巻き戻し、選択をやり直せる",
          "4 人の主人公がダグダン帝国の「英雄競技会」で競うところから物語が始まり、5 年後に魔神バロールが再来する群像劇"
        ],
        synopsis: "シリーズ最新の正統ナンバリング。4 人の主人公が帝国の英雄競技会で鎬を削る序盤を経て、5 年後に帰還する魔神バロールとの戦いへ。プレイヤーは「Fortuna」の力で命運を書き換えながら進む。",
        ipSource: "『ファイアーエムブレム』シリーズ（任天堂）",
        series: "開発はインテリジェントシステムズ。発売日が TGS2026 開幕と同日で、オンラインとリアル双方で露出が重なる"
      },
      news: [
        { source: "Polygon（10 小时预览评价）", url: "https://www.polygon.com/new-rpgs-fall-2026" },
        { source: "Gurugamer", url: "https://gurugamer.com/pc-console/top-10-upcoming-jrpgs-to-release-in-2026-and-2027-27290" }
      ],
      videos: [
        { label: "10 小时先行预览评价（Polygon）", platform: "媒体", url: "https://www.polygon.com/new-rpgs-fall-2026" },
        { label: "JRPG 盘点（发售窗口与系统说明）", platform: "媒体", url: "https://gurugamer.com/pc-console/top-10-upcoming-jrpgs-to-release-in-2026-and-2027-27290" }
      ],
      hype: {
        score: 87,
        signals: [
          "Famitsu 读者期待榜 504 票（NS2 第 2 位）",
          "Polygon 预览正面评价拉升口碑预期",
          "9/17 发售，与 TGS 开幕同日，线下曝光叠加"
        ]
      },
      tags: ["定档", "SRPG", "Switch2独占"]
    },

    {
      id: "zelda-oot-remake",
      company: "Nintendo",
      companyJp: "任天堂株式会社",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09-08（Zelda 专场）",
      capturedAt: "2026-09-15",
      title: { jp: "ゼルダの伝説 時のオカリナ（リメイク）", cn: "塞尔达传说 时之笛（重制）", en: "The Legend of Zelda: Ocarina of Time Remake" },
      genre: "3D 动作冒险（重制）",
      platforms: ["Nintendo Switch 2"],
      release: "2026-11-05",
      releasePrecision: "日",
      summary: "在 9/8 的塞尔达系列 40 周年专场中公开，为 N64 原作《时之笛》的完全视觉重制版。公布当日即成为 X 等社交平台讨论度最高的环节之一。发售日期与预购详情尚未完全公开。",
      highlight: "40 周年节点上的招牌重制；视觉风格在社媒引发分歧讨论，正反声量均高。",
      console: {
        status: "2026年11月5日発売予定（2026-09-08「ゼルダの伝説40周年 Direct」で発売日発表、予約受付中）",
        os: ["Nintendo Switch 2（Switch 1 版は未発表）"],
        monetization: "7,980 円（税込・小売リスト集計値）。初回生産分のパッケージ版は特製パッケージ仕様",
        developer: "任天堂",
        publisher: "任天堂",
        region: "日本／北米／欧州 同日発売",
        distribution: "パッケージ版・ダウンロード版",
        stores: ["Nintendo eShop", "Nintendo Store", "全国のゲーム取扱店"],
        preOrder: { open: true, since: "2026-09-08", reward: "" },
        features: [
          "1998 年 NINTENDO64 版の完全リメイク。アセット・ライティング・テクスチャを一新し、カットシーンはフルボイス化",
          "右スティックによるカメラ操作、ボタンジャンプ、ダッシュ（前転回避からの長押し）を追加し、現行作に近い操作感へ",
          "オカリナは従来のボタン入力に加え、鼻歌・楽器の演奏に反応する音声入力にも対応",
          "スマホアプリ「ZELDA NOTES」と連携。進行を振り返る「Threads of Time」（時間の軌跡）機能を追加"
        ],
        synopsis: "コキリの森に住む少年リンクが、森の守り神デクの樹サマからハイラルを救う運命を告げられ、妖精ナビィとともにガノンドロフへ立ち向かう。原作の物語と構造を保ちつつ、操作と演出を現代仕様に再構築した完全リメイク。",
        ipSource: "『ゼルダの伝説』シリーズ（任天堂）",
        series: "シリーズ 40 周年記念作。原作はファミ通史上初の 40 点満点を獲得した作品"
      },
      news: [
        { source: "检索汇总（Nintendo Direct 2026 报道）", url: "https://nintendoeverything.com/" },
        { source: "Radio Times（Zelda 专场提及）", url: "https://www.radiotimes.com/technology/gaming/kirby-a-world-beyond-revealed-nintendo-3d-platformer-release-window-confirmed-newsupdate" }
      ],
      videos: [
        { label: "Zelda 40 周年专场报道（含重制影像）", platform: "媒体", url: "https://www.radiotimes.com/technology/gaming/kirby-a-world-beyond-revealed-nintendo-3d-platformer-release-window-confirmed-newsupdate" },
        { label: "Nintendo Direct 2026.9.9 汇总", platform: "媒体", url: "https://www.gamemeca.com/en/view.php?gid=1780300" }
      ],
      hype: {
        score: 84,
        signals: [
          "Famitsu 读者期待榜 424 票（NS2 第 5 位）",
          "40 周年 + 系列最高评价原作的组合",
          "视觉风格争议反而扩大了讨论面"
        ]
      },
      tags: ["重制", "周年作", "Switch2独占"]
    },

    {
      id: "mhw-switch2-ascendance",
      company: "Capcom",
      companyJp: "株式会社カプコン",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09-16（Capcom Spotlight TGS2026 でテオ・テスカトル公開）",
      capturedAt: "2026-09-17",
      title: { jp: "モンスターハンターワイルズ（Switch 2 版）/ 拡張「Ascendance」", cn: "怪物猎人 Wilds（Switch 2 版）/ 扩展包 Ascendance", en: "Monster Hunter Wilds (Switch 2) / Ascendance" },
      genre: "狩猎动作 RPG",
      platforms: ["Nintendo Switch 2", "PS5", "Xbox Series X|S", "PC"],
      release: "Switch 2 版 2026-12-04 / Ascendance 2027",
      releasePrecision: "日",
      summary: "Nintendo Direct 确认《Monster Hunter Wilds》于 2026 年 12 月 4 日登陆 Switch 2，含既有更新内容，支持本地无线与跨平台联机。大型扩展包「Ascendance」定于 2027 年推出，追加可借翔虫（Seikret）移动的垂直区域，并公布全新古龙「Gundoraga」。9/16 的 Capcom Spotlight 进一步公开炎王龙 Teostra 回归、新机制「Boost Bracer」，以及无需翔虫即可换武器、可在地图上的道具箱直接换装等本体同步实装的操作改善。Switch 2 版实体版已开放预约，数字版 10 月 19 日起开放。",
      highlight: "扩展包在 TGS 开幕前夜公开炎王龙回归与「Boost Bracer」，并把这批操作改善同步回本体；Switch 2 版本体 12/04 先行。",
      console: {
        status: "Switch 2 版 2026年12月4日発売予定／大型拡張「Ascendance」2027年配信予定",
        os: ["Nintendo Switch 2", "PlayStation 5", "Xbox Series X|S", "PC"],
        monetization: "Switch 2 版 4,990 円（税込・小売リスト集計値／Game Key Card 形式）",
        developer: "カプコン",
        publisher: "カプコン",
        region: "日本",
        distribution: "Game Key Card 方式のパッケージ版・ダウンロード版。Switch 2 本体同梱セットも 2026-12-04 に発売",
        stores: ["Nintendo eShop", "PlayStation Store", "Microsoft Store", "Steam"],
        features: [
          "Switch 2 版はこれまでのアップデート内容を収録した状態で発売",
          "ローカル通信プレイとクロスプラットフォーム マルチプレイに対応",
          "大型拡張「Ascendance」では翔虫（Seikret）を使った垂直移動エリアと、新たな古龍「Gundoraga」を追加"
        ],
        synopsis: "『モンスターハンターワイルズ』の Nintendo Switch 2 版。既存アップデートを収録し、携帯機でも本編を遊べる形で投入される。拡張パス「Ascendance」は 2027 年に配信予定。",
        ipSource: "『モンスターハンター』シリーズ（カプコン）",
        series: "本編の Switch 2 展開と拡張パスを同時に告知した形"
      },
      news: [
        { source: "Cleveland Free Times（Direct 汇总）", url: "https://www.freetimes.com/news/2026-09-11-nintendo-direct-9-9-2026-switch-2-line-up-gears-up-with-final-fantasy-monster-hunter-tomb-raider-and-more" },
        { source: "CQ-Esports（State of Play Japan）", url: "https://cq-esports.com/news/state-of-play-japan-september-2026-every-major-game-update" }
      ],
      videos: [
        { label: "State of Play Japan 汇总（Ascendance 与 Gundoraga 公布）", platform: "媒体", url: "https://cq-esports.com/news/state-of-play-japan-september-2026-every-major-game-update" },
        { label: "Nintendo Direct 汇总（Switch 2 版发售日）", platform: "媒体", url: "https://www.freetimes.com/news/2026-09-11-nintendo-direct-9-9-2026-switch-2-line-up-gears-up-with-final-fantasy-monster-hunter-tomb-raider-and-more" }
      ],
      hype: {
        score: 82,
        signals: [
          "既有 IP 用户基数极大，Switch 2 版解锁掌机需求",
          "Ascendance 新古龙 Gundoraga 成为社媒话题点",
          "Capcom 在 TGS 有专属直播环节（Monster Hunter Wilds: Ascendance）"
        ]
      },
      tags: ["定档", "狩猎动作", "扩展包"]
    },

    {
      id: "onimusha-way-of-the-sword",
      company: "Capcom",
      companyJp: "株式会社カプコン",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09",
      capturedAt: "2026-09-15",
      title: { jp: "鬼武者 Way of the Sword", cn: "鬼武者 Way of the Sword", en: "Onimusha: Way of the Sword" },
      genre: "剑戟动作",
      platforms: ["PS5", "Xbox Series X|S", "Nintendo Switch 2", "PC"],
      release: "2026-09-25（Switch 2 版）",
      releasePrecision: "日",
      summary: "系列久违的新作。日本媒体评价其「在保留原作暗黑氛围的同时，实现了深度的战斗系统」。Switch 2 版支持以 Joy-Con 2 体感操作挥剑，与其他平台形成操作差异。",
      highlight: "Famitsu 评分 34/40（9/9/8/8），是本期评分榜并列第二。",
      console: {
        status: "2026年9月25日発売（Switch 2 版を含む全プラットフォーム）",
        os: ["Nintendo Switch 2", "PlayStation 5", "Xbox Series X|S", "PC"],
        monetization: "8,990 円（税込・小売リスト集計値／Game Key Card 形式）",
        developer: "カプコン",
        publisher: "カプコン",
        region: "日本",
        distribution: "Game Key Card 方式のパッケージ版・ダウンロード版",
        stores: ["Nintendo eShop", "PlayStation Store", "Microsoft Store", "Steam"],
        features: [
          "シリーズ久々の完全新作。原作のダークな雰囲気を保ちつつ戦闘システムを深化させたと日本メディアが評価（ファミ通 34 点）",
          "Switch 2 版は Joy-Con 2 の体感操作で刀を振れる、他機種との操作差を用意",
          "剣戟アクション。間合いと斬撃の手応えを軸にした対人・対魔物戦闘"
        ],
        synopsis: "『鬼武者』シリーズの最新作。和風のダークファンタジー世界で、剣戟を主軸に据えたアクションとして再構築されている。",
        ipSource: "『鬼武者』シリーズ（カプコン）",
        series: "シリーズ長期休止を経ての新作"
      },
      news: [
        { source: "3DMGame（Famitsu 评分汇总）", url: "https://en.3dmgame.com/news/2702" },
        { source: "Legal United States（Direct 汇总）", url: "https://legalunitedstates.com/nintendo-direct-september-2026/" }
      ],
      videos: [
        { label: "Famitsu 评分汇总（34/40）", platform: "媒体", url: "https://en.3dmgame.com/news/2702" },
        { label: "Nintendo Direct 汇总（Switch 2 体感操作）", platform: "媒体", url: "https://legalunitedstates.com/nintendo-direct-september-2026/" }
      ],
      hype: {
        score: 74,
        signals: [
          "Famitsu 34/40，媒体口碑已落地",
          "9/25 发售，处年末前的密集档期",
          "体感操作提供差异化卖点"
        ]
      },
      tags: ["定档", "动作", "Famitsu34"]
    },

    {
      id: "blood-of-dawnwalker",
      company: "Bandai Namco Entertainment",
      companyJp: "株式会社バンダイナムコエンターテインメント",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09（发售）",
      capturedAt: "2026-09-15",
      title: { jp: "The Blood of Dawnwalker", cn: "黎明行者之血", en: "The Blood of Dawnwalker" },
      genre: "暗黑奇幻 RPG",
      platforms: ["PS5", "Xbox Series X|S", "PC"],
      release: "已发售",
      releasePrecision: "已发售",
      summary: "万代南梦宫发行的暗黑奇幻 RPG，已正式发售。日本媒体评价其氛围营造与叙事力度突出，定位为本季值得关注的 RPG 之一。Famitsu 评分 34/40（9/8/8/9），与《鬼武者》并列本期第二。",
      highlight: "作为发行商作品拿下 Famitsu 34 分，显示万代在西方工作室产品线上的选品眼光。",
      console: {
        status: "2026年9月3日発売（発売済み／コンシューマは現地 0 時、PC は 9月3日 7:00 JST 解禁）",
        os: ["PlayStation 5（PS5 Pro 対応）", "Xbox Series X|S", "PC（Steam / GOG / Microsoft Store）"],
        monetization: "Standard Edition 9,790 円、Eclipse Edition 10,890 円（日本価格）。北米ストア表記は Standard $69.99 / Eclipse $79.99 / Collector's Edition $199.99",
        developer: "Rebel Wolves",
        publisher: "バンダイナムコエンターテインメント",
        region: "日本／北米／欧州（UI・字幕 15 言語、フルボイス 6 言語。日本語は字幕のみ）",
        distribution: "パッケージ版・ダウンロード版",
        stores: ["PlayStation Store", "Microsoft Store", "Steam", "GOG", "全国のゲーム取扱店"],
        features: [
          "14 世紀ヨーロッパを舞台にしたオープンワールド・ダークファンタジー ARPG。UE5 製",
          "昼は人間、夜は吸血鬼という「DAWNWALKER」の二面性を軸に、昼夜で異なるアビリティと攻略手段を切り替える",
          "行動と不作為の双方が世界と物語を変える設計。依頼をこなすたびに時間が進み、家族の余命に近づく",
          "発売日に 60fps ターゲットの Performance Mode を追加（PS5 / PS5 Pro / Xbox Series X）。Xbox Series S は 30fps のみ",
          "プレイ人数 1 人（協力・マルチプレイモードは未発表）。CERO Z（18 歳以上対象）"
        ],
        synopsis: "14 世紀、疫病と戦乱に疲弊したヨーロッパ。弱った人間を見て吸血鬼が影から出て、何世紀もの間奪われてきた自由と力を手にする。主人公クーンは「DAWNWALKER」となり、人間性を守るか呪われた力を受け入れるかの狭間で家族を救う道を探る。",
        ipSource: "オリジナル",
        series: "『ウィッチャー3 ワイルドハント』の元開発者らが興したポーランドのスタジオ Rebel Wolves の処女作。バンダイナムコエンターテインメントが発売",
        cast: "未発表"
      },
      news: [
        { source: "3DMGame（Famitsu 评分）", url: "https://en.3dmgame.com/news/2702" },
        { source: "Polygon（发售评价背景）", url: "https://www.polygon.com/new-rpgs-fall-2026" }
      ],
      videos: [
        { label: "Famitsu 评分（34/40）", platform: "媒体", url: "https://en.3dmgame.com/news/2702" },
        { label: "秋季 RPG 盘点（发售评价背景）", platform: "媒体", url: "https://www.polygon.com/new-rpgs-fall-2026" }
      ],
      hype: {
        score: 71,
        signals: [
          "Famitsu 34/40",
          "已发售，热度转入口碑消耗期",
          "媒体评价稳但缺少破圈话题"
        ]
      },
      tags: ["已发售", "RPG", "Famitsu34"]
    },

    {
      id: "rev-noir",
      company: "KONAMI",
      companyJp: "コナミデジタルエンタテインメント",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09-03",
      capturedAt: "2026-09-15",
      title: { jp: "Rev. NOiR", cn: "Rev. NOiR", en: "Rev. NOiR" },
      genre: "幻想 RPG",
      platforms: ["PS5", "Xbox Series X|S", "PC (Steam)"],
      release: "2027年",
      releasePrecision: "年",
      summary: "以「天坠（lightfall）」灾难再度逼近的世界为舞台，主角 Asch、女主角 Finé 与同伴踏上拯救人类之旅。战斗动作与战略决策并重，导入「Astral Sigils」「Kardieoses」等可自建战斗风格的系统。本次追加公布 Xbox Series X|S 与 Steam 版，愿望单已开放。",
      highlight: "KONAMI 在同一档期同时推进三款全新 IP/新作，产品线扩张意图明显。",
      news: [
        { source: "KONAMI 官方 topics", url: "https://www.konami.com/games/eu/en/topics/19295/" },
        { source: "Eurogamer", url: "https://www.eurogamer.net/everything-announced-at-sonys-state-of-play-september-2026" }
      ],
      videos: [
        { label: "KONAMI 官方 topics（第二支预告公开）", platform: "官方", url: "https://www.konami.com/games/eu/en/topics/19295/" },
        { label: "Eurogamer 汇总（含预告影像）", platform: "媒体", url: "https://www.eurogamer.net/everything-announced-at-sonys-state-of-play-september-2026" }
      ],
      hype: {
        score: 66,
        signals: [
          "State of Play 与 PRESS START 双曝光",
          "平台由 PS5 扩至 Xbox / Steam，覆盖面提升",
          "2027 年窗口较远，热度待发酵"
        ]
      },
      tags: ["发表", "RPG"]
    },

    {
      id: "the-duskbloods",
      company: "FromSoftware",
      companyJp: "株式会社フロム・ソフトウェア",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09（网络测试）",
      capturedAt: "2026-09-15",
      title: { jp: "The Duskbloods", cn: "The Duskbloods", en: "The Duskbloods" },
      genre: "多人动作（PvPvE）",
      platforms: ["Nintendo Switch 2"],
      release: "2026年（待定档）",
      releasePrecision: "年",
      summary: "FromSoftware 面向 Switch 2 独占开发的全新多人游戏，最多 8 人同场，各角色拥有基于血液的独特能力。官方在 Direct 环节表示正筹备 2026 年夏季的封闭网络测试，具体发售日未定。",
      highlight: "FromSoftware 少见地做独占多人向作品，也是 Switch 2 阵容中含金量最高的第三方独占之一。",
      news: [
        { source: "sisinagoya（Nintendo Direct 汇总）", url: "https://sisinagoya.github.io/?live-news-11540141-2026-06-10-nintendo-direct-2026-from-new-xenoblade-game-to-zelda-ocarina-of-time-remake-eve" }
      ],
      videos: [
        { label: "Nintendo Direct 汇总（网络测试与玩法说明）", platform: "媒体", url: "https://sisinagoya.github.io/?live-news-11540141-2026-06-10-nintendo-direct-2026-from-new-xenoblade-game-to-zelda-ocarina-of-time-remake-eve" },
        { label: "Famitsu 期待榜（本作 92 票）", platform: "媒体", url: "https://nintendoeverything.com/famitsus-most-wanted-games-september-13-2026" }
      ],
      hype: {
        score: 77,
        signals: [
          "Famitsu 期待榜 NS2 版 92 票",
          "FromSoftware 品牌自带高关注度",
          "发售日未定，长期占据「最期待未知作」位置"
        ]
      },
      tags: ["发表", "多人", "Switch2独占"]
    },

    {
      id: "eternal-anima",
      company: "Marvelous",
      companyJp: "株式会社マーベラス",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09-09",
      capturedAt: "2026-09-15",
      title: { jp: "Eternal Anima", cn: "Eternal Anima", en: "Eternal Anima" },
      genre: "回合制 RPG（新 IP）",
      platforms: ["Switch 2", "PS5", "Xbox Series X|S", "PC"],
      release: "2027-03-04",
      releasePrecision: "日",
      summary: "Marvelous 原「Project Life is RPG」正式定名。制作阵容豪华：导演樋口勝久（FF II–V、Chrono Trigger、Xenogears）、剧本野島一成（FF VII、Kingdom Hearts）、原案牧野圭介（Persona 5、Metaphor）、音乐崎元仁。主角 Wade 可读取物体残留记忆，并以「Future Sight」预判敌人行动。",
      highlight: "日式 RPG 黄金世代创作者的再集合，是 2027 年最被业界看好的新 IP 之一。",
      console: {
        status: "2027年3月4日発売予定",
        os: ["Nintendo Switch 2", "PlayStation 5", "Xbox Series X|S", "PC"],
        monetization: "7,678 円（税込・小売リスト集計値／Switch 2 版は Game Key Card 形式）",
        developer: "マーベラス",
        publisher: "マーベラス",
        region: "日本（EN / FR / DE / ES / KO / ZH 対応）",
        distribution: "パッケージ版（Game Key Card）・ダウンロード版",
        stores: ["Nintendo eShop", "PlayStation Store", "Microsoft Store", "Steam"],
        features: [
          "コマンド式ターン制 RPG。主人公ウェイドは物体に残された記憶を読み取る能力を持つ",
          "「Future Sight」で敵の行動を先読みし、先手を取る戦術が軸",
          "スタッフ：監督 樋口勝久／脚本 野島一成／原案 牧野圭介／音楽 崎元仁"
        ],
        synopsis: "マーベラスが旧称「Project Life is RPG」として進めていた完全新作が正式にタイトルを公開。記憶を読む主人公を中心に据えたターン制 RPG。",
        ipSource: "新規 IP（マーベラス）",
        series: "マーベラスの完全新作。旧称「Project Life is RPG」"
      },
      news: [
        { source: "Gurugamer（JRPG 盘点）", url: "https://gurugamer.com/pc-console/top-10-upcoming-jrpgs-to-release-in-2026-and-2027-27290" },
        { source: "GameMeca", url: "https://www.gamemeca.com/en/view.php?gid=1780300" }
      ],
      videos: [
        { label: "JRPG 盘点（创作阵容与系统说明）", platform: "媒体", url: "https://gurugamer.com/pc-console/top-10-upcoming-jrpgs-to-release-in-2026-and-2027-27290" },
        { label: "Nintendo Direct 2026.9.9 汇总", platform: "媒体", url: "https://www.gamemeca.com/en/view.php?gid=1780300" }
      ],
      hype: {
        score: 68,
        signals: [
          "创作者阵容在核心 RPG 圈层引发高讨论",
          "新 IP 缺乏既有用户基础，需靠 PV 与试玩破圈",
          "2027-03-04 定档，窗口清晰"
        ]
      },
      tags: ["定档", "新IP", "RPG"]
    },

    {
      id: "trails-2nd-chapter",
      company: "Nihon Falcom",
      companyJp: "日本ファルコム株式会社",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09-17（発売当日）",
      capturedAt: "2026-09-17",
      title: { jp: "英雄伝説 空の軌跡 the 2nd", cn: "英雄传说 空之轨迹 the 2nd", en: "The Legend of Heroes: Trails in the Sky 2nd Chapter" },
      genre: "剧情向回合制 RPG",
      platforms: ["PS5", "Nintendo Switch", "Nintendo Switch 2", "PC"],
      release: "2026-09-17（発売済み。PS5 / Switch / Switch 2 / PC）",
      releasePrecision: "已发售",
      summary: "2006 年《空之轨迹 SC》的现代化重制，接续去年 1st Chapter 的剧情，讲述艾丝蒂尔穿越王国寻找失踪的约修亚。保留厚重叙事与回合制战斗，新增钓鱼、扑克等小游戏作为节奏调剂。9 月 17 日已在 PS5 / Nintendo Switch / Switch 2 / PC 发售。",
      highlight: "轨迹系列十五年以上长线叙事的老用户盘极其稳固，属「确定性销量」型作品。",
      console: {
        status: "2026年9月17日発売予定（予約受付中／TGS2026 開幕と同日）",
        os: ["Nintendo Switch 2", "Nintendo Switch", "PlayStation 5", "Steam"],
        monetization: "パッケージ版・ダウンロード版 通常版 8,800 円（税込）、Nintendo Switch 2 Edition 8,950 円（税込）、ウロボロスBOX 13,860 円（税込）、デジタルデラックス版 12,650 円（税込）、Nintendo Switch 2 Edition アップグレードパス 150 円（税込）、シーズンパス 4,180 円（税込）（日本ファルコム公式）",
        developer: "日本ファルコム",
        publisher: "日本ファルコム（日本）／ クラウディッドレパードエンタテインメント（アジア）",
        region: "日本／アジア（字幕：日本語・簡体中文・繁体中文・韓国語、音声：日本語）",
        distribution: "パッケージ版・ダウンロード版",
        stores: ["Nintendo eShop", "PlayStation Store", "Steam", "全国のゲーム取扱店"],
        preOrder: {
          open: true,
          since: "2026-05-06（予約開始）",
          reward: "『英雄伝説 空の軌跡FC』ダウンロードコード（HD リマスター＋高速モード／ログ機能、Steam 版は対象外）"
        },
        features: [
          "『空の軌跡』完全フルリメイク企画の第 2 弾。全 3D 化したキャラクターと場景、キャラの個性を出す追加アクション",
          "迅捷戦闘と指令戦闘をシームレスに切り替えるバトルシステム",
          "前作『空の軌跡 the 1st』のクリアデータ連動で、エステルとヨシュアの衣装を原作『空の軌跡SC』デザインに変更できる",
          "パッケージ版の Nintendo Switch 2 Edition は Switch 本体でもプレイ可能（その場合は Switch 基準の解像度・フレームレート）",
          "発売記念抽選会を全国 7 ヶ所の店頭と WEB で開催。出演声優のサイン色紙や非売品アクリルスタンドなど、当選総計 4,000 名超"
        ],
        synopsis: "リベール王国の政変の裏で暗躍した結社《身喰らう蛇》。ヨシュアはハーモニカを残してエステルの前から消える。正遊撃士となったエステル・ブライトは、結社の陰謀を止めヨシュアを取り戻すため新たな旅に出る。",
        ipSource: "『英雄伝説 空の軌跡SC』（日本ファルコム）の完全リメイク",
        series: "『軌跡』シリーズの起点作品をリメイクする連続企画の第 2 弾。前作『空の軌跡 the 1st』からの続きとして展開",
        cast: "未発表"
      },
      news: [
        { source: "Polygon（RPG 盘点）", url: "https://www.polygon.com/new-rpgs-fall-2026" },
        { source: "Gurugamer", url: "https://gurugamer.com/pc-console/top-10-upcoming-jrpgs-to-release-in-2026-and-2027-27290" }
      ],
      videos: [
        { label: "秋季 RPG 盘点（Polygon）", platform: "媒体", url: "https://www.polygon.com/new-rpgs-fall-2026" },
        { label: "JRPG 盘点（发售窗口与系统说明）", platform: "媒体", url: "https://gurugamer.com/pc-console/top-10-upcoming-jrpgs-to-release-in-2026-and-2027-27290" }
      ],
      hype: {
        score: 70,
        signals: [
          "Famitsu 期待榜 PS5 版 180 票 / NS2 版 72 票",
          "核心粉丝型作品，预期销量稳定",
          "9/17 发售，与 TGS 同期"
        ]
      },
      tags: ["定档", "RPG", "重制"]
    },

    {
      id: "professor-layton-new-world-of-steam",
      company: "LEVEL-5",
      companyJp: "株式会社レベルファイブ",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09-10",
      capturedAt: "2026-09-15",
      title: { jp: "レイトン教授と蒸気の新世界", cn: "雷顿教授与蒸汽新世界", en: "Professor Layton and the New World of Steam" },
      genre: "解谜冒险",
      platforms: ["Nintendo Switch", "Nintendo Switch 2", "PlayStation 5", "PC (Steam)"],
      release: "2026-12-10",
      releasePrecision: "日",
      summary: "LEVEL-5 招牌解谜系列回归作。舞台为靠蒸汽文明急速成长的虚构美国城市 Steam Bison，雷顿教授与助手路克联手破解城中离奇谜团。系列标志性的情感化美术与解谜节奏回归。「LEVEL5 VISION 2026 II 夢」补充了新预告与主题曲制作花絮：主题曲《The New World》由久石让作曲、Lilas 演唱，谜题设计交由专营媒体谜题与解谜题的 QuizKnock 负责，除 Switch 外的版本支持鼠标操作。TGS2026 提供可试玩 Demo（支持英文），雷顿与路克分别由大泉洋、今田美桜配音。",
      highlight: "长期延宕后终于定档 12/10，并确认追加 PS5 与 Steam 版；主题曲由久石让作曲，谜题交由 QuizKnock 负责。",
      console: {
        status: "2026-12-10 発売予定",
        os: ["Nintendo Switch", "Nintendo Switch 2", "PlayStation 5", "PC (Steam)"],
        monetization: "未発表（公式発表に価格の記載はなし。繁体字メディアが 7,920 円と報道）",
        developer: "レベルファイブ",
        publisher: "レベルファイブ",
        region: "日本（8 言語に対応予定）",
        distribution: "パッケージ＋ダウンロード（実体版は各販路で予約受付中）",
        stores: ["Nintendo eShop", "PlayStation Store", "Steam"],
        features: [
          "シリーズ本編としては 13 年ぶりの新作。時系列は『レイトン教授と最後の時間旅行』の 1 年後",
          "舞台は万能蒸気機関によってロンドンを超える発展を遂げたアメリカの都市「スチームバイソン」",
          "主題歌『The New WORLD』は久石譲が作曲、幾田りらが作詞と歌唱を担当",
          "謎解きの設計は QuizKnock が担当し、収録パズル数はシリーズ史上最多になる予定",
          "Switch 以外のバージョンはマウス操作に対応",
          "TGS2026 では英語対応の試遊デモを出展、来場者にオリジナルマウスパッドを配布"
        ],
        synopsis: "ルークからの手紙を受け取ったレイトン教授が、急速に発展するアメリカの都市スチームバイソンを訪れ、そこで起きる怪事件の謎に挑む。",
        cast: "レイトン教授：大泉洋 ／ ルーク：今田美桜 ／ エリノラ・アリンストン：吉岡里帆 ／ エッグマフィン・ソンダー：高杉真宙 ／ ボルト・アリンストン：小手伸也 ／ ほか山寺宏一、大塚明夫",
        ipSource: "『レイトン教授』シリーズ（累計 2,000 万本超）",
        series: "本編は 2013 年『アズラン遺産』以来 13 年ぶり。シリーズ史上最も広いマルチプラットフォーム展開"
      },

      news: [
        { source: "GameMeca（Nintendo Direct 汇总）", url: "https://www.gamemeca.com/en/view.php?gid=1780300" },
        { source: "Legal United States", url: "https://legalunitedstates.com/nintendo-direct-september-2026/" },
        { source: "Anime News Network（Vision 2026 II 新预告・主题曲・配音阵容）", url: "https://www.animenewsnetwork.com/news/2026-09-10/professor-layton-and-the-curious-village-game-gets-remake/.241627" }
      ],
      videos: [
        { label: "Nintendo Direct 汇总（含游戏画面）", platform: "媒体", url: "https://www.gamemeca.com/en/view.php?gid=1780300" },
        { label: "Nintendo Direct 汇总（发售日确认）", platform: "媒体", url: "https://legalunitedstates.com/nintendo-direct-september-2026/" },
        { label: "官方站（レイトン教授と蒸気の新世界）", platform: "官方站", url: "https://www.layton.jp/jouki/" }
      ],
      hype: {
        score: 67,
        signals: [
          "Famitsu 期待榜 NS2 版 133 票 / NSW 版 64 票",
          "12/10 定档，年末商战窗口",
          "解谜品类受众稳定但增长有限",
          "Vision 2026 II 补上主题曲（久石让）与 TGS 试玩，9/10 追加 PS5 / Steam 版信息"
        ]
      },
      tags: ["定档", "解谜", "IP回归"]
    },

    {
      id: "xenoblade-genesis",
      company: "Nintendo / Monolith Soft",
      companyJp: "任天堂株式会社 / 株式会社モノリスソフト",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09-09",
      capturedAt: "2026-09-15",
      title: { jp: "ゼノブレイド ジェネシス", cn: "异度神剑 Genesis", en: "Xenoblade Genesis" },
      genre: "开放世界 RPG",
      platforms: ["Nintendo Switch 2"],
      release: "2027年",
      releasePrecision: "年",
      summary: "系列完全新作，为 Switch 2 开发。同系列《Xenoblade Chronicles Definitive Edition》亦获 Switch 2 升级（TV 模式 4K/60fps、掌机 1080p/60fps），追加高速移动载具、竞速模式与新语音；2 代与 3 代的 Switch 2 版亦已确认于年内推出。",
      highlight: "系列一次性铺开「新作 + 三代升级」的组合拳，是 Direct 中单 IP 覆盖最广的一段。",
      news: [
        { source: "sisinagoya（Direct 汇总）", url: "https://sisinagoya.github.io/?live-news-11540141-2026-06-10-nintendo-direct-2026-from-new-xenoblade-game-to-zelda-ocarina-of-time-remake-eve" },
        { source: "Cleveland Free Times", url: "https://www.freetimes.com/news/2026-09-11-nintendo-direct-9-9-2026-switch-2-line-up-gears-up-with-final-fantasy-monster-hunter-tomb-raider-and-more" }
      ],
      videos: [
        { label: "Nintendo Direct 汇总（新作与三作升级）", platform: "媒体", url: "https://sisinagoya.github.io/?live-news-11540141-2026-06-10-nintendo-direct-2026-from-new-xenoblade-game-to-zelda-ocarina-of-time-remake-eve" },
        { label: "Nintendo Direct 汇总（Cleveland Free Times）", platform: "媒体", url: "https://www.freetimes.com/news/2026-09-11-nintendo-direct-9-9-2026-switch-2-line-up-gears-up-with-final-fantasy-monster-hunter-tomb-raider-and-more" }
      ],
      hype: {
        score: 76,
        signals: [
          "Famitsu 期待榜 NS2 版 235 票（第 7 位）",
          "核心 RPG 玩家群体声量高",
          "发售窗口仅标注 2027，信息量偏少"
        ]
      },
      tags: ["发表", "RPG", "Switch2独占"]
    },

    {
      id: "patlabor-the-case-files",
      company: "Good Smile Company",
      companyJp: "株式会社グッドスマイルカンパニー",
      bucket: "update",
      platformClass: "console",
      announceDate: "2026-09-15（PS5版アーリーアクセス開始／PC版は 09-17 発売）",
      capturedAt: "2026-09-16",
      title: { jp: "機動警察パトレイバー the Case Files", cn: "机动警察 PATLABOR the Case Files", en: "PATLABOR the Case Files" },
      genre: "3D 动作",
      platforms: ["PS5", "PC (Steam / Epic)"],
      release: "2026-09-17",
      releasePrecision: "日",
      summary: "系列约 26 年来首款全新独立主机游戏。由 Chime 开发，出渕裕监修机械设计、伊藤和典监修剧本、高田明美监修角色原画。玩家可驾驶 Ingram、Griffon、零式等 20 余台 Labor，并可从特车二课与敌方双方视角体验剧情。含模拟器模式与 Labor 对战。",
      highlight: "实体 PS5 特装版附赠「白 Griffon」塑料模型，周边公司做游戏的资源协同体现明显。",
      console: {
        status: "PS5 版は 2026-09-15 よりアーリーアクセス開始、PC 版は 2026-09-17 発売。店頭予約受付中",
        os: ["PlayStation 5", "PC（Steam / Epic Games Store）"],
        monetization: "PS5 ダウンロード版 通常版 4,400 円（税込）／ デジタルデラックスエディション 5,500 円（税込）。国内パッケージ版（PS5 通常版）は 6,380 円（税込）。PS Plus 会員は発売前まで 10% OFF の 3,960 円",
        developer: "Chime",
        publisher: "グッドスマイルカンパニー",
        region: "日本／海外（字幕：日本語・英語・簡体中文・繁体中文・韓国語）",
        distribution: "パッケージ版・ダウンロード版",
        stores: ["PlayStation Store", "Steam", "Epic Games Store", "全国のゲーム取扱店"],
        preOrder: {
          open: true,
          since: "2026-08-10（発売日発表・予約開始）",
          reward: "デジタルデラックスエディションは 72 時間のアーリーアクセス（9月14日から）。限定カラーの「ホワイトグリフォン」を収録"
        },
        features: [
          "特車二課の視点で原作の名場面を追体験する「メインミッション」と、対立側を操作する「アナザーサイドミッション」の二視点構成",
          "アナザーサイドでは『機動警察パトレイバー the Movie』の零式、『2 the Movie』のヘルハウンドを操作する",
          "射撃訓練と Labor 対 Labor の 1 対 1 を収録した「シミュレーターモード」",
          "イングラム AV-98、タイプ J9 グリフォン、AV-X0 零式など 20 台以上の Labor が操作可能。UE5 製",
          "メインストーリーは全編フルボイス。オンラインマルチプレイは非対応（対戦はすべて CPU 戦）"
        ],
        synopsis: "産業用ロボット「レイバー」が建設・土木で広く普及する一方、レイバー絡みの犯罪が急増する。警視庁は特車二課 パトロールレイバー中隊――通称「パトレイバー」を新設し、レイバー犯罪に対処する。",
        ipSource: "『機動警察パトレイバー』（ヘッドギア／ゆうきまさみ）",
        series: "出渕裕（メカニック監修）、伊藤和典（脚本監修）、高田明美（キャラクター作画監修）が参加し、主題歌「the Case Files」は川井憲次が書き下ろし。家庭用機では約 20 年ぶりのシリーズ単独ゲーム化。開発は『メイドインアビス 烈日の黄金郷』の Chime",
        cast: "泉野明（CV：冨永みーな）、篠原遊馬（CV：古川登志夫）ほか（Web CM のナレーションより）"
      },
      news: [
        { source: "AppBank（PS5 版アーリーアクセス開始・TGS2026 試遊情報）", url: "https://www.appbank.net/2026/09/15/game/3104513.php" },
        { source: "Quest Board.JP（发售详情）", url: "https://quest-board.jp/en/quests/the-case-files" }
      ],
      videos: [
        { label: "TGS2026 試遊情報（ハピネットブース・特製ステッカー配布）", platform: "媒体", url: "https://www.appbank.net/2026/09/15/game/3104513.php" },
        { label: "发售详情（含第 2 弹 Web CM 情报）", platform: "媒体", url: "https://quest-board.jp/en/quests/the-case-files" },
        { label: "官方 X @patlabor0810", platform: "X", url: "https://x.com/patlabor0810" }
      ],
      hype: {
        score: 63,
        signals: [
          "26 年空白带来的情怀价值",
          "多语言（含简繁中文）+ 国际发售，覆盖面广",
          "PS5 版 9/15 起先行进入，PC 版 9/17 发售，与 TGS 开幕同日",
          "TGS2026 ハピネットブースで試遊可能（体験者に特製ステッカー）"
        ]
      },
      tags: ["定档", "动作", "IP改编"]
    },
    {
      id: "onepiece-marine-gourmet",
      company: "Bandai Namco Entertainment",
      companyJp: "株式会社バンダイナムコエンターテインメント（開発：カイロソフト）",
      bucket: "new",
      platformClass: "multi",
      announceDate: "2026-06-09",
      capturedAt: "2026-09-15",
      title: { jp: "ONE PIECE 海のごちそうレストラン", cn: "海贼王 海洋盛宴", en: "ONE PIECE: Grand Gourmet" },
      genre: "海上レストラン経営シミュレーション",
      platforms: ["Nintendo Switch 2", "Nintendo Switch", "PC (Steam)", "iOS", "Android"],
      release: "2026-10-22（主机版）／2026-10-23（Steam・手机版）",
      releasePrecision: "日",
      summary: "万代南梦宫发行、开罗游戏（カイロソフト）开发的《ONE PIECE》题材像素风经营模拟，于 Nintendo Direct 首发公开。玩家作为海上餐厅「巴拉蒂 2 号店」的新人店员，与草帽一伙共同把餐厅做成「这片海上最美味的地方」。与山治一起用冒险中获得的食材开发菜谱，可把主菜／副菜／甜点／饮料自由组合成套餐并获得额外加成，也会出现运用恶魔果实能力的特殊料理。收录 400 名以上系列角色、200 种以上家具与内饰。主机版 2,700 日元、手机版 2,000 日元，支持含简繁中文在内的 12 种语言。TGS2026 设置餐厅主题展台并提供 20 分钟试玩。",
      highlight: "IP 授权经营模拟：把「吃饭」这条原作主线做成核心玩法，而不是又一款战斗手游。",
      console: {
        status: "2026年10月22日発売予定（Switch 2 / Switch）／ Steam は 2026年10月23日。予約受付中",
        os: ["Nintendo Switch 2", "Nintendo Switch", "PC（Steam）"],
        monetization: "3,960 円（税込・ゲームキーカード／小売リスト集計値）。モバイル版は買い切り 2,000 円で、コンシューマ版とは価格帯が異なる",
        developer: "カイロソフト",
        publisher: "バンダイナムコエンターテインメント",
        region: "日本／アジア（日本語・英語・簡体中文・繁体中文ほか計 12 言語）",
        distribution: "パッケージ版（ゲームキーカード）・ダウンロード版",
        stores: ["Nintendo eShop", "Steam", "全国のゲーム取扱店"],
        features: [
          "海上レストラン「バラティエ 2 号店」を舞台にした経営シミュレーション。シリーズ初の本格経営シミュレーション",
          "サンジと一緒に料理を開発し、主菜／副菜／デザート／ドリンクを組み合わせてセットメニューを作る",
          "悪魔の実の能力を活かした特別料理が登場",
          "200 種類以上の家具・建築物・インテリアを自由配置。常連客イベントも用意",
          "総勢 400 以上のキャラクターが来店（四皇・海軍・革命軍なども含む）",
          "コンシューマ版は 10月22日、Steam・モバイル版は 10月23日と 1 日差で展開"
        ],
        synopsis: "『ONE PIECE』の世界で海上レストランを経営するシミュレーション。物語の起点である「バラティエ」の 2 号店を舞台に、麦わらの一味と協力して「この海で一番のレストラン」を目指す。冒険で新素材を入手するとレシピが拡張し、招待したキャラクターが内装を気に入れば常連客になる。",
        ipSource: "『ONE PIECE』（尾田栄一郎／集英社）",
        series: "『ONE PIECE』家庭用ゲームシリーズ最新作で、カイロソフトとの初コラボ。コンシューマ版とモバイル版を同時展開する",
        cast: "未発表（原作アニメに準拠）"
      },
      news: [
        { source: "ONE PIECE.com 官方（发售日决定・特典・预告公开）", url: "https://one-piece.com/news/80028/index.html" },
        { source: "Third News（TGS2026 试玩与预约活动）", url: "https://third-news.com/article/9089a9b6-90b1-11f1-b03b-9ca3ba08e13f" },
        { source: "開羅遊戲 官方作品页", url: "https://kairosoft.net/game/appli/op_restaurant.html" }
      ],
      videos: [
        { label: "官方特设站（アナウンスメントトレーラー・预约入口）", platform: "官方站", url: "https://op-restaurant.bn-ent.net" },
        { label: "ONE PIECE.com 官方报道（内嵌预告影像）", platform: "官方", url: "https://one-piece.com/news/80028/index.html" },
        { label: "開羅遊戲 官方作品页（玩法截图与平台信息）", platform: "官方站", url: "https://kairosoft.net/game/appli/op_restaurant.html" }
      ],
      hype: {
        score: 76,
        signals: [
          "《ONE PIECE》与开罗游戏首次合作，经 Nintendo Direct 首发公开",
          "收录 400 名以上角色、200 种以上家具，素材量为系列授权经营作之最",
          "TGS2026 设餐厅主题展台并提供 20 分钟试玩，预约赠「満足ランチトート」"
        ]
      },
      tags: ["IP授权", "手游", "经营模拟", "跨平台", "TGS2026"],
      mobile: {
        status: "2026-10-23 配信予定（主机版は 10-22 先行）",
        os: ["iOS", "Android"],
        monetization: "買い切り（モバイル版 2,000 円。追加課金の記載なし）",
        preReg: {
          open: false,
          since: "",
          reward: "事前登録ではなく予約受付を実施。パッケージ版数量限定特典としてキャラクター 100 体オリジナルシール、超特装版にルフィのぬいぐるみ等を同梱"
        },
        developer: "カイロソフト（株式会社カイロソフト）",
        publisher: "バンダイナムコエンターテインメント",
        region: "日本（日本語・英語・簡体字・繁体字ほか計 12 言語に対応）",
        distribution: "App Store / Google Play／Nintendo Switch 2／Nintendo Switch／Steam",
        ipSource: "『ONE PIECE』（尾田栄一郎／集英社）",
        series: "『ONE PIECE』家庭用ゲームシリーズ最新作。カイロソフトとの初コラボ",
        features: [
          "海上レストラン「バラティエ 2 号店」の経営シミュレーション",
          "サンジと一緒に料理を開発、主菜／副菜／デザート／ドリンクを組み合わせてセットメニュー化",
          "悪魔の実の能力を活かした特別料理が登場",
          "200 種類以上の家具・建築物・インテリアを自由配置、常連客イベントあり",
          "総勢 400 以上のキャラクターが来店（四皇・海軍・革命軍なども含む）",
          "ホールケーキアイランド風・エッグヘッド風など、作中の島モチーフの家具を収録"
        ],
        synopsis: "『ONE PIECE』の世界で海上レストランを経営する経営シミュレーション。物語の起点である海上レストラン「バラティエ」の 2 号店を舞台に、麦わらの一味と協力して「この海で一番のレストラン」を目指す。冒険で新素材を入手するとレシピが拡張し、招待したキャラクターが内装を気に入れば常連客になってくれる。原作でも重要だった「食」に焦点を当てた、シリーズ初の本格経営シミュレーション。",
        cast: "未発表（原作アニメに準拠）"
      }
    },

    {
      id: "haikyu-all-challengers",
      company: "TOHO Games",
      companyJp: "TOHO Games（東宝株式会社／開発・運営：G2 Studios）",
      bucket: "new",
      platformClass: "mobile",
      announceDate: "2026-03-23",
      capturedAt: "2026-09-15",
      title: { jp: "ハイキュー!! ALL Challengers", cn: "排球少年!! ALL Challengers", en: "Haikyu!! ALL Challengers" },
      genre: "育成シミュレーション",
      platforms: ["iOS", "Android"],
      release: "未定",
      releasePrecision: "未定",
      summary: "东宝旗下游戏品牌 TOHO Games 企划・制作・发行，G2 Studios 开发运营的《排球少年!!》首款正统养成手游。主打「只属于自己的、以顶点为目标的故事」——球员的培养方针完全交由玩家决定：观察每位球员的数值属性、判断成长方向、安排训练菜单，再用亲手培养的选手编组出理想球队参赛。收录全新绘制的 2D 动态立绘与插画，并由动画原班声优录制专属新语音。采用竖屏单手操作。2026-03-23 发表并同步开启事前登录（官方 SNS 或 TOHO-ONE 平台，通过 TOHO-ONE 注册可获追加特典）。",
      highlight: "选择「养成模拟」而非动作玩法，是《排球少年!!》手游系列第一次把教练视角做成核心循环。",
      news: [
        { source: "QooApp 新闻（发表内容与事前登录方式）", url: "https://news.qoo-app.com/post/432673" },
        { source: "Ludens Media（官方链接与宣传影片汇总）", url: "https://www.ludens.com.tw/haikyu-all-challengers-pre-registration-start-2026" },
        { source: "GameHaunt（事前登录奖励与玩法定位分析）", url: "https://gamehaunt.com/haikyu-all-challengers-revealed-for-mobile-game-pre-registration-launches-in-japan" },
        { source: "gamebiz（发表报道）", url: "https://gamebiz.jp/news/423012" }
      ],
      videos: [
        { label: "官方站", platform: "官方站", url: "https://haikyu-allchallengers.jp/" },
        { label: "官方宣传影片（PV）", platform: "YouTube", url: "https://www.youtube.com/watch?v=p1yZgQSHRkE" },
        { label: "TOHO-ONE 事前登录活动页（追加特典说明）", platform: "官方活动页", url: "https://www.toho-one.com/campaigns/2026/PR07001" }
      ],
      hype: {
        score: 74,
        signals: [
          "《排球少年!!》首款正统养成手游，原作漫画累计发行 7,500 万部以上",
          "2024 年剧场版《垃圾场的决战》全球票房 200 亿日元，IP 热度处于高位",
          "动画原班声优录制专属新语音，并采用全新绘制的 2D 动态演出"
        ]
      },
      tags: ["IP授权", "手游", "养成模拟", "事前登录中", "东宝"],
      mobile: {
        status: "事前登録受付中（配信日未定）",
        os: ["iOS", "Android"],
        monetization: "基本無料（アイテム課金あり／ガチャ要素あり）",
        preReg: {
          open: true,
          since: "2026-03-23",
          reward: "事前登録人数に応じてゲーム内アイテムを配布。公式 SNS フォローまたは TOHO-ONE での登録が対象で、TOHO-ONE 経由は一般報酬に加えて追加特典あり。ガチャチケット配布に加え、Amazon ギフトコード等の抽選企画も実施"
        },
        developer: "G2 Studios",
        publisher: "TOHO Games（東宝株式会社）",
        region: "日本（海外配信は未発表）",
        distribution: "App Store / Google Play",
        ipSource: "『ハイキュー!!』（古舘春一／集英社）",
        series: "アニメ『ハイキュー!!』初の正統育成ゲーム。過去作に『ハイキュー!! Touch the Dream』『ハイキュー!! Fly High』",
        features: [
          "選手の育成方針をプレイヤーが完全に主導、練習メニューを組んで能力値を伸ばす",
          "育成した選手で自分だけのチームを編成し、大会で「頂点」を目指す",
          "新規描き下ろしの 2D アニメーション・イラストを収録",
          "アニメ本編キャストによる新規録り下ろしボイス",
          "縦画面・片手操作に最適化された UI",
          "TOHO-ONE 経由の事前登録で追加特典"
        ],
        synopsis: "アニメ『ハイキュー!!』を題材に、プレイヤーが監督となって選手を育てる育成シミュレーション。日々の練習でどの能力を伸ばすか、いつ休ませるかといった判断を積み重ね、自分だけの理想のチームを作り上げていく。試合に勝ち続け、バレー界の「頂点」を目指すのが目標。過去作のようなアクション操作ではなく、戦略と育成に重心を置いた設計が特徴。",
        cast: "日向翔陽・影山飛雄ほか、アニメ本編の主要キャストが新規収録"
      }
    },

    {
      id: "bleach-mirrors-high",
      company: "Bandai Namco Entertainment",
      companyJp: "株式会社バンダイナムコエンターテインメント",
      bucket: "new",
      platformClass: "mobile",
      announceDate: "2026-08-27",
      capturedAt: "2026-09-15",
      title: { jp: "BLEACH Mirrors High", cn: "BLEACH Mirrors High", en: "BLEACH Mirrors High" },
      genre: "カードベース アクション RPG（3v3）",
      platforms: ["iOS", "Android"],
      release: "2026年内（App Store 表記は 2026-11-28）",
      releasePrecision: "年",
      summary: "万代南梦宫发行的《BLEACH》改编卡片动作 RPG。故事设定在「千年血战篇」之后，玩家以护廷十三队一员、自定义新人死神的身份展开冒险；原作久保带人参与企划概念与角色设计，并设计了 Shirin Migishima、Shirane Sanari（双主角）以及 Naru Jurinna、Giro Hando、Maiko Tokishima 等原创角色。系统上提供「Avatar Customization」自定义外貌与「Customize Zanpakuto」自定义斩魄刀（刀镡・刀身・刀鞘），战斗为 3 人编队、以卡牌输入触发战术交锋，可用 Chain／Link Attack 把队友技能连成连续攻击，另有可扭转战局的「SOUL DRIVE」连携系统。2026-07 完成封闭 β 测试，2026-08-27 官方 X 宣布 2026 年内上线，TGS2026 提供试玩。",
      highlight: "久保带人直接参与概念与角色设计并推出原创双主角 —— 属于 IP 方深度介入，而非单纯授权挂名。",
      news: [
        { source: "Enduins（2026 年上线确认与原创角色）", url: "https://www.enduins.com/news/bandai-namco-confirms-2026-mobile-launch-for-bleach-mirrors-high" },
        { source: "Quest Board.JP（官方 X 公告与 TGS2026 试玩）", url: "https://quest-board.jp/en/quests/bleach-mirrors-high/" },
        { source: "iGMBUY（系统机制与自定义要素详解）", url: "https://www.igmbuy.com/en/news/357.html" },
        { source: "Overcentral（CBT 结束与最新主视觉公开）", url: "https://overcentral.com/en/bleach-mirrors-high-mobile-launch-79157/" }
      ],
      videos: [
        { label: "官方站（英文版・预告影像与最新主视觉）", platform: "官方站", url: "https://bleach-mh.bn-ent.net/en" },
        { label: "官方 X（上线时期公告与最新情报）", platform: "X", url: "https://x.com/BLEACH_mh_JP" },
        { label: "Pocket-Codes（App Store / Google Play 上架与配信日情报）", platform: "媒体", url: "https://pocket-codes.com/?p=86572" }
      ],
      hype: {
        score: 80,
        signals: [
          "原作久保帯人が制作協力・概念・キャラクターデザインで参画、オリジナル両主人公を描き下ろし",
          "2026-07 の CBT を経て 2026-08-27 に年内配信を公式 X で告知",
          "TGS2026 で試遊出展、「千年血戦篇後」というシリーズファン直撃の設定"
        ]
      },
      tags: ["IP授权", "手游", "卡片战斗", "事前登录中", "TGS2026"],
      caution: "App Store 显示的 2026-11-28 早于官方公告，属店铺表记；正式配信日仍未发表。",
      mobile: {
        status: "事前登録受付中（2026 年内配信予定）",
        os: ["iOS", "Android"],
        monetization: "基本無料（アイテム課金あり。ヘビーユーザー向けの追加バトルパス販売があると報道）",
        preReg: {
          open: true,
          since: "2026-08（App Store / Google Play にて受付開始、詳細日は未発表）",
          reward: "未発表"
        },
        developer: "未発表（バンダイナムコエンターテインメント発行）",
        publisher: "バンダイナムコエンターテインメント",
        region: "グローバル（日本・海外同時展開を予定）",
        distribution: "App Store / Google Play",
        ipSource: "『BLEACH』（久保帯人／集英社）",
        series: "アニメ『BLEACH 千年血戦篇』の後日譚。2025-12-21 にプロジェクト発表、2026-07 に CBT 実施",
        features: [
          "アバターカスタマイズで自分だけの死神（外見）を作成",
          "斬魄刀カスタマイズ——鍔・刀身・鞘を組み合わせて固有の斬魄刀を作る",
          "3 人編成のチーム戦、カード入力で発動する戦術バトル",
          "Chain／Link Attack で味方のスキルを繋げて連続攻撃",
          "戦局を覆す「SOUL DRIVE」連携システム",
          "久保帯人によるオリジナルキャラクターと、千年血戦篇後の新規ストーリー",
          "高品質な 3D アニメ調ビジュアル"
        ],
        synopsis: "『BLEACH』千年血戦篇の後の物語を描く完全新作ストーリー。プレイヤーは護廷十三隊の一員として、自らが育てる新人死神となり、崩れた世界の秩序の中で新たな敵と向き合う。一護・ルキア・白哉といったおなじみのキャラクターと共闘しつつ、久保帯人がデザインした新たな死神たちと出会い、尸魂界の新たな局面に立ち会う。",
        cast: "オリジナルキャラクター：Shirin Migishima／Shirane Sanari／Naru Jurinna／Giro Hando／Maiko Tokishima（久保帯人デザイン）。原作キャラクターはアニメ本編キャスト"
      }
    },

    /* ---------- 2026-09-16 09:00 場の増分（09-15 前後の日媒消息） ----------
     * 新規 5 件：灼眼のシャナ ブレイズエッジ（手游）／朧村正怪奇譚・呪術廻戦 RUMBLE: SURVIVATON・
     *            Another Eden Begins・ACE COMBAT 8（主机・PC）
     * 更新 1 件：patlabor-the-case-files（PS5 版アーリーアクセス開始）
     * スキップ：グローバル配信元が中国資本の音楽リズムゲーム → 中資レッドライン */

    {
      id: "shakugan-no-shana-blaze-edge",
      company: "CTW Inc.",
      companyJp: "CTW株式会社（G123）",
      bucket: "new",
      platformClass: "mobile",
      announceDate: "2026-09-14（正式サービス開始）",
      capturedAt: "2026-09-16",
      title: { jp: "灼眼のシャナ ブレイズエッジ", cn: "灼眼的夏娜 Blaze Edge", en: "Shakugan no Shana: Blaze Edge" },
      genre: "放置型 RPG（アイドル RPG）",
      platforms: ["iOS", "Android", "PC（ブラウザ）"],
      release: "2026-09-14",
      releasePrecision: "日",
      summary: "CTW 在自家免下载游戏平台 G123 上推出的《灼眼のシャナ》IP 授权手游，2026-09-14 正式开服。玩家培养主角夏娜，在动画与小说中未曾出现的原创舞台「影之世界」中探索，靠升级战斗中获得的装备、习得「神器」与「自在法」（技能）、招募伙伴来强化队伍。系列中出现过的强敌在本作里可直接编成己方战力。采用放置型循环，短时间登录也能推进育成，且不需要下载与注册会员，智能手机／平板／PC 浏览器打开即玩。支持日语、英语、繁体中文、韩语四语同步，事前登录奖励为 SSR「平井ゆかり」。",
      highlight: "以「按自己的方式培养夏娜」为核心的放置型 RPG；动画与原作里的强敌能直接编入己方阵容，是给系列 20 年粉丝的核心卖点。",
      mobile: {
        status: "正式サービス中",
        os: ["iOS", "Android", "PC（ブラウザ）"],
        monetization: "基本無料（ゲーム内アイテム課金あり）",
        preReg: { open: false, since: "2026-09-11 〜 2026-09-14（サービス開始前まで受付）", reward: "事前登録者全員に SSR「平井ゆかり」をサービス開始時に配布（現在は受付終了）" },
        developer: "CTW株式会社",
        publisher: "CTW株式会社（G123）",
        region: "日本／グローバル（日本語・英語・繁体字中国語・韓国語の 4 言語で同時展開）",
        distribution: "ブラウザ配信（G123。スマートフォン・タブレット・PC の Web ブラウザから、ダウンロード・会員登録不要）",
        payment: [],
        launch: "2026-09-14",
        ipSource: "『灼眼のシャナ』（著：高橋弥七郎／イラスト：いとうのいぢ／電撃文庫）。テレビアニメ放送 20 周年記念作品",
        series: "原作は全 22 巻＋短編集、TV アニメは 2005／2007／2011 年の 3 期に加え劇場版・OVA も展開。家庭用・携帯機でも複数ゲーム化されており、本作は G123 のアニメ IP ブラウザゲーム群に連なる 1 作",
        features: [
          "放置型システム：ログインしていない間もキャラクターの育成と強化が進む",
          "アニメ・原作で敵として登場した強敵を、影の世界では仲間として編成できる",
          "「神器」と「自在法」（スキル）を集めてキャラクターを強化",
          "アニメ・原作にない新規舞台「影の世界」をめぐるゲームオリジナルストーリー",
          "スマートフォン・タブレット・PC のブラウザから、インストール不要で即プレイ",
          "日本語・英語・繁体字中国語・韓国語の 4 言語対応"
        ],
        synopsis: "高橋弥七郎のライトノベル『灼眼のシャナ』を題材にした放置型 RPG。プレイヤーは特別な力を持つ主人公シャナを育てながら、アニメや原作には描かれなかった新たな舞台「影の世界」を探索する。紅世の徒とフレイムヘイズの戦いという原作の軸を踏襲しつつ、影の世界に潜む新たな脅威に立ち向かう物語が描かれる。",
        cast: "シャナ（CV：釘宮理恵／アニメ版より続投）。坂井悠二、ヘカテーほか、原作・アニメに登場したキャラクターが 20 名以上参戦"
      },
      news: [
        { source: "Holiday Travel（正式サービス開始の案内・公式リンク）", url: "https://haveagood-holiday.com/zh-CN/articles/shakugan-no-shana-blaze-edge-official-launch" },
        { source: "GameHaunt（G123 での正式リリース報道）", url: "https://gamehaunt.com/shakugan-no-shana-blaze-edge-launches-on-g123" },
        { source: "PerEXP（Anime News Network の配信日報道の整理）", url: "https://perexpteamworks.com/en/shakugan-no-shana-blaze-edge" }
      ],
      videos: [
        { label: "公式ゲームページ（G123・ブラウザで即プレイ）", platform: "官方站", url: "https://s.g123.jp/k5psunah" },
        { label: "正式リリース報道（ローンチトレーラーを内蔵）", platform: "媒体", url: "https://gamehaunt.com/shakugan-no-shana-blaze-edge-launches-on-g123" }
      ],
      hype: {
        score: 50,
        signals: [
          "テレビアニメ放送 20 周年という節目のタイミングでのリリース",
          "日本語・英語・繁体字中国語・韓国語の 4 言語で同時展開",
          "G123 の放置型フォーマットはアニメ IP 層に安定した需要があり、ダウンロード不要で入口が広い"
        ]
      },
      tags: ["IP授权", "手游", "放置RPG", "ブラウザ配信", "正式サービス中", "20周年"]
    },
    {
      id: "oboromuramasa-kaikitan",
      company: "Marvelous",
      companyJp: "株式会社マーベラス（開発：ヴァニラウェア）",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09-10（発売日決定・新映像公開）",
      capturedAt: "2026-09-16",
      title: { jp: "朧村正怪奇譚", cn: "胧村正怪奇谭", en: "Muramasa: Revenant Blades" },
      genre: "絢爛絵巻和風アクション RPG",
      platforms: ["Nintendo Switch 2", "Nintendo Switch", "PlayStation 5", "PC (Steam)"],
      release: "2027-02-04（Steam 版は 2027-02-05）",
      releasePrecision: "日",
      summary: "2009 年 Wii《胧村正》与 2013 年 PS Vita 版 DLC《元禄怪奇谭》合为一部的高画质重制版，2026-09-10 正式定档 2027-02-04。原班人马再集结：原作神谷盛治、导演中西渉、音响制作崎元仁、制作人塩田誠。最核心的改动是把「奥義」从「每把刀固定」改为「修得后可自由换装」——地上与空中各 3 个槽位，配方向键切换，用得多还能提升练度强化性能。另收录保留 PS Vita 版手感只提升画质的「经典模式」，以及画卷、图录、回想等鉴赏要素。本作是 Vanillaware 作品首次登陆 Steam。",
      highlight: "十七年后的重制，改的不是画面而是「奥義」的自由度；同时是 Vanillaware 首次登上 Steam。",
      console: {
        status: "2027年2月4日発売予定（Steam 版は 2月5日配信予定）。予約受付中",
        os: ["Nintendo Switch 2", "Nintendo Switch", "PlayStation 5", "PC（Steam）"],
        monetization: "通常版（パッケージ／ダウンロード）6,578 円（税込）／限定特装版 8,778 円（税込）／Digital Deluxe Edition 7,678 円（税込）。北米は通常版 49.99 ドル（Switch 2 版 59.99 ドル）、限定版 89.99／99.99 ドル",
        developer: "ヴァニラウェア",
        publisher: "マーベラス（Steam 版は Marvelous USA、アジア版は Game Source Entertainment）",
        region: "日本／北米・欧州・アジア（字幕：日本語・英語・繁体字・簡体字・韓国語・仏・独・西・伊・ポルトガル語・ロシア語、音声：日本語／英語）",
        distribution: "パッケージ版・ダウンロード版（Switch 2 のパッケージはゲームカード）",
        stores: ["Nintendo eShop", "PlayStation Store", "Steam", "全国のゲーム取扱店"],
        preOrder: { open: true, since: "2026-09-10（発売日発表と同時に順次受付開始）", reward: "アジア版の予約特典は「朧村正怪奇譚 典蔵色紙」1 枚。限定特装版は特製外箱と特製美術集『朧村正怪奇譚 麗画撰集』を同梱。限定特装版の予約締切は 10月29日、アジア版の予約期間は 12月2日まで。公式 X では 9月10日〜9月24日にフォロー＆リポスト企画を実施し、抽選で 6 名に「オリジナル掛け軸」が当たる" },
        features: [
          "PS Vita 版『朧村正』と DLC『元禄怪奇譚』を 1 本に統合し、グラフィックを高解像度化",
          "奥義が「刀ごとの固定」から「修得して自由に差し替え」へ変更。地上 3 スロット／空中 3 スロットに登録し、方向キーで使い分ける",
          "奥義を使い込むと練度が上がり、性能が強化される",
          "PS Vita 版のゲームシステムと操作感をそのままに高画質化した「クラシックモード」を収録",
          "絵巻・図録・回想といった鑑賞要素に加え、温泉・食事処・釣り・駕籠かきなどの寄り道コンテンツを収録",
          "境遇も目的も異なる 6 人の主人公の物語を、好きな順番で進められる"
        ],
        synopsis: "妖怪が跋扈する元禄時代の日本を舞台に、六人の主人公がそれぞれの物語を紡ぐ和風アクション RPG。妖刀村正に魅入られた者、主君の仇を討とうとする者、愛に苦しむ者——六編はそれぞれ独立し、遊ぶ順番はプレイヤーに委ねられている。刀による連撃に「受け流し」「はじき返し」、そして奥義を組み合わせ、魑魅魍魎が横行する世界を戦い抜く。",
        ipSource: "『朧村正』『元禄怪奇譚』（2009／2013 マーベラス、開発ヴァニラウェア）",
        series: "オリジナルクリエイターの神谷盛治、ディレクター中西渉、サウンドプロデューサー崎元仁、プロデューサー塩田誠が再集結。ヴァニラウェア作品として初の Steam 展開であり、同スタジオは『十三機兵防衛圏』『ユニコーンオーバーロード』を手がけている"
      },
      news: [
        { source: "AppBank（発売日決定・最新映像公開）", url: "https://www.appbank.net/2026/09/14/game/3102865.php" },
        { source: "Game Source Entertainment アジア版 公式ニュース（予約特典・限定特装版）", url: "https://asia.gamesource-ent.com/news/detail/1311/" },
        { source: "Yomimono（4Gamer／Automaton／Game Spark ほか報道の整理）", url: "https://www.yomimono.id/oboromuramasa-kaikitan-sets-february-4-2027-release" }
      ],
      videos: [
        { label: "公式サイト（最新映像『朧村正怪奇譚 朧流秘伝』を掲載）", platform: "官方站", url: "https://oboromuramasakaikitan.marv.jp/" },
        { label: "発売日決定の報道（新映像の内容を解説）", platform: "媒体", url: "https://www.appbank.net/2026/09/14/game/3102865.php" },
        { label: "実機映像まとめ報道（約 12 分のゲームプレイ）", platform: "媒体", url: "https://particle.news/story/muramasa-revenant-blades-set-for-feb-4-2027-release" }
      ],
      hype: {
        score: 68,
        signals: [
          "2009 年 Wii 版と 2013 年 PS Vita 版を統合した待望のリマスターで、シリーズとして約 14 年ぶりの再展開",
          "ヴァニラウェア作品として初の Steam 展開により、海外の同スタジオファン層を取り込める",
          "予約特典・限定特装版・アジア版の物販展開が発売日発表と同時に一斉に公表された"
        ]
      },
      tags: ["新作発表", "リマスター", "和風アクション", "定档", "ヴァニラウェア", "高画質化"]
    },
    {
      id: "jujutsu-kaisen-rumble-survivaton",
      company: "Shueisha Games",
      companyJp: "株式会社集英社ゲームズ（開発：poncle）",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09-16（2027年へ発売延期を正式告知・第2弾トレーラー公開）",
      capturedAt: "2026-09-17",
      title: { jp: "呪術廻戦 RUMBLE: SURVIVATON", cn: "咒术回战 RUMBLE: SURVIVATON", en: "Jujutsu Kaisen Rumble: Survivaton" },
      genre: "サバイバーズロワイヤル（Survivors Royale）",
      platforms: ["Nintendo Switch 2", "PlayStation 5", "Xbox Series X|S", "PC (Steam)"],
      release: "2027年（具体的な日付は未発表）",
      releasePrecision: "年",
      summary: "集英社游戏品牌「SHUEISHA GAMES」自营发行、由《吸血鬼幸存者》开发方 poncle 制作的《咒术回战》衍生「幸存者大逃杀」。玩家操作原作角色扫荡咒灵、在局内升级构筑，再与对手争夺最后席位；每 100 分可发动一次「规则追加」干扰对手，等级提升时还能把其他角色的普通攻击并入自己的构筑，形成所谓「协动构筑」。上线规模为最多 8 人线上对战＋单人模式。2026 年 6 月 9 日 Nintendo Direct 首次公开，原定 2026 年内发售，本轮确认延期至 2027 年，并在 TGS2026（集英社游戏展位 05-C10）进行全球首次公开试玩，8 名 Boss 全部可打。",
      highlight: "把「吸血鬼幸存者」的局内构筑塞进《咒术回战》，并用「规则追加」把PVP干扰做成每 100 分一次的关键抉择；发售从 2026 年内推迟到 2027 年。",
      console: {
        status: "2027年発売予定（具体的な日付は未発表）。2026 年内予定から延期が発表された",
        os: ["Nintendo Switch 2", "PlayStation 5", "Xbox Series X|S", "PC（Steam）"],
        monetization: "価格・CERO レーティングはいずれも未定（公式発表なし）",
        developer: "poncle",
        publisher: "集英社ゲームズ",
        region: "日本／世界（字幕：日本語・英語・繁体字・簡体字・韓国語・フランス語・イタリア語・ドイツ語・スペイン語・ポルトガル語（ブラジル））",
        distribution: "パッケージ版・ダウンロード版（販売形態の詳細は未発表）",
        stores: ["Steam", "Nintendo eShop", "PlayStation Store", "Microsoft Store"],
        preOrder: { open: false, since: "未開始（発売日決定後に案内予定）", reward: "未発表（公式発表なし）" },
        features: [
          "『Vampire Survivors』のループを『呪術廻戦』の世界に移植したサバイバーズロワイヤル",
          "最大 8 人のオンライン対戦。ポイント上位 2 名が 1 対 1 の決勝へ進み、勝者がその試合を取る",
          "100 ポイントごとに発動する「ルール追加」で相手の勢いを削ぐ",
          "レベルアップ時に他キャラクターの通常攻撃を自分のビルドへ組み込める「協力ビルド」",
          "ピクセルアートで描かれた 8 体のボス（禅院直哉・羂索・吉野順平・漏瑚・真人・裏梅・エソ・伏黒甚爾）",
          "ソロプレイモードを収録し、一人で攻略することも可能"
        ],
        synopsis: "プレイヤーは『呪術廻戦』のキャラクターとなって呪霊の大群と rival を同時に相手取り、なぎ倒しながら強くなって最後まで生き残ることを目指す。原作の「死滅回游」と呪術高専をモチーフに、Vampire Survivors の手触りをそのまま持ち込んだ設計で、試合中に自分だけの攻撃ビルドを組み上げる点が中心にある。",
        ipSource: "『呪術廻戦』（芥見下々／集英社）。原作は全世界累計発行部数 1 億 5,000 万部以上",
        series: "集英社ゲームズが展開するゲームブランドの 1 つ。開発は『Vampire Survivors』の poncle（創業者 Luca Galante）。2026 年 6 月 9 日の Nintendo Direct で初公開され、当初は 2026 年内発売予定だった"
      },
      news: [
        { source: "Holiday Travel（延期発表と TGS2026 試遊の詳細・公式発表ベース）", url: "https://haveagood-holiday.com/en/articles/jujutsu-kaisen-rumble-survivaton-delayed-2027" },
        { source: "Wasabi POP（延期の経緯と第 2 弾トレーラー解説）", url: "https://wasabipop.com/article/jujutsu-kaisen-rumble-survivaton-delayed-2027-tgs-playtest" },
        { source: "Shorty News（延期報道・プラットフォーム情報）", url: "https://shorty-news.com/tech/jujutsu-kaisen-rumble-delay" }
      ],
      videos: [
        { label: "公式サイト（第 2 弾トレーラーと TGS2026 試遊情報）", platform: "官方站", url: "https://jjkrsurvivaton.shueisha-games.com/" },
        { label: "公式 X（@JJKRS_JP・公式発表に明記）", platform: "X", url: "https://x.com/JJKRS_JP" }
      ],
      hype: {
        score: 74,
        signals: [
          "原作は全世界累計 1 億 5,000 万部以上、TV アニメ第 3 期「死滅回游」も進行中で IP の勢いが高い",
          "『Vampire Survivors』の開発元 poncle が手がけることで、ローグライト既存層からの関心が大きい",
          "TGS2026（9月17〜21日）で世界初の一般試遊を実施し、8 体のボスすべてを体験できる",
          "ファミ通読者期待榜に名前が出るシリーズだが、今回の延期で 2027 年に持ち越しとなった"
        ]
      },
      tags: ["新作発表", "延期", "IP授权", "ローグライト", "TGS2026", "集英社ゲームズ"]
    },
    {
      id: "another-eden-begins",
      company: "Wright Flyer Studios",
      companyJp: "株式会社ライトフライヤースタジオ（開発協力：Studio Prisma）",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09-16（発売日を迎えた当日）",
      capturedAt: "2026-09-17",
      title: { jp: "Another Eden Begins", cn: "另一个伊甸 起源", en: "Another Eden Begins" },
      genre: "買い切り JRPG（タイムトラベル RPG）",
      platforms: ["Nintendo Switch 2", "Nintendo Switch", "PC (Steam)"],
      release: "2026-09-16（PC・Switch 発売済み／パッケージ版は 2027 年予定）",
      releasePrecision: "已发售",
      summary: "把自家手游《另一个伊甸 超越时空的猫》主线第一部彻底重做为买断制 JRPG，2026-09-17 登陆 Switch 2 / Switch / PC（Steam）。最关键的变化是抽卡与内购被完全废除——18 名伙伴改为随剧情推进、完成专属任务、提升亲密度逐步集齐，每人都追加了加入剧情与亲密度任务。战斗保留回合制指令与 Another Force，并新增以技能衔接为核心的连锁系统；场景改为可自由移动的 3D 空间，遇敌从随机遭遇改为地图上的符号遭遇，玩家可自行决定迎战或绕开。为完成这些改动，开发团队放弃原来的 Cocos2d-x，改用 Unity 重写了系统。剧本由曾参与《时空之轮》《异度装甲》的加藤正人领衔。",
      highlight: "手游改编做出反向选择：不保留抽卡，直接把「抽卡」换成剧情解锁的 18 人固定阵容，并为此换引擎重写。",
      console: {
        status: "2026年9月17日デジタル配信予定（パッケージ版は 2027 年予定）",
        os: ["Nintendo Switch 2", "Nintendo Switch", "PC（Steam）"],
        monetization: "買い切り（北米 MSRP 39.99 ドル）。ガチャ・マイクロトランザクションは完全に廃止",
        developer: "ライトフライヤースタジオ／Studio Prisma",
        publisher: "ライトフライヤースタジオ（北米パッケージ版は Aksys Games）",
        region: "日本／世界（Steam 版の体験版は既定で日本語起動、設定から英語に切替可能。主要ストーリーには英語のフルボイスを収録）",
        distribution: "ダウンロード版（Steam／Nintendo eShop）。パッケージ版は 2027 年に北米で Aksys Games より発売予定",
        stores: ["Steam", "Nintendo eShop"],
        preOrder: { open: false, since: "2026-09-03（体験版配信開始。製品版へのセーブ引き継ぎに対応）", reward: "早期購入特典としてデジタル特典（限定コスト）と、スマートフォン版『アナザーエデン 時空を超える猫』のゲーム内報酬を用意（公式発表）" },
        features: [
          "スマートフォン版『アナザーエデン 時空を超える猫』第 1 部を、家庭用向けに全面的に作り直した買い切り版",
          "ガチャとマイクロトランザクションを完全に撤廃し、仲間は物語と親密度で加入する方式に変更",
          "18 人の仲間それぞれに加入エピソードと親密度クエストを用意",
          "『クロノ・トリガー』『ゼノギアス』の加藤正人がシナリオを担当",
          "New Game+ を搭載し、選んだ道によって 10 種類以上のエンディングに分岐",
          "Cocos2d-x から Unity へエンジンを刷新し、探索を自由移動の 3D 空間に変更",
          "遇敵をシンボルエンカウント方式に変更し、戦うか避けるかを選べる",
          "主要ストーリーとキャラクター加入シーンにフルボイスを収録"
        ],
        synopsis: "バルオキー村で穏やかに暮らす少年アルドは、妹フィーネを魔獣王に奪われ、時空の裂け目に呑まれて 800 年後の未来へ飛ばされる。AD300 年の現代、AD1100 年の未来、BC20000 年の古代を巡りながら、妹の行方と世界を揺るがす陰謀を追うタイムトラベル RPG。物語は本作で完結し、終わり方を次作に委ねる形にはしないと開発が明言している。",
        ipSource: "スマートフォン向け RPG『アナザーエデン 時空を超える猫』（ライトフライヤースタジオ）の家庭用リメイク",
        series: "原作は 2017 年に配信を開始したスマートフォン RPG。本作はその第 1 部を再構築したもので、プロデューサーは平澤信之介氏。開発チームは当初「スマートフォン版をそのまま家庭用機で動かす」案を試したが、描画とコントローラー操作が両立しなかったため方針を変え、Unity で作り直したと説明している"
      },
      news: [
        { source: "Yomimono（4Gamer の実機プレイ映像報道を整理）", url: "http://yomimono.id/wasyagana-tv-walks-through-another-eden-begins-ahead-of-september-17-release" },
        { source: "CGMagazine（PC 版レビュー／開発体制・価格・発売日）", url: "https://www.cgmagonline.com/review/game/another-eden-begins-pc" },
        { source: "18183（買い切り化と発売日・特典情報）", url: "https://news.18183.com/yxxw/202609/9032448.html" }
      ],
      videos: [
        { label: "実機プレイ映像（Wasyagana TV の内容を伝える報道）", platform: "媒体", url: "http://yomimono.id/wasyagana-tv-walks-through-another-eden-begins-ahead-of-september-17-release" },
        { label: "PC 版レビュー（CGMagazine・ゲームプレイ映像付き）", platform: "媒体", url: "https://www.cgmagonline.com/review/game/another-eden-begins-pc" }
      ],
      hype: {
        score: 58,
        signals: [
          "スマートフォン版は累計 1,000 万ダウンロード超の長期 IP で、既存ファンからの期待が厚い",
          "ガチャ撤廃の買い切り JRPG 化という方針転換が海外メディアで広く取り上げられた",
          "9月17日発売で、TGS2026 の開幕と同日にあたる"
        ]
      },
      tags: ["新作発表", "買い切り", "JRPG", "リメイク", "ガチャ撤廃"]
    },
    {
      id: "ace-combat-8-wings-of-theve",
      company: "Bandai Namco Entertainment",
      companyJp: "株式会社バンダイナムコエンターテインメント（開発：バンダイナムコエイセス）",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09-14（ストーリートレーラー・殲滅戦モード公開）",
      capturedAt: "2026-09-16",
      title: { jp: "ACE COMBAT 8: Wings of Theve", cn: "皇牌空战 8 Wings of Theve", en: "Ace Combat 8: Wings of Theve" },
      genre: "フライトシューティング／空戦アクション",
      platforms: ["PlayStation 5", "Xbox Series X|S", "PC (Steam)"],
      release: "2026-10-02（デラックスエディションは 09-29 から先行アクセス）",
      releasePrecision: "日",
      summary: "系列最新作，2026-10-02 发售，2026-09-14 通过 PlayStation.Blog 公开故事预告并确认「歼灭战」（Annihilation Battle）在任务 7 回归。歼灭战的核心是自由度：限时内自行决定先打哪个目标、什么时候回补给线装弹，目标清单包括太阳能发电站、储油罐、空军基地与弹药库。连锁破坏进一步加深策略性——击中储油罐引发的爆炸会波及周边建筑，敌机坠落地点附近的设施也会受损。本作同时介绍了两件超大型兵器：周长 6 公里、配备 2,000 米跑道与 CIWS／SAM／电磁炮的海上浮体「Megafloat Fatsia」，以及低轨道 500 公里、以金属棒动能打击的卫星兵器「Tonitrus Spear」。",
      highlight: "歼灭战回归是核心卖点：破坏顺序与补给线时机交给玩家，连锁破坏让「先打哪一个」直接影响战果。",
      console: {
        status: "2026年10月2日発売予定。予約受付中",
        os: ["PlayStation 5", "Xbox Series X|S", "PC（Steam）"],
        monetization: "通常版とデラックスエディションの 2 形態。デラックスエディションは 3 日間の先行アクセス（Advanced Access、9月29日開始）、コスメセット、Premium Ace Pass Plus クーポンを同梱。予約特典はプレイアブル機 F-14A Tomcat と Steam 版『ACE COMBAT ZERO THE BELKAN WAR』",
        developer: "バンダイナムコエイセス",
        publisher: "バンダイナムコエンターテインメント",
        region: "日本／世界",
        distribution: "パッケージ版・ダウンロード版",
        stores: ["PlayStation Store", "Microsoft Store", "Steam", "全国のゲーム取扱店"],
        preOrder: { open: true, since: "2026-09（予約受付中）", reward: "F-14A Tomcat が使用可能になるプレオーダー特典、および Steam 版『ACE COMBAT ZERO THE BELKAN WAR』の無料付属。デラックスエディションは 9月29日からの先行アクセス付き" },
        features: [
          "シリーズおなじみの殲滅戦（Annihilation Battle）がミッション 7 で復活",
          "制限時間内に、どの敵をどの順で潰すか、いつ補給線（リターンライン）へ戻るかを自分で決める自由度",
          "燃料タンクなどに着弾させると周囲の建造物を巻き込む連鎖破壊が発生",
          "撃墜された敵機の墜落地点でも周辺構造物が破壊される",
          "6 キロに及ぶ海上メガフロート「ファッツィア」と、低軌道 500 キロの衛星兵器「トニトルス・スピア」",
          "マルチプレイコンテンツ「Ace Combat Online」を収録",
          "プロデューサーは下元学氏。世界観を補完する前日譚シリーズの展開も告知されている"
        ],
        synopsis: "共和国ソトアによる中央ユージア連邦への奇襲侵攻から物語が始まる。連邦艦隊は壊滅し、首都テーヴは占領される。海上で漂流していた若いパイロットは老朽空母エンデュランスに救助され、伝説のエースにちなんだコールサイン「ウィングス・オブ・テーヴ」を与えられる——だがその無敵のエースは、士気を上げるために軍上層部がでっち上げた架空の存在だった。",
        ipSource: "『ACE COMBAT』シリーズ（バンダイナムコエンターテインメント）のナンバリング最新作",
        series: "ナンバリング第 8 作。2026 年 10 月 2 日の発売に向けて、ストーリートレーラーとミッション詳細が順次公開されている段階"
      },
      news: [
        { source: "PlayStation.Blog（公式発表：殲滅戦モードとストーリートレーラー）", url: "https://blog.playstation.com/2026/09/14/ace-combat-8-wings-of-theve-annihilation-battle-mode-confirmed-story-trailer-revealed/" },
        { source: "Gamesplanet ニュース（登場人物とエディション解説）", url: "https://uk.gamesplanet.com/community/ace-combat-8-wings-of-theve-steam-key--8105-1/news_updates/430801-ace-combat-8-wings-of-theve-story-trailer-introduces" },
        { source: "Game News Plus（殲滅戦と大型兵器の詳細）", url: "https://gamenewsplus.net/news/ace-combat-8-story-trailer-confirms-annihilation-battle-mode-38842" }
      ],
      videos: [
        { label: "公式ストーリートレーラー（PlayStation.Blog 内に埋め込み）", platform: "PlayStation.Blog", url: "https://blog.playstation.com/2026/09/14/ace-combat-8-wings-of-theve-annihilation-battle-mode-confirmed-story-trailer-revealed/" },
        { label: "トレーラーと殲滅戦モードの解説（VG Times）", platform: "媒体", url: "https://vgtimes.com/gaming-news/167574-ace-combat-8-wings-of-theve-gets-a-story-trailer-and-annihilation-battles-return.html" }
      ],
      hype: {
        score: 78,
        signals: [
          "ファミ通読者期待榜 9月13日号で 20 位（85 票）に入る常連シリーズ",
          "PlayStation.Blog での公式発表が海外メディアに広く転載され、トレーラーの露出が大きい",
          "10月2日発売で TGS2026 の直後、単独インタビュー記事も複数出ている"
        ]
      },
      tags: ["新作発表", "空戦", "トレーラー", "定档"]
    },
    {
      id: "kaiju-no-8-the-game",
      company: "Akatsuki Games",
      companyJp: "株式会社アカツキゲームス（企画・制作：東宝株式会社／株式会社プロダクション・アイジー）",
      bucket: "update",
      platformClass: "multi",
      announceDate: "2026-09-01（1 周年・メインストーリー第 2 部開幕）",
      capturedAt: "2026-09-16",
      title: { jp: "怪獣８号 THE GAME", cn: "怪兽8号 THE GAME", en: "Kaiju No. 8 THE GAME" },
      genre: "ジャイアントキリング RPG（ターン制コマンドバトル）",
      platforms: ["iOS", "Android", "PC (Steam)"],
      release: "2025-08-31（世界同時サービス開始。PC 版は 2025-09-30）",
      releasePrecision: "日",
      summary: "由 Akatsuki Games 企划・开发，与东宝、Production I.G 三方共同制作的《怪兽8号》改编手游，2025-08-31 全球同步开服，PC（Steam）版同年 9 月 30 日上线。玩法是 4 人小队对抗巨型怪兽的回合制指令战斗，怪兽弱点「核」露出时可发动必杀技收尾，队伍中存在搭档关系时讨伐中会触发追击。除重现漫画・动画名场面的「追忆故事」外，还收录以原创部队 CLOZER 为主轴的「主线故事」与聚焦单名队员的「角色故事」。2026-09-01 迎来一周年，主线第 2 部第 1 章「全新的威胁」上线，同时实装 ★5［瞬烈之才］古桥伊春与游戏首个霰弹枪武器种。支持日・英・繁中・简中・韩・法六种语言。",
      highlight: "东宝亲自下场站台的 IP 原方直营型手游；一周年把主线推进到跨平行世界的多元宇宙篇，并首次公开原创部队 CLOZER 的完整设定。",
      mobile: {
        status: "正式サービス中",
        os: ["iOS", "Android", "PC (Steam)"],
        monetization: "基本無料（アイテム課金制）",
        preReg: { open: false, since: "2025-04-25 〜 2025-08-31（サービス開始前まで受付を終了）", reward: "事前登録者数に応じた段階特典を達成（10 万人でクレジット、20 万人で次元晶 1,000、30 万人でガチャチケット 10 枚、50 万人で ★4［はるか高みへ］亜白ミナ、85 万人で ★4［刀のスペシャリスト］保科宗四郎＋チケット 10 枚）。さらに希望する ★5 キャラクター 1 体を配布" },
        developer: "株式会社アカツキゲームス",
        publisher: "株式会社アカツキゲームス（企画・制作はアカツキゲームス／東宝／プロダクション・アイジーの 3 社、宣伝協力は東宝とプロダクション・アイジー）",
        region: "日本／世界（日本語・英語・繁体字中国語・簡体字中国語・韓国語・フランス語の 6 言語）",
        distribution: "App Store / Google Play（日本および世界各地域）／Steam（PC）",
        payment: [],
        launch: "2025-08-31",
        ipSource: "『怪獣８号』（松本直也／集英社「少年ジャンプ+」）。テレビアニメの制作は株式会社プロダクション・アイジー。IP 保有元の東宝が企画・制作と宣伝に直接関与する",
        series: "アニメは 2024 年に第 1 期、2025 年 7〜9 月に第 2 期を放送し、2026-09-05 からスピンオフ『鳴海の平日』全 4 話を配信。原作は 2026 年時点で国内累計発行部数 1,900 万部超。本作は同 IP 初のゲーム化で、2024-06-15 のアニメ生配信内で発表された",
        features: [
          "怪獣の弱点「核」が露出した瞬間に必殺技を叩き込む、ターン制コマンドバトル",
          "隊員 4 人で小隊を編成。隊員同士にバディ関係があると討伐中に追撃が発生する",
          "「追憶ストーリー」で原作・アニメの名場面を追体験、「メインストーリー」と「キャラストーリー」はゲームオリジナル",
          "オリジナル部隊 CLOZER（次元閉門専用特殊部隊）と怪獣次元門というゲーム独自の設定を軸にした物語",
          "レベルアップ・上限解放・覚醒・スキル強化・武器強化の多重育成",
          "スマートフォンと PC（Steam）でアカウント連携可能、日本語・英語ほか計 6 言語対応"
        ],
        synopsis: "怪獣が日常的に平穏を脅かす日本を舞台に、プレイヤーは日本防衛隊の隊員として巨大怪獣に立ち向かう。ゲームオリジナルの主軸は、かつて討伐したはずの怪獣が「怪獣次元門」から襲来するという新たな災害で、これに対抗するため構築された CLOZER の面々が物語を牽引する。2026-09-01 に開幕した第 2 部では、怪獣 8 号の力が 4 つに砕けて平行世界へ散り、それを巡る多元宇宙の戦いが描かれる。",
        cast: "日比野カフカ／怪獣８号：福西勝也、亜白ミナ：瀬戸麻沙美、市川レノ：加藤渉、四ノ宮キコル：ファイルーズあい、保科宗四郎：河西健吾、鳴海弦：内山昂輝、古橋伊春：新祐樹、四ノ宮功：玄田哲章、四ノ宮サガン：鬼頭明里、スーテッド：Machico ほか（公式サイトに記載のキャスト）"
      },
      news: [
        { source: "Anime News Network（1 周年・メインストーリー第 2 部開幕の公式プレスリリース）", url: "https://www.animenewsnetwork.com/press-release/2026-09-01/kaiju-no-8-the-game-1st-anniversary-in-full-swing/.241200" },
        { source: "PR Newswire（1 周年キャンペーンの公式リリース）", url: "https://www.prnewswire.com/news-releases/kaiju-no-8-the-game-1st-anniversary-in-full-swing-302865575.html" },
        { source: "GameMarket.gg（1 周年アップデートの全内容ロードマップ）", url: "https://gamemarket.gg/news/kaiju-no-8-the-game/kaiju-no-8-the-game-1st-anniversary-full-september-roadmap" }
      ],
      videos: [
        { label: "Pick Up キャラクター予告編［瞬烈之才］古橋伊春（公式リリースに記載の URL）", platform: "YouTube", url: "https://youtu.be/MJaxMEwoIqc" },
        { label: "公式サイト（リリース直前トレーラー・キャラクター一覧・システム解説）", platform: "官方站", url: "https://kj8-thegame.com/" }
      ],
      hype: {
        score: 74,
        signals: [
          "IP 保有元の東宝が企画・制作に直接入り、Production I.G も宣伝協力として名を連ねる異例の 3 社体制",
          "原作は国内累計発行部数 1,900 万部超、アニメ第 2 期とスピンオフも進行中で IP の勢いが続いている",
          "2026-09-01 の 1 周年でメインストーリー第 2 部・新 ★5 キャラクター・新武器種を同時投入し、9/5 以降も継続的にアップデートを予定",
          "日本語・英語・繁体字・簡体字・韓国語・フランス語の 6 言語でモバイルと Steam の両方に展開しており、海外比率の高い IP 特性を活かしている"
        ]
      },
      tags: ["IP授权", "手游", "跨平台", "全世界配信", "正式サービス中", "1周年"]
    },
    {
      id: "blackchannel-blaze-road",
      company: "Plott",
      companyJp: "株式会社Plott（Plott Games）",
      bucket: "new",
      platformClass: "mobile",
      announceDate: "2026-09-14（配信開始）",
      capturedAt: "2026-09-16",
      title: { jp: "ブラックチャンネル ブレイズロード", cn: "黑色频道 Blaze Road", en: "Black Channel: Blaze Road" },
      genre: "放置系 RPG",
      platforms: ["iOS", "Android"],
      release: "2026-09-14",
      releasePrecision: "日",
      summary: "Plott 自研自发、改编自 YouTube 动画《ブラックチャンネル》的放置型 RPG，2026-09-14 在日本 iOS／Android 上线。故事设定为神秘敌人把全世界主播的订阅数清零，主角さとし 与ブラック 一边拍视频一边夺回订阅者，是游戏原创剧情。战斗以放置＋简单点击推进，关闭游戏也会累积放置收益，攻击力与报酬会无限膨胀。可收集并培养原作中熟悉的角色，通过转蛋「契约召唤」获得能左右战局的强力「契约者」。开服纪念活动自 9/14 至 10/31，登录与任务合计最多可得 3,000 个恶魔石（相当于 30 次转蛋）。",
      highlight: "把订阅数归零当反派动机、用「拍视频夺回订阅」当主线——直接拿 YouTube 动画的产业结构当游戏剧本，是日本本土 Web 动画 IP 手游化的一次少见尝试。",
      mobile: {
        status: "正式サービス中",
        os: ["iOS", "Android"],
        monetization: "基本無料（アイテム課金あり）",
        preReg: { open: false, since: "事前登録を経ずに 2026-09-14 の配信と同時にサービス開始", reward: "配信記念キャンペーン（9/14〜10/31）で、ログインボーナスとミッションを合わせてデビルストーン最大 3,000 個（通常の契約召喚 30 回分）を配布" },
        developer: "株式会社Plott",
        publisher: "株式会社Plott（Plott Games）",
        region: "日本",
        distribution: "App Store / Google Play（日本）",
        payment: [],
        launch: "2026-09-14",
        ipSource: "YouTube アニメ『ブラックチャンネル』（作：きさいちさとし／小学館）。チャンネル登録者数 130 万人超の人気チャンネルで、本作は同作初のスマートフォンゲーム化。著作表記は「© きさいちさとし・小学館／Plott」",
        series: "Plott はこれまで企画・制作会社として他社タイトルに関わるケースが中心で、自社パブリッシングでのスマートフォン向けゲーム展開は本作が新しい柱となる",
        features: [
          "アプリを閉じている間も放置報酬が貯まり、攻撃力と獲得報酬が際限なく上昇するインフレ型バトル",
          "操作は放置と簡単なタップのみで、通学・通勤の合間や就寝前の短時間でも進行する",
          "原作アニメに登場するキャラクターを収集・育成して編成する",
          "ガチャ「契約召喚」で強力な「契約者」を獲得し、編成と育成で攻略幅を広げる",
          "「敵を倒す」「仲間を育成する」など進行に応じた累計型ミッションを実装"
        ],
        synopsis: "誰もが動画配信を行う世界で、ブラックと仲間たちのチャンネルが謎の敵によって登録者ゼロにされてしまう。失われた登録者を取り戻すため、さとし とブラックは動画を撮影しながら旅に出る。行く先々で、登録者を失って凶暴化した危険な配信者たちと戦いながら、登録者消失の原因を突き止めていくというゲームオリジナルの物語。",
        cast: "公式発表なし（登場キャラクターは原作アニメ『ブラックチャンネル』のさとし・ブラックほか。キャストは公式サイト・ゲーム内で順次案内）"
      },
      news: [
        { source: "AppBank（配信開始とキャンペーン内容の公式発表ベースの記事）", url: "https://www.appbank.net/2026/09/16/game/3105560.php" },
        { source: "GameWith ゲームデータベース（ストア表記の仕様・開発者情報）", url: "https://gamewith.jp/gamedb/redirector/install/android/18365/article" }
      ],
      videos: [
        { label: "配信開始報道（公式画像とストア・公式 X へのリンクを掲載）", platform: "媒体", url: "https://www.appbank.net/2026/09/16/game/3105560.php" },
        { label: "公式 X（@black_orechan・記事本文に明記）", platform: "X", url: "https://x.com/black_orechan" }
      ],
      hype: {
        score: 45,
        signals: [
          "原作はチャンネル登録者数 130 万人超の YouTube アニメで、日本国内の小学校高学年〜中学生層に強い認知がある",
          "配信と同時に始まった 9/14〜10/31 の記念キャンペーンで最大 3,000 個のガチャ通貨を配る、初期離脱を抑える設計",
          "放置系 RPG という最もライトなジャンルで、原作アニメの視聴層とゲーム経験の浅い層を同時に取り込める"
        ]
      },
      tags: ["IP授权", "手游", "放置RPG", "新作発表", "正式サービス中", "Web発IP"]
    },
    {
      id: "scimagic-g123",
      company: "CTW Inc.",
      companyJp: "CTW株式会社（G123）",
      bucket: "new",
      platformClass: "mobile",
      announceDate: "2026-09-15（事前登録開始）",
      capturedAt: "2026-09-16",
      title: { jp: "サイマジック 魔法世界のバグ、科学で直します！", cn: "Scimagic 魔法世界的Bug，用科学来修！", en: "SCIMAGIC" },
      genre: "ローグライク RPG（ブラウザ／放置系）",
      platforms: ["iOS", "Android", "PC（ブラウザ）"],
      release: "未定（事前登録受付中）",
      releasePrecision: "未定",
      summary: "CTW 在自家免下载平台 G123 上公布并开启事前登录的原创新作，2026-09-15 解禁。主角从现代被抛入剑与魔法的异世界，那里魔法被视为异端、魔法使遭教会迫害；被误认成魔女共犯的主角，靠现代科学知识把一次次危机拆解成发现。玩法是结合数值构筑与随机遭遇的轻量 Roguelike，每次冒险的关卡、敌人与「发现」都会变化，可自由组出力量型／范围型／融合型等不同流派。玩家还能组建由历史上著名科学家与伟人构成的公会，并与敌对公会对抗。全程一键操作，手机・平板・PC 浏览器均可直接开玩，事前登录达 5 万人即向全体赠送伙伴角色「アルキメデス」。",
      highlight: "G123 平台上罕见的自社原创 IP——不靠动漫授权，改用「科学 vs 魔法」的原创设定，是 CTW 从 IP 代工走向自研的一次路线试探。",
      mobile: {
        status: "事前登録受付中",
        os: ["iOS", "Android", "PC（ブラウザ）"],
        monetization: "基本無料（ゲーム内アイテム課金制）",
        preReg: { open: true, since: "2026-09-15 〜 正式サービス開始前まで", reward: "事前登録者数 5 万件達成で、仲間キャラクター「アルキメデス」を参加者全員にプレゼント" },
        developer: "CTW株式会社",
        publisher: "CTW株式会社（G123）",
        region: "日本／グローバル（日本語・英語・繁体字中国語・韓国語の 4 言語）",
        distribution: "ブラウザ配信（G123。ダウンロード・会員登録不要で、スマートフォン・タブレット・PC の Web ブラウザからプレイ）",
        payment: [],
        ipSource: "オリジナル IP（ゲーム内著作表記は「©CTW, INC. All rights reserved.」）。G123 の主要ラインナップはアニメ IP のライセンス作品であり、自社オリジナル IP は本作が新規の試み",
        series: "G123 は『灼眼のシャナ ブレイズエッジ』『薬屋のひとりごと』『ハイスクール・オブ・ザ・デッド』など多数のアニメ IP ブラウザゲームを運営。CTW は IP ホルダーと直接協業してきた実績を持ち、本作はそのノウハウをオリジナル IP に振り向けた第 1 弾にあたる",
        features: [
          "科学の知識で「剣と魔法の王道ファンタジー」の常識をひっくり返す、異世界 × 現代科学のストーリー",
          "毎回ステージ構成・敵・「発見」が変化するローグライク設計。発見次第で魔法やスキルが組み替わる",
          "火力型・範囲型・融合型など、デッキに相当するビルドを自分で組み立てる",
          "歴史上の科学者・偉人を仲間にして自分だけのギルドを編成し、ライバルギルドと対抗する",
          "ワンタップ操作でスマートフォン・タブレット・PC ブラウザにそのまま対応、インストール不要",
          "日本語・英語・繁体字中国語・韓国語の 4 言語で同時に事前登録を受付"
        ],
        synopsis: "現代から剣と魔法の異世界へ飛ばされた少年が主人公。その世界では魔法使いは教会から異端とされ、主人公は魔法使いの少女の共犯者と誤解されて教会の衛兵に包囲される。しかし科学の知識を持つ主人公は、魔法に新しい可能性を見出し、科学的な発想で次々と訪れるピンチを突破していく。危機を「発見」に変えながら、この世界の仕組みそのものを書き換えていく物語。",
        cast: "公式発表なし（仲間キャラクターとして歴史上の科学者・偉人が登場。事前登録特典の配布キャラクターは「アルキメデス」）"
      },
      news: [
        { source: "Anime News Network（CTW 公式プレスリリース：事前登録開始と特典）", url: "https://www.animenewsnetwork.com/press-release/2026-09-15/ctw-opens-pre-registration-for-original-roguelite-rpg-scimagic/.241791" },
        { source: "GameHaunt（事前登録開始の報道と作品概要）", url: "https://gamehaunt.com/scimagic-pre-registration-now-open-on-g123" },
        { source: "AppBank（国内向け事前登録開始の公式発表ベースの記事）", url: "https://www.appbank.net/2026/09/16/game/3106021.php" }
      ],
      videos: [
        { label: "公式ゲームページ（G123・PV と事前登録導線）", platform: "官方站", url: "https://s.g123.jp/3h3xtwgi" },
        { label: "G123 公式サイト内の作品ページ（日本語版）", platform: "官方站", url: "https://g123.jp/game/scimagic" }
      ],
      hype: {
        score: 52,
        signals: [
          "G123 はダウンロード不要の HTML5 配信で、アニメファン層への入口が広く、同社の既存タイトル群からの相互送客が見込める",
          "事前登録 5 万件という比較的低いハードルで仲間キャラクターを配布する設計で、初速の登録数を積み上げやすい",
          "日本語・英語・繁体字・韓国語の 4 言語を同時に開放し、国内だけでなく G123 の海外ユーザーも最初から取り込む",
          "一方で、発表時点では具体的な戦闘システムや映像が限定的で、実際の手触りは未知数との指摘も出ている"
        ]
      },
      tags: ["新作発表", "手游", "原创IP", "ローグライク", "ブラウザ配信", "事前登録中"]
    },
    {
      id: "fate-extra-record",
      company: "Aniplex",
      companyJp: "株式会社アニプレックス（企画：有限会社ノーツ／開発：メテオライズ）",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09-14（キャラクター PV 第 3 弾「キャスター」公開・TGS2026 試遊出展）",
      capturedAt: "2026-09-16",
      title: { jp: "Fate/EXTRA Record", cn: "Fate/EXTRA Record", en: "Fate/EXTRA Record" },
      genre: "ダンジョン探索型 RPG（コマンドカードバトル）",
      platforms: ["PlayStation 5", "PlayStation 4", "Nintendo Switch 2", "Nintendo Switch", "PC (Steam)"],
      release: "2027-01-28",
      releasePrecision: "日",
      summary: "2010 年 PSP 作品《Fate/EXTRA》的完全重制版，2027-01-28 全球同步发售，登陆 PS5／PS4／Switch 2／Switch／Steam。舞台是月球内部庞大的数字世界 SE.RA.PH，128 组御主与从者围绕万能许愿机「圣杯」展开淘汰战；玩家探索迷宫、收集情报以揭开对手从者的「真名」，再在本战日取得决定性优势。战斗是自组牌组的指令卡式，保留原作底子的同时提升节奏与技能演出。企划由 TYPE-MOON／Notes 担当，奈须きのこ 负责原作・剧本监修、武内崇 负责角色原案、ワダアルコ 负责角色设计，开发交由メテオライズ，销售由アニプレックス承接原バンダイナムコエンターテインメント的发行位。9/9 起连续公开 Saber、Archer、Caster 三支角色 PV，TGS2026 アニプレックス 展位提供可操作三名从者的试玩版。",
      highlight: "延期与发行方更替折腾两年后终于定档的重制版：TYPE-MOON 交企划、メテオライズ 接手开发、アニプレックス 接盘销售，三条线同时在 TGS 前收口。",
      console: {
        status: "2027-01-28 発売予定（予約受付中）",
        os: ["PlayStation 5", "PlayStation 4", "Nintendo Switch 2", "Nintendo Switch", "PC（Steam）"],
        monetization: "パッケージ版：通常版 8,910 円／限定版 16,830 円、TYPE-MOON 公式通販限定の特装版 27,830 円・超特装版 39,380 円。ダウンロード版：通常版 8,910 円／デジタルデラックスエディション 13,200 円（すべて税込、CERO:C）",
        developer: "メテオライズ（企画：TYPE-MOON／有限会社ノーツ）",
        publisher: "株式会社アニプレックス（ヨーロッパ・オーストラリアは Marvelous Europe が担当）",
        region: "日本／世界同時。字幕は日本語・英語・フランス語・イタリア語・ドイツ語・スペイン語・簡体字・繁体字・韓国語、ボイスは日本語",
        distribution: "パッケージ版・ダウンロード版",
        stores: ["Steam", "Nintendo eShop", "PlayStation Store"],
        preOrder: { open: true, since: "2026-09 より各ストアで受付中（限定版は 3 枚組サントラ＋スチールブック＋100 ページ超のアートブックを同梱）", reward: "予約特典はエディション同梱物のみで、追加のデジタル特典は公式発表なし" },
        features: [
          "SE.RA.PH のダンジョンを探索し、対戦相手のサーヴァントの「真名」を突き止めて最終日に優位に立つ情報戦",
          "デッキを組んで挑むコマンドカードバトル。サーヴァントごとに固有の能力と見た目を持つ",
          "128 組のマスターとサーヴァントが争う月の聖杯戦争を描く、Fate シリーズ初の RPG の完全リメイク",
          "セイバー（CV.丹下桜）・アーチャー（CV.諏訪部順一）・キャスター（CV.斎藤千和）など複数のサーヴァントと契約可能",
          "TGS2026 のアニプレックスブースで、3 人のサーヴァントを操作できる試遊版を出展"
        ],
        synopsis: "月の裏側に隠された巨大な電子世界 SE.RA.PH を舞台に、128 組のマスターとサーヴァントが万能の願望器「聖杯」を賭けて殺し合う月の聖杯戦争を描く。プレイヤーはマスターとしてダンジョンを探索し、サーヴァントを育てながら敵マスターと遭遇を重ね、最終日の決戦に備えて相手の真名を割り出していく。誰の願いが聖杯に届くのか、という問いが物語の軸となる。",
        ipSource: "『Fate/EXTRA』（2010 年、PSP。TYPE-MOON／マーベラスエンターテイメント）。原作・シナリオ監修：奈須きのこ、キャラクター原案：武内崇、キャラクターデザイン：ワダアルコ。Fate シリーズ初の RPG にあたる作品",
        series: "Extraverse は『Fate/EXTRA CCC』『Fate/EXTELLA』『Fate/EXTELLA LINK』、TV アニメ『Fate/EXTRA Last Encore』へ展開。本作は 2020 年 7 月に原作 10 周年記念として TYPE-MOON studio BB が発表、2025 年→2026 年春と発売時期を延期し、2026 年 3 月にバンダイナムコエンターテインメントが Notes との合意で販売から撤退。アニプレックスが販売を引き継ぎ、開発もメテオライズへ移管されたうえで 2027-01-28 の世界同時発売が確定した"
      },
      news: [
        { source: "AppBank（キャラクター PV 第 1 弾・発売日と価格帯の公式発表ベースの記事）", url: "https://www.appbank.net/2026/09/12/game/3100547.php" },
        { source: "Nintendo Everything（キャスターのキャラクター PV 公開と作品概要）", url: "https://nintendoeverything.com/fate-extra-record-character-trailer-introduces-caster/" },
        { source: "Final Weapon（TGS2026 アニプレックスブースの試遊と各エディションの内容）", url: "https://finalweapon.net/2026/09/14/fate-extra-record-character-trailer-introduces-caster" }
      ],
      videos: [
        { label: "公式サイト（キャラクター PV と各エディション情報）", platform: "官方站", url: "https://fate-extra-record.typemoon.com/" },
        { label: "キャスターのキャラクター PV（記事内に埋め込み）", platform: "媒体", url: "https://nintendoeverything.com/fate-extra-record-character-trailer-introduces-caster/" }
      ],
      hype: {
        score: 82,
        signals: [
          "Fate シリーズ初の RPG という位置づけの作品で、原作発表から 6 年越し・延期を経ての発売日確定に関心が集まっている",
          "奈須きのこ（原作・シナリオ監修）／武内崇（キャラクター原案）／ワダアルコ（キャラクターデザイン）と主要スタッフが揃う",
          "9/9 のセイバー、9/12 のアーチャー、9/14 のキャスターと 3 本連続でキャラクター PV を公開し、発売 4 か月前から露出を積み上げている",
          "TGS2026 のアニプレックスブースで 3 サーヴァントを操作できる試遊を実施。販売元がアニプレックスへ移管されてから初の大型出展となる"
        ]
      },
      tags: ["新作発表", "リメイク", "定档", "TGS2026", "RPG", "アニプレックス"]
    },
    {
      id: "eminence-in-shadow-phantom-echoes",
      company: "Aiming",
      companyJp: "株式会社Aiming（Team CARAVAN／原作監修：KADOKAWA）",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09-03（PlayStation State of Play で初公開）",
      capturedAt: "2026-09-16",
      title: { jp: "陰の実力者になりたくて！ Phantom Echoes", cn: "想要成为影之实力者！ Phantom Echoes", en: "The Eminence in Shadow: Phantom Echoes" },
      genre: "3D ローグライトアクション",
      platforms: ["PlayStation 5", "Nintendo Switch 2", "PC (Steam / Epic Games Store)"],
      release: "2027年（具体的な日付は未発表）",
      releasePrecision: "年",
      summary: "《想要成为影之实力者！》首款家用机游戏，2026-09-03 的 PlayStation State of Play 中首次公开，预定 2027 年登陆 PS5／Switch 2／PC（Steam、Epic Games Store）。类型为 3D Roguelite 动作，每局游玩时角色能力随机强化，玩家从多种组合中拼出自己的一套配置，再扫清挡路的强敌。首支 PV 展示了以「アルファ」剑术为核心的战斗场面与能力选择系统「魔力觉醒」，片尾还收录了负伤的「デルタ」以及「アルファ」与「シャドウ」对立的片段。由 Aiming 的 Team CARAVAN 工作室开发，竹内雅彦 任制作人、大津俊輝 任监督，原作者 逢沢大介 与 KADOKAWA 共同监修原创剧本；亚洲版由云豹娱乐、欧美版由 NIS America 发行。",
      highlight: "同 IP 首次上家用机，且是 Aiming 从手游本业向主机 3D 动作跨出的一步——原作者亲自监修原创剧本，PV 里就已摆出「アルファ vs シャドウ」的对立伏笔。",
      console: {
        status: "2027 年発売予定（具体的な日付・価格は未発表）",
        os: ["PlayStation 5", "Nintendo Switch 2", "PC（Steam / Epic Games Store）"],
        monetization: "未発表（価格・CERO レーティングとも公式発表なし）",
        developer: "株式会社Aiming（Team CARAVAN スタジオ）",
        publisher: "クラウディッドレパードエンタテインメント（アジア）／NIS America（北米・ヨーロッパ）",
        region: "日本／アジア（簡体字・繁体字中国語版は日本版と同時期にアジアで発売）／北米・ヨーロッパ",
        distribution: "パッケージ版・ダウンロード版（詳細な販売形態は未発表）",
        stores: ["Steam", "Epic Games Store", "Nintendo eShop", "PlayStation Store"],
        preOrder: { open: false, since: "未開始（発売日決定後に案内予定）", reward: "未発表（公式発表なし）" },
        features: [
          "プレイごとに能力がランダムに強化されるローグライト設計。組み合わせ次第でビルドが毎回変わる",
          "能力選択システム「魔力覚醒」が攻略の鍵。レベルアップ時に提示される選択肢から育成方針を決める",
          "アルファをはじめ原作の人気キャラクターが操作キャラクターとして登場し、剣術主体のアクションを展開",
          "原作者・逢沢大介が KADOKAWA と共同でオリジナルシナリオを監修",
          "1 人用のシングルプレイ。日本語・英語のボイス、日英に加え簡体字・繁体字・仏・独・伊・西・伯の字幕に対応"
        ],
        synopsis: "「吾は影、影を狩る者」——影の実力者とは、主人公でもラスボスでもなく、普段は平々凡々なモブを演じながら影で物語に介入し実力を示す存在を指す。その存在に憧れた少年は事故で命を落とし異世界へ転生、シド・カゲノーとして「影の実力者」ごっこを本気で楽しむため、妄想ででっち上げた「闇の教団」討伐を（半分冗談で）企てる。しかしその教団は実在し、勝手に配下になった少女たちが彼を「シャドウ」と崇めていく。",
        ipSource: "『陰の実力者になりたくて！』（著：逢沢大介／KADOKAWA）。原作小説は 2026 年時点で累計発行部数 800 万部を突破。TV アニメは 2022 年に第 1 期、2023 年に第 2 期が放送された（アニメーション制作：Nexus）",
        series: "同 IP 初の家庭用ゲーム。開発は Aiming のスタジオ「Team CARAVAN」が担当し、プロデューサーは竹内雅彦、ディレクターは大津俊輝。原作サイドがシナリオ監修に入る体制で、アニメとは異なるオリジナルストーリーを描く"
      },
      news: [
        { source: "Anime.com（State of Play での発表・開発陣と世界観の整理）", url: "https://www.anime.com/news/eminence-in-shadow-phantom-echoes-console-game-2027" },
        { source: "クラウディッドレパードエンタテインメント公式ニュース（アジア版の発売決定と製品概要）", url: "https://www.cloudedleopardent.com/zh-hans/news/11388" },
        { source: "But Why Tho?（2026 年 9 月の State of Play 発表まとめ）", url: "https://butwhytho.net/2026/09/everything-september-state-of-play-japan" }
      ],
      videos: [
        { label: "公式プロモーション映像（クラウディッドレパードエンタテインメント公式ニュースに記載の URL）", platform: "YouTube", url: "https://youtu.be/sHxrg_LCRGU" },
        { label: "公式サイト（Steam / Epic Games Store のストアページを掲載）", platform: "官方站", url: "https://shadow-garden-pe.jp/" }
      ],
      hype: {
        score: 68,
        signals: [
          "原作小説は累計 800 万部を突破、TV アニメ 2 期を経て海外でも認知が広がっている IP",
          "PlayStation State of Play という世界同時配信の場での初公開で、発表直後から海外メディアの記事が多数出た",
          "同 IP 初の家庭用ゲームであり、Aiming にとってはスマートフォン中心の事業からコンシューマ 3D アクションへ広げる試金石になる",
          "クラウディッドレパードエンタテインメントがアジア版を日本版と同時期に発売するため、日本語圏以外のアジア市場も同時に立ち上がる"
        ]
      },
      tags: ["新作発表", "IP授权", "ローグライト", "ホームコンソール", "Aiming", "2027年"]
    },
    {
      id: "dragon-ball-xenoverse-3",
      company: "Bandai Namco",
      companyJp: "株式会社バンダイナムコエンターテインメント（開発：株式会社ディンプス）",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09-03（State of Play でカスタマイズトレーラー公開）",
      capturedAt: "2026-09-16",
      title: { jp: "ドラゴンボール ゼノバース3", cn: "龙珠 Xenoverse 3", en: "Dragon Ball Xenoverse 3" },
      genre: "アクション RPG（アバター作成型 3D 格闘）",
      platforms: ["PlayStation 5", "Xbox Series X|S", "PC (Steam)"],
      release: "2027年（具体的な日付・価格は未発表）",
      releasePrecision: "年",
      summary: "《龙珠 异战》系列第 3 作，2026-09-03 的 State of Play 中公开「Fight Your Way」预告并正式定名，预定 2027 年登陆 PS5／Xbox Series X|S／Steam。舞台是《龙珠》时间轴上此前从未描写过的 AGE 1000，玩家在更繁华的西都加入「グレートサイヤマン部隊」，与伙伴一起追查神秘事件。自创角色可选地球人、赛亚人、那美克星人、弗利萨族、魔人以及系列首次加入的「人造人」共 6 个种族，并能从 130 名以上角色（含非可操作角色）继承招式与战斗风格。战斗系统围绕 Soul Assist、Soul Switch、Awaken Skill 展开，并加入削减对手气力触发 Ki Break 的机制。TGS2026 万代南梦宫展位提供日本首次试玩，舞台为与布罗利的对战。",
      highlight: "系列时隔约 10 年的正统续作，把自创角色系统扩到 6 个种族（首次加入人造人），并把舞台推到原作者参与设定的 AGE 1000。",
      console: {
        status: "2027 年発売予定（具体的な日付・価格は未発表）",
        os: ["PlayStation 5", "Xbox Series X|S", "PC（Steam）"],
        monetization: "未発表（Steam ストアページは公開済みだが価格表記なし）",
        developer: "株式会社ディンプス",
        publisher: "株式会社バンダイナムコエンターテインメント",
        region: "日本／世界（簡体字・繁体字中国語字幕に対応）",
        distribution: "パッケージ版・ダウンロード版",
        stores: ["Steam", "PlayStation Store", "Microsoft Store"],
        preOrder: { open: false, since: "未開始（発売日決定後に案内予定）", reward: "未発表（公式発表なし）" },
        features: [
          "6 つの種族から選べるアバター作成。プレイヤー編の新種族として「人造人」がシリーズ初登場",
          "130 体以上のキャラクター（非プレイアブルを含む）から、移動・通常攻撃・変身などの動作を継承して自分専用のファイターを組む",
          "Soul Assist で援護キャラクターを召喚、Soul Switch で師事したキャラクターを憑依させ、必殺技と究極技を使う",
          "相手の気を削って Ki Break 状態に陥れ、Break Smash で一気に叩き込む攻防の駆け引き",
          "悟空やベジータ、ブロリーなどシリーズキャラクターとの対戦、協力レイドの実装が予定されている",
          "TGS2026 のバンダイナムコブースで日本初の試遊を実施。クリアするとオリジナルキーチェーンセットを配布"
        ],
        synopsis: "原作の時代から 148 年後、前作『ゼノバース 2』の 148 年後でもある AGE 1000 が舞台。より栄えた西都を歩き、グレートサイヤマン部隊の一員として活動するうちに、謎の事件が動き出す。過去の英雄たちを師と仰ぎながら自分だけの戦い方を組み上げ、新たな時代の危機に立ち向かう物語が描かれる。",
        ipSource: "『ドラゴンボール』（原作：鳥山明／集英社）。原作者・鳥山明が世界観とキャラクターに関与したとうたわれている。東映アニメーションとの共同プロジェクトとして 2026 年 1 月に発表された",
        series: "『ゼノバース』は 2015 年に第 1 作、2016 年に第 2 作が発売され、いずれも開発はディンプス。第 2 作は約 10 年にわたり追加コンテンツを配信し、2024 年 5 月には PS5／Xbox Series 版も登場した。第 3 作は発表当初『Age 1000』というコードネームで開発が進められていた"
      },
      news: [
        { source: "Anime News Network（State of Play での新トレーラー公開と対応機種）", url: "https://www.animenewsnetwork.com/news/2026-09-03/dragon-ball-xenoverse-3-game-trailer-previews-customizable-avatars-android-race/.241312" },
        { source: "Bandai Namco Entertainment America 公式ニュース（トレーラーと 6 種族・AGE 1000 の公式説明）", url: "https://www.bandainamcoent.com/news/dragon-ball-xenoverse-3-showcases-character-creation-and-the-new-android-race-in-the-fight-your-own-way-trailer" },
        { source: "Gamerhub（トレーラーの内容と TGS2026 デモの詳細）", url: "https://gamerhub.co.uk/dragon-ball-xenoverse-3-fight-your-way-trailer" }
      ],
      videos: [
        { label: "「Fight Your Way」トレーラー（バンダイナムコ公式ニュース内に埋め込み）", platform: "媒体", url: "https://www.bandainamcoent.com/news/dragon-ball-xenoverse-3-showcases-character-creation-and-the-new-android-race-in-the-fight-your-own-way-trailer" },
        { label: "トレーラー解説と TGS2026 デモ情報（記事内にトレーラー掲載）", platform: "媒体", url: "https://www.gametrader.sg/blog/dragon-ball-xenoverse-3-android-race-tgs-2026-demo/" }
      ],
      hype: {
        score: 80,
        signals: [
          "前作から約 10 年ぶりとなるナンバリング続編で、シリーズの続報を待っていた層の期待が大きい",
          "State of Play での発表に加え、TGS2026 のバンダイナムコブースで日本初の試遊を実施。ブロリー戦という題材で話題を作っている",
          "原作の作者が世界観とキャラクターに関与した AGE 1000 という新時代を舞台にしており、IP の新展開として注目されている",
          "アバター作成に「人造人」を追加し、130 体以上のキャラクターから動作を継承するシステムで、シリーズ最多の作り込みとされている"
        ]
      },
      tags: ["新作発表", "IP授权", "ホームコンソール", "TGS2026", "2027年", "バンダイナムコ"]
    },
    {
      id: "weiss-schwarz-online",
      company: "Bushiroad",
      companyJp: "株式会社ブシロード（Bushiroad Games）",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09-15（Steam ストアページ公開・ウィッシュリスト登録開始）",
      capturedAt: "2026-09-16",
      title: { jp: "ヴァイスシュヴァルツ オンライン", cn: "黑白双翼 Online", en: "Weiβ Schwarz Online" },
      genre: "オンライン対戦カードゲーム（デジタル TCG）",
      platforms: ["Nintendo Switch", "PC (Steam)"],
      release: "2027年春（予定）",
      releasePrecision: "時期",
      summary: "ブシロード的招牌角色 TCG《ヴァイスシュヴァルツ》的电子游戏版，2026-09-15 开设 Steam 商店页并开始接受愿望单登记，预定 2027 年春季在 Switch 与 Steam 上线。收录阵容分「Weiß Edition」「Schwarz Edition」两个版本，涵盖动画、游戏与 VTuber 等大量作品，玩家可收集喜爱作品的角色卡自由组牌。除线上对战外，也为初次接触的玩家准备了教程与 CPU 对战。支持日语・英语・简体中文・韩语・西班牙语，1 人游玩（线上 1〜2 人）。TGS2026 ブシロード 展位（6 号馆 C01）提供首次可玩 Demo，试玩或出示愿望单登记画面可获赠 MyGO!!!!! 版／Ave Mujica 版票券风卡片，每人最多 2 张。",
      highlight: "ブシロード 把经营近 20 年的实体 TCG 正式搬上 Switch 与 Steam；用 MyGO!!!!!／Ave Mujica 两版票券风赠品把 BanG Dream! 动画观众直接导流到展位。",
      console: {
        status: "2027 年春発売予定（発売日・価格は未発表）",
        os: ["Nintendo Switch", "PC（Steam）"],
        monetization: "未発表（価格・課金形態とも公式発表なし）",
        developer: "株式会社ブシロード",
        publisher: "株式会社ブシロード（Bushiroad Games）",
        region: "日本／海外（日本語・英語・簡体字中国語・韓国語・スペイン語の 5 言語）",
        distribution: "ダウンロード版（Nintendo Switch／Steam）。パッケージ版は発表されていない",
        stores: ["Steam", "Nintendo eShop"],
        preOrder: { open: false, since: "未開始（Steam ではウィッシュリスト登録を受付中）", reward: "未発表。TGS2026 のブシロードブースでは、試遊または Steam ウィッシュリスト登録画面の提示でチケット風カード（MyGO!!!!! 版／Ave Mujica 版、デザイン選択可）を 1 人最大 2 枚配布" },
        features: [
          "アナログ TCG『ヴァイスシュヴァルツ』をデジタル化し、Switch と Steam で対戦できる",
          "「Weiß Edition」と「Schwarz Edition」の 2 つのエディションで収録タイトルを分けて展開",
          "全国のプレイヤーとオンライン対戦が可能（1 人用、オンラインは 1〜2 名）",
          "チュートリアルと CPU 戦を用意し、初めて触るプレイヤーでも自分のペースでルールを覚えられる",
          "アニメ・ゲーム・VTuber の幅広いタイトルからカードが参戦し、好きな作品のデッキを組める",
          "TGS2026（9/17〜9/21、幕張メッセ 6 号館 C01）で初の試遊展示を実施"
        ],
        synopsis: "ブシロードが 2007 年から展開するキャラクターカードゲーム『ヴァイスシュヴァルツ』を、そのままデジタル環境に持ち込んだオンライン対戦カードゲーム。アニメ・ゲーム・VTuber など幅広い作品のカードを集め、好きなシリーズのデッキを組んで対戦する。全国のプレイヤーと自宅からでも外出先からでも対戦でき、ルールを覚えたい初心者向けにチュートリアルと CPU 戦も用意されている。",
        ipSource: "『ヴァイスシュヴァルツ』（株式会社ブシロードが 2007 年に発売したトレーディングカードゲーム）。有力アニメ・ゲーム・VTuber 作品のライセンスを多数保有し、それ自体が IP の集合体として機能している",
        series: "収録タイトルは Weiß Edition が『青桐高校』『角川スニーカー文庫』『五等分の花嫁』『BanG Dream! MyGO!!!!!』、Schwarz Edition が『THE IDOLM@STER SHINY COLORS』『ソードアート・オンライン』『東方Project』『BanG Dream! Ave Mujica』。ブシロードは TCG を起点にアニメ・ライブ・ゲームを連動させるメディアミックス戦略を採っており、本作はそのデジタル側の受け皿となる"
      },
      news: [
        { source: "AppBank（Steam ストアページ公開とウィッシュリスト受付開始の公式発表ベースの記事）", url: "https://www.appbank.net/2026/09/16/game/3106098.php" },
        { source: "Holiday Travel（ストアページ公開・対応機種・収録タイトルの整理）", url: "https://haveagood-holiday.com/en/articles/weiss-schwarz-online-steam-store-wishlist" },
        { source: "Saiga NAK（TGS2026 での初の試遊展示とノベルティ配布条件）", url: "https://saiganak.com/event/tgs2026-bushiroad-wso-booth-announcement" }
      ],
      videos: [
        { label: "Steam ストアページ（トレーラーとスクリーンショットを掲載）", platform: "Steam", url: "https://store.steampowered.com/app/3101840" },
        { label: "公式サイト（Weiß Edition / Schwarz Edition の収録タイトル一覧）", platform: "官方站", url: "https://wso.ws-tcg.com/" }
      ],
      hype: {
        score: 58,
        signals: [
          "『ヴァイスシュヴァルツ』は 2007 年から続くブシロードの看板 TCG で、参加型の大会文化と固定ファン層が長年にわたり積み上がっている",
          "TGS2026 のブシロードブースで初の試遊を実施し、MyGO!!!!! と Ave Mujica の票券風カードを配布する導線で BanG Dream! 層を直接呼び込む",
          "日本語・英語・簡体字・韓国語・スペイン語の 5 言語に対応し、海外の TCG プレイヤーも最初から対象に含めている",
          "一方で Switch と Steam のダウンロード専売で、既存のアナログ大会プレイヤーをどこまで移行させられるかは未知数"
        ]
      },
      tags: ["新作発表", "デジタルTCG", "TGS2026", "ブシロード", "2027年春"]
    },
    {
      id: "wo-long-2-wings-of-ember",
      company: "Koei Tecmo",
      companyJp: "株式会社コーエーテクモゲームス（開発：Team NINJA）",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09-16（発売日決定・Alpha Demo 配信開始）",
      capturedAt: "2026-09-16",
      title: { jp: "Wo Long 2: Wings of Ember", cn: "卧龙 2：Wings of Ember", en: "Wo Long 2: Wings of Ember" },
      genre: "三国志ダークアクション RPG",
      platforms: ["PlayStation 5", "Xbox Series X|S", "Nintendo Switch 2", "PC (Steam / Microsoft Store)"],
      release: "2027-03-04",
      releasePrecision: "日",
      summary: "Team NINJA 的《三国志》题材黑暗动作 RPG 系列第 2 作，2026-09-16 公布发售日并同日开放 Alpha Demo 下载，2027-03-04 全球同步发售，首日即进 Xbox Game Pass。故事接在《Wo Long: Fallen Dynasty》之后，时间为 208 年，主角与友人庞统的村庄被曹操军摧毁，主角为复仇先助刘备、再赴江东与孙权合流，与庞统重逢并筹谋赤壁之战。战斗延续系列的高速攻防，新增「Insight Skills」：闪避攻击、利用地形反击，被围攻时也能靠它夺回节奏。舞台改为开放形式，可自由探索长坂坡、赤壁等经典战场，并招募敌方武将为己用。Alpha Demo 可玩到 9/30，含开发中的角色创建与最多 3 人联机。",
      highlight: "TGS 开幕前夜丢出定档＋可玩 Alpha Demo：把「三国志 × 妖怪」的舞台推进到 208 年赤壁，并用 Insight Skills 把地形反击做成系列新招牌。",
      console: {
        status: "2027-03-04 世界同時発売予定（予約受付中。発売初日から Xbox Game Pass に対応）",
        os: ["PlayStation 5", "Xbox Series X|S", "Nintendo Switch 2", "PC（Steam / Microsoft Store）"],
        monetization: "通常版 9,680 円（日本）／デジタルデラックス版 13,640 円（税込）。デジタルデラックス版はシーズンパス（大型 DLC 2 本。1 本目は 2027-08-31 まで、2 本目は 2027-10-31 までに配信予定）とデジタルアートブック・ミニサウンドトラックなどを同梱",
        developer: "Team NINJA（コーエーテクモゲームス）",
        publisher: "コーエーテクモゲームス",
        region: "日本／世界同時（ボイスは日本語・英語、テキストは英語・フランス語・イタリア語・ドイツ語・スペイン語）",
        distribution: "パッケージ版・ダウンロード版",
        stores: ["Steam", "Nintendo eShop", "PlayStation Store", "Microsoft Store"],
        preOrder: { open: true, since: "2026-09-16 〜 2027-03-04", reward: "デジタル予約特典は「Creator Goddess Garb」セット、早期購入特典は「Harvest God Armor」セット。Alpha Demo クリア特典として「Fledgling Phoenix Helmet」を製品版で受け取れる" },
        features: [
          "攻撃と防御を高速で切り替えるシリーズの戦闘に、今作独自の「Insight Skills」を追加",
          "Insight Skills で敵の攻撃をかわし、地形を利用して反撃。多勢に囲まれた局面でも流れを変えられる",
          "長坂の戦い、赤壁の戦いなど三国志の名場面を再現した動的なオープンフィールドを自由に探索",
          "敵武将を勧誘して味方に加え、敵戦力を削いで戦況を有利に進める戦略要素",
          "士気（モラル）の管理が生存の鍵となり、上げるほど不利な戦況を覆しやすくなる",
          "Alpha Demo は 2026-09-30 まで配信。開発中のキャラクター作成と最大 3 人のオンラインマルチプレイを体験できる"
        ],
        synopsis: "西暦 208 年、前作『Wo Long: Fallen Dynasty』の後の時代。主人公と友人の龐統の村が、荊州侵攻に向かう曹操の軍勢によって蹂躙され、妖怪が跋扈する乱世が訪れる。復讐を誓う主人公は劉備の曹操討伐を助け、やがて江東で孫権に合流、再会した龐統とともに赤壁へ向かう曹操を退ける策を練る。知勇を備えた二人の若き才能が、決戦の空を舞いながら妖怪と戦う物語。",
        ipSource: "オリジナル IP。『三国志』をモチーフにコーエーテクモゲームスと Team NINJA が展開するオリジナルシリーズ（第 1 作『Wo Long: Fallen Dynasty』は 2023 年 3 月発売）",
        series: "Team NINJA のアクション設計（『Nioh』『仁王』『NINJA GAIDEN』）の集大成と位置づけられるシリーズ。第 1 作は黄巾の乱を出発点にしたのに対し、第 2 作は三国志時代の本編へと舞台を進めている"
      },
      news: [
        { source: "Koei Tecmo Europe 公式ニュース（発売日・Alpha Demo・各エディションの公式発表）", url: "https://www.koeitecmoeurope.com/news/return-to-the-demon-infested-world-of-the-three-kingdoms-in-wo-long-2-wings-of-ember-on-4th-march-2027" },
        { source: "Gematsu（発売日決定と Alpha Demo 配信開始の報道）", url: "https://www.gematsu.com/2026/09/wo-long-2-wings-of-ember-launches-march-4-2027-alpha-demo-now-available" },
        { source: "Eurogamer（TGS 直前の発表としての報道とプレビュー）", url: "https://www.eurogamer.net/playstation-limits-attachable-disc-drive-sales" }
      ],
      videos: [
        { label: "発売日発表トレーラー（Gematsu の記事内に埋め込み）", platform: "媒体", url: "https://www.gematsu.com/2026/09/wo-long-2-wings-of-ember-launches-march-4-2027-alpha-demo-now-available" },
        { label: "Koei Tecmo Europe 公式ニュース（トレーラーと物語・システムの公式説明）", platform: "官方站", url: "https://www.koeitecmoeurope.com/news/return-to-the-demon-infested-world-of-the-three-kingdoms-in-wo-long-2-wings-of-ember-on-4th-march-2027" }
      ],
      hype: {
        score: 82,
        signals: [
          "Team NINJA の看板シリーズ続編で、前作『Wo Long: Fallen Dynasty』から 4 年ぶりの発売日確定に関心が集まっている",
          "TGS2026 開幕前夜の 9/16 に発売日と Alpha Demo を同時発表したことで、Eurogamer・RPG Site・Gematsu など海外メディアが一斉に報じた",
          "発売初日から Xbox Game Pass に対応するため、PC と Xbox 側の試遊障壁が低い",
          "Alpha Demo を 9/30 まで配信し、開発中のキャラクター作成と 3 人マルチプレイを先行体験させ、フィードバック用アンケートも実施する"
        ]
      },
      tags: ["新作発表", "定档", "アクションRPG", "体験版", "Game Pass", "Team NINJA"]
    },

    {
      id: "mega-man-dual-override",
      company: "Capcom",
      companyJp: "株式会社カプコン",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09-16（Capcom Spotlight TGS2026 でブルース参戦・PRAGMATA コラボ公開）",
      capturedAt: "2026-09-17",
      title: { jp: "ロックマン デュアルオーバーライド", cn: "洛克人 Dual Override", en: "Mega Man: Dual Override" },
      genre: "2D 横版动作（经典系列）",
      platforms: ["Nintendo Switch 2", "Nintendo Switch", "PlayStation 5", "PlayStation 4", "Xbox Series X|S", "Xbox One", "PC (Steam / Epic Games Store)"],
      release: "2027 年春",
      releasePrecision: "季",
      summary: "《洛克人》经典横版系列的最新作，2025 年 TGA 首次公开，2026-09-09 的 Nintendo Direct 上把发售窗口收窄到 2027 年春，并确认布鲁斯（Proto Man）成为第二名可操作角色。布鲁斯以盾牌为主的近身格斗和回旋镖式攻击作战，与洛克人的远程洛克炮形成两套完全不同的打法。「客制化晶片（Custom Chips）」可自由混装，把连射、护盾泡泡、悬停等能力挂到两个角色身上；战斗中攒满「超载（Override）」槽还能短时解除机体限幅器大幅提升输出，代价是效果结束后部分能力会暂时失效或削弱。2026 年 Gamescom 已公开新机器头目「Twinkle Girl」以及来自《洛克人 8》的天文人的回归。随游戏同步推出洛克人与布鲁斯的 amiibo。",
      highlight: "等了 8 年的《洛克人》正统续作，用「双主角＋客制化晶片＋超载形态」重做经典横版骨架。9/16 的 Capcom Spotlight 进一步公开布鲁斯的实际战斗演示，并宣布与《Pragmata》互换联动——洛克人主题「Mega Man Pack」DLC 免费上线。",
      console: {
        status: "2027 年春発売予定（ウィッシュリスト登録を受付中）",
        os: ["Nintendo Switch 2", "Nintendo Switch", "PlayStation 5", "PlayStation 4", "Xbox Series X|S", "Xbox One", "PC（Steam / Epic Games Store）"],
        monetization: "買い切り。価格は未発表。同時期にロックマンとブルースの amiibo を発売予定",
        developer: "カプコン",
        publisher: "カプコン",
        region: "日本／北米／欧州（いずれも 2027 年春発売予定）",
        distribution: "未発表（パッケージ版の有無は公式に明示なし。デジタル版は PlayStation Store・Microsoft Store・Steam でウィッシュリスト登録を受付中）",
        stores: ["Nintendo eShop", "PlayStation Store", "Microsoft Store", "Steam"],
        preOrder: { open: false, since: "未開始（ウィッシュリスト登録のみ受付中）", reward: "未発表（2027 年春にロックマン・ブルースの amiibo を同時発売予定）" },
        features: [
          "クラシックシリーズのナンバリング新作。リメイクやコレクションではなく完全新作として開発されている",
          "ロックマンとブルースの 2 人が操作可能。ブルースは盾を使った近接攻撃とブーメラン状の攻撃を軸に、ロックマンとは異なる立ち回りになる",
          "「カスタムチップ」を自由に組み合わせて両キャラクターをカスタマイズ。連射、防御シールド、ホバーなどが確認されている",
          "戦闘でゲージを溜めると「オーバーライド」状態を発動し、限界を超えた火力を出せる。効果終了後は一部能力が一時的に使えなくなる",
          "新たなロボットマスター「Twinkle Girl」が登場。『ロックマン 8』のアストロマンなど過去作のボスも復帰する",
          "2027 年春にロックマンとブルースの amiibo を同時発売予定"
        ],
        synopsis: "青いロボット・ロックマンと、その兄にあたるブルースが並んで戦うクラシックシリーズの新作。ステージを進みロボットマスターを撃破していく従来の構造はそのままに、カスタムチップによる能力の付け替えと、一時的に出力限界を超える「オーバーライド」という 2 つの新システムが加わる。プレイヤーは 2 人の性能差とチップ構成を組み合わせて、自分なりの攻略法を組み立てていくことになる。",
        ipSource: "『ロックマン』シリーズ（カプコン）。1987 年の初代から続く自社 IP で、2027 年に 40 周年を迎える",
        series: "『ロックマン 11 呪われた運命』(2018) 以来 8 年ぶりのナンバリング新作。ロックマン不在だった『ロックマン 11』への反動から、ブルースの復帰は海外ファンから長く要望されていた"
      },
      news: [
        { source: "Anime News Network（Nintendo Direct での 2027 年春発売発表）", url: "https://www.animenewsnetwork.com/news/2026-09-10/mega-man-dual-override-game-announces-spring-2027-launch/.241619" },
        { source: "Final Weapon（ブルース参戦と amiibo の同時発売）", url: "https://finalweapon.net/2026/09/09/mega-man-dual-override-amiibo-launch-spring-2027" },
        { source: "Vandal（開発陣インタビュー：8 年ぶり復活の経緯と 40 周年）", url: "https://vandal.elespanol.com/noticia/2026243021/capcom-explica-por-que-mega-man-ha-tardado-ocho-anos-en-regresar-con-dual-override/" },
        { source: "Gfinity Esports（Direct での発表内容まとめ）", url: "https://www.gfinityesports.com/article/mega-man-dual-override-gets-spring-2027-release-proto-man-gameplay-revealed" }
      ],
      videos: [
        { label: "ブルース（Proto Man）実機トレーラー（Nintendo Direct 2026-09-09 公開）", platform: "YouTube", url: "https://www.youtube.com/watch?v=ac-c2InQQtY" },
        { label: "Final Weapon 記事内の発表トレーラー", platform: "媒体", url: "https://finalweapon.net/2026/09/09/mega-man-dual-override-amiibo-launch-spring-2027" }
      ],
      hype: {
        score: 76,
        signals: [
          "『ロックマン 11』(2018) から 8 年ぶりのナンバリング新作で、シリーズ待望層の関心が高い",
          "2025 年 The Game Awards での初公開から Gamescom 2026、Nintendo Direct と段階的に情報を出し、発売 1 年半前から露出を積み上げている",
          "ブルースの操作可能化という長年の要望に応えた点が海外メディアで大きく取り上げられた",
          "amiibo の同時発売と 2027 年の 40 周年が重なり、物販も含めた展開が期待されている"
        ]
      },
      tags: ["新作発表", "定档", "横版动作", "カプコン", "2027年春"]
    },

    {
      id: "dragon-dogma-2-dark-arisen",
      company: "Capcom",
      companyJp: "株式会社カプコン",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09-16（Capcom Spotlight TGS2026 で新トレーラー・キャラクリ先行開放）",
      capturedAt: "2026-09-17",
      title: { jp: "ドラゴンズドグマ 2 ダークアリズン", cn: "龙之信条 2：黑暗觉者", en: "Dragon's Dogma 2: Dark Arisen" },
      genre: "动作RPG（大型付费追加内容）",
      platforms: ["Nintendo Switch 2", "PlayStation 5", "Xbox Series X|S", "PC (Steam)"],
      release: "2026-10-09",
      releasePrecision: "日",
      summary: "《龙之信条 2》的付费大型扩张内容，2026-10-09 发售。PS5／Xbox Series X|S／Steam 上作为单独 DLC 提供，Switch 2 则是首次登陆任天堂硬件、以「本体＋扩张」的组合包形式发售。新舞台是北方被遗弃的雪原「诺干（Norgan）」，围绕神秘角色 Eir 与不死的堕落巨龙展开，新增两块早期章节：Lost Rites（建议 20 级左右）与 Forsaken Dominion（建议 40 级左右）。核心循环是「遗物远征」——从雪原带回的古代遗物交由村长 Jiera 鉴定，能开出性能随稀有度浮动的新武器防具，部分装备还会直接赋予全新战斗技能或强化既有技能。此外追加 12 座「Lost Rites」新迷宫、新敌（贝奥尔坎游牧战士、能喷冰息冻住目标的诺干巨人、冰龙 Fimbl）、可花钱雇来嗅出隐藏宝藏的凶狼 Freki，武器技能槽从 4 个扩到 6 个，并加入面对满级玩家的 Hard Mode。角色创建新增发型与纹身。",
      highlight: "卡普空把 2024 年原作的「不便」当成卖点来扩容：用雪原新区域＋遗物鉴定循环给通关后的角色一个继续变强的理由，同时首次把系列带上 Switch 2。9/16 的 Capcom Spotlight 公开新预告（诺尔甘的剧情与敌人）、12 个遗物地牢挑战与伙伴创作的官方 Pawn，并提前开放角色创建工具（含 Switch 2 版）。",
      console: {
        status: "2026-10-09 発売予定（予約受付中。日本では発売日 9:00 配信とストアに記載）",
        os: ["Nintendo Switch 2", "PlayStation 5", "Xbox Series X|S", "PC（Steam）"],
        monetization: "買い切り。既存プレイヤー向けの拡張単体は 29.99 ドル、本体同梱のセット版は 49.99 ドル（北米価格。日本価格は現時点で未発表）。Switch 2 版は本体と拡張を同梱したセット版のみ",
        developer: "カプコン",
        publisher: "カプコン",
        region: "日本／北米／欧州（日本は 2026-10-09 9:00 JST 配信予定）",
        distribution: "ダウンロード（Switch 2 は本体同梱のセット版、PS5／Xbox Series X|S／PC は本体を持っている方向けの拡張単体 DLC も用意）",
        stores: ["Nintendo eShop", "PlayStation Store", "Microsoft Store", "Steam"],
        preOrder: { open: true, since: "受付中（発売日 2026-10-09）", reward: "予約特典は「ノーガン・ファッションセット：北方の装い」" },
        features: [
          "新リージョン「ノーガン」を追加。村落を拠点に、生存物資の管理・装備の強化・ポーンを休ませたうえで危険地帯へ踏み込む遠征ループが中心になる",
          "「遺物の鑑定」を軸にした成長システム。遠征で持ち帰った遺物を Jiera に鑑定させると、レアリティに応じた武器・防具や新スキルが手に入る",
          "本体エリアに 12 の新規ダンジョン「Lost Rites」を追加。歴代の覚者（アリズン）が遺した希少装備が眠る",
          "武器スキルの装着枠を 4 から 6 に拡張（無料タイトルアップデートでも本体側に適用済み）",
          "ステータスがカンスト付近の熟練プレイヤー向けに Hard Mode を追加。一度設定すると元に戻せない",
          "新たな敵としてベオルカンの遊牧戦士、冷気のブレスで凍結させるノーガンの巨人、氷の古龍フィンブルなどが登場。金貨を払えば凶狼 Freki が隠し宝を嗅ぎ当ててくれる",
          "キャラクタークリエイトに新ヘアスタイルとタトゥーを追加"
        ],
        synopsis: "『ドラゴンズドグマ 2』本編の後に広がる北方の物語。かつて古代の争いで滅びた文明の跡地に残る最後の安全な拠点・ノーガン集落を足がかりに、覚者は雪と氷に閉ざされた領域へ踏み込む。不死の堕ちた竜の秘密を追う謎の人物 Eir、遺物を鑑定する村の主 Jiera らと関わりながら、遺物がもたらす力を見つけていく。公式は「本編以上に緊張感と手応えのある戦い」を目指していると説明している。",
        ipSource: "『ドラゴンズドグマ』シリーズ（カプコン）。第 1 作は 2012 年発売、本編『ドラゴンズドグマ 2』は 2024 年 3 月発売",
        series: "第 1 作にも同名の拡張版『ドラゴンズドグマ ダークアリズン』(2013) が存在するが、本作はそれとは別に『ドラゴンズドグマ 2』向けに作られた新規コンテンツ。開発は本編のプレイヤーフィードバックを踏まえ、「より遊びやすく、より多くの内容」を方針に据えたと説明されている"
      },
      news: [
        { source: "Pixels In Orbit（遺物遠征サイクルの概要映像と無料タイトルアップデート）", url: "https://pixelsinorbit.com/news/dragons-dogma-2-dark-arisen-relic-expedition-gameplay-overview-trailer-september-1-2026-norgandian-settlement-jiera-appraisal-freki-direwolf-beorcan-warriors-norgan-giant-ice-dragon-fimbl-free-title-update-framerate-save-slots-weapon-skills-october-9-ps5-xbox-series-switch-2-steam" },
        { source: "VG Times（Capcom が Steam ページで公開した Q&A と Hard Mode）", url: "https://vgtimes.com/gaming-news/162752-capcom-reveals-dragons-dogma-2-dark-arisen-details-including-hard-mode.html" },
        { source: "Inven Global（ディレクター木下研人・プロデューサー平林良章インタビュー）", url: "https://www.invenglobal.com/articles/25344/dragons-dogma-2-dark-arisen-created-by-players-desire-to-fight-more" },
        { source: "Pixel Twelve（発売日・価格・プラットフォームの整理）", url: "https://pixeltwelve.com/articles/dragons-dogma-2-dark-arisen-release-date-expansion-upgrade" }
      ],
      videos: [
        { label: "遺物遠征サイクル ゲームプレイ概要トレーラー（Pixels In Orbit の記事内に埋め込み）", platform: "媒体", url: "https://pixelsinorbit.com/news/dragons-dogma-2-dark-arisen-relic-expedition-gameplay-overview-trailer-september-1-2026-norgandian-settlement-jiera-appraisal-freki-direwolf-beorcan-warriors-norgan-giant-ice-dragon-fimbl-free-title-update-framerate-save-slots-weapon-skills-october-9-ps5-xbox-series-switch-2-steam" },
        { label: "TGS2026 の Capcom Spotlight で追加情報を公開予定（2026-09-16 23:00 JST）", platform: "官方站", url: "https://www.capcom.co.jp/" }
      ],
      hype: {
        score: 68,
        signals: [
          "2024 年発売の本編は発売直後に 250 万本超を出荷した大型タイトルで、拡張の発表自体が海外メディアで広く報じられた",
          "本編で不評だった要素（フレームレート、セーブ枠、武器スキル枠の少なさ）を無料タイトルアップデートで先に手当てしてから拡張を出す段取りが、復帰層の評価を分けている",
          "シリーズ初の Nintendo Switch 2 参入となり、任天堂ハードしか持たない層にとっては新規参入の機会になる",
          "一方で「原作の不便さをどこまで残すか」をめぐる日米の意見差が制作者インタビューで明かされるなど、評価は拡張の内容次第という見方も強い"
        ]
      },
      tags: ["追加内容", "DLC", "动作RPG", "カプコン", "Switch2初参入"]
    },

    /* -------------------------------------------------------
     * 2026-09-17 09:00 场 新增
     *   判据：发表日 / 发售日 / 重要进展落在 2026-07-17 ~ 2026-09-17 窗口内
     *   手游优先（konosuba-machisuba），主机・PC 为次要
     * ----------------------------------------------------- */

    {
      id: "konosuba-machisuba",
      company: "KADOKAWA",
      companyJp: "株式会社KADOKAWA",
      bucket: "new",
      platformClass: "multi",
      announceDate: "2026-07-26（アニメ10周年イベント「Colorful」で正式発表・事前登録開始）",
      capturedAt: "2026-09-17",
      title: { jp: "この素晴らしい世界に祝福を！～この愛すべき街に繁栄を！～", cn: "为美好的世界献上祝福！～为这可爱的城镇献上繁荣！～", en: "KonoSuba: God's Blessing on This Wonderful World! - Prosperity to This Beloved City!" },
      genre: "異世界トラブル生活 RPG（3D バトル＋生活パート、基本無料＋アイテム課金）",
      platforms: ["iOS", "Android", "PC"],
      release: "2026年内（日本先行、海外配信は未発表）",
      releasePrecision: "年",
      summary: "角川（KADOKAWA）以《为美好的世界献上祝福！》为原作推出的官方新作，简称「まちすば」，定位为「异世界麻烦生活 RPG」。舞台设在阿克塞尔，玩法由 3D 演出的战斗与日常／城镇生活两部分组成，战斗中用 3D 动画还原惠惠的爆裂魔法等角色标志性技能；剧情为完全原创，而非复刻动画或小说既有篇章。原作轻小说作者晓夏目亲自担任剧情监修，原作插画师三嶋黑音参与制作协力。手机版由角川自行发行，PC 版另定由 DMM GAMES 配信。",
      highlight: "IP 持有方角川首次亲自下场做手游：原作作者监修剧情、原班声优回归，接替 2025 年初停服的《このすば Fantastic Days》。",
      mobile: {
        status: "事前登録受付中",
        os: ["iOS", "Android"],
        monetization: "基本無料（アイテム課金あり）",
        preReg: { open: true, since: "2026-07-26", reward: "日本国内の App Store / Google Play で事前登録を受付中。ティザー PV とキービジュアルは 7/26 公開。人数マイルストーン型の特典内容は公式発表待ち。" },
        developer: "未公表（KADOKAWA が企画・製作・配信。開発会社名は非公開）",
        publisher: "KADOKAWA（スマホ版）。PC 版は DMM GAMES で配信",
        region: "日本先行（海外配信は未発表）",
        distribution: "App Store / Google Play（日本）。PC 版は DMM GAMES",
        payment: [],
        ipSource: "©暁なつめ・三嶋くろね／KADOKAWA／このすば3製作委員会。原作は KADOKAWA 刊のライトノベル『この素晴らしい世界に祝福を！』（シリーズ累計 1,000 万部超）。IP ホルダーである KADOKAWA 自身が企画・配信を主導。",
        series: "本作は 2025 年初頭にサービス終了したスマホ向け『この素晴らしい世界に祝福を！ファンタスティックデイズ』以来、シリーズのスマホゲーム復帰作。同時期に TV アニメ第 4 期の 2027 年放送も発表され、アニメ10周年のタイミングでゲームとアニメを同時に打ち出している。",
        features: ["3D グラフィックによる戦闘と日常パート", "原作キャラの必殺技（めぐみんの爆裂魔法など）を 3D アニメで再現", "原作者・暁なつめ 監修による完全オリジナルストーリー", "原作声優陣が続投（カズマ／アクア／めぐみん／ダクネス）", "スマホ＋PC のクロスプラットフォーム展開、PC 版は DMM GAMES"],
        synopsis: "「異世界トラブル生活 RPG」と銘打ち、カズマと仲間たちの騒がしい日常と成り行き任せの冒険を描く。既存のアニメや原作のエピソードをなぞるのではなく、原作世界観の上に書き下ろされた新規の物語となる。",
        cast: "カズマ：福島潤／アクア：雨宮天／めぐみん：高橋李依／ダクネス：茅野愛衣（アニメ版から続投）"
      },
      news: [
        { source: "KADOKAWA 公式作品サイト", url: "https://konosuba-machisuba.com/" },
        { source: "Yomimono（PC 版 DMM GAMES 配信決定・TGS2026 ステージ情報／4Gamer・電ファミ・Game Spark・INSIDE の4社を出典）", url: "http://yomimono.id/konosuba-game-machisuba-pc-version-heads-to-dmm-games" },
        { source: "Anime United（KADOKAWA 発表・キャスト・世界観の整理）", url: "https://www.animeunited.com.br/noticias/ultimas/konosuba-novo-rpg-machisuba-4a-temporada-anime" }
      ],
      videos: [
        { label: "公式作品サイト（ティザー PV・キービジュアルを公開）", platform: "官方站", url: "https://konosuba-machisuba.com/" },
        { label: "Yomimono 报道（PC 版 DMM GAMES 配信决定＋9/20 TGS2026 特别舞台）", platform: "媒体", url: "http://yomimono.id/konosuba-game-machisuba-pc-version-heads-to-dmm-games" }
      ],
      hype: {
        score: 72,
        signals: [
          "アニメ10周年イベントで発表され、原作小説はシリーズ累計 1,000 万部超。同時に TV アニメ第 4 期（2027年）も告知され IP の勢いが高い",
          "原作者・暁なつめ がストーリー監修、原作イラストの三嶋くろね が製作協力、主要声優 4 名が続投と、原作準拠の体制が明示されている",
          "TGS2026 の DMM GAMES ブースで 9/20 15:00 から特別ステージを実施し、カズマ役の福島潤と KADOKAWA プロデューサーが登壇予定",
          "前作『ファンタスティックデイズ』が 2025 年初頭にサービス終了しており、シリーズのスマホ復帰作として既存ファンの関心が集まっている"
        ]
      },
      tags: ["IP授权", "手游", "跨平台", "KADOKAWA", "TGS2026"]
    },

    {
      id: "stranger-than-heaven",
      company: "SEGA",
      companyJp: "株式会社セガ（開発：龍が如くスタジオ）",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09-16（TGS2026 開幕之夜生配信で約10分の冒頭映像・発売日・キャストを公開）",
      capturedAt: "2026-09-17",
      title: { jp: "STRANGER THAN HEAVEN", cn: "异于天堂", en: "Stranger Than Heaven" },
      genre: "ストリートアクションアドベンチャー（多時代クロニクル）",
      platforms: ["PS5", "Xbox Series X|S", "PC(Steam)"],
      release: "2027-01-15（Game Pass 同時配信）",
      releasePrecision: "日",
      summary: "SEGA 旗下龍が如くスタジオ（曾用代号 Project Century）在 TGS2026 开幕之夜生配信中公开约 10 分钟的序章影像，并首次确定发售日为 2027 年 1 月 15 日，登陆 PS5／Xbox Series X|S／PC(Steam) 并同步加入 Game Pass。作品以日本近代史为舞台，横跨 1915 年福冈小仓、1929 年广岛吴市、1943 年大阪浪速区、1951 年静冈热海，以及 1965 年东京新宿的虚构街区神室町。主角大东诚为日美混血，故事讲述无家可归者在半个世纪里寻找归属的挣扎。",
      highlight: "如龙工作室彻底离开现代日本：五个时代、五个地域，并用已故演员菅原文太的 CG 形象做角色，取得其家族与东映的正式授权。",
      news: [
        { source: "Anime News Network（TGS2026 Special Opening Night 直播内容）", url: "https://animenewsnetwork.com/news/2026-09-16/stranger-than-heaven-game-video-previews-opening-showbiz-combat/.241858" },
        { source: "Game8（开场影像与难度模式试玩解析）", url: "https://game8.co/articles/latest/stranger-than-heaven-sees-makoto-daito-eat-garbage-and-fight-police-in-intro-story-reveal" }
      ],
      videos: [
        { label: "Anime News Network 报道（含 TGS2026 开幕之夜公开的开场影像与官方评述）", platform: "媒体", url: "https://animenewsnetwork.com/news/2026-09-16/stranger-than-heaven-game-video-previews-opening-showbiz-combat/.241858" },
        { label: "Game8 报道（含序章求生玩法与警察冲突实机画面说明）", platform: "媒体", url: "https://game8.co/articles/latest/stranger-than-heaven-sees-makoto-daito-eat-garbage-and-fight-police-in-intro-story-reveal" }
      ],
      hype: {
        score: 89,
        signals: [
          "『龍が如く』ブランドを持つ RGG Studio の完全新規 IP で、TGS2026 開幕之夜の目玉として扱われた。発表直後に日米の主要媒体が一斉に報じている",
          "テーマ曲に Snoop Dogg、藤原聡、Ado、Tori Kelly が参加し、キャストに城田優・大塚明夫ら実力派が並ぶクロスメディア的な話題性がある",
          "菅原文太の CG キャラクター起用について、遺族の正式承諾と東映の素材提供を得たことを SEGA が明言しており、二次的なニュース価値が高い",
          "発売日が 2027-01-15 と具体化し、Netflix 実写映画化も進行中"
        ]
      },
      tags: ["新IP", "主机", "TGS2026", "SEGA", "龙が如くスタジオ"]
    },

    {
      id: "akiba-lost",
      company: "IzanagiGames",
      companyJp: "株式会社イザナギゲームズ（共同製作：日本テレビ／AX-ON）",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09-16（発売前日の特別トレーラー公開）",
      capturedAt: "2026-09-17",
      title: { jp: "AKIBA LOST（アキバロスト）", cn: "秋叶原迷踪", en: "AKIBA LOST" },
      genre: "長編実写群像マルチアングル ADV（サスペンス）",
      platforms: ["Nintendo Switch", "Nintendo Switch 2", "PS5", "PC(Steam)"],
      release: "2026-09-17（発売済み）",
      releasePrecision: "已发售",
      summary: "IzanagiGames 与日本电视台、AX-ON 共同制作的长篇实拍群像悬疑游戏，9 月 17 日发售，登陆 Nintendo Switch／Switch 2／PS5／Steam。故事围绕 13 年前秋叶原六名少女失踪的未解悬案「秋叶原神隐」，天才创作者新城大辉（北山宏光饰）宣布以此为题材制作游戏，随即再次发生失踪与威胁电话。玩法为可自由切换主角与六名女主角视角的「zapping」多视角叙事，选择会改变人物关系与事件走向，并包含「冻结系统」（某角色线暂停时推其他角色线来解冻）与 360 度相机调查。官方在发售前一天公开的特别预告明确标注「与剧版内容完全不同」。",
      highlight: "先播 6 集日剧、再卖游戏，却在发售前一天明说「游戏和剧完全不一样」：多视角分支＋冻结系统是剧版线性叙事做不到的部分。",
      news: [
        { source: "Quest Board.JP（发售日・价格・TGS2026 出展与玩法解析）", url: "https://quest-board.jp/en/quests/akiba-lost" },
        { source: "官方作品站", url: "https://akibalost.com/" }
      ],
      videos: [
        { label: "Quest Board.JP 报道（含发售前日特别预告的影像内容说明与玩法截图）", platform: "媒体", url: "https://quest-board.jp/en/quests/akiba-lost" },
        { label: "官方作品站（预告影像・追加情报）", platform: "官方站", url: "https://akibalost.com/" }
      ],
      hype: {
        score: 63,
        signals: [
          "日本テレビ・AX-ON との共同製作で、2026 年 1 月からドラマ版全 6 話が日本テレビ系で放送済み。ゲーム販売前にテレビで認知を作る異例の順序が話題になった",
          "北山宏光（元 Kis-My-Ft2）主演に加え、松村沙友理・小栗有以（AKB48）・宇垣美里ら出演陣が揃い、実写ゲームとしてのキャスト露出が大きい",
          "日本ゲーム大賞 2025 フューチャー部門を受賞しており、発売前から業界内の評価が高い",
          "TGS2026 に 30 台の試遊台を出展。ビジネスデイ初日から体験枠が用意されている"
        ]
      },
      tags: ["实拍ADV", "主机", "多视角", "IzanagiGames", "日本テレビ"]
    },

    {
      id: "melty-blood-twi-lumina",
      company: "Aniplex",
      companyJp: "株式会社アニプレックス（開発：FRENCH-BREAD）",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09-12（発売日決定・新 PV 公開）",
      capturedAt: "2026-09-17",
      title: { jp: "MELTY BLOOD: TWI-LUMINA", cn: "月姬格斗 TWI-LUMINA", en: "MELTY BLOOD: TWI-LUMINA" },
      genre: "2D 対戦格闘",
      platforms: ["PS5", "PS4", "Nintendo Switch 2", "Nintendo Switch", "Xbox One", "PC(Steam)"],
      release: "2027-04-22",
      releasePrecision: "日",
      summary: "TYPE-MOON《月姬》世界观下的 2D 对战格斗系列新作，由 Aniplex 发行、FRENCH-BREAD 开发，9 月 12 日公开新 PV 并确定 2027 年 4 月 22 日发售，登陆 PS5／PS4／Switch 2／Switch／Xbox One／Steam 六个平台。本作是对 2021 年《MELTY BLOOD: TYPE LUMINA》的全面翻新版：奈须蘑菇新写剧本，武内崇负责角色设计，新角色「莲」参战，并首次公开武内崇绘制的「白莲」。战斗系统追加 Act／Duel 两种操作模式与强化的 Rapid Beat，让不擅长指令输入的玩家也能上手。",
      highlight: "对 2021 年版的「翻新而非续作」：奈须新写剧本＋武内崇角色，用 Act／Duel 双操作模式把格斗门槛降给新玩家。",
      news: [
        { source: "Games Press（Aniplex 官方新闻稿全文，含发售日・平台・官方站・预告片地址）", url: "https://www.gamespress.com/ru/New-Entry-in-MELTY-BLOOD-Series-2D-Fighter-MELTY-BLOOD-TWI-LUMINA-To-B" },
        { source: "Yomimono（発売日PV・操作モード・TGS2026 試遊／ANN・4Gamer・GAME Watch・Automaton を出典）", url: "https://www.yomimono.id/melty-blood-twi-lumina-sets-april-22-2027-release-and-white-len" }
      ],
      videos: [
        { label: "発売日発表トレーラー（Aniplex 官方新闻稿刊载的正式预告片）", platform: "YouTube", url: "https://youtu.be/901ronfe540" },
        { label: "公式サイト（MELTY BLOOD: TWI-LUMINA 英文官方站）", platform: "官方站", url: "http://meltyblood.twilumina-en.com/" },
        { label: "Steam 商店页（可查看预告影像与截图）", platform: "Steam", url: "https://store.steampowered.com/app/4113000/MELTY_BLOOD_TWILUMINA/" }
      ],
      hype: {
        score: 66,
        signals: [
          "『メルブラ』シリーズは 2021 年の TYPE LUMINA が 2024 年 6 月時点で 50 万本超を販売、Steam ユーザーレビュー 9,119 件で 88% の好評価を維持しており、続報への待機層が厚い",
          "奈須きのこ（シナリオ）・武内崇（キャラクターデザイン）という原作中核スタッフが揃い、新キャラ「白蓮」の初公開が発表の中心になった",
          "TGS2026（9/17-21）でアニプレックスブース（4号館 04-C04）とハピネットブース（6号館 06-N04）の 2 か所でシリーズ初の一般試遊を実施",
          "対応 6 プラットフォーム・8 言語という幅広い配信体制で、格闘ゲーム市場のグローバル展開を狙っている"
        ]
      },
      tags: ["格斗游戏", "主机", "TYPE-MOON", "アニプレックス", "TGS2026"]
    },

    {
      id: "crazy-taxi-world-tour",
      company: "SEGA",
      companyJp: "株式会社セガ",
      bucket: "new",
      platformClass: "console",
      announceDate: "2026-09-17（TGS2026 プレイアブル出展の詳細とステージ日程を正式発表）",
      capturedAt: "2026-09-17",
      title: { jp: "クレイジータクシー ワールドツアー", cn: "疯狂出租车 世界巡回", en: "Crazy Taxi: World Tour" },
      genre: "オープンワールド・アクションレーシング",
      platforms: ["PS5", "Xbox Series X|S", "Nintendo Switch 2", "PC(Steam)"],
      release: "2027年（具体的な日付は未発表）",
      releasePrecision: "年",
      summary: "SEGA 重启《疯狂出租车》系列的全新作，由系列创作者菅野健二回归执导。玩家驾驶主角 Axel 的出租车穿越五座世界城市，追查偷走其出租车的蒙面国际团伙，途中包含高空特技、载客与零工挑战。除单人剧情外提供跨平台多人对战，含 Pickup Race 与 Cops 'N' Cabbies 两种模式，均支持排位自动匹配与可调整规则的自定义房间，另保留经典计时赛 Arcade Mode 与车辆改装。9 月 17 日起在幕张展览馆 SEGA/ATLUS 展位（4 号馆 N01）提供试玩，并设等身大出租车摄影点与方向盘式街机试玩台。",
      highlight: "系列创始人菅野健二回归，并在 TGS 现场用方向盘式街机台＋等身大出租车把「街机厅记忆」做成展位主体。",
      news: [
        { source: "Notebookcheck（TGS2026 出展确认・玩法与舞台日程）", url: "https://www.notebookcheck.net/Crazy-Taxi-World-Tour-confirmed-playable-at-Tokyo-Game-Show-2026.1400917.0.html" }
      ],
      videos: [
        { label: "Notebookcheck 报道（含 SEGA 官方 TGS 试玩台与舞台节目说明）", platform: "媒体", url: "https://www.notebookcheck.net/Crazy-Taxi-World-Tour-confirmed-playable-at-Tokyo-Game-Show-2026.1400917.0.html" }
      ],
      hype: {
        score: 61,
        signals: [
          "2000 年前後のアーケード／ドリームキャスト期の記憶を持つ層が厚く、シリーズ復活そのものが話題になっている",
          "シリーズ生みの親である菅野健二の監督復帰が正式に告知され、オリジナルの音楽（The Offspring「All I Want」）を使った初公開映像も反響を呼んだ",
          "9/11-13 にクローズドネットワークテストを先行実施し、TGS2026 では 9/17 と 9/19 に 2 本のステージイベントを予定",
          "発売は 2027 年で具体日は未発表のため、期待度は現時点では中位に留まる"
        ]
      },
      tags: ["系列复活", "主机", "TGS2026", "SEGA"]
    }
  ],

  /* ---------------------------------------------------------
   * C. 厂商监测名单 — 按用户指定清单建档（50 社 + 6 社补充）
   *    status: covered 已建作品卡 / partial 部分覆盖 / watch 待观察
   *    focus:  true 标记为本职业务直接相关，优先补卡
   * ------------------------------------------------------- */
  companies: {
    asOf: "2026-09-17",
    listTotal: 50,
    categories: [
      {
        key: "major",
        label: "大手パブリッシャー",
        sub: "コンシューマー・アーケード中心",
        items: [
          { name: "任天堂株式会社", short: "Nintendo", status: "covered", gameIds: ["metroid-ravenous", "zelda-oot-remake", "xenoblade-genesis", "splatoon-raiders"] },
          { name: "株式会社ソニー・インタラクティブエンタテインメント", short: "SIE", status: "watch", note: "本社位于美国加州，本台按其日系阵营属性纳入观察；PS 平台作品已散见于各条目" },
          { name: "株式会社セガ", short: "SEGA", status: "covered", note: "子会社 ATLUS 已建卡并标注 ATLUS（SEGA）；9/16 の TGS2026 開幕之夜で龍が如くスタジオの完全新規 IP『STRANGER THAN HEAVEN』（2027-01-15）が、9/17 には『クレイジータクシー ワールドツアー』の TGS プレイアブル出展が確定し、本体側も covered へ", gameIds: ["persona-6", "persona-4-revival", "stranger-than-heaven", "crazy-taxi-world-tour"] },
          { name: "株式会社バンダイナムコエンターテインメント", short: "Bandai Namco", status: "covered", gameIds: ["idolmaster-sidem-console", "blood-of-dawnwalker", "onepiece-marine-gourmet", "bleach-mirrors-high", "digimon-up", "ace-combat-8-wings-of-theve", "dragon-ball-xenoverse-3"] },
          { name: "株式会社スクウェア・エニックス", short: "Square Enix", status: "covered", gameIds: ["ff7-revelation", "ff-resonance", "kingdom-hearts-4", "dq-monsters-withered-world"] },
          { name: "株式会社カプコン", short: "Capcom", status: "covered", gameIds: ["mhw-switch2-ascendance", "onimusha-way-of-the-sword", "mega-man-dual-override", "dragon-dogma-2-dark-arisen"], note: "9/16 23:00 JST の「Capcom Spotlight | TGS 2026」で Monster Hunter Wilds: Ascendance／Dragon's Dogma 2: Dark Arisen／Mega Man: Dual Override／Street Fighter 6 の 4 本を扱う。9/9 の Nintendo Direct で『ロックマン デュアルオーバーライド』の 2027 年春発売が確定、9/1 には『ドラゴンズドグマ 2 ダークアリズン』の遺物遠征サイクルを公開した" },
          { name: "株式会社コナミデジタルエンタテインメント", short: "KONAMI", status: "covered", gameIds: ["rhapsody-in-scarlet", "project-zircon", "rev-noir", "suikoden-star-leap"] },
          { name: "株式会社コーエーテクモゲームス", short: "Koei Tecmo", status: "covered", gameIds: ["wo-long-2-wings-of-ember"], note: "Team NINJA の『Wo Long 2: Wings of Ember』を 2027-03-04 に世界同時発売決定（9/16、TGS2026 開幕前夜に発表）。シリーズ第 1 作は 2023 年 3 月の『Wo Long: Fallen Dynasty』" }
        ]
      },
      {
        key: "strong",
        label: "有力パブリッシャー・著名デベロッパー",
        sub: "",
        items: [
          { name: "株式会社アトラス", short: "ATLUS", status: "covered", gameIds: ["persona-6", "persona-4-revival"] },
          { name: "株式会社フロム・ソフトウェア", short: "FromSoftware", status: "covered", gameIds: ["the-duskbloods"] },
          { name: "株式会社レベルファイブ", short: "LEVEL-5", status: "covered", gameIds: ["professor-layton-new-world-of-steam", "layton-curious-village-remake", "yokai-watch-2-hadou", "inazuma-eleven-bold-revolution", "holy-horror-mansion", "decapolice", "snack-world-reloaded", "puchipoyon-fantasy-world", "inazuma-eleven-cross"], note: "9/10「LEVEL5 VISION 2026 II 夢」一次公布 10 个标题，本台为其建卡 8 件（主机/PC 6＋手游 2）" },
          { name: "株式会社日本一ソフトウェア", short: "Nippon Ichi", status: "covered", gameIds: ["honogurashi-no-niwa"], note: "《ほの暮しの庭》7/30 発売・国内累計20万本突破。《GOBBLE》(9/24) 尚未建卡" },
          { name: "株式会社スパイク・チュンソフト", short: "Spike Chunsoft", status: "watch" },
          { name: "株式会社マーベラス", short: "Marvelous", status: "covered", gameIds: ["eternal-anima", "shinobi-nexus-senran-kagura", "oboromuramasa-kaikitan"], note: "子会社 HONEY∞PARADE GAMES が『シノビNEXUS –閃乱カグラ–』を企画（事前登録中）。9/10 に『朧村正怪奇譚』（ヴァニラウェア開発）を 2027-02-04 発売で発表" },
          { name: "アイディアファクトリー株式会社", short: "Idea Factory", status: "watch", note: "《BLACK WOLVES SAGA》(9/10) 已出现于发售清单，尚未建卡" },
          { name: "日本ファルコム株式会社", short: "Nihon Falcom", status: "covered", gameIds: ["trails-2nd-chapter", "kyoto-xanadu"] },
          { name: "プラチナゲームズ株式会社", short: "PlatinumGames", status: "watch" },
          { name: "株式会社SNK", short: "SNK", status: "watch" },
          { name: "株式会社ゲームフリーク", short: "GAME FREAK", status: "covered", gameIds: ["ame-nochi-hare-onna", "pokemon-winds-waves", "beast-of-reincarnation"], note: "『Beast of Reincarnation』(8/4) は同社初の非ポケモン AAA 作品" },
          { name: "株式会社ハル研究所", short: "HAL Laboratory", status: "covered", gameIds: ["kirby-world-beyond"] },
          { name: "株式会社トーセ", short: "TOSE", status: "watch" },
          { name: "株式会社イルカ", short: "Iruka", status: "watch" },
          { name: "株式会社コジマプロダクション", short: "Kojima Productions", status: "watch" },
          { name: "株式会社ディンプス", short: "DIMPS", status: "covered", gameIds: ["dragon-ball-xenoverse-3"], note: "『ドラゴンボール ゼノバース3』の開発を担当（販売はバンダイナムコエンターテインメント、2027 年発売予定）。同シリーズは第 1 作から継続して開発に関与している" }
        ]
      },
      {
        key: "mobile",
        label: "スマートフォン・ソーシャルゲーム・オンラインゲーム企業",
        sub: "",
        items: [
          { name: "株式会社Cygames", short: "Cygames", status: "partial", note: "仅子会社 Cygames Edge 建卡；Cygames 本体待补。9/14〜15 に中小規模タイトル向けの新ブランド構想が報じられた（『8 番出口』型の単規則短編が市場で成立したことへの対応）", gameIds: ["where-the-seeds-fall"] },
          { name: "株式会社ラセングル", short: "Lasengle", status: "watch", focus: true },
          { name: "株式会社WFS", short: "Wright Flyer Studios", status: "covered", gameIds: ["another-eden-begins"], note: "『アナザーエデン 時空を超える猫』の第 1 部を買い切り JRPG として作り直した『Another Eden Begins』を 9/17 に発売（Switch 2／Switch／Steam）。ガチャを完全撤廃" },
          { name: "株式会社マイネット", short: "mynet", status: "watch" },
          { name: "株式会社ブシロード", short: "Bushiroad", status: "covered", gameIds: ["weiss-schwarz-online"], focus: true, note: "看板 TCG『ヴァイスシュヴァルツ』のデジタル版『ヴァイスシュヴァルツ オンライン』を 2027 年春に Switch／Steam で発売予定。9/15 に Steam ストアページを公開しウィッシュリスト登録を開始、TGS2026 は 6 号館 C01 で初の試遊を実施" },
          { name: "グリー株式会社", short: "GREE", status: "covered", gameIds: ["mushoku-tensei-chronicle-of-echoes"], note: "子会社グリーエンターテインメントが『無職転生 クロエコ』を企画・配信（7/27 配信開始）" },
          { name: "株式会社アカツキゲームス", short: "Akatsuki Games", status: "covered", gameIds: ["kaiju-no-8-the-game"], note: "東宝・プロダクション・アイジーと共同企画・制作する『怪獣８号 THE GAME』を開発・運営（2025-08-31 世界同時サービス開始、2026-09-01 に 1 周年とメインストーリー第 2 部）" },
          { name: "株式会社コロプラ", short: "COLOPL", status: "covered", gameIds: ["active-cinema-rpg-369"] },
          { name: "株式会社MIXI", short: "MIXI", status: "watch" },
          { name: "株式会社ディー・エヌ・エー", short: "DeNA", status: "watch" },
          { name: "ガンホー・オンライン・エンターテイメント株式会社", short: "GungHo", status: "covered", gameIds: ["blue-nova"] },
          { name: "KLab株式会社", short: "KLab", status: "covered", gameIds: ["mha-united-survival"], note: "『僕のヒーローアカデミア UNITED SURVIVAL』を gumi と共同開発（8/6 全世界配信）" },
          { name: "株式会社バンク・オブ・イノベーション", short: "Bank of Innovation", status: "watch" },
          { name: "ワンダープラネット株式会社", short: "WonderPlanet", status: "watch" },
          { name: "株式会社アピリッツ", short: "Appirits", status: "watch" },
          { name: "株式会社Aiming", short: "Aiming", status: "covered", gameIds: ["inazuma-eleven-cross", "eminence-in-shadow-phantom-echoes"], note: "LEVEL-5 との共同タイトル『イナズマイレブン クロス』を開発・運営（6/9 サービス開始、6/22 に100万DL突破）。自社スタジオ Team CARAVAN が『陰の実力者になりたくて！ ファントムエコーズ』を開発し、スマホ中心の事業からコンシューマ 3D アクションへ領域を広げる（2027 年発売予定、KADOKAWA が原作監修）" }
        ]
      },
      {
        key: "ip",
        label: "IP管理・エンターテインメント・その他開発スタジオ",
        sub: "",
        items: [
          { name: "株式会社アニプレックス", short: "Aniplex", status: "covered", focus: true, gameIds: ["re-survival-unit", "fate-extra-record", "melty-blood-twi-lumina"], note: "『BIOHAZARD Survival Unit』の配信元（開発は JOYCITY、Capcom は IP 監修）。2025-11-18 に世界 151 の国と地域でサービス開始済み。『Fate/EXTRA Record』（2027-01-28）と『MELTY BLOOD: TWI-LUMINA』（2027-04-22、開発 FRENCH-BREAD）も当社発売。TGS2026 は 4 号館 04-C04 に出展し、両作を試遊出展" },
          { name: "有限会社ノーツ", short: "Notes / TYPE-MOON", status: "watch", focus: true },
          { name: "株式会社カヤック", short: "Kayac", status: "watch" },
          { name: "株式会社トイロジック", short: "Toylogic", status: "watch" },
          { name: "株式会社ヘキサドライブ", short: "HexaDrive", status: "watch" },
          { name: "あまた株式会社", short: "Amata", status: "watch" },
          { name: "株式会社イザナギゲームズ", short: "IzanagiGames", status: "covered", gameIds: ["akiba-lost"], note: "『AKIBA LOST』（2026-09-17 発売、日本テレビ／AX-ON との共同製作）を建卡。実写 ADV を軸に据える独立系で、日本テレビと組んでドラマ先行→ゲームという順序を取った点が特徴" },
          { name: "株式会社インティ・クリエイツ", short: "Inti Creates", status: "watch", note: "TGS2026 Famitsu 直播环节已提及，尚未建卡" },
          { name: "ポリゴンマジック株式会社", short: "Polygon Magic", status: "watch" },
          { name: "株式会社ビジュアルアーツ", short: "VisualArts", status: "watch" }
        ]
      }
    ],
    extra: {
      label: "指定清单外 · 补充监测",
      note: "以下厂商不在指定清单内，但本期已有实际新作动态，或为新手游发行方，故纳入监测。",
      items: [
        { name: "松竹株式会社 ゲーム事業室", short: "松竹ゲームズ", status: "covered", gameIds: ["shochiku-tgs-2026"] },
        { name: "株式会社産経デジタル「HYPER REAL」", short: "HYPER REAL", status: "covered", gameIds: ["hyperreal-tgs-new"] },
        { name: "株式会社グッドスマイルカンパニー", short: "Good Smile", status: "covered", gameIds: ["patlabor-the-case-files"] },
        { name: "株式会社インテリジェントシステムズ", short: "Intelligent Systems", status: "covered", gameIds: ["fire-emblem-fortunes-weave"] },
        { name: "株式会社モノリスソフト", short: "Monolith Soft", status: "covered", gameIds: ["xenoblade-genesis"] },
        { name: "株式会社ポケモン", short: "The Pokémon Company", status: "covered", gameIds: ["pokemon-winds-waves"] },
        { name: "株式会社KMS（K3 Studio）", short: "KMS", status: "covered", gameIds: ["alchemist-portmasters"] },
        { name: "株式会社Rudel", short: "Rudel", status: "covered", gameIds: ["sakamoto-days-rogue-dawn"] },
        { name: "NHNプレイアート株式会社", short: "NHN PlayArt", status: "covered", gameIds: ["touken-ranbu-pazugiri", "over-rush", "puchipoyon-fantasy-world"], note: "TGS2026 に8年ぶり出展し新作3本を同時公開。『幻想世界のぷちぽよん』は LEVEL-5 との共同タイトル、『刀剣乱舞 ぱずぎり』はパズル部分の開発を担当" },
        { name: "TOHO Games（東宝株式会社）", short: "TOHO Games", status: "covered", gameIds: ["haikyu-all-challengers"], focus: true, note: "动画『ハイキュー!!』のIP保有元が自らゲーム事業ブランドを運営。IP ホルダー直営のため監修業務と直結" },
        { name: "株式会社カイロソフト", short: "カイロソフト", status: "covered", gameIds: ["onepiece-marine-gourmet"], focus: false, note: "日本 IP（ONE PIECE）との初コラボを万代南梦宫と共同で担当" },
        { name: "カバー株式会社", short: "COVER", status: "covered", gameIds: ["hololive-dreams"], note: "女性VTuberグループ「hololive」運営元。初の公式スマホゲームを QualiArts と共同開発" },
        { name: "株式会社QualiArts", short: "QualiArts", status: "covered", gameIds: ["hololive-dreams"], note: "サイバーエージェント連結子会社。『hololive Dreams』の開発・配信元" },
        { name: "株式会社enish", short: "enish", status: "covered", gameIds: ["yowamushi-pedal-resonance-pedaism"], note: "東証グロース上場。Gホールディングスと共同で『弱虫ペダル』新作アプリを運営" },
        { name: "株式会社gumi", short: "gumi", status: "covered", gameIds: ["mha-united-survival"], note: "KLab と共同で『僕のヒーローアカデミア UNITED SURVIVAL』を開発" },
        { name: "株式会社HONEY∞PARADE GAMES", short: "HONEY∞PARADE GAMES", status: "covered", gameIds: ["shinobi-nexus-senran-kagura"], note: "マーベラスグループ。『閃乱カグラ』シリーズのアプリ開発を担当" },
        { name: "株式会社アソビモ", short: "ASOBIMO", status: "covered", gameIds: ["mushoku-tensei-chronicle-of-echoes"], note: "『無職転生 クロエコ』の開発・運営を担当" },
        { name: "株式会社アークシステムワークス", short: "Arc System Works", status: "covered", gameIds: ["marvel-tokon-fighting-souls"], note: "『MARVEL Tōkon: Fighting Souls』を開発（販売は PlayStation Publishing）" },
        { name: "株式会社集英社ゲームズ", short: "Shueisha Games", status: "covered", gameIds: ["unme", "jujutsu-kaisen-rumble-survivaton"], note: "集英社のゲームパブリッシングブランド。新作『UN:Me』に加え、『呪術廻戦 RUMBLE: SURVIVATON』（開発：poncle）を 2027 年に発売延期。TGS2026 は 5 号館 05-C10 で両作の体験版を出展" },
        { name: "BOUNTYKINDS SOLUTIONS INC.", short: "BOUNTYKINDS", status: "covered", gameIds: ["exe-arena"], note: "2022年設立。同名のブロックチェーンゲーム『Bountykinds』を運営。『EXE ARENA』は2026年10月リリース予定で TGS2025・2026 と2年連続出展（所在地・資本関係は未確認）" },
      { name: "CTW株式会社", short: "CTW", status: "covered", gameIds: ["shakugan-no-shana-blaze-edge", "scimagic-g123"], note: "ダウンロード不要のブラウザゲームプラットフォーム「G123」を運営。アニメ IP を題材にした放置型 RPG を継続的に投入しており、9/14 に『灼眼のシャナ ブレイズエッジ』を 4 言語で同時配信開始。9/15 には G123 では珍しい自社オリジナル IP『サイマジック 魔法世界のバグ、科学で直します！』の事前登録を開始し、IP ライセンス依存からの脱却を試す" },
      { name: "株式会社Plott", short: "Plott", status: "covered", gameIds: ["blackchannel-blaze-road"], note: "ゲームの企画・開発を手がけてきたスタジオが自社パブリッシングへ広げた事例。YouTube アニメ『ブラックチャンネル』（チャンネル登録者 130 万人超、小学館）の初のスマートフォンゲーム化を 9/14 に配信開始" },
      { name: "株式会社KADOKAWA", short: "KADOKAWA", status: "covered", gameIds: ["konosuba-machisuba"], note: "指定 50 社には含まれないが、IP ホルダー自身が企画・配信を主導するスマホ新作『この素晴らしい世界に祝福を！～この愛すべき街に繁栄を！～』（まちすば、2026 年内 / iOS・Android・PC、PC 版は DMM GAMES）が窓内で発表されたため補充監視に追加。原作小説はシリーズ累計 1,000 万部超" }
      ]
    }
  },

  /* ---------------------------------------------------------
   * D. 期待榜 — Famitsu 读者期待榜（2026-09-13 发表）
   * ------------------------------------------------------- */
  mostWanted: {
    asOf: "2026-09-13（投票区间 2026-08-26 ~ 2026-09-01）",
    source: "Famitsu 週刊ファミ通 读者期待榜",
    url: "https://nintendoeverything.com/famitsus-most-wanted-games-september-13-2026",
    list: [
      { rank: 1, title: "Pokemon Winds / Waves", platform: "NS2", votes: 657 },
      { rank: 2, title: "Fire Emblem: Fortune's Weave", platform: "NS2", votes: 504 },
      { rank: 3, title: "Persona 6", platform: "PS5", votes: 466 },
      { rank: 4, title: "Persona 4 Revival", platform: "PS5", votes: 440 },
      { rank: 5, title: "Zelda: Ocarina of Time", platform: "NS2", votes: 424 },
      { rank: 6, title: "Final Fantasy 7 Revelation", platform: "PS5", votes: 257 },
      { rank: 7, title: "Xenoblade Genesis", platform: "NS2", votes: 235 },
      { rank: 8, title: "Grand Theft Auto 6", platform: "PS5", votes: 233 },
      { rank: 9, title: "Dragon Quest Monsters: The Withered World", platform: "NS2", votes: 228 },
      { rank: 10, title: "Final Fantasy Resonance", platform: "NS2", votes: 186 },
      { rank: 11, title: "Trails in the Sky 2nd Chapter", platform: "PS5", votes: 180 },
      { rank: 17, title: "The Duskbloods", platform: "NS2", votes: 92 },
      { rank: 22, title: "Kingdom Hearts 4", platform: "PS5", votes: 76 }
    ]
  },

  /* ---------------------------------------------------------
   * D. TGS2026 前瞻 — 2026-09-17 ~ 09-21 幕張メッセ
   * ------------------------------------------------------- */
  tgs: {
    dates: "2026-09-17 ~ 2026-09-21",
    venue: "幕張メッセ（千葉）",
    theme: "長い5日間、遊びつくせ。／ Longest Five Days of Nonstop Play",
    note: "TGS 30 周年，史上首次 5 日举办。9/17-18 商务日，9/19-21 公众日（9/21 为日本节假日，至 16:00）。已于 2026-09-17 开幕；主办方 CESA 公布本届为史上最大规模（759 家出展社・51 个国家・3,946 个展位，另有统计口径为 1,138 家・53 个国家），预计到场约 30 万人。",
    booths: [
      { company: "Square Enix", hall: "—", items: "FF7 Revelation（可试玩）、Final Fantasy Resonance（可试玩）、Kingdom Hearts IV（仅展示）、DQ VII Reimagined Family Game Park 试玩" },
      { company: "KONAMI", hall: "—", items: "SILENT HILL: Townfall 沉浸式影院体验（9/19 特别节目）、Castlevania: Belmont's Curse 直播、幻想水滸伝 STAR LEAP 官方直播" },
      { company: "GungHo", hall: "06-C06", items: "B.L.U.E. NOVA 出展，放映完整版预告与 TGS 限定影像，先到先得限定周边" },
      { company: "松竹ゲームズ", hall: "04-C02", items: "11 款作品试玩，含《ムーミン:ムーミン谷の夏まつり》" },
      { company: "HYPER REAL", hall: "02-C14", items: "6 款作品试玩，含日本首发《NAME OF THE WILL》《Helcast》" },
      { company: "Game Freak", hall: "—", items: "《雨のちハレ女》重点展示" },
      { company: "Netmarble", hall: "—", items: "Shangri-La Frontier: The Seven Colossi 首次公开试玩、我独自升级 KARMA、Pearl in Blue" },
      { company: "Famitsu × 電撃ゲームス", hall: "FamitsuTUBE（YouTube）", items: "9/19-20 18:00 起特别直播，Capcom / INTI CREATES / ATLUS / SEGA 等轮番登场" },
      { company: "NHN PlayArt", hall: "2 号馆", items: "时隔 8 年重返 TGS，展出 7 款作品，其中 3 款新作首次公开（刀剣乱舞 ぱずぎり / OVER RUSH / 幻想世界のぷちぽよん）。另展出 DISSIDIA DUELLUM FINAL FANTASY、妖怪ウォッチ ぷにぷに、#コンパス、LINE: Disney Tsum Tsum。每日先到先得发放限定肩包，完成各展台任务集章可换限定卡组" },
      { company: "DMM GAMES", hall: "—", items: "刀剣乱舞 ぱずぎり 提供试玩与赠品活动；9/20 15:40 主舞台举办特别舞台（鳥海浩輔・濱健人・田所陽向＋小坂崇氣／伊藤真和），并同步线上直播" },
      { company: "集英社ゲームズ", hall: "5 号馆 05-C10", items: "《咒术回战 RUMBLE: SURVIVATON》与《UN:Me》两作首次提供试玩，通关条件可获原创周边；《咒术回战》为全球首次公开试玩，8 名 Boss 全部可打，比赛在展台屏幕直播并配电竞解说，愿望单登记或试玩可获像素贴纸与纸扇套装" },
      { company: "SEGA / ATLUS（Sega Partners Corner）", hall: "4 号馆 N01", items: "《电锯甜心》（Lollipop Chainsaw）系列未定名新作首个可玩 Demo，4 台试玩机；主角 Juliet 换新装，展台设等身大电锯摄影区，官方大使 PeachMilky 到场。9/18 11:40 展台舞台、9/19 9:40 主舞台各有一场节目，主舞台场次预计公布重要企划。同展位另出展《クレイジータクシー ワールドツアー》（可玩 Demo＋等身大出租车摄影点＋方向盘街机试玩台，9/17 Mission Challenge、9/19 Demo Playthrough 两场舞台）。此外 9/16 的「TGS2026 Special Opening Night」直播中，龍が如くスタジオ新作《STRANGER THAN HEAVEN》公开约 10 分钟开场影像并确定 2027-01-15 发售" },
      { company: "IzanagiGames", hall: "—", items: "《AKIBA LOST》（2026-09-17 发售）设 30 台试玩机，为发售当日开始的实拍悬疑 ADV 提供大规模试玩。作品由 IzanagiGames 与日本テレビ／AX-ON 共同製作，剧版全 6 话已于 2026 年 1 月起在日本电视台系播出" },
      { company: "ハピネット", hall: "—", items: "《機動警察パトレイバー the Case Files》试玩，体验者赠特製ステッカー. PS5 版已于 9/15 进入早期访问，PC 版 9/17 发售" },
      { company: "Capcom", hall: "—", items: "TGS2026 开幕前夜 9/16 23:00（JST）上线约 40 分钟的官方节目「Capcom Spotlight | TGS 2026」，官方 YouTube・X・TikTok 与 TGS 官方 YouTube 同步配信，字幕 13 语言。本轮公开的 4 款为 Monster Hunter Wilds: Ascendance／Dragon's Dogma 2: Dark Arisen／Mega Man: Dual Override／Street Fighter 6" },
      { company: "バンダイナムコエンターテインメント", hall: "—", items: "《ドラゴンボール ゼノバース3》实施日本国内首次试玩（以ブロリー战为题材）。本作 9/3 的 State of Play 公布自定义预告，2027 年发售" },
      { company: "アニプレックス", hall: "4 号館 04-C04", items: "《Fate/EXTRA Record》（2027-01-28）出展可操作 3 体サーヴァント的试玩版。此前 9/9 セイバー、9/12 アーチャー、9/14 キャスター连续三周公开角色 PV。同社另在 4 号館 C04 与 ハピネット 6 号館 N04 两处出展《MELTY BLOOD: TWI-LUMINA》（2027-04-22，開発 FRENCH-BREAD）的系列首次一般试玩——9/12 公开新 PV 并首次披露武内崇绘制的「白蓮」，战斗系统追加 Act／Duel 双操作模式" },
      { company: "ブシロード", hall: "6 号馆 C01", items: "《ヴァイスシュヴァルツ オンライン》首次提供试玩。试玩或出示 Steam 愿望单登记画面，可获「票券风卡片」（BanG Dream! MyGO!!!!! 版／Ave Mujica 版，可自选设计），每人最多 2 张" }
    ]
  },

  /* ---------------------------------------------------------
   * E. 本期综述
   * ------------------------------------------------------- */
  digest: {
    headline: "TGS2026 开幕日：新增 5 条（跨平台手游 1／主机・PC 4），更新 11 条，条目总数 76 → 81，手游区 25 条",
    points: [
      "**手游侧本期最重要的一条不是新作而是进展**：**《雨のちハレ女》**（GAME FREAK）9/16 正式开放事前预约，同步开设官方网站、公开「巡回」「战斗」两张新主视觉、首批游戏画面与主要角色详情，并宣布在 TGS2026 设专用展位。这是本站手游观察里少见的「完全新作原创 IP + 现实天气数据接入」组合，事前登录启动当日即被日台两地媒体同步转述，热度续接至 9/19-21 公众日",
      "**漏收核查（手游侧，本轮查出 1 条并补卡）**：按 IP 名逐个检索近期热门动漫 IP 后，**《この素晴らしい世界に祝福を！～この愛すべき街に繁栄を！～》（まちすば）** 为漏收——KADOKAWA 于 7/26 动画十周年活动上正式发表、同日开放事前登录（iOS／Android，PC 版另定 DMM GAMES），落在滚动窗口内却未被收录，本轮已建卡。同批核查的 呪術廻戦（既有「SURVIVATON」已收录，9/16 仅延期与试玩情报更新）、ONE PIECE（「海のごちそうレストラン」已收录，10/22-23 发售无新变）、鬼滅の刃（仅见韩国厂商手游联动，非日方主导，不收）均无新增漏收。**未建卡待确认 1 条**：一款 9/15 在日本上线的《コードギアス》衍生幸存者动作手游，发行方 JORO 的资本归属未能通过现有来源确认，按「中资红线从严」原则本轮暂不建卡，下轮继续核实",
      "**主机侧本轮最大新闻是 SEGA 的两条**：龍が如くスタジオ完全新 IP **《STRANGER THAN HEAVEN》**（9/16 TGS2026 開幕之夜直播公开约 10 分钟序章影像，确定 2027-01-15、PS5／Xbox／Steam＋Game Pass，横跨 1915 小仓至 1965 神室町五个时代）；以及系列创始人菅野健二回归的 **《クレイジータクシー ワールドツアー》**（9/17 确定 TGS 可玩出展与两场舞台）。SEGA 本体由此从 partial 升为 covered",
      "**另补 3 条主机・PC**：**《AKIBA LOST》**（IzanagiGames×日本テレビ／AX-ON，9/17 发售当日开卖，多视角「zapping」叙事＋冻结系统，剧版先行的播出顺序与「游戏与剧完全不同」的表述都成了话题）；**《MELTY BLOOD: TWI-LUMINA》**（Aniplex 发行／FRENCH-BREAD 开发，9/12 定档 2027-04-22，奈须きのこ 新写剧本＋武内崇角色，TGS 两处展位首次一般试玩）；《Crazy Taxi》见上条",
      "**Capcom 在 9/16 的「Capcom Spotlight | TGS 2026」一次性覆盖 4 款，本轮全部回填**：Monster Hunter Wilds 扩展「Ascendance」公开炎王龙回归与新机制 Boost Bracer，并宣布无需翔虫换武器、可在地图道具箱直接换装等改善同步回本体（Switch 2 版本体 12/04）；Dragon's Dogma 2: Dark Arisen 公开诺尔甘新预告、12 个遗物地牢与伙伴创作的官方 Pawn，并提前开放角色创建工具（含 Switch 2）；Mega Man: Dual Override 深化布鲁斯实机演示，并与 Pragmata 互换联动免费上线「Mega Man Pack」DLC",
      "**Square Enix 侧由 TGS 首日推动三条更新**：**FINAL FANTASY VII REVELATION** 在 TGS2026 开放三部曲终章全球首个可玩 Demo（飞空艇世界地图探索＋Trinity 三人连携战斗）；**FINAL FANTASY RESONANCE** 公开新预告并锁死 2026-10-22 登陆 Switch／Switch 2，eShop 免费试玩版存档可继承；**ドラゴンクエスト** 系列于 9/16 官宣全球累计出货＋数字销量突破 1 亿套（《モンスターズ 朽ちた世界》12/03 发售接棒）。此外 9/17 同日发售的《Fire Emblem フォーチュンズウィーブ》《英雄伝説 空の軌跡 the 2nd》已按「已发售」口径改为 releasePrecision: \"已发售\"",
      "观测窗口自动滑动为 **2026-07-17 ~ 2026-09-17（滚动最近 2 个月）**，条目总数 76 → 81（手游区 24 → 25，含跨平台 8；主机・PC 区 59 → 64，跨平台同时计入两区），本轮 `bucket=new` 5 条・`bucket=update` 11 条，其余 65 条 `capturedAt` 保持不变以维持「最新抓取排序」的区分度。厂商监测：セガ partial→covered、イザナギゲームズ watch→covered，`extra` 新增 **KADOKAWA**（22 → 23 家），アニプレックス 追加 gameIds。**本轮明确跳过（登记备查，避免下轮重复检索）**：① 一款由中国资本企业发行、9/16 上线主机・PC／9/23 上线移动端的开放世界捉宠 RPG；② 一款由中国资本企业全球发行的乐队题材音游（9/24 全球上线）；③ 韩国厂商在 TGS 展出的多款 IP 改编新作（含日本漫画 IP 授权案）；④ 泰国与韩国厂商的开放世界新作各一款。以上均按「开发・发行的资本归属」判定，不属日方主导，不予建卡"
    ]
  }
};
