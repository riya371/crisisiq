<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Dashboard</h1>
      <p>Welcome back, {{ userName }}! Here's what's happening in your area.</p>
    </div>

    <!-- Quick Stats -->
    <div class="stats-grid">
      <div class="stat-card critical">
        <div class="stat-icon">🚨</div>
        <div class="stat-content">
          <h3>{{ stats.activeIncidents || 0 }}</h3>
          <p>Active Incidents</p>
        </div>
      </div>

      <div class="stat-card warning">
        <div class="stat-icon">👥</div>
        <div class="stat-content">
          <h3>{{ stats.activeVolunteers || 0 }}</h3>
          <p>Active Volunteers</p>
        </div>
      </div>

      <div class="stat-card info">
        <div class="stat-icon">🏠</div>
        <div class="stat-content">
          <h3>{{ stats.availableShelters || 0 }}</h3>
          <p>Available Shelters</p>
        </div>
      </div>

      <div class="stat-card success">
        <div class="stat-icon">📦</div>
        <div class="stat-content">
          <h3>{{ stats.resourcesAvailable || 0 }}</h3>
          <p>Resources Available</p>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="quick-actions">
      <h2>Quick Actions</h2>
      <div class="actions-grid">
        <button @click="reportIncident" class="action-btn emergency">
          <i class="action-icon">🚨</i>
          <span>Report Emergency</span>
        </button>

        <button @click="viewMap" class="action-btn primary">
          <i class="action-icon">🗺️</i>
          <span>View Map</span>
        </button>

        <button @click="findShelter" class="action-btn info">
          <i class="action-icon">🏠</i>
          <span>Find Shelter</span>
        </button>

        <button @click="sendMessage" class="action-btn secondary">
          <i class="action-icon">💬</i>
          <span>Send Message</span>
        </button>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="recent-activity">
      <h2>Recent Activity</h2>
      <div class="activity-list">
        <div v-if="recentIncidents.length === 0" class="no-activity">
          <p>No recent incidents in your area.</p>
        </div>

        <div
          v-for="incident in recentIncidents"
          :key="incident._id"
          class="activity-item"
          @click="viewIncident(incident._id)"
        >
          <div
            class="activity-icon"
            :class="getSeverityClass(incident.severity)"
          >
            {{ getIncidentIcon(incident.type) }}
          </div>
          <div class="activity-content">
            <h4>{{ incident.title }}</h4>
            <p>{{ incident.description.substring(0, 100) }}...</p>
            <div class="activity-meta">
              <span
                class="severity"
                :class="getSeverityClass(incident.severity)"
              >
                {{ incident.severity.toUpperCase() }}
              </span>
              <span class="time">{{ formatTime(incident.reportedAt) }}</span>
            </div>
          </div>
          <div class="activity-status" :class="incident.status">
            {{ incident.status.replace("_", " ").toUpperCase() }}
          </div>
        </div>
      </div>
    </div>

    <!-- Weather Alert (if applicable) -->
    <div v-if="weatherAlert" class="weather-alert">
      <div class="alert-header">
        <i class="alert-icon">🌪️</i>
        <h3>Weather Alert</h3>
      </div>
      <p>{{ weatherAlert.message }}</p>
      <button @click="dismissWeatherAlert" class="dismiss-btn">Dismiss</button>
    </div>

    <!-- Emergency Contacts -->
    <div class="emergency-contacts">
      <h2>Emergency Contacts</h2>
      <div class="contacts-grid">
        <div
          v-for="contact in emergencyContacts"
          :key="contact.id"
          class="contact-card"
        >
          <div class="contact-icon">{{ contact.icon }}</div>
          <h4>{{ contact.name }}</h4>
          <p class="contact-number">{{ contact.number }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useNotificationStore } from "../stores/notifications";
import { useMockDataStore } from "../stores/mockData";

const router = useRouter();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();
const mockDataStore = useMockDataStore();

// Reactive data
const isLoading = ref(false);

// Computed properties
const userName = computed(() => authStore.userName);
const stats = computed(() => mockDataStore.getDashboardStats);
const recentIncidents = computed(() =>
  mockDataStore.getActiveIncidents.slice(0, 3)
);
const weatherAlert = computed(() => mockDataStore.getActiveWeatherAlerts[0]);
const emergencyContacts = computed(() => mockDataStore.getEmergencyContacts);

// Methods
const loadDashboardData = async () => {
  isLoading.value = true;

  try {
    // Simulate loading delay for demo
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Data is already available from the mock store
    notificationStore.showSuccess("Dashboard data loaded successfully");
  } catch (error) {
    notificationStore.showError("Failed to load dashboard data");
    console.error("Dashboard load error:", error);
  } finally {
    isLoading.value = false;
  }
};

const reportIncident = () => {
  router.push("/incidents");
  notificationStore.showInfo(
    "Navigate to incidents page to report a new emergency"
  );
};

