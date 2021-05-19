import React, { useEffect, useMemo, useState } from 'react';
import Chart from './components/Chart';
import Sidebar from './components/Sidebar';
import './assets/App.scss';
import { DataContext } from './context/DataContext';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);

  const providerValue = useMemo(() => ({data, setData}), [data, setData]);

  const baseUrl = 'http://localhost:8000/api/data/';

  const getData = async (params) => {
    const response = await axios.get(baseUrl, { params });
    setData(response.data.results);
  };

  useEffect(() => {
      getData({ campaign: 'Like Ads' });
  }, []);

  return (
    <div className="App">
      <DataContext.Provider value={providerValue}>
        <Sidebar />
        <Chart data={data} />
      </DataContext.Provider>
    </div>
  );
};

export default App;
