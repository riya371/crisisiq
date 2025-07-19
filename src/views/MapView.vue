<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Map Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div
          class="flex flex-col lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Live Map</h1>
            <p class="text-gray-600">
              Real-time visualization of incidents, resources, and emergency
              services
            </p>
          </div>
          <div class="mt-4 lg:mt-0 flex flex-wrap gap-3">
            <div class="flex items-center space-x-2">
              <input
                v-model="showIncidents"
                @change="toggleLayer('incidents')"
                type="checkbox"
                id="show-incidents"
                class="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <label
                for="show-incidents"
                class="text-sm font-medium text-gray-700"
              >
                <span class="flex items-center space-x-1">
                  <span class="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span>Incidents ({{ incidents.length }})</span>
                </span>
              </label>
            </div>
            <div class="flex items-center space-x-2">
              <input
                v-model="showResources"
                @change="toggleLayer('resources')"
                type="checkbox"
                id="show-resources"
                class="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <label
                for="show-resources"
                class="text-sm font-medium text-gray-700"
              >
                <span class="flex items-center space-x-1">
                  <span class="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span>Resources ({{ resources.length }})</span>
                </span>
              </label>
            </div>
            <div class="flex items-center space-x-2">
              <input
                v-model="showShelters"
                @change="toggleLayer('shelters')"
                type="checkbox"
                id="show-shelters"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                for="show-shelters"
                class="text-sm font-medium text-gray-700"
              >
                <span class="flex items-center space-x-1">
                  <span class="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span>Shelters ({{ shelters.length }})</span>
                </span>
              </label>
            </div>
            <div class="flex items-center space-x-2">
              <input
                v-model="showVolunteers"
                @change="toggleLayer('volunteers')"
                type="checkbox"
                id="show-volunteers"
                class="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <label
                for="show-volunteers"
                class="text-sm font-medium text-gray-700"
              >
                <span class="flex items-center space-x-1">
                  <span class="w-3 h-3 bg-purple-500 rounded-full"></span>
                  <span>Volunteers ({{ volunteers.length }})</span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Map Container -->
    <div class="relative h-screen">
      <!-- Leaflet Map -->
      <div id="map" class="w-full h-full"></div>

      <!-- Map Controls -->
      <div class="absolute top-4 left-4 bg-white rounded-lg shadow-lg border">
        <div class="p-4 space-y-3">
          <button
            @click="centerOnUser"
            class="w-full flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            :disabled="loadingLocation"
          >
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
            <span>{{ loadingLocation ? "Locating..." : "Center on Me" }}</span>
          </button>
          <button
            @click="showNearestShelter"
            class="w-full flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
          >
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
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4"
              ></path>
            </svg>
            <span>Nearest Shelter</span>
          </button>
          <button
            @click="toggleWeatherLayer"
            class="w-full flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            :class="{ 'bg-blue-50 text-blue-700': showWeather }"
          >
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
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              ></path>
            </svg>
            <span>{{ showWeather ? "Hide Weather" : "Show Weather" }}</span>
          </button>
          <button
            @click="toggleEvacuationRoutes"
            class="w-full flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            :class="{ 'bg-orange-50 text-orange-700': showEvacuationRoutes }"
          >
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>{{
              showEvacuationRoutes ? "Hide Routes" : "Evacuation Routes"
            }}</span>
          </button>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="absolute top-4 right-4 w-80">
        <div class="relative">
          <input
            v-model="searchQuery"
            @input="searchLocation"
            @keypress.enter="searchLocation"
            type="text"
            placeholder="Search locations, addresses..."
            class="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            @click="searchLocation"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            :disabled="searchingLocation"
          >
            <svg
              v-if="!searchingLocation"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <svg
              v-else
              class="w-5 h-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </button>
        </div>
        <!-- Search Results -->
        <div
          v-if="searchResults.length > 0"
          class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10"
        >
          <div
            v-for="result in searchResults"
            :key="result.id"
            @click="selectSearchResult(result)"
            class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
          >
            <div class="text-sm font-medium text-gray-900">
              {{ result.display_name }}
            </div>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div
        class="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg border"
      >
        <div class="p-4">
          <h3 class="text-sm font-semibold text-gray-900 mb-3">Legend</h3>
          <div class="space-y-2">
            <div v-if="showIncidents" class="flex items-center space-x-2">
              <span class="w-3 h-3 bg-red-500 rounded-full"></span>
              <span class="text-xs text-gray-600">Active Incidents</span>
            </div>
            <div v-if="showResources" class="flex items-center space-x-2">
              <span class="w-3 h-3 bg-green-500 rounded-full"></span>
              <span class="text-xs text-gray-600">Available Resources</span>
            </div>
            <div v-if="showShelters" class="flex items-center space-x-2">
              <span class="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span class="text-xs text-gray-600">Emergency Shelters</span>
            </div>
            <div v-if="showVolunteers" class="flex items-center space-x-2">
              <span class="w-3 h-3 bg-purple-500 rounded-full"></span>
              <span class="text-xs text-gray-600">Active Volunteers</span>
            </div>
            <div v-if="showWeather" class="flex items-center space-x-2">
              <span class="w-3 h-3 bg-cyan-500 rounded-full"></span>
              <span class="text-xs text-gray-600">Weather Overlay</span>
            </div>
            <div
              v-if="showEvacuationRoutes"
              class="flex items-center space-x-2"
            >
              <span class="w-3 h-1 bg-orange-500"></span>
              <span class="text-xs text-gray-600">Evacuation Routes</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading Overlay -->
      <div
        v-if="loading"
        class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-lg p-6 text-center">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"
          ></div>
          <p class="text-gray-600">Loading map data...</p>
        </div>
      </div>
    </div>

    <!-- Info Panel -->
    <div
      v-if="selectedItem"
      class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-lg shadow-lg border p-4 max-w-sm z-40"
    >
      <div class="flex items-start justify-between mb-3">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ selectedItem.title }}
        </h3>
        <button
          @click="selectedItem = null"
          class="text-gray-400 hover:text-gray-600"
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
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <div class="space-y-2 text-sm">
        <div v-if="selectedItem.type" class="flex">
          <span class="font-medium text-gray-700 w-16">Type:</span>
          <span class="text-gray-600 capitalize">{{ selectedItem.type }}</span>
        </div>
        <div v-if="selectedItem.status" class="flex">
          <span class="font-medium text-gray-700 w-16">Status:</span>
          <span
            class="text-gray-600 capitalize px-2 py-1 rounded text-xs"
            :class="getStatusClass(selectedItem.status)"
          >
            {{ selectedItem.status }}
          </span>
        </div>
        <div v-if="selectedItem.description" class="mt-3">
          <span class="font-medium text-gray-700">Description:</span>
          <p class="text-gray-600 mt-1">{{ selectedItem.description }}</p>
        </div>
        <div v-if="selectedItem.capacity" class="mt-3">
          <span class="font-medium text-gray-700">Capacity:</span>
          <div class="mt-1">
            <div class="flex justify-between text-xs text-gray-600 mb-1">
              <span
                >{{ selectedItem.capacity.current }} /
                {{ selectedItem.capacity.total }}</span
              >
              <span
                >{{
                  Math.round(
                    (selectedItem.capacity.current /
                      selectedItem.capacity.total) *
                      100
                  )
                }}%</span
              >
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="h-2 rounded-full"
                :class="
                  getCapacityBarClass(
                    (selectedItem.capacity.current /
                      selectedItem.capacity.total) *
                      100
                  )
                "
                :style="{
                  width:
                    (selectedItem.capacity.current /
                      selectedItem.capacity.total) *
                      100 +
                    '%',
                }"
              ></div>
            </div>
          </div>
        </div>
        <div v-if="selectedItem.contact" class="mt-3">
          <span class="font-medium text-gray-700">Contact:</span>
          <p class="text-gray-600 mt-1">{{ selectedItem.contact.phone }}</p>
        </div>
      </div>
      <div class="mt-4 flex space-x-2">
        <button
          @click="navigateToLocation(selectedItem)"
          class="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
        >
          Navigate
        </button>
        <button
          @click="shareLocation(selectedItem)"
          class="flex-1 px-3 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
        >
          Share
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted, nextTick } from "vue";
import { useNotificationStore } from "../stores/notifications";
import axios from "axios";
import L from "leaflet";

