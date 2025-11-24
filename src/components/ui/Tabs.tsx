interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}

export const Tabs = ({ tabs, active, onChange }: TabsProps) => (
  <div className="flex flex-wrap gap-3">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${active === tab.id ? 'bg-brand text-white' : 'bg-slate-100 text-ink/80 hover:text-ink'}`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);
