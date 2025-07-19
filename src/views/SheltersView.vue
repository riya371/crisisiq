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
              Emergency Shelters
            </h1>
            <p class="text-gray-600">
              Manage emergency shelters and track occupancy
            </p>
          </div>
          <div class="mt-4 md:mt-0 flex space-x-3">
            <button
              @click="showAddModal = true"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              <span>Add Shelter</span>
            </button>
            <button
              @click="toggleView"
              class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
            >
              <svg
                v-if="viewMode === 'grid'"
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
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                ></path>
              </svg>
              <span>{{ viewMode === "grid" ? "List View" : "Grid View" }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4"
                ></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Shelters</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
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
              <p class="text-sm font-medium text-gray-600">Available Beds</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ stats.availableBeds }}
              </p>
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Current Occupants</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ stats.currentOccupants }}
              </p>
            </div>
          </div>
        </div>
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
              <p class="text-sm font-medium text-gray-600">At Capacity</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ stats.atCapacity }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Search</label
            >
            <input
              v-model="filters.search"
              type="text"
              placeholder="Search shelters..."
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
              <option value="emergency">Emergency</option>
              <option value="temporary">Temporary</option>
              <option value="long_term">Long Term</option>
              <option value="evacuation_center">Evacuation Center</option>
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
              <option value="active">Active</option>
              <option value="full">Full</option>
              <option value="maintenance">Maintenance</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Availability</label
            >
            <select
              v-model="filters.availability"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All</option>
              <option value="available">Available</option>
              <option value="limited">Limited Space</option>
              <option value="full">Full</option>
            </select>
          </div>
          <div class="flex items-end">
            <button
              @click="clearFilters"
              class="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Shelters List/Grid -->
      <div v-if="loading" class="flex justify-center py-8">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        ></div>
      </div>

      <div v-else-if="filteredShelters.length === 0" class="text-center py-8">
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
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
          ></path>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4"
          ></path>
        </svg>
        <p class="text-gray-600">No shelters found</p>
      </div>

      <!-- Grid View -->
      <div
        v-else-if="viewMode === 'grid'"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="shelter in filteredShelters"
          :key="shelter._id"
          class="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
        >
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 mb-1">
                  {{ shelter.name }}
                </h3>
                <p class="text-sm text-gray-600">{{ shelter.description }}</p>
              </div>
              <span
                :class="getStatusClass(shelter.status)"
                class="px-2 py-1 text-xs font-medium rounded-full"
              >
                {{ shelter.status }}
              </span>
            </div>

            <div class="space-y-3">
              <div class="flex items-center space-x-2">
                <svg
                  class="w-4 h-4 text-gray-400"
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
                <span class="text-sm text-gray-600">{{
                  shelter.location?.address?.street || "Address not available"
                }}</span>
              </div>

              <div class="flex items-center space-x-2">
                <svg
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
                <span class="text-sm text-gray-600">
                  {{ shelter.capacity?.current || 0 }} /
                  {{ shelter.capacity?.total || 0 }} occupants
                </span>
              </div>

              <div class="flex items-center space-x-2">
                <svg
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                <span class="text-sm text-gray-600">{{
                  shelter.contact?.phone || "No phone"
                }}</span>
              </div>
            </div>

            <!-- Capacity Bar -->
            <div class="mt-4">
              <div class="flex justify-between text-sm text-gray-600 mb-1">
                <span>Capacity</span>
                <span>{{ getOccupancyPercentage(shelter) }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  :class="getCapacityBarClass(getOccupancyPercentage(shelter))"
                  class="h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${getOccupancyPercentage(shelter)}%` }"
                ></div>
              </div>
            </div>

            <!-- Actions -->
            <div class="mt-4 flex space-x-2">
              <button
                @click="viewShelterDetails(shelter)"
                class="flex-1 px-3 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                View Details
              </button>
              <button
                @click="manageShelter(shelter)"
                class="flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                Manage
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- List View -->
      <div v-else class="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Shelter
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Capacity
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contact
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="shelter in filteredShelters"
                :key="shelter._id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">
                      {{ shelter.name }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ shelter.location?.address?.street || "No address" }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                  >
                    {{ shelter.type }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ shelter.capacity?.current || 0 }} /
                    {{ shelter.capacity?.total || 0 }}
                  </div>
                  <div class="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                    <div
                      :class="
                        getCapacityBarClass(getOccupancyPercentage(shelter))
                      "
                      class="h-1.5 rounded-full"
                      :style="{ width: `${getOccupancyPercentage(shelter)}%` }"
                    ></div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="getStatusClass(shelter.status)"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  >
                    {{ shelter.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ shelter.contact?.phone || "No phone" }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <div class="flex space-x-2">
                    <button
                      @click="viewShelterDetails(shelter)"
                      class="text-blue-600 hover:text-blue-900 transition-colors"
                      title="View Details"
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
                    <button
                      @click="manageShelter(shelter)"
                      class="text-green-600 hover:text-green-900 transition-colors"
                      title="Manage"
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
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Add Shelter Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto"
      >
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900">Add New Shelter</h2>
            <button
              @click="showAddModal = false"
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

        <div class="p-6 text-center">
          <svg
            class="w-16 h-16 text-blue-500 mx-auto mb-4"
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
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            Shelter Management System
          </h3>
          <p class="text-gray-600 mb-6">
            Complete shelter registration and management features will be
            available soon.
          </p>
          <button
            @click="showAddModal = false"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { useNotificationStore } from "../stores/notifications";
import axios from "axios";

export default {
  name: "SheltersView",
  setup() {
    const authStore = useAuthStore();
    const notificationStore = useNotificationStore();

    const showAddModal = ref(false);
    const loading = ref(false);
    const viewMode = ref("grid");

    const shelters = ref([]);
    const stats = ref({
      total: 0,
      availableBeds: 0,
      currentOccupants: 0,
      atCapacity: 0,
    });

    const filters = reactive({
      search: "",
      type: "",
      status: "",
      availability: "",
    });

    const filteredShelters = computed(() => {
      return shelters.value.filter((shelter) => {
        const matchesSearch =
          !filters.search ||
          shelter.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          shelter.description
            ?.toLowerCase()
            .includes(filters.search.toLowerCase());

        const matchesType = !filters.type || shelter.type === filters.type;
        const matchesStatus =
          !filters.status || shelter.status === filters.status;

        let matchesAvailability = true;
        if (filters.availability) {
          const occupancy = getOccupancyPercentage(shelter);
          if (filters.availability === "available" && occupancy >= 80)
            matchesAvailability = false;
          if (
            filters.availability === "limited" &&
            (occupancy < 70 || occupancy >= 100)
          )
            matchesAvailability = false;
          if (filters.availability === "full" && occupancy < 100)
            matchesAvailability = false;
        }

        return (
          matchesSearch && matchesType && matchesStatus && matchesAvailability
        );
      });
    });

    const fetchShelters = async () => {
      loading.value = true;
      try {
        const response = await axios.get("/shelters", {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        shelters.value = response.data || [];

        // Calculate stats
        stats.value = {
          total: shelters.value.length,
          availableBeds: shelters.value.reduce(
            (sum, s) => sum + (s.capacity?.total - s.capacity?.current || 0),
            0
          ),
          currentOccupants: shelters.value.reduce(
            (sum, s) => sum + (s.capacity?.current || 0),
            0
          ),
          atCapacity: shelters.value.filter(
            (s) => s.capacity?.current >= s.capacity?.total
          ).length,
        };
      } catch (error) {
        console.error("Failed to fetch shelters:", error);
        // Mock data for demonstration
        shelters.value = [
          {
            _id: "1",
            name: "Downtown Emergency Shelter",
            description: "Large capacity emergency shelter in downtown area",
            type: "emergency",
            status: "active",
            capacity: { current: 85, total: 150 },
            location: { address: { street: "123 Main St, Downtown" } },
            contact: { phone: "(555) 123-4567" },
          },
          {
            _id: "2",
            name: "Community Center Temporary Housing",
            description:
              "Converted community center providing temporary shelter",
            type: "temporary",
            status: "active",
            capacity: { current: 45, total: 80 },
            location: { address: { street: "456 Community Ave" } },
            contact: { phone: "(555) 987-6543" },
          },
          {
            _id: "3",
            name: "Riverside Evacuation Center",
            description: "Primary evacuation center for flood emergencies",
            type: "evacuation_center",
            status: "full",
            capacity: { current: 200, total: 200 },
            location: { address: { street: "789 River Road" } },
            contact: { phone: "(555) 456-7890" },
          },
        ];

        stats.value = {
          total: 3,
          availableBeds: 195,
          currentOccupants: 330,
          atCapacity: 1,
        };
      } finally {
        loading.value = false;
      }
    };

    const toggleView = () => {
      viewMode.value = viewMode.value === "grid" ? "list" : "grid";
    };

    const clearFilters = () => {
      Object.assign(filters, {
        search: "",
        type: "",
        status: "",
        availability: "",
      });
    };

    const viewShelterDetails = (shelter) => {
      notificationStore.showInfo(
        `Detailed view for ${shelter.name} will be available soon`,
        {
          title: "Shelter Details",
        }
      );
    };

    const manageShelter = (shelter) => {
      notificationStore.showInfo(
        `Management interface for ${shelter.name} will be available soon`,
        {
          title: "Shelter Management",
        }
      );
    };

    const getOccupancyPercentage = (shelter) => {
      if (!shelter.capacity?.total) return 0;
      return Math.round(
        (shelter.capacity.current / shelter.capacity.total) * 100
      );
    };

    const getStatusClass = (status) => {
      const classes = {
        active: "bg-green-100 text-green-800",
        full: "bg-red-100 text-red-800",
        maintenance: "bg-yellow-100 text-yellow-800",
        closed: "bg-gray-100 text-gray-800",
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };

    const getCapacityBarClass = (percentage) => {
      if (percentage >= 90) return "bg-red-500";
      if (percentage >= 70) return "bg-yellow-500";
      return "bg-green-500";
    };

    onMounted(() => {
      fetchShelters();
    });

    return {
      showAddModal,
      loading,
      viewMode,
      shelters,
      stats,
      filters,
      filteredShelters,
      toggleView,
      clearFilters,
      viewShelterDetails,
      manageShelter,
      getOccupancyPercentage,
      getStatusClass,
      getCapacityBarClass,
    };
  },
};
</script>
