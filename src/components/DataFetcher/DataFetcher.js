import React, { useState } from 'react';
import './DataFetcher.css';

const testData = [{ id: 1, text: 'item1' }, { id: 2, text: 'item2' }];

const DataService = {
    fetch: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(testData);
            }, 1000);
        }, () => {});
    }
};

export const DataFetcher = () => {
    const [data, setData] = useState([{ id: 0, text: 'item0' }]);
    const fetchData = () => {
        DataService.fetch().then((newData) => setData([...data, ...newData]));
    };

    return (
        <div className="data-fetcher">
            <button onClick={fetchData}>Fetch data</button>
            <ul>
                {
                    data.map(item => <li key={item.id}>{item.text}</li>)
                }
            </ul>
        </div>
    );
};
