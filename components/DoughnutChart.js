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
    <div style={{ height: '20%', width: '40%' }}>
      <Doughnut
        data={cfg}
        width={null}
        height={null}
        options={{
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          cutout: '60%',
          plugins: {
            legend: {
              position: 'right',
              labels: {
                boxWidth: 10,
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
