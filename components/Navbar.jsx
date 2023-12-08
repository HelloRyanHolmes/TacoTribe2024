"use client"

import { usePathname } from 'next/navigation'
import Image from 'next/image'

//Images
import homeBtnUp from '../assets/buttons/homeUpLg.png'
import homeBtnDown from '../assets/buttons/homeDownLg.png'

import pixelTacoBtnUp from '../assets/buttons/pixelTacoUp.png'
import pixelTacoBtnDown from '../assets/buttons/pixelTacoDown.png'

import doodledBtnUp from '../assets/buttons/doodledUp.png'
import doodledBtnDown from '../assets/buttons/doodledDown.png'

//comedy
import pixelDoodBtnUp from '../assets/buttons/pixelDoodUp.png'
import pixelDoodBtnDown from '../assets/buttons/pixelDoodDown.png'

import stakeBtnUp from '../assets/buttons/stakeUp.png'
import stakeBtnDown from '../assets/buttons/stakeDown.png'

import raffleBtnUp from '../assets/buttons/raffleUp.png'
import raffleBtnDown from '../assets/buttons/raffleDown.png'

import minimartBtnUp from '../assets/buttons/marketUp.png'
import minimartBtnDown from '../assets/buttons/marketDown.png'

import backBtnUp from '../assets/buttons/backSmallUp.png'
import backBtnDown from '../assets/buttons/backSmallDown.png'

//Button Layout
import NavButton from './UI/Buttons/navButton'
import { WalletConnectButton } from './UI/Buttons/walletConnectButton'
import { useState } from 'react'

export default function Navbar(){

    const params = usePathname();

    const [openNav, setOpenNav] = useState(false);

    return(<>
            {openNav && <div className='absolute top-0 left-0 z-10 w-screen h-screen bg-yellow-400 flex flex-col gap-1 items-center justify-center'>
                <NavButton upImage={homeBtnUp} downImage={homeBtnDown} link={"https://www.nft.tacotribe.shop/"}/>
                <NavButton upImage={pixelTacoBtnUp} downImage={pixelTacoBtnDown} selected={params=="/pixelTaco"? true :false } link={"/pixelTaco"}/>
                <NavButton upImage={doodledBtnUp} downImage={doodledBtnDown} selected={params=="/doodled"? true :false } link={"/doodled"}/>
                <NavButton upImage={pixelDoodBtnUp} downImage={pixelDoodBtnDown} selected={params=="/pixelDood"? true :false } link={"/pixelDood"}/>
                <NavButton upImage={stakeBtnUp} downImage={stakeBtnDown} selected={params=="/stake"? true :false } link={"/stake"}/>
                <NavButton upImage={raffleBtnUp} downImage={raffleBtnDown} selected={params=="/raffle"? true :false } link={"/raffle"}/>
            </div>}
        
        <div className="w-full flex items-center justify-between px-10 max-lg:px-2 absolute z-50 top-0 left-0 py-4">
            

            <div className='md:hidden'>
                <button onClick={()=>{setOpenNav(prev=>!prev)}} className='group cursor-pointer'>
                    <Image src={backBtnUp} alt="home" className={"w-10 group-hover:hidden"}/>
                    <Image src={backBtnDown} alt="home" className={"w-10 hidden group-hover:block"}/>
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
            <WalletConnectButton/>
        </div>
        </>
    )
}

