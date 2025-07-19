import { defineStore } from "pinia";

// Mock user data for static prototype
const mockUsers = {
  admin: {
    id: 1,
    firstName: "John",
    lastName: "Administrator",
    email: "admin@crisisiq.com",
    role: "admin",
    phone: "+1-555-0101",
    currentLocation: {
      latitude: 40.7128,
      longitude: -74.006,
      address: "New York, NY",
    },
    joinedAt: "2024-01-15T10:00:00Z",
    isVerified: true,
  },
  coordinator: {
    id: 2,
    firstName: "Sarah",
    lastName: "Coordinator",
    email: "coordinator@crisisiq.com",
    role: "coordinator",
    phone: "+1-555-0102",
    currentLocation: {
      latitude: 40.758,
      longitude: -73.9855,
      address: "Manhattan, NY",
    },
    joinedAt: "2024-01-20T14:30:00Z",
    isVerified: true,
  },
  volunteer: {
    id: 3,
    firstName: "Mike",
    lastName: "Volunteer",
    email: "volunteer@crisisiq.com",
    role: "volunteer",
    phone: "+1-555-0103",
    currentLocation: {
      latitude: 40.6782,
      longitude: -73.9442,
      address: "Brooklyn, NY",
    },
    skills: ["First Aid", "Search & Rescue", "Communication"],
    availability: "weekends",
    joinedAt: "2024-02-01T09:15:00Z",
    isVerified: true,
  },
  citizen: {
    id: 4,
    firstName: "Emma",
    lastName: "Citizen",
    email: "citizen@crisisiq.com",
    role: "citizen",
    phone: "+1-555-0104",
    currentLocation: {
      latitude: 40.7282,
      longitude: -73.7949,
      address: "Queens, NY",
    },
    joinedAt: "2024-02-10T16:45:00Z",
    isVerified: false,
  },
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: mockUsers.admin, // Default to admin for demo
    token: "mock-jwt-token-12345",
    isLoading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    userRole: (state) => state.user?.role,
    userName: (state) =>
      state.user ? `${state.user.firstName} ${state.user.lastName}` : "",
    isAdmin: (state) => state.user?.role === "admin",
    isCoordinator: (state) => state.user?.role === "coordinator",
    isVolunteer: (state) => state.user?.role === "volunteer",
    isCitizen: (state) => state.user?.role === "citizen",
  },

  actions: {
    // Mock login - switches between different user roles for demo
    async login(credentials) {
      this.isLoading = true;
      this.error = null;

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock authentication based on email
        const userRole = credentials.email.split("@")[0];
        const user = mockUsers[userRole] || mockUsers.citizen;

        this.user = user;
        this.token = `mock-jwt-token-${user.id}`;

        return { success: true, user };
      } catch (error) {
        this.error = "Login failed";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Mock registration
    async register(userData) {
      this.isLoading = true;
      this.error = null;

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Create mock user from registration data
        const newUser = {
          id: Date.now(),
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          role: userData.role || "citizen",
          phone: userData.phone,
          currentLocation: userData.location || {
            latitude: 40.7128,
            longitude: -74.006,
            address: "New York, NY",
          },
          joinedAt: new Date().toISOString(),
          isVerified: false,
        };

        this.user = newUser;
        this.token = `mock-jwt-token-${newUser.id}`;

        return { success: true, user: newUser };
      } catch (error) {
        this.error = "Registration failed";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Mock user fetch
    async fetchUser() {
      // User is already available in state
      return this.user;
    },

    // Mock profile update
    async updateProfile(profileData) {
      this.isLoading = true;
      this.error = null;

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Update user data
        this.user = { ...this.user, ...profileData };

        return this.user;
      } catch (error) {
        this.error = "Profile update failed";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Mock password change
    async changePassword(passwordData) {
      this.isLoading = true;
      this.error = null;

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return { success: true, message: "Password updated successfully" };
      } catch (error) {
        this.error = "Password change failed";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Mock volunteer info update
    async updateVolunteerInfo(volunteerData) {
      if (this.user?.role !== "volunteer") {
        throw new Error("Not a volunteer account");
      }

      this.isLoading = true;
      this.error = null;

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        this.user = { ...this.user, ...volunteerData };

        return this.user;
      } catch (error) {
        this.error = "Volunteer info update failed";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Mock location update
    async updateLocation(locationData) {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (this.user) {
          this.user.currentLocation = {
            ...this.user.currentLocation,
            ...locationData,
          };
        }

        return { currentLocation: this.user?.currentLocation };
      } catch (error) {
        console.error("Location update failed:", error);
        throw error;
      }
    },

    // Mock logout
    async logout() {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
      } finally {
        this.user = null;
        this.token = null;
        this.error = null;
      }
    },

    // Quick role switch for demo purposes
    switchToRole(role) {
      const user = mockUsers[role];
      if (user) {
        this.user = user;
        this.token = `mock-jwt-token-${user.id}`;
      }
    },

    // Clear error
    clearError() {
      this.error = null;
    },

    // Check if user has permission
    hasPermission(requiredRole) {
      if (!this.user) return false;

      const roleHierarchy = {
        citizen: 1,
        volunteer: 2,
        coordinator: 3,
        admin: 4,
      };

      const userLevel = roleHierarchy[this.user.role] || 0;
      const requiredLevel = roleHierarchy[requiredRole] || 0;

      return userLevel >= requiredLevel;
    },

    // Check if user can access resource
    canAccess(resource, action = "read") {
      if (!this.user) return false;

      // Admin can do everything
      if (this.user.role === "admin") return true;

      // Define permissions based on role and resource
      const permissions = {
        citizen: {
          incidents: ["read", "create"],
          shelters: ["read"],
          resources: ["read"],
          messages: ["read", "create"],
          profile: ["read", "update"],
        },
        volunteer: {
          incidents: ["read", "create", "update"],
          tasks: ["read", "update"],
          shelters: ["read"],
          resources: ["read", "request"],
          messages: ["read", "create"],
          profile: ["read", "update"],
        },
        coordinator: {
          incidents: ["read", "create", "update", "assign", "verify"],
          tasks: ["read", "create", "update", "assign"],
          shelters: ["read", "create", "update"],
          resources: ["read", "create", "update", "allocate"],
          messages: ["read", "create", "broadcast"],
          users: ["read", "update"],
          profile: ["read", "update"],
        },
      };

      const userPermissions = permissions[this.user.role] || {};
      const resourcePermissions = userPermissions[resource] || [];

      return resourcePermissions.includes(action);
    },
  },
});
