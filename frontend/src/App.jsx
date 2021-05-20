import "./assets/App.scss";

import axios from "axios";
import React, { useEffect, useState } from "react";

import Chart from "./components/Chart";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [data, setData] = useState([]);
  const [campaignsList, setCampaignsList] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  const baseDataUrl = "http://localhost:8000/api/data/";
  const baseCampaignUrl = "http://localhost:8000/api/campaign/";

  const getData = async (url, params) => {
    const response = await axios.get(url, { params });
    return response.data.results;
  };

  /**
   * Workaround for replacing '+' with '%20' by axios.
   * Axios was replacing spaces with '+' which was not read
   * correctly by DRF api.
   * @param {string} url - base api url
   * @returns {string} - final url for axios request
   */
  const fetchUrl = (url) => {
    let finalUrl = url;
    if (pageSize) {
      finalUrl = `${finalUrl}?page_size=${pageSize}`;
    }
    if (dataSource.length) {
      finalUrl = `${finalUrl}&datasource__in=${dataSource.join(",")}`;
    }
    if (campaigns.length) {
      finalUrl = `${finalUrl}&campaign__in=${campaigns}`;
    }
    return finalUrl;
  };

  useEffect(() => {
    async function fetchData() {
      const url = fetchUrl(baseDataUrl);
      setData(await getData(url));
      if (!campaigns.length) {
        setCampaignsList(await getData(baseCampaignUrl));
      }
    }
    fetchData();
  }, []);

  const onSelectDataSource = (event) => {
    const dataSourceValues = event.map((item) => item.value);
    setDataSource(dataSourceValues);
  };

  const onSelectCampaign = (event) => {
    const campaignsValues = event.map((campaign) => campaign.value);
    setCampaigns(campaignsValues);
  };

  const onPageSizeChange = (event) => {
    const pageSizeValue = event.target.value;
    setPageSize(pageSizeValue);
  };

  const onButtonClick = async () => {
    const url = fetchUrl(baseDataUrl);
    setData(await getData(url));
  };

  return (
    <div className="App">
      <Sidebar
        campaignsList={campaignsList}
        onSelectDataSource={onSelectDataSource}
        onSelectCampaign={onSelectCampaign}
        onButtonClick={onButtonClick}
        onPageSizeChange={onPageSizeChange}
      />
      <Chart data={data} />
    </div>
  );
};

export default App;
