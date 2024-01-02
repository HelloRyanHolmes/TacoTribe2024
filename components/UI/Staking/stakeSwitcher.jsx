"use client"


//Stake Buttons
const babyTacoButtonUp = "https://d19rxn9gjbwl25.cloudfront.net/Staking+Buttons/BabyUP.png"
const babyTacoButtonDown = "https://d19rxn9gjbwl25.cloudfront.net/Staking+Buttons/BabyDOWN.png"
const doodledButtonUp = "https://d19rxn9gjbwl25.cloudfront.net/Staking+Buttons/DoodUP.png"
const doodledButtonDown = "https://d19rxn9gjbwl25.cloudfront.net/Staking+Buttons/DoodDOWN.png"
const guacoUP = "https://d19rxn9gjbwl25.cloudfront.net/Staking+Buttons/GuacoUP.png"
const guacoDown = "https://d19rxn9gjbwl25.cloudfront.net/Staking+Buttons/GuacoDOWN.png"
const GVSCUP = "https://d19rxn9gjbwl25.cloudfront.net/Staking+Buttons/gvscUP.png"
const GVSCDown = "https://d19rxn9gjbwl25.cloudfront.net/Staking+Buttons/gvscDOWN.png"
const pixelDoodledButton = "https://d19rxn9gjbwl25.cloudfront.net/Staking+Buttons/PixelDoodUP.png"
const pixelDoodledButtonDown = "https://d19rxn9gjbwl25.cloudfront.net/Staking+Buttons/PixelDoodDOWN.png"
const pixelTacoButtonUp = "https://d19rxn9gjbwl25.cloudfront.net/Staking+Buttons/PixelTacoUP.png"
const pixelTacoButtonDown = "https://d19rxn9gjbwl25.cloudfront.net/Staking+Buttons/PixelDOWN.png"
const tacoTribeButtonUp = "https://d19rxn9gjbwl25.cloudfront.net/Staking+Buttons/TacoUP.png"
const tacoTribeButtonDown = "https://d19rxn9gjbwl25.cloudfront.net/Staking+Buttons/TacoDOWN.png"

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