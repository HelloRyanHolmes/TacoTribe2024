import tacotribeabi from '../../../../utils/newAbis/tacotribeabi';
import doodletacosabi from '../../../../utils/newAbis/doodletacosabi';
import pixelTacosabi from '../../../../utils/newAbis/pixelTacosabi';
import pixelDoodleabi from '../../../../utils/newAbis/pixelDoodleabi';
import babyTacosabi from "../../../../utils/newAbis/babyTacosabi";
import guacoTribeabi from "../../../../utils/newAbis/guacotribeabi"
import guacSourabi from "../../../../utils/newAbis/guacSourabi";
import { contractAdds } from '../../../../utils/contractAdds';
import { ethers } from "ethers"


export default async function setApprovalForAll(tacoType, address){
    
    try{

        const contractArr = [contractAdds.tacoTribe, contractAdds.doodleTacos, "", contractAdds.pixelTacos, contractAdds.pixelDoodle, contractAdds.babyTacos, contractAdds.guacoTribe, contractAdds.guacSour];
        const abiArr = [tacotribeabi, doodletacosabi, "", pixelTacosabi, pixelDoodleabi, babyTacosabi, guacoTribeabi, guacSourabi];
  
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
  
        const contract = new ethers.Contract(contractArr[tacoType], abiArr[tacoType], signer);
        
        const status = await contract?.isApprovedForAll(address, contractAdds.staking);

        if(!status){
            await contract.setApprovalForAll(contractAdds.staking, true);

            Swal.fire({
              title: 'Approved!',
              text: 'User NFTs were approved',
              icon: success,
              imageAlt: "Taco!",
              confirmButtonText: 'LFG!',
              confirmButtonColor: "#facc14",
              customClass: {
                container: "border-8 border-black",
                popup: "bg-white rounded-2xl border-8 border-black",
                image: "-mb-5",
                confirmButton: "w-40 text-black"
              }
            });
        }
  
      }
      catch(err){
        console.log(err);
      }
}