/** Typed content contract. Every property/locale data file must satisfy these types. */
export type PropertySlug = 'netanya' | 'shoresh';

export interface KeyFact {
  label: string;
  value: string;
}

export interface GalleryImage {
  src: ImageMetadata;
  alt: string;
  caption?: string;
}

export interface TimelineStep {
  time: string;
  title: string;
  text: string;
}

export interface Package {
  name: string;
  includes: string[];
  priceFrom?: number;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Property {
  slug: PropertySlug;
  name: string;
  area: string;
  line: string;
  facts: KeyFact[];
  timeline: TimelineStep[];
  amenities: string[];
  packages: Package[];
  faq: FaqItem[];
}
