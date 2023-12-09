import Image from "next/image";
import PixelMint from "../../components/UI/Buttons/Minting/pixelTacos"
const bg = "https://res.cloudinary.com/dolkj0kiu/image/upload/v1702051025/TacoTribe/epooxajr7qpqopedgs5b.jpg";

export default function PixelTaco() {
  return (
    <>

      {/* Background */}
      <div className="absolute top-0 left-0 w-screen h-screen z-0">
        <div className="relative h-full">
          <Image width={1920} height={1080} src={bg} className="object-cover h-full" />
        </div>
      </div>

      <main className=" w-screen h-screen relative">
        <PixelMint/>
      </main>
      
    </>
  );
}
