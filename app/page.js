import Image from "next/image";

const bg = "https://res.cloudinary.com/dolkj0kiu/image/upload/v1702051080/TacoTribe/gptbcjarlz8by5xdw8xl.png";

export default function Home() {
  return (
    <>

      {/* Background */}
      <div className="absolute top-0 left-0 w-screen h-screen z-0">
        <div className="relative h-full">
          <Image width={1920} height={1080} src={bg} className="object-cover h-full" />
        </div>
      </div>

      <main className=" w-screen h-screen relative">
        
      </main>

    </>
  );
}
