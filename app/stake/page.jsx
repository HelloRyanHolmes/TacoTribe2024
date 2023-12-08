import Image from "next/image";
import banner from "@/assets/projectImages/staking/banner.png";

export default function Stake() {
  return (
    <>

      {/* Background */}
      <div className="absolute top-0 left-0 w-screen h-screen z-0 bg-white">
        <div className="relative w-full px-20 mt-20">
          <Image src={banner} className="object-cover h-full" />
        </div>
      </div>

      <main className=" w-screen h-screen relative">
        {/* Code Here */}
      </main>
      
    </>
  );
}
