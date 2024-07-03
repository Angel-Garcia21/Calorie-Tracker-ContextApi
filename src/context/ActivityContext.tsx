import { createContext, Dispatch, ReactNode, useReducer, useMemo } from "react";
import { activityReducer, initialState, ActivityActions, ActivityState } from "../reducers/activity-reducer";
import { categories } from "../data/categories";
import type { Activity } from "../types";

type activityProviderProps = {
    children: ReactNode, 
}

type createContextProps = {
    state:ActivityState
    dispatch: Dispatch<ActivityActions>
    caloriesBurned:number
    caloriesConsumed:number
    netCalories:number
    categoryName: (category: Activity['category']) => string[]
    isEmptyActivities: boolean
}


export const ActivityContext = createContext<createContextProps>(null!)

export const ActivityProvider = ({children}: activityProviderProps) => {

    const [state, dispatch] = useReducer(activityReducer, initialState)

    const caloriesConsumed = useMemo(() => state.activities.reduce((total, activity)=> activity.category === 1 ?
    total + activity.calories: total, 0 ), [state.activities] )
    const caloriesBurned = useMemo(() => state.activities.reduce((total, activity)=> activity.category === 2 ? 
    total + activity.calories: total, 0 ), [state.activities] )
    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned , [state.activities])

    const categoryName = useMemo(() => (
        category:Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ''),
        [state.activities])

    const isEmptyActivities = useMemo (() =>state.activities.length === 0 , [state.activities])

    
    return (
        <ActivityContext.Provider
        value={{
            state, 
            dispatch,
            caloriesBurned,
            caloriesConsumed,
            netCalories, 
            categoryName,
            isEmptyActivities
        }}
        >
            {children}
        </ActivityContext.Provider>
    )
}