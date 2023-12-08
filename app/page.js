import Image from "next/image";

import bg from "../assets/projectImages/taco_collection/taco-truck-night.png";

export default function Home() {
  return (
    <>

      {/* Background */}
      <div className="absolute top-0 left-0 w-screen h-screen z-0">
        <div className="relative h-full">
          <Image src={bg} className="object-cover h-full" />
        </div>
      </div>

      <main className=" w-screen h-screen relative">
        
      </main>

    </>
  );
}
