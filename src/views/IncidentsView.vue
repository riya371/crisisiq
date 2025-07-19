<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">
              Emergency Incidents
            </h1>
            <p class="text-gray-600">
              Monitor and manage emergency situations in real-time
            </p>
          </div>
          <div class="mt-4 md:mt-0 flex space-x-3">
            <button
              @click="showReportModal = true"
              class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                ></path>
              </svg>
              <span>Report Incident</span>
            </button>
            <button
              @click="toggleView"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <svg
                v-if="viewMode === 'list'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                ></path>
              </svg>
              <svg
                v-else
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                ></path>
              </svg>
              <span>{{ viewMode === "list" ? "Map View" : "List View" }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Search</label
            >
            <input
              v-model="filters.search"
              type="text"
              placeholder="Search incidents..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Type</label
            >
            <select
              v-model="filters.type"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="earthquake">Earthquake</option>
              <option value="flood">Flood</option>
              <option value="fire">Fire</option>
              <option value="hurricane">Hurricane</option>
              <option value="tornado">Tornado</option>
              <option value="accident">Accident</option>
              <option value="medical">Medical Emergency</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Severity</label
            >
            <select
              v-model="filters.severity"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Severities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Status</label
            >
            <select
              v-model="filters.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Statuses</option>
              <option value="reported">Reported</option>
              <option value="verified">Verified</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="p-2 bg-red-100 rounded-lg">
              <svg
                class="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                ></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Active Incidents</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.active }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <svg
                class="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">
                Pending Verification
              </p>
              <p class="text-2xl font-bold text-gray-900">
                {{ stats.pending }}
              </p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Critical</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ stats.critical }}
              </p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <svg
                class="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Resolved Today</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ stats.resolved }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div v-if="viewMode === 'list'">
        <!-- Incidents List -->
        <div class="bg-white rounded-lg shadow-sm border">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">Incidents List</h2>
          </div>
          <div v-if="loading" class="p-8 text-center">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
            ></div>
            <p class="mt-4 text-gray-600">Loading incidents...</p>
          </div>
          <div
            v-else-if="filteredIncidents.length === 0"
            class="p-8 text-center"
          >
            <svg
              class="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            <p class="text-gray-600">No incidents found</p>
          </div>
          <div v-else class="divide-y divide-gray-200">
            <div
              v-for="incident in filteredIncidents"
              :key="incident._id"
              class="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
              @click="selectIncident(incident)"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-2">
                    <h3 class="text-lg font-semibold text-gray-900">
                      {{ incident.title }}
                    </h3>
                    <span
                      :class="getSeverityClass(incident.severity)"
                      class="px-2 py-1 text-xs font-medium rounded-full"
                    >
                      {{ incident.severity }}
                    </span>
                    <span
                      :class="getStatusClass(incident.status)"
                      class="px-2 py-1 text-xs font-medium rounded-full"
                    >
                      {{ incident.status }}
                    </span>
                  </div>
                  <p class="text-gray-600 mb-3">{{ incident.description }}</p>
                  <div
                    class="flex items-center space-x-6 text-sm text-gray-500"
                  >
                    <div class="flex items-center space-x-1">
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      <span>{{
                        incident.location?.address || "Location not specified"
                      }}</span>
                    </div>
                    <div class="flex items-center space-x-1">
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span>{{ formatDate(incident.reportedAt) }}</span>
                    </div>
                    <div class="flex items-center space-x-1">
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                      <span
                        >{{ incident.reportedBy?.firstName }}
                        {{ incident.reportedBy?.lastName }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <button
                    @click.stop="viewIncidentDetails(incident)"
                    class="p-2 text-gray-400 hover:text-green-600 transition-colors"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Map View -->
      <div v-else class="bg-white rounded-lg shadow-sm border">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Incidents Map</h2>
        </div>
        <div class="h-96 bg-gray-100 flex items-center justify-center">
          <div class="text-center">
            <svg
              class="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              ></path>
            </svg>
            <p class="text-gray-500">Interactive map will be integrated here</p>
            <p class="text-sm text-gray-400 mt-2">
              Showing incident locations with clustering and filtering
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Report Incident Modal -->
    <div
      v-if="showReportModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto"
      >
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900">
              Report New Incident
            </h2>
            <button
              @click="showReportModal = false"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <form @submit.prevent="submitIncident" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Incident Type</label
              >
              <select
                v-model="newIncident.type"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select type</option>
                <option value="earthquake">Earthquake</option>
                <option value="flood">Flood</option>
                <option value="fire">Fire</option>
                <option value="hurricane">Hurricane</option>
                <option value="tornado">Tornado</option>
                <option value="accident">Accident</option>
                <option value="medical">Medical Emergency</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Severity</label
              >
              <select
                v-model="newIncident.severity"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select severity</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Title</label
            >
            <input
              v-model="newIncident.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief description of the incident"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Description</label
            >
            <textarea
              v-model="newIncident.description"
              rows="4"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Detailed description of the incident"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Location</label
            >
            <input
              v-model="newIncident.location.address"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Address or location description"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Displaced People (estimate)</label
              >
              <input
                v-model.number="newIncident.casualties.displaced"
                type="number"
                min="0"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Number of people displaced"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Injuries (estimate)</label
              >
              <input
                v-model.number="newIncident.casualties.injured"
                type="number"
                min="0"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Number of injuries"
              />
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="showReportModal = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="submitting">Reporting...</span>
              <span v-else>Report Incident</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useAuthStore } from "../stores/auth";
