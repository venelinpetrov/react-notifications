
import React from 'react';

export const withInjector = (Component, dependencies = []) => {
    const injector = {
        get: dep => dependencies.find(x => x === dep)
    };

    class HOC extends React.Component {
        render() {
            return (
                <Component
                    {...this.props}
                    injector={injector}
                />
            );
        }
    }

    return HOC;
};