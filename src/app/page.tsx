import { IntroductionPage } from '@/components/pages/IntroductionPage';
import { Toaster } from '@/components/ui/sonner';

export default function Home() {
  return (
    <>
      <IntroductionPage />
      <Toaster position="top-right" />
    </>
  );
}
