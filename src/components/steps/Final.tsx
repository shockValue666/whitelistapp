import { StepperContext } from 'contexts/StepperContext';
import React, { useContext, useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'

function Final() {
  const router = useRouter();
  const [accepted,setAccepted] = useState("pending")
  useEffect(()=>{
    const setVisibility = async () =>{
      const user = await supabase.auth.getUser();
      let { data,error } = await supabase.from('info').select().eq("user_id",user.data.user.id);
        if (error) {
            throw error;
        }else{
            console.log(data[0].accepted)
            if(data[0].accepted == "pend"){
              setAccepted("pending")
            }else if(data[0].accepted == "accepted"){
              setAccepted("accepted")
            } else{
              setAccepted("rejected")
            }
         
        }
    }
    setVisibility();
  },[])

  return (
     <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <div className="wrapper">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        <div className="text-lg font-semibold text-gray-500">
          Your Lablist Application has been <span className='text-[#9945FF]'>submitted</span>.
        </div>
        <div className="text-lg text-white mt-2">
            Application Status: 
        </div>
        {
          accepted == "pending" &&
          (
            <>
          <div className="badge badge-warning mt-2">
          pending
        </div>
        <p className='mt-5 '>While you wait, make sure to join <a className=" text-[#9945FF] link-hover link-primary" href="https://discord.gg/86ttwYPXuR" target={"_blank"}>Discord</a> and say hi!</p> 
        </>
        )
        }

        {
          accepted == "accepted" &&
        (
          <>
          <div className="badge badge-success mt-2">
          success
        </div>
        </>
        )
        }

        {
          accepted == "rejected" &&
        (
          <div className="badge badge-error mt-2">
          rejected
        </div>
        )
        }



        {/* <button
          type="button"
          className="button block"
          onClick={() => {supabase.auth.signOut();router.push("/")}}
        >
          Sign Out
        </button>
         */}
      </div>
    </div>
  )
}

export default Final