import {  useEffect, useMemo } from "react"
import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"
import { useActivity } from "./hooks/useActivity"

function App() {
  
  const {state,dispatch} = useActivity()

  useEffect(() => {
      localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp = () => useMemo(() => state.activities.length > 0, [state.activities])

  return (
    <>
        <header className="bg-purple-400 py-5">
            <div className="max-w-4xl mx-auto flex justify-between ">

                <h1 className="text-center mx-auto md:text-3xl max-lg:text-xl font-black uppercase">
                  Contador de Calorias
                </h1>
                <button
                  onClick={() => dispatch({type:'restart-app'})}
                  className="bg-black text-white p-2 font-bold rounded-lg hover:text-amber-400 uppercase cursor-pointer md:text-sm max-lg:text-xs disabled:opacity-5 "
                  disabled={!canRestartApp()}
                  >
                    Reiniciar app
                </button>

            </div>
        </header>

        <section className=" py-20 px-5">
          <div className="md:max-w-4xl mx-auto">
            <Form
            />
          </div>
        </section>

        <section className="bg-black py-10">
          <div className="max-w-4xl mx-auto ">
            <CalorieTracker
            />
          </div>
        </section>

        <section className=" p-10 mx-auto max-w-4xl">
          <ActivityList
          />
        </section>

        <footer className="bg-purple-200 p-3">
          <div className="flex flex-initial">
            <img className="img-fluid h-6 w-6 mx-1" src={`/html5.svg`} alt="imagen react" />
            <img className="img-fluid h-6 w-6 mx-1" src={`/javascript.svg`} alt="imagen react" />
            <img className="img-fluid h-6 w-6 mx-1" src={`/react.svg`} alt="imagen react" />
            <img className="img-fluid h-6 w-6 mx-1" src={`/tailwindcss.svg`} alt="imagen react" />
            <img className="img-fluid h-6 w-6 mx-1" src={`/typescript.svg`} alt="imagen react" />
            <img className="img-fluid h-6 w-6 mx-1" src={`/vite.svg`} alt="imagen react" />
          </div> 
          <p className="mt-2 font-mono">Angel Garcia 2024 - Derechos Reservados</p>

        </footer>

    </>
  )
}

export default App
