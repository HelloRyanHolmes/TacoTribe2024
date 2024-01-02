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
        }
  
      }
      catch(err){
        console.log(err);
      }
}