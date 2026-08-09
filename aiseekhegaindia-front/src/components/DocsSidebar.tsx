import Link from "next/link";
import { docsSidebar } from "@/lib/site";

export function DocsSidebar({ activeSlug }: { activeSlug: string }) {
  return (
    <aside className="w-full shrink-0 md:w-64">
      <div className="sticky top-16 max-h-[calc(100vh-5rem)] overflow-y-auto pr-2">
        {docsSidebar.map((section) => (
          <div key={section.label} className="mb-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
              {section.label}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const active = item.slug === activeSlug;
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/docs/${item.slug}`}
                      className={`block rounded-md px-2 py-1.5 text-sm ${
                        active
                          ? "bg-teal-50 font-semibold text-teal-800"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <p className="text-xs text-slate-400">
          More sections (ML, DL, LLMs) port in later loop ticks.
        </p>
      </div>
    </aside>
  );
}
