import React from 'react';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';

function DoughnutChart({ goals, topics }) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const completedGoals = goals.filter((i) => i.progress === 100);
  const completedTopics = topics.filter((i) => i.completed === true);
  const cfg = {
    labels: ['All Topics', 'All Goals', 'Completed Topics', 'Completed Goals'],
    datasets: [
      {
        label: '# of Votes',
        data: [topics.length, goals.length, completedGoals.length, completedTopics.length],
        backgroundColor: [
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 159, 64, 0.4)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="chart-container">
      <Doughnut
        data={cfg}
        width={null}
        height={null}
        options={{
          cutout: '60%',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                boxWidth: 20,
              },
            },
          },
        }}
      />
    </div>
  );
}

export default DoughnutChart;

DoughnutChart.propTypes = {
  goals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ).isRequired,
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ).isRequired,
};
