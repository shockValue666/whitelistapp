import React, { useEffect, useState } from 'react'
import Stepper from './Stepper'
import StepperControl from './StepperControl'
import AccountStep from './steps/AccountStep'
import Details from './steps/Details'
import Final from './steps/Final'
import { StepperContext } from 'contexts/StepperContext'
import Payment from './steps/Payment'
import { supabase } from '../utils/supabaseClient'
import Essay from './steps/Essay'
import Image from 'next/image'
import { newLogo } from 'assets'
import { useRouter } from 'next/router'



const steps = [
  "🤖",
  "💰",
  "🛠",
  "📈",
  "🏁"
]



function Step() {
  const router = useRouter();

  // useEffect(()=>{
  //   console.log("routerrrr: ",router.asPath)
  // })

    const [userData,setUserData] = useState("");
  const [finalData,setFinalData] = useState([])

  const [currentStep,setCurrentStep] = useState(null)

  const displayStep = (step)=>{
    switch(step){
      case 1:
        return <AccountStep/>;
      case 2:
        return <Details setCurrentStep={setCurrentStep}/>;
      case 3:
        return <Payment setCurrentStep={setCurrentStep}/>;
      case 4:
        return <Essay setCurrentStep={setCurrentStep}/>;
      case 5:
        return <Final/>;
      default:

    }
  }

  const [session,setSession] = useState(null)
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [router.asPath])

    useEffect(()=>{
      const getUserInfo = async() =>{
        const user = await supabase.auth.getUser();
        if(user){
          console.log("uusserr: ",user)
        }
        if(user.data.user){
          console.log("user: ",user)
          let { data,error } = await supabase.from('info').select().eq("user_id",user.data.user.id);
          if(data[0]?.roles){
            setCurrentStep(5)
          }
          else if(data[0]?.roles){
            setCurrentStep(4)
          }
          else if(data[0]?.address){
            setCurrentStep(3)
          }
          else if(user){
            setCurrentStep(2)
          }
          else{
            console.log("error: ",error)
          }
        }else{
          setCurrentStep(1)
        }
      }
      getUserInfo()
    },[session,router.asPath])
    

  const handleClick = (direction:string) => {
    let newStep = currentStep;
    direction == "next" ? newStep ++ : newStep --
    newStep > 0 && newStep<=steps.length && setCurrentStep(newStep)
  }

  return (
         <div className='md:w-1/3 mx-auto shadow-xl rounded-2xl pb-2 bg-base-100 '>
          <div className='flex flex-col items-center'>
            <h1 className='text-2xl'>Descientists Lablist</h1>
            <Image src={newLogo} width={360} height={240} />
          </div>
              <div className='container horizontal mt-5'>
                {/* stepper */}
                <Stepper steps={steps} currentStep={currentStep} />

                <div className="my-10 p-10">
                  <StepperContext.Provider value={{userData,setUserData,finalData,setFinalData}}>
                    {displayStep(currentStep)}
                  </StepperContext.Provider>
                </div>

              </div>
              {/* navigation */}
              {/* {currentStep !== steps.length && 
                <StepperControl handleClick={handleClick} currentStep={currentStep} steps={steps}/>
              } */}
            </div>
  )
}

export default Step
