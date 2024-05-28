import { Activity } from "../types"
import { categories } from "../data/categories"
import { Dispatch, useMemo,  } from "react"
import {XCircleIcon, PencilSquareIcon} from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activity-reducer"


type ActivitylistProps ={
    activities:Activity[]
    dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({activities, dispatch}:ActivitylistProps){

    const CategoryName = useMemo(() => (
        category:Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ''),
        [activities])

        const isEmptyActivities = useMemo (() =>activities.length === 0 , [activities])


    return (
        <>
            <h2 className='md:text-4xl max-lg:text-2xl font-black text-black text-center'>Comida y Actividades</h2>

            {isEmptyActivities? 
            <p className="text-center text-lg text-amber-600 mt-5 font-mono ">Aun no hay Actividades...</p> :  
                activities.map(activity => (
                    <div
                    key={activity.id}
                    className="px-5 md:py-10 max-lg:py-4 bg-black mt-10 flex justify-between hover:shadow-xl"
                    >
                        <div className="space-y-2 relative">
                            <p className= {`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold 
                            ${activity.category === 1 ? 'bg-teal-500': 'bg-red-700'}`}>
                                {CategoryName(+activity.category)}
                            </p>
                            <p className="text-2xl font-bold pt-5 text-white">{activity.name}</p>
                            <p className="font-black text-4xl text-amber-500">
                            {activity.calories} {''}
                                <span>Calorias</span>    
                            </p>
                        </div>

                        <div className="flex gap'5 items-center">
                            <button
                            onClick={() => dispatch({type:'set-activeId', payload: {id:activity.id}})}
                            >
                                <PencilSquareIcon
                                    className="h-8 w-8 text-white"
                                />
                            </button>

                            <button
                            onClick={() => dispatch({type:'delete-activity', payload: {id:activity.id}})}
                            >
                                <XCircleIcon
                                    className="h-8 w-8 text-red-700"
                                />
                            </button>
                        </div>

                    </div>

    ))}


            
        </>
    )
}