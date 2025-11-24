export const Section = ({
  title,
  subtitle,
  children,
  id
}: {
  title?: string;
  subtitle?: string;
  id?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="py-16">
    <div className="mb-8 flex flex-col gap-3 text-center">
      {subtitle && <p className="text-sm uppercase tracking-widest text-brand">{subtitle}</p>}
      {title && <h2 className="text-3xl font-semibold text-ink">{title}</h2>}
    </div>
    {children}
  </section>
);
