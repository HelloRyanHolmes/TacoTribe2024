import Image from "next/image";
const bg = "https://tacotribe.s3.ap-south-1.amazonaws.com/assets/projectImages/taco-raffles/raffleBg.png";

export default function Raffle() {
  return (
    <>

      {/* Background */}
      <div className="absolute top-0 left-0 w-screen h-screen z-0">
        <div className="relative h-full">
          <Image width={1920} height={1080} src={bg} className="object-cover h-full" />
        </div>
      </div>

      <main className=" w-screen h-screen relative">
        {/* Code Here */}
      </main>
      
    </>
  );
}
