import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata = {
  title: 'Jawa 42 | Premium Experience',
  description: 'Explore the new Jawa 42 with our immersive 3D configurator and cinematic storytelling.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-primary text-white antialiased selection:bg-accent selection:text-white">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
