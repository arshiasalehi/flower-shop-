import type { BlogPost, ContentPage, StoreLocation } from '@/types';
import { getImage } from '@/assets/images';

export const contentPages: ContentPage[] = [
  {
    slug: 'about',
    title: 'Our story',
    description: 'Crafting modern botanical experiences rooted in Montréal creativity.',
    sections: [
      {
        heading: 'From studio to citywide deliveries',
        body: 'Fleuriste Montreal launched as a micro-studio in Plateau-Mont-Royal. Today, our design team collaborates with local growers, sustainable farms, and creative partners across North America to deliver immersive floral experiences.'
      },
      {
        heading: 'Our pillars',
        body: 'We obsess over regenerative sourcing, transparent pricing, and concierge-level service for each delivery.',
        bullets: ['Circular design practices', 'Same-day & timed delivery', 'In-house floral stylists', 'Inclusive celebrations']
      }
    ],
    faqs: [
      {
        question: 'Do you design weddings and large events?',
        answer: 'Yes. Our events collective handles everything from art direction to onsite styling. Submit an inquiry and we will craft a tailored concept deck.'
      },
      {
        question: 'Where do you deliver?',
        answer: 'We cover Greater Montréal with same-day delivery before 2 p.m. and next-day shipping across Quebec and Ontario.'
      }
    ]
  },
  {
    slug: 'montreal-florist',
    title: 'Montréal florist guide',
    description: 'Artisanal design language inspired by neighbourhoods from Mile End to Old Port.',
    sections: [
      {
        heading: 'Neighbourhood-driven palettes',
        body: 'Each collection references a Montréal story—think Old Port limestone, Mile End lofts, and Laurier patios.'
      },
      {
        heading: 'Services',
        body: 'Weekly corporate styling, curated subscriptions, hospitality refresh cycles, and large-format installations.'
      }
    ]
  },
  {
    slug: 'faq',
    title: 'Frequently asked questions',
    description: 'Everything you need to know about deliveries, care, and styling.'
    ,
    sections: [
      {
        heading: 'Care basics',
        body: 'Refresh water daily, trim stems at an angle, and avoid direct vents or harsh sunlight.'
      }
    ],
    faqs: [
      { question: 'Can I schedule deliveries?', answer: 'Yes—choose your date at checkout or reach our concierge team for recurring deliveries.' },
      { question: 'What if my blooms arrive damaged?', answer: 'Contact us within 24 hours with photos. We will replace or credit immediately.' },
      { question: 'Do you offer corporate gifting?', answer: 'Absolutely. We brand packaging, ribbons, and custom cards for teams of any size.' }
    ]
  },
  {
    slug: 'careers',
    title: 'Careers at Fleuriste',
    description: 'Join a design-led team shaping the next era of floristry.',
    sections: [
      {
        heading: 'Open roles',
        body: 'We hire floral designers, operations leads, and digital storytellers year-round.'
      },
      {
        heading: 'Benefits',
        body: 'Comprehensive health coverage, continuing education stipends, commuter benefits, and generous product credits.'
      }
    ]
  },
  {
    slug: 'contact',
    title: 'Contact us',
    description: 'Concierge team available daily from 7 a.m. to 9 p.m. EST.',
    sections: [
      {
        heading: 'Studio',
        body: '245 Rue Sainte-Catherine Ouest, Montréal, QC H2X 2X4 — buzzer 203'
      },
      {
        heading: 'Phone',
        body: '+1 (438) 798-2121'
      }
    ]
  },
  {
    slug: 'flower-reference',
    title: 'Flower reference guide',
    description: 'An alphabetical library of stems, care notes, and ideal pairings.',
    sections: [
      {
        heading: 'How to use this guide',
        body: 'Browse by bloom to learn seasonality, scent, styling ideas, and friendly pairings.'
      }
    ]
  }
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'winter-studio-tour',
    title: 'Inside our winter studio refresh',
    excerpt: 'Step behind the scenes with our creative director as we prep seasonal installs.',
    content: 'We swap palette boards quarterly and invite local ceramicists to co-create vessels. This season blends alabaster orchids with moody lisianthus and felted moss.',
    publishedAt: '2025-01-10',
    author: 'Arielle Duval',
    heroImage: getImage('florists at work1') ?? 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80',
    tags: ['studio', 'winter', 'behind-the-scenes']
  },
  {
    slug: 'care-guide-ranunculus',
    title: 'Ranunculus care made simple',
    excerpt: 'Keep delicate petals lush for up to ten days with our hydration rituals.',
    content: 'Use lukewarm water, re-trim every other day, and support stems with airy foliage. Store overnight near a cool window to extend vase life.',
    publishedAt: '2024-12-02',
    author: 'Lina Charest',
    heroImage: getImage('water change') ?? 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80',
    tags: ['care', 'ranunculus']
  },
  {
    slug: 'florist-spotlight-nuns-island',
    title: "Neighbourhood spotlight: Nun's Island blooms",
    excerpt: 'Florist partner Claudine shares favorite morning rituals and plant pairings.',
    content: 'Our satellite atelier looks onto the St. Lawrence, influencing softer palettes layered with grasses and tropical leaves.',
    publishedAt: '2024-11-15',
    author: 'Editorial team',
    heroImage: getImage('florists at work2') ?? 'https://images.unsplash.com/photo-1470137430626-983a37b8ea46?auto=format&fit=crop&w=1600&q=80',
    tags: ['spotlight', 'community']
  }
];

export const storeLocations: StoreLocation[] = [
  {
    id: 'montreal-downtown',
    name: 'Downtown Atelier',
    address: '245 Rue Sainte-Catherine O, Montréal, QC',
    phone: '+1 (438) 798-2121',
    coordinates: { lat: 45.507, lng: -73.569 },
    services: ['Same-day delivery hub', 'Workshops', 'Wedding consultations'],
    schedule: 'Daily 8 a.m. – 8 p.m.'
  },
  {
    id: 'mile-end',
    name: 'Mile End Studio',
    address: '5455 Avenue de Gaspé, Montréal, QC',
    phone: '+1 (438) 610-4400',
    coordinates: { lat: 45.527, lng: -73.606 },
    services: ['Plant clinic', 'Subscription desk'],
    schedule: 'Wed–Sun 10 a.m. – 6 p.m.'
  }
];
