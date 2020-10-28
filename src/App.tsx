import React from 'react';

// child components
import AppleStockAreaChart from './components/AppleStockAreaChart';

// styles
import './app.css';

function App() {
  return (
    <div className="app">
      <h1 className="app-title">Visx Area Chart</h1>
      <AppleStockAreaChart />
    </div>
  );
}

export default App;
