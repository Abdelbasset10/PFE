import React from "react";
import { Pie } from "react-chartjs-2";

    function PieChart({ chartData }) {
    return (
        <div className="flex-[1] w-[15rem] h-[15rem]  sm:w-[20rem] sm:h-[20rem]">
        <Pie
            data={chartData}
            options={{
            plugins: {
                title: {
                display: true,
                text: "Répartition des étudiants en binômes et monômes"
                }
            }
            }}
        />
        </div>
    );
}
export default PieChart;