'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Sprout, BarChart2, Bell, PlusCircle, Leaf, FileText, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { trpc } from '../../lib/trpc';
import { useAlertSSE } from '../../hooks/use-alert-sse';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/cultivos', label: 'Cultivos', icon: Sprout },
  { href: '/historico', label: 'Histórico', icon: BarChart2 },
  { href: '/alertas', label: 'Alertas', icon: Bell, badge: true as const },
  { href: '/datos', label: 'Cargar Datos', icon: PlusCircle },
  { href: '/reportes', label: 'Reportes', icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();
  useAlertSSE();
  const { data: pendientes = [] } = trpc.alertas.pendientes.useQuery();
  const alertCount = (pendientes as any[]).filter((a: any) => a.estado !== 'resuelta').length;

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col shrink-0">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-200">
        <Leaf className="h-6 w-6 text-green-600" />
        <span className="font-bold text-gray-900 text-lg">AgroTech</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon, badge }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              pathname === href
                ? 'bg-green-50 text-green-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="flex-1">{label}</span>
            {badge && alertCount > 0 && (
              <span className="ml-auto inline-flex items-center justify-center h-5 min-w-[1.25rem] px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                {alertCount}
              </span>
            )}
          </Link>
        ))}
      </nav>
      <div className="px-5 py-3 border-t border-gray-200 space-y-2">
        <button
          onClick={() => { localStorage.removeItem('agrotech-token'); localStorage.removeItem('agrotech-user'); document.cookie = 'agrotech-token=; path=/; max-age=0'; window.location.href = '/login'; }}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          Cerrar Sesión
        </button>
        <p className="text-xs text-gray-400">v1.0 — AgroTech</p>
      </div>
    </aside>
  );
}
