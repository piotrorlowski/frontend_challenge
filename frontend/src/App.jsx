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

  /**
   * Function fot getting data from API.
   * @param {string} url - api endpoint url
   * @returns {Promise} - returns axios promise
   */
  const getData = async (url) => {
    const response = await axios.get(url);
    return response.data.results;
  };

  /**
   * Workaround for replacing '+' with '%20' by axios.
   * Axios was replacing spaces with '+' which was not read
   * correctly by DRF api. This function creates url for fetching
   * data by appending strings with dynamic values.
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

  /**
   * useEffect react hook for performing side effects
   * in function components.
   */
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

  /**
   * Handler function for 'datasource' select element.
   * Updates dataSource with the values picked by the user in Sidebar.
   */
  const onSelectDataSource = (event) => {
    const dataSourceValues = event.map((item) => item.value);
    setDataSource(dataSourceValues);
  };

  /**
   * Handler function for 'campaign' select element.
   * Updates campaigns with the values picked by the user in Sidebar.
   */
  const onSelectCampaign = (event) => {
    const campaignsValues = event.map((campaign) => campaign.value);
    // Exclude 'All' from saving into campaignValues state.
    // 'All' value fetches all results as it's value is an empty string.
    if (!(campaignsValues.length === 1 && campaignsValues[0] === "")) {
      setCampaigns(campaignsValues);
    }
  };

  /**
   * Handler function for 'page size' select element.
   * Updates pageSize with the values picked by the user in Sidebar.
   */
  const onPageSizeChange = (event) => {
    const pageSizeValue = event.target.value;
    setPageSize(pageSizeValue);
  };

  /**
   * Handler function for sidebar button.
   * Responsible for sending request to endpoint with applied parameters.
   */
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
