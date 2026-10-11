import generated from "./images.generated.json";
import videoManifest from "./videos.generated.json";

export type Category =
  | "hospitality"
  | "retail"
  | "residential"
  | "commercial"
  | "community";
export type Tag = Category | "interior" | "aerial";

export interface ProjectImage {
  src: string;
  w: number;
  h: number;
  blur?: string;
}
export interface ProjectVideo {
  src: string;
  poster: string;
  name: string;
}
export interface Project {
  n: number;
  slug: string;
  title: string;
  place?: string; // only where the source folder name states it
  category: Category;
  tags: Tag[];
  images: ProjectImage[];
  videos: ProjectVideo[];
}

export const categoryLabels: Record<Tag, string> = {
  hospitality: "Hospitality",
  retail: "Retail and fuel",
  residential: "Residential",
  commercial: "Commercial and industrial",
  community: "Community and landscape",
  interior: "Interiors",
  aerial: "Aerial and site",
};

/**
 * Titles are descriptive, derived from what the renders show. Client and
 * franchise names that appear in the source folders are deliberately NOT used
 * until the owner confirms they may be shown publicly.
 */
const meta: [number, string, Category, Tag[], string?][] = [
  [1, "Extended-stay hotel", "hospitality", [], "Pasadena"],
  [2, "Truck parking facility", "commercial", ["aerial"]],
  [3, "Roadside motel renovation", "hospitality", []],
  [4, "Four-storey hotel", "hospitality", []],
  [5, "Hotel with glass entry tower", "hospitality", []],
  [6, "Estate residence", "residential", []],
  [7, "Courtyard hotel with feature tower", "hospitality", ["aerial"]],
  [8, "Modern residence and pool deck", "residential", []],
  [9, "Residential interiors", "residential", ["interior"]],
  [10, "Brick and stone hotel", "hospitality", []],
  [11, "Warehouse campus landscape", "commercial", ["aerial"], "Irving"],
  [12, "Fuel canopy and convenience store", "retail", []],
  [13, "Apartment facelift", "residential", []],
  [14, "Covered-porch residence", "residential", []],
  [15, "Townhome community", "residential", [], "Brenham"],
  [16, "Cottage massing studies", "residential", []],
  [17, "Community entry monument", "community", ["aerial"]],
  [18, "Retail strip", "retail", ["aerial"]],
  [19, "Warehouse and office headquarters", "commercial", ["interior"]],
  [20, "Two-storey inn", "hospitality", [], "Humble, TX"],
  [21, "Neighbourhood retail centre", "retail", ["aerial"]],
  [22, "Hotel tower conversion", "hospitality", []],
  [23, "Motel facelift", "hospitality", ["aerial"]],
  [24, "Convenience store and fuel", "retail", ["interior", "aerial"], "Forest Park, GA"],
  [25, "Retail plaza", "retail", ["aerial"], "Manvel"],
  [26, "Hotel", "hospitality", [], "Austin"],
  [27, "Hotel with rooftop terrace", "hospitality", ["interior", "aerial"], "Lake Havasu City"],
  [28, "Flex office and warehouse park", "commercial", ["interior", "aerial"]],
  [29, "Community amenity park", "community", ["aerial"]],
  [30, "Hospitality redevelopment", "hospitality", ["aerial"]],
  [31, "Convenience store redevelopment", "retail", ["aerial"]],
  [32, "Retail and fuel centre", "retail", [], "Houston"],
  [33, "Fuel, retail and urgent care", "retail", ["aerial"], "Fulton County, GA"],
  [34, "Memorial plaza", "community", [], "Sherman, TX"],
  [35, "Neighbourhood park", "community", ["aerial"]],
];

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const gen = generated as Record<string, ProjectImage[]>;
const vids = videoManifest as Record<string, ProjectVideo[]>;

export const projects: Project[] = meta.map(([n, title, category, extra, place]) => ({
  n,
  slug: `${slugify(title)}${place ? "-" + slugify(place) : ""}-${n}`,
  title,
  place,
  category,
  tags: [category, ...extra],
  images: gen[String(n)].map(({ src, w, h, blur }) => ({ src, w, h, blur })),
  videos: vids[String(n)] ?? [],
}));

export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const byN = (n: number) => projects.find((p) => p.n === n)!;
export const featured = [8, 27, 24, 7, 15, 28, 12, 31].map(byN);
export const totalProjects = projects.length;
