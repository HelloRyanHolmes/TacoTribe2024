"use client"

import { usePathname } from 'next/navigation'
import Image from 'next/image'

//Wagmi
import { useAccount } from 'wagmi'

//Images
const homeBtnUp = 'https://tacotribe.s3.ap-south-1.amazonaws.com/assets/buttons/homeUpLg.png'
const homeBtnDown = 'https://tacotribe.s3.ap-south-1.amazonaws.com/assets/buttons/homeDownLg.png'

const pixelTacoBtnUp = 'https://tacotribe.s3.ap-south-1.amazonaws.com/assets/buttons/pixelTacoUp.png'
const pixelTacoBtnDown = 'https://tacotribe.s3.ap-south-1.amazonaws.com/assets/buttons/pixelTacoDown.png'

const doodledBtnUp = 'https://tacotribe.s3.ap-south-1.amazonaws.com/assets/buttons/doodledUp.png'
const doodledBtnDown = 'https://tacotribe.s3.ap-south-1.amazonaws.com/assets/buttons/doodledDown.png'

//comedy
const pixelDoodBtnUp = 'https://tacotribe.s3.ap-south-1.amazonaws.com/assets/buttons/pixelDoodUp.png'
const pixelDoodBtnDown = 'https://tacotribe.s3.ap-south-1.amazonaws.com/assets/buttons/pixelDoodDown.png'

const stakeBtnUp = 'https://tacotribe.s3.ap-south-1.amazonaws.com/assets/buttons/stakeUp.png'
const stakeBtnDown = 'https://tacotribe.s3.ap-south-1.amazonaws.com/assets/buttons/stakeDown.png'

const raffleBtnUp = 'https://tacotribe.s3.ap-south-1.amazonaws.com/assets/buttons/raffleUp.png'
const raffleBtnDown = 'https://tacotribe.s3.ap-south-1.amazonaws.com/assets/buttons/raffleDown.png'

const minimartBtnUp = 'https://tacotribe.s3.ap-south-1.amazonaws.com/assets/buttons/marketUp.png'
const minimartBtnDown = 'https://tacotribe.s3.ap-south-1.amazonaws.com/assets/buttons/marketDown.png'

const backBtnUp = 'https://tacotribe.s3.ap-south-1.amazonaws.com/assets/buttons/backSmallUp.png'
const backBtnDown = 'https://tacotribe.s3.ap-south-1.amazonaws.com/assets/buttons/backSmallDown.png'

//Button Layout
import NavButton from './UI/Buttons/navButton'
import {WalletConnectButton} from "./UI/Buttons/walletConnectButton";
import GuacBalance from "./UI/Labels/guacBalance"
import { useState } from 'react'

export default function Navbar(){

    const params = usePathname();

    const [openNav, setOpenNav] = useState(false);

    const { address, isConnected, isDisconnected } = useAccount();

    return(<>
            {openNav && <div className='absolute top-0 left-0 z-10 w-screen h-screen bg-yellow-400 flex flex-col gap-1 items-center justify-center'>
                <NavButton upImage={homeBtnUp} downImage={homeBtnDown} link={"https://www.nft.tacotribe.shop/"}/>
                <NavButton upImage={pixelTacoBtnUp} downImage={pixelTacoBtnDown} selected={params=="/pixelTaco"? true :false } link={"/pixelTaco"}/>
                <NavButton upImage={doodledBtnUp} downImage={doodledBtnDown} selected={params=="/doodled"? true :false } link={"/doodled"}/>
                <NavButton upImage={pixelDoodBtnUp} downImage={pixelDoodBtnDown} selected={params=="/pixelDood"? true :false } link={"/pixelDood"}/>
                <NavButton upImage={stakeBtnUp} downImage={stakeBtnDown} selected={params=="/stake"? true :false } link={"/stake"}/>
                <NavButton upImage={raffleBtnUp} downImage={raffleBtnDown} selected={params=="/raffle"? true :false } link={"/raffle"}/>
                <NavButton upImage={minimartBtnUp} downImage={minimartBtnDown} selected={params=="/minimart"? true :false } link={"/minimart"}/>
            </div>}
        
        <div suppressHydrationWarning={true} className="w-full flex items-center justify-between px-10 max-lg:px-2 absolute z-50 top-0 left-0 py-4">
            

            <div className='md:hidden'>
                <button onClick={()=>{setOpenNav(prev=>!prev)}} className='group cursor-pointer'>
                    <Image width={80} height={80} src={backBtnUp} alt="home" className={"w-10 group-hover:hidden"}/>
                    <Image width={80} height={80} src={backBtnDown} alt="home" className={"w-10 hidden group-hover:block"}/>
                </button>
            </div>
            
            <div className="w-fit max-md:hidden flex flex-row items-center justify-center gap-5 max-lg:gap-1">
                <NavButton upImage={homeBtnUp} downImage={homeBtnDown} link={"https://www.nft.tacotribe.shop/"}/>
                <NavButton upImage={pixelTacoBtnUp} downImage={pixelTacoBtnDown} selected={params=="/pixelTaco"? true :false } link={"/pixelTaco"}/>
                <NavButton upImage={doodledBtnUp} downImage={doodledBtnDown} selected={params=="/doodled"? true :false } link={"/doodled"}/>
                <NavButton upImage={pixelDoodBtnUp} downImage={pixelDoodBtnDown} selected={params=="/pixelDood"? true :false } link={"/pixelDood"}/>
                <NavButton upImage={stakeBtnUp} downImage={stakeBtnDown} selected={params=="/stake"? true :false } link={"/stake"}/>
                <NavButton upImage={raffleBtnUp} downImage={raffleBtnDown} selected={params=="/raffle"? true :false } link={"/raffle"}/>
                <NavButton upImage={minimartBtnUp} downImage={minimartBtnDown} selected={params=="/minimart"? true :false } link={"/minimart"}/>
            </div>
            <div suppressHydrationWarning={true} className='flex flex-row gap-2'>
                <WalletConnectButton/>
                <GuacBalance/>
            </div>
        </div>
        </>
    )
}

