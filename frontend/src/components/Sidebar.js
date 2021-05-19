import React, {useContext} from 'react';
import '../assets/Sidebar.scss';
import { DataContext } from '../context/DataContext';

const Sidebar = () => {
    const data = useContext(DataContext);

    const options = [
        {key: '1', value: 'Like Ads', text: 'Like Ads'}
    ];
    
    return (
        <div className="Sidebar">
            <h2 className="Sidebar-title">Filter values</h2>
            <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>
            <button>Filter results</button>
        </div>
    );
};

export default Sidebar;