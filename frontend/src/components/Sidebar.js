import React from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import '../assets/Sidebar.scss';

const Sidebar = (props) => {
    const dataSourceOptions = [
        {value: 'Google Adwords', label: 'Google Adwords'},
        {value: 'Google Analytics', label: 'Google Analytics'},
        {value: 'Facebook Ads', label: 'Facebook Ads'},
        {value: 'Mailchimp', label: 'Mailchimp'},
    ];

    const campaignDefaultValue = { value: '', label: 'All' };

    const defaultPageSize = 10;

    const campaignOptions = props.campaignsList.map(campaign => {
        return { value: campaign.name, label: campaign.name };
    });

    const filterOptions = (inputValue) => {
        return campaignOptions.filter(item =>
            item.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const loadOptions = (inputValue, callback) => {
        setTimeout(() => {
          callback(filterOptions(inputValue));
        }, 1000);
    };

    campaignOptions.push(campaignDefaultValue);

    return (
        <div className="Sidebar">
            <h2 className="Sidebar-title">Filter dimension values</h2>
            <div className="Sidebar-filtersContainer">
                <div className="Sidebar-selectContainer">
                    <h3 className="Sidebar-selectLabel">Datasource</h3>
                    <Select isMulti className="Sidebar-select" options={dataSourceOptions} onChange={props.onSelectDataSource}/>
                    <h3 className="Sidebar-selectLabel">Campaign</h3>
                    <AsyncSelect isMulti className="Sidebar-select" loadOptions={loadOptions} defaultValue={campaignDefaultValue} defaultOptions={[campaignDefaultValue]} onChange={props.onSelectCampaign}/>
                    <h3 className="Sidebar-selectLabel">Page size</h3>
                    <input className="Sidebar-input" type="number" defaultValue={defaultPageSize} onChange={props.onPageSizeChange}/>
                </div>
                <button className="Sidebar-button" onClick={props.onButtonClick}>Apply</button>
            </div>
        </div>
    );
};

export default Sidebar;