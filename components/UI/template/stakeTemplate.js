import Image from "next/image"

export default function StakeTemplate({img, name, available}){
    return (
        <div className="w-[60%] bg-yellow-400 grid grid-cols-2 gap-5 p-5 py-10 rounded-[32px]">
          <Image width={500} height={500} src={img} className=" w-full pl-10" />
          <div className="flex flex-col gap-2 h-fit w-[80%] mx-auto my-auto">
            <div className="bg-white rounded-full w-full px-4 py-2 shadow shadow-black/20 text-black text-xl"><h2 >{name}</h2></div>
            <div className="bg-white rounded-full w-full px-4 py-2 shadow shadow-black/20 text-black text-xl"><h2 >Available Tacos: {available}</h2></div>
            <div className="w-fit py-1 text-[#73851C] text-3xl"><h2 >Stake your Tacos and earn $GUAC</h2></div>
            <div className="bg-white rounded-full w-fit px-4 py-1 shadow shadow-black/20 text-black cursor-pointer hover:bg-white/80"><h2 >Learn More</h2></div>
          </div>
        </div>
    )
}