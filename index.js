console.log("My first NodeJS application");
const web3 = require("@solana/web3.js");


const userWallet1=new web3.Keypair();
const userWallet2=new web3.Keypair();
// console.log(userWallet);
const transferSOL=async (from,to,transferAmt,type)=>{
    try{
        const connection=new web3.Connection(web3.clusterApiUrl("devnet"),"confirmed");
        const transaction=new web3.Transaction().add(
            web3.SystemProgram.transfer({
                fromPubkey:new web3.PublicKey(from.publicKey.toString()),
                toPubkey:new web3.PublicKey(to.publicKey.toString()),
                lamports:transferAmt*web3.LAMPORTS_PER_SOL
            })
        )
        const signature=await web3.sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        )
        console.log(`${type} signature is : ${signature}` );
    }catch(err){
        console.log(err);
    }
};
const airDropSol = async (secretKey) => {
    try {
        const connection=new web3.Connection(web3.clusterApiUrl("devnet"),"confirmed");
        const walletKeyPair = await web3.Keypair.fromSecretKey(secretKey);
const fromAirDropSignature = await connection.requestAirdrop(
    new web3.PublicKey(walletKeyPair.publicKey),
    2 * web3.LAMPORTS_PER_SOL
);
await connection.confirmTransaction(fromAirDropSignature);

    } catch (err) {
        console.log(err);
    }
};

const getWalletBalance = async (myWallet) => {
    try {
        
        const connection=new web3.Connection(web3.clusterApiUrl("devnet"),"confirmed");
        const walletBalance = await connection.getBalance(
            new web3.PublicKey(myWallet.publicKey.toString())
        );
        console.log(`=> For wallet address ${myWallet.publicKey}`);
    
        console.log(`   Wallet balance: ${parseInt(walletBalance)/web3.LAMPORTS_PER_SOL}SOL`);
  
    } catch (err) {
        console.log(err);
    }
};

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  const inp=(q)=>{
    readline.question(q, name => {
        return name
      })
  }
  
  var bid =0; 
const driverFunction2 = async () => {
    
    await airDropSol(userWallet1.secretKey);
    await airDropSol(userWallet2.secretKey);
    await readline.write("Welcome to sol stake. Max Bid amount 2\n");
    await readline.write("Your Balance\n");
    await getWalletBalance(userWallet1);
    await readline.question("Your bid amount :",b=>{ 
        bid=b;
        if(b>2 || b<0){
            readline.write("Error in value.");
            driverFunction2();
    }else{
        dF3();
    }
    
    
    } );
    
};
const dF3=async()=>{
    
    await transferSOL(userWallet1,userWallet2,bid,"Payment");
    await readline.write("Your Balance\n");
    await getWalletBalance(userWallet1);
    await readline.question("Guess a number (0-10): ",num=>{
        
        var t=Math.floor(Math.random() * 10);
        if(t==num){
             readline.write("You WOn !! You get 1.5 times value!! \n");
             transferSOL(userWallet2,userWallet1,bid*1.5,"Win Amount");
        }else{
             readline.write("You Lost \n");
            
        }
      
        
    })
}
driverFunction2();
