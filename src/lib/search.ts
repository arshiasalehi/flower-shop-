import Fuse from 'fuse.js';
import type { IFuseOptions } from 'fuse.js';
import type { Product } from '@/types';

const options: IFuseOptions<Product> = {
  includeScore: true,
  shouldSort: true,
  threshold: 0.4,
  keys: ['title', 'description', 'tags', 'categories', 'occasions']
};

export const createProductSearch = (products: Product[]) => new Fuse(products, options);
