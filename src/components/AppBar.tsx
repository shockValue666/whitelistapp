import { FC, useEffect, useState } from 'react';
import Link from "next/link";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAutoConnect } from '../contexts/AutoConnectProvider';
import NetworkSwitcher from './NetworkSwitcher';
import { newLogo } from 'assets';

import { supabase } from '../utils/supabaseClient'
import Image from 'next/image'

export const AppBar: FC = props => {
  const { autoConnect, setAutoConnect } = useAutoConnect();
  const [avatar,setAvatar] = useState("")

  const [session,setSession] = useState(null)
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])

    useEffect(()=>{
      if(session){
        // console.log("session: ",session)
        setAvatar(session.user.user_metadata.avatar_url)
      }
    },[session])
  

  return (
    <div>

      {/* NavBar / Header */}
      <div className="navbar flex flex-row md:mb-2 shadow-lg bg-neutral text-neutral-content">
        <div className="navbar-start">
        
           <div className="inline w-22 h-22 md:p-2">
            <Image src={newLogo} alt="bank" width={"120px"} height="80px" className='w-[180px] h-[120px]' />
          </div>
        </div>



        {/* Wallet & Settings */}
        <div className="navbar-end">

          {
            avatar ?
            (
              <div className="avatar">
                <div className=" mask mask-squircle">
                  <Image src={avatar} width={50} height={50} />
                </div>
              </div>
            ) 
            :
            (null)
          }


          <WalletMultiButton className="btn btn-ghost mr-4" />

          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-square btn-ghost text-right">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-base-100 rounded-box sm:w-52">
              <li>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <a>Autoconnect</a>
                    <input type="checkbox" checked={autoConnect} onChange={(e) => setAutoConnect(e.target.checked)} className="toggle" />
                  </label>

                  <NetworkSwitcher />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {props.children}
    </div>
  );
};
