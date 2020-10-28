import React from 'react';

// child components
import AppleStockAreaChart from './components/AppleStockAreaChart';

// styles
import './app.css';

function App() {
  return (
    <div className="app">
      <h1>Visx Area Chart</h1>
      <AppleStockAreaChart width={640} height={480} />
    </div>
  );
}

export default App;
