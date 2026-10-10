import './globals.css';

export const metadata = {
  title: "Aneakajun",
  description: "Diaspora re-rooted.",
  icons: {
    icon: "/logo.jpg?v=2",
    shortcut: "/logo.jpg?v=2",
    apple: "/logo.jpg?v=2",
  },
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