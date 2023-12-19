"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react'

const StakingButton = ({ upImage, downImage, selected, changeButton, type }) => {

    const[name, setName] = useState("Taco Tribe");

    function getName(){
        switch(type){
            case 0:
                setName("Taco Tribe");
                break;
            case 1:
                setName("Doodle Tacos")
                break;
            case 3: 
                setName("Pixel Tacos");
                break;
            case 5: 
                setName("Baby Tacos");
                break;
            case 4:
                setName("Doodle Pixel")  
                break;
            case 6:
                setName("Guaco Tribe");
                break;
            case 7:
                setName("Guac vs Sour");
                break;
            default:
                console.log("ERROR LMAO");      
        }   
    }

    useEffect(()=>{
        getName();
    },[type, selected])

    if (!selected)
        return (<div className='text-center'>
            <button onClick={() => changeButton(type)} className='group cursor-pointer text-black'>
                <Image width={200} height={80} src={upImage} alt="home" className={"w-20 group-hover:hidden"} />
                <Image width={200} height={80} src={downImage} alt="home" className={"w-20 hidden group-hover:block"} />
            </button>
            <h1 className='text-black text-xs'>{name}</h1>
        </div>
        )
    
    else
        return (<div className='text-center'>
            <button className='cursor-pointer'>
                <Image width={200} height={80} src={downImage} alt="home" className={"w-20"} />
            </button>
            <h1 className='text-black text-xs'>{name}</h1>
        </div>
        )
}

export default StakingButton