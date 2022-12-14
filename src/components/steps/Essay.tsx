import React, { useContext, useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
function Essay({setCurrentStep}) {

    const [essay,setEssay] = useState("")
    const [loading,setLoading] = useState(false)

    const onSubmit = async() =>{
      
        setLoading(true)
        const user = await supabase.auth.getUser();
        console.log("id: : : ",user.data.user.id)
        console.log("essay: ",essay)

        let { data,error } = await supabase.from('info').update({essay:essay}).eq("user_id",user.data.user.id).select();
        if (error) {
            throw error;
        }else{
            console.log(data)
            setCurrentStep(5)
        }
    }

  return (
    <div className='flex flex-col items-center gap-y-8'>
      <div className="text-white text-[20px]">
          Something special about you:
      </div>
      {
        !loading && (
          <div className="w-[100%]">
            <textarea className="textarea textarea-secondary w-[100%]" placeholder="write here..." onChange={(e)=>{setEssay(e.target.value)}}></textarea>
        </div>
        )
      }
    
    {
          loading && (
            <div className="flex justify-center items-center">
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                <span className="visually-hidden">...</span>
              </div>
            </div>
          )
        }

      <div>
        <button disabled={loading} onClick={()=>{onSubmit()}} className="btn btn-outline btn-accent">submit</button>
      </div>
    </div>
  )
}

export default Essay
