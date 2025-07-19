<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>🚨 CrisisIQ</h1>
        <p>Sign in to access emergency coordination tools</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            :disabled="isLoading"
            placeholder="Enter your email"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-input">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              required
              :disabled="isLoading"
              placeholder="Enter your password"
              class="form-input"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="password-toggle"
              :disabled="isLoading"
            >
              {{ showPassword ? "👁️" : "👁️‍🗨️" }}
            </button>
          </div>
        </div>

        <div class="form-options">
          <label class="checkbox-label">
            <input
              v-model="form.rememberMe"
              type="checkbox"
              :disabled="isLoading"
            />
            <span class="checkmark"></span>
            Remember me
          </label>
          <a href="#" class="forgot-link" @click.prevent="handleForgotPassword">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          :disabled="isLoading || !isFormValid"
          class="login-btn"
        >
          <span v-if="isLoading" class="loading-spinner"></span>
          {{ isLoading ? "Signing in..." : "Sign In" }}
        </button>

        <div v-if="error" class="error-message">
          <i class="error-icon">⚠️</i>
          {{ error }}
        </div>
      </form>

      <div class="login-footer">
        <p>Don't have an account?</p>
        <router-link to="/register" class="register-link">
          Create Account
        </router-link>
      </div>

      <div class="emergency-access">
        <p class="emergency-text">
          <i class="emergency-icon">🚨</i>
          Emergency? Call 911 or your local emergency services
        </p>
      </div>
    </div>

    <!-- Background Animation -->
    <div class="background-animation">
      <div class="wave wave1"></div>
      <div class="wave wave2"></div>
      <div class="wave wave3"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useNotificationStore } from "../stores/notifications";

const router = useRouter();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();

// Reactive data
const form = ref({
  email: "",
  password: "",
  rememberMe: false,
});

const showPassword = ref(false);
const isLoading = ref(false);
const error = ref("");

// Computed properties
const isFormValid = computed(() => {
  return form.value.email && form.value.password;
});

// Methods
const handleLogin = async () => {
  if (!isFormValid.value) return;

  isLoading.value = true;
  error.value = "";

  try {
    await authStore.login({
      email: form.value.email,
      password: form.value.password,
    });

    notificationStore.showSuccess(
      "Welcome back! You have been successfully logged in."
    );
    router.push("/dashboard");
  } catch (err) {
    error.value =
      err.response?.data?.error || "Login failed. Please try again.";
    console.error("Login error:", err);
  } finally {
    isLoading.value = false;
  }
};

const handleForgotPassword = () => {
  notificationStore.showInfo(
    "Forgot password functionality will be implemented soon. Please contact your administrator for password reset.",
    { title: "Password Reset" }
  );
};

// Demo credentials helper
const fillDemoCredentials = (role) => {
  const demoCredentials = {
    admin: { email: "admin@crisisiq.com", password: "admin123" },
    coordinator: {
      email: "coordinator@crisisiq.com",
      password: "coord123",
    },
    volunteer: {
      email: "volunteer@crisisiq.com",
      password: "volunteer123",
    },
    citizen: { email: "citizen@crisisiq.com", password: "citizen123" },
  };

  if (demoCredentials[role]) {
    form.value.email = demoCredentials[role].email;
    form.value.password = demoCredentials[role].password;
  }
};

// Lifecycle
onMounted(() => {
  // Clear any existing errors
  authStore.clearError();

  // Check if already authenticated
  if (authStore.isAuthenticated) {
    router.push("/dashboard");
  }
});
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
  animation: slideUp 0.6s ease-out;
}

.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.login-header h1 {
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: #7f8c8d;
  font-size: 1rem;
}

.login-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 600;
  font-size: 0.9rem;
}

.form-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  background: white;
}

.form-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #7f8c8d;
  transition: color 0.3s ease;
}

.password-toggle:hover {
  color: #667eea;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.9rem;
  color: #2c3e50;
}

.checkbox-label input {
  margin-right: 0.5rem;
}

.forgot-link {
  color: #667eea;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.forgot-link:hover {
  color: #5a6fd8;
}

.login-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.error-message {
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid rgba(231, 76, 60, 0.3);
  color: #e74c3c;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.error-icon {
  font-size: 1.2rem;
}

.login-footer {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.login-footer p {
  color: #7f8c8d;
  margin-bottom: 0.5rem;
}

.register-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.register-link:hover {
  color: #5a6fd8;
}

.emergency-access {
  margin-top: 2rem;
  text-align: center;
  padding: 1rem;
  background: rgba(231, 76, 60, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(231, 76, 60, 0.2);
}

.emergency-text {
  color: #e74c3c;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.emergency-icon {
  font-size: 1.2rem;
  animation: pulse 2s infinite;
}

/* Background Animation */
.background-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: wave 6s ease-in-out infinite;
}

.wave1 {
  animation-delay: 0s;
}

.wave2 {
  animation-delay: 2s;
  background: rgba(255, 255, 255, 0.05);
}

.wave3 {
  animation-delay: 4s;
  background: rgba(255, 255, 255, 0.03);
}

/* Animations */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes wave {
  0%,
  100% {
    transform: translateX(-50%) translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateX(-50%) translateY(-20px) rotate(180deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .login-container {
    padding: 1rem;
  }

  .login-card {
    padding: 2rem;
  }

  .login-header h1 {
    font-size: 1.5rem;
  }

  .form-options {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>
