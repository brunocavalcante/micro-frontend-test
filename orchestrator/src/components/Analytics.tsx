import React from 'react';

export const Analytics: React.FC = () => (
  <div className="orchestrator-page">
    <h2>Analytics Dashboard</h2>
    <p>Monitor performance metrics and workflow analytics.</p>
    <div className="analytics-grid">
      <div className="analytics-card">
        <h3>Workflow Performance</h3>
        <div className="chart-placeholder">
          <div className="bar-chart">
            <div className="bar" style={{ height: '60%' }}></div>
            <div className="bar" style={{ height: '80%' }}></div>
            <div className="bar" style={{ height: '45%' }}></div>
            <div className="bar" style={{ height: '90%' }}></div>
            <div className="bar" style={{ height: '70%' }}></div>
          </div>
        </div>
      </div>
      <div className="analytics-card">
        <h3>Success Rate</h3>
        <div className="metric-large">94.2%</div>
        <p className="metric-trend">+2.1% from last month</p>
      </div>
      <div className="analytics-card">
        <h3>Average Duration</h3>
        <div className="metric-large">4.7 min</div>
        <p className="metric-trend">-0.3 min from last month</p>
      </div>
    </div>
  </div>
); 