"use client"
import Image from 'next/image';
import { useGlobalContext } from "../../../context/MainContext";

const loaderGif = "https://d19rxn9gjbwl25.cloudfront.net/ui/loader.gif"

const Loader = () => {

  const {loader} = useGlobalContext();

  if(loader) return (
    <div className='absolute top-0 left-0 '>
        <div className='fixed w-screen h-screen flex flex-col z-[9999] bg-yellow-500/80 items-center justify-center top-0 left-0'>
            <Image src={loaderGif} width={800} height={800} alt="" className='w-80'/>
            <h3 className='text-5xl text-black'>Loading...</h3>
        </div>
        <div className='fixed w-screen h-screen top-0 left-0 backdrop-blur-sm blur-sm z-[9998]'></div>
    </div>
  )
}

export default Loader