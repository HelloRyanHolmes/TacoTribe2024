import Image from "next/image";
const banner = "https://res.cloudinary.com/dolkj0kiu/image/upload/v1702051062/TacoTribe/xusuezyqrvrftezerwxl.png";

export default function Stake() {
  return (
    <>

      {/* Background */}
      <div className="absolute top-0 left-0 w-screen h-screen z-0 bg-white">
        <div className="relative w-full px-20 mt-20">
          <Image width={1920} height={1080} src={banner} className="object-cover h-full" />
        </div>
      </div>

      <main className=" w-screen h-screen relative">
        {/* Code Here */}
      </main>
      
    </>
  );
}
