import { Bar } from "react-chartjs-2";
export const BarChart = ({ chartData }) => {
  return (
    <div className="mt-8">
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Répartition des domaines de projets de fin d'études : un graphique en barres pour visualiser la distribution"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};