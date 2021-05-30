import "./assets/App.scss";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import Chart from "./components/Chart";
import Sidebar from "./components/Sidebar";

const App = () => {
  const baseDataUrl = "http://localhost:8000/api/data/";
  const baseCampaignUrl = "http://localhost:8000/api/campaign/";

  const [data, setData] = useState([]);
  const [campaignsList, setCampaignsList] = useState([]);
  const [dataSources, setDataSources] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [errorMsg, setErrorMsg] = useState("");
  const [dataUrl, setDataUrl] = useState(baseDataUrl);

  const latestBaseDataUrl = useRef(dataUrl);

  /**
   * Function for detecting url change.
   * @param {string} prevUrl - prevUrl
   * @param {string} nextUrl - nextUrl
   * @returns {boolean} - true if urls are different
   */
  const areUrlsDifferent = (prevUrl, nextUrl) => prevUrl !== nextUrl;

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
    const fetchedUrl = [url];
    if (pageSize) {
      fetchedUrl.push(`?page_size=${pageSize}`);
    }
    if (dataSources.length) {
      fetchedUrl.push(`&datasource__in=${dataSources}`);
    }
    if (campaigns.length) {
      fetchedUrl.push(`&campaign__in=${campaigns}`);
    }
    return fetchedUrl.join("");
  };

  /**
   * useEffect react hook for performing side effects
   * in function components.
   */
  useEffect(() => {
    async function fetchData() {
      if (
        !data.length ||
        areUrlsDifferent(latestBaseDataUrl.current, dataUrl)
      ) {
        setData(await getData(dataUrl));
      }
      if (!campaignsList.length) {
        setCampaignsList(await getData(baseCampaignUrl));
      }
    }
    fetchData();
  }, [dataUrl]);

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
    const campaignsValues = event
      .map((campaign) => campaign.value)
      .filter((value) => value);
    setCampaigns(campaignsValues);
  };

  /**
   * Handler function for 'page size' select element.
   * Updates pageSize with the values picked by the user in Sidebar.
   */
  const onPageSizeChange = (event) => {
    const pageSizeValue = event.target.value;
    const errorMessage =
      pageSizeValue > 100 || pageSizeValue <= 0
        ? "Page size has to be bigger than 0 and lower/equal to 100."
        : "";
    setErrorMsg(errorMessage);
    setPageSize(pageSizeValue);
  };

  /**
   * Handler function for sidebar button.
   * Responsible for setting url with new params.
   * When a new url is created, request is sent to fetch new data.
   * Sending request for new data is handled by useEffect.
   */
  const onButtonClick = async () => {
    latestBaseDataUrl.current = dataUrl;
    setDataUrl(fetchUrl(baseDataUrl));
  };

  return (
    <div className="App">
      <Sidebar
        errorMsg={errorMsg}
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
