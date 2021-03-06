import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 4
  };
  if (!notification.show) return '';

  return (
    <div style={{ ...style, borderColor: notification.borderColor }}>
      {notification.message}
    </div>
  );
};

export default Notification;
