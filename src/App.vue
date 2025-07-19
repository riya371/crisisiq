<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "./stores/auth";
import { useNotificationStore } from "./stores/notifications";

const router = useRouter();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();

// Reactive data
const mobileMenuOpen = ref(false);
const userMenuOpen = ref(false);
const isLoading = ref(false);
const emergencyAlert = ref(null);
const notification = ref(null);
const unreadMessages = ref(3); // Static demo value

// Computed properties
const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);
const userRole = computed(() => authStore.user?.role);

// Methods
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value;
};

const logout = async () => {
  try {
    await authStore.logout();
    router.push("/login");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

const dismissAlert = () => {
  emergencyAlert.value = null;
};

const dismissNotification = () => {
  notificationStore.clearNotification();
  notification.value = null;
};

const getNotificationIcon = (type) => {
  switch (type) {
    case "success":
      return "✅";
    case "error":
      return "❌";
    case "warning":
      return "⚠️";
    case "info":
      return "ℹ️";
    default:
      return "ℹ️";
  }
};

// Demo function to simulate emergency alert
const showDemoEmergencyAlert = () => {
  emergencyAlert.value = {
    id: Date.now(),
    message:
      "Flash flood warning in downtown area. Evacuate immediately to higher ground.",
    type: "emergency",
    timestamp: new Date(),
  };

  // Auto-dismiss after 30 seconds
  setTimeout(() => {
    emergencyAlert.value = null;
  }, 30000);
};

// Demo function for role switching
const switchUserRole = (role) => {
  authStore.switchToRole(role);
  notificationStore.showSuccess(`Switched to ${role} view`, {
    title: "Demo Mode",
    duration: 2000,
  });
};

// Lifecycle hooks
onMounted(async () => {
  // Start in authenticated state for demo
  if (!authStore.isAuthenticated) {
    // Default to admin role for demo
    authStore.switchToRole("admin");
  }

  // Show demo notifications
  notificationStore.showDemoNotifications();

  // Demo emergency alert after 10 seconds
  setTimeout(showDemoEmergencyAlert, 10000);

  // Set up reactive notification display
  const setupNotificationWatcher = () => {
    notificationStore.$subscribe((mutation, state) => {
      if (state.current && state.current !== notification.value) {
        notification.value = state.current;

        // Auto-dismiss if not persistent
        if (!state.current.persistent && state.current.duration > 0) {
          setTimeout(() => {
            if (
              notification.value &&
              notification.value.id === state.current.id
            ) {
              dismissNotification();
            }
          }, state.current.duration);
        }
      } else if (!state.current) {
        notification.value = null;
      }
    });
  };

  setupNotificationWatcher();

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-dropdown")) {
      userMenuOpen.value = false;
    }
    if (
      !e.target.closest(".mobile-menu-btn") &&
      !e.target.closest(".nav-menu")
    ) {
      mobileMenuOpen.value = false;
    }
  });
});
</script>

<template>
  <div id="app">
    <!-- Demo Role Switcher (for prototype demonstration) -->
    <div v-if="isAuthenticated" class="demo-controls">
      <div class="demo-switcher">
        <span class="demo-label">Demo Role:</span>
        <button
          v-for="role in ['admin', 'coordinator', 'volunteer', 'citizen']"
          :key="role"
          @click="switchUserRole(role)"
          :class="['demo-btn', { active: userRole === role }]"
        >
          {{ role }}
        </button>
      </div>
    </div>

    <!-- Navigation Header -->
    <nav class="navbar" v-if="isAuthenticated">
      <div class="nav-container">
        <div class="nav-brand">
          <h2>🚨 CrisisIQ</h2>
        </div>

        <div class="nav-menu" :class="{ active: mobileMenuOpen }">
          <router-link to="/dashboard" class="nav-link">
            <i class="icon">📊</i> Dashboard
          </router-link>

          <router-link to="/incidents" class="nav-link">
            <i class="icon">🚨</i> Incidents
          </router-link>

          <router-link to="/map" class="nav-link">
            <i class="icon">🗺️</i> Map
          </router-link>

          <router-link
            to="/resources"
            class="nav-link"
            v-if="userRole !== 'citizen'"
          >
            <i class="icon">📦</i> Resources
          </router-link>

          <router-link to="/shelters" class="nav-link">
            <i class="icon">🏠</i> Shelters
          </router-link>

          <router-link
            to="/tasks"
            class="nav-link"
            v-if="
              userRole === 'volunteer' ||
              userRole === 'coordinator' ||
              userRole === 'admin'
            "
          >
            <i class="icon">✅</i> Tasks
          </router-link>

          <router-link to="/messages" class="nav-link">
            <i class="icon">💬</i> Messages
            <span v-if="unreadMessages > 0" class="badge">{{
              unreadMessages
            }}</span>
          </router-link>

          <div class="nav-dropdown">
            <button class="nav-link dropdown-toggle" @click="toggleUserMenu">
              <i class="icon">👤</i> {{ user?.firstName || "User" }}
              <span class="dropdown-arrow">▼</span>
            </button>
            <div class="dropdown-menu" v-if="userMenuOpen">
              <div class="user-info">
                <div class="user-avatar">
                  {{ user?.firstName?.[0] }}{{ user?.lastName?.[0] }}
                </div>
                <div class="user-details">
                  <div class="user-name">
                    {{ user?.firstName }} {{ user?.lastName }}
                  </div>
                  <div class="user-role">{{ user?.role }}</div>
                </div>
              </div>
              <div class="dropdown-divider"></div>
              <router-link to="/profile" class="dropdown-item">
                <i class="icon">👤</i> Profile
              </router-link>
              <router-link to="/settings" class="dropdown-item">
                <i class="icon">⚙️</i> Settings
              </router-link>
              <div class="dropdown-divider"></div>
              <button @click="logout" class="dropdown-item logout-btn">
                <i class="icon">🚪</i> Logout
              </button>
            </div>
          </div>
        </div>

        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>

    <!-- Emergency Alert Banner -->
    <div v-if="emergencyAlert" class="emergency-alert">
      <div class="alert-content">
        <i class="alert-icon">🚨</i>
        <div class="alert-text">
          <strong>EMERGENCY ALERT:</strong> {{ emergencyAlert.message }}
        </div>
        <button @click="dismissAlert" class="alert-close">×</button>
      </div>
    </div>

    <!-- Main Content -->
    <main class="main-content" :class="{ 'no-nav': !isAuthenticated }">
      <router-view />
    </main>

    <!-- Loading Overlay -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>Loading...</p>
      </div>
    </div>

    <!-- Notification Toast -->
    <div
      v-if="notification"
      class="notification-toast"
      :class="notification.type"
    >
      <div class="toast-content">
        <i class="toast-icon">{{ getNotificationIcon(notification.type) }}</i>
        <div class="toast-text">
          <div v-if="notification.title" class="toast-title">
            {{ notification.title }}
          </div>
          <div class="toast-message">{{ notification.message }}</div>
        </div>
        <button @click="dismissNotification" class="toast-close">×</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
}

