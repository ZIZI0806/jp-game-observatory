/* ============================================================
 * 日本ゲーム観測台 / Japan Game Observatory
 * 数据文件 — 由每日自动巡检任务维护
 * 最后更新: 2026-09-15
 *
 * 数据结构:
 *   meta    — 元信息与数据源清单
 *   games[] — 作品条目
 *     hype  — 全球舆论期待度评分 (0-100, 定性综合评估, 见 signals 依据)
 * ============================================================ */

window.OBSERVATORY = {

  meta: {
    updatedAt: "2026-09-15T13:40:00+08:00",
    edition: "2026-09-15",
    window: "2026-09-01 ~ 2026-09-15",
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
    {
      id: "alchemist-portmasters",
      company: "KMS / K3 Studio",
      companyJp: "株式会社KMS ゲームスタジオ「K3 Studio」",
      bucket: "new",
      platformClass: "mobile",
      announceDate: "2026-09-02",
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
        launch: "2026-09-11",
        developer: "Rudel Inc.",
        publisher: "Rudel Inc.",
        region: "日本",
        distribution: "App Store / Google Play",
        ipSource: "TVアニメ『SAKAMOTO DAYS』（原作：鈴木祐斗／集英社）",
        features: ["育成モード＋バトルモードの二本立て", "デッキ構築による戦略性", "編隊内の仲間キャラを戦闘中に切替", "キャラごとに異なる戦闘スタイル（打撃・斬撃・銃撃）", "短時間で遊べるローグライト設計"],
        synopsis: "迫りくる殺し屋たちを退け、勝利をつかみ取る。育成したキャラクターで武器と技を組み合わせ、一撃で戦況を覆す。"
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
      bucket: "new",
      platformClass: "mobile",
      announceDate: "2026-09",
      title: { jp: "Resident Evil Survival Unit", cn: "生化危机 Survival Unit", en: "Resident Evil Survival Unit" },
      genre: "实时战略（RTS）",
      platforms: ["iOS", "Android"],
      release: "未定（全球配信予定）",
      releasePrecision: "未定",
      summary: "Aniplex 与 JoyCity、Capcom 三方合作开发的《生化危机》系列手游新作。与系列此前几乎所有手游沿用生存恐怖路线不同，本作转向实时战略——玩家指挥单位、制定战术推进，把系列标志性的生存恐怖氛围重构为策略体验。预定在北美、欧洲、亚洲（含日本、韩国）全球发行。",
      highlight: "Aniplex 首次以发行方身份切入 Capcom 旗舰 IP，且是系列手游少见的 RTS 品类转向。",
      mobile: {
        status: "配信予定（時期未定）",
        os: ["iOS", "Android"],
        monetization: "未発表",
        developer: "Aniplex × JoyCity × Capcom",
        publisher: "Aniplex",
        region: "北米・欧州・アジア（日本・韓国含む）",
        distribution: "App Store / Google Play（北米・欧州・アジアを予定、日本・韓国含む）",
        ipSource: "『バイオハザード（Resident Evil）』シリーズ（株式会社カプコン）",
        features: ["リアルタイムストラテジーへのジャンル転換", "ユニット指揮による戦術設計", "シリーズ初の本格RTS展開", "オンラインショーケースでの続報公開予定"],
        synopsis: "『バイオハザード』の世界観を、ゾンビシューターでも屋敷探索でもなく、ユニットを指揮する戦略体験として再構築。"
      },
      news: [
        { source: "SHSTA（发表报道）", url: "https://www.shsta.com/new/aniplex-announces-resident-evil-survival-unit--mobile-game-based-capcoms-hit-franchise.html" }
      ],
      videos: [
        { label: "发表报道（作品概览与后续公开安排）", platform: "媒体", url: "https://www.shsta.com/new/aniplex-announces-resident-evil-survival-unit--mobile-game-based-capcoms-hit-franchise.html" },
        { label: "Aniplex 官方站", platform: "官方站", url: "https://www.aniplex.co.jp/" }
      ],
      hype: {
        score: 70,
        signals: [
          "《生化危机》IP 全球认知度 + 系列首次 RTS 转向引发品类讨论",
          "Aniplex 发行能力覆盖北美/欧洲/亚洲三区",
          "发售日未定，热度集中在发表期"
        ]
      },
      tags: ["新作", "手游", "IP改编", "RTS", "全球发行"],
      caution: "具体配信日与玩法细节官方尚未公布。"
    },

    {
      id: "nhn-playart-tgs-2026",
      company: "NHN PlayArt",
      companyJp: "NHNプレイアート株式会社",
      bucket: "new",
      platformClass: "mobile",
      announceDate: "2026-08-02（TGS 出展発表）",
      title: { jp: "刀剣乱舞 Puzzigiri / Petit Poyon / OVER RUSH", cn: "刀剑乱舞 Puzzigiri / Petit Poyon / OVER RUSH", en: "Touken Ranbu Puzzigiri / Petit Poyon / OVER RUSH" },
      genre: "解谜 RPG / 休闲解谜 / 卡牌战斗 RPG",
      platforms: ["iOS", "Android"],
      release: "未定（TGS2026 首次公开）",
      releasePrecision: "未定",
      summary: "NHN PlayArt 时隔 8 年重返东京电玩展，将在 2 号馆展出共 7 款作品，其中 3 款为全新作：解谜 RPG《刀剣乱舞 Puzzigiri》、休闲解谜《Petit Poyon》、卡牌战斗 RPG《OVER RUSH》。其余展出品包括《DISSIDIA DUELLUM FINAL FANTASY》以及累计下载 3600 万的《妖怪手表 噗尼噗尼》、突破 2000 万下载的《#COMPASS》。",
      highlight: "三款新作均为手机向，是本期日本手游新作密度最高的一家发行商。",
      mobile: {
        status: "TGS2026 初公開（配信日未定）",
        os: ["iOS", "Android"],
        monetization: "未発表",
        developer: "NHN PlayArt",
        publisher: "NHN PlayArt",
        region: "日本",
        distribution: "App Store / Google Play（配信日・詳細は続報待ち）",
        features: ["刀剣乱舞 Puzzigiri：パズルRPG", "Petit Poyon：カジュアルパズル", "OVER RUSH：カードバトルRPG", "TGS2026 2号館に出展、3タイトル同時初公開", "会場で限定グッズ配布・スタンプラリー実施"],
        synopsis: "8年ぶりのTGS復帰にあたり、韓国・日本のゲーム事業シナジーを注いだ新作3種を含む計7タイトルを出展。"
      },
      news: [
        { source: "GameMeca（TGS 出展阵容）", url: "https://meca-test.gamemeca.com/en/view.php?gid=1779967" }
      ],
      videos: [
        { label: "TGS2026 出展阵容报道（三款新作首次公开）", platform: "媒体", url: "https://meca-test.gamemeca.com/en/view.php?gid=1779967" },
        { label: "NHN PlayArt 官方站", platform: "官方站", url: "https://www.nhn-playart.com/" }
      ],
      hype: {
        score: 56,
        signals: [
          "《刀剣乱舞》IP 在日女性向市场基础稳固",
          "三款新作同时首发，TGS 现场曝光集中",
          "均无配信日，信息量待 TGS 期间补足"
        ]
      },
      tags: ["新作", "手游", "TGS2026", "多作品"]
    },

    {
      id: "ame-nochi-hare-onna",
      company: "GAME FREAK",
      companyJp: "株式会社ゲームフリーク",
      bucket: "new",
      platformClass: "mobile",
      announceDate: "2026-09-14",
      title: { jp: "雨のちハレ女", cn: "雨过天晴女", en: "Ame nochi Hare Onna / Rainy Day, Sunny Girl" },
      genre: "天气联动魔法少女（官方自称「洗衣游戏」）",
      platforms: ["iOS", "Android"],
      release: "2026年冬",
      releasePrecision: "季",
      summary: "《宝可梦》系列开发商 GAME FREAK 公布完全新 IP。舞台为现代日本，主角为能把天气转化为魔力的「晴女（ハレ女）」，与搭档精灵「クモリン」一同活动。核心机制是接入 Weathernews 的实时天气数据——现实中的晴雨会直接改变战斗与可选择行动，并包含换洗、晾晒等生活要素。由宝可梦系列监督大森滋担任总监兼制作人，与 CHRONOGATE 联合开发。",
      highlight: "现实天气 = 游戏变量。大森滋自述灵感源于「洗衣服前先查天气预报」的日常习惯。",
      mobile: {
        status: "配信予定（2026年冬）",
        os: ["iOS", "Android"],
        monetization: "基本無料（アイテム課金あり）",
        developer: "GAME FREAK × CHRONOGATE",
        publisher: "GAME FREAK",
        region: "日本先行（海外配信は未発表）",
        distribution: "App Store / Google Play（日本先行配信）",
        features: ["現実の天気予報データ（Weathernews）と連動", "晴れ／雨でキャラクターの能力が変化", "「ハレ女」×「クモリン」の変身バトル", "洗濯・乾燥などの生活要素をゲーム化", "公式X で最新情報を随時公開"],
        synopsis: "現代日本の日常が舞台。天気を魔法の力に変える「ハレ女（晴女）」と、その相棒「クモリン」が日本の各地を巡り、人々の気持ちを明るくしていく。",
        cast: "晴渡向日葵：河野日和／洗井ぽん：長野佑紀／天ノ原ゆうり：河野みりか ほか"
      },
      news: [
        { source: "Anime News Network", url: "https://animenewsnetwork.com/news/2026-09-14/pokemon-developer-game-freak-announces-ame-nochi-hare-onna-mobile-game/.241755" },
        { source: "VICE", url: "https://www.vice.com/en/article/game-freak-new-game-rainy-day-sunny-girl/" },
        { source: "Game8", url: "https://game8.co/articles/latest/pokemon-devs-next-game-is-a-free-to-play-mobile-game-about-magical-girls" }
      ],
      videos: [
        { label: "Anime News Network 报道（含正式预告 PV 与角色视觉）", platform: "媒体", url: "https://animenewsnetwork.com/news/2026-09-14/pokemon-developer-game-freak-announces-ame-nochi-hare-onna-mobile-game/.241755" },
        { label: "Android Hire 报道（配信地域・事前登录状况梳理）", platform: "媒体", url: "https://www.androidhire.com/ame-nochi-hare-onna-game-freak-mobile-game" },
        { label: "VICE 报道（玩法机制与开发体制说明）", platform: "媒体", url: "https://www.vice.com/en/article/game-freak-new-game-rainy-day-sunny-girl/" }
      ],
      hype: {
        score: 73,
        signals: [
          "宝可梦开发商 + 大森滋监督，IP 关注度天然高",
          "「现实天气联动」机制在日英双语媒体被反复解读为话题点",
          "TGS2026 设展台，热度将续接至 9/19-21 公众日"
        ]
      },
      tags: ["新IP", "手游", "天气联动", "TGS2026"]
    },

    {
      id: "blue-nova",
      company: "GungHo Online Entertainment",
      companyJp: "ガンホー・オンライン・エンターテイメント",
      bucket: "new",
      platformClass: "pc",
      announceDate: "2026-09-14",
      title: { jp: "B.L.U.E. NOVA", cn: "B.L.U.E. NOVA", en: "B.L.U.E. NOVA" },
      genre: "共斗弹幕射击 / Co-op PvE TPS",
      platforms: ["PC (Steam)"],
      release: "2027年",
      releasePrecision: "年",
      summary: "《智龙迷城》《仙境传说》开发商 GungHo 公布免费游玩共斗 PvE 第三人称射击新作。舞台为殖民星球 DIVAL，人类对抗失控 AI「EVE」及其机械军团。招牌机制「R.I.N.G.」把与陌生玩家的偶遇变成火力——踏入光环并肩即触发「Infinite Barrage」，无限弹药无需装填。主模式 Tower Raid 支持最多 30 人，另有 6 人 Boss Raid。",
      highlight: "把「路上遇到的陌生人」本身设计成核心机制，而非赛前组队的固定小队。",
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
      title: { jp: "アイドルマスター SideM 初の家庭用ゲーム企画", cn: "偶像大师 SideM 首款主机游戏企划", en: "THE IDOLM@STER SideM (home console project)" },
      genre: "偶像养成 / 主机游戏",
      platforms: ["Nintendo Switch", "Nintendo Switch 2"],
      release: "未定",
      releasePrecision: "未定",
      summary: "万代南梦宫公布《偶像大师 SideM》系列首款家用主机游戏企划。玩家将从 315 Production 的 49 位偶像、16 个组合中展开制作人工作，故事为完全新作。这是 SideM 自 2014 年手游上线以来首次登陆主机平台。",
      highlight: "IP 十年后首次主机化，对系列老粉属高情绪价值事件。",
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
        launch: "2026-09-01",
        developer: "COLOPL",
        publisher: "COLOPL（ブランド：Kuma the Bear）",
        region: "日本",
        distribution: "ブラウザ配信（App ストア経由なし）",
        payment: ["PayPay", "Apple Pay", "クレジットカード"],
        features: ["ブラウザのみで動作、インストール不要", "AI 演算でシネマティックな映像体験を最適化", "リアルタイム戦闘＋式神（シキガミ）育成", "好感度・育成度に応じてキャラ背景ストーリー解放", "カメラワークを活かした「アクティブシネマ」演出"],
        synopsis: "霊感を持つ女子高生「草薙ウル」と、特務機関369の陰陽捜査官「立丸シノ」。連続する怪異を追う二人は、異形「モウジャ」と対峙し、都市伝説の裏に隠された陰謀へと踏み込む。"
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
      title: { jp: "ムーミン:ムーミン谷の夏まつり ほか TGS2026 出展 11 タイトル", cn: "姆明：姆明谷的夏祭 等 11 款参展作品", en: "Moomin: Summer Festival in Moominvalley & 10 more" },
      genre: "多品类（点击式冒险 / Roguelite 等）",
      platforms: ["Nintendo Switch", "Nintendo Switch 2", "PC (Steam)", "PS5", "Xbox Series X|S"],
      release: "2026-11-12（ムーミン）等，逐作不同",
      releasePrecision: "日",
      summary: "松竹游戏事业室公布 TGS2026 展位信息与 11 款出展作品，为历届最多。带头新作《ムーミン:ムーミン谷の夏まつり》（11/12 发售）之外，还包括与电猫游戯共同推出的 Roguelite 3D 动作《夢幻桜楼閣》（2026 秋）、自研视觉小说《Algorithm Prescription》等。展位位于 4 号馆 04-C02。",
      highlight: "传统影视公司以发行商身份大规模参展，是日本内容产业跨界游戏的一手案例。",
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
      announceDate: "2026-09（Demo 与试玩信息更新）",
      title: { jp: "ドラゴンクエストモンスターズ 朽ちた世界", cn: "勇者斗恶龙 怪物篇 The Withered World", en: "Dragon Quest Monsters: The Withered World" },
      genre: "怪物收集 RPG",
      platforms: ["Nintendo Switch", "Nintendo Switch 2", "PS5", "Xbox Series X|S", "PC"],
      release: "2026-12-03",
      releasePrecision: "日",
      summary: "《勇者斗恶龙 V》女主角 Bianca 与 Nera 担任主角的怪物收集作品，舞台为 Witherwood 王国。玩家可侦查、培育并合成怪物，Square Enix 称登场怪物超过 500 种，并计划加入线上 PvP。Demo 已配信且存档可继承至正式版。",
      highlight: "同期 State of Play Japan 展示斗技场战斗与剧情演出；TGS2026 设「Fluffy Meet and Greet」可合影。",
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
      title: { jp: "キングダム ハーツ IV", cn: "王国之心 IV", en: "KINGDOM HEARTS IV" },
      genre: "动作 RPG",
      platforms: ["Nintendo Switch 2", "PS5", "Xbox Series X|S", "PC"],
      release: "2027年后期",
      releasePrecision: "期",
      summary: "系列正统编号新作，延续 Sora 在神秘都市 Quadratum 的旅程，Switch 2 版与其他平台同日推出。TGS2026 Square Enix 展台将以「仅展示、不可试玩」形式出展。系列累计出货量已突破 3900 万套，另有由野村哲也参与的同名动画系列在开发中。",
      highlight: "TGS 采取「看得到摸不到」的展出策略，属刻意维持悬念的宣发手法。",
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
      announceDate: "2026-09-09（定档）",
      title: { jp: "FINAL FANTASY VII REVELATION", cn: "最终幻想 VII 启示录", en: "FINAL FANTASY VII REVELATION" },
      genre: "RPG（Remake 三部曲终章）",
      platforms: ["PS5", "Nintendo Switch 2", "Xbox Series X|S", "PC (Steam / Epic)"],
      release: "2027-04-08",
      releasePrecision: "日",
      summary: "Nintendo Direct 9/9 确认最终发售日为 2027 年 4 月 8 日，全平台同步。玩家可搭乘飞空艇 Highwind 自由飞行、跳伞任意降落，实现无缝天地切换；新增可操作角色 Vincent Valentine 与 Cid Highwind，并导入可切换职业动作的「FITS」系统。TGS2026 提供现场试玩。",
      highlight: "30 周年之际为三部曲收尾，TGS2026 Square Enix 展台两大试玩之一。",
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
      announceDate: "2026-09（State of Play）",
      title: { jp: "FINAL FANTASY RESONANCE", cn: "最终幻想 Resonance", en: "FINAL FANTASY RESONANCE" },
      genre: "HD-2D 回合制 RPG",
      platforms: ["Switch", "Switch 2", "PS5", "Xbox Series X|S", "PC"],
      release: "2026-10-22",
      releasePrecision: "日",
      summary: "系列首款 HD-2D 作品，将 2015 年手游《FF Brave Exvius》的开篇剧情重编为完整单机游戏，并且不含抽卡。战斗为经典回合制（非 ATB），带可见时间轴、Stagger 窗口、Limit Burst、幻兽与历代英雄「Visions」。第一章 Demo 已配信且存档可继承。",
      highlight: "「让现代 FF 重新像 16-bit 水晶冒险」的定位，在 TGS 与 FF7 Revelation 并列两大试玩。",
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
      title: { jp: "Persona 4 Revival", cn: "女神异闻录 4 Revival", en: "Persona 4 Revival" },
      genre: "RPG（完全重制）",
      platforms: ["Xbox Series X|S", "Xbox on PC", "PS5", "Steam", "Nintendo Switch 2（2027-05-20）"],
      release: "2027-02-18（Switch 2 版 2027-05-20）",
      releasePrecision: "日",
      summary: "2008 年《Persona 4》的完全重制版，保留原作的剧情与角色，对画面与游玩体验全面重建。2027 年 2 月 18 日全球同步发售；Nintendo Switch 2 版确认于同年 5 月 20 日推出。首日加入 Xbox Game Pass Ultimate 与 PC Game Pass。",
      highlight: "PS5 / Xbox / PC 与 Switch 2 之间存在约三个月的发售时间差，是本次少见的平台窗口安排。",
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
      title: { jp: "メトロイド レイヴェナス", cn: "银河战士 Ravenous", en: "Metroid Ravenous" },
      genre: "2D 横版动作冒险",
      platforms: ["Nintendo Switch 2"],
      release: "2027-01-28",
      releasePrecision: "日",
      summary: "《Metroid Dread》(2021) 的横版续作，为系列 40 周年作品。萨姆斯被神秘敌人袭击重伤，困于未知星球求生，主题是「吃或被吃」——预告中展示了萨姆斯吞噬敌人的新能力。同步公布 amiibo 阵容与同日发售的 Special Edition。",
      highlight: "回归 2D 硬核生存路线，被媒体解读为对 Dread 口碑的正面延续。",
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
      title: { jp: "カービィ ワールドビヨンド", cn: "星之卡比 World Beyond", en: "Kirby and the World Beyond" },
      genre: "3D 开放区域平台动作",
      platforms: ["Nintendo Switch 2"],
      release: "2027年春",
      releasePrecision: "季",
      summary: "Nintendo Direct 9/9 压轴公布，为系列 35 周年作品。天空出现裂痕，卡比在帝帝帝大王的帮助下击穿天幕，坠入「World Beyond」。相较《探索发现》(2022) 的关卡制，本作相机可自由旋转、场景互联，呈开放区域结构；追加新伙伴角色，复制能力与 Super Ability 回归，并可与场景互动破坏（预告中出现大师之剑）。",
      highlight: "卡比系列首次真正意义上的开放区域探索，被安排在 Direct 压轴位。",
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
      announceDate: "2026-09-09",
      title: { jp: "ファイアーエムブレム フォーチュンズウィーブ", cn: "火焰之纹章 Fortune's Weave", en: "Fire Emblem: Fortune's Weave" },
      genre: "策略 SRPG",
      platforms: ["Nintendo Switch 2"],
      release: "2026-09-17",
      releasePrecision: "日",
      summary: "系列最新正统作。故事从四位主角在 Dagdan 帝国「英雄竞技会」角逐开始，五年后魔神 Balor 归来，玩家可借「Fortuna」之力回溯改变主角命运。战斗为网格战棋，间场在首都 Dagsion 探索、育成、招募，并有时间限制的支线地图。",
      highlight: "媒体预览给出「兼具三屋优点、规避旧弊」的评价，发售日与 TGS 开幕同日。",
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
      title: { jp: "ゼルダの伝説 時のオカリナ（リメイク）", cn: "塞尔达传说 时之笛（重制）", en: "The Legend of Zelda: Ocarina of Time Remake" },
      genre: "3D 动作冒险（重制）",
      platforms: ["Nintendo Switch 2"],
      release: "已确认（具体日期待官方）",
      releasePrecision: "年内",
      summary: "在 9/8 的塞尔达系列 40 周年专场中公开，为 N64 原作《时之笛》的完全视觉重制版。公布当日即成为 X 等社交平台讨论度最高的环节之一。发售日期与预购详情尚未完全公开。",
      highlight: "40 周年节点上的招牌重制；视觉风格在社媒引发分歧讨论，正反声量均高。",
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
      announceDate: "2026-09-09",
      title: { jp: "モンスターハンターワイルズ（Switch 2 版）/ 拡張「Ascendance」", cn: "怪物猎人 Wilds（Switch 2 版）/ 扩展包 Ascendance", en: "Monster Hunter Wilds (Switch 2) / Ascendance" },
      genre: "狩猎动作 RPG",
      platforms: ["Nintendo Switch 2", "PS5", "Xbox Series X|S", "PC"],
      release: "Switch 2 版 2026-12-04 / Ascendance 2027",
      releasePrecision: "日",
      summary: "Nintendo Direct 确认《Monster Hunter Wilds》于 2026 年 12 月 4 日登陆 Switch 2，含既有更新内容，支持本地无线与跨平台联机。大型扩展包「Ascendance」定于 2027 年推出，追加可借翔虫（Seikret）移动的垂直区域，并公布全新古龙「Gundoraga」。",
      highlight: "系列制作人辻本良三亲自出席 State of Play Japan 解说扩展内容，是日方重量级站台。",
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
      title: { jp: "鬼武者 Way of the Sword", cn: "鬼武者 Way of the Sword", en: "Onimusha: Way of the Sword" },
      genre: "剑戟动作",
      platforms: ["PS5", "Xbox Series X|S", "Nintendo Switch 2", "PC"],
      release: "2026-09-25（Switch 2 版）",
      releasePrecision: "日",
      summary: "系列久违的新作。日本媒体评价其「在保留原作暗黑氛围的同时，实现了深度的战斗系统」。Switch 2 版支持以 Joy-Con 2 体感操作挥剑，与其他平台形成操作差异。",
      highlight: "Famitsu 评分 34/40（9/9/8/8），是本期评分榜并列第二。",
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
      title: { jp: "The Blood of Dawnwalker", cn: "黎明行者之血", en: "The Blood of Dawnwalker" },
      genre: "暗黑奇幻 RPG",
      platforms: ["PS5", "Xbox Series X|S", "PC"],
      release: "已发售",
      releasePrecision: "已发售",
      summary: "万代南梦宫发行的暗黑奇幻 RPG，已正式发售。日本媒体评价其氛围营造与叙事力度突出，定位为本季值得关注的 RPG 之一。Famitsu 评分 34/40（9/8/8/9），与《鬼武者》并列本期第二。",
      highlight: "作为发行商作品拿下 Famitsu 34 分，显示万代在西方工作室产品线上的选品眼光。",
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
      title: { jp: "Eternal Anima", cn: "Eternal Anima", en: "Eternal Anima" },
      genre: "回合制 RPG（新 IP）",
      platforms: ["Switch 2", "PS5", "Xbox Series X|S", "PC"],
      release: "2027-03-04",
      releasePrecision: "日",
      summary: "Marvelous 原「Project Life is RPG」正式定名。制作阵容豪华：导演樋口勝久（FF II–V、Chrono Trigger、Xenogears）、剧本野島一成（FF VII、Kingdom Hearts）、原案牧野圭介（Persona 5、Metaphor）、音乐崎元仁。主角 Wade 可读取物体残留记忆，并以「Future Sight」预判敌人行动。",
      highlight: "日式 RPG 黄金世代创作者的再集合，是 2027 年最被业界看好的新 IP 之一。",
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
      announceDate: "2026-09-17（发售）",
      title: { jp: "英雄伝説 空の軌跡 the 2nd", cn: "英雄传说 空之轨迹 the 2nd", en: "The Legend of Heroes: Trails in the Sky 2nd Chapter" },
      genre: "剧情向回合制 RPG",
      platforms: ["PS5", "Nintendo Switch", "Nintendo Switch 2", "PC"],
      release: "2026-09-17",
      releasePrecision: "日",
      summary: "2006 年《空之轨迹 SC》的现代化重制，接续去年 1st Chapter 的剧情，讲述艾丝蒂尔穿越王国寻找失踪的约修亚。保留厚重叙事与回合制战斗，新增钓鱼、扑克等小游戏作为节奏调剂。",
      highlight: "轨迹系列十五年以上长线叙事的老用户盘极其稳固，属「确定性销量」型作品。",
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
      announceDate: "2026-09-09",
      title: { jp: "レイトン教授と蒸気の新世界", cn: "雷顿教授与蒸汽新世界", en: "Professor Layton and the New World of Steam" },
      genre: "解谜冒险",
      platforms: ["Nintendo Switch", "Nintendo Switch 2"],
      release: "2026-12-10",
      releasePrecision: "日",
      summary: "LEVEL-5 招牌解谜系列回归作。舞台为靠蒸汽文明急速成长的虚构美国城市 Steam Bison，雷顿教授与助手路克联手破解城中离奇谜团。系列标志性的情感化美术与解谜节奏回归。",
      highlight: "长期延宕后终于定档，对系列老玩家属「兑现承诺」型发布。",
      news: [
        { source: "GameMeca（Nintendo Direct 汇总）", url: "https://www.gamemeca.com/en/view.php?gid=1780300" },
        { source: "Legal United States", url: "https://legalunitedstates.com/nintendo-direct-september-2026/" }
      ],
      videos: [
        { label: "Nintendo Direct 汇总（含游戏画面）", platform: "媒体", url: "https://www.gamemeca.com/en/view.php?gid=1780300" },
        { label: "Nintendo Direct 汇总（发售日确认）", platform: "媒体", url: "https://legalunitedstates.com/nintendo-direct-september-2026/" }
      ],
      hype: {
        score: 67,
        signals: [
          "Famitsu 期待榜 NS2 版 133 票 / NSW 版 64 票",
          "12/10 定档，年末商战窗口",
          "解谜品类受众稳定但增长有限"
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
      announceDate: "2026-09（发售）",
      title: { jp: "機動警察パトレイバー the Case Files", cn: "机动警察 PATLABOR the Case Files", en: "PATLABOR the Case Files" },
      genre: "3D 动作",
      platforms: ["PS5", "PC (Steam / Epic)"],
      release: "2026-09-17",
      releasePrecision: "日",
      summary: "系列约 26 年来首款全新独立主机游戏。由 Chime 开发，出渕裕监修机械设计、伊藤和典监修剧本、高田明美监修角色原画。玩家可驾驶 Ingram、Griffon、零式等 20 余台 Labor，并可从特车二课与敌方双方视角体验剧情。含模拟器模式与 Labor 对战。",
      highlight: "实体 PS5 特装版附赠「白 Griffon」塑料模型，周边公司做游戏的资源协同体现明显。",
      news: [
        { source: "Quest Board.JP（发售详情）", url: "https://quest-board.jp/en/quests/the-case-files" }
      ],
      videos: [
        { label: "发售详情（含第 2 弹 Web CM 情报）", platform: "媒体", url: "https://quest-board.jp/en/quests/the-case-files" },
        { label: "官方 X @patlabor0810", platform: "X", url: "https://x.com/patlabor0810" }
      ],
      hype: {
        score: 62,
        signals: [
          "26 年空白带来的情怀价值",
          "多语言（含简繁中文）+ 国际发售，覆盖面广",
          "9/17 发售，与 TGS 开幕同日"
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
      title: { jp: "ONE PIECE 海のごちそうレストラン", cn: "海贼王 海洋盛宴", en: "ONE PIECE: Grand Gourmet" },
      genre: "海上レストラン経営シミュレーション",
      platforms: ["Nintendo Switch 2", "Nintendo Switch", "PC (Steam)", "iOS", "Android"],
      release: "2026-10-22（主机版）／2026-10-23（Steam・手机版）",
      releasePrecision: "日",
      summary: "万代南梦宫发行、开罗游戏（カイロソフト）开发的《ONE PIECE》题材像素风经营模拟，于 Nintendo Direct 首发公开。玩家作为海上餐厅「巴拉蒂 2 号店」的新人店员，与草帽一伙共同把餐厅做成「这片海上最美味的地方」。与山治一起用冒险中获得的食材开发菜谱，可把主菜／副菜／甜点／饮料自由组合成套餐并获得额外加成，也会出现运用恶魔果实能力的特殊料理。收录 400 名以上系列角色、200 种以上家具与内饰。主机版 2,700 日元、手机版 2,000 日元，支持含简繁中文在内的 12 种语言。TGS2026 设置餐厅主题展台并提供 20 分钟试玩。",
      highlight: "IP 授权经营模拟：把「吃饭」这条原作主线做成核心玩法，而不是又一款战斗手游。",
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
    }
  ],

  /* ---------------------------------------------------------
   * C. 厂商监测名单 — 按用户指定清单建档（50 社 + 6 社补充）
   *    status: covered 已建作品卡 / partial 部分覆盖 / watch 待观察
   *    focus:  true 标记为本职业务直接相关，优先补卡
   * ------------------------------------------------------- */
  companies: {
    asOf: "2026-09-15",
    listTotal: 50,
    categories: [
      {
        key: "major",
        label: "大手パブリッシャー",
        sub: "コンシューマー・アーケード中心",
        items: [
          { name: "任天堂株式会社", short: "Nintendo", status: "covered", gameIds: ["metroid-ravenous", "zelda-oot-remake", "xenoblade-genesis"] },
          { name: "株式会社ソニー・インタラクティブエンタテインメント", short: "SIE", status: "watch", note: "本社位于美国加州，本台按其日系阵营属性纳入观察；PS 平台作品已散见于各条目" },
          { name: "株式会社セガ", short: "SEGA", status: "partial", note: "子会社 ATLUS 已建卡并标注 ATLUS（SEGA）；SEGA 本体作品待补", gameIds: ["persona-6", "persona-4-revival"] },
          { name: "株式会社バンダイナムコエンターテインメント", short: "Bandai Namco", status: "covered", gameIds: ["idolmaster-sidem-console", "blood-of-dawnwalker", "onepiece-marine-gourmet", "bleach-mirrors-high"] },
          { name: "株式会社スクウェア・エニックス", short: "Square Enix", status: "covered", gameIds: ["ff7-revelation", "ff-resonance", "kingdom-hearts-4", "dq-monsters-withered-world"] },
          { name: "株式会社カプコン", short: "Capcom", status: "covered", gameIds: ["mhw-switch2-ascendance", "onimusha-way-of-the-sword"] },
          { name: "株式会社コナミデジタルエンタテインメント", short: "KONAMI", status: "covered", gameIds: ["rhapsody-in-scarlet", "project-zircon", "rev-noir"] },
          { name: "株式会社コーエーテクモゲームス", short: "Koei Tecmo", status: "watch" }
        ]
      },
      {
        key: "strong",
        label: "有力パブリッシャー・著名デベロッパー",
        sub: "",
        items: [
          { name: "株式会社アトラス", short: "ATLUS", status: "covered", gameIds: ["persona-6", "persona-4-revival"] },
          { name: "株式会社フロム・ソフトウェア", short: "FromSoftware", status: "covered", gameIds: ["the-duskbloods"] },
          { name: "株式会社レベルファイブ", short: "LEVEL-5", status: "covered", gameIds: ["professor-layton-new-world-of-steam"] },
          { name: "株式会社日本一ソフトウェア", short: "Nippon Ichi", status: "watch", note: "《GOBBLE》(9/24) 已出现于发售清单，尚未建卡" },
          { name: "株式会社スパイク・チュンソフト", short: "Spike Chunsoft", status: "watch" },
          { name: "株式会社マーベラス", short: "Marvelous", status: "covered", gameIds: ["eternal-anima"] },
          { name: "アイディアファクトリー株式会社", short: "Idea Factory", status: "watch", note: "《BLACK WOLVES SAGA》(9/10) 已出现于发售清单，尚未建卡" },
          { name: "日本ファルコム株式会社", short: "Nihon Falcom", status: "covered", gameIds: ["trails-2nd-chapter"] },
          { name: "プラチナゲームズ株式会社", short: "PlatinumGames", status: "watch" },
          { name: "株式会社SNK", short: "SNK", status: "watch" },
          { name: "株式会社ゲームフリーク", short: "GAME FREAK", status: "covered", gameIds: ["ame-nochi-hare-onna", "pokemon-winds-waves"] },
          { name: "株式会社ハル研究所", short: "HAL Laboratory", status: "covered", gameIds: ["kirby-world-beyond"] },
          { name: "株式会社トーセ", short: "TOSE", status: "watch" },
          { name: "株式会社イルカ", short: "Iruka", status: "watch" },
          { name: "株式会社コジマプロダクション", short: "Kojima Productions", status: "watch" },
          { name: "株式会社ディンプス", short: "DIMPS", status: "watch" }
        ]
      },
      {
        key: "mobile",
        label: "スマートフォン・ソーシャルゲーム・オンラインゲーム企業",
        sub: "",
        items: [
          { name: "株式会社Cygames", short: "Cygames", status: "partial", note: "仅子会社 Cygames Edge 建卡；Cygames 本体待补", gameIds: ["where-the-seeds-fall"] },
          { name: "株式会社ラセングル", short: "Lasengle", status: "watch", focus: true },
          { name: "株式会社WFS", short: "Wright Flyer Studios", status: "watch" },
          { name: "株式会社マイネット", short: "mynet", status: "watch" },
          { name: "株式会社ブシロード", short: "Bushiroad", status: "watch", focus: true },
          { name: "グリー株式会社", short: "GREE", status: "watch" },
          { name: "株式会社アカツキゲームス", short: "Akatsuki Games", status: "watch" },
          { name: "株式会社コロプラ", short: "COLOPL", status: "covered", gameIds: ["active-cinema-rpg-369"] },
          { name: "株式会社MIXI", short: "MIXI", status: "watch" },
          { name: "株式会社ディー・エヌ・エー", short: "DeNA", status: "watch" },
          { name: "ガンホー・オンライン・エンターテイメント株式会社", short: "GungHo", status: "covered", gameIds: ["blue-nova"] },
          { name: "KLab株式会社", short: "KLab", status: "watch" },
          { name: "株式会社バンク・オブ・イノベーション", short: "Bank of Innovation", status: "watch" },
          { name: "ワンダープラネット株式会社", short: "WonderPlanet", status: "watch" },
          { name: "株式会社アピリッツ", short: "Appirits", status: "watch" },
          { name: "株式会社Aiming", short: "Aiming", status: "watch" }
        ]
      },
      {
        key: "ip",
        label: "IP管理・エンターテインメント・その他開発スタジオ",
        sub: "",
        items: [
          { name: "株式会社アニプレックス", short: "Aniplex", status: "covered", focus: true, gameIds: ["re-survival-unit"], note: "《Resident Evil Survival Unit》已建卡（2026-09 新作发表）" },
          { name: "有限会社ノーツ", short: "Notes / TYPE-MOON", status: "watch", focus: true },
          { name: "株式会社カヤック", short: "Kayac", status: "watch" },
          { name: "株式会社トイロジック", short: "Toylogic", status: "watch" },
          { name: "株式会社ヘキサドライブ", short: "HexaDrive", status: "watch" },
          { name: "あまた株式会社", short: "Amata", status: "watch" },
          { name: "株式会社イザナギゲームズ", short: "IzanagiGames", status: "watch", note: "《AKIBA LOST》(9/17) 已出现于发售清单，尚未建卡" },
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
        { name: "NHNプレイアート株式会社", short: "NHN PlayArt", status: "covered", gameIds: ["nhn-playart-tgs-2026"] },
        { name: "TOHO Games（東宝株式会社）", short: "TOHO Games", status: "covered", gameIds: ["haikyu-all-challengers"], focus: true, note: "动画『ハイキュー!!』のIP保有元が自らゲーム事業ブランドを運営。IP ホルダー直営のため監修業務と直結" },
        { name: "株式会社カイロソフト", short: "カイロソフト", status: "covered", gameIds: ["onepiece-marine-gourmet"], focus: false, note: "日本 IP（ONE PIECE）との初コラボを万代南梦宫と共同で担当" }
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
    note: "TGS 30 周年，史上首次 5 日举办。9/17-18 商务日，9/19-21 公众日（9/21 为日本节假日，至 16:00）。",
    booths: [
      { company: "Square Enix", hall: "—", items: "FF7 Revelation（可试玩）、Final Fantasy Resonance（可试玩）、Kingdom Hearts IV（仅展示）、DQ VII Reimagined Family Game Park 试玩" },
      { company: "KONAMI", hall: "—", items: "SILENT HILL: Townfall 沉浸式影院体验（9/19 特别节目）、Castlevania: Belmont's Curse 直播、幻想水滸伝 STAR LEAP 官方直播" },
      { company: "GungHo", hall: "06-C06", items: "B.L.U.E. NOVA 出展，放映完整版预告与 TGS 限定影像，先到先得限定周边" },
      { company: "松竹ゲームズ", hall: "04-C02", items: "11 款作品试玩，含《ムーミン:ムーミン谷の夏まつり》" },
      { company: "HYPER REAL", hall: "02-C14", items: "6 款作品试玩，含日本首发《NAME OF THE WILL》《Helcast》" },
      { company: "Game Freak", hall: "—", items: "《雨のちハレ女》重点展示" },
      { company: "Netmarble", hall: "—", items: "Shangri-La Frontier: The Seven Colossi 首次公开试玩、我独自升级 KARMA、Pearl in Blue" },
      { company: "Famitsu × 電撃ゲームス", hall: "FamitsuTUBE（YouTube）", items: "9/19-20 18:00 起特别直播，Capcom / INTI CREATES / ATLUS / SEGA 等轮番登场" }
    ]
  },

  /* ---------------------------------------------------------
   * E. 本期综述
   * ------------------------------------------------------- */
  digest: {
    headline: "TGS 30 周年开幕前夜：主机侧集中亮牌，手游侧新作密度同步攀升",
    points: [
      "手游为重点监测区，手游区本期收录 9 条（纯手游 8 条＋跨平台 1 条）。除原有 6 条外，本轮补收 3 款 IP 授权改编手游：《ONE PIECE 海のごちそうレストラン》（カイロソフト開発 × バンダイナムコ発行、モバイル版 10-23）、《ハイキュー!! ALL Challengers》（東宝 TOHO Games 自営、事前登録中）、《BLEACH Mirrors High》（バンダイナムコ、2026 年内）。三作とも日本 IP ホルダー主導で、うち ONE PIECE はモバイル＋コンシューマーのクロスプラットフォーム",
      "手游侧的看点集中在两处：一是 IP 跨媒介改编（SAKAMOTO DAYS、刀剑乱舞、生化危机），二是品类迁移——Aniplex 把《生化危机》从生存恐怖搬到 RTS，属系列手游罕见转向。",
      "新作发表密度为本季最高。GAME FREAK、GungHo、KONAMI、COLOPL、松竹、Cygames Edge、HYPER REAL 各有新作或新企划落地，且多数直接对接 TGS2026。",
      "KONAMI 一次性公布《Rhapsody in Scarlet》《PROJECT ZIRCON》两款完全新作，是本期动作最大的厂商。",
      "任天堂侧通过 9/8 塞尔达专场 + 9/9 Direct 的组合，铺开 Switch 2 的 2026 冬~2027 春档期。",
      "Square Enix 把 FF7 Revelation 定档 2027-04-08 并投入 TGS 双试玩，是本期信息量最重的单条。",
      "「现实数据联动」成为新作机制的新风向：《雨のちハレ女》接入实时天气，《B.L.U.E. NOVA》把玩家邂逅概率变成火力。"
    ]
  }
};
