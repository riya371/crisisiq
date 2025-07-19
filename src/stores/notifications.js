import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notifications", {
  state: () => ({
    notifications: [],
    current: null,
    maxNotifications: 5,
  }),

  getters: {
    hasNotifications: (state) => state.notifications.length > 0,
    unreadCount: (state) => state.notifications.filter((n) => !n.read).length,
    recentNotifications: (state) => state.notifications.slice(0, 10),
  },

  actions: {
    // Show a notification
    showNotification(notification) {
      const id = Date.now() + Math.random();
      const newNotification = {
        id,
        type: notification.type || "info",
        title: notification.title || "",
        message: notification.message || "",
        duration: notification.duration || 5000,
        persistent: notification.persistent || false,
        timestamp: new Date(),
        read: false,
        ...notification,
      };

      // Add to notifications list
      this.notifications.unshift(newNotification);

      // Keep only max notifications
      if (this.notifications.length > this.maxNotifications) {
        this.notifications = this.notifications.slice(0, this.maxNotifications);
      }

      // Set as current notification for toast display
      this.current = newNotification;

      // Auto-dismiss if not persistent
      if (!newNotification.persistent && newNotification.duration > 0) {
        setTimeout(() => {
          this.dismissNotification(id);
        }, newNotification.duration);
      }

      return id;
    },

    // Show success notification
    showSuccess(message, options = {}) {
      return this.showNotification({
        type: "success",
        message,
        ...options,
      });
    },

    // Show error notification
    showError(message, options = {}) {
      return this.showNotification({
        type: "error",
        message,
        persistent: true, // Errors should be persistent by default
        ...options,
      });
    },

    // Show warning notification
    showWarning(message, options = {}) {
      return this.showNotification({
        type: "warning",
        message,
        duration: 8000, // Warnings should stay longer
        ...options,
      });
    },

    // Show info notification
    showInfo(message, options = {}) {
      return this.showNotification({
        type: "info",
        message,
        ...options,
      });
    },

    // Dismiss a specific notification
    dismissNotification(id) {
      const index = this.notifications.findIndex((n) => n.id === id);
      if (index > -1) {
        this.notifications.splice(index, 1);
      }

      // Clear current if it's the dismissed notification
      if (this.current && this.current.id === id) {
        this.current = null;
      }
    },

    // Clear current notification (for toast)
    clearNotification() {
      this.current = null;
    },

    // Mark notification as read
    markAsRead(id) {
      const notification = this.notifications.find((n) => n.id === id);
      if (notification) {
        notification.read = true;
      }
    },

    // Mark all notifications as read
    markAllAsRead() {
      this.notifications.forEach((n) => {
        n.read = true;
      });
    },

    // Clear all notifications
    clearAll() {
      this.notifications = [];
      this.current = null;
    },

    // Remove old notifications (older than specified days)
    cleanupOld(days = 7) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);

      this.notifications = this.notifications.filter(
        (n) => n.timestamp > cutoffDate
      );
    },

    // Demo functions for static prototype
    showDemoNotifications() {
      // Show some demo notifications for the prototype
      setTimeout(() => {
        this.showInfo("Welcome to CrisisIQ Demo", {
          title: "Demo Mode",
          duration: 4000,
        });
      }, 1000);

      setTimeout(() => {
        this.showSuccess("All systems operational", {
          title: "System Status",
          duration: 3000,
        });
      }, 3000);
    },

    // Handle browser notifications (if permission granted)
    async requestNotificationPermission() {
      if ("Notification" in window) {
        const permission = await Notification.requestPermission();
        return permission === "granted";
      }
      return false;
    },

    // Show browser notification
    showBrowserNotification(notification) {
      if ("Notification" in window && Notification.permission === "granted") {
        const browserNotification = new Notification(
          notification.title || "CrisisIQ",
          {
            body: notification.message,
            icon: "/favicon.ico",
            badge: "/favicon.ico",
            tag: notification.id,
            requireInteraction: notification.persistent,
          }
        );

        browserNotification.onclick = () => {
          window.focus();
          browserNotification.close();
        };

        // Auto-close after duration
        if (!notification.persistent && notification.duration > 0) {
          setTimeout(() => {
            browserNotification.close();
          }, notification.duration);
        }
      }
    },
  },
});
