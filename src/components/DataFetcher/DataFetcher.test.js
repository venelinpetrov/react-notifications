import React from 'react';
import { DataFetcher } from './DataFetcher';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

const DataService = {
    fetch: () => Promise.resolve([])
}

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

it('renders welcome message', () => {
    act(() => {
        ReactDOM.render(
            <DataFetcher injector={{ DataService }}/>, container
        );
    });
    const label = container.querySelector('.loading');
    expect(label).toBeInTheDocument();
});
