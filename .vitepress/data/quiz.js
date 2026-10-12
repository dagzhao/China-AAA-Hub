/**
 * 神话人格测验数据（三语）
 * - ARCHETYPE_META：原型的视觉/跳转信息，三语共用
 * - SCORES：每题每个选项的加权分值，三语共用，保证三种语言的计分逻辑一致
 * - QUIZ：分语言的文案；questions[i].options 与 SCORES[i] 一一对应
 */

export const TIE_ORDER = [
  'destined',
  'judge',
  'alchemist',
  'blade',
  'nameless',
  'wanderer'
]

export const ARCHETYPE_META = {
  destined: {
    hanzi: '天命人',
    pinyin: 'Tiānmìng Rén',
    accent: '#d4a017',
    link: '/projects/wukong'
  },
  judge: {
    hanzi: '钟馗',
    pinyin: 'Zhōng Kuí',
    accent: '#a30000',
    link: '/projects/zhong-kui/lore'
  },
  alchemist: {
    hanzi: '炼气士',
    pinyin: 'Liànqì Shì',
    accent: '#6a9955',
    link: '/culture/taoism'
  },
  blade: {
    hanzi: '影刃',
    pinyin: 'Yǐng Rèn',
    accent: '#4a90d9',
    link: '/projects/phantom-blade'
  },
  nameless: {
    hanzi: '无名者',
    pinyin: 'Wúmíng Zhě',
    accent: '#9a9a9a',
    link: '/projects/wuchang'
  },
  wanderer: {
    hanzi: '游侠',
    pinyin: 'Yóuxiá',
    accent: '#c98b2e',
    link: '/projects/yanyun'
  }
}

// 每题 4 个选项，对应 QUIZ[lang].questions[i].options[0..3]
export const SCORES = [
  [
    { destined: 2, nameless: 1 },
    { judge: 2, wanderer: 1 },
    { nameless: 2, judge: 1 },
    { alchemist: 2, blade: 1 }
  ],
  [
    { destined: 2, wanderer: 1 },
    { judge: 2, alchemist: 1 },
    { alchemist: 2, wanderer: 1 },
    { blade: 2, nameless: 1 }
  ],
  [
    { destined: 2, blade: 1 },
    { alchemist: 2, destined: 1 },
    { judge: 2, nameless: 1 },
    { wanderer: 2, blade: 1 }
  ],
  [
    { destined: 2, blade: 1 },
    { judge: 2, wanderer: 1 },
    { nameless: 2, alchemist: 1 },
    { blade: 2, nameless: 1 }
  ],
  [
    { alchemist: 2, destined: 1 },
    { nameless: 2, judge: 1 },
    { blade: 2, wanderer: 1 },
    { wanderer: 2, judge: 1 }
  ],
  [
    { blade: 2, destined: 1 },
    { wanderer: 2, judge: 1 },
    { nameless: 2, wanderer: 1 },
    { wanderer: 2, nameless: 1 }
  ]
]