// Fix Leaflet default marker icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconRetinaUrl: markerRetina,
});

export default {
  name: "MapView",
  setup() {
    const notificationStore = useNotificationStore();

    // Map instance
    let map = null;
    let userLocationMarker = null;

    // Layer groups
    const layerGroups = {
      incidents: null,
      resources: null,
      shelters: null,
      volunteers: null,
      evacuation: null,
      weather: null,
    };

    // Reactive data
    const loading = ref(true);
    const loadingLocation = ref(false);
    const searchingLocation = ref(false);
    const showIncidents = ref(true);
    const showResources = ref(true);
    const showShelters = ref(true);
    const showVolunteers = ref(false);
    const showWeather = ref(false);
    const showEvacuationRoutes = ref(false);
    const searchQuery = ref("");
    const searchResults = ref([]);
    const selectedItem = ref(null);

    // Data arrays
    const incidents = ref([]);
    const resources = ref([]);
    const shelters = ref([]);
    const volunteers = ref([]);

    // Custom icons
    const createCustomIcon = (color, icon) => {
      return L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            background-color: ${color};
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 14px;
            font-weight: bold;
          ">
            ${icon}
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });
    };

    // Icons for different marker types
    const icons = {
      incident: {
        critical: createCustomIcon("#dc2626", "🚨"),
        high: createCustomIcon("#ea580c", "⚠️"),
        medium: createCustomIcon("#d97706", "🔶"),
        low: createCustomIcon("#65a30d", "ℹ️"),
      },
      resource: createCustomIcon("#16a34a", "📦"),
      shelter: createCustomIcon("#2563eb", "🏠"),
      volunteer: createCustomIcon("#7c3aed", "👤"),
      user: createCustomIcon("#0891b2", "📍"),
    };

    // Initialize map
    const initializeMap = async () => {
      await nextTick();

      // Create map
      map = L.map("map", {
        center: [23.8103, 90.4125], // Default to Dhaka, Bangladesh
        zoom: 12,
        zoomControl: false,
      });

      // Add zoom control to top right
      L.control
        .zoom({
          position: "topright",
        })
        .addTo(map);

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      // Initialize layer groups
      Object.keys(layerGroups).forEach((key) => {
        layerGroups[key] = L.layerGroup();
        if (key !== "evacuation" && key !== "weather") {
          layerGroups[key].addTo(map);
        }
      });

      // Load data
      await loadMapData();

      loading.value = false;
    };

    // Load map data
    const loadMapData = async () => {
      try {
        await Promise.all([
          loadIncidents(),
          loadResources(),
          loadShelters(),
          loadVolunteers(),
        ]);
      } catch (error) {
        console.error("Error loading map data:", error);
        notificationStore.showError("Failed to load map data", {
          title: "Map Error",
        });
      }
    };

    // Load incidents data
    const loadIncidents = async () => {
      try {
        const response = await axios.get("/api/incidents");
        incidents.value = response.data || [];
        updateIncidentMarkers();
      } catch (error) {
        // Use mock data if API fails
        incidents.value = [
          {
            _id: "1",
            title: "Building Fire in Old Dhaka",
            description: "Large fire reported at Chawkbazar area",
            type: "fire",
            severity: "critical",
            status: "active",
            location: { coordinates: [90.4125, 23.8203] },
          },
          {
            _id: "2",
            title: "Monsoon Flooding in Dhanmondi",
            description: "Heavy rainfall causing severe waterlogging",
            type: "flood",
            severity: "high",
            status: "active",
            location: { coordinates: [90.395, 23.8] },
          },
          {
            _id: "3",
            title: "Power Outage in Gulshan",
            description: "Electrical grid failure affecting Gulshan-1 area",
            type: "infrastructure",
            severity: "medium",
            status: "in_progress",
            location: { coordinates: [90.42, 23.83] },
          },
        ];
        updateIncidentMarkers();
      }
    };

    // Load resources data
    const loadResources = async () => {
      try {
        const response = await axios.get("/api/resources");
        resources.value = response.data || [];
        updateResourceMarkers();
      } catch (error) {
        // Use mock data if API fails
        resources.value = [
          {
            _id: "1",
            name: "Emergency Medical Supplies",
            type: "medical",
            status: "available",
            location: {
              coordinates: [90.39, 23.79],
              address: "Dhaka Medical College Hospital",
            },
            quantity: { current: 150, total: 200 },
          },
          {
            _id: "2",
            name: "Food Distribution Point",
            type: "food",
            status: "available",
            location: {
              coordinates: [90.41, 23.81],
              address: "Ramna Park Community Center",
            },
            quantity: { current: 300, total: 500 },
          },
        ];
        updateResourceMarkers();
      }
    };

    // Load shelters data
    const loadShelters = async () => {
      try {
        const response = await axios.get("/api/shelters");
        shelters.value = response.data || [];
        updateShelterMarkers();
      } catch (error) {
        // Use mock data if API fails
        shelters.value = [
          {
            _id: "1",
            name: "Dhaka Central Emergency Shelter",
            type: "emergency",
            status: "active",
            location: {
              coordinates: [90.405, 23.805],
              address: "Bangladesh National Stadium Area",
            },
            capacity: { current: 85, total: 150 },
            contact: { phone: "+880-1712-345678" },
          },
          {
            _id: "2",
            name: "Dhanmondi Community Shelter",
            type: "temporary",
            status: "active",
            location: {
              coordinates: [90.39, 23.785],
              address: "Dhanmondi Community Center",
            },
            capacity: { current: 45, total: 80 },
            contact: { phone: "+880-1712-987654" },
          },
        ];
        updateShelterMarkers();
      }
    };

    // Load volunteers data
    const loadVolunteers = async () => {
      // Mock volunteer data (would normally come from API)
      volunteers.value = [
        {
          _id: "1",
          name: "Rahman Ahmed",
          status: "active",
          location: { coordinates: [90.408, 23.808] },
          skills: ["First Aid", "Search & Rescue"],
        },
        {
          _id: "2",
          name: "Fatima Khan",
          status: "available",
          location: { coordinates: [90.395, 23.795] },
          skills: ["Medical", "Communication"],
        },
      ];
      updateVolunteerMarkers();
    };

    // Update incident markers
    const updateIncidentMarkers = () => {
      layerGroups.incidents.clearLayers();

      incidents.value.forEach((incident) => {
        if (incident.location?.coordinates) {
          const [lng, lat] = incident.location.coordinates;
          const icon =
            icons.incident[incident.severity] || icons.incident.medium;

          const marker = L.marker([lat, lng], { icon })
            .bindPopup(
              `
              <div class="p-2">
                <h3 class="font-semibold text-sm">${incident.title}</h3>
                <p class="text-xs text-gray-600 mt-1">${incident.description}</p>
                <div class="mt-2 flex space-x-2">
                  <span class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">${incident.severity}</span>
                  <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">${incident.status}</span>
                </div>
              </div>
            `
            )
            .on("click", () => {
              selectedItem.value = {
                ...incident,
                title: incident.title,
                type: incident.type,
                status: incident.status,
                description: incident.description,
              };
            });

          layerGroups.incidents.addLayer(marker);
        }
      });
    };

    // Update resource markers
    const updateResourceMarkers = () => {
      layerGroups.resources.clearLayers();

      resources.value.forEach((resource) => {
        if (resource.location?.coordinates) {
          const [lng, lat] = resource.location.coordinates;

          const marker = L.marker([lat, lng], { icon: icons.resource })
            .bindPopup(
              `
              <div class="p-2">
                <h3 class="font-semibold text-sm">${resource.name}</h3>
                <p class="text-xs text-gray-600 mt-1">${resource.location.address}</p>
                <div class="mt-2">
                  <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">${resource.status}</span>
                </div>
              </div>
            `
            )
            .on("click", () => {
              selectedItem.value = {
                ...resource,
                title: resource.name,
                type: resource.type,
                status: resource.status,
                description: `Available at ${resource.location.address}`,
              };
            });

          layerGroups.resources.addLayer(marker);
        }
      });
    };

    // Update shelter markers
    const updateShelterMarkers = () => {
      layerGroups.shelters.clearLayers();

      shelters.value.forEach((shelter) => {
        if (shelter.location?.coordinates) {
          const [lng, lat] = shelter.location.coordinates;

          const marker = L.marker([lat, lng], { icon: icons.shelter })
            .bindPopup(
              `
              <div class="p-2">
                <h3 class="font-semibold text-sm">${shelter.name}</h3>
                <p class="text-xs text-gray-600 mt-1">${shelter.location.address}</p>
                <div class="mt-2 flex justify-between text-xs">
                  <span>Capacity: ${shelter.capacity.current}/${shelter.capacity.total}</span>
                  <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded">${shelter.status}</span>
                </div>
              </div>
            `
            )
            .on("click", () => {
              selectedItem.value = {
                ...shelter,
                title: shelter.name,
                type: shelter.type,
                status: shelter.status,
                description: `Emergency shelter at ${shelter.location.address}`,
                capacity: shelter.capacity,
                contact: shelter.contact,
              };
            });

          layerGroups.shelters.addLayer(marker);
        }
      });
    };

    // Update volunteer markers
    const updateVolunteerMarkers = () => {
      layerGroups.volunteers.clearLayers();

      volunteers.value.forEach((volunteer) => {
        if (volunteer.location?.coordinates) {
          const [lng, lat] = volunteer.location.coordinates;

          const marker = L.marker([lat, lng], { icon: icons.volunteer })
            .bindPopup(
              `
              <div class="p-2">
                <h3 class="font-semibold text-sm">${volunteer.name}</h3>
                <p class="text-xs text-gray-600 mt-1">Skills: ${volunteer.skills.join(
                  ", "
                )}</p>
                <div class="mt-2">
                  <span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">${
                    volunteer.status
                  }</span>
                </div>
              </div>
            `
            )
            .on("click", () => {
              selectedItem.value = {
                ...volunteer,
                title: volunteer.name,
                type: "volunteer",
                status: volunteer.status,
                description: `Skills: ${volunteer.skills.join(", ")}`,
              };
            });

          layerGroups.volunteers.addLayer(marker);
        }
      });
    };

    // Toggle layer visibility
    const toggleLayer = (layerName) => {
      const show = eval(
        `show${layerName.charAt(0).toUpperCase() + layerName.slice(1)}.value`
      );
      if (show) {
        layerGroups[layerName].addTo(map);
      } else {
        map.removeLayer(layerGroups[layerName]);
      }
    };

    // Center map on user location
    const centerOnUser = async () => {
      if (!navigator.geolocation) {
        notificationStore.showError(
          "Geolocation is not supported by this browser",
          {
            title: "Location Error",
          }
        );
        return;
      }

      loadingLocation.value = true;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Remove existing user marker
          if (userLocationMarker) {
            map.removeLayer(userLocationMarker);
          }

          // Add user location marker
          userLocationMarker = L.marker([latitude, longitude], {
            icon: icons.user,
          })
            .bindPopup("Your Location")
            .addTo(map);

          // Center map on user
          map.setView([latitude, longitude], 15);

          notificationStore.showSuccess(
            "Centered map on your current location",
            {
              title: "Location Found",
            }
          );

          loadingLocation.value = false;
        },
        (error) => {
          notificationStore.showError("Unable to get your current location", {
            title: "Location Error",
          });
          loadingLocation.value = false;
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    };

    // Find and show nearest shelter
    const showNearestShelter = () => {
      if (shelters.value.length === 0) {
        notificationStore.showWarning("No shelters available on the map", {
          title: "No Shelters Found",
        });
        return;
      }

      // For demo, just show the first available shelter
      const nearestShelter =
        shelters.value.find((s) => s.status === "active") || shelters.value[0];

      if (nearestShelter?.location?.coordinates) {
        const [lng, lat] = nearestShelter.location.coordinates;
        map.setView([lat, lng], 16);

        selectedItem.value = {
          ...nearestShelter,
          title: nearestShelter.name,
          type: nearestShelter.type,
          status: nearestShelter.status,
          description: `Emergency shelter at ${nearestShelter.location.address}`,
          capacity: nearestShelter.capacity,
          contact: nearestShelter.contact,
        };

        notificationStore.showInfo(`Showing ${nearestShelter.name}`, {
          title: "Nearest Shelter",
        });
      }
    };

    // Toggle weather layer
    const toggleWeatherLayer = () => {
      showWeather.value = !showWeather.value;

      if (showWeather.value) {
        // Add weather overlay (mock implementation)
        const weatherOverlay = L.tileLayer(
          "https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=demo",
          {
            attribution: "Weather data © OpenWeatherMap",
            opacity: 0.6,
          }
        );
        layerGroups.weather.addLayer(weatherOverlay);
        layerGroups.weather.addTo(map);

        notificationStore.showInfo("Weather overlay enabled", {
          title: "Weather Layer",
        });
      } else {
        map.removeLayer(layerGroups.weather);
        layerGroups.weather.clearLayers();

        notificationStore.showInfo("Weather overlay disabled", {
          title: "Weather Layer",
        });
      }
    };

    // Toggle evacuation routes
    const toggleEvacuationRoutes = () => {
      showEvacuationRoutes.value = !showEvacuationRoutes.value;

      if (showEvacuationRoutes.value) {
        // Add mock evacuation routes
        const route1 = L.polyline(
          [
            [23.8103, 90.4125],
            [23.8203, 90.4225],
            [23.8303, 90.4325],
          ],
          {
            color: "#f97316",
            weight: 4,
            opacity: 0.8,
            dashArray: "10, 10",
          }
        ).bindPopup("Evacuation Route A - To Uttara Safe Zone");

        const route2 = L.polyline(
          [
            [23.8003, 90.4025],
            [23.7903, 90.4125],
            [23.7803, 90.4225],
          ],
          {
            color: "#f97316",
            weight: 4,
            opacity: 0.8,
            dashArray: "10, 10",
          }
        ).bindPopup("Evacuation Route B - To Dhanmondi Safe Zone");

        layerGroups.evacuation.addLayer(route1);
        layerGroups.evacuation.addLayer(route2);
        layerGroups.evacuation.addTo(map);

        notificationStore.showInfo("Evacuation routes shown", {
          title: "Evacuation Routes",
        });
      } else {
        map.removeLayer(layerGroups.evacuation);
        layerGroups.evacuation.clearLayers();

        notificationStore.showInfo("Evacuation routes hidden", {
          title: "Evacuation Routes",
        });
      }
    };

    // Search location using Nominatim
    const searchLocation = async () => {
      if (!searchQuery.value.trim()) return;

      searchingLocation.value = true;
      searchResults.value = [];

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            searchQuery.value
          )}&limit=5`
        );
        const results = await response.json();

        searchResults.value = results;

        if (results.length === 0) {
          notificationStore.showWarning("No locations found", {
            title: "Search Results",
          });
        }
      } catch (error) {
        notificationStore.showError("Search failed", {
          title: "Search Error",
        });
      } finally {
        searchingLocation.value = false;
      }
    };

    // Select search result
    const selectSearchResult = (result) => {
      const lat = parseFloat(result.lat);
      const lng = parseFloat(result.lon);

      map.setView([lat, lng], 15);

      // Add temporary marker
      const searchMarker = L.marker([lat, lng])
        .bindPopup(result.display_name)
        .addTo(map)
        .openPopup();

      // Remove marker after 10 seconds
      setTimeout(() => {
        map.removeLayer(searchMarker);
      }, 10000);

      searchResults.value = [];
      searchQuery.value = "";
    };

    // Navigate to location
    const navigateToLocation = (item) => {
      if (item.location?.coordinates) {
        const [lng, lat] = item.location.coordinates;
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(url, "_blank");
      }
    };

    // Share location
    const shareLocation = (item) => {
      if (navigator.share && item.location?.coordinates) {
        const [lng, lat] = item.location.coordinates;
        navigator.share({
          title: item.title,
          text: item.description,
          url: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}&zoom=15`,
        });
      } else {
        // Fallback to clipboard
        const [lng, lat] = item.location.coordinates;
        const url = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}&zoom=15`;
        navigator.clipboard.writeText(url);
        notificationStore.showSuccess("Location link copied to clipboard", {
          title: "Shared",
        });
      }
    };

    // Utility functions
    const getStatusClass = (status) => {
      const classes = {
        active: "bg-green-100 text-green-800",
        available: "bg-blue-100 text-blue-800",
        full: "bg-red-100 text-red-800",
        critical: "bg-red-100 text-red-800",
        high: "bg-orange-100 text-orange-800",
        medium: "bg-yellow-100 text-yellow-800",
        low: "bg-green-100 text-green-800",
        in_progress: "bg-blue-100 text-blue-800",
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };

    const getCapacityBarClass = (percentage) => {
      if (percentage >= 90) return "bg-red-500";
      if (percentage >= 70) return "bg-yellow-500";
      return "bg-green-500";
    };

    // Lifecycle hooks
    onMounted(() => {
      initializeMap();
    });

    onUnmounted(() => {
      if (map) {
        map.remove();
      }
    });

    return {
      loading,
      loadingLocation,
      searchingLocation,
      showIncidents,
      showResources,
      showShelters,
      showVolunteers,
      showWeather,
      showEvacuationRoutes,
      searchQuery,
      searchResults,
      selectedItem,
      incidents,
      resources,
      shelters,
      volunteers,
      toggleLayer,
      centerOnUser,
      showNearestShelter,
      toggleWeatherLayer,
      toggleEvacuationRoutes,
      searchLocation,
      selectSearchResult,
      navigateToLocation,
      shareLocation,
      getStatusClass,
      getCapacityBarClass,
    };
  },
};
</script>

<style>
/* Import Leaflet CSS */
@import "leaflet/dist/leaflet.css";

/* Custom map styles */
#map {
  font-family: inherit;
}

.leaflet-popup-content-wrapper {
  border-radius: 8px;
}

.leaflet-popup-content {
  margin: 0;
}

/* Custom marker styles */
.custom-marker {
  background: transparent !important;
  border: none !important;
}

/* Search results */
.search-results {
  z-index: 1000;
}

/* Hide default attribution when it conflicts */
.leaflet-control-attribution {
  font-size: 10px;
  background: rgba(255, 255, 255, 0.8);
}
</style>