const viewMap = () => {
  router.push("/map");
};

const findShelter = () => {
  router.push("/shelters");
};

const sendMessage = () => {
  router.push("/messages");
};

const viewIncident = (incidentId) => {
  router.push(`/incidents/${incidentId}`);
};

const dismissWeatherAlert = () => {
  // In a real app, this would mark the alert as dismissed
  notificationStore.showInfo("Weather alert dismissed");
};

const getSeverityClass = (severity) => {
  const classes = {
    low: "success",
    medium: "warning",
    high: "danger",
    critical: "critical",
  };
  return classes[severity] || "info";
};

const getIncidentIcon = (type) => {
  const icons = {
    flood: "🌊",
    fire: "🔥",
    earthquake: "🌍",
    medical_emergency: "🚑",
    power_outage: "⚡",
    accident: "🚗",
    storm: "⛈️",
    other: "⚠️",
  };
  return icons[type] || "⚠️";
};

const formatTime = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m ago`;
  }
  return `${minutes}m ago`;
};

// Lifecycle
onMounted(() => {
  loadDashboardData();
});
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.dashboard-header p {
  color: #7f8c8d;
  font-size: 1.1rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 3rem;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-card.critical .stat-icon {
  background: rgba(231, 76, 60, 0.1);
}

.stat-card.warning .stat-icon {
  background: rgba(243, 156, 18, 0.1);
}

.stat-card.info .stat-icon {
  background: rgba(52, 152, 219, 0.1);
}

.stat-card.success .stat-icon {
  background: rgba(39, 174, 96, 0.1);
}

.stat-content h3 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  color: #2c3e50;
}

.stat-content p {
  font-size: 1rem;
  color: #7f8c8d;
  margin: 0.5rem 0 0 0;
}

/* Quick Actions */
.quick-actions {
  margin-bottom: 3rem;
}

.quick-actions h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.action-btn {
  background: white;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #2c3e50;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.action-btn.emergency {
  border-color: #e74c3c;
  color: #e74c3c;
}

.action-btn.emergency:hover {
  background: #e74c3c;
  color: white;
}

.action-btn.primary {
  border-color: #3498db;
  color: #3498db;
}

.action-btn.primary:hover {
  background: #3498db;
  color: white;
}

.action-btn.info {
  border-color: #9b59b6;
  color: #9b59b6;
}

.action-btn.info:hover {
  background: #9b59b6;
  color: white;
}

.action-btn.secondary {
  border-color: #95a5a6;
  color: #95a5a6;
}

.action-btn.secondary:hover {
  background: #95a5a6;
  color: white;
}

.action-icon {
  font-size: 2rem;
}

/* Recent Activity */
.recent-activity {
  margin-bottom: 3rem;
}

.recent-activity h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.activity-list {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.no-activity {
  padding: 3rem;
  text-align: center;
  color: #7f8c8d;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #f8f9fa;
  cursor: pointer;
  transition: background 0.3s ease;
}

.activity-item:hover {
  background: #f8f9fa;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}

.activity-icon.success {
  background: rgba(39, 174, 96, 0.1);
}

.activity-icon.warning {
  background: rgba(243, 156, 18, 0.1);
}

.activity-icon.danger {
  background: rgba(231, 76, 60, 0.1);
}

.activity-icon.critical {
  background: rgba(192, 57, 43, 0.1);
}

.activity-content {
  flex: 1;
}

.activity-content h4 {
  color: #2c3e50;
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
}

.activity-content p {
  color: #7f8c8d;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}

.activity-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.severity {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.severity.success {
  background: rgba(39, 174, 96, 0.1);
  color: #27ae60;
}

.severity.warning {
  background: rgba(243, 156, 18, 0.1);
  color: #f39c12;
}

.severity.danger {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.severity.critical {
  background: rgba(192, 57, 43, 0.1);
  color: #c0392b;
}

.time {
  color: #95a5a6;
  font-size: 0.9rem;
}

.activity-status {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.activity-status.in_progress {
  background: rgba(243, 156, 18, 0.1);
  color: #f39c12;
}

.activity-status.assigned {
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
}

.activity-status.resolved {
  background: rgba(39, 174, 96, 0.1);
  color: #27ae60;
}

/* Weather Alert */
.weather-alert {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.alert-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.alert-icon {
  font-size: 2rem;
}

.alert-header h3 {
  margin: 0;
  font-size: 1.3rem;
}

.dismiss-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.dismiss-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Emergency Contacts */
.emergency-contacts h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.contacts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.contact-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-2px);
}

.contact-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.contact-card h4 {
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.contact-number {
  color: #3498db;
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard {
    padding: 1rem;
  }

  .dashboard-header h1 {
    font-size: 2rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .activity-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .activity-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .weather-alert {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .contacts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
