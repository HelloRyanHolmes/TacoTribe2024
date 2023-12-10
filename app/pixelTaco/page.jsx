import Image from "next/image";
import PixelMint from "../../components/UI/Buttons/Minting/pixelTacos";

const bg = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/pixel_collection/taco-truck-night.jpeg";
const bgMobile = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/pixel_collection/taco-truck-night-mobile.png";

export default function PixelTaco() {
  return (
    <>

      {/* Background */}
      <div className="absolute top-0 left-0 w-screen h-screen z-0 md:block">
        <div className="relative h-full">
          <Image width={1920} height={1080} src={bg} className="object-cover h-full" />
        </div>
      </div>

      <div className="absolute top-0 left-0 w-screen h-screen z-0 sm:hidden">
        <div className="relative h-full">
          <Image width={1920} height={1080} src={bgMobile} className="object-cover h-full" />
        </div>
      </div>

      <main className=" w-screen h-screen relative">
        <PixelMint/>
      </main>
      
    </>
  );
}
