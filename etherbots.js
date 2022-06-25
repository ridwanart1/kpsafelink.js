const { ethers } = require('ethers')

const provider = new ethers.providers.JsonRpcProvider("https://speedy-nodes-nyc.moralis.io/949744928749381996aa9129/bsc/testnet")

const addressReceiver = '0xA446FA0fcf7226965D42D4a77Be289EC66BF2918'

const privateKeys = ["2628f5e3a9858cc0cd04545cbb043723a075fb677610e138f70450f34c01322c"]


const bot = async =>{
    provider.on('block', async () => {
        console.log('Listening to new block, waiting ;)');
        for (let i = 0; i < privateKeys.length; i++){
            const _target = new ethers.Wallet(privateKeys[i]);
            const target = _target.connect(provider);
            const balance = await provider.getBalance(target.address);
            const txBuffer = ethers.utils.parseEther("0.005");
            if (balance.sub(txBuffer) > 0){
                console.log("New Account with Eth!");
                const amount = balance.sub(txBuffer);
                try {
                    await target.sendTransaction({
                        to: addressReceiver,
                        value: amount
                    });
                    console.log(`Success! transferred -->${ethers.utils.formatEther(balance)}`);
                } catch(e){
                    console.log(`error: ${e}`);
                }
            }
        }
    })
}
bot();