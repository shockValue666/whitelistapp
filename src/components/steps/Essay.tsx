import React, { useContext, useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
function Essay({setCurrentStep}) {

    const [essay,setEssay] = useState("")

    const onSubmit = async() =>{
      

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
      <div className="w-[100%]">
          <textarea className="textarea textarea-secondary w-[100%]" placeholder="Bio" onChange={(e)=>{setEssay(e.target.value)}}></textarea>
      </div>
    
      <div>
        <button onClick={()=>{onSubmit()}} className="btn btn-outline btn-accent">submit</button>
      </div>
    </div>
  )
}

export default Essay
