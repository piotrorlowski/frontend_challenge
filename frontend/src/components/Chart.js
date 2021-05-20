import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import '../assets/Chart.scss';

const Chart = (props) => {
    const renderLineChart = (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
            data={props.data}
            >
            <CartesianGrid horizontal vertical={false} />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" label={{ value: 'Clicks', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Impressions', angle: 90, position: 'insideRight' }} />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="linear" dataKey="clicks" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="linear" dataKey="impressions" stroke="#82ca9d"  />
            </LineChart>
      </ResponsiveContainer>
    );
    
    return (
        <div className="Chart">
            {renderLineChart}
        </div>
    );
};

export default Chart;