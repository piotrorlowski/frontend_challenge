import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const Chart = (props) => {
    const renderLineChart = (
        <LineChart width={1000} height={500} data={props.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="clicks" stroke="#8884d8" />
        <Line type="monotone" dataKey="impressions" stroke="#82ca9d" />
        </LineChart>
    );
    
    return (
        <div>
            {renderLineChart}
        </div>
    );
};

export default Chart;