import React, { useState, useEffect } from 'react';
import { EventBus, DataService, withInjector } from '../../services';
import './DataFetcher.css';

let n = 0;


const Pure = (props) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    console.log(props.someProp)
    const fetchData = () => {
        setLoading(true);
        props.injector.get(DataService).fetch().then(newData => {
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

const DataFetcher = withInjector(Pure, [DataService]);

export { DataFetcher };
