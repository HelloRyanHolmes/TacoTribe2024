"use client"

import { usePathname } from 'next/navigation'
import Image from 'next/image'

//Images
const homeBtnUp = 'https://res.cloudinary.com/dolkj0kiu/image/upload/v1702050853/TacoTribe/fh2fm6gyp2hzckkpuxlu.png'
const homeBtnDown = 'https://res.cloudinary.com/dolkj0kiu/image/upload/v1702050853/TacoTribe/qcawocdhhe72mhzaalfb.png'

const pixelTacoBtnUp = 'https://res.cloudinary.com/dolkj0kiu/image/upload/v1702050852/TacoTribe/m2eu2xbfcyxam1naiflo.png'
const pixelTacoBtnDown = 'https://res.cloudinary.com/dolkj0kiu/image/upload/v1702050852/TacoTribe/bedyedyatxzubivndoji.png'

const doodledBtnUp = 'https://res.cloudinary.com/dolkj0kiu/image/upload/v1702050852/TacoTribe/y8uj1phwtlcsrqrhownt.png'
const doodledBtnDown = 'https://res.cloudinary.com/dolkj0kiu/image/upload/v1702050851/TacoTribe/ymjutxrxq47n7slv0hgx.png'

//comedy
const pixelDoodBtnUp = 'https://res.cloudinary.com/dolkj0kiu/image/upload/v1702050851/TacoTribe/ba5gilyoucwjuhbpn4y4.png'
const pixelDoodBtnDown = 'https://res.cloudinary.com/dolkj0kiu/image/upload/v1702050851/TacoTribe/lttbazw3z1df2g5ompxp.png'

const stakeBtnUp = 'https://res.cloudinary.com/dolkj0kiu/image/upload/v1702050854/TacoTribe/psur4kyo3g4pxeq2hrit.png'
const stakeBtnDown = 'https://res.cloudinary.com/dolkj0kiu/image/upload/v1702050854/TacoTribe/zbz8nzrqpmjbnauqrvaw.png'

const raffleBtnUp = 'https://res.cloudinary.com/dolkj0kiu/image/upload/v1702050853/TacoTribe/xrf4d5iv1ri0stwutfkh.png'
const raffleBtnDown = 'https://res.cloudinary.com/dolkj0kiu/image/upload/v1702050852/TacoTribe/pfslpaznnvutmlwhc7dh.png'

const minimartBtnUp = 'https://res.cloudinary.com/dolkj0kiu/image/upload/v1702053540/marketUp_ctb5he.png'
const minimartBtnDown = 'https://res.cloudinary.com/dolkj0kiu/image/upload/v1702053540/marketDown_oekxkm.png'

const backBtnUp = 'https://res.cloudinary.com/dolkj0kiu/image/upload/v1702050851/TacoTribe/xb7jr5fdaq4qyujiffez.png'
const backBtnDown = 'https://res.cloudinary.com/dolkj0kiu/image/upload/v1702050851/TacoTribe/rrg20wm0tq3xm1a6onzs.png'

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
            <WalletConnectButton/>
        </div>
        </>
    )
}

