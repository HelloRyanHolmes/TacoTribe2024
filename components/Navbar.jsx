"use client"

import { usePathname } from 'next/navigation'

//Images
import homeBtnUp from '@/assets/buttons/homeUpLg.png'
import homeBtnDown from '@/assets/buttons/homeDownLg.png'

import pixelTacoBtnUp from '@/assets/buttons/pixelTacoUp.png'
import pixelTacoBtnDown from '@/assets/buttons/pixelTacoDown.png'

import doodledBtnUp from '@/assets/buttons/doodledUp.png'
import doodledBtnDown from '@/assets/buttons/doodledDown.png'


import pixelDoodBtnUp from '@/assets/buttons/pixelDoodUp.png'
import pixelDoodBtnDown from '@/assets/buttons/pixelDoodDown.png'

import stakeBtnUp from '@/assets/buttons/stakeUp.png'
import stakeBtnDown from '@/assets/buttons/stakeDown.png'

import raffleBtnUp from '@/assets/buttons/raffleUp.png'
import raffleBtnDown from '@/assets/buttons/raffleDown.png'

import minimartBtnUp from '@/assets/buttons/marketUp.png'
import minimartBtnDown from '@/assets/buttons/marketDown.png'

//Button Layout
import NavButton from './UI/Buttons/navButton'

export default function Navbar(){

    const params = usePathname();
    console.log("par:", params);

    return(
        <div className="w-full flex items-center justify-center absolute z-50 top-0 left-0 py-4">
            <div className="w-fit flex flex-row items-center justify-center gap-5 mx-auto">
                <NavButton upImage={homeBtnUp} downImage={homeBtnDown} link={"https://www.nft.tacotribe.shop/"}/>
                <NavButton upImage={pixelTacoBtnUp} downImage={pixelTacoBtnDown} selected={params=="/pixelTaco"? true :false } link={"/pixelTaco"}/>
                <NavButton upImage={doodledBtnUp} downImage={doodledBtnDown} selected={params=="/doodled"? true :false } link={"/doodled"}/>
                <NavButton upImage={pixelDoodBtnUp} downImage={pixelDoodBtnDown} selected={params=="/pixelDood"? true :false } link={"/pixelDood"}/>
                <NavButton upImage={stakeBtnUp} downImage={stakeBtnDown} selected={params=="/stake"? true :false } link={"/stake"}/>
                <NavButton upImage={raffleBtnUp} downImage={raffleBtnDown} selected={params=="/raffle"? true :false } link={"/raffle"}/>
                <NavButton upImage={minimartBtnUp} downImage={minimartBtnDown} selected={params=="/minimart"? true :false } link={"/minimart"}/>
            </div>
        </div>
    )
}

