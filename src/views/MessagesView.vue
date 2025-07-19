<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <div class="w-80 bg-white border-r border-gray-200 flex flex-col">
      <!-- Header -->
      <div class="p-4 border-b border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-xl font-bold text-gray-900">Messages</h1>
          <button
            @click="showNewMessageModal = true"
            class="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
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
          </button>
        </div>

        <!-- Search -->
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search conversations..."
            class="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
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
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="px-4 py-2 border-b border-gray-200">
        <div class="flex space-x-1">
          <button
            v-for="tab in filterTabs"
            :key="tab.value"
            @click="activeFilter = tab.value"
            :class="[
              'px-3 py-2 text-sm font-medium rounded-md transition-colors',
              activeFilter === tab.value
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
            ]"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Conversations List -->
      <div class="flex-1 overflow-y-auto">
        <div v-if="loading" class="p-4 text-center">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"
          ></div>
        </div>

        <div
          v-else-if="filteredConversations.length === 0"
          class="p-4 text-center text-gray-500"
        >
          No conversations found
        </div>

        <div v-else>
          <div
            v-for="conversation in filteredConversations"
            :key="conversation.id"
            @click="selectConversation(conversation)"
            :class="[
              'p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors',
              selectedConversation?.id === conversation.id
                ? 'bg-blue-50 border-blue-200'
                : '',
            ]"
          >
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div
                  v-if="conversation.isGroup"
                  class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold"
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <div
                  v-else
                  class="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold"
                >
                  {{ conversation.name.charAt(0) }}
                </div>
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900 truncate">
                    {{ conversation.name }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ formatTime(conversation.lastMessage?.timestamp) }}
                  </p>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-sm text-gray-600 truncate">
                    {{ conversation.lastMessage?.content || "No messages yet" }}
                  </p>
                  <div
                    v-if="conversation.unreadCount > 0"
                    class="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center"
                  >
                    {{ conversation.unreadCount }}
                  </div>
                </div>
                <div v-if="conversation.type" class="flex items-center mt-1">
                  <span
                    :class="getConversationTypeClass(conversation.type)"
                    class="px-2 py-1 text-xs font-medium rounded-full"
                  >
                    {{ conversation.type }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Chat Area -->
    <div class="flex-1 flex flex-col">
      <div
        v-if="!selectedConversation"
        class="flex-1 flex items-center justify-center bg-gray-50"
      >
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
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">
            Select a conversation
          </h3>
          <p class="text-gray-500">Choose a conversation to start messaging</p>
        </div>
      </div>

      <div v-else class="flex-1 flex flex-col">
        <!-- Chat Header -->
        <div class="bg-white border-b border-gray-200 px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div
                v-if="selectedConversation.isGroup"
                class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold"
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <div
                v-else
                class="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold"
              >
                {{ selectedConversation.name.charAt(0) }}
              </div>

              <div>
                <h2 class="text-lg font-semibold text-gray-900">
                  {{ selectedConversation.name }}
                </h2>
                <p class="text-sm text-gray-600">
                  {{
                    selectedConversation.isGroup
                      ? `${selectedConversation.memberCount} members`
                      : "Direct message"
                  }}
                </p>
              </div>
            </div>

            <div class="flex items-center space-x-2">
              <button
                @click="toggleEmergencyMode"
                :class="[
                  'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  emergencyMode
                    ? 'bg-red-100 text-red-700 border border-red-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200',
                ]"
              >
                <svg
                  class="w-4 h-4 mr-1"
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
                Emergency
              </button>
              <button
                class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
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
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Messages Area -->
        <div class="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          <div v-if="loadingMessages" class="text-center">
            <div
              class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"
            ></div>
          </div>

          <div
            v-else-if="messages.length === 0"
            class="text-center text-gray-500"
          >
            No messages in this conversation
          </div>

          <div
            v-else
            v-for="message in messages"
            :key="message.id"
            class="flex items-start space-x-3"
          >
            <div class="flex-shrink-0">
              <div
                class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold"
              >
                {{ message.sender?.firstName?.charAt(0) || "U" }}
              </div>
            </div>

            <div class="flex-1">
              <div class="flex items-center space-x-2 mb-1">
                <span class="text-sm font-medium text-gray-900">
                  {{ message.sender?.firstName }} {{ message.sender?.lastName }}
                </span>
                <span class="text-xs text-gray-500">{{
                  formatMessageTime(message.timestamp)
                }}</span>
                <span
                  v-if="message.priority && message.priority !== 'normal'"
                  :class="getPriorityClass(message.priority)"
                  class="px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ message.priority }}
                </span>
              </div>

              <div
                :class="[
                  'inline-block px-4 py-2 rounded-lg max-w-md',
                  message.isEmergency
                    ? 'bg-red-100 border border-red-300 text-red-900'
                    : 'bg-white border border-gray-200 text-gray-900',
                ]"
              >
                <p class="text-sm">{{ message.content }}</p>

                <div
                  v-if="message.attachments && message.attachments.length > 0"
                  class="mt-2 space-y-2"
                >
                  <div
                    v-for="attachment in message.attachments"
                    :key="attachment.id"
                    class="flex items-center space-x-2"
                  >
                    <svg
                      class="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      ></path>
                    </svg>
                    <span
                      class="text-sm text-blue-600 hover:underline cursor-pointer"
                      >{{ attachment.name }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="bg-white border-t border-gray-200 p-4">
          <div
            v-if="emergencyMode"
            class="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <div class="flex items-center space-x-2">
              <svg
                class="w-5 h-5 text-red-600"
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
              <span class="text-sm font-medium text-red-800"
                >Emergency Mode Active</span
              >
            </div>
            <p class="text-xs text-red-600 mt-1">
              Messages will be marked as high priority emergency communications
            </p>
          </div>

          <div class="flex items-end space-x-3">
            <div class="flex-1">
              <textarea
                v-model="newMessage"
                @keydown.enter.exact.prevent="sendMessage"
                @keydown.enter.shift.exact="newMessage += '\n'"
                placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="1"
                style="min-height: 44px; max-height: 120px"
              ></textarea>
            </div>

            <div class="flex items-center space-x-2">
              <button
                class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Attach file"
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
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>

              <button
                @click="sendMessage"
                :disabled="!newMessage.trim()"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  newMessage.trim()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed',
                ]"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- New Message Modal -->
    <div
      v-if="showNewMessageModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-lg w-full">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900">New Message</h2>
            <button
              @click="showNewMessageModal = false"
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
            Messaging System
          </h3>
          <p class="text-gray-600 mb-6">
            Complete messaging and group communication features will be
            available soon.
          </p>
          <button
            @click="showNewMessageModal = false"
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

