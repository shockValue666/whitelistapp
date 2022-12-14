import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useCallback, useContext, useEffect, useState } from 'react';
import { notify } from 'utils/notifications';
import {StepperContext} from '../../contexts/StepperContext'
import { verify } from '@noble/ed25519';
import bs58 from 'bs58';
import { supabase } from '../../utils/supabaseClient'

export default function Details({setCurrentStep}) {
  const { userData, setUserData } = useContext(StepperContext);

  const {publicKey, signMessage} = useWallet();
  if(publicKey){
    console.log("public key: ",publicKey)
  }

    const onClick = useCallback(async () => {
        try {
            // `publicKey` will be null if the wallet isn't connected
            if (!publicKey) throw new Error('Wallet not connected!');
            // `signMessage` will be undefined if the wallet doesn't support it
            if (!signMessage) throw new Error('Wallet does not support message signing!');
            // Encode anything as bytes
            const message = new TextEncoder().encode('Descientists {}!');
            // Sign the bytes using the wallet
            const signature = await signMessage(message);
            // Verify that the bytes were signed using the private key that matches the known public key
            if (!verify(signature, message, publicKey.toBytes())) throw new Error('Invalid signature!');
            // notify({ type: 'success', message: 'Sign message successful!', txid: bs58.encode(signature) });

            console.log("signature: ",signature.toString())

            try{
                const user = await supabase.auth.getUser();
                const updates = {
                  address:publicKey.toString(),
                  user_id: user.data.user.id,
                  signature:signature.toString()
                  // created_at: new Date(),
                };
                let { data,error } = await supabase.from('info').insert(updates).select();
                if(data){
                  console.log("data :",data)
                  setCurrentStep(3)
                    // notify({ type: 'success', message: 'Sign message successful!' + "data: " + data});
                }else{
                  // notify({ type: 'error', message: `Sign Message failed! ` + error,});  
                  console.log("error: ",error)
                }
              }catch(err){
                // notify({ type: 'error', message: `Sign Message failed!`, description: err });
                console.log("error: ",err)
              }

            if(session){
              console.log("session exists")
            }
        } catch (error: any) {
            notify({ type: 'error', message: `Sign Message failed!`, description: error?.message });
            console.log('error', `Sign Message failed! ${error?.message}`);
        }
    }, [publicKey, notify, signMessage]);


  const [session,setSession] = useState(null)
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])

    const onSubmit = async () =>{
      try{
          const user = await supabase.auth.getUser();
          const updates = {
            address:publicKey.toString(),
            user_id: user.data.user.id,
            // signature:signature.toString()
            // created_at: new Date(),
          };
          let { data,error } = await supabase.from('info').insert(updates).select();
          if(data){
            console.log("data :",data)
            setCurrentStep(3)
              // notify({ type: 'success', message: 'Sign message successful!' + "data: " + data});
          }else{
            // notify({ type: 'error', message: `Sign Message failed! ` + error,});  
            console.log("error: ",error)
          }
        }catch(err){
          // notify({ type: 'error', message: `Sign Message failed!`, description: err });
          console.log("error: ",err)
        }
    }

    useEffect(()=>{
      if(session){

      }
    },[session])

  return (
    <div className="flex flex-col items-center justify-center gap-y-8 ">
      <WalletMultiButton className="btn w-[100%]" />
            {/* <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={onClick} disabled={!publicKey}
            >
                <div className="hidden group-disabled:block">
                    Wallet not connected
                </div>
                <span className="block group-disabled:hidden" > 
                    Sign Message 
                </span>
            </button> */}
            <div className='flex justify-between items-center w-[100%]'>
                <div className="form-control w-[100%]">
                
                <input type="text" placeholder="Solana Address..." className="input input-bordered w-full max-w-xs" />
              </div>
              <div>
                <button onClick={()=>{onSubmit()}} className="btn btn-outline btn-accent">submit</button>
              </div>
            </div>
    </div>
  );
}