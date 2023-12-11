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
            <div className=' left-0 z-10 w-screen flex flex-row xl:gap-10 lg:gap-5 fixed justify-center xl:my-0 xl:mb-4 my-8'>
                <StakingButton upImage={tacoTribeButtonUp} downImage={tacoTribeButtonDown} selected={button === 'Taco Tribe' ? true : false} changeButton={changeButton} type={"Taco Tribe"} />
                <StakingButton upImage={pixelTacoButtonUp} downImage={pixelTacoButtonDown} selected={button === 'Pixel Taco' ? true : false} changeButton={changeButton} type={"Pixel Taco"} />
                {/* <StakingButton upImage={babyTacoButtonUp} downImage={babyTacoButtonDown} selected={button === 'Baby Taco' ? true : false} changeButton={changeButton} type={"Baby Taco"} /> */}
                <StakingButton upImage={doodledButtonUp} downImage={doodledButtonDown} selected={button === 'Doodled Taco' ? true : false} changeButton={changeButton} type={"Doodled Taco"} />
                <StakingButton upImage={guacoUP} downImage={guacoDown} selected={button === 'Guaco Tribe' ? true : false} changeButton={changeButton} type={"Guaco Tribe"} />
                <StakingButton upImage={GVSCUP} downImage={GVSCDown} selected={button === 'Guac VS Sour Cream' ? true : false} changeButton={changeButton} type={"Guac VS Sour Cream"} />
                <StakingButton upImage={pixelDoodledButton} downImage={pixelDoodledButtonDown} selected={button === 'Pixel Doodled Taco' ? true : false} changeButton={changeButton} type={"Pixel Doodled Taco"} />
            </div>
        </>
    )
}