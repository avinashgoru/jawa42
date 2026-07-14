// cSpell:ignore Jawa, Yezdi
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ModelRange from "@/components/home/ModelRange";

export const metadata = {
  title: "Models - Jawa Motorcycles",
  description: "Explore the complete lineup of Jawa and Yezdi motorcycles.",
};

export default function ModelsPage() {
  return (
    <main className="bg-primary min-h-screen">
      <Navigation />
      <div className="pt-20">
        <ModelRange />
      </div>
      <Footer />
    </main>
  );
}
