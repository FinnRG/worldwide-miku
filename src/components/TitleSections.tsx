import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export default function TitleSection() {
  return (
    <div className="py-10">
      <div className="container mx-auto text-center">
        <h1 className="text-7xl font-bold mb-0">Miku Worldwide</h1>
        <p className="text-xl text-white/80 mb-8">
          A collection of regional Vocaloid characters
        </p>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed">
          Click on the world map to filter the images, or browse through the
          image list below. This list is curated by hand, so any help in
          suggesting images is greatly appreciated. Anyone can suggest new
          images by clicking the button below.
        </p>
        <div className="mt-10">
          <Button
            asChild
            size="lg"
            className="bg-white text-teal-500 hover:bg-teal-50 font-semibold shadow-md rounded-lg transition-all"
          >
            <a href="https://forms.gle/Mx9QLVav3Ldc4fNe7" target="_blank">
              Submit an image
              <ExternalLinkIcon className="ml-2 size-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
