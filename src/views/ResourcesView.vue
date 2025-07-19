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
              Resource Management
            </h1>
            <p class="text-gray-600">
              Track and manage disaster relief resources and supplies
            </p>
          </div>
          <div class="mt-4 md:mt-0 flex space-x-3">
            <button
              @click="showAddModal = true"
              class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
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
              <span>Add Resource</span>
            </button>
            <button
              @click="showRequestModal = true"
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>Request Resources</span>
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
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                ></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Resources</p>
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
              <p class="text-sm font-medium text-gray-600">Available</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ stats.available }}
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">In Transit</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ stats.inTransit }}
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
              <p class="text-sm font-medium text-gray-600">Low Stock</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ stats.lowStock }}
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
              placeholder="Search resources..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Category</label
            >
            <select
              v-model="filters.category"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option value="food">Food & Water</option>
              <option value="medical">Medical Supplies</option>
              <option value="shelter">Shelter Materials</option>
              <option value="clothing">Clothing</option>
              <option value="equipment">Equipment</option>
              <option value="other">Other</option>
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
              <option value="available">Available</option>
              <option value="allocated">Allocated</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="expired">Expired</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Location</label
            >
            <input
              v-model="filters.location"
              type="text"
              placeholder="Filter by location..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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

      <!-- Resources List -->
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">
            Resources Inventory
          </h2>
        </div>

        <div v-if="loading" class="p-8 text-center">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
          ></div>
          <p class="mt-4 text-gray-600">Loading resources...</p>
        </div>

        <div v-else-if="filteredResources.length === 0" class="p-8 text-center">
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
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            ></path>
          </svg>
          <p class="text-gray-600">No resources found</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Resource
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Location
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Expiry
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
                v-for="resource in filteredResources"
                :key="resource._id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div
                        class="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center"
                      >
                        <svg
                          class="w-6 h-6 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ resource.name }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ resource.description }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                  >
                    {{ resource.category }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ resource.quantity.current }} /
                    {{ resource.quantity.total }}
                  </div>
                  <div class="text-sm text-gray-500">{{ resource.unit }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="getStatusClass(resource.status)"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  >
                    {{ resource.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ resource.location?.address || "Not specified" }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span
                    v-if="resource.expiryDate"
                    :class="getExpiryClass(resource.expiryDate)"
                  >
                    {{ formatDate(resource.expiryDate) }}
                  </span>
                  <span v-else class="text-gray-400">No expiry</span>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <div class="flex space-x-2">
                    <button
                      @click="allocateResource(resource)"
                      class="text-blue-600 hover:text-blue-900 transition-colors"
                      title="Allocate Resource"
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
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                        ></path>
                      </svg>
                    </button>
                    <button
                      @click="editResource(resource)"
                      class="text-green-600 hover:text-green-900 transition-colors"
                      title="Edit Resource"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
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

    <!-- Add Resource Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto"
      >
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900">
              Add New Resource
            </h2>
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

        <form @submit.prevent="submitResource" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Resource Name</label
              >
              <input
                v-model="newResource.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter resource name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Category</label
              >
              <select
                v-model="newResource.category"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select category</option>
                <option value="food">Food & Water</option>
                <option value="medical">Medical Supplies</option>
                <option value="shelter">Shelter Materials</option>
                <option value="clothing">Clothing</option>
                <option value="equipment">Equipment</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Description</label
            >
            <textarea
              v-model="newResource.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe the resource"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Quantity</label
              >
              <input
                v-model.number="newResource.quantity.total"
                type="number"
                min="1"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Total quantity"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Unit</label
              >
              <input
                v-model="newResource.unit"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., boxes, liters, pieces"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Priority</label
              >
              <select
                v-model="newResource.priority"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Location</label
              >
              <input
                v-model="newResource.location.address"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Storage location"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Expiry Date (optional)</label
              >
              <input
                v-model="newResource.expiryDate"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="showAddModal = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="submitting">Adding...</span>
              <span v-else>Add Resource</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Request Resources Modal -->
    <div
      v-if="showRequestModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-lg w-full">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900">
              Request Resources
            </h2>
            <button
              @click="showRequestModal = false"
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
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            Resource Request System
          </h3>
          <p class="text-gray-600 mb-6">
            This feature will allow you to request resources from other
            organizations and coordinate resource sharing.
          </p>
          <button
            @click="showRequestModal = false"
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
  name: "ResourcesView",
  setup() {
    const authStore = useAuthStore();
    const notificationStore = useNotificationStore();

    const showAddModal = ref(false);
    const showRequestModal = ref(false);
    const submitting = ref(false);
    const loading = ref(false);

    const resources = ref([]);
    const stats = ref({
      total: 0,
      available: 0,
      inTransit: 0,
      lowStock: 0,
    });

    const filters = reactive({
      search: "",
      category: "",
      status: "",
      location: "",
    });

    const newResource = reactive({
      name: "",
      category: "",
      description: "",
      quantity: {
        total: 1,
        current: 0,
      },
      unit: "",
      priority: "medium",
      location: {
        address: "",
      },
      expiryDate: "",
    });

    const filteredResources = computed(() => {
      return resources.value.filter((resource) => {
        const matchesSearch =
          !filters.search ||
          resource.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          resource.description
            .toLowerCase()
            .includes(filters.search.toLowerCase());

        const matchesCategory =
          !filters.category || resource.category === filters.category;
        const matchesStatus =
          !filters.status || resource.status === filters.status;
        const matchesLocation =
          !filters.location ||
          resource.location?.address
            ?.toLowerCase()
            .includes(filters.location.toLowerCase());

        return (
          matchesSearch && matchesCategory && matchesStatus && matchesLocation
        );
      });
    });

    const fetchResources = async () => {
      loading.value = true;
      try {
        const response = await axios.get("/resources", {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        resources.value = response.data || [];

        // Update stats
        stats.value = {
          total: resources.value.length,
          available: resources.value.filter((r) => r.status === "available")
            .length,
          inTransit: resources.value.filter((r) => r.status === "in-transit")
            .length,
          lowStock: resources.value.filter(
            (r) => r.quantity.current < r.quantity.total * 0.2
          ).length,
        };
      } catch (error) {
        console.error("Failed to fetch resources:", error);
        // Create mock data for demonstration
        resources.value = [
          {
            _id: "1",
            name: "Emergency Food Kits",
            category: "food",
            description: "Ready-to-eat meal packages for disaster victims",
            quantity: { total: 500, current: 450 },
            unit: "boxes",
            status: "available",
            priority: "high",
            location: { address: "Warehouse A, District 1" },
            expiryDate: "2024-12-31",
          },
          {
            _id: "2",
            name: "Medical First Aid Kits",
            category: "medical",
            description: "Complete first aid supplies for emergency response",
            quantity: { total: 200, current: 180 },
            unit: "kits",
            status: "available",
            priority: "critical",
            location: { address: "Medical Center, Zone 3" },
            expiryDate: null,
          },
          {
            _id: "3",
            name: "Emergency Blankets",
            category: "shelter",
            description: "Thermal blankets for emergency shelter",
            quantity: { total: 1000, current: 850 },
            unit: "pieces",
            status: "available",
            priority: "medium",
            location: { address: "Relief Center, Downtown" },
            expiryDate: null,
          },
        ];

        stats.value = {
          total: 3,
          available: 3,
          inTransit: 0,
          lowStock: 0,
        };
      } finally {
        loading.value = false;
      }
    };

    const submitResource = async () => {
      submitting.value = true;
      try {
        // Set current quantity to total initially
        newResource.quantity.current = newResource.quantity.total;

        await axios.post("/resources", newResource, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        notificationStore.showSuccess(
          "Resource has been added to inventory successfully",
          {
            title: "Resource Added",
          }
        );

        showAddModal.value = false;
        resetNewResource();
        fetchResources();
      } catch (error) {
        notificationStore.showError(
          error.response?.data?.error || "Failed to add resource",
          {
            title: "Error",
          }
        );
      } finally {
        submitting.value = false;
      }
    };

    const resetNewResource = () => {
      Object.assign(newResource, {
        name: "",
        category: "",
        description: "",
        quantity: { total: 1, current: 0 },
        unit: "",
        priority: "medium",
        location: { address: "" },
        expiryDate: "",
      });
    };

    const clearFilters = () => {
      Object.assign(filters, {
        search: "",
        category: "",
        status: "",
        location: "",
      });
    };

    const allocateResource = (resource) => {
      console.log("Allocate resource:", resource);
      notificationStore.showInfo(
        "Resource allocation feature will be available soon",
        {
          title: "Feature Coming Soon",
        }
      );
    };

    const editResource = (resource) => {
      console.log("Edit resource:", resource);
      notificationStore.showInfo(
        "Resource editing feature will be available soon",
        {
          title: "Feature Coming Soon",
        }
      );
    };

    const getStatusClass = (status) => {
      const classes = {
        available: "bg-green-100 text-green-800",
        allocated: "bg-blue-100 text-blue-800",
        "in-transit": "bg-yellow-100 text-yellow-800",
        delivered: "bg-purple-100 text-purple-800",
        expired: "bg-red-100 text-red-800",
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };

    const getExpiryClass = (expiryDate) => {
      const today = new Date();
      const expiry = new Date(expiryDate);
      const daysUntilExpiry = Math.ceil(
        (expiry - today) / (1000 * 60 * 60 * 24)
      );

      if (daysUntilExpiry < 0) return "text-red-600 font-semibold";
      if (daysUntilExpiry <= 7) return "text-orange-600 font-semibold";
      if (daysUntilExpiry <= 30) return "text-yellow-600";
      return "text-gray-900";
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    onMounted(() => {
      fetchResources();
    });

    return {
      showAddModal,
      showRequestModal,
      submitting,
      loading,
      resources,
      stats,
      filters,
      newResource,
      filteredResources,
      submitResource,
      resetNewResource,
      clearFilters,
      allocateResource,
      editResource,
      getStatusClass,
      getExpiryClass,
      formatDate,
    };
  },
};
</script>
