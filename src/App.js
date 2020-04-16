import React from 'react';
import './App.css';
import { DataFetcher } from './components/DataFetcher/DataFetcher';
import { Notification } from './components/Notification/Notification';
function App() {
  return (
    <div className="app">
      <DataFetcher />
      <Notification />
    </div>
  );
}

export default App;
