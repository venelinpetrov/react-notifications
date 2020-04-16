import React, { useEffect, useState } from 'react';
import { EventBus } from '../../services/EventBus';

export const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const cb = notification => {
        setNotifications(notifications => notifications.concat(notification));
    };
    const handleClose = (notification) => {
        setNotifications(notifications =>
            notifications.filter(n => notification !== n)
        );
    }

    useEffect(() => {
        EventBus.subscribe('notification', cb);

        return EventBus.unsubscribe.bind(null, 'notification', cb);
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
    setTimeout(() => {
        onClose();
    }, timeout);
    return <div>{text}</div>;
};