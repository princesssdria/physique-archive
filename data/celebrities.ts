export type Gender = "female" | "male" | "nonbinary";

export type WorkoutExercise = {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  intensity: string;
};

export type WorkoutDay = {
  title: string;
  focus: string;
  exercises: WorkoutExercise[];
};

export type Celebrity = {
  id: string;
  slug: string;
  name: string;
  era: string;
  years: string;
  gender: Gender;
  decade: "1990s" | "2000s" | "2010s" | "2020s";
  physiqueTags: string[];
  muscleFocus: string[];
  trainingStyle: string[];
  searchKeywords: string[];
  image: string;
  workoutPlan: WorkoutDay[];
  disclaimer: string;
  physiqueDescription: string;
};

// Replace any profile's `image` value with a direct URL or a local public path
// such as "/celebrities/chris-evans-captain-america-era.jpg".

const defaultDisclaimer =
  "This profile is inspiration-based fitness guidance. Genetics, history, coaching, recovery, access, and personal health all matter, so exact replication is unrealistic and not the goal.";

const exercise = (name: string, sets: string, reps: string, rest: string, intensity: string): WorkoutExercise => ({
  name,
  sets,
  reps,
  rest,
  intensity
});

const plan = (style: string, emphasis: string): WorkoutDay[] => {
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

  const foundation = (): WorkoutDay => {
    if (isPilates) {
      return {
        title: "Pilates Strength Base",
        focus: emphasis,
        exercises: [
          exercise("Pilates hundred or dead bug", "3", "30-45 sec", "30 sec", "slow breathing and bracing"),
          exercise("Side-lying leg lift series", "3", "12-18 each side", "30 sec", "controlled hip line"),
          exercise("Glute bridge march", "3", "10 each side", "45 sec", "level hips"),
          exercise("Single-leg Romanian deadlift", "3", "8-10 each leg", "60 sec", "light-moderate balance work")
        ]
      };
    }

    if (isDance) {
      return {
        title: "Dancer Strength Base",
        focus: emphasis,
        exercises: [
          exercise("Reverse lunge to knee drive", "3", "10 each leg", "60 sec", "smooth and rhythmic"),
          exercise("Standing banded hip abduction", "3", "15 each side", "30 sec", "glute med control"),
          exercise("Push-up or incline push-up", "3", "8-12", "60 sec", "clean shoulder position"),
          exercise("Hollow hold or plank reach", "3", "25-40 sec", "45 sec", "core stays quiet")
        ]
      };
    }

    if (isBoxing) {
      return {
        title: "Fighter Strength Base",
        focus: emphasis,
        exercises: [
          exercise("Trap-bar deadlift or kettlebell deadlift", "4", "5-8", "2 min", "powerful but crisp"),
          exercise("Landmine press", "3", "8 each side", "75 sec", "drive through the floor"),
          exercise("Rotational cable chop", "3", "10 each side", "45 sec", "hips and ribs coordinated"),
          exercise("Jump rope rounds", "5", "1 min", "30 sec", "light feet")
        ]
      };
    }

    if (isAction) {
      return {
        title: "Action-Role Strength Base",
        focus: emphasis,
        exercises: [
          exercise("Kettlebell front squat", "4", "6-8", "90 sec", "stable and athletic"),
          exercise("Assisted pull-up or lat pulldown", "4", "6-10", "90 sec", "strong back tension"),
          exercise("Dumbbell push press", "3", "6-8", "75 sec", "explosive but controlled"),
          exercise("Loaded carry", "4", "30-40 m", "60 sec", "tall posture")
        ]
      };
    }

    if (isBodybuilding && lowerEmphasis.includes("chest")) {
      return {
        title: "Upper-Body Hypertrophy Base",
        focus: emphasis,
        exercises: [
          exercise("Incline dumbbell press", "4", "6-10", "90 sec", "moderate-heavy"),
          exercise("Chest-supported row", "4", "8-12", "90 sec", "full squeeze"),
          exercise("Seated shoulder press", "3", "8-10", "75 sec", "controlled reps"),
          exercise("Cable fly or push-up finisher", "3", "12-15", "45 sec", "chest pump, no joint strain")
        ]
      };
    }

    if (isGymnastics) {
      return {
        title: "Bodyweight Skill Base",
        focus: emphasis,
        exercises: [
          exercise("Pull-up progression", "4", "4-8", "90 sec", "leave 1-2 reps in reserve"),
          exercise("Ring row or inverted row", "3", "8-12", "75 sec", "strict body line"),
          exercise("Pike push-up", "3", "6-10", "75 sec", "shoulder control"),
          exercise("Hanging knee raise", "3", "8-12", "60 sec", "no swinging")
        ]
      };
    }

    if (isSportPower) {
      return {
        title: "Power Athlete Base",
        focus: emphasis,
        exercises: [
          exercise("Box jump or squat jump", "4", "4-6", "90 sec", "fast and fresh"),
          exercise("Front squat or goblet squat", "4", "5-8", "2 min", "strong drive"),
          exercise("Single-leg step-up", "3", "8 each leg", "75 sec", "knee tracks cleanly"),
          exercise("Medicine ball throw", "4", "6 each side", "60 sec", "explosive rotation")
        ]
      };
    }

    if (lowerBody) {
      return {
        title: "Lower-Body Foundation",
        focus: emphasis,
        exercises: [
          exercise("Hip thrust or glute bridge", "4", "8-12", "90 sec", "moderate-heavy, 2 reps in reserve"),
          exercise("Goblet or front squat", "3", "8-10", "90 sec", "controlled tempo"),
          exercise("Romanian deadlift", "3", "10-12", "75 sec", "moderate, hamstring stretch"),
          exercise("Walking lunge", "2-3", "10 each leg", "60 sec", "bodyweight to moderate")
        ]
      };
    }

    return {
      title: "Balanced Strength Base",
      focus: emphasis,
      exercises: [
        exercise("Dumbbell press", "3-4", "8-10", "75 sec", "moderate and smooth"),
        exercise("Cable or dumbbell row", "3-4", "8-12", "75 sec", "controlled squeeze"),
        exercise("Split squat", "3", "8 each leg", "75 sec", "moderate"),
        exercise("Dead bug or plank", "3", "30-45 sec", "45 sec", "clean bracing")
      ]
    };
  };

  const conditioning = (): WorkoutDay => {
    if (isPilates || isDance) {
      return {
        title: isPilates ? "Pilates Conditioning" : "Performance Conditioning",
        focus: style,
        exercises: [
          exercise("Low-impact cardio or dance rounds", "5-6", "45 sec on / 30 sec off", "30 sec", "breathable but challenging"),
          exercise("Pilates core series", "3", "10-15 each", "30 sec", "slow and precise"),
          exercise("Lateral band walk", "3", "14 each way", "30 sec", "glute activation"),
          exercise("Mobility cooldown", "1", "8-10 min", "none", "easy reset")
        ]
      };
    }

    if (isBoxing) {
      return {
        title: "Boxing Conditioning",
        focus: style,
        exercises: [
          exercise("Shadowboxing rounds", "5", "2 min", "60 sec", "technical and snappy"),
          exercise("Heavy bag or battle rope intervals", "6", "30 sec hard", "45 sec", "high output"),
          exercise("Mountain climber cross-body", "3", "30 sec", "30 sec", "core rotation"),
          exercise("Calf pogo hops", "3", "20", "30 sec", "light and springy")
        ]
      };
    }

    if (isAction || isGymnastics) {
      return {
        title: "Athletic Conditioning",
        focus: style,
        exercises: [
          exercise("Sled push, bike, or incline sprint", "8", "20-30 sec", "60 sec", "hard but repeatable"),
          exercise("Bear crawl", "4", "20-30 m", "45 sec", "coordinated tension"),
          exercise("Pallof press", "3", "12 each side", "45 sec", "anti-rotation control"),
          exercise("Hip and shoulder mobility flow", "1", "8 min", "none", "easy reset")
        ]
      };
    }

    return {
      title: "Conditioning Flow",
      focus: style,
      exercises: [
        exercise("Incline walk, bike, or rower", "6-8", "30 sec hard / 60 sec easy", "60 sec", "repeatable effort"),
        exercise("Medicine ball slam", "3", "10", "45 sec", "explosive"),
        exercise("Farmer carry", "4", "30-40 m", "60 sec", "strong posture"),
        exercise("Pallof press", "3", "12 each side", "45 sec", "anti-rotation control")
      ]
    };
  };

  const accessories = (): WorkoutDay => {
    if (isPilates || isDance) {
      return {
        title: "Line and Control Accessories",
        focus: "similar muscle emphasis",
        exercises: [
          exercise("Heel-elevated pulse squat", "3", "15-20", "45 sec", "light burn, clean knees"),
          exercise("Cable or band glute kickback", "3", "12-15 each", "45 sec", "controlled squeeze"),
          exercise("Standing calf raise", "3", "15-20", "45 sec", "full range"),
          exercise("Side plank hip lift", "2-3", "10 each side", "30 sec", "waist and hip control")
        ]
      };
    }

    if (isBodybuilding) {
      return {
        title: "Hypertrophy Accessories",
        focus: "similar muscle emphasis",
        exercises: [
          exercise("Lateral raise", "4", "12-15", "45 sec", "strict form"),
          exercise("Cable row or pullover", "3", "10-12", "60 sec", "lat focus"),
          exercise("Curl and triceps superset", "3", "10-14 each", "45 sec", "arm pump"),
          exercise("Weighted plank", "3", "30-45 sec", "45 sec", "braced")
        ]
      };
    }

    if (lowerBody) {
      return {
        title: "Lower-Body Accessories",
        focus: "similar muscle emphasis",
        exercises: [
          exercise("Cable kickback or back extension", "3", "12-15", "45 sec", "controlled squeeze"),
          exercise("Hamstring curl or slider curl", "3", "10-14", "60 sec", "slow eccentric"),
          exercise("Lateral step-down", "3", "8-10 each", "60 sec", "knee and hip control"),
          exercise("Finisher core circuit", "2-3", "30 sec each move", "45 sec", "stop before form breaks")
        ]
      };
    }

    return {
      title: "Support Accessories",
      focus: "similar muscle emphasis",
      exercises: [
        exercise("Lateral raise", "3", "12-15", "45 sec", "light-moderate"),
        exercise("Back extension or hip hinge", "3", "10-12", "60 sec", "posterior chain"),
        exercise("Single-arm carry", "3", "30 m each", "45 sec", "anti-lean core"),
        exercise("Mobility cooldown", "1", "8 min", "none", "easy reset")
      ]
    };
  };

  return [foundation(), conditioning(), accessories()];
};

