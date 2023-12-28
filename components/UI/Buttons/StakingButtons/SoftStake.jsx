import React from 'react'

const SoftStake = () => {
  return (
    // <button onClick={() => { claim(item.tokenId, item.tacoType) }} className="group relative mt-4">
    //     <Image width={200} height={80} src={claimNFTUp} alt="home" className={"w-40 group-hover:hidden"} />
    //     <Image width={200} height={80} src={claimNFTDown} alt="home" className={"w-40 hidden group-hover:block"} />
    // </button>
    <button onClick={() => { claim(item.tokenId, item.tacoType) }} className=" h-10 border-2 border-black text-black relative mt-4 bg-white rounded-full">
        Soft Stake
    </button>
  )
}

export default SoftStake