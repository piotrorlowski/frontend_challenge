import "./assets/App.scss";

import axios from "axios";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { ActionMeta, OptionsType } from "react-select";

import Chart from "./components/Chart";
import Sidebar from "./components/Sidebar";
import { Campaign, SelectOption } from "./types/types";

const App: React.FC = (): ReactElement => {
  const baseDataUrl = "http://localhost:8000/api/data/";
  const baseCampaignUrl = "http://localhost:8000/api/campaign/";

  const [data, setData] = useState([]);
  const [campaignsList, setCampaignsList] = useState<Campaign[]>([]);
  const [dataSources, setDataSources] = useState<string[]>([]);
  const [campaigns, setCampaigns] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [dataUrl, setDataUrl] = useState<string>(baseDataUrl);

  const latestBaseDataUrl = useRef(dataUrl);

  /**
   * Function for detecting url change.
   */
  const areUrlsDifferent = (prevUrl: string, nextUrl: string): boolean =>
    prevUrl !== nextUrl;

  /**
   * Function for getting data from API.
   */
  const getData = async (url: string): Promise<[]> => {
    const response = await axios.get(url);
    return response.data.results;
  };

  /**
   * Workaround for replacing '+' with '%20' by axios.
   * Axios was replacing spaces with '+' which was not read
   * correctly by DRF api. This function creates url for fetching
   * data by appending strings with dynamic values.
   */
  const fetchUrl = (url: string): string => {
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
  const onSelectDataSource = (
    value: OptionsType<{
      value: string;
      label: string;
    }>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    actionMeta: ActionMeta<{
      value: string;
      label: string;
    }>
  ): void => {
    const dataSourceValues = value.map((item: SelectOption) => item.value);
    setDataSources(dataSourceValues);
  };

  /**
   * Handler function for 'campaign' select element.
   * Updates campaigns with the values picked by the user in Sidebar.
   */
  const onSelectCampaign = (
    value: OptionsType<{
      value: string;
      label: string;
    }>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    actionMeta: ActionMeta<{
      value: string;
      label: string;
    }>
  ): void => {
    const campaignsValues = value
      .map((item: SelectOption) => item.value)
      .filter((item: string) => item);
    setCampaigns(campaignsValues);
  };

  /**
   * Handler function for 'page size' input.
   * Updates pageSize with the value entered in input.
   */
  const onPageSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const pageSizeValue = parseInt(event.target.value, 10);
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
  const onButtonClick = async (): Promise<void> => {
    latestBaseDataUrl.current = dataUrl;
    setDataUrl(fetchUrl(baseDataUrl));
  };

  return (
    <div className="App">
      <Sidebar
        errorMsg={errorMsg}
        campaignsList={campaignsList as Campaign[]}
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
