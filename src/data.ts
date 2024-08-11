export const emojiMapping = {
  xp: {
    S: "<:xps:1186283778621059142>",
    A: "<:xpa:1186283770899345428>",
    B: "<:xpb:1186283773810192475>",
    C: "<:xpc:1186283774888128594>",
    D: "<:xpd:1186283775550836807>",
    F: "<:xpf:1186283777421492284>",
  },
  mf: {
    S: "<:mfs:1186283744190021642>",
    A: "<:mfa:1186283737047109743>",
    B: "<:mfb:1186283738510925854>",
    C: "<:mfc:1186283740041859153>",
    D: "<:mfd:1186283741266579466>",
    F: "<:mff:1186283742319366246>",
  },
  tier: {
    S: "<:s_:1186287004418314371>",
    A: "<:a_:1186286997220892712>",
    B: "<:b_:1186286999028629594>",
    C: "<:c_:1186287000630857748>",
    D: "<:d_:1186287001620721714>",
    F: "<:f_:1186287002442801252>",
  },
};

export interface ITerrorZone {
  apiId: number;
  name: string;
  xp: keyof typeof emojiMapping.xp;
  mf: keyof typeof emojiMapping.mf;
  timeUtc?: number;
}

export const data: ITerrorZone[] = [
  { apiId: 2, name: "Blood Moor and Den of Evil", xp: "B", mf: "B" },
  { apiId: 3, name: "Cold Plains and The Cave", xp: "B", mf: "A" },
  { apiId: 4, name: "Stony Field", xp: "C", mf: "C" },
  { apiId: 5, name: "Dark Wood and Underground Passage", xp: "C", mf: "C" },
  { apiId: 6, name: "Black Marsh and The Hole", xp: "C", mf: "C" },
  { apiId: 12, name: "Pit", xp: "C", mf: "A" },
  {
    apiId: 17,
    name: "Burial Grounds, The Crypt, and the Mausoleum",
    xp: "D",
    mf: "C",
  },
  { apiId: 20, name: "Forgotten Tower", xp: "A", mf: "A" },
  { apiId: 28, name: "Jail amd Barracks", xp: "B", mf: "B" },
  { apiId: 33, name: "Cathedral and Catacombs", xp: "A", mf: "S" },
  { apiId: 38, name: "Tristram", xp: "D", mf: "C" },
  { apiId: 39, name: "Moo Moo Farm", xp: "F", mf: "S" },
  { apiId: 41, name: "Rocky Waste and Stony Tomb", xp: "A", mf: "B" },
  { apiId: 42, name: "Dry Hills and Halls of the Dead", xp: "C", mf: "C" },
  { apiId: 43, name: "Far Oasis", xp: "C", mf: "C" },
  {
    apiId: 44,
    name: "Lost City, Valley of Snakes, and Claw Viper Temple",
    xp: "C",
    mf: "C",
  },
  { apiId: 47, name: "Lut Gholein Sewers", xp: "F", mf: "D" },
  { apiId: 65, name: "Ancient Tunnels", xp: "C", mf: "C" },
  { apiId: 66, name: "Tal Rasha's Tombs", xp: "A", mf: "A" },
  { apiId: 74, name: "Arcane Sanctuary", xp: "C", mf: "B" },
  { apiId: 76, name: "Spider Forest and Spider Cavern", xp: "A", mf: "B" },
  { apiId: 77, name: "Great Marsh", xp: "C", mf: "C" },
  { apiId: 78, name: "Flayer Jungle and Flayer Dungeon", xp: "A", mf: "A" },
  { apiId: 80, name: "Kurast Bazaar", xp: "B", mf: "C" },
  { apiId: 83, name: "Travincal", xp: "D", mf: "S" },
  { apiId: 100, name: "Durance of Hate", xp: "C", mf: "S" },
  { apiId: 104, name: "Outer Steppes and Plains of Despair", xp: "A", mf: "A" },
  {
    apiId: 106,
    name: "City of the Damned and River of Flame",
    xp: "A",
    mf: "B",
  },
  { apiId: 108, name: "Chaos Sanctuary", xp: "S", mf: "S" },
  {
    apiId: 110,
    name: "Bloody Foothills, Frigid Highlands, and Abaddon",
    xp: "C",
    mf: "C",
  },
  { apiId: 112, name: "Arreat Plateau and Pit of Acheron", xp: "C", mf: "B" },
  {
    apiId: 113,
    name: "Crystalline Passage and Frozen River",
    xp: "C",
    mf: "C",
  },
  { apiId: 115, name: "Glacial Trail and Drifter Cavern", xp: "C", mf: "C" },
  { apiId: 118, name: "Ancient's Way and Icy Cellar", xp: "C", mf: "C" },
  { apiId: 121, name: "Nihlathak's Temple and Halls", xp: "A", mf: "S" },
  {
    apiId: 128,
    name: "Worldstone Keep, Throne of Destruction, and Worldstone Chamber",
    xp: "S",
    mf: "A",
  },
];
