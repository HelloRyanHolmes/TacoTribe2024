"use client"

import Image from 'next/image'

//Stake Buttons
const babyTacoButtonUp = "https://tacotribe.s3.ap-south-1.amazonaws.com/assets/Staking+Buttons/BabyUP.png"
const babyTacoButtonDown = "https://tacotribe.s3.ap-south-1.amazonaws.com/assets/Staking+Buttons/BabyDOWN.png"
const doodledButtonUp = "https://tacotribe.s3.ap-south-1.amazonaws.com/assets/Staking+Buttons/DoodUP.png"
const doodledButtonDown = "https://tacotribe.s3.ap-south-1.amazonaws.com/assets/Staking+Buttons/DoodDOWN.png"
const guacoUP = "https://tacotribe.s3.ap-south-1.amazonaws.com/assets/Staking+Buttons/GuacoUP.png"
const guacoDown = "https://tacotribe.s3.ap-south-1.amazonaws.com/assets/Staking+Buttons/GuacoDOWN.png"
const GVSCUP = "https://tacotribe.s3.ap-south-1.amazonaws.com/assets/Staking+Buttons/gvscUP.png"
const GVSCDown = "https://tacotribe.s3.ap-south-1.amazonaws.com/assets/Staking+Buttons/gvscDOWN.png"
const pixelDoodledButton = "https://tacotribe.s3.ap-south-1.amazonaws.com/assets/Staking+Buttons/PixelDoodUP.png"
const pixelDoodledButtonDown = "https://tacotribe.s3.ap-south-1.amazonaws.com/assets/Staking+Buttons/PixelDoodDOWN.png"
const pixelTacoButtonUp = "https://tacotribe.s3.ap-south-1.amazonaws.com/assets/Staking+Buttons/PixelTacoUP.png"
const pixelTacoButtonDown = "https://tacotribe.s3.ap-south-1.amazonaws.com/assets/Staking+Buttons/PixelDOWN.png"
const tacoTribeButtonUp = "https://tacotribe.s3.ap-south-1.amazonaws.com/assets/Staking+Buttons/TacoUP.png"
const tacoTribeButtonDown = "https://tacotribe.s3.ap-south-1.amazonaws.com/assets/Staking+Buttons/TacoDOWN.png"

//StakingButtonTemplate
import StakingButton from '../Buttons/stakingButton'

export default function StakeSwitcher({ changeButton, button }) {


    return (
        <>
            {/* <div className=' left-0 z-10 w-screen flex flex-row xl:gap-10 lg:gap-5 fixed justify-center xl:my-0 xl:mb-4 my-8'> */}
            <div className=' w-screen flex flex-row lg:gap-5 justify-center xl:my-0 xl:mb-4 my-8 max-md:flex-wrap gap-2'>
                <StakingButton upImage={tacoTribeButtonUp} downImage={tacoTribeButtonDown} selected={button === 0 ? true : false} changeButton={changeButton} type={0} />
                <StakingButton upImage={pixelTacoButtonUp} downImage={pixelTacoButtonDown} selected={button === 3 ? true : false} changeButton={changeButton} type={3} />
                <StakingButton upImage={doodledButtonUp} downImage={doodledButtonDown} selected={button === 1 ? true : false} changeButton={changeButton} type={1} />
                <StakingButton upImage={pixelDoodledButton} downImage={pixelDoodledButtonDown} selected={button === 4 ? true : false} changeButton={changeButton} type={4} />
                <StakingButton upImage={babyTacoButtonUp} downImage={babyTacoButtonDown} selected={button === 5 ? true : false} changeButton={changeButton} type={5} />
                <StakingButton upImage={guacoUP} downImage={guacoDown} selected={button === 6 ? true : false} changeButton={changeButton} type={6} />
                <StakingButton upImage={GVSCUP} downImage={GVSCDown} selected={button === 7 ? true : false} changeButton={changeButton} type={7} />
            </div>
        </>
    )
}