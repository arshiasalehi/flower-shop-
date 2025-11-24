import { Link } from 'react-router-dom';

interface Crumb {
  label: string;
  href: string;
}

export const Breadcrumbs = ({ crumbs }: { crumbs: Crumb[] }) => (
  <nav aria-label="Breadcrumb" className="text-sm text-ink/70">
    <ol className="flex flex-wrap items-center gap-2">
      {crumbs.map((crumb, index) => (
        <li key={crumb.href} className="flex items-center gap-2">
          {index !== 0 && <span aria-hidden="true">/</span>}
          <Link
            to={crumb.href}
            className={index === crumbs.length - 1 ? 'font-semibold text-ink' : 'hover:text-brand'}
          >
            {crumb.label}
          </Link>
        </li>
      ))}
    </ol>
  </nav>
);
