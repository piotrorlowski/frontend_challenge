import React, { useEffect, useState } from 'react';
import Chart from './components/Chart';
import Sidebar from './components/Sidebar';
import './assets/App.scss';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  const baseDataUrl = 'http://localhost:8000/api/data/';
  const baseCampaignUrl = 'http://localhost:8000/api/campaign/';

  const getData = async (url, params) => {
    const response = await axios.get(url, { params });
    return response.data.results;
  };

  useEffect(() => {
    async function fetchData() {
      const params = { datasource_in: 'Facebook Ads,Google Adwords', page_size: "30" };
      setData(await getData(baseDataUrl, params));
      setCampaigns( await getData(baseCampaignUrl));
    }
    fetchData();
    return () => { };
  }, [])

  return (
    <div className="App">
        <Sidebar campaigns={campaigns} />
        <Chart data={data} />
    </div>
  );
};

export default App;
