class NotificationService {
    constructor(io) {
        this.io = io;
    }

    sendNotification(message) {
        this.io.emit('notification', message);
    }
}

module.exports = NotificationService;
