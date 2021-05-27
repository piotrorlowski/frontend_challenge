import "./assets/App.scss";

import axios from "axios";
import React, { useEffect, useState } from "react";

import Chart from "./components/Chart";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [data, setData] = useState([]);
  const [campaignsList, setCampaignsList] = useState([]);
  const [dataSources, setDataSources] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [error, setError] = useState("");

  const baseDataUrl = "http://localhost:8000/api/data/";
  const baseCampaignUrl = "http://localhost:8000/api/campaign/";

  /**
   * Function for getting data from the API.
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
   * @returns {string} - url for the axios request
   */
  const fetchUrl = (url) => {
    let fetchedUrl = url;
    if (pageSize) {
      fetchedUrl = `${fetchedUrl}?page_size=${pageSize}`;
    }
    if (dataSources.length) {
      fetchedUrl = `${fetchedUrl}&datasource__in=${dataSources}`;
    }
    if (campaigns.length) {
      fetchedUrl = `${fetchedUrl}&campaign__in=${campaigns}`;
    }
    return fetchedUrl;
  };

  /**
   * useEffect react hook for performing side effects
   * in function components.
   */
  useEffect(() => {
    async function fetchData() {
      if (!data.length) {
        const url = fetchUrl(baseDataUrl);
        setData(await getData(url));
      }
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
    setDataSources(dataSourceValues);
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
    if (pageSizeValue > 100 || pageSizeValue <= 0) {
      setError("Page size has to be bigger than 0 and lower/equal to 100.");
    } else {
      setError("");
    }
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
        error={error}
        campaignsList={campaignsList}
        onSelectDataSource={onSelectDataSource}
        onSelectCampaign={onSelectCampaign}
        onButtonClick={onButtonClick}
        onPageSizeChange={onPageSizeChange}
      />
      <Chart data={data} dataSources={dataSources} campaigns={campaigns} />
    </div>
  );
};

export default App;
