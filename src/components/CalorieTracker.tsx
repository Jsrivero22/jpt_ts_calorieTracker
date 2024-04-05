import { useMemo } from "react";
import type { Activity } from "../types";
import CalorieDisplay from "./CalorieDisplay";


type CalorieTrackerProps = {
    activities: Activity[];
}

export default function CalorieTracker({ activities }:CalorieTrackerProps ) {

    const totalCalories = ( category:Activity['category'] ) => {
        return activities.reduce(( total, activity ) => activity.category === category ? total + activity.calories : total, 0);
    }

    // Contadores
    const caloriesConsumed  = useMemo(() => totalCalories(1), [activities]);
    const caloriesBurned    = useMemo(() => totalCalories(2), [activities]);
    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [ activities ])

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">
                Resumen de Calorías
            </h2>

            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">

                <CalorieDisplay calories={ caloriesConsumed } text="Consumidas" />
                <CalorieDisplay calories={ caloriesBurned } text="Quemadas" />
                <CalorieDisplay calories={ netCalories } text="Diferencia" />

            </div>

        </>
    )
}
