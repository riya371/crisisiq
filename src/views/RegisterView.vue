<template>
  <div class="register-container">
    <div class="register-card">
      <div class="register-header">
        <div class="register-icon">🚨</div>
        <h1>Join CrisisIQ</h1>
        <p>Help make a difference in disaster relief efforts</p>
      </div>

      <form @submit.prevent="handleRegister" class="register-form">
        <!-- Personal Information -->
        <div class="form-row">
          <div class="form-group">
            <label>First Name</label>
            <input
              v-model="form.firstName"
              type="text"
              required
              class="form-input"
              placeholder="Enter your first name"
            />
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input
              v-model="form.lastName"
              type="text"
              required
              class="form-input"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div class="form-group">
          <label>Email Address</label>
          <input
            v-model="form.email"
            type="email"
            required
            class="form-input"
            placeholder="Enter your email address"
          />
        </div>

        <div class="form-group">
          <label>Phone Number</label>
          <input
            v-model="form.phone"
            type="tel"
            class="form-input"
            placeholder="Enter your phone number"
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
            v-model="form.password"
            type="password"
            required
            class="form-input"
            placeholder="Create a strong password"
          />
        </div>

        <div class="form-group">
          <label>Confirm Password</label>
          <input
            v-model="form.confirmPassword"
            type="password"
            required
            class="form-input"
            placeholder="Confirm your password"
          />
        </div>

        <!-- Role Selection -->
        <div class="form-group">
          <label>Role</label>
          <select v-model="form.role" required class="form-select">
            <option value="" disabled>Select your role</option>
            <option value="citizen">Citizen</option>
            <option value="volunteer">Volunteer</option>
            <option value="coordinator">Coordinator</option>
          </select>
        </div>

        <!-- Volunteer-specific fields -->
        <div v-if="form.role === 'volunteer'" class="volunteer-section">
          <h3>Volunteer Information</h3>

          <div class="form-row">
            <div class="form-group">
              <label>Experience Level</label>
              <select
                v-model="form.volunteer.experienceLevel"
                class="form-select"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            <div class="form-group">
              <label>Availability</label>
              <select v-model="form.volunteer.availability" class="form-select">
                <option value="weekends">Weekends Only</option>
                <option value="evenings">Evenings</option>
                <option value="flexible">Flexible</option>
                <option value="full-time">Full Time</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Skills (select all that apply)</label>
            <div class="skills-grid">
              <label
                v-for="skill in availableSkills"
                :key="skill"
                class="skill-checkbox"
              >
                <input
                  type="checkbox"
                  :value="skill"
                  v-model="form.volunteer.skills"
                />
                <span>{{ skill }}</span>
              </label>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Emergency Contact Name</label>
              <input
                v-model="form.volunteer.emergencyContact.name"
                type="text"
                class="form-input"
                placeholder="Emergency contact name"
              />
            </div>
            <div class="form-group">
              <label>Emergency Contact Phone</label>
              <input
                v-model="form.volunteer.emergencyContact.phone"
                type="tel"
                class="form-input"
                placeholder="Emergency contact phone"
              />
            </div>
          </div>
        </div>

        <!-- Organization fields for coordinators -->
        <div v-if="form.role === 'coordinator'" class="organization-section">
          <h3>Organization Information</h3>

          <div class="form-group">
            <label>Organization Name</label>
            <input
              v-model="form.organization.name"
              type="text"
              class="form-input"
              placeholder="Organization name"
            />
          </div>

          <div class="form-group">
            <label>Organization Type</label>
            <select v-model="form.organization.type" class="form-select">
              <option value="ngo">NGO</option>
              <option value="government">Government Agency</option>
              <option value="private">Private Organization</option>
              <option value="volunteer">Volunteer Group</option>
            </select>
          </div>

          <div class="form-group">
            <label>Your Position</label>
            <input
              v-model="form.organization.position"
              type="text"
              class="form-input"
              placeholder="Your position in the organization"
            />
          </div>
        </div>

        <!-- Error message -->
        <div v-if="error" class="error-message">
          <i class="error-icon">⚠️</i>
          {{ error }}
        </div>

        <!-- Submit button -->
        <button type="submit" :disabled="loading" class="submit-btn">
          <span v-if="loading" class="loading-spinner"></span>
          {{ loading ? "Creating Account..." : "Create Account" }}
        </button>
      </form>

      <div class="register-footer">
        <p>
          Already have an account?
          <router-link to="/login" class="login-link">
            Sign in here
          </router-link>
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
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useNotificationStore } from "../stores/notifications";

const router = useRouter();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();

const loading = ref(false);
const error = ref("");

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  role: "",
  volunteer: {
    experienceLevel: "beginner",
    availability: "flexible",
    skills: [],
    emergencyContact: {
      name: "",
      phone: "",
    },
  },
  organization: {
    name: "",
    type: "ngo",
    position: "",
  },
});

const availableSkills = [
  "First Aid",
  "Medical",
  "Search & Rescue",
  "Communication",
  "Logistics",
  "Transportation",
  "Construction",
  "Food Service",
  "Translation",
  "IT Support",
  "Counseling",
  "Administration",
];

const handleRegister = async () => {
  error.value = "";

  // Validation
  if (form.password !== form.confirmPassword) {
    error.value = "Passwords do not match";
    return;
  }

  if (form.password.length < 6) {
    error.value = "Password must be at least 6 characters long";
    return;
  }

  loading.value = true;

  try {
    // Prepare registration data
    const registrationData = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      password: form.password,
      role: form.role,
    };

    // Add role-specific data
    if (form.role === "volunteer") {
      registrationData.volunteerInfo = form.volunteer;
    } else if (form.role === "coordinator") {
      registrationData.organization = form.organization;
    }

    await authStore.register(registrationData);

    notificationStore.showSuccess(
      "Welcome to CrisisIQ! Registration successful."
    );

    router.push("/dashboard");
  } catch (err) {
    error.value =
      err.response?.data?.error ||
      err.message ||
      "Registration failed. Please try again.";

    notificationStore.showError(error.value, { title: "Registration Failed" });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.register-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 3rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
  animation: slideUp 0.6s ease-out;
  max-height: 90vh;
  overflow-y: auto;
}

.register-header {
  text-align: center;
  margin-bottom: 2rem;
}

.register-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.register-header h1 {
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.register-header p {
  color: #7f8c8d;
  font-size: 1rem;
}

.register-form {
  margin-bottom: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
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

.form-input,
.form-select {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  background: white;
}

.volunteer-section,
.organization-section {
  background: rgba(102, 126, 234, 0.05);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.volunteer-section h3,
.organization-section h3 {
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.5rem;
}

.skill-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2c3e50;
  font-size: 0.9rem;
  cursor: pointer;
}

.skill-checkbox input {
  margin: 0;
}

.error-message {
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid rgba(231, 76, 60, 0.3);
  color: #e74c3c;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.error-icon {
  font-size: 1.2rem;
}

.submit-btn {
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

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.submit-btn:disabled {
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

.register-footer {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.register-footer p {
  color: #7f8c8d;
  margin-bottom: 0.5rem;
}

.login-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.login-link:hover {
  color: #5a6fd8;
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
  .register-container {
    padding: 1rem;
  }

  .register-card {
    padding: 2rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .register-header h1 {
    font-size: 1.5rem;
  }
}
</style>
