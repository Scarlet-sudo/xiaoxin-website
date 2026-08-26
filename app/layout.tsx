import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '小馨网站',
  description: '小馨的个人作品与介绍网站',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
