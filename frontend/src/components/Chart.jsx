import "../assets/Chart.scss";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import PropTypes, { string } from "prop-types";
import React from "react";

const Chart = (props) => {
  const { data, dataSources, campaigns } = props;

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

  const chosenCampaigns = campaigns.length ? campaigns.join(", ") : "All";

  const chosenDataSources = dataSources.length ? dataSources.join(", ") : "All";

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
      tickInterval: 3,
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

Chart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: string,
      datasource: string,
      campaign: string,
      clicks: string,
      impressions: string,
    })
  ),
  dataSources: PropTypes.arrayOf(string),
  campaigns: PropTypes.arrayOf(string),
};

Chart.defaultProps = {
  data: [],
  dataSources: [],
  campaigns: [],
};

export default Chart;
