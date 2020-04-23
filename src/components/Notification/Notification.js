import React, { useEffect, useState } from 'react';
import { EventBus, withInjector } from '../../services';

const NotificationComponent = ({ injector }) => {
    const eventBus = injector.get(EventBus);
    // Notice setNotification is used with its 'callback' form below. This is needed in order
    // to get the notification from the previous state and append the new notification to them.
    const [notifications, setNotifications] = useState([]);
    const cb = notification => {
        setNotifications(notifications => notifications.concat(notification));
    };
    const handleClose = notification => {
        setNotifications(notifications =>
            notifications.filter(n => notification !== n)
        );
    };

    useEffect(() => {
        eventBus.subscribe('notification', cb);

        return eventBus.unsubscribe.bind(null, 'notification', cb);
    }, []);

    return (
        <div>
            {notifications.map((notification, i) => {
                return <SingleNotification
                    key={i}
                    text={ notification.text }
                    onClose={() => handleClose(notification)} />
            })}
        </div>
    );
};

const SingleNotification = ({ text, timeout=5000, onClose }) => {
    // Auto-close
    const timeoutId = setTimeout(() => {
        onClose();
    }, timeout);

    // Manual close
    const handleCloseBtn = () => {
        clearTimeout(timeoutId);
        onClose();
    };
    return (
        <div>
            {text}
            <button onClick={handleCloseBtn}>X</button>
        </div>
    );
};

const Notification = withInjector(NotificationComponent, [EventBus]);

export { Notification };
