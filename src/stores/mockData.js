import { defineStore } from "pinia";

// Mock data for the disaster relief platform prototype
export const useMockDataStore = defineStore("mockData", {
  state: () => ({
    // Dashboard data
    dashboardStats: {
      activeIncidents: 12,
      activeVolunteers: 45,
      availableShelters: 8,
      resourcesAvailable: 156,
      totalEvacuees: 234,
      emergencyContacts: 15,
    },

    // Incidents data
    incidents: [
      {
        id: 1,
        title: "Flash Flood in Downtown",
        type: "flood",
        severity: "high",
        status: "active",
        location: {
          latitude: 40.7128,
          longitude: -74.006,
          address: "Downtown Manhattan, NY",
        },
        description:
          "Heavy rainfall causing flash floods in downtown area. Multiple buildings affected.",
        reportedAt: "2024-03-15T10:30:00Z",
        assignedTo: "Mike Volunteer",
        volunteers: 8,
        evacuees: 45,
        priority: "high",
      },
      {
        id: 2,
        title: "Building Fire - Residential Complex",
        type: "fire",
        severity: "critical",
        status: "active",
        location: {
          latitude: 40.758,
          longitude: -73.9855,
          address: "Midtown Manhattan, NY",
        },
        description:
          "Major fire outbreak in 15-story residential building. Fire department on scene.",
        reportedAt: "2024-03-15T09:15:00Z",
        assignedTo: "Sarah Coordinator",
        volunteers: 12,
        evacuees: 120,
        priority: "critical",
      },
      {
        id: 3,
        title: "Power Outage - Brooklyn Area",
        type: "power_outage",
        severity: "medium",
        status: "resolved",
        location: {
          latitude: 40.6782,
          longitude: -73.9442,
          address: "Brooklyn Heights, NY",
        },
        description:
          "Electrical grid failure affecting 500+ households. Power restored after 4 hours.",
        reportedAt: "2024-03-14T16:45:00Z",
        assignedTo: "John Administrator",
        volunteers: 5,
        evacuees: 0,
        priority: "medium",
      },
      {
        id: 4,
        title: "Medical Emergency - Subway Station",
        type: "medical_emergency",
        severity: "low",
        status: "active",
        location: {
          latitude: 40.7282,
          longitude: -73.7949,
          address: "Queens Subway Station, NY",
        },
        description:
          "Multiple injuries reported after subway incident. Medical teams dispatched.",
        reportedAt: "2024-03-15T11:20:00Z",
        assignedTo: "Emma Citizen",
        volunteers: 3,
        evacuees: 15,
        priority: "medium",
      },
    ],

    // Shelters data
    shelters: [
      {
        id: 1,
        name: "Central Emergency Shelter",
        location: {
          latitude: 40.7128,
          longitude: -74.006,
          address: "123 Main St, Manhattan, NY",
        },
        capacity: 200,
        currentOccupancy: 45,
        status: "open",
        facilities: ["Medical", "Food", "Water", "Beds", "Showers"],
        contact: "+1-555-0101",
        manager: "Sarah Coordinator",
      },
      {
        id: 2,
        name: "Brooklyn Community Center",
        location: {
          latitude: 40.6782,
          longitude: -73.9442,
          address: "456 Park Ave, Brooklyn, NY",
        },
        capacity: 150,
        currentOccupancy: 78,
        status: "open",
        facilities: ["Medical", "Food", "Water", "Beds"],
        contact: "+1-555-0102",
        manager: "Mike Volunteer",
      },
      {
        id: 3,
        name: "Queens High School Gym",
        location: {
          latitude: 40.7282,
          longitude: -73.7949,
          address: "789 School Rd, Queens, NY",
        },
        capacity: 100,
        currentOccupancy: 23,
        status: "open",
        facilities: ["Food", "Water", "Beds"],
        contact: "+1-555-0103",
        manager: "Emma Citizen",
      },
    ],

    // Resources data
    resources: [
      {
        id: 1,
        name: "Emergency Food Rations",
        type: "food",
        quantity: 500,
        unit: "packages",
        location: "Central Warehouse",
        status: "available",
        priority: "high",
        expiryDate: "2024-06-15",
      },
      {
        id: 2,
        name: "Bottled Water",
        type: "water",
        quantity: 1000,
        unit: "bottles",
        location: "Central Warehouse",
        status: "available",
        priority: "high",
        expiryDate: "2024-12-01",
      },
      {
        id: 3,
        name: "First Aid Kits",
        type: "medical",
        quantity: 50,
        unit: "kits",
        location: "Medical Supply Center",
        status: "low_stock",
        priority: "critical",
        expiryDate: "2024-08-20",
      },
      {
        id: 4,
        name: "Emergency Blankets",
        type: "shelter",
        quantity: 200,
        unit: "blankets",
        location: "Central Warehouse",
        status: "available",
        priority: "medium",
        expiryDate: "2025-01-15",
      },
      {
        id: 5,
        name: "Portable Generators",
        type: "equipment",
        quantity: 8,
        unit: "units",
        location: "Equipment Depot",
        status: "available",
        priority: "high",
        expiryDate: null,
      },
    ],

    // Tasks data
    tasks: [
      {
        id: 1,
        title: "Distribute Food Rations",
        description:
          "Distribute emergency food packages to affected families in downtown area",
        status: "in_progress",
        priority: "high",
        assignedTo: "Mike Volunteer",
        location: "Downtown Manhattan",
        dueDate: "2024-03-15T18:00:00Z",
        progress: 60,
      },
      {
        id: 2,
        title: "Medical Assessment",
        description:
          "Conduct medical assessments for evacuees at Central Emergency Shelter",
        status: "assigned",
        priority: "critical",
        assignedTo: "Sarah Coordinator",
        location: "Central Emergency Shelter",
        dueDate: "2024-03-15T16:00:00Z",
        progress: 0,
      },
      {
        id: 3,
        title: "Shelter Setup",
        description:
          "Set up additional sleeping areas at Brooklyn Community Center",
        status: "completed",
        priority: "medium",
        assignedTo: "Emma Citizen",
        location: "Brooklyn Community Center",
        dueDate: "2024-03-15T14:00:00Z",
        progress: 100,
      },
      {
        id: 4,
        title: "Resource Inventory",
        description: "Conduct inventory check of all emergency supplies",
        status: "pending",
        priority: "low",
        assignedTo: "John Administrator",
        location: "Central Warehouse",
        dueDate: "2024-03-16T12:00:00Z",
        progress: 0,
      },
    ],

    // Messages data
    messages: [
      {
        id: 1,
        sender: {
          id: 2,
          firstName: "Sarah",
          lastName: "Coordinator",
          role: "coordinator",
        },
        content:
          "Emergency meeting at 2 PM today. All coordinators required to attend.",
        timestamp: "2024-03-15T10:00:00Z",
        type: "broadcast",
        read: false,
      },
      {
        id: 2,
        sender: {
          id: 3,
          firstName: "Mike",
          lastName: "Volunteer",
          role: "volunteer",
        },
        content:
          "Food distribution completed at downtown location. Need more supplies.",
        timestamp: "2024-03-15T09:30:00Z",
        type: "direct",
        read: true,
      },
      {
        id: 3,
        sender: {
          id: 4,
          firstName: "Emma",
          lastName: "Citizen",
          role: "citizen",
        },
        content:
          "Reporting power outage in Queens area. Multiple households affected.",
        timestamp: "2024-03-15T08:45:00Z",
        type: "emergency",
        read: false,
      },
    ],

    // Weather alerts
    weatherAlerts: [
      {
        id: 1,
        type: "severe_weather",
        title: "Heavy Rainfall Warning",
        message:
          "Heavy rainfall expected in the next 24 hours. Risk of flooding in low-lying areas.",
        severity: "warning",
        timestamp: "2024-03-15T12:00:00Z",
      },
    ],

    // Emergency contacts
    emergencyContacts: [
      {
        id: 1,
        name: "Emergency Services",
        number: "911",
        type: "emergency",
        icon: "🚑",
      },
      {
        id: 2,
        name: "Fire Department",
        number: "911",
        type: "fire",
        icon: "🚒",
      },
      {
        id: 3,
        name: "Police Department",
        number: "911",
        type: "police",
        icon: "👮",
      },
      {
        id: 4,
        name: "Hospital",
        number: "+1-555-0123",
        type: "medical",
        icon: "🏥",
      },
    ],
  }),

  getters: {
    // Dashboard getters
    getDashboardStats: (state) => state.dashboardStats,

    // Incidents getters
    getActiveIncidents: (state) =>
      state.incidents.filter((i) => i.status === "active"),
    getIncidentById: (state) => (id) =>
      state.incidents.find((i) => i.id === id),
    getIncidentsByType: (state) => (type) =>
      state.incidents.filter((i) => i.type === type),

    // Shelters getters
    getOpenShelters: (state) =>
      state.shelters.filter((s) => s.status === "open"),
    getShelterById: (state) => (id) => state.shelters.find((s) => s.id === id),

    // Resources getters
    getAvailableResources: (state) =>
      state.resources.filter((r) => r.status === "available"),
    getLowStockResources: (state) =>
      state.resources.filter((r) => r.status === "low_stock"),
    getResourceById: (state) => (id) =>
      state.resources.find((r) => r.id === id),

    // Tasks getters
    getActiveTasks: (state) =>
      state.tasks.filter((t) => t.status !== "completed"),
    getTaskById: (state) => (id) => state.tasks.find((t) => t.id === id),
    getTasksByStatus: (state) => (status) =>
      state.tasks.filter((t) => t.status === status),

    // Messages getters
    getUnreadMessages: (state) => state.messages.filter((m) => !m.read),
    getMessageById: (state) => (id) => state.messages.find((m) => m.id === id),

    // Weather getters
    getActiveWeatherAlerts: (state) => state.weatherAlerts,

    // Emergency contacts getters
    getEmergencyContacts: (state) => state.emergencyContacts,
  },

  actions: {
    // Mock actions that simulate backend operations

    // Update incident status
    updateIncidentStatus(incidentId, status) {
      const incident = this.incidents.find((i) => i.id === incidentId);
      if (incident) {
        incident.status = status;
      }
    },

    // Add new incident
    addIncident(incidentData) {
      const newIncident = {
        id: Date.now(),
        ...incidentData,
        reportedAt: new Date().toISOString(),
        status: "active",
      };
      this.incidents.unshift(newIncident);
      return newIncident;
    },

    // Update task progress
    updateTaskProgress(taskId, progress) {
      const task = this.tasks.find((t) => t.id === taskId);
      if (task) {
        task.progress = progress;
        if (progress >= 100) {
          task.status = "completed";
        }
      }
    },

    // Mark message as read
    markMessageAsRead(messageId) {
      const message = this.messages.find((m) => m.id === messageId);
      if (message) {
        message.read = true;
      }
    },

    // Add new message
    addMessage(messageData) {
      const newMessage = {
        id: Date.now(),
        ...messageData,
        timestamp: new Date().toISOString(),
        read: false,
      };
      this.messages.unshift(newMessage);
      return newMessage;
    },

    // Update resource quantity
    updateResourceQuantity(resourceId, quantity) {
      const resource = this.resources.find((r) => r.id === resourceId);
      if (resource) {
        resource.quantity = quantity;
        if (quantity <= 10) {
          resource.status = "low_stock";
        } else if (quantity === 0) {
          resource.status = "out_of_stock";
        } else {
          resource.status = "available";
        }
      }
    },

    // Add new shelter
    addShelter(shelterData) {
      const newShelter = {
        id: Date.now(),
        ...shelterData,
        currentOccupancy: 0,
        status: "open",
      };
      this.shelters.push(newShelter);
      return newShelter;
    },

    // Update shelter occupancy
    updateShelterOccupancy(shelterId, occupancy) {
      const shelter = this.shelters.find((s) => s.id === shelterId);
      if (shelter) {
        shelter.currentOccupancy = occupancy;
        if (occupancy >= shelter.capacity) {
          shelter.status = "full";
        } else {
          shelter.status = "open";
        }
      }
    },
  },
});
