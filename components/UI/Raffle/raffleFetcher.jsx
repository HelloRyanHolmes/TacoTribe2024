import { contractAdds } from "../../../utils/contractAdds"
import raffleabi from "../../../utils/newAbis/raffleabi"
import erc721abi from "../../../utils/newAbis/erc721abi"
import erc20abi from "../../../utils/newAbis/erc20abi"
import { useState, useEffect } from "react"
import Image from "next/image"
import {useAccount} from "wagmi"

import {ethers} from "ethers"

export default function RaffleFetcher({number}){

    const [name, setName] = useState("");
    const [amount, setAmount] = useState(1);
    const [image, setImage] = useState("");
    const [ticketsSold, setTicketsSold] = useState(0);
    const [entrants, setEntrants] = useState(0);
    const [winner, setWinner] = useState("");
    const [itemExists, setItemExists] = useState(false);
    const [limitPerWallet, setLimitPerWallet] = useState(0);
    const [limit, setLimit] = useState(0);
    const [holding, setHolding] = useState(0);

    const [price, setPrice] = useState("");

    const arrowright = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/arrowright.png"

    const[ticketModal, setTicketModal] = useState(false);
    
    const{ address } = useAccount();

    async function setRaffle(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();

        try {
        const contract = new ethers.Contract(contractAdds.raffle, raffleabi, signer);
        // console.log("raffle", raffleAdd);
        return contract;
        }
        catch(err){
            console.log(err);
        }
    }

    async function setERC721(contractAdd){
        try{

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
    
            const contract1 = new ethers.Contract(contractAdds.raffle, raffleabi, signer);
            const add = await contract1?.raffleContract(number);
            console.log(add);
            if(add.toUpperCase() == "0X0000000000000000000000000000000000000000"){
              const contract = new ethers.Contract(contractAdd, erc721abi, signer);
              return contract
            }
    
            else{
              const contract = new ethers.Contract(add, erc721abi, signer)
              return contract;
    
            }
          }
          catch(err){
            console.log(err);
          }
    }

    async function setERC20(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();

        try {
        const contract = new ethers.Contract(contractAdds.guacToken, erc20abi, signer);

        return contract;
        }
        catch(err){
            console.log(err);
        }
    }

    async function changeAmount(val){
        if(amount>=1)
        setAmount(amount+val);
        if(amount == 0 && val == 1)
        setAmount(1);
    }
    
    async function fetchRaffle(){
        try{
            console.log("WALLET", address);
            const contract = await setRaffle();
            const add = await contract?.raffleContract(number);
            const tokenId = Number(await contract?.raffleTokenId(number));

            const limitperWallet = Number(await contract?.ticketLimitPerWallet(number))
            const limit = Number(await contract?.ticketLimit(number));

            
            if(limit > 0){
                setPrice(String(await contract?.raffleEntryCost(number)));
                setLimit(limit);
                setLimitPerWallet(limitperWallet);
                setHolding(Number(await contract?.walletHolding(number, address)));
                setItemExists(true);
                const contract721 = await setERC721(add);
    
                const tokenURI = await contract721.tokenURI(tokenId);
                console.log(tokenURI);
                const metadata = `https://ipfs.io/ipfs/${tokenURI.substr(7)}`;
                const meta = await fetch(metadata);
                const json = await meta.json();
                const name = json["name"];
                const image = json["image"];
                const newimage = `https://ipfs.io/ipfs/${image.substr(7)}`
    
                setWinner(await contract.winningAddress(number));
                setTicketsSold(Number(await contract?.ticketsSold(number)));
                setEntrants(Number(await contract?.totalEntrants(number)));
                setName(name);
                setImage(newimage);
            }
        }

        catch(err){
            console.log(err);
        }
    }

    async function buytickets(){
        try{
            const erc721contract = await setERC20();
            console.log(erc721contract, amount*(price));
            const txn = await erc721contract?.approve(contractAdds.raffle, ethers.utils.parseEther(String(amount*price)));
            txn?.wait();
            const contract = await setRaffle();
            console.log(number, amount);
            contract?.enterRaffle(number, amount);
        }
        catch(err){
            console.log(err);
        }


    }

    useEffect(()=>{
        fetchRaffle();
    },[])
    return(
        <div>
            {itemExists ? <div className="bg-yellow-400 h-[37rem] rounded-2xl border-2 border-black w-full p-2 mx-auto">
                <Image width={1920} height={1080} className="w-full mx-auto rounded-2xl border-2 border-black" src={image}/>
                <h2 className="text-2xl">{name}</h2>
                <div className="flex gap-3 my-4">
                    <h2 className="bg-blue-400 text-white rounded-xl p-2">Participants: {entrants}</h2>
                    <h2 className="bg-green-400 text-white rounded-xl p-2">Tickets Sold: {ticketsSold}/{limit}</h2>
                </div>
                <h2 className="bg-red-400 text-white rounded-xl py-2">Your Tickets: {holding}/{limitPerWallet}</h2>
                <h2 className="bg-red-400 text-white rounded-xl py-2 mt-2">Price: {ethers.utils.formatEther(String(price))} $GUAC</h2>
                <button onClick={()=>{
                    setTicketModal(true);
                }} className="text-3xl bg-orange-500 text-white px-5 py-3 mt-6 rounded-xl border-2 border-black ">Buy Tickets</button>
            </div> : 
            <div className="bg-yellow-400 h-[37rem] rounded-2xl border-2 border-black w-full p-5 mx-auto">
                <h1>Fuck you</h1>
                </div>}

                {ticketModal && <div className="bg-yellow-400 z-20 border-2 border-black rounded-2xl w-[300px] px-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl shadow-black">
                    <div className="relative flex flex-col items-center justify-center w-full h-full p-5 pt-10">
                        <h2 onClick={() => { setTicketModal(false) }} className="absolute top-0 right-0 cursor-pointer m-2 mx-4 text-black hover:text-red-600 transform hover:scale-125 transition-all duration-200 ease-in-out">x</h2>
                        {/* <input placeholder="0" type="number" onKeyDown={(e) => { e.preventDefault() }} step={1} min={0} onChange={handleamountChange} value={amount} className="text-black border-2 border-black p-5 py-4 text-center text-3xl block h-fit w-full rounded-xl">
                        </input> */}
                        <div className="grid grid-flow-col grid-cols-3 items-center gap-5">
                            <button onClick={()=>{changeAmount(-1)}} className="p-3">
                                <Image width={1920} height={1080} src={arrowright} className="w-[3rem] rotate-180"/>
                            </button>
                            <div className="text-[2.5rem] text-center text-black">{amount}</div>
                            <button onClick={()=>{changeAmount(1)}} className="p-3">
                                <Image width={1920} height={1080} src={arrowright} className="w-[3rem]"/>
                            </button>
                        </div>
                        <button onClick={buytickets} className='mt-5 group py-4 px-8 text-white rounded-xl border-2 border-black text-3xl bg-blue-400'>
                           Buy
                        </button>
                    </div>
                </div>}
        </div>
    )
}