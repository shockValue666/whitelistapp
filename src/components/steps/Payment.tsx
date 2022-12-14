import { StepperContext } from 'contexts/StepperContext';
import React, { useContext, useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'


const getWidth = () => window.innerWidth 
  || document.documentElement.clientWidth 
  || document.body.clientWidth;

// function useCurrentWidth() {
//   // save current window width in the state object
//   let [width, setWidth] = useState(getWidth());

//   // in this case useEffect will execute only once because
//   // it does not have any dependencies.
//   useEffect(() => {
//     // timeoutId for debounce mechanism
//     let timeoutId = null;
//     const resizeListener = () => {
//       // prevent execution of previous setTimeout
//       clearTimeout(timeoutId);
//       // change width from the state object after 150 milliseconds
//       timeoutId = setTimeout(() => setWidth(getWidth()), 150);
//     };
//     // set resize listener
//     window.addEventListener('resize', resizeListener);

//     // clean up function
//     return () => {
//       // remove resize listener
//       window.removeEventListener('resize', resizeListener);
//     }
//   }, [])

//   return width;
// }

function Payment({setCurrentStep}) {
  const [clicked,setClicked] = useState({})
  const select = async (e) =>{
    // console.log(e.target.name)
    // console.log("clicked[`${e.target.value}`]",clicked[e.target.name])
    if(clicked[e.target.name] == true){
      // console.log("it's true")
      setClicked({...clicked,[e.target.name]:false})
    }else if(!clicked[e.target.name] || clicked[e.target.name] === false){
      // console.log("it's false ", "[e.target.name] = ",clicked[e.target.name] === false)
      setClicked({...clicked,[e.target.name]:true})
    }
  }
    const { userData, setUserData } = useContext(StepperContext);

    useEffect(()=>{
      setUserData({...userData,["choices"]:clicked})
      console.log("clicked: ",clicked)
    },[clicked])

    const onSubmit = async() =>{
      console.log("clicked from submit: ",clicked)
      let roles="";
      for(const role in clicked){
        console.log("role: ",role,":: ",clicked[role])
        if(clicked[role] == true){
          console.log("true: ")
          roles += `${role},`
        }
      }
      const user = await supabase.auth.getUser();
      console.log("id: : : ",user.data.user.id)

      // let { data,error } = await supabase.from('addresses').update({address:"poutsa"}).select();
      let { data,error } = await supabase.from('info').update({roles:roles}).eq("user_id",user.data.user.id).select();
      if (error) {
        throw error;
        }else{
          console.log(data)
          setCurrentStep(4)
        }
      console.log("roles: ",roles)
    }

    const [width,setWidth] = useState(getWidth())

    useEffect(()=>{
      // let width = getWidth();
      console.log("widrth: ",width)
    })

    useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId = null;
    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change width from the state object after 150 milliseconds
      timeoutId = setTimeout(() => setWidth(getWidth()), 150);
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    }
  }, [])

  return (
    <div className="flex flex-col items-center gap-y-8">
      <div>
        <h1>select your role(s)</h1>
      </div>
      <div className='container mx-auto'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          width<600 ?
          (
            <>
            <button onClick = {(e) => {select(e);}} className={` outline-slate-300 outline ${clicked["NFTHolder"] == true ? "bg-black text-white	" : "bg-white text-black"}`} name="NFTHolder">NFT holder</button>
            <button onClick = {(e) => {select(e);}} className={` outline-slate-300 outline ${clicked["mod"] == true ? "bg-black text-white	" : "bg-white text-black"}`} name="mod">Mod</button>
            <button onClick = {(e) => {select(e);}} className={` outline-slate-300 outline ${clicked["collabManager"] == true ? "bg-black text-white	" : "bg-white text-black"}`} name="collabManager">Collab Manager</button>
            <button onClick = {(e) => {select(e);}} className={` outline-slate-300 outline ${clicked["twitterInfluencer"] == true ? "bg-black text-white	" : "bg-white text-black"}`} name="twitterInfluencer">Twitter Influencer</button>
            <button onClick = {(e) => {select(e);}} className={` outline-slate-300 outline ${clicked["artist"] == true ? "bg-black text-white	" : "bg-white text-black"}`} name="artist">Artist</button>
            <button onClick = {(e) => {select(e);}} className={` outline-slate-300 outline ${clicked["developer"] == true ? "bg-black text-white	" : "bg-white text-black"}`} name="developer">developer</button>
            </>
          )
          :
          (<>
            <button onClick = {(e) => {select(e);}} className={`btn outline-slate-300 outline ${clicked["NFTHolder"] == true ? "bg-black text-white	" : "bg-white text-black"}`} name="NFTHolder">NFT holder</button>
            <button onClick = {(e) => {select(e);}} className={`btn outline-slate-300 outline ${clicked["mod"] == true ? "bg-black text-white	" : "bg-white text-black"}`} name="mod">Mod</button>
            <button onClick = {(e) => {select(e);}} className={`btn outline-slate-300 outline ${clicked["collabManager"] == true ? "bg-black text-white	" : "bg-white text-black"}`} name="collabManager">Collab Manager</button>
            <button onClick = {(e) => {select(e);}} className={`btn outline-slate-300 outline ${clicked["twitterInfluencer"] == true ? "bg-black text-white	" : "bg-white text-black"}`} name="twitterInfluencer">Twitter Influencer</button>
            <button onClick = {(e) => {select(e);}} className={`btn outline-slate-300 outline ${clicked["artist"] == true ? "bg-black text-white	" : "bg-white text-black"}`} name="artist">Artist</button>
            <button onClick = {(e) => {select(e);}} className={`btn outline-slate-300 outline ${clicked["developer"] == true ? "bg-black text-white	" : "bg-white text-black"}`} name="developer">developer</button>
          </>)
        }
      </div>
    </div>
    <div>
        <button onClick={()=>{onSubmit()}} className="btn btn-outline btn-accent">submit</button>
      </div>
    </div>
  )
}

export default Payment