const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dataSource = fs.readFileSync(path.join(root, "data", "celebrities.ts"), "utf8");

const imagePool = [
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?auto=format&fit=crop&w=1100&q=80"
];

function list(block, field) {
  const match = block.match(new RegExp(`${field}: \\[([^\\]]*)\\]`));
  return match ? Array.from(match[1].matchAll(/"([^"]+)"/g)).map((item) => item[1]) : [];
}

function scalar(block, field) {
  const match = block.match(new RegExp(`${field}: "([^"]*)"`));
  return match ? match[1] : "";
}

function image(block) {
  const direct = block.match(/image: "([^"]+)"/);
  if (direct) return direct[1];

  const match = block.match(/image: images\[(\d+)\]/);
  return imagePool[Number(match?.[1] || 0)] || imagePool[0];
}

function workoutPlan(block) {
  const match = block.match(/workoutPlan: plan\("([^"]+)", "([^"]+)"\)/);
  const style = match?.[1] || "strength conditioning";
  const emphasis = match?.[2] || "full body";
  const lowerStyle = style.toLowerCase();
  const lowerEmphasis = emphasis.toLowerCase();
  const isPilates = lowerStyle.includes("pilates") || lowerStyle.includes("barre");
  const isDance = lowerStyle.includes("dance");
  const isBoxing = lowerStyle.includes("boxing");
  const isAction = lowerStyle.includes("martial") || lowerStyle.includes("functional");
  const isBodybuilding = lowerStyle.includes("bodybuilding") || lowerStyle.includes("hypertrophy") || lowerStyle.includes("upper body");
  const isGymnastics = lowerStyle.includes("gymnastics") || lowerStyle.includes("calisthenics");
  const isSportPower = lowerStyle.includes("sport") || lowerStyle.includes("power");
  const lowerBody = lowerEmphasis.includes("glute") || lowerEmphasis.includes("quad") || lowerEmphasis.includes("hamstring");
  const ex = (name, sets, reps, rest, intensity) => ({ name, sets, reps, rest, intensity });

  const foundation = () => {
    if (isPilates) return { title: "Pilates Strength Base", focus: emphasis, exercises: [
      ex("Pilates hundred or dead bug", "3", "30-45 sec", "30 sec", "slow breathing and bracing"),
      ex("Side-lying leg lift series", "3", "12-18 each side", "30 sec", "controlled hip line"),
      ex("Glute bridge march", "3", "10 each side", "45 sec", "level hips"),
      ex("Single-leg Romanian deadlift", "3", "8-10 each leg", "60 sec", "light-moderate balance work")
    ]};
    if (isDance) return { title: "Dancer Strength Base", focus: emphasis, exercises: [
      ex("Reverse lunge to knee drive", "3", "10 each leg", "60 sec", "smooth and rhythmic"),
      ex("Standing banded hip abduction", "3", "15 each side", "30 sec", "glute med control"),
      ex("Push-up or incline push-up", "3", "8-12", "60 sec", "clean shoulder position"),
      ex("Hollow hold or plank reach", "3", "25-40 sec", "45 sec", "core stays quiet")
    ]};
    if (isBoxing) return { title: "Fighter Strength Base", focus: emphasis, exercises: [
      ex("Trap-bar deadlift or kettlebell deadlift", "4", "5-8", "2 min", "powerful but crisp"),
      ex("Landmine press", "3", "8 each side", "75 sec", "drive through the floor"),
      ex("Rotational cable chop", "3", "10 each side", "45 sec", "hips and ribs coordinated"),
      ex("Jump rope rounds", "5", "1 min", "30 sec", "light feet")
    ]};
    if (isAction) return { title: "Action-Role Strength Base", focus: emphasis, exercises: [
      ex("Kettlebell front squat", "4", "6-8", "90 sec", "stable and athletic"),
      ex("Assisted pull-up or lat pulldown", "4", "6-10", "90 sec", "strong back tension"),
      ex("Dumbbell push press", "3", "6-8", "75 sec", "explosive but controlled"),
      ex("Loaded carry", "4", "30-40 m", "60 sec", "tall posture")
    ]};
    if (isBodybuilding && lowerEmphasis.includes("chest")) return { title: "Upper-Body Hypertrophy Base", focus: emphasis, exercises: [
      ex("Incline dumbbell press", "4", "6-10", "90 sec", "moderate-heavy"),
      ex("Chest-supported row", "4", "8-12", "90 sec", "full squeeze"),
      ex("Seated shoulder press", "3", "8-10", "75 sec", "controlled reps"),
      ex("Cable fly or push-up finisher", "3", "12-15", "45 sec", "chest pump, no joint strain")
    ]};
    if (isGymnastics) return { title: "Bodyweight Skill Base", focus: emphasis, exercises: [
      ex("Pull-up progression", "4", "4-8", "90 sec", "leave 1-2 reps in reserve"),
      ex("Ring row or inverted row", "3", "8-12", "75 sec", "strict body line"),
      ex("Pike push-up", "3", "6-10", "75 sec", "shoulder control"),
      ex("Hanging knee raise", "3", "8-12", "60 sec", "no swinging")
    ]};
    if (isSportPower) return { title: "Power Athlete Base", focus: emphasis, exercises: [
      ex("Box jump or squat jump", "4", "4-6", "90 sec", "fast and fresh"),
      ex("Front squat or goblet squat", "4", "5-8", "2 min", "strong drive"),
      ex("Single-leg step-up", "3", "8 each leg", "75 sec", "knee tracks cleanly"),
      ex("Medicine ball throw", "4", "6 each side", "60 sec", "explosive rotation")
    ]};
    if (lowerBody) return { title: "Lower-Body Foundation", focus: emphasis, exercises: [
      ex("Hip thrust or glute bridge", "4", "8-12", "90 sec", "moderate-heavy, 2 reps in reserve"),
      ex("Goblet or front squat", "3", "8-10", "90 sec", "controlled tempo"),
      ex("Romanian deadlift", "3", "10-12", "75 sec", "moderate, hamstring stretch"),
      ex("Walking lunge", "2-3", "10 each leg", "60 sec", "bodyweight to moderate")
    ]};
    return { title: "Balanced Strength Base", focus: emphasis, exercises: [
      ex("Dumbbell press", "3-4", "8-10", "75 sec", "moderate and smooth"),
      ex("Cable or dumbbell row", "3-4", "8-12", "75 sec", "controlled squeeze"),
      ex("Split squat", "3", "8 each leg", "75 sec", "moderate"),
      ex("Dead bug or plank", "3", "30-45 sec", "45 sec", "clean bracing")
    ]};
  };

  const conditioning = () => {
    if (isPilates || isDance) return { title: isPilates ? "Pilates Conditioning" : "Performance Conditioning", focus: style, exercises: [
      ex("Low-impact cardio or dance rounds", "5-6", "45 sec on / 30 sec off", "30 sec", "breathable but challenging"),
      ex("Pilates core series", "3", "10-15 each", "30 sec", "slow and precise"),
      ex("Lateral band walk", "3", "14 each way", "30 sec", "glute activation"),
      ex("Mobility cooldown", "1", "8-10 min", "none", "easy reset")
    ]};
    if (isBoxing) return { title: "Boxing Conditioning", focus: style, exercises: [
      ex("Shadowboxing rounds", "5", "2 min", "60 sec", "technical and snappy"),
      ex("Heavy bag or battle rope intervals", "6", "30 sec hard", "45 sec", "high output"),
      ex("Mountain climber cross-body", "3", "30 sec", "30 sec", "core rotation"),
      ex("Calf pogo hops", "3", "20", "30 sec", "light and springy")
    ]};
    if (isAction || isGymnastics) return { title: "Athletic Conditioning", focus: style, exercises: [
      ex("Sled push, bike, or incline sprint", "8", "20-30 sec", "60 sec", "hard but repeatable"),
      ex("Bear crawl", "4", "20-30 m", "45 sec", "coordinated tension"),
      ex("Pallof press", "3", "12 each side", "45 sec", "anti-rotation control"),
      ex("Hip and shoulder mobility flow", "1", "8 min", "none", "easy reset")
    ]};
    return { title: "Conditioning Flow", focus: style, exercises: [
      ex("Incline walk, bike, or rower", "6-8", "30 sec hard / 60 sec easy", "60 sec", "repeatable effort"),
      ex("Medicine ball slam", "3", "10", "45 sec", "explosive"),
      ex("Farmer carry", "4", "30-40 m", "60 sec", "strong posture"),
      ex("Pallof press", "3", "12 each side", "45 sec", "anti-rotation control")
    ]};
  };

  const accessories = () => {
    if (isPilates || isDance) return { title: "Line and Control Accessories", focus: "similar muscle emphasis", exercises: [
      ex("Heel-elevated pulse squat", "3", "15-20", "45 sec", "light burn, clean knees"),
      ex("Cable or band glute kickback", "3", "12-15 each", "45 sec", "controlled squeeze"),
      ex("Standing calf raise", "3", "15-20", "45 sec", "full range"),
      ex("Side plank hip lift", "2-3", "10 each side", "30 sec", "waist and hip control")
    ]};
    if (isBodybuilding) return { title: "Hypertrophy Accessories", focus: "similar muscle emphasis", exercises: [
      ex("Lateral raise", "4", "12-15", "45 sec", "strict form"),
      ex("Cable row or pullover", "3", "10-12", "60 sec", "lat focus"),
      ex("Curl and triceps superset", "3", "10-14 each", "45 sec", "arm pump"),
      ex("Weighted plank", "3", "30-45 sec", "45 sec", "braced")
    ]};
    if (lowerBody) return { title: "Lower-Body Accessories", focus: "similar muscle emphasis", exercises: [
      ex("Cable kickback or back extension", "3", "12-15", "45 sec", "controlled squeeze"),
      ex("Hamstring curl or slider curl", "3", "10-14", "60 sec", "slow eccentric"),
      ex("Lateral step-down", "3", "8-10 each", "60 sec", "knee and hip control"),
      ex("Finisher core circuit", "2-3", "30 sec each move", "45 sec", "stop before form breaks")
    ]};
    return { title: "Support Accessories", focus: "similar muscle emphasis", exercises: [
      ex("Lateral raise", "3", "12-15", "45 sec", "light-moderate"),
      ex("Back extension or hip hinge", "3", "10-12", "60 sec", "posterior chain"),
      ex("Single-arm carry", "3", "30 m each", "45 sec", "anti-lean core"),
      ex("Mobility cooldown", "1", "8 min", "none", "easy reset")
    ]};
  };

  return [foundation(), conditioning(), accessories()];
}