export const celebrities: Celebrity[] = [
  {
    id: "beyonce-destinys-child",
    slug: "beyonce-destinys-child-era",
    name: "Beyonce",
    era: "Destiny's Child era",
    years: "1998-2002",
    gender: "female",
    decade: "2000s",
    physiqueTags: ["dancer physique", "slim toned", "athletic"],
    muscleFocus: ["abs", "legs", "glutes"],
    trainingStyle: ["dance conditioning", "core work", "stage endurance"],
    searchKeywords: ["tiny waist illusion", "dancer body", "slim toned", "pop choreography"],
    image: "/images/beyonce-des-child.jpg",
    workoutPlan: plan("dance conditioning", "core and legs"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A stage-ready, dance-forward profile with similar emphasis on rhythm, posture, core endurance, and toned lower body lines."
  },
  {
    id: "beyonce-renaissance",
    slug: "beyonce-renaissance-era",
    name: "Beyonce",
    era: "Renaissance era",
    years: "2022-2024",
    gender: "female",
    decade: "2020s",
    physiqueTags: ["curvy athletic", "muscular feminine", "performance strong"],
    muscleFocus: ["glutes", "quads", "abs"],
    trainingStyle: ["dance conditioning", "strength circuits", "mobility"],
    searchKeywords: ["curvy athletic", "glutes", "strong stage physique", "athletic feminine"],
    image: "/images/beyonce-renaissance.jpg",
    workoutPlan: plan("strength circuits", "glutes and quads"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A powerful performance-inspired focus with similar muscle emphasis through glutes, legs, core control, and stamina."
  },
  {
    id: "megan-thee-stallion",
    slug: "megan-thee-stallion-performance-era",
    name: "Megan Thee Stallion",
    era: "performance era",
    years: "2019-2026",
    gender: "female",
    decade: "2020s",
    physiqueTags: ["slim thick", "curvy athletic", "strong lower body"],
    muscleFocus: ["glutes", "quads", "hamstrings"],
    trainingStyle: ["lower body hypertrophy", "conditioning", "dance"],
    searchKeywords: ["thick legs", "slim thick", "glutes", "curvy athletic"],
    image: "/images/megan-thee-stallion.jpg",
    workoutPlan: plan("lower body hypertrophy", "glutes and hamstrings"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A lower-body dominant, performance-ready inspiration profile centered on glute strength, quad shape, and athletic conditioning."
  },
  {
    id: "zendaya",
    slug: "zendaya-red-carpet-era",
    name: "Zendaya",
    era: "red carpet era",
    years: "2017-2026",
    gender: "female",
    decade: "2020s",
    physiqueTags: ["slim toned", "lean athletic", "model-off-duty"],
    muscleFocus: ["abs", "shoulders", "legs"],
    trainingStyle: ["Pilates", "bodyweight strength", "mobility"],
    searchKeywords: ["slim toned", "long lean", "pilates body", "dancer physique"],
    image: "/images/zendaya.jpg",
    workoutPlan: plan("Pilates", "core and posture"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A lean, polished inspiration profile with similar emphasis on posture, core control, shoulder line, and graceful movement."
  },
  {
    id: "tinashe",
    slug: "tinashe-dance-era",
    name: "Tinashe",
    era: "dance performance era",
    years: "2014-2026",
    gender: "female",
    decade: "2020s",
    physiqueTags: ["dancer physique", "lean athletic", "slim toned"],
    muscleFocus: ["abs", "glutes", "calves"],
    trainingStyle: ["dance conditioning", "HIIT", "core circuits"],
    searchKeywords: ["dancer body", "slim toned", "athletic feminine", "abs"],
    image: "/images/tinashe.jpg",
    workoutPlan: plan("HIIT", "abs and calves"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A dance-athlete inspiration profile focused on explosive movement, visible core endurance, calves, and glute stability."
  },
  {
    id: "chris-evans-captain-america",
    slug: "chris-evans-captain-america-era",
    name: "Chris Evans",
    era: "Captain America era",
    years: "2011-2019",
    gender: "male",
    decade: "2010s",
    physiqueTags: ["superhero physique", "broad shoulders", "muscular athletic"],
    muscleFocus: ["shoulders", "chest", "arms", "abs"],
    trainingStyle: ["hypertrophy", "upper body split", "strength conditioning"],
    searchKeywords: ["superhero physique", "broad shoulders", "visible abs", "captain build"],
    image: "/images/chris-evans.jpg",
    workoutPlan: plan("hypertrophy", "shoulders and chest"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A classic superhero-inspired focus built around shoulder width, chest development, arm size, and athletic leanness."
  },
  {
    id: "michael-b-jordan-creed",
    slug: "michael-b-jordan-creed-era",
    name: "Michael B. Jordan",
    era: "Creed era",
    years: "2015-2023",
    gender: "male",
    decade: "2010s",
    physiqueTags: ["boxer athletic", "lean muscular", "superhero physique"],
    muscleFocus: ["abs", "shoulders", "back", "arms"],
    trainingStyle: ["boxing conditioning", "hypertrophy", "athletic circuits"],
    searchKeywords: ["boxer body", "visible abs", "lean muscular", "athletic"],
    image: "/images/michael-b-jordan-creed.jpg",
    workoutPlan: plan("boxing conditioning", "abs and shoulders"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A fighter-inspired profile with similar emphasis on leanness, core rotation, shoulder endurance, and upper-back athleticism."
  },
  {
    id: "tom-welling-smallville",
    slug: "tom-welling-smallville-era",
    name: "Tom Welling",
    era: "Smallville era",
    years: "2001-2011",
    gender: "male",
    decade: "2000s",
    physiqueTags: ["lean athletic", "broad shoulders", "classic athletic"],
    muscleFocus: ["shoulders", "chest", "back"],
    trainingStyle: ["strength basics", "athletic conditioning", "hypertrophy"],
    searchKeywords: ["smallville build", "lean athletic", "broad shoulders"],
    image: "/images/tom-welling.jpg",
    workoutPlan: plan("strength basics", "shoulders and back"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A clean-cut athletic inspiration profile with a similar broad-shouldered, balanced upper-body focus."
  },
  {
    id: "erica-durance-smallville",
    slug: "erica-durance-smallville-era",
    name: "Erica Durance",
    era: "Smallville era",
    years: "2004-2011",
    gender: "female",
    decade: "2000s",
    physiqueTags: ["slim toned", "athletic", "classic TV fit"],
    muscleFocus: ["legs", "abs", "shoulders"],
    trainingStyle: ["Pilates", "light strength", "cardio conditioning"],
    searchKeywords: ["slim toned", "tv fit", "lean athletic", "tiny waist illusion"],
    image: "/images/erica-durance-smallville.jpg",
    workoutPlan: plan("Pilates", "legs and abs"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A streamlined TV-era inspiration profile with similar focus on posture, toned legs, core control, and shoulder definition."
  },
  {
    id: "chris-hemsworth-thor",
    slug: "chris-hemsworth-thor-era",
    name: "Chris Hemsworth",
    era: "Thor era",
    years: "2011-2026",
    gender: "male",
    decade: "2010s",
    physiqueTags: ["superhero physique", "high muscle mass", "broad shoulders"],
    muscleFocus: ["shoulders", "chest", "arms", "back"],
    trainingStyle: ["bodybuilding split", "strength", "functional conditioning"],
    searchKeywords: ["thor build", "superhero physique", "arms", "broad shoulders"],
    image: "/images/chris-hemsworth.jpg",
    workoutPlan: plan("bodybuilding split", "back and shoulders"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A high-muscle superhero inspiration profile with similar emphasis on upper-body size, back width, and power-oriented training."
  },
  {
    id: "jennifer-lopez-2000s",
    slug: "jennifer-lopez-2000s-era",
    name: "Jennifer Lopez",
    era: "2000s performance era",
    years: "2000-2009",
    gender: "female",
    decade: "2000s",
    physiqueTags: ["curvy athletic", "dancer physique", "glute emphasis"],
    muscleFocus: ["glutes", "quads", "abs"],
    trainingStyle: ["dance conditioning", "lower body strength", "core"],
    searchKeywords: ["curvy athletic", "dancer body", "glutes", "stage legs"],
    image: "/images/jennifer-lopez-2000s.jpg",
    workoutPlan: plan("dance conditioning", "glutes and quads"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A dance-performance inspiration profile with similar emphasis on glutes, legs, core bracing, and polished stage stamina."
  },
  {
    id: "britney-spears-2000s",
    slug: "britney-spears-2000s-era",
    name: "Britney Spears",
    era: "2000s tour era",
    years: "2000-2004",
    gender: "female",
    decade: "2000s",
    physiqueTags: ["dancer physique", "slim toned", "athletic"],
    muscleFocus: ["abs", "legs", "calves"],
    trainingStyle: ["dance rehearsals", "core", "cardio conditioning"],
    searchKeywords: ["dancer body", "slim toned", "visible abs", "pop dancer"],
    image: "/images/britney-spears.jpg",
    workoutPlan: plan("dance rehearsals", "abs and calves"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A pop-dance inspiration profile focused on similar core visibility, leg endurance, and high-repetition performance conditioning."
  },
  {
    id: "janet-jackson-90s",
    slug: "janet-jackson-90s-era",
    name: "Janet Jackson",
    era: "Rhythm Nation to Velvet Rope era",
    years: "1989-1998",
    gender: "female",
    decade: "1990s",
    physiqueTags: ["dancer physique", "lean athletic", "defined abs"],
    muscleFocus: ["abs", "arms", "legs"],
    trainingStyle: ["dance conditioning", "strength circuits", "core"],
    searchKeywords: ["90s dancer", "defined abs", "lean athletic", "dancer body"],
    image: "/images/janet-jackson-90s.jpg",
    workoutPlan: plan("strength circuits", "abs and arms"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A precise dance-athlete profile with similar emphasis on defined core, arm tone, leg stamina, and choreography-ready conditioning."
  },
  {
    id: "brad-pitt-fight-club",
    slug: "brad-pitt-fight-club-era",
    name: "Brad Pitt",
    era: "Fight Club era",
    years: "1999",
    gender: "male",
    decade: "1990s",
    physiqueTags: ["lean athletic", "visible abs", "low-bulk"],
    muscleFocus: ["abs", "chest", "arms"],
    trainingStyle: ["calisthenics", "conditioning", "lean hypertrophy"],
    searchKeywords: ["lean athletic", "visible abs", "low bulk", "slim muscular"],
    image: "/images/brad-pitt-fight-club.jpg",
    workoutPlan: plan("calisthenics", "abs and chest"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A lean, low-bulk inspiration profile with similar emphasis on visible core, light chest definition, and athletic conditioning."
  },
  {
    id: "will-smith-ali",
    slug: "will-smith-ali-era",
    name: "Will Smith",
    era: "Ali era",
    years: "2001",
    gender: "male",
    decade: "2000s",
    physiqueTags: ["boxer athletic", "muscular athletic", "conditioned"],
    muscleFocus: ["shoulders", "arms", "abs", "calves"],
    trainingStyle: ["boxing", "roadwork", "strength"],
    searchKeywords: ["boxer body", "athletic", "conditioning", "arms"],
    image: "/images/will-smith.jpg",
    workoutPlan: plan("boxing", "shoulders and abs"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A boxing-inspired profile centered on similar shoulder endurance, core rotation, arm conditioning, and resilient athleticism."
  },
  {
    id: "halle-berry-catwoman",
    slug: "halle-berry-catwoman-era",
    name: "Halle Berry",
    era: "Catwoman era",
    years: "2004",
    gender: "female",
    decade: "2000s",
    physiqueTags: ["lean athletic", "slim toned", "action fit"],
    muscleFocus: ["abs", "shoulders", "legs"],
    trainingStyle: ["martial conditioning", "strength circuits", "mobility"],
    searchKeywords: ["action fit", "slim toned", "lean athletic", "abs"],
    image: "/images/halle-berry-catwoman.jpg",
    workoutPlan: plan("martial conditioning", "abs and shoulders"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "An action-role inspiration profile with similar focus on lean muscle, core definition, shoulder shape, and mobile strength."
  },
  {
    id: "jessica-alba-into-the-blue",
    slug: "jessica-alba-into-the-blue-era",
    name: "Jessica Alba",
    era: "Into the Blue era",
    years: "2005",
    gender: "female",
    decade: "2000s",
    physiqueTags: ["slim toned", "beach athletic", "lean athletic"],
    muscleFocus: ["abs", "legs", "glutes"],
    trainingStyle: ["circuit training", "core", "swim conditioning"],
    searchKeywords: ["slim toned", "beach athletic", "core", "lean legs"],
    image: "/images/jessica-alba.jpg",
    workoutPlan: plan("circuit training", "abs and legs"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A beach-athletic inspiration profile emphasizing similar core tone, glute stability, and full-body circuit conditioning."
  },
  {
    id: "angelina-jolie-tomb-raider",
    slug: "angelina-jolie-tomb-raider-era",
    name: "Angelina Jolie",
    era: "Tomb Raider era",
    years: "2001-2003",
    gender: "female",
    decade: "2000s",
    physiqueTags: ["action fit", "lean athletic", "strong arms"],
    muscleFocus: ["arms", "shoulders", "abs", "back"],
    trainingStyle: ["martial arts", "functional strength", "core"],
    searchKeywords: ["action fit", "strong arms", "lean athletic", "back"],
    image: "/images/angelina-jolie.jpg",
    workoutPlan: plan("functional strength", "arms and back"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "An action-adventure inspiration profile with similar emphasis on arms, shoulders, core control, and functional upper-back strength."
  },
  {
    id: "rihanna-anti",
    slug: "rihanna-anti-era",
    name: "Rihanna",
    era: "ANTI era",
    years: "2016-2017",
    gender: "female",
    decade: "2010s",
    physiqueTags: ["curvy athletic", "slim thick", "stage confident"],
    muscleFocus: ["glutes", "legs", "abs"],
    trainingStyle: ["dance conditioning", "full-body strength", "mobility"],
    searchKeywords: ["slim thick", "curvy athletic", "stage body", "glutes"],
    image: "/images/rihanna.jpg",
    workoutPlan: plan("full-body strength", "glutes and legs"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A stage-inspired profile with similar lower-body curves, core posture, and relaxed but athletic performance presence."
  },
  {
    id: "dua-lipa-future-nostalgia",
    slug: "dua-lipa-future-nostalgia-era",
    name: "Dua Lipa",
    era: "Future Nostalgia era",
    years: "2020-2022",
    gender: "female",
    decade: "2020s",
    physiqueTags: ["dancer physique", "lean athletic", "slim toned"],
    muscleFocus: ["abs", "legs", "glutes", "calves"],
    trainingStyle: ["dance conditioning", "Pilates", "HIIT"],
    searchKeywords: ["dancer body", "slim toned", "pilates", "stage legs"],
    image: "/images/dua-lipa.jpg",
    workoutPlan: plan("Pilates", "legs and core"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A modern pop-performance inspiration profile with similar focus on legs, core control, glute activation, and dance endurance."
  },
  {
    id: "lupita-nyongo-black-panther",
    slug: "lupita-nyongo-black-panther-era",
    name: "Lupita Nyong'o",
    era: "Black Panther era",
    years: "2018-2022",
    gender: "female",
    decade: "2010s",
    physiqueTags: ["lean athletic", "action fit", "muscular feminine"],
    muscleFocus: ["shoulders", "arms", "abs", "legs"],
    trainingStyle: ["martial conditioning", "strength circuits", "mobility"],
    searchKeywords: ["action fit", "athletic feminine", "strong shoulders", "lean athletic"],
    image: "/images/lupita-nyongo.jpg",
    workoutPlan: plan("martial conditioning", "shoulders and legs"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "An action-fit inspiration profile with similar emphasis on shoulder strength, athletic legs, core control, and movement skill."
  },
  {
    id: "scarlett-johansson-black-widow",
    slug: "scarlett-johansson-black-widow-era",
    name: "Scarlett Johansson",
    era: "Black Widow era",
    years: "2010-2021",
    gender: "female",
    decade: "2010s",
    physiqueTags: ["athletic", "action fit", "muscular feminine"],
    muscleFocus: ["glutes", "quads", "shoulders", "arms"],
    trainingStyle: ["strength circuits", "martial conditioning", "mobility"],
    searchKeywords: ["action fit", "athletic feminine", "quads", "glutes"],
    image: "/images/scarlett-johansson.jpg",
    workoutPlan: plan("strength circuits", "quads and shoulders"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "An action-role inspiration profile with similar emphasis on strong legs, shoulders, arms, and athletic movement quality."
  },
  {
    id: "gal-gadot-wonder-woman",
    slug: "gal-gadot-wonder-woman-era",
    name: "Gal Gadot",
    era: "Wonder Woman era",
    years: "2017-2020",
    gender: "female",
    decade: "2010s",
    physiqueTags: ["lean athletic", "superhero physique", "slim toned"],
    muscleFocus: ["shoulders", "legs", "arms", "abs"],
    trainingStyle: ["functional strength", "martial conditioning", "mobility"],
    searchKeywords: ["female superhero", "lean athletic", "shoulders", "slim toned"],
    image: "/images/gal-gadot.jpg",
    workoutPlan: plan("functional strength", "shoulders and legs"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A lean superhero inspiration profile focused on similar shoulder line, leg strength, arm tone, and functional conditioning."
  },
  {
    id: "henry-cavill-superman",
    slug: "henry-cavill-superman-era",
    name: "Henry Cavill",
    era: "Superman era",
    years: "2013-2021",
    gender: "male",
    decade: "2010s",
    physiqueTags: ["superhero physique", "broad shoulders", "high muscle mass"],
    muscleFocus: ["chest", "shoulders", "arms", "back"],
    trainingStyle: ["bodybuilding split", "strength", "conditioning"],
    searchKeywords: ["superman build", "superhero physique", "chest", "broad shoulders"],
    image: "/images/henry-cavill.jpg",
    workoutPlan: plan("bodybuilding split", "chest and back"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A high-muscle superhero inspiration profile with similar focus on chest thickness, shoulder width, back size, and strength."
  },
  {
    id: "jason-momoa-aquaman",
    slug: "jason-momoa-aquaman-era",
    name: "Jason Momoa",
    era: "Aquaman era",
    years: "2018-2023",
    gender: "male",
    decade: "2010s",
    physiqueTags: ["rugged athletic", "broad shoulders", "functional strong"],
    muscleFocus: ["back", "shoulders", "arms", "chest"],
    trainingStyle: ["functional strength", "climbing", "conditioning"],
    searchKeywords: ["rugged athletic", "broad shoulders", "back", "functional strong"],
    image: "/images/jason-momoa.jpg",
    workoutPlan: plan("functional strength", "back and arms"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A rugged action inspiration profile with similar emphasis on back width, shoulders, grip-heavy strength, and conditioning."
  },
  {
    id: "zac-efron-baywatch",
    slug: "zac-efron-baywatch-era",
    name: "Zac Efron",
    era: "Baywatch era",
    years: "2017",
    gender: "male",
    decade: "2010s",
    physiqueTags: ["lean muscular", "visible abs", "beach athletic"],
    muscleFocus: ["abs", "chest", "arms", "shoulders"],
    trainingStyle: ["hypertrophy", "conditioning circuits", "core"],
    searchKeywords: ["visible abs", "beach athletic", "lean muscular", "shoulders"],
    image: "/images/zac-efron.jpg",
    workoutPlan: plan("conditioning circuits", "abs and chest"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A beach-athletic inspiration profile with similar emphasis on core visibility, chest definition, shoulders, and high work capacity."
  },
  {
    id: "simone-biles-olympic",
    slug: "simone-biles-olympic-era",
    name: "Simone Biles",
    era: "Olympic era",
    years: "2016-2024",
    gender: "female",
    decade: "2020s",
    physiqueTags: ["power athletic", "muscular feminine", "compact strength"],
    muscleFocus: ["quads", "glutes", "shoulders", "arms"],
    trainingStyle: ["gymnastics conditioning", "power training", "mobility"],
    searchKeywords: ["power athletic", "muscular feminine", "strong legs", "shoulders"],
    image: "/images/simone-biles.jpg",
    workoutPlan: plan("power training", "quads and shoulders"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A power-athlete inspiration profile with similar emphasis on explosive legs, strong shoulders, core stiffness, and mobility."
  },
  {
    id: "serena-williams-2010s",
    slug: "serena-williams-2010s-era",
    name: "Serena Williams",
    era: "2010s championship era",
    years: "2010-2019",
    gender: "female",
    decade: "2010s",
    physiqueTags: ["power athletic", "curvy athletic", "muscular feminine"],
    muscleFocus: ["glutes", "quads", "shoulders", "arms"],
    trainingStyle: ["sport conditioning", "strength", "power"],
    searchKeywords: ["power athletic", "strong legs", "athletic feminine", "glutes"],
    image: "/images/serena-williams.jpg",
    workoutPlan: plan("sport conditioning", "glutes and shoulders"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A power-sport inspiration profile with similar emphasis on strong lower body, shoulders, arms, and explosive conditioning."
  },
  {
    id: "margot-robbie-barbie",
    slug: "margot-robbie-barbie-era",
    name: "Margot Robbie",
    era: "Barbie era",
    years: "2023",
    gender: "female",
    decade: "2020s",
    physiqueTags: ["slim toned", "lean athletic", "Pilates inspired"],
    muscleFocus: ["abs", "legs", "glutes"],
    trainingStyle: ["Pilates", "barre", "light strength"],
    searchKeywords: ["pilates body", "slim toned", "lean legs", "glutes"],
    image: "/images/margot-robbie.jpg",
    workoutPlan: plan("barre", "legs and glutes"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A polished, Pilates-inspired profile with similar emphasis on leg lines, core control, glute activation, and posture."
  },
  {
    id: "florence-pugh-marvel",
    slug: "florence-pugh-marvel-era",
    name: "Florence Pugh",
    era: "Marvel action era",
    years: "2021-2026",
    gender: "female",
    decade: "2020s",
    physiqueTags: ["athletic", "action fit", "strong lower body"],
    muscleFocus: ["quads", "glutes", "arms", "shoulders"],
    trainingStyle: ["strength circuits", "martial conditioning", "HIIT"],
    searchKeywords: ["action fit", "athletic feminine", "strong legs", "quads"],
    image: "/images/florence-pugh.jpg",
    workoutPlan: plan("HIIT", "quads and arms"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A grounded action-fit inspiration profile with similar emphasis on leg strength, shoulder tone, and practical conditioning."
  },
  {
    id: "tom-holland-spider-man",
    slug: "tom-holland-spider-man-era",
    name: "Tom Holland",
    era: "Spider-Man era",
    years: "2016-2021",
    gender: "male",
    decade: "2010s",
    physiqueTags: ["lean athletic", "gymnastics inspired", "low-bulk"],
    muscleFocus: ["abs", "shoulders", "arms", "back"],
    trainingStyle: ["gymnastics conditioning", "calisthenics", "mobility"],
    searchKeywords: ["lean athletic", "spiderman build", "calisthenics", "abs"],
    image: "/images/tom-holland.jpg",
    workoutPlan: plan("calisthenics", "abs and back"),
    disclaimer: defaultDisclaimer,
    physiqueDescription: "A nimble superhero inspiration profile with similar focus on core control, shoulders, back, and bodyweight skill."
  }
];

export const decades = ["1990s", "2000s", "2010s", "2020s"] as const;

export const aesthetics = [
  "slim toned",
  "athletic",
  "curvy athletic",
  "slim thick",
  "dancer physique",
  "superhero physique",
  "lean athletic",
  "muscular feminine"
];

export const muscleAreas = [
  "shoulders",
  "chest",
  "arms",
  "abs",
  "glutes",
  "quads",
  "hamstrings",
  "calves",
  "back"
];
