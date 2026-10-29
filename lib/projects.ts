import data from "@/data/projects.json";
import sizes from "@/data/image-sizes.json";

export type Project = {
  slug: string;
  title: string;
  place: string;
  location: string;
  year: string;
  category: string;
  description: string;
  client: string;
  size: string;
  status: string;
  partners: string[];
  credits?: string;
  images: string[];
  cover: string;
  featured?: number;
};

const imageSizes: Record<string, number[]> = sizes;

function fileName(mediaId: string): string {
  return `${mediaId.split("~")[0].replace(/^29fd7a_/, "")}.jpg`;
}

/** Wix media ids map onto the files downloaded into /public/images. */
export function imagePath(mediaId: string): string {
  return `/images/${fileName(mediaId)}`;
}

/** Intrinsic pixel size, so next/image reserves the right box per image. */
export function imageSize(mediaId: string): { width: number; height: number } {
  const [width, height] = imageSizes[fileName(mediaId)] ?? [1600, 1067];
  return { width: width ?? 1600, height: height ?? 1067 };
}

export const projects: Project[] = data as Project[];

export const featuredProjects: Project[] = projects
  .filter((p) => typeof p.featured === "number")
  .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Previous/next within the overview order, wrapping at both ends. */
export function getNeighbours(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}
