---
description: "Alchemy, talismans, gourd healing and internal cultivation: how Taoist ideas shape combat and power systems in Chinese AAA games."
date: 2026-02-05
---

# The Taoism Code: Why Chinese Combat Is Metaphysics

In *Black Myth: Wukong*, when your health runs low you drink from a **gourd**. Why a gourd?
When a boss winds up a heavy swing, the game rewards you for meeting it head-on instead of rolling away. Why is standing your ground the *better* option?
And why do so many Chinese games use an element system that isn't symmetric — where fire melts metal, but metal cuts wood?

None of this was invented by a designer. All three answers come from the same place.

This page is built in three layers. **Layer 1** is what you actually see on screen. **Layer 2** connects those pieces into one working model. **Layer 3** shows where the model came from. Every topic has folded panels underneath — open the ones you want and skip the rest.

---

## Layer 1 · What You Are Actually Looking At

| Sigil | Where you meet it | What it actually means | Entry |
| :--- | :--- | :--- | :--- |
| **Yin-Yang** 阴阳 | Parry, deflect, dodge | Not good vs. evil — two phases of a single cycle | [→](/glossary#yinyang) |
| **Qi** 气 | Stamina bar, charge-up, poise | The medium underneath everything, not a mana pool | [→](/glossary#qi) |
| **Five Elements** 五行 | Elemental status, resistances | Not damage types — a directed graph of *relationships* | [→](/glossary#wuxing) |
| **Elixir / Dan** 丹 | Pills, buffs, healing | A refined concentrate. Your body can be the furnace too | [→](/glossary#neidan) |
| **Dantian** 丹田 | The charge point, the "core" | A charging mechanic has an actual address in the body | [→](/glossary#dantian) |
| **Talisman** 符 | Throwable paper consumables | An order issued under a higher authority | [→](/glossary#fu) |
| **Gourd** 葫芦 | Your healing flask | A miniature universe that separates pure from turbid | [→](/glossary#hulu) |
| **Peachwood Sword** 桃木剑 | A weapon that only hurts spirits | Lethal to gods, nearly harmless to people | [→](/glossary#peachwood-sword) |
| **Demon Mirror** 照妖镜 | The reveal / dispel tool | It doesn't show a face, it shows a true form | [→](/glossary#demon-mirror) |
| **Fly Whisk** 拂尘 | A master's "useless" weapon | An extension of qi, not a duster | [→](/glossary#fuchen) |
| **Bagua** 八卦 | Buff circles, formations | A diagram of change itself — the original state machine | [→](/glossary#bagua) |
| **Tribulation** 渡劫 | The lightning boss before a breakthrough | Heaven's exam, scheduled by the world itself | [→](/glossary#dujie) |

Twelve symbols. They look like a pile of unrelated flavour. They are not.

---

## Layer 2 · How They Fit Together

### 1. Yin-Yang is a phase, not a faction

Western fantasy runs on binary opposition: Light and Shadow, Order and Chaos, two teams facing each other. Taoism has no such structure.

Yin and Yang are not two armies. They are two phases of one cycle — and each one already contains the seed of the other. That is what the two dots in the symbol mean: nothing is ever purely one thing.

Applied to combat, this changes what "getting stronger" means. It is no longer "my stat beats your stat". It is "I read your phase, and then I change its direction."

::: details Open: "Using softness to overcome hardness" does not mean fighting like a coward

Beginners read Yin as "yielding" — backing off, giving ground. It is the opposite. Yin is a *more advanced* way of applying force: not refusing to push, but refusing to push *against*.

You receive the incoming force, and you send it back where it came from.

This is why Chinese action games so often reward the parry more than the dodge. A dodge is avoidance — you declined the exchange. A parry converts the enemy's attack into your own resource. One is negative space; the other is a reversal.
:::

::: details Open: Where the idea actually comes from

*Daodejing*, chapter 40: **"Reversal is the movement of the Way"** (反者道之动). Things driven to an extreme turn into their opposite. That is the original statement of the "phase" reading.

Zhou Dunyi, *Explanation of the Diagram of the Supreme Polarity* (11th c.): the Supreme Polarity in motion generates Yang; when motion reaches its limit, it becomes stillness, and stillness generates Yin. Yin and Yang are two *states of motion* — not two substances.
:::

### 2. The Five Elements are relationships, not damage types

A Western RPG element system is symmetric: fire is strong against ice, ice is strong against fire. Two lists pointing at each other.

Wu Xing is not symmetric. It is a **directed graph with two arrows between every pair of neighbours**:

- **Generating cycle** 相生 — Wood → Fire → Earth → Metal → Water → Wood
- **Overcoming cycle** 相克 — Wood → Earth → Water → Fire → Metal → Wood

| Element | Generates | Overcomes | Overcome by | Typical combat role |
| :--- | :--- | :--- | :--- | :--- |
| **Wood 木** | Fire | Earth | Metal | Regeneration, crowd control |
| **Fire 火** | Earth | Metal | Water | Burn damage, burst |
| **Earth 土** | Metal | Water | Wood | Defence, poise, heavy stance |
| **Metal 金** | Water | Wood | Fire | Sharpness, critical, armour break |
| **Water 水** | Wood | Fire | Earth | Freeze, fluid movement |

The same element that feeds its neighbour *suppresses* the one after that. Position on the ring determines everything.

This explains two things at once. It is why Chinese games can build a genuinely deep element system — you are not picking a damage type, you are picking a **seat on a ring**. And it is why so many games only manage a cosmetic one: a damage-multiplier table is cheap. Actually modelling the ring is not.

::: details Open: Why the generating cycle is so much harder to design

Overcoming is easy to implement. You attach a multiplier.

Generating is hard, because it requires "I got stronger" to happen *to someone else* — a teammate, an environment, a summon. Most systems quietly drop it, which is why their Wu Xing ends up as a plain resistance chart with Chinese labels.

Done well, generating becomes buff propagation: a Wood character feeds a Fire character, who passes it onward. Done badly, it becomes "same element = resistance", which is just an ordinary resistance table wearing a costume.
:::

::: details Open: Where the idea actually comes from

*The Book of Documents*, "Great Plan" (尚书·洪范) is the earliest listing: "The five elements: first Water, second Fire, third Wood, fourth Metal, fifth Earth." Note what it does *not* say. It names them; it does not rank them, and it does not yet say who beats whom.

Arranging the five into the generating and overcoming cycles is a later construction, worked out across the Warring States and Han. Dong Zhongshu's *Chunqiu Fanlu* systematised it into a full political cosmology — the five phases explained not just nature but the succession of dynasties.

So from the very beginning, Wu Xing was never "elemental damage". It was **a theory of relationships**.
:::

### 3. Qi is a medium, not a blue bar

Almost every game has a mana bar. Qi is not mana, and the difference matters.

Mana is a **resource**. It has no physical meaning; it only records how many spells you have left.

Qi is a **medium**. It is breath and stamina and momentum and weather at the same time. When qi flows cleanly you are healthy. When it stalls, or runs down the wrong channel, you get ill — or corrupted.

This is why Chinese settings keep doing something Western ones find strange: stamina and magic turn out to be **the same substance**. Under this framework they genuinely are. You are not spending two different pools; you are spending one medium in two directions.

::: details Open: What "qi deviation" actually means

走火入魔 — literally "the fire runs wild, the demon enters". It is a real risk concept from internal alchemy: a cultivation practice goes wrong, and the practitioner loses control.

In games it surfaces as overcharged attacks that rebound on you, forbidden techniques that cost sanity, a shattered core that leaves you staggered. These are not arbitrary penalties. They are the direct consequences of the premise that qi can be pushed down the wrong channel.
:::

::: details Open: Where the idea actually comes from

*Zhuangzi*, "Knowledge Rambling in the North": "A person's life is a gathering of qi. Gather — and there is life. Scatter — and there is death."

The *Huangdi Neijing*, the foundational text of Chinese medicine, treats qi as the basic medium of the body. The entire concept of 气血 — qi and blood — comes from there.
:::

### 4. Dan means treating your body as the furnace

Early Taoism pursued **external alchemy** (外丹): brew an elixir of immortality in a furnace out of cinnabar, lead, and mercury. This was a centuries-long experimental programme that killed a number of its practitioners — including several Tang emperors.

Then the tradition turned inward. **Internal alchemy** (内丹) stopped brewing pills and made the body itself the crucible: refining essence, then qi, then spirit, until the elixir forms inside you.

That turn explains something about games. Why does the Chinese RPG progression curve look like a cultivation ladder? Because **cultivation already was one** — a ready-made progression system with stages, bottlenecks, and breakthroughs, a thousand years older than the medium.

::: details Open: Why "realms" map so cleanly onto levels

Internal alchemy was divided into stages — build the foundation, refine essence into qi, refine qi into spirit, return spirit to emptiness — each with recognised markers and known walls.

Drop that straight into a game and you do not have to invent a level curve. The stage names, the breakthrough conditions, and the failure penalty (qi deviation) are all already written. This is why cultivation fiction and game progression translate into each other so easily — they are structurally the same object.
:::

::: details Open: Where the idea actually comes from

*Cantong qi* (周易参同契, "The Seal of the Unity of the Three"), attributed to Wei Boyang in the Eastern Han, is honoured as the ancestor text of internal alchemy — the first attempt to systematise it as a coherent theory.

Ge Hong's *Baopuzi*, Inner Chapters (抱朴子·内篇, c. 4th c.) records large numbers of external-alchemy recipes. It is also a key document of the transition — Ge Hong brews cinnabar *and* writes about nourishing life. You can watch the tradition changing its mind.
:::

### 5. A talisman is an order issued under higher authority

Western magic is generally *possession*: the mage has power, and casts a spell.

A Taoist talisman is *authority*: the practitioner issues an order in the name of a higher heaven. The caster does not own the power. The caster **executes** it.

The distinction is the whole point. A mana pool can be drained, countered, dispelled. A warrant signed in the name of the Jade Emperor does not, in theory, leave the recipient any room to refuse.

This is why talismans in these stories are used against things you cannot simply kill. You seal a ghost, expel a ghost, escort a ghost away. You rarely "kill" one — because killing it was never within your authority to begin with.

::: details Open: Why magic weapons have to "acknowledge an owner"

Talismans, seals and tablets all share one precondition: **authority has to be granted**. A talisman drawn by someone outside the lineage is scrap paper.

That logic extends straight into games. Why can you pick up a legendary weapon and not be able to use it until it "acknowledges" you, or you complete an inheritance quest, or it is consecrated? That is not mystical decoration. It is the talisman premise applied to objects: the qualification to use a tool comes from authorisation, not from how strong you personally are.
:::

::: details Open: Where the idea actually comes from

The *Daozang* (道藏), the Taoist canon, preserves a large body of texts from the talisman and register schools (符箓派).

The traditional format of a talisman is rigidly structured — the opening stroke, the head, the core, the foot — and these correspond to a surprisingly bureaucratic set of questions: who is issuing this, regarding what matter, binding which party, effective when. It reads much more like a legal instrument than a spell.

It is also why drawing one traditionally required fasting and incense. You were not writing. You were **executing a document**, and you had to be qualified to sign it.
:::

---

### The thesis

Put the five side by side and they stop being five facts. They are one idea, seen from five angles.

**The world runs on rules. The rules can be read. And whoever reads them does not need to force anything.**

Yin-Yang tells you to change a force's direction rather than meet it. Wu Xing tells you your position on the ring matters more than your raw power. Qi tells you the thing you should be cultivating is a medium, not a resource. Dan tells you the only route to advancement runs through remaking yourself. Talismans tell you power comes from authority, not from strength.

"Using softness to overcome hardness" is not a pretty saying. It is the conclusion this entire model arrives at.

---

## Layer 3 · Where All Of This Came From

| Concept | Key text | Era | What it contributed |
| :--- | :--- | :--- | :--- |
| Reversal | *Daodejing* ch. 40 | Warring States | "Reversal is the movement of the Way" |
| The five names | *Book of Documents*, "Great Plan" | pre-Qin | The earliest listing of Water, Fire, Wood, Metal, Earth |
| The two cycles | Dong Zhongshu, *Chunqiu Fanlu* | Western Han | Generating and overcoming, arranged as a ring |
| Internal alchemy | *Cantong qi* | Eastern Han | The body as crucible — a theory, not a recipe |
| The turn inward | Ge Hong, *Baopuzi* Inner Chapters | Eastern Jin | Primary record of the external-to-internal transition |
| Talisman logic | *Daozang*, talisman-register schools | successive dynasties | Why a talisman behaves like a legal document |

This layer is the line between this site and a wiki. We are not trying to teach Taoism — that is the *Daozang*'s job, and it runs to well over a thousand volumes.

We only want you to know one thing: every "lore" you meet in a game has a real text behind it, with a date, an author, and an argument attached. The designers did not make this up. They read it.

---

## Keep Going

- **[The Glossary](/glossary)** — all 39 terms in one searchable place, if layer 1 went too fast.
- **In the games** — [Black Myth: Wukong](/projects/wukong) · [Black Myth: Zhong Kui](/projects/zhong-kui/lore) · [WUCHANG: Fallen Feathers](/projects/wuchang) · [Phantom Blade Zero](/projects/phantom-blade)
- **Next module** — [The Three Realms](/culture/three-realms), on why the cosmos is an org chart.
- **[Culture 101](/culture/basics)** — the course index.
