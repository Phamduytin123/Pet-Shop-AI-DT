import { notification } from "antd";

export const handlePrice = (price) => {
    return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

const showNotification = (type, message, description, duration = 3) => {
    notification[type]({
        message,
        description,
        duration,
    });
};

export const showSuccessNotification = (message, description) => {
    showNotification('success', message, description);
}

export const showErrorNotification = (message, description) => {
    showNotification('error', message, description);
}

export const showWarningNotification = (message, description) => {
    showNotification('warning', message, description);
}

export const showInfoNotification = (message, description) => {
    showNotification('info', message, description);
}