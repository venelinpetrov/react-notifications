import React, { useState, useEffect } from 'react';
import { EventBus, DataService } from '../../services';
import './DataFetcher.css';

let n = 0;
export const DataFetcher = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const fetchData = () => {
        setLoading(true);
        DataService.fetch().then((newData) => {
            setData(newData);
            setLoading(false);
            EventBus.trigger('notification', { text: `notification ${n+=1}`});
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="data-fetcher">
            {loading ? (
                <div>loading...</div>
            ) : (
                <>
                    <button onClick={fetchData}>Fetch data</button>
                    <ul>
                        {
                            data.map(item => <li key={item.id}>{item.text}</li>)
                        }
                    </ul>
                </>
            )}
        </div>
    );
};
