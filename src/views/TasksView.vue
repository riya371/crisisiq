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
              Task Management
            </h1>
            <p class="text-gray-600">
              Coordinate volunteer tasks and track progress
            </p>
          </div>
          <div class="mt-4 md:mt-0 flex space-x-3">
            <button
              @click="showCreateModal = true"
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
              <span>Create Task</span>
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
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                ></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Tasks</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
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
              <p class="text-sm font-medium text-gray-600">Pending</p>
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
              <p class="text-sm font-medium text-gray-600">In Progress</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ stats.inProgress }}
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
              <p class="text-sm font-medium text-gray-600">Completed</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ stats.completed }}
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
              placeholder="Search tasks..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Priority</label
            >
            <select
              v-model="filters.priority"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
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
              <option value="search_rescue">Search & Rescue</option>
              <option value="medical">Medical</option>
              <option value="logistics">Logistics</option>
              <option value="communication">Communication</option>
              <option value="relief_distribution">Relief Distribution</option>
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

      <!-- Board View -->
      <div
        v-if="viewMode === 'board'"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="status in taskStatuses"
          :key="status.value"
          class="bg-gray-100 rounded-lg p-4"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-900">{{ status.label }}</h3>
            <span class="bg-white text-gray-600 text-sm px-2 py-1 rounded">
              {{ getTasksByStatus(status.value).length }}
            </span>
          </div>

          <div class="space-y-3">
            <div
              v-for="task in getTasksByStatus(status.value)"
              :key="task._id"
              class="bg-white rounded-lg p-4 shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
              @click="viewTaskDetails(task)"
            >
              <div class="flex items-start justify-between mb-2">
                <h4 class="font-medium text-gray-900 text-sm">
                  {{ task.title }}
                </h4>
                <span
                  :class="getPriorityClass(task.priority)"
                  class="px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ task.priority }}
                </span>
              </div>

              <p class="text-gray-600 text-sm mb-3 line-clamp-2">
                {{ task.description }}
              </p>

              <div
                class="flex items-center space-x-2 text-xs text-gray-500 mb-3"
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{{ formatDate(task.schedule?.endDate) }}</span>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex -space-x-2">
                  <div
                    v-for="(assignment, index) in task.assignedTo?.slice(0, 3)"
                    :key="assignment._id"
                    class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs border-2 border-white"
                  >
                    {{ assignment.volunteer?.firstName?.charAt(0) || "V" }}
                  </div>
                  <div
                    v-if="task.assignedTo?.length > 3"
                    class="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs border-2 border-white"
                  >
                    +{{ task.assignedTo.length - 3 }}
                  </div>
                </div>

                <span
                  :class="getCategoryClass(task.category)"
                  class="px-2 py-1 text-xs font-medium rounded"
                >
                  {{ task.category }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- List View -->
      <div v-else class="bg-white rounded-lg shadow-sm border">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Tasks List</h2>
        </div>

        <div v-if="loading" class="p-8 text-center">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
          ></div>
          <p class="mt-4 text-gray-600">Loading tasks...</p>
        </div>

        <div v-else-if="filteredTasks.length === 0" class="p-8 text-center">
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
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            ></path>
          </svg>
          <p class="text-gray-600">No tasks found</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Task
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Priority
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Assigned To
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Due Date
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
                v-for="task in filteredTasks"
                :key="task._id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">
                      {{ task.title }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ task.description }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="getPriorityClass(task.priority)"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  >
                    {{ task.priority }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="getStatusClass(task.status)"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  >
                    {{ task.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex -space-x-1">
                    <div
                      v-for="assignment in task.assignedTo?.slice(0, 3)"
                      :key="assignment._id"
                      class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs"
                      :title="
                        assignment.volunteer?.firstName +
                        ' ' +
                        assignment.volunteer?.lastName
                      "
                    >
                      {{ assignment.volunteer?.firstName?.charAt(0) || "V" }}
                    </div>
                    <div
                      v-if="task.assignedTo?.length > 3"
                      class="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs"
                    >
                      +{{ task.assignedTo.length - 3 }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(task.schedule?.endDate) }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <div class="flex space-x-2">
                    <button
                      @click="viewTaskDetails(task)"
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
                      @click="editTask(task)"
                      class="text-green-600 hover:text-green-900 transition-colors"
                      title="Edit Task"
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

    <!-- Create Task Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-lg w-full">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900">Create New Task</h2>
            <button
              @click="showCreateModal = false"
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
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            ></path>
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            Task Management System
          </h3>
          <p class="text-gray-600 mb-6">
            Complete task creation and assignment features will be available
            soon.
          </p>
          <button
            @click="showCreateModal = false"
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
  name: "TasksView",
  setup() {
    const authStore = useAuthStore();
    const notificationStore = useNotificationStore();

    const showCreateModal = ref(false);
    const loading = ref(false);
    const viewMode = ref("board");

    const tasks = ref([]);
    const stats = ref({
      total: 0,
      pending: 0,
      inProgress: 0,
      completed: 0,
      overdue: 0,
    });

    const filters = reactive({
      search: "",
      status: "",
      priority: "",
      category: "",
    });

    const taskStatuses = [
      { value: "pending", label: "Pending" },
      { value: "in-progress", label: "In Progress" },
      { value: "completed", label: "Completed" },
      { value: "cancelled", label: "Cancelled" },
    ];

    const filteredTasks = computed(() => {
      return tasks.value.filter((task) => {
        const matchesSearch =
          !filters.search ||
          task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          task.description.toLowerCase().includes(filters.search.toLowerCase());

        const matchesStatus = !filters.status || task.status === filters.status;
        const matchesPriority =
          !filters.priority || task.priority === filters.priority;
        const matchesCategory =
          !filters.category || task.category === filters.category;

        return (
          matchesSearch && matchesStatus && matchesPriority && matchesCategory
        );
      });
    });

    const fetchTasks = async () => {
      loading.value = true;
      try {
        const response = await axios.get("/tasks", {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        tasks.value = response.data || [];

        // Calculate stats
        stats.value = {
          total: tasks.value.length,
          pending: tasks.value.filter((t) => t.status === "pending").length,
          inProgress: tasks.value.filter((t) => t.status === "in-progress")
            .length,
          completed: tasks.value.filter((t) => t.status === "completed").length,
          overdue: tasks.value.filter(
            (t) =>
              new Date(t.schedule?.endDate) < new Date() &&
              t.status !== "completed"
          ).length,
        };
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        // Mock data for demonstration
        tasks.value = [
          {
            _id: "1",
            title: "Search and Rescue Team Alpha",
            description: "Coordinate search operations in downtown district",
            status: "in-progress",
            priority: "urgent",
            category: "search_rescue",
            schedule: { endDate: "2024-01-20T18:00:00Z" },
            assignedTo: [
              { _id: "1", volunteer: { firstName: "John", lastName: "Doe" } },
              { _id: "2", volunteer: { firstName: "Jane", lastName: "Smith" } },
            ],
          },
          {
            _id: "2",
            title: "Medical Supply Distribution",
            description: "Distribute medical supplies to evacuation centers",
            status: "pending",
            priority: "high",
            category: "medical",
            schedule: { endDate: "2024-01-21T12:00:00Z" },
            assignedTo: [
              {
                _id: "3",
                volunteer: { firstName: "Mike", lastName: "Johnson" },
              },
            ],
          },
          {
            _id: "3",
            title: "Communication Hub Setup",
            description: "Establish communication relay points",
            status: "completed",
            priority: "medium",
            category: "communication",
            schedule: { endDate: "2024-01-19T16:00:00Z" },
            assignedTo: [
              {
                _id: "4",
                volunteer: { firstName: "Sarah", lastName: "Wilson" },
              },
            ],
          },
        ];

        stats.value = {
          total: 3,
          pending: 1,
          inProgress: 1,
          completed: 1,
          overdue: 0,
        };
      } finally {
        loading.value = false;
      }
    };

    const toggleView = () => {
      viewMode.value = viewMode.value === "board" ? "list" : "board";
    };

    const clearFilters = () => {
      Object.assign(filters, {
        search: "",
        status: "",
        priority: "",
        category: "",
      });
    };

    const getTasksByStatus = (status) => {
      return filteredTasks.value.filter((task) => task.status === status);
    };

    const viewTaskDetails = (task) => {
      notificationStore.showInfo(
        `Detailed view for "${task.title}" will be available soon`,
        {
          title: "Task Details",
        }
      );
    };

    const editTask = (task) => {
      notificationStore.showInfo(
        `Task editing for "${task.title}" will be available soon`,
        {
          title: "Edit Task",
        }
      );
    };

    const getPriorityClass = (priority) => {
      const classes = {
        low: "bg-gray-100 text-gray-800",
        medium: "bg-blue-100 text-blue-800",
        high: "bg-orange-100 text-orange-800",
        urgent: "bg-red-100 text-red-800",
      };
      return classes[priority] || "bg-gray-100 text-gray-800";
    };

    const getStatusClass = (status) => {
      const classes = {
        pending: "bg-yellow-100 text-yellow-800",
        "in-progress": "bg-blue-100 text-blue-800",
        completed: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };

    const getCategoryClass = (category) => {
      const classes = {
        search_rescue: "bg-red-100 text-red-800",
        medical: "bg-green-100 text-green-800",
        logistics: "bg-blue-100 text-blue-800",
        communication: "bg-purple-100 text-purple-800",
        relief_distribution: "bg-orange-100 text-orange-800",
      };
      return classes[category] || "bg-gray-100 text-gray-800";
    };

    const formatDate = (dateString) => {
      if (!dateString) return "No due date";
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    onMounted(() => {
      fetchTasks();
    });

    return {
      showCreateModal,
      loading,
      viewMode,
      tasks,
      stats,
      filters,
      taskStatuses,
      filteredTasks,
      toggleView,
      clearFilters,
      getTasksByStatus,
      viewTaskDetails,
      editTask,
      getPriorityClass,
      getStatusClass,
      getCategoryClass,
      formatDate,
    };
  },
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
