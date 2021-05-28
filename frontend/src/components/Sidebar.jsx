import "../assets/Sidebar.scss";

import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";

const Sidebar = (props) => {
  const {
    errorMsg,
    campaignsList,
    onSelectDataSource,
    onSelectCampaign,
    onPageSizeChange,
    onButtonClick,
  } = props;

  const dataSourceOptions = [
    { value: "Google Adwords", label: "Google Adwords" },
    { value: "Google Analytics", label: "Google Analytics" },
    { value: "Facebook Ads", label: "Facebook Ads" },
    { value: "Mailchimp", label: "Mailchimp" },
  ];

  const campaignDefaultValue = { value: "", label: "All" };

  const defaultPageSize = 10;

  const campaignOptions = campaignsList.map((campaign) => ({
    value: campaign.name,
    label: campaign.name,
  }));

  /**
   * Function for filtering 'campaign' options results.
   * @param {string} inputValue - value picked by user in select component
   */
  const filterOptions = (inputValue) =>
    campaignOptions.filter((item) =>
      item.label.toLowerCase().includes(inputValue.toLowerCase())
    );

  /**
   * Function for loading filtered 'campaign' results
   * into searchable select component.
   * @param {string} inputValue - value picked by user in select component
   * @param {Function} callback - callback function
   */
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
          <Select
            isMulti
            className="Sidebar-select"
            options={dataSourceOptions}
            onChange={onSelectDataSource}
          />
          <h3 className="Sidebar-selectLabel">Campaign</h3>
          <AsyncSelect
            isMulti
            className="Sidebar-select"
            loadOptions={loadOptions}
            defaultValue={campaignDefaultValue}
            defaultOptions={[campaignDefaultValue]}
            onChange={onSelectCampaign}
          />
          <h3 className="Sidebar-selectLabel">Page size (min 1, max 100)</h3>
          <input
            className="Sidebar-input"
            type="number"
            defaultValue={defaultPageSize}
            onChange={onPageSizeChange}
          />
          <p className="SideBar-error">{errorMsg}</p>
        </div>
        <button
          type="button"
          disabled={!!errorMsg}
          className="Sidebar-button"
          onClick={onButtonClick}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  campaignsList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
  errorMsg: PropTypes.string,
  onSelectDataSource: PropTypes.func,
  onSelectCampaign: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  onButtonClick: PropTypes.func,
};

Sidebar.defaultProps = {
  campaignsList: [],
  errorMsg: "",
  onSelectDataSource: () => {},
  onSelectCampaign: () => {},
  onPageSizeChange: () => {},
  onButtonClick: () => {},
};

export default Sidebar;
