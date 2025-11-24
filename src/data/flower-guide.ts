export interface FlowerReferenceItem {
  slug: string;
  name: string;
  season: string;
  care: string;
  pairings: string[];
}

export const flowerGuide: FlowerReferenceItem[] = [
  {
    slug: 'anemone',
    name: 'Anemone',
    season: 'Late winter to spring',
    care: 'Keep away from heat vents and re-trim every 36 hours to prevent drooping.',
    pairings: ['Ranunculus', 'Ruscus', 'Wax flower']
  },
  {
    slug: 'dahlia',
    name: 'Dahlia',
    season: 'July – October',
    care: 'Use shallow water and change daily. Support with branchy foliage.',
    pairings: ['Garden roses', 'Cosmos']
  },
  {
    slug: 'orchid',
    name: 'Phalaenopsis orchid',
    season: 'Year-round',
    care: 'Mist lightly, avoid direct sun, and keep roots moist but not soaked.',
    pairings: ['Monstera leaves', 'Aspidistra']
  }
];