import { useNotificationStore } from "../stores/notifications";
import axios from "axios";

export default {
  name: "IncidentsView",
  setup() {
    const authStore = useAuthStore();
    const notificationStore = useNotificationStore();

    const viewMode = ref("list");
    const showReportModal = ref(false);
    const submitting = ref(false);
    const loading = ref(false);

    const incidents = ref([]);
    const stats = ref({
      active: 0,
      pending: 0,
      critical: 0,
      resolved: 0,
    });

    const pagination = ref({
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      limit: 10,
    });

    const filters = reactive({
      search: "",
      type: "",
      severity: "",
      status: "",
    });

    const newIncident = reactive({
      type: "",
      severity: "",
      title: "",
      description: "",
      location: {
        address: "",
      },
      casualties: {
        injured: 0,
        dead: 0,
        missing: 0,
        displaced: 0,
      },
    });

    const filteredIncidents = computed(() => {
      if (!incidents.value || !Array.isArray(incidents.value)) {
        return [];
      }
      
      return incidents.value.filter((incident) => {
        const matchesSearch =
          !filters.search ||
          incident.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          incident.description
            .toLowerCase()
            .includes(filters.search.toLowerCase());

        const matchesType = !filters.type || incident.type === filters.type;
        const matchesSeverity =
          !filters.severity || incident.severity === filters.severity;
        const matchesStatus =
          !filters.status || incident.status === filters.status;

        return matchesSearch && matchesType && matchesSeverity && matchesStatus;
      });
    });

    const visiblePages = computed(() => {
      const pages = [];
      const start = Math.max(1, pagination.value.currentPage - 2);
      const end = Math.min(
        pagination.value.totalPages,
        pagination.value.currentPage + 2
      );

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    });

    const fetchIncidents = async () => {
      loading.value = true;
      try {
        // For demo purposes, use mock data instead of API call
        const mockIncidents = [
          {
            _id: "1",
            title: "Flash Flood in Downtown",
            description: "Heavy rainfall has caused flooding in the downtown area, affecting multiple buildings and roads.",
            type: "flood",
            severity: "high",
            status: "in-progress",
            reportedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
            location: { address: "123 Main St, Downtown" },
            reportedBy: { firstName: "John", lastName: "Doe" }
          },
          {
            _id: "2",
            title: "Building Fire - Industrial District",
            description: "Large fire reported at warehouse in industrial district. Fire department responding.",
            type: "fire",
            severity: "critical",
            status: "reported",
            reportedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
            location: { address: "456 Industrial Blvd" },
            reportedBy: { firstName: "Jane", lastName: "Smith" }
          },
          {
            _id: "3",
            title: "Traffic Accident - Highway 101",
            description: "Multi-vehicle accident on Highway 101 causing major traffic delays.",
            type: "accident",
            severity: "medium",
            status: "verified",
            reportedAt: new Date(Date.now() - 30 * 60 * 1000),
            location: { address: "Highway 101, Mile Marker 45" },
            reportedBy: { firstName: "Mike", lastName: "Johnson" }
          }
        ];

        incidents.value = mockIncidents;

        // Update stats
        stats.value = {
          active: incidents.value?.filter((i) =>
            ["reported", "verified", "in-progress"].includes(i.status)
          )?.length || 0,
          pending: incidents.value?.filter((i) => i.status === "reported")
            ?.length || 0,
          critical: incidents.value?.filter((i) => i.severity === "critical")
            ?.length || 0,
          resolved: incidents.value?.filter((i) => i.status === "resolved")
            ?.length || 0,
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error("Failed to fetch incidents:", error);
        // Set empty array on error
        incidents.value = [];
        stats.value = {
          active: 0,
          pending: 0,
          critical: 0,
          resolved: 0,
        };
      } finally {
        loading.value = false;
      }
    };

    const submitIncident = async () => {
      submitting.value = true;
      try {
        // Prepare incident data with required fields
        const incidentData = {
          ...newIncident,
          incidentId: `INC-${Date.now()}`, // Generate unique incident ID
          category: getCategoryFromType(newIncident.type), // Derive category from type
          location: {
            type: "Point",
            coordinates: [0, 0], // Default coordinates (should be replaced with actual location)
            address: {
              street: newIncident.location.address,
            },
          },
        };

        await axios.post("/incidents", incidentData, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        notificationStore.showSuccess(
          "Your incident report has been submitted successfully",
          {
            title: "Incident Reported",
          }
        );

        showReportModal.value = false;
        resetNewIncident();
        fetchIncidents();
      } catch (error) {
        notificationStore.showError(
          error.response?.data?.error || "Failed to report incident",
          {
            title: "Error",
          }
        );
      } finally {
        submitting.value = false;
      }
    };

    const resetNewIncident = () => {
      Object.assign(newIncident, {
        type: "",
        severity: "",
        title: "",
        description: "",
        location: { address: "" },
        casualties: { injured: 0, dead: 0, missing: 0, displaced: 0 },
      });
    };

    const toggleView = () => {
      viewMode.value = viewMode.value === "list" ? "map" : "list";
    };

    const changePage = (page) => {
      if (page >= 1 && page <= pagination.value.totalPages) {
        pagination.value.currentPage = page;
        fetchIncidents();
      }
    };

    const selectIncident = (incident) => {
      // Handle incident selection
      console.log("Selected incident:", incident);
    };

    const viewIncidentDetails = (incident) => {
      // Handle viewing incident details
      console.log("View incident details:", incident);
    };

    const getSeverityClass = (severity) => {
      const classes = {
        low: "bg-green-100 text-green-800",
        medium: "bg-yellow-100 text-yellow-800",
        high: "bg-orange-100 text-orange-800",
        critical: "bg-red-100 text-red-800",
      };
      return classes[severity] || "bg-gray-100 text-gray-800";
    };

    const getStatusClass = (status) => {
      const classes = {
        reported: "bg-blue-100 text-blue-800",
        verified: "bg-purple-100 text-purple-800",
        "in-progress": "bg-yellow-100 text-yellow-800",
        resolved: "bg-green-100 text-green-800",
        closed: "bg-gray-100 text-gray-800",
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const getCategoryFromType = (type) => {
      // Map incident types to categories
      const categoryMap = {
        earthquake: "natural",
        flood: "natural",
        fire: "natural",
        hurricane: "natural",
        tornado: "natural",
        accident: "man_made",
        medical: "man_made",
        other: "man_made",
      };
      return categoryMap[type] || "man_made";
    };

    // Watch for filter changes
    watch(
      filters,
      () => {
        pagination.value.currentPage = 1;
        fetchIncidents();
      },
      { deep: true }
    );

    onMounted(() => {
      fetchIncidents();
    });

    return {
      viewMode,
      showReportModal,
      submitting,
      loading,
      incidents,
      stats,
      pagination,
      filters,
      newIncident,
      filteredIncidents,
      visiblePages,
      toggleView,
      changePage,
      selectIncident,
      viewIncidentDetails,
      getSeverityClass,
      getStatusClass,
      formatDate,
      submitIncident,
      resetNewIncident,
    };
  },
};
</script>
