type CalorieDisplayprops = {
    calories: number,
    text: string
}

export default function CalorieDisplay({calories, text }: CalorieDisplayprops) {
    return (
        <p className="text-white font-bold rounded-full grid grid-cols-1 md:gap-3 text-center">
            <span className="font-black md:text-6xl max-lg:text-3xl text-amber-500 "> {calories}</span>
            {text}
        </p> 
    )
}
