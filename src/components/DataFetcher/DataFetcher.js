import React, { useState, useEffect } from 'react';
import { EventBus, DataService, withInjector } from '../../services';
import './DataFetcher.css';

let n = 0;


const DataFetcherComponent = ({ injector }) => {
    const dataService = injector.get(DataService);
    const eventBus = injector.get(EventBus);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const fetchData = () => {
        setLoading(true);
        dataService.fetch().then(newData => {
            setData(newData);
            setLoading(false);
            eventBus.trigger('notification', { text: `notification ${n += 1}`});
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="data-fetcher">
            {loading ? (
                <div className="loading">loading...</div>
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

const DataFetcher = withInjector(DataFetcherComponent, [DataService, EventBus]);

export { DataFetcher };