export default {
  name: "MessagesView",
  setup() {
    const authStore = useAuthStore();
    const notificationStore = useNotificationStore();

    const showNewMessageModal = ref(false);
    const loading = ref(false);
    const loadingMessages = ref(false);
    const searchQuery = ref("");
    const activeFilter = ref("all");
    const selectedConversation = ref(null);
    const newMessage = ref("");
    const emergencyMode = ref(false);

    const conversations = ref([]);
    const messages = ref([]);

    const filterTabs = [
      { value: "all", label: "All" },
      { value: "emergency", label: "Emergency" },
      { value: "groups", label: "Groups" },
      { value: "direct", label: "Direct" },
    ];

    const filteredConversations = computed(() => {
      let filtered = conversations.value;

      // Filter by search query
      if (searchQuery.value) {
        filtered = filtered.filter((conv) =>
          conv.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }

      // Filter by type
      if (activeFilter.value !== "all") {
        filtered = filtered.filter((conv) => {
          if (activeFilter.value === "emergency")
            return conv.type === "emergency";
          if (activeFilter.value === "groups") return conv.isGroup;
          if (activeFilter.value === "direct") return !conv.isGroup;
          return true;
        });
      }

      return filtered;
    });

    const fetchConversations = async () => {
      loading.value = true;
      try {
        conversations.value = [
          {
            id: "1",
            name: "Emergency Coordination",
            isGroup: true,
            type: "emergency",
            memberCount: 12,
            lastMessage: {
              content: "Search team Alpha requesting backup at coordinates...",
              timestamp: new Date(Date.now() - 5 * 60000),
            },
            unreadCount: 3,
          },
          {
            id: "2",
            name: "Medical Team",
            isGroup: true,
            type: "medical",
            memberCount: 8,
            lastMessage: {
              content: "Supply distribution complete at shelter 3",
              timestamp: new Date(Date.now() - 15 * 60000),
            },
            unreadCount: 0,
          },
          {
            id: "3",
            name: "John Doe",
            isGroup: false,
            lastMessage: {
              content: "Thanks for the task assignment update",
              timestamp: new Date(Date.now() - 30 * 60000),
            },
            unreadCount: 1,
          },
          {
            id: "4",
            name: "Logistics Team",
            isGroup: true,
            type: "logistics",
            memberCount: 15,
            lastMessage: {
              content: "Resource delivery scheduled for 14:00",
              timestamp: new Date(Date.now() - 60 * 60000),
            },
            unreadCount: 0,
          },
        ];
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      } finally {
        loading.value = false;
      }
    };

    const fetchMessages = async (conversationId) => {
      loadingMessages.value = true;
      try {
        messages.value = [
          {
            id: "1",
            content:
              "Emergency situation reported in sector 7. All available units respond.",
            sender: { firstName: "Sarah", lastName: "Connor" },
            timestamp: new Date(Date.now() - 120 * 60000),
            priority: "urgent",
            isEmergency: true,
          },
          {
            id: "2",
            content: "Copy that. Unit 3 en route to sector 7. ETA 5 minutes.",
            sender: { firstName: "John", lastName: "Smith" },
            timestamp: new Date(Date.now() - 110 * 60000),
            priority: "normal",
          },
          {
            id: "3",
            content: "Medical team standing by at base station.",
            sender: { firstName: "Dr. Emily", lastName: "Johnson" },
            timestamp: new Date(Date.now() - 100 * 60000),
            priority: "normal",
          },
        ];
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        loadingMessages.value = false;
      }
    };

    const selectConversation = (conversation) => {
      selectedConversation.value = conversation;
      fetchMessages(conversation.id);

      // Mark as read
      conversation.unreadCount = 0;
    };

    const sendMessage = () => {
      if (!newMessage.value.trim()) return;

      const message = {
        id: Date.now().toString(),
        content: newMessage.value.trim(),
        sender: {
          firstName: authStore.user?.firstName || "Current",
          lastName: authStore.user?.lastName || "User",
        },
        timestamp: new Date(),
        priority: emergencyMode.value ? "urgent" : "normal",
        isEmergency: emergencyMode.value,
      };

      messages.value.push(message);
      newMessage.value = "";

      // Update conversation last message
      if (selectedConversation.value) {
        selectedConversation.value.lastMessage = {
          content: message.content,
          timestamp: message.timestamp,
        };
      }

      notificationStore.showSuccess(
        emergencyMode.value
          ? "Emergency message sent successfully"
          : "Message sent successfully",
        {
          title: "Message Sent",
        }
      );
    };

    const toggleEmergencyMode = () => {
      emergencyMode.value = !emergencyMode.value;
      if (emergencyMode.value) {
        notificationStore.showWarning("Emergency mode activated", {
          title: "Emergency Mode",
        });
      } else {
        notificationStore.showInfo("Emergency mode deactivated", {
          title: "Emergency Mode",
        });
      }
    };

    const getConversationTypeClass = (type) => {
      const classes = {
        emergency: "bg-red-100 text-red-800",
        medical: "bg-green-100 text-green-800",
        logistics: "bg-blue-100 text-blue-800",
        communication: "bg-purple-100 text-purple-800",
      };
      return classes[type] || "bg-gray-100 text-gray-800";
    };

    const getPriorityClass = (priority) => {
      const classes = {
        low: "bg-gray-100 text-gray-800",
        normal: "bg-blue-100 text-blue-800",
        high: "bg-orange-100 text-orange-800",
        urgent: "bg-red-100 text-red-800",
      };
      return classes[priority] || "bg-gray-100 text-gray-800";
    };

    const formatTime = (timestamp) => {
      if (!timestamp) return "";
      const now = new Date();
      const diff = now - new Date(timestamp);
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) return `${days}d`;
      if (hours > 0) return `${hours}h`;
      if (minutes > 0) return `${minutes}m`;
      return "now";
    };

    const formatMessageTime = (timestamp) => {
      return new Date(timestamp).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    onMounted(() => {
      fetchConversations();
    });

    return {
      showNewMessageModal,
      loading,
      loadingMessages,
      searchQuery,
      activeFilter,
      selectedConversation,
      newMessage,
      emergencyMode,
      conversations,
      messages,
      filterTabs,
      filteredConversations,
      selectConversation,
      sendMessage,
      toggleEmergencyMode,
      getConversationTypeClass,
      getPriorityClass,
      formatTime,
      formatMessageTime,
    };
  },
};
</script>
