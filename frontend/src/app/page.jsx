import CinematicHero from '@/components/home/CinematicHero';
import EnginePerformance from '@/components/home/EnginePerformance';
import DesignHighlights from '@/components/home/DesignHighlights';
import StoryTelling from '@/components/home/StoryTelling';
import ModelRange from '@/components/home/ModelRange';
import CallToAction from '@/components/home/CallToAction';

export default function Home() {
  return (
    <div className="relative w-full bg-primary overflow-hidden">
      <CinematicHero />
      <StoryTelling />
      <EnginePerformance />
      <DesignHighlights />
      <ModelRange />
      <CallToAction />
    </div>
  );
}
