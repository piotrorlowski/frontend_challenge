import "../assets/Chart.scss";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as React from "react";

import { Data } from "../types/types";

type Props = {
  data: Data[];
  dataSources: string[];
  campaigns: string[];
};

const Chart = ({ data, dataSources, campaigns }: Props): React.ReactElement => {
  const clicks = data.map((item) => item.clicks);

  const impressions = data.map((item) => item.impressions);

  const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May.",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];

  const date = data.map((item) => {
    const dateObj = new Date(item.date);
    return `${dateObj.getDate()}. ${months[dateObj.getMonth()]}`;
  });

  const ALL = "All";

  const chosenCampaigns = campaigns.length ? campaigns.join(", ") : ALL;

  const chosenDataSources = dataSources.length ? dataSources.join(", ") : ALL;

  const chartTitle = `Datasources: ${chosenDataSources}; ${chosenCampaigns} Campaigns`;

  const options = {
    chart: {
      type: "line",
      height: "600",
    },
    title: {
      text: chartTitle,
    },
    xAxis: {
      type: "datetime",
      categories: date,
      tickInterval: 2,
    },
    yAxis: [
      {
        title: {
          text: "Clicks",
          type: "linear",
        },
      },
      {
        title: {
          text: "Impressions",
          type: "linear",
        },
        opposite: true,
      },
    ],
    series: [
      {
        yAxis: 0,
        name: "clicks",
        type: "line",
        data: clicks,
      },
      {
        yAxis: 1,
        name: "impressions",
        type: "line",
        data: impressions,
      },
    ],
  };

  return (
    <div className="Chart">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