const celebrities = Array.from(dataSource.matchAll(/\{\n    id:[\s\S]*?\n  \}/g)).map(([block]) => ({
  id: scalar(block, "id"),
  slug: scalar(block, "slug"),
  name: scalar(block, "name"),
  era: scalar(block, "era"),
  years: scalar(block, "years"),
  gender: scalar(block, "gender"),
  decade: scalar(block, "decade"),
  physiqueTags: list(block, "physiqueTags"),
  muscleFocus: list(block, "muscleFocus"),
  trainingStyle: list(block, "trainingStyle"),
  searchKeywords: list(block, "searchKeywords"),
  image: image(block),
  workoutPlan: workoutPlan(block),
  physiqueDescription: scalar(block, "physiqueDescription")
}));

function page() {
  const payload = JSON.stringify(celebrities).replace(/</g, "\\u003c");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Physique Archive Preview</title>
  <style>
    *{box-sizing:border-box} body{margin:0;background:radial-gradient(circle at 12% 0%,rgba(239,118,111,.22),transparent 34rem),radial-gradient(circle at 90% 8%,rgba(141,224,197,.14),transparent 32rem),#090a0f;color:#f8f2e9;font-family:Inter,ui-sans-serif,system-ui,sans-serif} a{color:inherit;text-decoration:none}
    header{position:sticky;top:0;z-index:5;border-bottom:1px solid rgba(255,255,255,.12);background:rgba(9,10,15,.78);backdrop-filter:blur(18px)} nav{max-width:1180px;margin:auto;display:flex;align-items:center;justify-content:space-between;padding:14px 20px}.brand{font-weight:800;font-size:20px}.nav a{border:1px solid rgba(255,255,255,.1);padding:9px 13px;border-radius:999px;color:rgba(255,255,255,.74);margin-left:6px}.wrap{max-width:1180px;margin:auto;padding:42px 20px}.hero{min-height:520px;display:grid;align-items:end;padding:80px 20px;background:linear-gradient(to bottom,rgba(9,10,15,.16),#090a0f),url('https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1800&q=80') center/cover}.hero>div{max-width:1180px;margin:auto;width:100%} h1{font-size:clamp(46px,9vw,96px);line-height:.95;margin:0;font-weight:850} h2{font-size:clamp(28px,4vw,48px);margin:0 0 12px}.lead{font-size:20px;color:rgba(255,255,255,.72);max-width:720px;line-height:1.55}.search{display:flex;gap:10px;max-width:760px;border:1px solid rgba(255,255,255,.14);background:rgba(17,19,29,.76);padding:10px;border-radius:24px;backdrop-filter:blur(18px)} input,select{background:#090a0f;color:white;border:1px solid rgba(255,255,255,.13);border-radius:16px;padding:13px;min-width:0} input{flex:1} button,.btn{background:#e8d6b8;color:#090a0f;border:0;border-radius:16px;padding:13px 18px;font-weight:750;cursor:pointer}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(245px,1fr));gap:18px}.card{overflow:hidden;border:1px solid rgba(255,255,255,.12);border-radius:24px;background:rgba(17,19,29,.78);transition:.2s}.card:hover{transform:translateY(-4px);border-color:rgba(232,214,184,.55)}.card img{width:100%;height:220px;object-fit:cover;display:block}.pad{padding:18px}.tags{display:flex;gap:7px;flex-wrap:wrap;margin-top:12px}.tag{font-size:12px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.07);color:rgba(255,255,255,.76);border-radius:999px;padding:6px 10px}.mint{color:#8de0c5}.coral{color:#ef766f}.filters{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin-bottom:22px}.section{padding-top:30px}.detail{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(280px,.9fr);gap:24px}.panel{border:1px solid rgba(255,255,255,.12);border-radius:24px;background:rgba(17,19,29,.72);padding:22px}.anatomy-map{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:12px;border:1px solid rgba(255,255,255,.12);border-radius:24px;background:linear-gradient(135deg,rgba(232,214,184,.16),rgba(239,118,111,.12),rgba(141,224,197,.1))}.anatomy-panel{height:560px;border-radius:20px;border:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.22);padding:8px}.anatomy-panel svg{width:100%;height:100%}.body-base{fill:rgba(255,255,255,.08);stroke:rgba(255,255,255,.22);stroke-width:2}.muscle{fill:rgba(255,255,255,.16);stroke:rgba(255,255,255,.34);stroke-width:1.6;cursor:pointer;transition:.18s}.muscle:hover{fill:rgba(239,118,111,.72)}.muscle.active{fill:#e8d6b8;stroke:#fff;stroke-width:3}.workout{margin-top:18px}.workout ul{padding-left:18px;color:rgba(255,255,255,.7);line-height:1.7} @media(max-width:720px){.nav{display:none}.search{flex-direction:column}.detail{grid-template-columns:1fr}.anatomy-map{grid-template-columns:1fr}.anatomy-panel{height:520px}}
  </style>
</head>
<body>
  <header><nav><a class="brand" href="/">Physique Archive</a><div class="nav"><a href="/explore">Explore</a><a href="/muscle-map">Muscle Map</a></div></nav></header>
  <main id="app"></main>
  <script>window.CELEBRITIES=${payload};</script>
  <script>
    const data = window.CELEBRITIES;
    const app = document.getElementById("app");
    const params = new URLSearchParams(location.search);
    const uniq = (items) => [...new Set(items)].sort();
    const card = (c) => '<a class="card" href="/celebrity/'+c.slug+'"><img src="'+c.image+'" alt=""><div class="pad"><h3>'+c.name+'</h3><p class="coral">'+c.era+' / '+c.years+'</p><div class="tags">'+c.physiqueTags.slice(0,3).map(t=>'<span class="tag">'+t+'</span>').join('')+'</div><div class="tags">'+c.muscleFocus.slice(0,4).map(t=>'<span class="tag mint">'+t+'</span>').join('')+'</div></div></a>';
    const anatomy=[
      ["front","shoulders","M84 112 C61 117 46 133 39 154 C54 164 75 158 91 139 C96 127 96 117 84 112 Z M176 112 C199 117 214 133 221 154 C206 164 185 158 169 139 C164 127 164 117 176 112 Z"],
      ["front","chest","M91 132 C105 116 123 116 130 128 C137 116 155 116 169 132 C167 158 154 174 132 171 C130 171 130 171 128 171 C106 174 93 158 91 132 Z"],
      ["front","arms","M39 162 C28 194 23 238 33 292 C43 300 56 294 61 279 C56 239 64 196 79 151 C64 164 50 167 39 162 Z M221 162 C232 194 237 238 227 292 C217 300 204 294 199 279 C204 239 196 196 181 151 C196 164 210 167 221 162 Z"],
      ["front","abs","M104 176 C116 181 144 181 156 176 C163 208 158 246 145 269 C137 281 123 281 115 269 C102 246 97 208 104 176 Z"],
      ["front","quads","M91 285 C104 273 120 278 126 301 L120 421 C101 425 87 411 86 386 C84 343 82 306 91 285 Z M169 285 C156 273 140 278 134 301 L140 421 C159 425 173 411 174 386 C176 343 178 306 169 285 Z"],
      ["front","calves","M89 424 C102 434 117 431 121 419 L115 526 C100 534 87 525 86 505 C83 470 83 440 89 424 Z M171 424 C158 434 143 431 139 419 L145 526 C160 534 173 525 174 505 C177 470 177 440 171 424 Z"],
      ["back","back","M90 126 C107 107 153 107 170 126 C178 165 171 213 151 244 C137 256 123 256 109 244 C89 213 82 165 90 126 Z"],
      ["back","glutes","M93 254 C108 239 124 242 130 260 C136 242 152 239 167 254 C172 286 153 306 130 300 C107 306 88 286 93 254 Z"],
      ["back","hamstrings","M91 304 C105 291 121 298 126 320 L120 421 C102 427 88 412 87 388 C85 350 83 322 91 304 Z M169 304 C155 291 139 298 134 320 L140 421 C158 427 172 412 173 388 C175 350 177 322 169 304 Z"],
      ["back","calves","M89 424 C104 435 118 431 122 418 L116 526 C100 535 87 524 86 504 C83 470 83 440 89 424 Z M171 424 C156 435 142 431 138 418 L144 526 C160 535 173 524 174 504 C177 470 177 440 171 424 Z"],
      ["back","arms","M39 162 C28 194 23 238 33 292 C43 300 56 294 61 279 C56 239 64 196 79 151 C64 164 50 167 39 162 Z M221 162 C232 194 237 238 227 292 C217 300 204 294 199 279 C204 239 196 196 181 151 C196 164 210 167 221 162 Z"]
    ];
    const searchBox = (value='') => '<form class="search" action="/search"><input name="q" value="'+value.replaceAll('"','&quot;')+'" placeholder="Search slim toned, superhero physique, thick legs, dancer physique..."><button>Search</button></form>';
    const fuelIdeas=(c)=>{const focus=c.muscleFocus.join(" ").toLowerCase(); const style=c.trainingStyle.join(" ").toLowerCase(); const lower=focus.includes("glutes")||focus.includes("quads")||focus.includes("hamstrings"); const output=style.includes("dance")||style.includes("boxing")||style.includes("hiit")||style.includes("conditioning"); return [
      lower ? "Protein-forward meals with carbs around lower-body sessions, such as eggs with toast, chicken and rice, tofu bowls, or Greek yogurt with fruit." : "Protein-forward meals that support recovery, such as salmon or tofu with potatoes, turkey wraps, lentil bowls, or Greek yogurt with berries.",
      output ? "Hydrating snacks before performance work, such as a banana with peanut butter, oatmeal, fruit and yogurt, or a smoothie." : "Steady energy meals with whole-food carbs, colorful produce, and healthy fats, such as rice bowls, pasta with lean protein, or avocado toast with eggs.",
      "Post-workout recovery options: protein plus carbs, plenty of fluids, and enough total food to support training quality."
    ]};
    const figure=(view,selected)=>'<div class="anatomy-panel"><svg viewBox="0 0 260 560" role="img" aria-label="'+view+' anatomy selector"><path class="body-base" d="M106 68 C106 35 154 35 154 68 C154 96 106 96 106 68 Z M112 94 L148 94 C152 105 161 108 176 112 C201 119 222 143 231 175 C238 209 238 256 229 294 C225 311 201 310 196 292 C194 268 194 235 190 209 C186 178 176 151 161 141 C166 171 166 223 157 251 C153 263 149 276 154 291 C166 333 171 386 169 429 C168 459 180 491 171 526 C166 545 142 542 141 520 L132 405 L128 405 L119 520 C118 542 94 545 89 526 C80 491 92 459 91 429 C89 386 94 333 106 291 C111 276 107 263 103 251 C94 223 94 171 99 141 C84 151 74 178 70 209 C66 235 66 268 64 292 C59 310 35 311 31 294 C22 256 22 209 29 175 C38 143 59 119 84 112 C99 108 108 105 112 94 Z"></path>'+anatomy.filter(a=>a[0]===view).map(a=>'<a href="/muscle-map?area='+a[1]+'"><path class="muscle '+(a[1]===selected?'active':'')+'" d="'+a[2]+'"><title>'+a[1]+'</title></path></a>').join('')+'</svg></div>';
    const bodyMap=(selected="glutes")=>'<div class="anatomy-map">'+figure("front",selected)+figure("back",selected)+'</div>';
    function home(){app.innerHTML='<section class="hero"><div><p class="tag">Similar training style, not exact replication</p><h1>Physique Archive</h1><p class="lead">Discover physique-inspired workout styles from iconic celebrity eras.</p>'+searchBox()+'</div></section><section class="wrap detail"><div><h2>Browse by muscle emphasis</h2><p class="lead">Tap a visible muscle region on the anatomy map to see celebrities tagged with that muscle focus. This is for training inspiration, not body comparison.</p><p class="tag">Selected focus starts on glutes</p></div>'+bodyMap("glutes")+'</section><section class="wrap"><h2>Featured eras</h2><div class="grid">'+["1990s","2000s","2010s","2020s"].map(d=>'<a class="panel" href="/explore?decade='+d+'"><h3>'+d+'</h3><p>Browse inspiration profiles from the '+d+'.</p></a>').join('')+'</div><div class="section"><h2>Featured celebrities</h2><div class="grid">'+data.slice(0,6).map(card).join('')+'</div></div></section>'}
    function explore(){let filtered=data;["decade","gender"].forEach(k=>{if(params.get(k)) filtered=filtered.filter(c=>c[k]===params.get(k))});["category","muscle","training"].forEach((k,i)=>{const fields=["physiqueTags","muscleFocus","trainingStyle"]; if(params.get(k)) filtered=filtered.filter(c=>c[fields[i]].includes(params.get(k)))});
      const select=(label,param,opts)=>'<select onchange="setFilter(\\''+param+'\\',this.value)"><option value="">'+label+': all</option>'+opts.map(o=>'<option '+(params.get(param)===o?'selected':'')+'>'+o+'</option>').join('')+'</select>';
      app.innerHTML='<section class="wrap"><h2>Explore profiles</h2><p class="lead">Filter by decade, gender, physique category, muscle emphasis, and training style.</p><div class="filters">'+select("Decade","decade",uniq(data.map(c=>c.decade)))+select("Gender","gender",uniq(data.map(c=>c.gender)))+select("Physique","category",uniq(data.flatMap(c=>c.physiqueTags)))+select("Muscle","muscle",uniq(data.flatMap(c=>c.muscleFocus)))+select("Training","training",uniq(data.flatMap(c=>c.trainingStyle)))+'</div><p>'+filtered.length+' profiles found</p><div class="grid">'+filtered.map(card).join('')+'</div></section>'}
    function search(){const raw=(params.get("q")||"").toLowerCase(); const q=raw.replaceAll("superhero build","superhero physique").replaceAll("dancer body","dancer physique"); const results=data.filter(c=>[c.name,c.era,c.decade,...c.physiqueTags,...c.muscleFocus,...c.trainingStyle,...c.searchKeywords].join(" ").toLowerCase().includes(q)); app.innerHTML='<section class="wrap"><h2>Results for "'+(raw||"all")+'"</h2>'+searchBox(raw)+'<div class="section grid">'+(results.length?results:data.slice(0,12)).map(card).join('')+'</div></section>'}
    function detail(slug){const c=data.find(x=>x.slug===slug); if(!c){home(); return} const similar=data.filter(x=>x.id!==c.id && x.physiqueTags.some(t=>c.physiqueTags.includes(t))).slice(0,4); const fuel=fuelIdeas(c); app.innerHTML='<section class="wrap detail"><div><p class="tag">Similar physique focus / inspired by</p><h1>'+c.name+'</h1><p class="lead">'+c.era+' / '+c.years+'</p><p class="lead">'+c.physiqueDescription+'</p><div class="tags">'+c.physiqueTags.map(t=>'<span class="tag">'+t+'</span>').join('')+'</div></div><img class="card" src="'+c.image+'" alt="" style="width:100%;height:430px;object-fit:cover"></section><section class="wrap grid"><div class="panel"><h2>Physique Breakdown</h2><p>This explains why the profile appears in the archive and which muscle groups the inspired routine prioritizes.</p>'+c.muscleFocus.slice(0,4).map((t,i)=>'<p>'+(i===0?'Primary focus':'Supporting focus')+': '+t+', trained through safe progression, control, and recovery.</p>').join('')+'</div><div class="panel"><h2>Likely Training Style</h2><div class="tags">'+c.trainingStyle.map(t=>'<span class="tag">'+t+'</span>').join('')+'</div><p>These are inferred themes, not a claim about the celebrity exact private routine.</p></div><div class="panel"><h2>Reality Check</h2><p>Genetics matter, exact replication is unrealistic, and this is inspiration-based fitness guidance.</p></div></section><section class="wrap"><h2>Workout Inspiration</h2><p class="lead">A sample training template with sets, reps, rest, and intensity.</p><div class="grid">'+c.workoutPlan.map(w=>'<article class="panel workout"><p class="coral">'+w.focus+'</p><h3>'+w.title+'</h3><ul>'+w.exercises.map(e=>'<li><strong>'+e.name+'</strong><br>'+e.sets+' sets x '+e.reps+' / rest '+e.rest+'<br><span style="color:rgba(255,255,255,.52)">'+e.intensity+'</span></li>').join('')+'</ul></article>').join('')+'<article class="panel workout"><p class="mint">Fueling Ideas</p><h3>Support the goal</h3><ul>'+fuel.map(f=>'<li>'+f+'</li>').join('')+'</ul><p style="color:rgba(255,255,255,.48);font-size:12px">No calorie targets or restrictive diet advice. Adjust for your body, preferences, health needs, and professional guidance.</p></article></div></section><section class="wrap"><h2>Similar physique inspiration</h2><div class="grid">'+similar.map(card).join('')+'</div></section>'}
    function muscle(){const selected=params.get("area")||"glutes"; const matches=data.filter(c=>c.muscleFocus.includes(selected)); app.innerHTML='<section class="wrap detail"><div><h2>Muscle Focus Map</h2><p class="lead">Select a visible muscle region on the anatomy map to find profiles with similar emphasis.</p><p class="tag">Selected focus: '+selected+'</p></div>'+bodyMap(selected)+'</section><section class="wrap"><h2>'+selected+' profiles</h2><div class="grid">'+matches.map(card).join('')+'</div></section>'}
    window.setFilter=(k,v)=>{const p=new URLSearchParams(location.search); v?p.set(k,v):p.delete(k); location.href="/explore?"+p.toString()}
    if(location.pathname.startsWith("/explore")) explore(); else if(location.pathname.startsWith("/search")) search(); else if(location.pathname.startsWith("/muscle-map")) muscle(); else if(location.pathname.startsWith("/celebrity/")) detail(location.pathname.split("/").pop()); else home();
  </script>
</body>
</html>`;
}

const server = http.createServer((request, response) => {
  response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  response.end(page());
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Physique Archive preview running at http://localhost:3000/");
});
