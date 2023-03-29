import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from "react-chartjs-2";
import theme from '../theme';

  ChartJS.defaults.font.family = theme.fonts.main
  ChartJS.defaults.font.size = theme.fontSizes.subheading
  ChartJS.defaults.scale.grid.drawOnChartArea = false
  ChartJS.defaults.elements.point.pointStyle = 'circle'
  ChartJS.defaults.elements.line.tension = 0.3
  ChartJS.defaults.color = theme.colors.copiedRightText
  ChartJS.defaults.elements.line.borderWidth = 4


function LineChart({ chartData }) {


  return (
    <div className="chart-container">
      <Line
        data={chartData}
        options={
            {
            elements: {
              point:{
                backgroundColor: theme.colors.copiedRightText,
                borderColor: theme.colors.copiedRightText,
                hoverBorderWidth: 8,
              },
              line: {
                backgroundColor: theme.colors.toCopyText,
                borderColor: theme.colors.toCopyText,
              
              },
            },
            plugins: {
              title: {
                display: false,
                text: "Statistics of the game"
              },
              legend: {
                display: false
              }
            }
          }
        }
      />
    </div>
  );

}

export default LineChart;