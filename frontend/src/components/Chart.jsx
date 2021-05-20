import "../assets/Chart.scss";

import PropTypes, { string } from "prop-types";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Chart = (props) => {
  const { data } = props;

  const renderLineChart = (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid horizontal vertical={false} />
        <XAxis dataKey="date" />
        <YAxis
          yAxisId="left"
          label={{ value: "Clicks", angle: -90, position: "insideLeft" }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{ value: "Impressions", angle: 90, position: "insideRight" }}
        />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="linear"
          dataKey="clicks"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          yAxisId="right"
          type="linear"
          dataKey="impressions"
          stroke="#82ca9d"
        />
      </LineChart>
    </ResponsiveContainer>
  );

  return <div className="Chart">{renderLineChart}</div>;
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
};

Chart.defaultProps = {
  data: [],
};

export default Chart;
