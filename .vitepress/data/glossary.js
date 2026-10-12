/**
 * 文化解码词典（三语）
 * 每条词条：id / hanzi / pinyin / category / link（可选，站内专题） + en·zh·ja 三语名称与释义
 * link 为不带语言前缀的站内路径，由组件按当前语言补前缀
 */

export const CATEGORIES = [
  { id: 'artifact', icon: '🏮', en: 'Artifacts & Talismans', zh: '法宝与法器', ja: '法宝・法器' },
  { id: 'being', icon: '👹', en: 'Beings & Spirits', zh: '妖灵鬼怪', ja: '妖・霊・鬼' },
  { id: 'taoist', icon: '☯️', en: 'Taoist Practice', zh: '道家修行', ja: '道家の修行' },
  { id: 'cosmos', icon: '⚖️', en: 'Cosmology & Order', zh: '三界与秩序', ja: '三界と秩序' },
  { id: 'beast', icon: '🐉', en: 'Beasts & Classics', zh: '神兽与典籍', ja: '神獣と典籍' }
]

export const UI = {
  en: {
    kicker: 'Culture Decoder · Module 01',
    title: 'The Glossary',
    lead: 'Every Chinese game throws the same words at you — yao, qi, karma, dantian — and assumes you already know them. This is the shelf where they are written down. Search by English, Chinese, pinyin, or meaning.',
    search: 'Search a term, a pinyin, or a meaning…',
    all: 'All',
    count: (n) => `${n} ${n === 1 ? 'entry' : 'entries'}`,
    empty: 'Nothing matches that yet.',
    emptyHint: 'Try a shorter word, or a pinyin like "yao".',
    clear: 'Clear',
    related: 'Related'
  },
  zh: {
    kicker: '文化解码 · 模块 01',
    title: '文化解码词典',
    lead: '每一款中国游戏都在向你抛同样的词——妖、气、因果、丹田——并且默认你本来就懂。这里就是把它们写下来的那个书架。支持按中文、拼音、英文或释义检索。',
    search: '搜词条、拼音或释义…',
    all: '全部',
    count: (n) => `共 ${n} 条`,
    empty: '没有匹配的词条。',
    emptyHint: '试试更短的词，或者拼音，比如「yao」。',
    clear: '清空',
    related: '相关专题'
  },
  ja: {
    kicker: '文化デコード · モジュール 01',
    title: '文化デコード辞典',
    lead: '中国のゲームはいつも同じ言葉を投げてくる——妖、気、因果、丹田——そして分かっている前提で進む。ここはそれを書き留めておく棚である。日本語・中国語・ピンイン・意味から検索できる。',
    search: '用語・ピンイン・意味で検索…',
    all: 'すべて',
    count: (n) => `全 ${n} 件`,
    empty: '一致する項目がありません。',
    emptyHint: '短い語か、"yao" のようなピンインで試してください。',
    clear: 'クリア',
    related: '関連記事'
  }
}

