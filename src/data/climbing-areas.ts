// Sample data for the redesign prototype. Invented route names throughout —
// the real crags and regions are real, but we don't have permission to
// republish thecrag.com's actual route catalogue, and the search doesn't
// need to be functional, just populated with something plausible.

export interface Region {
  id: string;
  name: string;
  blurb: string;
  /** Centre point of the region's shape on the AreaPicker's SVG, in viewBox units. */
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

export interface Area {
  id: string;
  regionId: string;
  name: string;
  routeCount: number;
}

export type Style = "trad" | "sport" | "bouldering" | "top-rope";

export interface Route {
  id: string;
  areaId: string;
  name: string;
  grade: number;
  gradeLabel: string;
  style: Style;
  stars: number;
  note: string;
}

export const regions: Region[] = [
  {
    id: "blue-mountains",
    name: "Blue Mountains",
    blurb: "Sandstone crags a short drive from Sydney.",
    cx: 220,
    cy: 210,
    rx: 70,
    ry: 45,
  },
  {
    id: "southern-highlands",
    name: "Southern Highlands & Coast",
    blurb: "Nowra, Bombo, and Point Perpendicular.",
    cx: 260,
    cy: 340,
    rx: 60,
    ry: 55,
  },
  {
    id: "act",
    name: "ACT",
    blurb: "Canberra's local granite and sandstone.",
    cx: 210,
    cy: 400,
    rx: 45,
    ry: 40,
  },
  {
    id: "hunter-valley",
    name: "Hunter Valley",
    blurb: "Volcanic crags north of Sydney.",
    cx: 300,
    cy: 110,
    rx: 55,
    ry: 40,
  },
  {
    id: "northern-tablelands",
    name: "Northern Tablelands",
    blurb: "Granite domes near the Queensland border.",
    cx: 330,
    cy: 40,
    rx: 60,
    ry: 35,
  },
];

export const areas: Area[] = [
  { id: "mount-piddington", regionId: "blue-mountains", name: "Mount Piddington", routeCount: 4 },
  { id: "nowra", regionId: "southern-highlands", name: "Nowra", routeCount: 4 },
  { id: "bombo-quarry", regionId: "southern-highlands", name: "Bombo Quarry", routeCount: 3 },
  { id: "point-perpendicular", regionId: "southern-highlands", name: "Point Perpendicular", routeCount: 3 },
  { id: "booroomba-rocks", regionId: "act", name: "Booroomba Rocks", routeCount: 3 },
  { id: "hunter-valley-crags", regionId: "hunter-valley", name: "Hunter Valley Crags", routeCount: 2 },
  { id: "bald-rock", regionId: "northern-tablelands", name: "Bald Rock", routeCount: 1 },
];

export const routes: Route[] = [
  { id: "r1", areaId: "mount-piddington", name: "Janicepts", grade: 18, gradeLabel: "18", style: "trad", stars: 3, note: "Classic exposed corner, best in the cool." },
  { id: "r2", areaId: "mount-piddington", name: "Bunny Bucket Buttress", grade: 15, gradeLabel: "15", style: "trad", stars: 2, note: "Short and steep, good warm-up." },
  { id: "r3", areaId: "mount-piddington", name: "Whimsy", grade: 21, gradeLabel: "21", style: "sport", stars: 3, note: "Technical face climbing near the lookout." },
  { id: "r4", areaId: "mount-piddington", name: "Sunkissed Slab", grade: 12, gradeLabel: "12", style: "top-rope", stars: 1, note: "Low-commitment, popular with groups." },
  { id: "r5", areaId: "nowra", name: "Riverside Traverse", grade: 20, gradeLabel: "20", style: "sport", stars: 4, note: "Long pumpy line above the water." },
  { id: "r6", areaId: "nowra", name: "Quarry Face Direct", grade: 24, gradeLabel: "24", style: "sport", stars: 3, note: "Steep and sustained, chalk-heavy holds." },
  { id: "r7", areaId: "nowra", name: "Easy Skanking", grade: 14, gradeLabel: "14", style: "sport", stars: 2, note: "Good first outdoor lead." },
  { id: "r8", areaId: "nowra", name: "The Grind", grade: 27, gradeLabel: "27", style: "sport", stars: 4, note: "Sustained crimping, a local test-piece." },
  { id: "r9", areaId: "bombo-quarry", name: "Basalt Blues", grade: 19, gradeLabel: "19", style: "sport", stars: 3, note: "Columnar basalt, striking texture." },
  { id: "r10", areaId: "bombo-quarry", name: "Sea Breeze", grade: 16, gradeLabel: "16", style: "trad", stars: 2, note: "Ocean views, watch for spray on big swells." },
  { id: "r11", areaId: "bombo-quarry", name: "Pillar Talk", grade: 22, gradeLabel: "22", style: "sport", stars: 3, note: "Follows an obvious basalt pillar." },
  { id: "r12", areaId: "point-perpendicular", name: "Cliffhanger", grade: 23, gradeLabel: "23", style: "trad", stars: 4, note: "Big exposure, bring extra slings." },
  { id: "r13", areaId: "point-perpendicular", name: "Lighthouse Arete", grade: 17, gradeLabel: "17", style: "trad", stars: 3, note: "Airy arete finish with ocean views." },
  { id: "r14", areaId: "point-perpendicular", name: "Boulder Beach Boulders", grade: 6, gradeLabel: "V4", style: "bouldering", stars: 2, note: "Sandy landings, tide-dependent access." },
  { id: "r15", areaId: "booroomba-rocks", name: "Missing Link", grade: 20, gradeLabel: "20", style: "trad", stars: 4, note: "Long granite crack, a Canberra classic." },
  { id: "r16", areaId: "booroomba-rocks", name: "Slabmaster", grade: 13, gradeLabel: "13", style: "trad", stars: 2, note: "Friction slab, wear sticky rubber." },
  { id: "r17", areaId: "booroomba-rocks", name: "Overhang Alley", grade: 25, gradeLabel: "25", style: "sport", stars: 3, note: "Powerful moves through the roof." },
  { id: "r18", areaId: "hunter-valley-crags", name: "Volcanic Vibes", grade: 18, gradeLabel: "18", style: "sport", stars: 2, note: "Sharp volcanic rock, tape recommended." },
  { id: "r19", areaId: "hunter-valley-crags", name: "Vineyard View", grade: 15, gradeLabel: "15", style: "top-rope", stars: 3, note: "Great outlook over the valley." },
  { id: "r20", areaId: "bald-rock", name: "Dome Wanderer", grade: 11, gradeLabel: "11", style: "trad", stars: 3, note: "Low-angle granite, long approach walk." },
];

export function getArea(id: string): Area {
  const area = areas.find((a) => a.id === id);
  if (!area) {
    throw new Error(`Unknown area id: ${id}`);
  }
  return area;
}

export function getRegion(id: string): Region {
  const region = regions.find((r) => r.id === id);
  if (!region) {
    throw new Error(`Unknown region id: ${id}`);
  }
  return region;
}
