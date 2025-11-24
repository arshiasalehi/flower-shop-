export interface ContentPage {
  slug: string;
  title: string;
  description: string;
  heroImage?: string;
  sections: Array<{
    heading: string;
    body: string;
    bullets?: string[];
  }>;
  faqs?: Array<{ question: string; answer: string }>;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  heroImage: string;
  tags: string[];
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  services: string[];
  schedule: string;
}
