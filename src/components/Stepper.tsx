import React, { useEffect, useRef, useState } from 'react'


function Stepper({steps,currentStep}) {

    const [newStep,setNewStep] = useState([]);
    const stepRef = useRef();

    const displaySteps = newStep.map((step,index)=>
    (
        <div key={index} className={index !== newStep.length ? `w-full flex items-center` : `flex items-center`}>
            <div className={"relative flex flex-col items-center text-[#9945FF] "}>
                <div className={`rounded-full transition duration-500 ease-in-out border-2 border-grey-300 h-12 w-12 flex items-center justify-center py-3 ${step.selected ? "bg-[#9945FF] text-white font-bold border border-black" : "bg-white"}`}>       
                    {/* display number */}
                    {step.completed ? (
                        <span className='text-white font-bold text-xl'>&#10003;</span>
                    ) : (
                        index + 1
                    )}
                </div>      
                <div className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${step.highlighted ? "text-white " : "text-gray-400"}`}>
                    {step.description}
                    {/* display descirption */}
                </div>
            </div>
            <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${step.completed ? "border-[#9945FF] " : "border-[#9945FF]"}`} >
                {/* display line */}
            </div>
        </div>
    )  
    )

    const updateStep = (stepNumber,steps) =>{
        const newSteps = [...steps]
        let count=0;

        while(count<newSteps.length){
            if(count== stepNumber){
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted:true,
                    selected:true,
                    completed:true,
                }
                count++;
            }
            else if(count<stepNumber){
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted:false,
                    selected:true,
                    completed:true,
                }
                count++;
            }
            else{
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted:false,
                    selected:false,
                    completed:false,
                }
                count++;
            }
        }
        return newSteps;
    }

    useEffect(()=>{
        const stepsState = steps.map((step, index) =>
            Object.assign(
                {},
                {
                description: step,
                completed: false,
                highlighted: index === 0 ? true : false,
                selected: index === 0 ? true : false,
                }
            )
        );
        stepRef.current = stepsState;
        const current =  updateStep(currentStep-1, stepRef.current);
        setNewStep(current)
    },[steps,currentStep])
  return (
    <div className="text-black mx-4 p-4 flex justify-between items-center">
        {displaySteps}
    </div>
  )
}

export default Stepper
