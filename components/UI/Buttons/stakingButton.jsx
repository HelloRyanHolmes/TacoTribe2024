"use client"

import Image from 'next/image'

const StakingButton = ({ upImage, downImage, selected, changeButton, type }) => {

    if (!selected)
        return (
            <button onClick={() => changeButton(type)} className='group cursor-pointer'>
                <Image width={200} height={80} src={upImage} alt="home" className={"w-20 group-hover:hidden"} />
                <Image width={200} height={80} src={downImage} alt="home" className={"w-20 hidden group-hover:block"} />
            </button>
        )
    
    else
        return (
            <button onClick={() => changeButton("")} className='cursor-pointer'>
                <Image width={200} height={80} src={downImage} alt="home" className={"w-20"} />
            </button>
        )
}

export default StakingButton