export const QUIZ = {
  en: {
    kicker: 'Culture Decoder · Module 02',
    title: 'Which Chinese Myth Archetype Are You?',
    intro:
      'Six questions. No right answers. Every choice points at one of six archetypes that Chinese action games keep returning to — the rebel, the judge, the alchemist, the blade, the nameless, the wanderer. Find out which one you have been playing all along.',
    meta: '6 questions · about 90 seconds · instant result',
    start: 'Begin',
    questionLabel: 'Question',
    ofLabel: 'of',
    back: 'Back',
    resultKicker: 'Your archetype',
    traitsLabel: 'Traits',
    share: 'Copy result link',
    copied: 'Link copied',
    restart: 'Take it again',
    disclaimer:
      'Result links carry your archetype in the URL — share it with a friend and they will see your result.'
  },

  zh: {
    kicker: '文化解码 · 模块 02',
    title: '你是哪种东方神话原型？',
    intro:
      '六道题，没有标准答案。每一个选择都指向中国动作游戏反复回到的六种原型——天命人、判官、炼气士、影刃、无名者、游侠。看看你一直在演的，其实是哪一个。',
    meta: '6 道题 · 约 90 秒 · 即时出结果',
    start: '开始',
    questionLabel: '第',
    ofLabel: '/',
    back: '上一题',
    resultKicker: '你的原型是',
    traitsLabel: '你的底色',
    share: '复制结果链接',
    copied: '链接已复制',
    restart: '再测一次',
    disclaimer: '结果会写进链接里——发给朋友，他打开就能看到你测出来的是谁。'
  },

  ja: {
    kicker: '文化デコード · モジュール 02',
    title: 'あなたはどの東洋神話の原型か？',
    intro:
      '六つの問い。正解はない。中国のアクションゲームが何度も立ち返る六つの原型——天命人、判官、煉気士、影刃、無名者、遊侠。あなたがずっと演じてきたのは、どの姿だろうか。',
    meta: '全6問 · 約90秒 · 結果はすぐに',
    start: '始める',
    questionLabel: 'Q',
    ofLabel: '/',
    back: '前の質問',
    resultKicker: 'あなたの原型',
    traitsLabel: 'あなたの底色',
    share: '結果リンクをコピー',
    copied: 'リンクをコピーしました',
    restart: 'もう一度',
    disclaimer: '結果はリンクに含まれます。友人に送れば、あなたの原型がそのまま表示されます。'
  },

  questions: {
    en: [
      {
        q: 'Past midnight, an unsigned letter slides under your door. Which line do you hope it says?',
        options: [
          '"Your fate was written by someone else a long time ago."',
          '"Someone is doing evil in the land you answer for."',
          '"You smell of blood. It does not wash off."',
          '"The path you have been cultivating was wrong from the first step."'
        ]
      },
      {
        q: 'You leave home with exactly one thing. What is it?',
        options: [
          'A wooden staff of unknown origin',
          'A stack of blank talisman papers',
          'A gourd you have carried for years',
          'A blade with no name'
        ]
      },
      {
        q: 'Something blocks the mountain path and will not let you pass.',
        options: [
          'Meet it head-on. Strike first.',
          'Borrow its force, and give it back to itself.',
          'Ask it one question: who are you, and why are you standing there?',
          'Walk around it. It was never the target.'
        ]
      },
      {
        q: 'Which of these frightens you more?',
        options: [
          'Living a whole life inside someone else\'s script',
          'Watching an injustice happen, and doing nothing',
          'Forgetting who you are, and why you are still alive',
          'Reaching the end without ever touching the Way'
        ]
      },
      {
        q: 'You are walking a long mountain road.',
        options: [
          'I am heading for the summit. I hear the answer is up there.',
          'I am not going up. I am looking for someone further down.',
          'It is just a road. I will walk wherever it goes.',
          'I am not travelling. I am paying something back.'
        ]
      },
      {
        q: 'In the story they will tell about you, what do you leave behind?',
        options: [
          'A staff that is still burning',
          'A road that is not on any map',
          'A lamp that is still lit',
          'Half a jug of wine nobody finished'
        ]
      }
    ],

    zh: [
      {
        q: '深夜，一封没有署名的信从门缝滑进来。你希望上面写着——',
        options: [
          '「你的命数，早有人替你写好了。」',
          '「在你管辖的地界，有人作恶。」',
          '「你身上有股血味，洗不掉的。」',
          '「你修的那条路，从第一步就走错了。」'
        ]
      },
      {
        q: '出门只能带一件东西，你选——',
        options: [
          '一根不知来历的木棍',
          '一沓空白的符纸',
          '一只用了很多年的葫芦',
          '一把没有名字的刀'
        ]
      },
      {
        q: '有东西挡在山道正中，不肯让路。',
        options: [
          '硬碰硬，先出手再说',
          '借它的力，还给它自己',
          '先问一句：你是谁，为什么挡在这里？',
          '绕开它。我的目标从来不是它。'
        ]
      },
      {
        q: '你更怕哪一件事？',
        options: [
          '一辈子活在别人写好的剧本里',
          '眼睁睁看着不公发生，却什么也没做',
          '忘了自己是谁，为什么活到今天',
          '走到尽头，仍没摸到「道」的边'
        ]
      },
      {
        q: '你走在一条很长的山道上。',
        options: [
          '我在找山顶，听说那里有答案',
          '我不上山。我在找山下的那个人。',
          '山道而已，走哪算哪',
          '我不是在赶路，我是在还债'
        ]
      },
      {
        q: '传说里，你最后留下了什么？',
        options: [
          '一根还在燃烧的棍子',
          '一条地图上找不到的路',
          '一盏还亮着的灯',
          '半壶没喝完的酒'
        ]
      }
    ],

    ja: [
      {
        q: '深夜、署名のない手紙が戸の隙間から滑り込む。そこに書かれていてほしい一言は？',
        options: [
          '「お前の運命は、とうに誰かが書き終えている」',
          '「お前が治める地で、悪さをする者がある」',
          '「お前からは血の匂いがする。洗っても落ちない」',
          '「お前が歩いてきた道は、最初の一歩から間違っていた」'
        ]
      },
      {
        q: '家を出る。持っていけるのは一つだけ。',
        options: [
          '由来の分からない木の棒',
          '白紙の符（おふだ）を一束',
          '何年も使い込んだ瓢箪',
          '名もなき刀'
        ]
      },
      {
        q: '山道の真ん中に何かが立ちはだかり、道を譲らない。',
        options: [
          '正面からぶつかる。先に手を出す。',
          '相手の力を借りて、そのまま返す。',
          'ひとつだけ問う——お前は誰だ、なぜここに立つ。',
          '迂回する。目的はそいつではない。'
        ]
      },
      {
        q: 'あなたがもっとも恐れるのは？',
        options: [
          '他人が書いた筋書きの中で一生を終えること',
          '不正が起きるのを、何もせずに見ていること',
          '自分が誰で、なぜ生きているのか分からなくなること',
          '辿り着いても、道に触れられないこと'
        ]
      },
      {
        q: '長い山道を歩いている。',
        options: [
          '頂上を目指している。答えはそこにあると聞いた。',
          '上へは行かない。下にいる、あの人を探している。',
          'ただの道だ。流れのままに歩く。',
          '旅ではない。返しに行くのだ。'
        ]
      },
      {
        q: 'あなたの物語に、最後まで残るものは？',
        options: [
          'まだ燃えている棒',
          '地図に載っていない道',
          'まだ灯っている明かり',
          '飲み残した酒が半分'
        ]
      }
    ]
  },

  results: {
    en: {
      destined: {
        name: 'The Destined One',
        epithet: 'They wrote my fate. Nobody asked me.',
        desc: 'You were never born a rebel. You simply cannot stomach "that is how it has always been." Handed a road, you walk it to the very end just to see what lies past it. You lose, you fall, people call it pointless — and you refuse to let anyone else hold the pen that writes your fate.',
        traits: ['Defiant', 'Rises every time', 'Stubborn to the bone'],
        cta: 'Read the Wukong chronicle'
      },
      judge: {
        name: 'The Ghost Eater',
        epithet: 'If nobody will judge them, I will.',
        desc: 'You do not tolerate rot. You are not the gentle kind of good — you know some evils will never listen to reason and simply have to be put down. You carry far more than you say out loud. People are frightened of your temper; only you know what you are standing in front of.',
        traits: ['Fierce', 'Carries it silently', 'Cold outside, burning inside'],
        cta: 'Read the Zhong Kui chronicle'
      },
      alchemist: {
        name: 'The Taoist Alchemist',
        epithet: 'The Way is simple. I still want to take it apart.',
        desc: 'You are in no hurry to win. Everything runs by a pattern — understand it, and you never have to force a thing. People think you are staring into space; you are running the simulation. You do not do "close enough." You do "exactly right."',
        traits: ['Calculated', 'Unshakeable', 'Obsessed with precision'],
        cta: 'Open the Taoism Code'
      },
      blade: {
        name: 'The Shadow Blade',
        epithet: 'Sixty-six days left. Talk fast or do not.',
        desc: 'Few words, quick hands, no explanations. You believe results beat posturing, and that nothing counts until it is finished. You move alone — not because you dislike people, but because you genuinely do not have the time.',
        traits: ['Efficient', 'Solitary', 'No half measures'],
        cta: 'Read the Phantom Blade chronicle'
      },
      nameless: {
        name: 'The Nameless',
        epithet: 'I forget who I am. I remember what I owe.',
        desc: 'There is a story behind you, and you do not tell it. You have done things you regret, and you carry debts that were never yours to begin with. You keep walking not because you have hope, but because standing still hurts more. You want to be forgiven. You never say so.',
        traits: ['Burdened', 'Self-examining', 'Seeking redemption'],
        cta: 'Read the Wuchang chronicle'
      },
      wanderer: {
        name: 'The Wanderer',
        epithet: 'The jianghu has no rules. Mine are the only ones I keep.',
        desc: 'You cannot stand "because you have to." Sects, codes, other people\'s expectations — if there is a way around, you take it. It is not that you do not care; you just insist on choosing what to care about. You go wherever the road goes, but every step of it was yours.',
        traits: ['Untethered', 'Easy-going', 'Unruled'],
        cta: 'Read the Where Winds Meet chronicle'
      }
    },

    zh: {
      destined: {
        name: '天命人',
        epithet: '命是别人写的，但我没同意过。',
        desc: '你不是天生的反骨，只是受不了「事情本来就该这样」。别人给你一条路，你偏要走到尽头，看看尽头之外是什么。你会输，会摔，会被人说是徒劳——但你不肯把「命」这个字，交给别人来写。',
        traits: ['不服输', '越挫越勇', '认死理'],
        cta: '读《黑神话：悟空》'
      },
      judge: {
        name: '钟馗',
        epithet: '世上若无人主持公道，那就我来。',
        desc: '你眼里揉不得沙子。你不是温和的那种好人——你相信有些恶，讲道理是没用的，必须有人把它按下去。你扛的东西比说出来的多得多。别人怕你凶，只有你自己知道你挡在什么东西前面。',
        traits: ['嫉恶如仇', '沉默扛事', '外冷内热'],
        cta: '读《黑神话：钟馗》'
      },
      alchemist: {
        name: '炼气士',
        epithet: '大道至简，可你偏要把它拆开看。',
        desc: '你不急着赢。你信世上所有事都有它的运转方式，看懂了，就不必硬拼。别人觉得你在发呆，其实你在推演。你讨厌「差不多」，你喜欢「刚刚好」。',
        traits: ['谋定后动', '沉得住气', '追求极致'],
        cta: '打开《道教密码》'
      },
      blade: {
        name: '影刃',
        epithet: '还剩六十六天，长话免谈。',
        desc: '你话少，手快，不解释。你信效率胜过姿态，信一件事做完了才算数。你独来独往——不是不合群，是你真的没时间。',
        traits: ['干脆利落', '独来独往', '快意恩仇'],
        cta: '读《影之刃零》'
      },
      nameless: {
        name: '无名者',
        epithet: '我不记得我是谁，但我记得我欠了什么。',
        desc: '你身上有故事，可你不讲。你做过后悔的事，也背着本不该你背的债。你往前走，不是因为有希望，而是因为停下来更难受。你想被原谅，虽然你从不说出口。',
        traits: ['负重前行', '沉默自省', '寻求救赎'],
        cta: '读《明末：渊虚之羽》'
      },
      wanderer: {
        name: '游侠',
        epithet: '江湖没有规矩，规矩是我自己定的。',
        desc: '你受不了「必须这样」。门派、规矩、别人的期待——能绕就绕。你不是不在乎，你只是坚持由自己决定在乎什么。你走到哪算哪，但每一步都是你自己选的。',
        traits: ['自由不羁', '随性洒脱', '不认规矩'],
        cta: '读《燕云十六声》'
      }
    },

    ja: {
      destined: {
        name: '天命人',
        epithet: '運命は書かれた。だが、俺は同意していない。',
        desc: 'あなたは生まれつきの反逆者ではない。「昔からそうだから」という一言が、どうしても飲み込めないだけだ。与えられた道を、その先に何があるのか確かめるまで歩き続ける。負けるし、転ぶし、無駄だと笑われる。それでも、自分の「運命」を他人に書かせる気はない。',
        traits: ['不屈', '何度でも立つ', '頑固'],
        cta: '『黒神話：悟空』を読む'
      },
      judge: {
        name: '鍾馗',
        epithet: '誰も裁かないのなら、俺が裁く。',
        desc: 'あなたは腐ったものを許せない。優しい善人ではない——理屈の通じない悪は、力でねじ伏せるしかないと知っている。背負っているものは、口にした分の比ではない。周りはあなたの激しさを怖がるが、あなたが何の前に立っているかを知るのは自分だけだ。',
        traits: ['正義感', '黙って背負う', '外冷内熱'],
        cta: '『黒神話：鍾馗』を読む'
      },
      alchemist: {
        name: '煉気士',
        epithet: '道は単純だ。だから分解して確かめたい。',
        desc: 'あなたは急いで勝とうとしない。物事にはすべて理があり、理解すれば力ずくで押す必要はない。ぼんやりしていると思われても、頭の中では計算を回している。「だいたい合っている」が嫌いで、「ちょうどいい」を求める。',
        traits: ['熟慮', '動じない', '完璧主義'],
        cta: '『道教のコード』を開く'
      },
      blade: {
        name: '影刃',
        epithet: '残り六十六日。長話は無用だ。',
        desc: '口数は少なく、手は速く、説明はしない。見栄より結果、終わらせてこそ意味があると信じている。一人で動く——人が嫌いなのではなく、本当に時間がないのだ。',
        traits: ['迅速', '孤高', '潔い'],
        cta: '『影之刃零』を読む'
      },
      nameless: {
        name: '無名者',
        epithet: '自分が誰かは覚えていない。負っているものは覚えている。',
        desc: 'あなたには物語がある。だが語らない。後悔していることがあり、本来背負うはずのない借りも背負っている。希望があるから歩くのではない、立ち止まるほうがずっと辛いから歩く。赦されたいと願っている。口には出さないけれど。',
        traits: ['重荷を負う', '内省', '贖罪'],
        cta: '『明末：淵虚之羽』を読む'
      },
      wanderer: {
        name: '遊侠',
        epithet: '江湖に決まりはない。決まりは自分で作る。',
        desc: 'あなたは「そうしなければならない」が耐えられない。門派、しきたり、他人の期待——避けられるなら避ける。無関心なのではない、何を大事にするかを自分で決めたいだけだ。流れのままに歩くが、その一歩一歩は自分が選んだものだ。',
        traits: ['自由奔放', '飄々', '不羈'],
        cta: '『燕雲十六声』を読む'
      }
    }
  }
}
