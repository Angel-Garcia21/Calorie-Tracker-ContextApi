import { useState, ChangeEvent, FormEvent, useEffect} from "react"
import {v4 as uuidv4} from 'uuid'
import { Activity } from "../types"
import { categories } from "../data/categories"

import { useActivity } from "../hooks/useActivity"



const initialState: Activity ={
        category:1,
        name:'',
        calories:0,
        id: uuidv4()
    }

export default function Form() {

    const {state, dispatch} = useActivity()
    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if(state.activeId) {
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId) [0]
            setActivity(selectedActivity)
        }
    }, [state.activeId])

    const handleChange = (e:ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>  ) => {
        const isNumberField = ['category','calories' ].includes(e.target.id)
            setActivity({
                ...activity,
                [e.target.id] : isNumberField ? +e.target.value : e.target.value
            })
    }
    
    const isValidActivity = () => {
        const {name, calories} = activity 
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({type:'save-activity', payload:{newActivity: activity }})
        
            setActivity({
                ...initialState,
                id:uuidv4()
            })
    }  

    return (
        <form 
            className="space-y-5 bg-gray-200 shadow-xl p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 md:gap-3">
                <label htmlFor="category" className="font-bold"> Categoria:</label>
                    <select 
                    className="border border-slate-400 p-2 rounded-lg w-full bg-gray-100"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                    >
                        {categories.map(category => (
                            <option
                            key={category.id}
                            value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
            </div>
            <div className="grid grid-cols-1 md:gap-3">
                <label htmlFor="name" className="font-bold"> Actividad: </label>
                <input
                id="name"
                type="text"
                className="border border-slate p-2 rounded-lg"
                placeholder="Ej. Comida, Trotar, Caminata, Arroz, Pollo, CrossFit, Pesas."
                value={activity.name}
                onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold"> Calorias: </label>
                <input
                id="calories"
                type="number"
                className="border border-slate p-2 rounded-lg "
                placeholder="Calorias quemadas o consumidas. Ej 300."
                value={activity.calories}
                onChange={handleChange}
                
                />
            </div>

            <input
            id="calories"
            type="submit"
            className="bg-gray-900 hover:bg-black w-full p-2 font-bold uppercase text-white  cursor-pointer disabled:opacity-10"
            value= {activity.category === 1 ? 'Guardar Comida': 'Guardar Ejercicio'}
            disabled={!isValidActivity()}
            />

        </form>
    )
}
