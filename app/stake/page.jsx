import Image from "next/image";
const banner = "https://res.cloudinary.com/dolkj0kiu/image/upload/v1702051062/TacoTribe/xusuezyqrvrftezerwxl.png";

const taco1 = "https://res.cloudinary.com/dolkj0kiu/image/upload/v1702051066/TacoTribe/bkcomjy8l6b92mygglqo.png"

const stakeUp = "https://res.cloudinary.com/dolkj0kiu/image/upload/v1702051062/TacoTribe/stzn7qeshhr5acwu2ljs.png"
const stakeDown = "https://res.cloudinary.com/dolkj0kiu/image/upload/v1702051062/TacoTribe/jqpzflfwcv0j3lplttnx.png"

const claimUp = "https://res.cloudinary.com/dolkj0kiu/image/upload/v1702051066/TacoTribe/bgd94ikwkuoilezku2hm.png"
const claimDown = "https://res.cloudinary.com/dolkj0kiu/image/upload/v1702051066/TacoTribe/icfnbmswou4mn8yunvsp.png"

const switchUp = "https://res.cloudinary.com/dolkj0kiu/image/upload/v1702051063/TacoTribe/ckkhpwif2zp86excgdh6.png"
const switchDown = "https://res.cloudinary.com/dolkj0kiu/image/upload/v1702051063/TacoTribe/jmhyz2f3nsb7vehco4a5.png"

export default function Stake() {
  return (
    <div className="bg-white">

      {/* <div className="absolute top-0 left-0 w-screen h-screen z-0 ">
        <div className="relative w-full px-20 mt-20">
          <Image width={1920} height={1080} src={banner} className="object-cover h-full" />
        </div>
      </div> */}

      <div className="relative w-full pt-20">
          <Image width={1920} height={1080} src={banner} className="object-cover h-full" />
        </div>
      <main className=" w-screen h-screen flex flex-col items-center justify-center -mt-48">
        <div className="w-[60%] bg-yellow-400 grid grid-cols-2 gap-5 p-5 py-10 rounded-[32px]">
          <Image width={500} height={500} src={taco1} className=" w-full pl-10" />
          <div className="flex flex-col gap-2 h-fit w-[80%] mx-auto my-auto">
            <div className="bg-white rounded-full w-full px-4 py-2 shadow shadow-black/20 text-black text-xl"><h2 >Taco Tribe</h2></div>
            <div className="bg-white rounded-full w-full px-4 py-2 shadow shadow-black/20 text-black text-xl"><h2 >Available Tacos: 0</h2></div>
            <div className="w-fit py-1 text-[#73851C] text-3xl"><h2 >Stake your Tacos and earn $GUAC</h2></div>
            <div className="bg-white rounded-full w-fit px-4 py-1 shadow shadow-black/20 text-black cursor-pointer hover:bg-white/80"><h2 >Learn More</h2></div>
          </div>
        </div>

        <div className="flex flex-row gap-6 mt-8">
          <button className='group cursor-pointer'>
            <Image width={80} height={80} src={stakeUp} alt="home" className={"w-40 group-hover:hidden"}/>
            <Image width={80} height={80} src={stakeDown} alt="home" className={"w-40 hidden group-hover:block"}/>
          </button>

          <button className='group cursor-pointer'>
            <Image width={80} height={80} src={claimUp} alt="home" className={"w-40 group-hover:hidden"}/>
            <Image width={80} height={80} src={claimDown} alt="home" className={"w-40 hidden group-hover:block"}/>
          </button>

          <button className='group cursor-pointer'>
            <Image width={80} height={80} src={switchUp} alt="home" className={"w-40 group-hover:hidden"}/>
            <Image width={80} height={80} src={switchDown} alt="home" className={"w-40 hidden group-hover:block"}/>
          </button>

        </div>
      </main>
      
    </div>
  );
}
