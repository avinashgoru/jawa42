// cSpell:ignore Jawa, Yezdi
import ModelRange from '@/components/home/ModelRange';

export const metadata = {
  title: 'Models | Jawa Motorcycles',
  description:
    'Explore the complete Jawa and Yezdi motorcycle lineup — Jawa 42, 42 FJ, 42 Bobber, Perak, 350, Yezdi Roadster, Scrambler, and Adventure.',
};

export default function ModelsPage() {
  return (
    <div className="bg-primary min-h-screen pt-20">
      <h1 className="sr-only">Jawa Motorcycles — Full Model Range</h1>
      <ModelRange />
    </div>
  );
}
