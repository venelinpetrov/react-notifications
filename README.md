# Proposal

This sample project showcases 3 implementations

1. Notifications component
2. Event bus
3. Dependency injections (DI)

**NOTE:** APIs and naming are subject of change, but staying conformal with commonly used terminology is advisable.

## About the example app

This is a simple app that uses `DataFetcher` component to fetch some mock data and a `Notification` component that pops up when data is displayed to the user. `DataService` is the mock data service.

## Notifications component

This is an example of "singleton" component that is used/created only once (in the app root) and other components make calls to interact with it. These calls are mediated by a service, see below. Other examples of such components are e.g. Dialog windows, Confirm popups, Loggers, etc.

## Event bus

Some sort of inter-component comunication is needed. This implementation uses "Event bus" service. Another common option is to use streams and observables. This solves the "props drilling" problem.

**Usage:**

Subscribe to an event:

```jsx
// Subscribe to 'notification' event. 'cb' is a callback function to execute when the event occurs
eventBus.subscribe('notification', cb);
```

Fire event:

```jsx
// Payload is an arbitrary optional object to pass as an event argument
eventBus.trigger('notification', payload);
```

## Dependency injection

DI allows to decouple creation from instantiation. This removes the hard dependencies from components making them more reusable and actually testable.

See example tests in `DataFetcher.test.js`. As can be seen, it's fairly straightforward to provide mock objects for your dependencies through parameters.

**Usage:**

```jsx
// The first argument is the component to which you provide the dependency.
// The second argument is a list of dependencies, which are the actual tokens you import
const Notification = withInjector(Component, [EventBus]);
```

After doing so you will have the `injector` available inside `Component`

```jsx
const eventBus = injector.get(EventBus);
```