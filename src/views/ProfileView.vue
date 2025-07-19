<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
        <p class="text-gray-600">
          Manage your account and volunteer information
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Overview -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="text-center mb-6">
              <div
                class="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4"
              >
                {{ user?.firstName?.charAt(0) || "U"
                }}{{ user?.lastName?.charAt(0) || "" }}
              </div>
              <h2 class="text-xl font-semibold text-gray-900">
                {{ user?.firstName }} {{ user?.lastName }}
              </h2>
              <p class="text-gray-600">{{ user?.email }}</p>
              <span
                :class="getRoleClass(user?.role)"
                class="inline-block px-3 py-1 text-sm font-medium rounded-full mt-2"
              >
                {{ formatRole(user?.role) }}
              </span>
            </div>

            <!-- Quick Stats -->
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Member Since</span>
                <span class="text-sm font-medium text-gray-900">{{
                  formatDate(user?.createdAt)
                }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Last Active</span>
                <span class="text-sm font-medium text-gray-900">{{
                  formatDate(user?.lastLogin)
                }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Status</span>
                <span
                  class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800"
                >
                  <div class="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                  Active
                </span>
              </div>
            </div>

            <!-- Volunteer Stats (if volunteer) -->
            <div
              v-if="user?.role === 'volunteer'"
              class="mt-6 pt-6 border-t border-gray-200"
            >
              <h3 class="text-sm font-semibold text-gray-900 mb-3">
                Volunteer Stats
              </h3>
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">Tasks Completed</span>
                  <span class="text-sm font-medium text-gray-900">{{
                    volunteerStats.tasksCompleted
                  }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">Hours Volunteered</span>
                  <span class="text-sm font-medium text-gray-900">{{
                    volunteerStats.hoursVolunteered
                  }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">Incidents Helped</span>
                  <span class="text-sm font-medium text-gray-900">{{
                    volunteerStats.incidentsHelped
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Tabs -->
          <div class="mb-6">
            <div class="border-b border-gray-200">
              <nav class="-mb-px flex space-x-8">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  :class="[
                    'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  ]"
                >
                  {{ tab.name }}
                </button>
              </nav>
            </div>
          </div>

          <!-- Personal Information Tab -->
          <div
            v-if="activeTab === 'personal'"
            class="bg-white rounded-lg shadow-sm border p-6"
          >
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Personal Information
            </h3>

            <form @submit.prevent="updateProfile" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >First Name</label
                  >
                  <input
                    v-model="profileForm.firstName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Last Name</label
                  >
                  <input
                    v-model="profileForm.lastName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Email</label
                >
                <input
                  v-model="profileForm.email"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Phone</label
                >
                <input
                  v-model="profileForm.phone"
                  type="tel"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Bio</label
                >
                <textarea
                  v-model="profileForm.bio"
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <!-- Volunteer Information Tab -->
          <div
            v-if="activeTab === 'volunteer' && user?.role === 'volunteer'"
            class="bg-white rounded-lg shadow-sm border p-6"
          >
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Volunteer Information
            </h3>

            <form @submit.prevent="updateVolunteerInfo" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Experience Level</label
                >
                <select
                  v-model="volunteerForm.experienceLevel"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Skills</label
                >
                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div
                    v-for="skill in availableSkills"
                    :key="skill"
                    class="flex items-center"
                  >
                    <input
                      :id="skill"
                      v-model="volunteerForm.skills"
                      :value="skill"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label :for="skill" class="ml-2 text-sm text-gray-700">{{
                      skill
                    }}</label>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Availability</label
                >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs text-gray-600 mb-1"
                      >Days Available</label
                    >
                    <div class="space-y-2">
                      <div
                        v-for="day in daysOfWeek"
                        :key="day"
                        class="flex items-center"
                      >
                        <input
                          :id="day"
                          v-model="volunteerForm.availableDays"
                          :value="day"
                          type="checkbox"
                          class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label :for="day" class="ml-2 text-sm text-gray-700">{{
                          day
                        }}</label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label class="block text-xs text-gray-600 mb-1"
                      >Time Preferences</label
                    >
                    <div class="space-y-2">
                      <div
                        v-for="time in timeSlots"
                        :key="time"
                        class="flex items-center"
                      >
                        <input
                          :id="time"
                          v-model="volunteerForm.availableTimes"
                          :value="time"
                          type="checkbox"
                          class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label :for="time" class="ml-2 text-sm text-gray-700">{{
                          time
                        }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update Volunteer Info
                </button>
              </div>
            </form>
          </div>

          <!-- Security Tab -->
          <div
            v-if="activeTab === 'security'"
            class="bg-white rounded-lg shadow-sm border p-6"
          >
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Security Settings
            </h3>

            <form @submit.prevent="updatePassword" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Current Password</label
                >
                <input
                  v-model="passwordForm.currentPassword"
                  type="password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >New Password</label
                >
                <input
                  v-model="passwordForm.newPassword"
                  type="password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Confirm New Password</label
                >
                <input
                  v-model="passwordForm.confirmPassword"
                  type="password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>

          <!-- Activity Tab -->
          <div
            v-if="activeTab === 'activity'"
            class="bg-white rounded-lg shadow-sm border p-6"
          >
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Recent Activity
            </h3>

            <div
              v-if="activities.length === 0"
              class="text-center py-8 text-gray-500"
            >
              No recent activity
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="activity in activities"
                :key="activity.id"
                class="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-b-0"
              >
                <div class="flex-shrink-0">
                  <div
                    :class="getActivityIconClass(activity.type)"
                    class="w-8 h-8 rounded-full flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        v-if="activity.type === 'task'"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      ></path>
                      <path
                        v-else-if="activity.type === 'incident'"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                      ></path>
                      <path
                        v-else
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900">
                    {{ activity.title }}
                  </p>
                  <p class="text-sm text-gray-600">
                    {{ activity.description }}
                  </p>
                  <p class="text-xs text-gray-500 mt-1">
                    {{ formatDate(activity.timestamp) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { useNotificationStore } from "../stores/notifications";

export default {
  name: "ProfileView",
  setup() {
    const authStore = useAuthStore();
    const notificationStore = useNotificationStore();

    const activeTab = ref("personal");
    const user = computed(() => authStore.user);

    const tabs = [
      { id: "personal", name: "Personal Information" },
      { id: "volunteer", name: "Volunteer Info" },
      { id: "security", name: "Security" },
      { id: "activity", name: "Activity" },
    ];

    const profileForm = reactive({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bio: "",
    });

    const volunteerForm = reactive({
      experienceLevel: "beginner",
      skills: [],
      availableDays: [],
      availableTimes: [],
    });

    const passwordForm = reactive({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    const volunteerStats = ref({
      tasksCompleted: 15,
      hoursVolunteered: 45,
      incidentsHelped: 3,
    });

    const activities = ref([
      {
        id: 1,
        type: "task",
        title: "Completed Task: Medical Supply Distribution",
        description:
          "Successfully distributed medical supplies to evacuation center",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: 2,
        type: "incident",
        title: "Responded to Emergency",
        description: "Assisted in downtown building collapse incident",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
      {
        id: 3,
        type: "profile",
        title: "Profile Updated",
        description: "Updated volunteer skills and availability",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
    ]);

    const availableSkills = [
      "First Aid/CPR",
      "Search & Rescue",
      "Emergency Communications",
      "Medical Assistance",
      "Logistics Support",
      "Translation Services",
      "IT Support",
      "Heavy Equipment Operation",
      "Shelter Management",
      "Psychological Support",
    ];

    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const timeSlots = [
      "Early Morning (6AM-9AM)",
      "Morning (9AM-12PM)",
      "Afternoon (12PM-6PM)",
      "Evening (6PM-9PM)",
      "Night (9PM-12AM)",
      "Late Night (12AM-6AM)",
    ];

    const initializeForms = () => {
      if (user.value) {
        Object.assign(profileForm, {
          firstName: user.value.firstName || "",
          lastName: user.value.lastName || "",
          email: user.value.email || "",
          phone: user.value.phone || "",
          bio: user.value.profile?.bio || "",
        });

        if (user.value.volunteerInfo) {
          Object.assign(volunteerForm, {
            experienceLevel:
              user.value.volunteerInfo.experienceLevel || "beginner",
            skills: user.value.volunteerInfo.skills || [],
            availableDays: user.value.volunteerInfo.availability?.days || [],
            availableTimes:
              user.value.volunteerInfo.availability?.timeSlots || [],
          });
        }
      }
    };

    const updateProfile = () => {
      notificationStore.showSuccess(
        "Your profile information has been updated successfully",
        {
          title: "Profile Updated",
        }
      );
    };

    const updateVolunteerInfo = () => {
      notificationStore.showSuccess(
        "Your volunteer information has been updated successfully",
        {
          title: "Volunteer Info Updated",
        }
      );
    };

    const updatePassword = () => {
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        notificationStore.showError(
          "New password and confirmation do not match",
          {
            title: "Password Mismatch",
          }
        );
        return;
      }

      notificationStore.showSuccess(
        "Your password has been changed successfully",
        {
          title: "Password Changed",
        }
      );

      Object.assign(passwordForm, {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    };

    const getRoleClass = (role) => {
      const classes = {
        citizen: "bg-gray-100 text-gray-800",
        volunteer: "bg-blue-100 text-blue-800",
        coordinator: "bg-green-100 text-green-800",
        admin: "bg-purple-100 text-purple-800",
      };
      return classes[role] || "bg-gray-100 text-gray-800";
    };

    const formatRole = (role) => {
      if (!role) return "Unknown";
      return role.charAt(0).toUpperCase() + role.slice(1);
    };

    const getActivityIconClass = (type) => {
      const classes = {
        task: "bg-blue-100 text-blue-600",
        incident: "bg-red-100 text-red-600",
        profile: "bg-green-100 text-green-600",
      };
      return classes[type] || "bg-gray-100 text-gray-600";
    };

    const formatDate = (date) => {
      if (!date) return "Unknown";
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    // Filter tabs based on user role
    const filteredTabs = computed(() => {
      if (user.value?.role !== "volunteer") {
        return tabs.filter((tab) => tab.id !== "volunteer");
      }
      return tabs;
    });

    onMounted(() => {
      initializeForms();
    });

    return {
      activeTab,
      user,
      tabs: filteredTabs,
      profileForm,
      volunteerForm,
      passwordForm,
      volunteerStats,
      activities,
      availableSkills,
      daysOfWeek,
      timeSlots,
      updateProfile,
      updateVolunteerInfo,
      updatePassword,
      getRoleClass,
      formatRole,
      getActivityIconClass,
      formatDate,
    };
  },
};
</script>
