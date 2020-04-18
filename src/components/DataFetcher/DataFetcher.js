import React, { useState, useEffect, useContext } from 'react';
import { EventBus, ServiceInjector } from '../../services';
import './DataFetcher.css';

let n = 0;

export const DataFetcher = (props) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const { DataService } = useContext(ServiceInjector);
    console.log(props)
    const fetchData = () => {
        setLoading(true);
        DataService.fetch().then(newData => {
            setData(newData);
            setLoading(false);
            EventBus.trigger('notification', { text: `notification ${n += 1}`});
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
