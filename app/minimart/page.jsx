import Image from "next/image";
import bg from "../../assets/projectImages/taco-raffles/marketBg.gif";

export default function Minimart() {
  return (
    <>

      {/* Background */}
      <div className="absolute top-0 left-0 w-screen h-screen z-0">
        <div className="relative w-screen h-screen">
          <Image src={bg} className="object-cover w-full h-full" />
        </div>
      </div>

      <main className=" w-screen h-screen relative">
        {/* Code Here */}
      </main>
      
    </>
  );
}
