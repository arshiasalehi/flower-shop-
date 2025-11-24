import { motion } from 'framer-motion';

interface HeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
  image?: string;
}

export const Hero = ({ eyebrow, title, description, actions, image }: HeroProps) => (
  <div className="grid gap-10 py-20 md:grid-cols-2">
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      {eyebrow && <p className="text-sm uppercase tracking-[0.3em] text-brand">{eyebrow}</p>}
      <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">{title}</h1>
      <p className="mt-6 text-lg text-ink/80">{description}</p>
      <div className="mt-8 flex flex-wrap gap-4">{actions}</div>
    </motion.div>
    {image && (
      <motion.div className="relative" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <img
          src={image}
          alt={title}
          className="h-full w-full rounded-[48px] object-cover shadow-[0_40px_60px_rgba(198,83,140,0.25)]"
          loading="lazy"
        />
      </motion.div>
    )}
  </div>
);
