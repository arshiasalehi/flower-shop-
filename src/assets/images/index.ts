const modules = import.meta.glob<{ default: string }>('./*', {
  eager: true
});

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const imageMap: Record<string, string> = {};

Object.entries(modules).forEach(([path, module]) => {
  const fileName = path.replace('./', '');
  const base = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
  imageMap[slugify(base)] = module.default;
});

export const getImage = (name: string) => imageMap[slugify(name)];

export const listImages = () => ({ ...imageMap });
