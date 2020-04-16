const r = () => Math.random();

export const DataService = {
    fetch: () => {
        return new Promise((resolve) => {
            const testData = Array(10).fill(null).map(() => ({ id: r(), text: `item ${r()}` }));
            setTimeout(() => {
                resolve(testData);
            }, 1000);
        }, () => { });
    }
};