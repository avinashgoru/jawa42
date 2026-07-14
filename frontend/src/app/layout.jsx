import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Jawa 42 | Premium Experience',
  description: 'Explore the new Jawa 42 with our immersive 3D configurator and cinematic storytelling.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary text-white antialiased selection:bg-accent selection:text-white">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
