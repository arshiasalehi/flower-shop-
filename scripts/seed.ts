import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outFile = path.resolve(__dirname, '../src/data/products.json');

const categories = [
  'bouquets',
  'roses',
  'orchids',
  'single-variety',
  'flowering-indoor-plants',
  'indoor-plants',
  'succulents',
  'tulips',
  'sunflowers',
  'peonies'
];

const categoryFriendly: Record<string, string> = {
  bouquets: 'Bouquets',
  roses: 'Roses',
  orchids: 'Orchids',
  'single-variety': 'Single Variety',
  'flowering-indoor-plants': 'Flowering Indoor Plants',
  'indoor-plants': 'Indoor Plants',
  succulents: 'Succulents',
  tulips: 'Tulips',
  sunflowers: 'Sunflowers',
  peonies: 'Peonies'
};

const occasions = [
  'mothers-day',
  'best-sellers',
  'anniversary',
  'subscriptions',
  'birthday',
  'arrangements',
  'thank-you',
  'love-and-romance',
  'get-well',
  'maternity',
  'congratulations',
  'just-because',
  'sympathy',
  'montreal-weddings'
];

const colors = ['blush', 'coral', 'white', 'lavender', 'yellow', 'plum', 'green', 'peach'];
const sizes = ['Petite', 'Standard', 'Luxe'];
const deliveryOptions = ['same-day', 'next-day', 'pickup'];

const imageDirectory = 'images';

const imagePools: Record<string, string[]> = {
  bouquets: [
    'bouquet1.jpg',
    'bouquet2.jpg',
    'bouquet3.jpg',
    'bouquet4.jpg',
    'bouquet5.jpg',
    'bouquet6.jpg',
    'bouquet7.jpg',
    'bouquet8.jpg',
    'bouquet9.jpg',
    'bouquet10.jpg',
    'bouquet11.jpg',
    'bouquet12.jpg',
    'bouquet13.jpg',
    'bouquet14.jpg',
    'bouquet15.jpg'
  ],
  roses: ['rose1.jpg', 'rose2.jpg', 'rose3.jpg', 'rose4.jpg', 'rose5.jpg'],
  orchids: ['orchid1.jpg', 'orchid2.jpg', 'orchid3.jpg.webp', 'orchid4.heic.webp'],
  'single-variety': ['ranunculus.jpg', 'tulips.jpg', 'a57b22f0b294df068513af6f246ba3d7.jpg'],
  'flowering-indoor-plants': ['amaryllis.jpg', 'azalea.jpg', 'Kalanchoe.jpg', 'Anthurium.jpg'],
  'indoor-plants': ['monstera.jpg', 'fiddle-leaf fig.jpg', 'calathea.jpg', 'ZZ.jpg'],
  succulents: ['succulent compositions1.jpg', 'succulent compositions2.jpg'],
  tulips: ['tulip arrangements1.jpg', 'tulip arrangements2.jpg', 'tulip arrangements3.jpg'],
  sunflowers: ['sunflower1.jpg', 'sunflower2.jpg'],
  peonies: ['peonies.jpg', 'peony light.jpg', 'peony bold.webp', 'peony mixed foliage.jpg']
};

const fallbackPool = ['bouquet1.jpg'];

const imagePath = (file: string) => `${imageDirectory}/${file}`;

const getImageFromPool = (category: string, offset: number) => {
  const pool = imagePools[category] ?? fallbackPool;
  const index = Math.abs(offset) % pool.length;
  return imagePath(pool[index]);
};

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20241108);

const adjectives = ['Velvet', 'Aurora', 'Monet', 'Garden', 'Midnight', 'Blossom', 'Heritage', 'Luxe', 'Gilded', 'Serenity'];
const nouns = ['Symphony', 'Bouquet', 'Posy', 'Cascade', 'Muse', ' Sonata', 'Petals', 'Bloom', 'Collection', 'Tidings'];

const products = Array.from({ length: 220 }).map((_, index) => {
  const category = categories[index % categories.length];
  const title = `${adjectives[index % adjectives.length]} ${nouns[index % nouns.length]} ${categoryFriendly[category]}`.replace('  ', ' ');
  const basePrice = 45 + Math.round(rand() * 400);
  const isOnSale = rand() > 0.7;
  const compareAtPrice = isOnSale ? parseFloat((basePrice + 15 + rand() * 60).toFixed(2)) : null;
  const price = isOnSale ? parseFloat((basePrice - rand() * 15).toFixed(2)) : basePrice;
  const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${index + 1}`;
  const gallery = Array.from({ length: 3 }, (_, imageIndex) =>
    getImageFromPool(category, index + imageIndex)
  );
  const occasionSample = occasions.filter(() => rand() > 0.5);
  const tags = ['artisan-crafted', 'eco-friendly', 'local-delivery', 'premium', 'long-lasting', 'seasonal'];

  return {
    id: `prod_${index + 1}`,
    title,
    slug,
    description: `Handcrafted ${categoryFriendly[category].toLowerCase()} featuring market-fresh stems selected each morning. Designed for modern interiors with mindful textures, sustainable wrapping, and concierge delivery.`,
    categories: [category],
    occasions: occasionSample.length ? occasionSample : [occasions[index % occasions.length]],
    tags: tags.filter(() => rand() > 0.4).slice(0, 4),
    colors: colors.filter(() => rand() > 0.5).slice(0, 3),
    stems: 12 + Math.round(rand() * 40),
    size: sizes[Math.floor(rand() * sizes.length)],
    price,
    compareAtPrice,
    isOnSale,
    rating: parseFloat((3.8 + rand() * 1.2).toFixed(1)),
    reviewsCount: 10 + Math.floor(rand() * 400),
    sku: `FLR-${String(index + 1).padStart(4, '0')}`,
    availability: rand() > 0.08 ? 'in-stock' : 'out-of-stock',
    deliveryOptions: deliveryOptions.filter(() => rand() > 0.3),
    imageUrls: gallery,
    primaryImage: gallery[0],
    createdAt: new Date(Date.now() - index * 3600 * 1000 * 12).toISOString(),
    popularity: Math.round(rand() * 100),
    badges: [
      ...(isOnSale ? ['sale'] : []),
      ...(rand() > 0.7 ? ['same-day'] : []),
      ...(index < 40 ? ['new'] : [])
    ]
  };
});

const write = async () => {
  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, JSON.stringify(products, null, 2));
  console.log(`Seeded ${products.length} products to src/data/products.json`);
};

write();
