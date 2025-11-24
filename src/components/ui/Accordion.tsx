import { useState } from 'react';
import { clsx } from 'clsx';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion = ({ items }: AccordionProps) => {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <div className="divide-y divide-slate-200 rounded-3xl border border-slate-100 bg-white">
      {items.map((item) => (
        <details
          key={item.id}
          open={openId === item.id}
          onClick={() => setOpenId(openId === item.id ? null : item.id)}
          className="group"
        >
          <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-lg font-medium text-ink">
            {item.title}
            <span className={clsx('transition-transform', openId === item.id && 'rotate-45')}>
              +
            </span>
          </summary>
          <div className="px-6 pb-6 text-ink/80">{item.content}</div>
        </details>
      ))}
    </div>
  );
};
