import MinimartHolding from "./minimartHolding";

import { contractAdds } from "../../../utils/contractAdds";
import erc20abi from "../../../utils/newAbis/erc20abi";
import erc721abi from "../../../utils/newAbis/erc721abi";
import minimartabi from "../../../utils/newAbis/minimartabi";

import { ethers } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

import { useAccount } from "wagmi";

const error = "https://d19rxn9gjbwl25.cloudfront.net/ui/error.png"

export default function MinimartAggregator() {

  const { address } = useAccount();

  const [listedIds, setListedIds] = useState(null)

  const [loading, setLoading] = useState(false);

  const [displayNFT, setDisplayNFT] = useState([]);


  async function contractSetup() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    try {
      const contract = new ethers.Contract(contractAdds.minimart, minimartabi, signer);
      return contract;
    }
    catch (err) {


      console.log("Error", err)
      Swal.fire({
        title: 'Error!',
        text: 'Couldn\'t get fetching contract',
        imageUrl: error,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Taco OOPS!",
        confirmButtonText: 'Bruh 😭',
        confirmButtonColor: "#facc14",
        customClass: {
          container: "border-8 border-black",
          popup: "bg-white rounded-2xl border-8 border-black",
          image: "-mb-5",
          confirmButton: "w-40 text-black"
        }
      })
    }
  }


  async function setERC20() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    try {
      const contract = new ethers.Contract(contractAdds.guacToken, erc20abi, signer);

      return contract;
    }
    catch (err) {
      console.log(err);
    }
  }

  async function approve(price, index) {
    try {
      setLoading(true)
      const contract = await setERC20();

      const allowance = await contract.allowance(address, contractAdds.minimart);
      console.log(Number(allowance));

      if (allowance < ethers.utils.parseEther(String(price))) {

        const resp = await contract.approve(contractAdds.minimart, ethers.utils.parseEther(String(price)));
        resp.wait().then((res) => {
          buy(price, index);
        })
      }

      else {
        buy(price, index)
      }

    }

    catch (err) {
      console.log(err);
      setLoading(false);
    }

  }

  async function setERC721(contractAdd) {
    try {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      if (contractAdd.toUpperCase() != "0X0000000000000000000000000000000000000000") {
        const contract = new ethers.Contract(contractAdd, erc721abi, signer);
        return contract
      }

    }
    catch (err) {
      console.log(err);
    }
  }


  async function minimartContractSetup() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    try {
      const contract = new ethers.Contract(contractAdds.minimart, minimartabi, signer);
      return contract;
    }
    catch (err) {


      console.log("Error", err)
      Swal.fire({
        title: 'Error!',
        text: 'Couldn\'t get fetching contract',
        imageUrl: error,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Taco OOPS!",
        confirmButtonText: 'Bruh 😭',
        confirmButtonColor: "#facc14",
        customClass: {
          container: "border-8 border-black",
          popup: "bg-white rounded-2xl border-8 border-black",
          image: "-mb-5",
          confirmButton: "w-40 text-black"
        }
      })
    }
  }

  async function buy(price, index) {
    try {
      const contract = await minimartContractSetup();
      const resp = await contract.buyMinimartItem(ethers.utils.parseEther(String(price)), index);

      resp.wait().then(() => {
        Swal.fire({
          icon: "success",
          title: "Item Bought",
          showConfirmButton: false,
          timer: 1500
        }).then((res) => {
          setLoading(false);
          window.location.reload();
        });


      })
    }
    catch (err) {
      setLoading(false);
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Couldn't buy Marketplace Item",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  async function unList(item) {
    try {
      setLoading(true);
      const contract = await minimartContractSetup();
      const resp = await contract.unListItem(item);

      resp.wait().then(() => {
        console.log(resp)
        Swal.fire({
          icon: "success",
          title: "Item Unlisted",
          showConfirmButton: false,
          timer: 1500
        }).then((res) => { window.location.reload() }); setLoading(false);
      });
    }
    catch (err) {
      setLoading(false);
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Couldn't Unlist Marketplace Items",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  async function displayListedNFTs() {
    try {
      // const contract = await setERC721Contract();
      const arr = [];
      
      const minimartContract = await minimartContractSetup();
      
      const data = await minimartContract.fetchData();
      
      for (let i = 0; i < data.length; i++) {
        
        const contract = await setERC721(data[i][0]);
        
        const contractAdd = data[i][0];
        
        if (contractAdd.toUpperCase() != "0X0000000000000000000000000000000000000000") {
          console.log("helloooooo", contractAdd);
          const tokenId = String(data[i][1]);
          const uri = await contract.tokenURI(tokenId);
          const metadata = "https://ipfs.io/ipfs/" + uri.substr(7);
          const meta = await fetch(metadata);
          const json = await meta.json();
          const name = json["name"];
          const img = "https://ipfs.io/ipfs/" + json["image"].substr(7);
          const price = ethers.utils.formatEther(String(data[i][3]));
          const owner = String(data[i][2]);

          arr.push({ name, tokenId, img, price, owner, i });
        }
      }

      setDisplayNFT(arr);
    }

    catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Couldn't display Marketplace Items",
        showConfirmButton: false,
        timer: 1500
      });
    }

  }

  async function fetchListedNfts() {

    try {
      setListedIds(null)
      const contract = await minimartContractSetup();
      console.log("I AM CONTRACTTTT", contract);

      const data = await contract.fetchData();
      console.log("I AM DATA", data);
      const arr = [];

      for (let i = 0; i < data.length; i++) {
        const contractAdd = data[i][0];

        console.log("BROOOO", selectedAddress, contractAdd);

        if (contractAdd.toLowerCase() == selectedAddress.toLowerCase()) {
          console.log("hvfghdrgfgch", contractAdd.toLowerCase(), selectedAddress)
          const tokenId = Number(data[i][1]);
          console.log("hello", tokenId);
          arr[i] = tokenId;
        }

      }

      console.log("COMING", arr);
      setListedIds(arr);
    }

    catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Couldn't fetch Marketplace Items",
        showConfirmButton: false,
        timer: 1500
      });
    }

  }

  useEffect(() => {
    displayListedNFTs();
  }, [])


  return (
    <div className="relative w-[90%] mx-auto z-[-2]">
      <h1 className="text-black text-4xl mb-10">Listed NFTs</h1>
      <div className=" w-fit mt-5">

        <div className="flex gap-5 flex-wrap">
          {displayNFT.map((item) => (
            <div className="mx-auto">
              <Image width={1920} height={1080} src={item.img} className="shadow-xl shadow-black/30 w-52 h-52 mx-auto rounded-2xl relative z-[2] border-2 border-black" />
              <div className="bg-red-400 w-60 px-5 -translate-y-24 shadow-2xl shadow-black/60 pt-28 border-4 border-black rounded-2xl">
                <h1 className="text-black text-xl">{item.name}</h1>
                <h1 className="text-black bg-yellow-400 border-2 py-2 rounded-2xl border-black">{item.price} $GUAC</h1>
                {address.toLowerCase() === item.owner.toLowerCase() ? <button disabled={loading} onClick={() => { unList(item.i) }} className={`bg-red-500 py-2 text-2xl ${loading && " animate-spin "} px-5 my-3 rounded-2xl border-2 border-black hover:bg-red-600`}>Unlist</button> : <button onClick={() => { approve(item.price, item.i) }} className={`bg-blue-500 relative text-2xl py-2 px-5 my-3 ${loading && " animate-spin "} rounded-2xl border-2 border-black hover:bg-blue-600`}>Buy</button>}
              </div>
                </div>
          ))}
        </div>

      </div>


    </div>
  )
}