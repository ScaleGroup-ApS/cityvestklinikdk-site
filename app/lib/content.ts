import type { ICON_PATHS } from "~/components/ui";

export interface Service {
  slug: string;
  icon: keyof typeof ICON_PATHS;
  title: string;
  short: string;
  long: string;
  points: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "helbredsundersoegelse",
    icon: "stethoscope",
    title: "Helbredsundersøgelser & sundhedstjek",
    short:
      "Grundige helbredstjek, der giver dig et klart billede af dit helbred — og ro i maven.",
    long: "Et sundhedstjek hos Cityvest Klinik er en grundig gennemgang af dit generelle helbred. Vi måler blodtryk, kolesterol og blodsukker, gennemgår din livsstil og lytter til dine bekymringer. Du får en forståelig forklaring på dine resultater og en konkret plan for, hvordan du holder dig sund.",
    points: [
      "Blodtryk, kolesterol og blodsukker",
      "Personlig gennemgang med speciallæge",
      "Skriftligt svar og handlingsplan",
      "Ideelt til forebyggelse og tryghed",
    ],
  },
  {
    slug: "speciallaegekonsultation",
    icon: "users",
    title: "Speciallægekonsultationer",
    short:
      "Kom hurtigt til en erfaren speciallæge — uden lang ventetid og henvisningsbøvl.",
    long: "Hos os møder du speciallæger med mange års erfaring inden for blandt andet kirurgi, dermatologi og almen medicin. Vi tager os tid til at forstå dine symptomer, stiller de rigtige spørgsmål og lægger en behandlingsplan, du kan forstå og stole på.",
    points: [
      "Erfarne, autoriserede speciallæger",
      "God tid til hver konsultation",
      "Klar besked om videre forløb",
      "Diskret og tryg behandling",
    ],
  },
  {
    slug: "mindre-kirurgi",
    icon: "scalpel",
    title: "Mindre kirurgiske indgreb",
    short:
      "Fjernelse af modermærker, fedtknuder og hudforandringer — skånsomt og professionelt.",
    long: "Vi udfører mindre kirurgiske indgreb i sterile, moderne rammer. Det kan være fjernelse af modermærker, fedtknuder (lipomer), cyster eller andre hudforandringer. Indgrebet foregår i lokalbedøvelse, og du kan som regel tage hjem samme dag.",
    points: [
      "Fjernelse af modermærker og knuder",
      "Udføres i lokalbedøvelse",
      "Vævsprøve sendt til analyse ved behov",
      "Hjem samme dag i de fleste tilfælde",
    ],
  },
  {
    slug: "blodproever-diagnostik",
    icon: "vial",
    title: "Blodprøver & diagnostik",
    short:
      "Præcise blodprøver og hurtige svar, så du ikke skal gå og vente i uvished.",
    long: "Vi tilbyder et bredt udvalg af blodprøver og diagnostiske undersøgelser — fra almindelige helbredsmarkører til mere specifikke analyser. Prøverne tages i klinikken, og du får svar hurtigt sammen med en forståelig gennemgang af, hvad tallene betyder for dig.",
    points: [
      "Bredt udvalg af blodprøver",
      "Prøvetagning i klinikken",
      "Hurtige og forståelige svar",
      "Opfølgning ved unormale værdier",
    ],
  },
  {
    slug: "vaccination-rejsemedicin",
    icon: "shield",
    title: "Vaccination & rejsemedicin",
    short:
      "Vaccinationer og rejserådgivning, så du kan rejse trygt — uanset destinationen.",
    long: "Skal du rejse, eller mangler du blot at få opdateret dine vaccinationer? Vi rådgiver ud fra din destination og din sundhedstilstand og tilbyder de relevante vaccinationer på stedet — herunder influenza, stivkrampe og de mest almindelige rejsevaccinationer.",
    points: [
      "Individuel rejserådgivning",
      "Rejse- og standardvaccinationer",
      "Influenza og stivkrampe",
      "Vaccinationskort til rejsen",
    ],
  },
  {
    slug: "erhvervssundhed",
    icon: "briefcase",
    title: "Erhvervssundhed & firmaaftaler",
    short:
      "Sundhedsordninger og helbredstjek til virksomheder, der prioriterer medarbejdernes trivsel.",
    long: "Vi hjælper virksomheder med at holde medarbejderne sunde og trygge. Med en firmaaftale får jeres medarbejdere adgang til hurtige helbredstjek, vaccinationer og speciallægekonsultationer — tilpasset jeres behov og budget. Kontakt os for et uforpligtende tilbud.",
    points: [
      "Skræddersyede sundhedsordninger",
      "Helbredstjek på arbejdspladsen eller i klinikken",
      "Influenzavaccination til medarbejdere",
      "Fast kontaktperson og fleksible aftaler",
    ],
  },
];

export interface Value {
  icon: keyof typeof ICON_PATHS;
  title: string;
  text: string;
}

export const VALUES: Value[] = [
  {
    icon: "heart",
    title: "Mennesket først",
    text: "Vi behandler ikke kun symptomer — vi tager os tid til at forstå hele mennesket bag.",
  },
  {
    icon: "clock",
    title: "Korte ventetider",
    text: "Du skal ikke gå og vente i uvished. Hos os kommer du hurtigt til og får svar i god tid.",
  },
  {
    icon: "sparkle",
    title: "Erfaring & faglighed",
    text: "Autoriserede speciallæger med mange års erfaring står bag hver eneste behandling.",
  },
  {
    icon: "leaf",
    title: "Tryghed & diskretion",
    text: "Rolige, private rammer hvor din sundhed og dit privatliv altid bliver behandlet fortroligt.",
  },
];

export interface Step {
  n: string;
  title: string;
  text: string;
}

export const PROCESS: Step[] = [
  {
    n: "01",
    title: "Kontakt os",
    text: "Ring eller skriv, og fortæl kort hvad du har brug for. Vi finder hurtigt en tid, der passer dig.",
  },
  {
    n: "02",
    title: "Konsultation",
    text: "Du møder en speciallæge, der lytter, undersøger og forklarer dine muligheder i et sprog, du forstår.",
  },
  {
    n: "03",
    title: "Undersøgelse & behandling",
    text: "Vi gennemfører de nødvendige undersøgelser eller behandlinger i trygge, moderne rammer.",
  },
  {
    n: "04",
    title: "Opfølgning",
    text: "Du får klar besked om resultater og næste skridt — og vi følger op, hvis der er behov.",
  },
];

export interface Stat {
  value: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: "15+", label: "års klinisk erfaring" },
  { value: "10.000+", label: "gennemførte konsultationer" },
  { value: "2450", label: "midt i København SV" },
  { value: "4,8/5", label: "gennemsnitlig tilfredshed" },
];
