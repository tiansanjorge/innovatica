import { SliderHome } from "@/components/SliderHome/SliderHome";
import { CategoryPreview } from "@/components/CategoryPreview/CategoryPreview";
import { HelpBanner } from "@/components/HelpBanner/HelpBanner";

export default function Home() {
  return (
    <>
      <div>
        <SliderHome />
        <CategoryPreview category="Recomendados" />
        <CategoryPreview category="Celulares" />
        <CategoryPreview category="Televisiones" />
        <HelpBanner />
      </div>
    </>
  );
}
