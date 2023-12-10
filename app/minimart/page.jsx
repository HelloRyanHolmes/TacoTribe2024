import Image from "next/image";
// const bg = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/taco-raffles/marketBg.gif";
import bg from "../../assets/projectImages/taco-raffles/marketBg.gif";
const bgMobile = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/taco-raffles/marketBgMobile.png";

export default function Minimart() {
  return (
    <>
      
      {/* Background */}
      <div className="absolute top-0 left-0 w-screen h-screen z-0 md:block">
        <div className="relative w-screen h-screen">
          <Image width={1920} height={1080} src={bg} className="object-cover w-full h-full" />
        </div>
      </div>

      <div className="absolute top-0 left-0 w-screen h-screen z-0 sm:hidden">
        <div className="relative h-full">
          <Image width={1920} height={1080} src={bgMobile} className="object-cover h-full" />
        </div>
      </div>

      <main className=" w-screen h-screen relative">
        {/* Code Here */}
      </main>
      
    </>
  );
}