export const ENTRIES = [
  // ---------- 法宝与法器 ----------
  {
    id: 'hulu',
    hanzi: '葫芦',
    pinyin: 'húlu',
    category: 'artifact',
    link: '/projects/zhong-kui/lore',
    en: {
      term: 'Gourd',
      def: 'The Taoist survival kit. Sealed inside is a miniature universe that separates the pure from the turbid — so it holds medicine, wine, and demons far too large to fit. When a character reaches for their gourd mid-fight, they are not having a drink. They are unlocking a cell.'
    },
    zh: {
      term: '葫芦',
      def: '道家的随身宇宙。里面装着一方小天地，能分清浊，所以既装药装酒，也关得住比它大得多的妖怪。战斗里有人摸向腰间葫芦，多半不是要喝一口——是要开一间牢房。'
    },
    ja: {
      term: '瓢箪',
      def: '道士の携帯宇宙。中には小さな天地が収まり、清と濁を分かつ。ゆえに薬も酒も、自分よりはるかに大きな妖も封じられる。戦闘中に瓢箪へ手を伸ばす者——飲むためではない、牢を開けるのだ。'
    }
  },
  {
    id: 'fu',
    hanzi: '符',
    pinyin: 'fú',
    category: 'artifact',
    link: '/culture/taoism',
    en: {
      term: 'Talisman',
      def: 'Not paper magic — a celestial arrest warrant. A talisman issues an order in the name of the higher heavens, and whatever spirit is named on it has no legal right to refuse. Think of it as a patch pushed straight into reality: freeze, burn, vanish.'
    },
    zh: {
      term: '符',
      def: '不是纸片魔法，而是一张天界的抓捕令。它以更高一重天的名义下令，被点名的鬼神没有拒绝的权限。可以理解为一次推送到现实里的热补丁：冻结、焚烧、消散。'
    },
    ja: {
      term: '符（おふだ）',
      def: '紙の魔法ではない。天界が発行する逮捕令状だ。上位の天の名において命じられ、名を記された霊に拒否権はない。現実へ直接配信されるパッチのようなもの——凍結、燃焼、消滅。'
    }
  },
  {
    id: 'jingubang',
    hanzi: '如意金箍棒',
    pinyin: 'Rúyì Jīngū Bàng',
    category: 'artifact',
    link: '/projects/wukong',
    en: {
      term: 'Ruyi Jingu Bang',
      def: 'A pillar from the Dragon King\'s palace weighing 13,500 catties, answering to Wukong\'s will alone. It shrinks to a needle behind his ear and grows until it props up the sky. Buddhist readings make it the mind itself — vast, unmeasurable, and only as disciplined as its owner.'
    },
    zh: {
      term: '如意金箍棒',
      def: '东海龙宫的定海神针，重一万三千五百斤，只听悟空一人的号令。缩小成绣花针藏在耳后，放大能撑起天。佛家说法里它象征「心」——大而无量，主人多有定力，它就有多收敛。'
    },
    ja: {
      term: '如意金箍棒（にょいきんこぼう）',
      def: '竜宮の定海神針。重さ一万三千五百斤、悟空の意のままに伸縮する。耳の裏に針ほどの大きさで収まり、天を支えるほどに伸びる。仏教では「心」の象徴とされ、その主の定力だけを映す。'
    }
  },
  {
    id: 'jinggu',
    hanzi: '紧箍',
    pinyin: 'jǐngū',
    category: 'artifact',
    link: '/projects/wukong',
    en: {
      term: 'The Golden Fillet',
      def: 'The circlet Guanyin tricks Wukong into wearing. It cannot be removed, and it tightens into a killing headache the instant he breaks discipline. Probably the most literal piece of game design in Chinese myth: an unbreakable rule, enforced by pain, that the hero learns to live with rather than escape.'
    },
    zh: {
      term: '紧箍',
      def: '观音骗悟空戴上的金箍。摘不下来，一旦犯戒就收紧成要命的头痛。中国神话里最像游戏机制的一件东西：一条不能破除的规则，用痛觉强制执行，而主角最后学会的不是挣脱，是与它共处。'
    },
    ja: {
      term: '緊箍児（きんこじ）',
      def: '観音が悟空に嵌めた輪。外せず、戒めを破れば締まって激痛となる。中国神話でもっともゲームメカニクスらしい代物——破れないルールを痛みで強制し、主人公は逃れるのではなく共存を選ぶ。'
    }
  },
  {
    id: 'peachwood-sword',
    hanzi: '桃木剑',
    pinyin: 'táomù jiàn',
    category: 'artifact',
    en: {
      term: 'Peachwood Sword',
      def: 'Peach wood is the exorcist\'s metal. Folk belief holds that it repels evil by nature, so a peachwood sword wounds spirits while passing almost harmlessly through living people. A weapon that is useless against humans and lethal against gods.'
    },
    zh: {
      term: '桃木剑',
      def: '桃木是驱邪的「金属」。民间相信它天然克鬼，所以桃木剑能伤鬼、却几乎伤不到活人。一件对人无用、对鬼神致命的武器。'
    },
    ja: {
      term: '桃木の剣',
      def: '桃の木は祓いの「金属」である。邪を本能的に退けるとされ、桃木の剣は霊を傷つけ、生きた人にはほとんど通じない。人には無力で、神には致命的な武器。'
    }
  },
  {
    id: 'fuchen',
    hanzi: '拂尘',
    pinyin: 'fúchén',
    category: 'artifact',
    en: {
      term: 'Fly Whisk',
      def: 'Look past the horsehair. In a Taoist master\'s hand the whisk is not for shooing insects — it is an extension of qi, able to bind, parry, and sweep away dust and demons alike. The casual way a master carries it is the whole point: power that never needs to look ready.'
    },
    zh: {
      term: '拂尘',
      def: '别被马鬃骗了。在道士手里，拂尘不是赶蚊子的——它是气的延伸，能缠、能挡，能扫开灰尘也扫开妖魔。高人随手搭在臂上的那种随意感才是重点：真正的力量不必摆出架势。'
    },
    ja: {
      term: '払子（ほっす）',
      def: '馬の尾毛だと思うと外す。道士の手にある払子は虫を払う道具ではなく、気の延長だ。絡め、受け流し、塵も魔も掃い去る。達人が無造作に腕へ掛ける、その様子こそ本質——力は構えた顔をする必要がない。'
    }
  },
  {
    id: 'demon-mirror',
    hanzi: '照妖镜',
    pinyin: 'zhàoyāo jìng',
    category: 'artifact',
    en: {
      term: 'Demon-Revealing Mirror',
      def: 'A mirror that reflects not your face but your true form. In it a beautiful woman becomes a fox and a courtier becomes a beast. The most frightening thing in Chinese myth is rarely raw power — it is being seen accurately.'
    },
    zh: {
      term: '照妖镜',
      def: '照出的不是相貌，是本相。美人现出狐形，朝臣现出兽状。东方神话里最可怕的往往不是蛮力——是被准确地看见。'
    },
    ja: {
      term: '照妖鏡（しょうようきょう）',
      def: '映るのは顔ではない、正体だ。美女は狐に、廷臣は獣に戻る。東洋神話で最も恐ろしいのは蛮力ではない——正しく見られることである。'
    }
  },

  // ---------- 妖灵鬼怪 ----------
  {
    id: 'yao',
    hanzi: '妖',
    pinyin: 'yāo',
    category: 'being',
    link: '/projects/zhong-kui/lore',
    en: {
      term: 'Yao',
      def: 'Usually translated "demon", which is wrong. A yao is any creature — animal, plant, even an object — that has cultivated long enough to gain awareness and a form, often by sitting in the mountains for centuries. A yao has no fixed alignment: it is whatever its cultivation and its treatment made it.'
    },
    zh: {
      term: '妖',
      def: '译成 demon 是错的。凡是动物、草木、器物，修炼到开了灵智、修出形态，都可以叫妖，往往是在山里待了几百年成的。妖没有先天善恶：它长成什么样，取决于它怎么修、被人怎么对待。'
    },
    ja: {
      term: '妖（よう）',
      def: '「デーモン」と訳されるが誤り。妖とは獣・草木・器物が長く修行して霊智と姿を得たものの総称で、山に数百年いた結果であることが多い。妖に生来の善悪はない。どう修め、どう扱われたかがそれを決める。'
    }
  },
  {
    id: 'jing',
    hanzi: '精',
    pinyin: 'jīng',
    category: 'being',
    en: {
      term: 'Jing',
      def: 'The other half of the yao-jing pair. Where a yao tends to be formed and dangerous, a jing is the concentrated essence of a place or thing — the soul of a mountain, an old tree, a stone that has been prayed to for generations. In games, "jing" is usually the valuable drop: the refined part of the world.'
    },
    zh: {
      term: '精',
      def: '妖与精成对。妖偏成形、偏危险；精是某地某物的精华本身——山的魂、老树的灵、被祭拜了几代的石头。在游戏里，精通常就是掉落物：天地间被提纯的那一部分。'
    },
    ja: {
      term: '精（せい）',
      def: '妖と精は対をなす。妖は形を持ち危ういもの。精は土地や物そのものの凝縮された精髄——山の魂、老いた樹の霊、何代も祀られた石。ゲームでは精はドロップ品を指すことが多く、世界の研ぎ澄まされた部分である。'
    }
  },
  {
    id: 'gui',
    hanzi: '鬼',
    pinyin: 'guǐ',
    category: 'being',
    en: {
      term: 'Ghost',
      def: 'A ghost in Chinese thought is an administrative problem, not a spooky one. The dead are supposed to pass through the underworld on schedule; those who get stuck — improper burial, unpaid debts, unresolved grievance — linger and cause trouble. Which is exactly why the underworld needs a bureaucracy.'
    },
    zh: {
      term: '鬼',
      def: '在中国观念里，鬼更像行政问题，而不是恐怖问题。死者本该按流程穿过地府；卡在流程里的——葬得不对、债没还清、冤没申明——才会滞留作祟。地府之所以必须有庞大的官僚系统，正因如此。'
    },
    ja: {
      term: '鬼（おに）',
      def: '中国の死生観において、鬼はホラーではなく行政上の問題である。死者は定められた手続きに従って冥界を通るはずで、葬られ方の不備や未返済の借り、晴れぬ怨みによって滞ったものが祟る。ゆえに冥界には巨大な官僚機構が必要になる。'
    }
  },
  {
    id: 'fox-spirit',
    hanzi: '狐仙',
    pinyin: 'húxiān',
    category: 'being',
    en: {
      term: 'Fox Spirit',
      def: 'Nine-tailed foxes appear in Chinese records for over two thousand years, sliding between omen, monster, and lover. The fox spirit is the culture\'s most honest study of seduction and its price: what looks like romance is often a test of whether you can keep your wits.'
    },
    zh: {
      term: '狐仙',
      def: '九尾狐在中国文献里存在了两千多年，身份在祥瑞、妖物、情人之间反复横跳。狐仙是这套文化对「诱惑」最诚实的探讨——看起来是艳遇，考的其实是你守不守得住心神。'
    },
    ja: {
      term: '狐仙（こせん）',
      def: '九尾の狐は二千年以上にわたり中国の記録に現れ、瑞兆・怪物・情人と姿を変えてきた。狐仙は「誘惑」をめぐるこの文化のもっとも正直な探究であり、恋に見えるものは、心を保てるかどうかの試験である。'
    }
  },
  {
    id: 'wuchang',
    hanzi: '无常',
    pinyin: 'Wúcháng',
    category: 'being',
    en: {
      term: 'The Impermanence Twins',
      def: 'Two underworld officers, one black and one white, whose name simply means "impermanence" — death given a face. The tall one waves a fan and laughs; the short one scowls and drags. They do not judge anyone; they are only the escort service, which makes them the last thing you see before the paperwork begins.'
    },
    zh: {
      term: '无常',
      def: '地府的两名差役，一黑一白，名字就叫「无常」——死被拟人化成了两张具体的脸。高的一位摇着扇子笑，矮的一位板着脸拖人。他们不管审理，只负责押送——于是他们成了你在走流程之前见到的最后一张脸。'
    },
    ja: {
      term: '無常（むじょう）',
      def: '冥界の二人の役人。一人は黒、一人は白、その名は「無常」——死を人格化したものである。高いほうは扇を揺らして笑い、低いほうは仏頂面で引き立てる。彼らは裁かず、ただ護送する。だからこそ手続きが始まる前に見る最後の顔となる。'
    }
  },
  {
    id: 'meng-po',
    hanzi: '孟婆',
    pinyin: 'Mèng Pó',
    category: 'being',
    en: {
      term: 'Meng Po',
      def: 'The old woman at the bridge leading out of the underworld. She hands every departing soul a bowl of soup that erases its memories, so the next life can start clean. The oldest argument in this culture lives in that bowl: is forgetting a mercy, or the destruction of a self?'
    },
    zh: {
      term: '孟婆',
      def: '奈何桥头的老妇人。她给每一个过桥的魂魄递一碗汤，抹掉前世记忆，好让下一程走得干净。这套文化里最古老的争论就在这一碗上：遗忘是慈悲，还是对「我」的销毁？'
    },
    ja: {
      term: '孟婆（もうば）',
      def: '冥界を出る橋のたもとに立つ老女。渡る魂に一杯のスープを与え、前世の記憶を消して次の生を清らかにする。この文化における最古の問いがここにある——忘却は慈悲か、それとも自己の破壊か。'
    }
  },
  {
    id: 'judge',
    hanzi: '判官',
    pinyin: 'pànguān',
    category: 'being',
    link: '/projects/zhong-kui/lore',
    en: {
      term: 'Infernal Judge',
      def: 'The magistrate of the dead, seated behind a desk in the underworld with ledgers listing every life\'s deeds. Folklore keeps promoting real historical figures to the post — Bao Zheng, Zhong Kui — because the fantasy on offer is not power. It is a court that actually reads your file.'
    },
    zh: {
      term: '判官',
      def: '冥界的法官，坐在案台后，卷宗上记着每个人一生的功过。民间不断把真实的历史人物追封到这个位子上——包拯、钟馗——因为大家想要的不是权力，是一个真会认真翻你档案的法庭。'
    },
    ja: {
      term: '判官（はんかん）',
      def: '死者を裁く法曹。机の後ろに座し、すべての生前の行いが記された帳簿を握る。民間は実在の人物をこの職に推し続けてきた——包拯、鍾馗。人々が求めるのは権力ではなく、自分の記録を本当に読んでくれる法廷である。'
    }
  },
  {
    id: 'city-god',
    hanzi: '城隍',
    pinyin: 'Chénghuáng',
    category: 'being',
    en: {
      term: 'City God',
      def: 'Every city had a resident deity whose job was to run its own local underworld office. Appointed by the celestial court, promoted or demoted by emperors — the most bureaucratic god in the pantheon, and proof that in Chinese cosmology even the afterlife runs on appointments.'
    },
    zh: {
      term: '城隍',
      def: '每座城都有一位常驻神，负责本地冥界的运转，由天庭任命、由皇帝加封或贬黜。神界里最官僚的一位——说明在东方宇宙观里，连死后世界也是靠任命制运转的。'
    },
    ja: {
      term: '城隍神（じょうこうしん）',
      def: 'どの都市にも常駐の神がいて、その土地の冥界業務を担った。天庭が任じ、皇帝が加封し、あるいは貶した。神々のなかでもっとも官僚的であり、東洋の宇宙観では死後の世界さえ任命制で動くことの証拠である。'
    }
  },

  // ---------- 道家修行 ----------
  {
    id: 'dao',
    hanzi: '道',
    pinyin: 'dào',
    category: 'taoist',
    link: '/culture/taoism',
    en: {
      term: 'The Way',
      def: 'Not a road, and not a god. The Way is the pattern all things follow whether or not they know it — water going downhill, seasons turning, a swordsman finally stopping to think. To "get" the Way is not to gain a new power; it is to stop fighting the one you are already standing inside.'
    },
    zh: {
      term: '道',
      def: '道不是路，也不是神。它是万物无论知不知道都在遵循的那个规律：水往低处流，四时轮转，剑客终于停下来想了一想。得道不是获得新力量，而是不再与那个你本就身处其中的东西较劲。'
    },
    ja: {
      term: '道（どう）',
      def: '道は道ではなく、神でもない。すべてのものが、知っていようといまいと従っている法則そのもの——水は低きに流れ、季節は巡り、剣客はついに立ち止まって考える。道を得るとは新たな力を得ることではなく、すでに内側にあるものと争うのをやめることだ。'
    }
  },
  {
    id: 'qi',
    hanzi: '气',
    pinyin: 'qì',
    category: 'taoist',
    link: '/culture/taoism',
    en: {
      term: 'Qi',
      def: 'The medium underneath everything: breath, energy, momentum, weather. Health is qi flowing cleanly; illness and corruption are qi stuck or misdirected. In games it becomes stamina, magic, and stagger all at once — because the original idea genuinely does cover all three.'
    },
    zh: {
      term: '气',
      def: '一层底层介质：呼吸、能量、势头、天气，都是它。气顺则健，气滞或走岔就是病与邪。在游戏里它同时变成体力、法力和失衡值——因为原本这个概念确实同时包含这三样。'
    },
    ja: {
      term: '気（き）',
      def: 'すべての下にある媒体。呼吸、活力、勢い、天候。気が巡れば健やか、滞れば病となり邪となる。ゲームではスタミナ・魔力・体幹崩しを同時に担う——本来の概念が本当にその三つを覆っているからだ。'
    }
  },
  {
    id: 'yinyang',
    hanzi: '阴阳',
    pinyin: 'yīnyáng',
    category: 'taoist',
    link: '/culture/taoism',
    en: {
      term: 'Yin and Yang',
      def: 'Not good versus evil — two phases of a single cycle. Every extreme already contains the seed of its opposite, which is why the classic tactic is not to overpower force but to redirect it. The dot inside each half is the whole point: nothing is ever purely one thing.'
    },
    zh: {
      term: '阴阳',
      def: '不是善恶对立，是同一循环的两个相位。任何极端里都埋着对方的种子——所以最经典的战法不是压过力量，而是改它的方向。两半里各有一个点才是关键：没有东西是纯粹的。'
    },
    ja: {
      term: '陰陽（いんよう）',
      def: '善と悪ではない。ひとつの循環の二つの位相だ。あらゆる極には反対の種が宿る。ゆえに古典的な戦法は力をねじ伏せることではなく、向きを変えることにある。それぞれの中の点こそが本質——純粋に一方であるものは何もない。'
    }
  },
  {
    id: 'wuxing',
    hanzi: '五行',
    pinyin: 'wǔxíng',
    category: 'taoist',
    link: '/culture/taoism',
    en: {
      term: 'Five Elements',
      def: 'Wood, Fire, Earth, Metal, Water — but not five materials. Five phases that generate and overcome each other in a fixed loop: wood feeds fire, fire leaves earth, earth bears metal, metal carries water, water grows wood. Combat systems that feel "deep" in Chinese games are usually just this loop, taken seriously.'
    },
    zh: {
      term: '五行',
      def: '木火土金水，不是五种材料，是五个相位。它们按固定顺序相生相克：木生火、火生土、土生金、金生水、水生木。中国游戏里那些「有深度」的战斗系统，往往只是把这套循环当回事。'
    },
    ja: {
      term: '五行（ごぎょう）',
      def: '木・火・土・金・水。五つの素材ではなく、五つの位相である。決まった順に相生と相克を巡らせる——木は火を生み、火は土を生み、土は金を生み、金は水を生み、水は木を生む。中国ゲームの「深い」戦闘システムは、たいていこの循環を真面目に扱っただけである。'
    }
  },
  {
    id: 'neidan',
    hanzi: '内丹',
    pinyin: 'nèidān',
    category: 'taoist',
    link: '/culture/taoism',
    en: {
      term: 'Internal Alchemy',
      def: 'The upgrade from external alchemy: instead of brewing an elixir in a furnace, the Taoist refines their own body — breath, essence, spirit — until the pill forms inside it. The metaphor is exact, which is why cultivation fiction reads like leveling. You are the furnace.'
    },
    zh: {
      term: '内丹',
      def: '外丹的升级版：不再守着炉子炼药，而是把身体本身当炉鼎，炼精、炼气、炼神，最后在体内结出丹。这个比喻相当精确——也正因如此，修真小说读起来才像在升级：你就是那座炉子。'
    },
    ja: {
      term: '内丹（ないたん）',
      def: '外丹からの昇格。炉で薬を練るのではなく、身体そのものを炉とし、精・気・神を練り上げて体内に丹を結ぶ。比喩は極めて正確で、それゆえ修仙小説はレベル上げのように読める——あなた自身が炉なのだ。'
    }
  },
  {
    id: 'xiuxian',
    hanzi: '修仙',
    pinyin: 'xiūxiān',
    category: 'taoist',
    en: {
      term: 'Cultivation',
      def: 'A long project, measured in centuries, of becoming something other than human. Stages, breakthroughs, bottlenecks, resources — cultivation fiction is a progression system a thousand years older than video games, which is exactly why Chinese RPGs borrow its shape.'
    },
    zh: {
      term: '修仙',
      def: '一个以百年计的长线工程：把自己修成不再是人的东西。境界、突破、瓶颈、资源——修真体系是一套比电子游戏早了一千年的成长线，中国 RPG 借用它的形状并不奇怪。'
    },
    ja: {
      term: '修仙（しゅうせん）',
      def: '数百年を単位とする長期計画——人ならざるものへと変わる営み。段階、突破、行き詰まり、資源。修仙の体系はテレビゲームより千年早い成長システムであり、中国の RPG がその形を借りるのは当然である。'
    }
  },
  {
    id: 'dujie',
    hanzi: '渡劫',
    pinyin: 'dùjié',
    category: 'taoist',
    en: {
      term: 'Tribulation',
      def: 'The exam the universe sets before it lets you advance. Break through to the next stage and heaven sends lightning to test whether you actually earned it. A boss fight scheduled by the world itself — and the penalty for guessing wrong is death.'
    },
    zh: {
      term: '渡劫',
      def: '让你进阶之前，天地先出的那道考题。要突破到下一境，雷就劈下来了，检验你配不配。这是一场由世界本身安排的头目战，赌注是命。'
    },
    ja: {
      term: '渡劫（どこう）',
      def: '昇格を許す前に、天地が出す試験。次の段階へ突破しようとすれば雷が落ち、ふさわしいかを試す。世界そのものが用意したボス戦であり、失敗すれば命で払う。'
    }
  },
  {
    id: 'wuwei',
    hanzi: '无为',
    pinyin: 'wúwéi',
    category: 'taoist',
    en: {
      term: 'Wu Wei',
      def: 'Usually mistranslated as "doing nothing". It means not forcing — acting in such exact accord with the situation that the effort disappears. The strongest swordsman in wuxia is not the one who tries hardest; it is the one whose move was already the only one available.'
    },
    zh: {
      term: '无为',
      def: '常被误译成「什么都不做」。它指的是不硬来——和形势严丝合缝地配合，让「用力」这件事本身消失掉。武侠里最强的剑客不是最使劲的那个，而是那个出手已是唯一正解的人。'
    },
    ja: {
      term: '無為（むい）',
      def: '「何もしない」と誤訳される。意味は「無理をしない」——状況にあまりに正確に即して動くため、努力そのものが消えることだ。武侠で最強の剣客はもっとも力を込める者ではなく、その一手がすでに唯一の正解だった者である。'
    }
  },
  {
    id: 'bagua',
    hanzi: '八卦',
    pinyin: 'bāguà',
    category: 'taoist',
    en: {
      term: 'Bagua',
      def: 'Eight trigrams, each three lines long, broken or unbroken, arranged around a centre. Read together they describe every state a situation can occupy and how each turns into the next. A chart of change itself — the original state machine.'
    },
    zh: {
      term: '八卦',
      def: '八个三爻符号，阴爻阳爻相间，绕中宫排开。合起来描述一个处境所有可能的状态，以及每个状态怎么变成下一个。这是一张关于「变」本身的图表——最早的状态机。'
    },
    ja: {
      term: '八卦（はっけ）',
      def: '八つの卦。それぞれ三本の爻を陰陽で組み、中央を囲んで配置する。合わせ読めば、状況が取りうるあらゆる状態と、それが次へどう移るかを記述する。「変化」そのものの図であり、原初の状態遷移機械である。'
    }
  },
  {
    id: 'dantian',
    hanzi: '丹田',
    pinyin: 'dāntián',
    category: 'taoist',
    en: {
      term: 'Dantian',
      def: 'The field where the elixir is grown — an energy centre a few inches below the navel that Taoist practice treats as the body\'s furnace. Every "charge your power" mechanic has a home address in Chinese physiology, and this is it.'
    },
    zh: {
      term: '丹田',
      def: '炼丹的「田」，在脐下三寸左右的能量中枢，道家把它当作身体的炉子。「蓄力」这件事在东方身体观里有个具体地址，就是这里。'
    },
    ja: {
      term: '丹田（たんでん）',
      def: '丹を育てる「田」。臍下数センチにある気の中心で、道家は身体の炉とみなす。「力を溜める」という行為は東洋の身体観のなかに具体的な住所を持つ——ここである。'
    }
  },
  {
    id: 'grotto-heaven',
    hanzi: '洞天福地',
    pinyin: 'dòngtiān fúdì',
    category: 'taoist',
    en: {
      term: 'Grotto-Heaven',
      def: 'Pocket paradises hidden inside ordinary mountains, where time runs at a different rate and immortals keep house. The original open-world side area: a door in a cliff face, a whole world behind it, and a rule set that does not match the one outside.'
    },
    zh: {
      term: '洞天福地',
      def: '藏在寻常山里的口袋天堂，时间流速不同，仙人住在里面。这是最早的开放世界支线区域：崖壁上开一扇门，门后一个世界，运行规则和外面不一样。'
    },
    ja: {
      term: '洞天福地（どうてんふくち）',
      def: 'ありふれた山の内側に隠れた極小の楽園。時間の流れが異なり、仙人が暮らす。これは原初のオープンワールド寄り道エリアである——崖の扉、その奥の世界、そして外とは異なるルール。'
    }
  },

  // ---------- 三界与秩序 ----------
  {
    id: 'three-realms',
    hanzi: '三界',
    pinyin: 'sānjiè',
    category: 'cosmos',
    link: '/culture/basics',
    en: {
      term: 'The Three Realms',
      def: 'Heaven above, the human world in the middle, the underworld below — three stacked jurisdictions with different laws and an enormous amount of paperwork moving between them. Almost every plot in Chinese myth is a case of something crossing a boundary it should not have crossed.'
    },
    zh: {
      term: '三界',
      def: '上有天庭、中有人间、下有地府，三层辖区，法度不同，彼此之间还全靠文书往来。东方神话里几乎每个故事，都是某个东西越了它不该越的那条界。'
    },
    ja: {
      term: '三界（さんがい）',
      def: '上に天庭、中に人間界、下に冥界。三層の管轄は法を異にし、その間は膨大な文書のやり取りで成り立つ。東洋神話のほとんどすべての物語は、越えるべきでない境界を何かが越えた事件である。'
    }
  },
  {
    id: 'samsara',
    hanzi: '轮回',
    pinyin: 'lúnhuí',
    category: 'cosmos',
    link: '/culture/basics',
    en: {
      term: 'Samsara',
      def: 'The wheel of rebirth: death is a checkpoint, not an ending, and the next run starts from how this one went. It reframes death from a wall into a mechanic — which is why Chinese games can kill a character and still be telling the same story.'
    },
    zh: {
      term: '轮回',
      def: '生死轮转：死是一个存档点，不是终点，下一周目从哪开始取决于这一周目怎么打的。它把死亡从一堵墙变成了一条机制——所以中国游戏让一个角色死了，故事还能接着讲。'
    },
    ja: {
      term: '輪廻（りんね）',
      def: '生まれ変わりの輪。死はチェックポイントであり終点ではない。次の周回は今回の結果から始まる。死を壁からメカニクスへと組み替える——だから中国のゲームは、人物を殺しても同じ物語を語り続けられる。'
    }
  },
  {
    id: 'karma',
    hanzi: '因果',
    pinyin: 'yīnguǒ',
    category: 'cosmos',
    link: '/culture/basics',
    en: {
      term: 'Karma',
      def: 'Cause and effect — not a punishment handed down by a judge, but a ledger that balances by itself, sometimes across several lifetimes. Practically: no good deed in these stories is wasted, and no cruelty is free. That is where the endings get their weight.'
    },
    zh: {
      term: '因果',
      def: '因果不是判官下发的惩罚，是一本自己会平账的账本，有时要跨几世才平得上。落到实处就是：这些故事里没有白做的好事，也没有不付账的残忍——结局的分量全从这儿来。'
    },
    ja: {
      term: '因果（いんが）',
      def: '因果は裁き手が下す罰ではなく、自ら帳尻を合わせる帳簿であり、ときに数世をまたぐ。実践的には、これらの物語に無駄な善行はなく、ただで済む残虐もない——結末の重みはここから生まれる。'
    }
  },
  {
    id: 'mandate-of-heaven',
    hanzi: '天命',
    pinyin: 'tiānmìng',
    category: 'cosmos',
    link: '/projects/wukong',
    en: {
      term: 'Mandate of Heaven',
      def: 'The right to rule — and, crucially, the right to keep ruling — granted by heaven and revocable the moment you stop deserving it. It is why Chinese dynastic stories are about legitimacy rather than bloodline. Black Myth built its whole premise on a character whose name literally means "the one fate appointed".'
    },
    zh: {
      term: '天命',
      def: '统治的资格，由天授予，也可以因为你失德而随时收回。所以中国的王朝故事讲的是正当性，而不是血统。《黑神话》把整个前提压在一个名字上——「天命人」，被命数指派的那一个。'
    },
    ja: {
      term: '天命（てんめい）',
      def: '統治の資格。天が与え、ふさわしくなくなれば取り上げられる。中国の王朝物語が血統ではなく正統性をめぐるのはこのためだ。『黒神話』はその名を物語の前提に据えた——「天命人」、運命に任命された者である。'
    }
  },
  {
    id: 'heavenly-court',
    hanzi: '天庭',
    pinyin: 'Tiāntíng',
    category: 'cosmos',
    en: {
      term: 'The Heavenly Court',
      def: 'Not a paradise — a government. The Heavenly Court has ministries, censors, a payroll, and endless protocol; its deities hold rank and can be fined, demoted, or exiled. Its most striking feature is that it is boring on purpose: order is the point.'
    },
    zh: {
      term: '天庭',
      def: '天庭不是天堂，是一个政府。有部门、有监察、有编制、有繁琐的礼数；神仙有品级，会被罚俸、贬职、流放。它最狠的一点是刻意无趣：秩序本身就是目的。'
    },
    ja: {
      term: '天庭（てんてい）',
      def: '天庭は楽園ではない、政府である。部署があり、監察があり、俸禄があり、煩雑な礼がある。神々には位階があり、減俸・左遷・流刑がありうる。もっとも際立つ特徴は、意図的に退屈であること——秩序こそが目的なのだ。'
    }
  },
  {
    id: 'underworld',
    hanzi: '地府',
    pinyin: 'Dìfǔ',
    category: 'cosmos',
    en: {
      term: 'The Underworld',
      def: 'The bureaucratic mirror of heaven, where the dead are processed. Bridges to cross, cases to review, reincarnation queues to stand in. Its horror is not darkness — it is fairness. The file on you is accurate.'
    },
    zh: {
      term: '地府',
      def: '与天庭对应的冥界官僚系统，负责处理死者。有桥要过，有案子要审，有转世的队要排。它的恐怖之处不在黑暗，而在公正——关于你的那份档案，是准确的。'
    },
    ja: {
      term: '地府（じふ）',
      def: '天庭に対応する冥界の官僚機構。死者はここで処理される。渡る橋、裁かれる案件、転生の順番待ち。その恐怖は暗闇ではなく公正さにある——あなたの記録は、正確なのだ。'
    }
  },
  {
    id: 'yama',
    hanzi: '阎王',
    pinyin: 'Yánwáng',
    category: 'cosmos',
    en: {
      term: 'King Yama',
      def: 'The ruler of the underworld — originally imported from Indian Buddhism, then thoroughly naturalised into Chinese bureaucracy and split into ten departments. He is not the devil: he executes the sentence, but the ledger is what decides it.'
    },
    zh: {
      term: '阎王',
      def: '冥界之主。原本来自印度佛教，后来被彻底本土化，还拆成了十殿。他不是恶魔：他负责宣判和执行，但判什么，是账本说了算。'
    },
    ja: {
      term: '閻魔（えんま）',
      def: '冥界の主。もとはインド仏教から来て、中国の官僚制へ徹底的に同化され、十の殿に分かれた。彼は悪魔ではない——判決を執行するが、何を判じるかは帳簿が決める。'
    }
  },
  {
    id: 'river-of-forgetting',
    hanzi: '忘川',
    pinyin: 'Wàngchuān',
    category: 'cosmos',
    en: {
      term: 'River of Forgetting',
      def: 'The river at the exit of the underworld. Drink from it and the previous life is gone; refuse, and you carry it into the next one as a wound. Most Chinese ghost stories are really about which of the two a character chose.'
    },
    zh: {
      term: '忘川',
      def: '地府出口处的那条河。喝了，前世一笔勾销；不喝，就带着它进入下一世，当作一道伤。中国的鬼故事，多半真正在讲的是一个人选了哪一个。'
    },
    ja: {
      term: '忘川（ぼうせん）',
      def: '冥界の出口にある川。飲めば前世は消え、飲まなければ傷として次世へ持ち越す。中国の怪異譚の多くは、実のところどちらを選んだかの物語である。'
    }
  },

  // ---------- 神兽与典籍 ----------
  {
    id: 'shanhaijing',
    hanzi: '山海经',
    pinyin: 'Shānhǎi Jīng',
    category: 'beast',
    en: {
      term: 'Classic of Mountains and Seas',
      def: 'A pre-Qin geography of the world as it was imagined, cataloguing hundreds of creatures, lands, and omens. It is the closest thing this culture has to a shared monster manual — when a designer needs a boss, this is the shelf they pull from.'
    },
    zh: {
      term: '山海经',
      def: '先秦时代对想象中世界的地理志，记录了数百种异兽、方国与征兆。它是这套文化最接近「共用怪物图鉴」的东西——设计师缺一个 boss 的时候，翻的就是这一本。'
    },
    ja: {
      term: '山海経（せんがいきょう）',
      def: '先秦時代の、想像された世界の地理誌。数百の異獣・方国・兆を記録する。この文化が持つ「共通のモンスター図鑑」にもっとも近い書物であり、デザイナーがボスに困ったとき手に取る棚はここである。'
    }
  },
  {
    id: 'bai-ze',
    hanzi: '白泽',
    pinyin: 'Báizé',
    category: 'beast',
    link: '/projects/zhong-kui/lore',
    en: {
      term: 'Bai Ze',
      def: 'A mythical beast said to know the true name, form, and counter of every spirit in existence. It is the mythological answer to a bestiary: not a fighter, a database. Zhong Kui is sometimes painted riding it — a judge with an index.'
    },
    zh: {
      term: '白泽',
      def: '传说中知道天下所有精怪的真名、形貌与克制之法的神兽。它是「图鉴」这个概念的神话版本：不是战力，是数据库。有画里钟馗骑着它——法官带着索引。'
    },
    ja: {
      term: '白澤（はくたく）',
      def: 'あらゆる精霊の真名・姿・相克を知るという神獣。図鑑という概念そのものの神話版である——戦力ではなくデータベース。鍾馗がこれに跨る画がある、索引を連れた裁判官だ。'
    }
  },
  {
    id: 'taotie',
    hanzi: '饕餮',
    pinyin: 'Tāotiè',
    category: 'beast',
    en: {
      term: 'Taotie',
      def: 'A face with no body, only a mouth, cast into ancient bronze vessels: the pattern of insatiable appetite. It is read as a warning about greed and, just as often, as an embrace of it — the culture kept putting it on things meant for feasting.'
    },
    zh: {
      term: '饕餮',
      def: '只有一张嘴、没有身体的脸，刻在青铜器上：贪食之相。它常被解释为对贪欲的警告，也常被理解为对贪欲的拥抱——毕竟它一直刻在用来吃饭喝酒的器物上。'
    },
    ja: {
      term: '饕餮（とうてつ）',
      def: '口だけの顔、胴のない相貌。青銅器に刻まれた——飽くことのない欲の意匠である。貪欲への警告とも読まれ、同時に貪欲への肯定とも読まれる。宴の器に刻まれ続けたのだから。'
    }
  },
  {
    id: 'qilin',
    hanzi: '麒麟',
    pinyin: 'Qílín',
    category: 'beast',
    en: {
      term: 'Qilin',
      def: 'A hooved, scaled, deer-horned creature that appears only when the realm is well governed, and hurts nothing on purpose — it is said to walk without treading on living grass. A good omen, and a reminder that this pantheon\'s highest aspiration is not strength. It is deserving to exist.'
    },
    zh: {
      term: '麒麟',
      def: '有蹄、有鳞、有角，只在天下太平时才现身的瑞兽，而且刻意不伤活物——传说它走路不踩活草。东方的祥瑞，同时也在提醒一件事：这套神话体系的最高追求不是力量，是「配得上存在」。'
    },
    ja: {
      term: '麒麟（きりん）',
      def: '蹄と鱗と鹿の角を持ち、世がよく治まったときだけ現れる瑞獣。しかも故意に何も傷つけない——生きた草を踏まずに歩くという。東洋の吉兆であり、同時にこの神話体系の最高の志向は力ではなく「存在に値すること」だと告げている。'
    }
  },
  {
    id: 'dragon',
    hanzi: '龙',
    pinyin: 'lóng',
    category: 'beast',
    en: {
      term: 'Dragon',
      def: 'Chinese dragons are not treasure-hoarding lizards. They are water deities, weather, and imperial authority — long, serpentine, whiskered, and mostly benevolent, though perfectly willing to flood a province. The point of a dragon is that it is vast, ancient, and does not require your opinion.'
    },
    zh: {
      term: '龙',
      def: '东方的龙不是守着宝的小蜥蜴。它是水神、是天气、是皇权——长条、蛇形、有须，大多是善的，但淹掉一个省也毫无心理负担。龙的重点在于它极大、极老，而且不需要征求你的意见。'
    },
    ja: {
      term: '龍（りゅう）',
      def: '東洋の龍は宝物を抱えた蜥蜴ではない。水の神であり、天候であり、皇権である。長く、蛇のごとく、顎髭を持ち、多くは善だが、一省を洪水で沈めることも辞さない。龍の要点は、広大で古く、あなたの意見を必要としないことである。'
    }
  }
]
