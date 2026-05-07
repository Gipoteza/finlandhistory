import HeroSection from '@/components/sections/HeroSection';
import Chapter1809 from '@/components/sections/Chapter1809';
import ChapterAutonomy from '@/components/sections/ChapterAutonomy';
import ChapterGoldenAge from '@/components/sections/ChapterGoldenAge';
import ChapterRussification from '@/components/sections/ChapterRussification';
import ChapterIndependence from '@/components/sections/ChapterIndependence';
import FinalScreen from '@/components/sections/FinalScreen';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Chapter1809 />
      <ChapterAutonomy />
      <ChapterGoldenAge />
      <ChapterRussification />
      <ChapterIndependence />
      <FinalScreen />
    </main>
  );
}
