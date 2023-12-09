import Image from "next/image";
const banner = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/banner.png";

const taco1 = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/StakingDappArt.png"

const stakeUp = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Blue+Button+Up.png"
const stakeDown = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Blue+Button+DOWN.png"

const claimUp = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+UP.png"
const claimDown = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+DOWN.png"

const switchUp = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/gREEN_bUTTON.png"
const switchDown = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/gREEN_Button_DOWN.png"

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
