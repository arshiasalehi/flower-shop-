import type { Product } from '@/types';
import { getImage } from '@/assets/images';

const filterPool = (images: Array<string | undefined>) =>
  images.filter((src): src is string => Boolean(src));

const resolveImageFromPath = (path?: string) => {
  if (!path) return undefined;
  if (path.startsWith('images/')) {
    const file = path.replace('images/', '');
    const base = file.substring(0, file.lastIndexOf('.')) || file;
    return getImage(base);
  }
  return path;
};

const poolByCategory: Record<string, string[]> = {
  bouquets: filterPool([
    getImage('bouquet1'),
    getImage('bouquet2'),
    getImage('bouquet3'),
    getImage('bouquet4'),
    getImage('bouquet5'),
    getImage('bouquet6'),
    getImage('bouquet7'),
    getImage('bouquet8'),
    getImage('bouquet9'),
    getImage('bouquet10'),
    getImage('bouquet11'),
    getImage('bouquet12'),
    getImage('bouquet13'),
    getImage('bouquet14'),
    getImage('bouquet15')
  ]),
  roses: filterPool([getImage('rose1'), getImage('rose2'), getImage('rose3'), getImage('rose4'), getImage('rose5')]),
  orchids: filterPool([getImage('orchid1'), getImage('orchid2'), getImage('orchid3'), getImage('orchid4-heic')]),
  'single-variety': filterPool([getImage('ranunculus'), getImage('tulips'), getImage('a57b22f0b294df068513af6f246ba3d7')]),
  'flowering-indoor-plants': filterPool([
    getImage('amaryllis'),
    getImage('azalea'),
    getImage('kalanchoe'),
    getImage('anthurium')
  ]),
  'indoor-plants': filterPool([
    getImage('monstera'),
    getImage('fiddle-leaf fig'),
    getImage('calathea'),
    getImage('zz')
  ]),
  succulents: filterPool([getImage('succulent compositions1'), getImage('succulent compositions2')]),
  tulips: filterPool([
    getImage('tulip arrangements1'),
    getImage('tulip arrangements2'),
    getImage('tulip arrangements3')
  ]),
  sunflowers: filterPool([getImage('sunflower1'), getImage('sunflower2')]),
  peonies: filterPool([
    getImage('peonies'),
    getImage('peony light'),
    getImage('peony bold'),
    getImage('peony mixed foliage')
  ])
};

const getPoolForProduct = (product: Product) => {
  for (const category of product.categories) {
    const pool = poolByCategory[category];
    if (pool?.length) return pool;
  }
  return undefined;
};

export const getProductImage = (product: Product, index = 0) => {
  const direct = resolveImageFromPath(product.primaryImage);
  if (direct) return direct;
  const pool = getPoolForProduct(product);
  if (pool?.length) {
    return pool[index % pool.length];
  }
  return product.primaryImage;
};

export const getProductGallery = (product: Product, count = 3) => {
  const directGallery = product.imageUrls
    .map((image) => resolveImageFromPath(image))
    .filter((src): src is string => Boolean(src));

  if (directGallery.length) {
    return Array.from({ length: count }, (_, idx) => directGallery[idx % directGallery.length]);
  }

  const pool = getPoolForProduct(product);
  if (pool?.length) {
    return Array.from({ length: count }, (_, idx) => pool[idx % pool.length]);
  }
  return product.imageUrls;
};
