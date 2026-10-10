import './globals.css';

export const metadata = {
  title: 'Aneakajun',
  description: 'Coming Soon',
  icon: '/logo.jpg',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}