/* Demo Controls */
.demo-controls {
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 0.5rem 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  text-align: center;
}

.demo-switcher {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.demo-label {
  font-weight: 600;
  font-size: 0.9rem;
}

.demo-btn {
  padding: 0.25rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  text-transform: capitalize;
  transition: all 0.2s ease;
}

.demo-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.demo-btn.active {
  background: #667eea;
  border-color: #667eea;
}

/* Navigation Styles */
.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 40px; /* Account for demo controls */
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.nav-brand h2 {
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 700;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #2c3e50;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  font-weight: 500;
}

.nav-link:hover {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.nav-link.router-link-active {
  background: #667eea;
  color: white;
}

.icon {
  font-size: 1.2rem;
}

.badge {
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  min-width: 1.5rem;
  text-align: center;
}

/* Dropdown Styles */
.nav-dropdown {
  position: relative;
}

.dropdown-toggle {
  background: none;
  border: none;
  cursor: pointer;
}

.dropdown-arrow {
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  min-width: 220px;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  z-index: 1000;
}

.user-info {
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: #667eea;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.1rem;
}

.user-details {
  flex: 1;
}

.user-name {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.user-role {
  font-size: 0.85rem;
  color: #666;
  text-transform: capitalize;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #2c3e50;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.dropdown-item:hover {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.dropdown-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 0.5rem 0;
}

.logout-btn {
  color: #e74c3c;
}

.logout-btn:hover {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

/* Mobile Menu */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.mobile-menu-btn span {
  width: 25px;
  height: 3px;
  background: #2c3e50;
  margin: 3px 0;
  transition: 0.3s;
}

/* Emergency Alert */
.emergency-alert {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  padding: 1rem;
  animation: pulse 2s infinite;
  margin-top: 40px; /* Account for demo controls */
}

.alert-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.alert-icon {
  font-size: 1.5rem;
  animation: bounce 1s infinite;
}

.alert-text {
  flex: 1;
}

.alert-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
}

/* Main Content */
.main-content {
  min-height: calc(100vh - 110px); /* Account for navbar + demo controls */
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.main-content.no-nav {
  min-height: calc(100vh - 40px); /* Only demo controls */
  padding: 0;
  background: none;
}

/* Loading Overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-spinner {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

/* Notification Toast */
.notification-toast {
  position: fixed;
  top: 130px; /* Account for navbar + demo controls */
  right: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  min-width: 300px;
  max-width: 400px;
  animation: slideIn 0.3s ease;
}

.notification-toast.success {
  border-left: 4px solid #27ae60;
}

.notification-toast.error {
  border-left: 4px solid #e74c3c;
}

.notification-toast.warning {
  border-left: 4px solid #f39c12;
}

.notification-toast.info {
  border-left: 4px solid #3498db;
}

.toast-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
}

.toast-text {
  flex: 1;
  min-width: 0;
}

.toast-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #2c3e50;
}

.toast-message {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
  word-wrap: break-word;
}

.toast-icon {
  font-size: 1.2rem;
}

.toast-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #7f8c8d;
  margin-left: auto;
}

/* Animations */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    top: 110px; /* Account for navbar + demo controls */
    left: -100%;
    width: 100%;
    height: calc(100vh - 110px);
    background: white;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
    transition: left 0.3s ease;
    gap: 1rem;
  }

  .nav-menu.active {
    left: 0;
  }

  .nav-link {
    width: 100%;
    justify-content: flex-start;
  }

  .main-content {
    padding: 1rem;
  }

  .notification-toast {
    right: 10px;
    left: 10px;
    top: 120px;
  }

  .demo-switcher {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .demo-btn {
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
  }
}
</style>
