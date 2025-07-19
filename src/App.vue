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
const emergencyAlert = ref(null);
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

// Lifecycle hooks
onMounted(() => {
  // Demo emergency alert after 10 seconds
  setTimeout(showDemoEmergencyAlert, 10000);

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    // Close user menu if clicking outside
    if (!e.target.closest('[data-user-menu]')) {
      userMenuOpen.value = false;
    }
    
    // Close mobile menu if clicking outside
    if (
      !e.target.closest('[data-mobile-menu]') &&
      !e.target.closest('[data-mobile-button]')
    ) {
      mobileMenuOpen.value = false;
    }
  });
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation Header -->
    <header v-if="isAuthenticated" class="sticky top-0 z-40 bg-white border-b border-gray-200">
      <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <!-- Logo -->
          <div class="flex items-center">
            <router-link to="/" class="flex items-center gap-2">
              <span class="text-2xl">🚨</span>
              <span class="text-xl font-bold text-gray-900">CrisisIQ</span>
            </router-link>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex md:items-center md:space-x-6">
            <router-link 
              to="/dashboard" 
              class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              :class="{ 'bg-gray-100': $route.path === '/dashboard' }"
            >
              <span>📊</span>
              <span>Dashboard</span>
            </router-link>

            <router-link 
              to="/incidents" 
              class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              :class="{ 'bg-gray-100': $route.path === '/incidents' }"
            >
              <span>🚨</span>
              <span>Incidents</span>
            </router-link>

            <router-link 
              to="/map" 
              class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              :class="{ 'bg-gray-100': $route.path === '/map' }"
            >
              <span>🗺️</span>
              <span>Map</span>
            </router-link>

            <router-link 
              v-if="userRole !== 'citizen'"
              to="/resources" 
              class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              :class="{ 'bg-gray-100': $route.path === '/resources' }"
            >
              <span>📦</span>
              <span>Resources</span>
            </router-link>

            <router-link 
              to="/shelters" 
              class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              :class="{ 'bg-gray-100': $route.path === '/shelters' }"
            >
              <span>🏠</span>
              <span>Shelters</span>
            </router-link>

            <router-link 
              v-if="userRole === 'volunteer' || userRole === 'coordinator' || userRole === 'admin'"
              to="/tasks" 
              class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              :class="{ 'bg-gray-100': $route.path === '/tasks' }"
            >
              <span>✅</span>
              <span>Tasks</span>
            </router-link>

            <router-link 
              to="/messages" 
              class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              :class="{ 'bg-gray-100': $route.path === '/messages' }"
            >
              <div class="relative">
                <span>💬</span>
                <span 
                  v-if="unreadMessages > 0"
                  class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full"
                >
                  {{ unreadMessages }}
                </span>
              </div>
              <span>Messages</span>
            </router-link>
          </div>

          <!-- User Menu -->
          <div class="relative" data-user-menu>
            <button 
              @click="toggleUserMenu"
              class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {{ user?.firstName?.charAt(0) || 'U' }}
              </div>
              <span class="hidden md:block text-sm font-medium text-gray-700">{{ user?.firstName || 'User' }}</span>
            </button>

            <!-- Dropdown Menu -->
            <div 
              v-if="userMenuOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200"
            >
              <router-link 
                to="/profile"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="userMenuOpen = false"
              >
                Profile Settings
              </router-link>
              <button 
                @click="logout"
                class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            data-mobile-button
          >
            <svg 
              class="w-6 h-6 text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                v-if="!mobileMenuOpen"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path 
                v-else
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Mobile Navigation Menu -->
        <div 
          v-if="mobileMenuOpen"
          class="md:hidden py-4 space-y-2"
          data-mobile-menu
        >
          <router-link 
            v-for="(link, index) in [
              { to: '/dashboard', icon: '📊', text: 'Dashboard' },
              { to: '/incidents', icon: '🚨', text: 'Incidents' },
              { to: '/map', icon: '🗺️', text: 'Map' },
              { to: '/resources', icon: '📦', text: 'Resources', show: userRole !== 'citizen' },
              { to: '/shelters', icon: '🏠', text: 'Shelters' },
              { to: '/tasks', icon: '✅', text: 'Tasks', show: ['volunteer', 'coordinator', 'admin'].includes(userRole) },
              { to: '/messages', icon: '💬', text: 'Messages' }
            ]"
            :key="index"
            v-show="link.show === undefined || link.show"
            :to="link.to"
            class="flex items-center gap-3 px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            :class="{ 'bg-gray-100': $route.path === link.to }"
            @click="mobileMenuOpen = false"
          >
            <span>{{ link.icon }}</span>
            <span>{{ link.text }}</span>
            <span 
              v-if="link.to === '/messages' && unreadMessages > 0"
              class="ml-auto w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full"
            >
              {{ unreadMessages }}
            </span>
          </router-link>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="relative">
      <!-- Emergency Alert -->
      <div 
        v-if="emergencyAlert"
        class="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white p-4 animate-slide-down"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-2xl">⚠️</span>
              <p class="font-medium">{{ emergencyAlert.message }}</p>
            </div>
            <button 
              @click="dismissAlert"
              class="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Router View -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes slide-down {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

.animate-slide-down {
  animation: slide-down 0.3s ease-out forwards;
}
</style>
