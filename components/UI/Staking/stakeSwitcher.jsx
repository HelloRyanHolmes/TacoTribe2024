"use client"

import Image from 'next/image'

//Stake Buttons
const babyTacoButtonUp = "https://d19rxn9gjbwl25.cloudfront.net/buttons/stakingButtons/Baby Taco Button.png"
const babyTacoButtonDown = "https://d19rxn9gjbwl25.cloudfront.net/buttons/stakingButtons/Baby Taco down.png"
const doodledButtonUp = "https://d19rxn9gjbwl25.cloudfront.net/buttons/stakingButtons/Doodled Button.png"
const doodledButtonDown = "https://d19rxn9gjbwl25.cloudfront.net/buttons/stakingButtons/Doodled down.png"
const guacoUP = "https://d19rxn9gjbwl25.cloudfront.net/buttons/stakingButtons/GUACO.png"
const guacoDown = "https://d19rxn9gjbwl25.cloudfront.net/buttons/stakingButtons/GUACO down.png"
const GVSCUP = "https://d19rxn9gjbwl25.cloudfront.net/buttons/stakingButtons/GVSC Button.png"
const GVSCDown = "https://d19rxn9gjbwl25.cloudfront.net/buttons/stakingButtons/GVSC down.png"
const pixelDoodledButton = "https://d19rxn9gjbwl25.cloudfront.net/buttons/stakingButtons/Pixel Doodled Button.png"
const pixelDoodledButtonDown = "https://d19rxn9gjbwl25.cloudfront.net/buttons/stakingButtons/Pixel Doodled down.png"
const pixelTacoButtonUp = "https://d19rxn9gjbwl25.cloudfront.net/buttons/stakingButtons/Pixel Taco Button.png"
const pixelTacoButtonDown = "https://d19rxn9gjbwl25.cloudfront.net/buttons/stakingButtons/Pixel Taco down.png"
const tacoTribeButtonUp = "https://d19rxn9gjbwl25.cloudfront.net/buttons/stakingButtons/Taco Button.png"
const tacoTribeButtonDown = "https://d19rxn9gjbwl25.cloudfront.net/buttons/stakingButtons/Taco down.png"

//StakingButtonTemplate
import StakingButton from '../Buttons/stakingButton'

export default function StakeSwitcher({ changeButton, button }) {


    return (
        <>
            {/* <div className=' left-0 z-10 w-screen flex flex-row xl:gap-10 lg:gap-5 fixed justify-center xl:my-0 xl:mb-4 my-8'> */}
            <div className=' w-screen flex flex-row xl:gap-10 lg:gap-5 justify-center xl:my-0 xl:mb-4 my-8'>
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