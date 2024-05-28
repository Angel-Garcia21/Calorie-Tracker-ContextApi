import {useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"


type CalorieTrackerProps = {
    activities: Activity[]
}



export default function CalorieTracker({activities}: CalorieTrackerProps) {

    const caloriesConsumed = useMemo(() => activities.reduce((total, activity)=> activity.category === 1 ? total + activity.calories: total, 0 ), [activities] )

    const caloriesBurned = useMemo(() => activities.reduce((total, activity)=> activity.category === 2 ? total + activity.calories: total, 0 ), [activities] )

    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned , [activities])


    return (
    <>
    <h2 className="md:text-4xl text-2xl font-bold text-white text-center " >Resumen de Calorias</h2>
    <p className="text-center items-center md:text-lg max-lg:text-sm text-violet-400 mt-5 font-semibold">
        {caloriesConsumed < caloriesBurned ? '¡Has logrado un Deficit Calorico!' : ''}</p>
    
    <div className="flex items-center justify-between md:gap-5 max-lg:gap-2 mt-5  ">
        <CalorieDisplay
        calories ={caloriesConsumed}
        text='Consumidas'
        />

        <CalorieDisplay
        calories ={netCalories}
        text='Diferencia'
        />

        <CalorieDisplay
        calories ={caloriesBurned}
        text='Quemadas'
        />

        

        

        
    </div>
    

    </>
    )
}

