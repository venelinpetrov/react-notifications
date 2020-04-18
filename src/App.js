import React from 'react';
import './App.css';
import { DataFetcher } from './components/DataFetcher/DataFetcher';
import { Notification } from './components/Notification/Notification';
import { ServiceInjector, DataService } from './services';

const services = {
  DataService
};

function App() {

  return (
    <div className="app">
      <ServiceInjector.Provider value={services}>
        <DataFetcher />
        <Notification />
      </ServiceInjector.Provider>
    </div>
  );
}

export default App;
