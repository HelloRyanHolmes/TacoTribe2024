import Image from "next/image";
import StakeTemplate from "../../components/UI/template/stakeTemplate"
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
        
        <StakeTemplate img={taco1} name="Taco Tribe" available="10"/>

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
