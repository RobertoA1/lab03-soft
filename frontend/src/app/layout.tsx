import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TrpcProvider } from '../providers/trpc-provider';
import { Sidebar } from '../components/layout/sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AgroTech - Sistema de Información de Agricultura de Precisión',
  description: 'Dashboard agronómico para gestión inteligente de cultivos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <TrpcProvider>
          <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </div>
        </TrpcProvider>
      </body>
    </html>
  );
}
