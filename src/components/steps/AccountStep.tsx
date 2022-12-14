import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import NetworkSwitcher from 'components/NetworkSwitcher';
import { useAutoConnect } from 'contexts/AutoConnectProvider';
import React, { useContext } from 'react'
import {StepperContext} from '../../contexts/StepperContext'
import { supabase } from '../../utils/supabaseClient'


function AccountStep() {

      async function signInWithTwitter() {
        await supabase.auth.signInWithOAuth({
          provider: "twitter",
        });
      }


    // const {publicKey} = useWallet();
    // console.log("wallet: ",publicKey.toString())
    const {userData,setUserData} = useContext(StepperContext) 
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setUserData({...userData,[name]:value})
    }

    const login = async () =>{
    //   const { data, error } = await supabase.auth.signUp({
    //   // email: `${userName}@email.com`,
    //   // password: `${decodedsignature}`,
    //       email: `${userData.username}@email.com`,
    //       password: 'example-password',
    // })

    //   if(error){
    //     console.log("error: ",error)
    //   }else if(data){
    //     console.log("data: ",data)
    //   }
    }
  return (
    <div className='flex flex-col'>

      <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
              onlyThirdPartyProviders={true}
              providers={["twitter"]}
            />

            {/* <button
              onClick={signInWithTwitter}
              className="relative px-4 py-2 bg-[#1eb872] rounded-lg text-white mt-4"
            >
              Twitter sign in
            </button> */}
    </div>
  )
}

export default AccountStep
