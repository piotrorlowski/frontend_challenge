import React from 'react';
import Select from 'react-select'
import '../assets/Sidebar.scss';

const Sidebar = (props) => {
    const dataSourceOptions = [
        {value: 'Google Adwords', label: 'Google Adwords'},
        {value: 'Google Analytics', label: 'Google Analytics'},
        {value: 'Facebook Ads', label: 'Facebook Ads'},
        {value: 'Mailchimp', label: 'Mailchimp'},
    ];

    const campaignDefaultValue = [
        { value: '', label: 'All' },
    ];

    const defaultPageSize = 10;

    const campaignOptions = props.campaigns.map(campaign => {
        return { value: campaign.name, label: campaign.name };
    });

    return (
        <div className="Sidebar">
            <h2 className="Sidebar-title">Filter dimension values</h2>
            <div className="Sidebar-filtersContainer">
                <div className="Sidebar-selectContainer">
                    <h3 className="Sidebar-selectLabel">Datasource</h3>
                    <Select isMulti className="Sidebar-select" options={dataSourceOptions} />
                    <h3 className="Sidebar-selectLabel">Campaign</h3>
                    <Select className="Sidebar-select" options={campaignOptions} defaultValue={campaignDefaultValue}/>
                    <h3 className="Sidebar-selectLabel">Page size</h3>
                    <input className="Sidebar-input" type="number" defaultValue={defaultPageSize}/>
                </div>
                <button className="Sidebar-button">Apply</button>
            </div>
        </div>
    );
};

export default Sidebar;