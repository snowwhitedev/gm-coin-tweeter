<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6 col-xl-5">
      <div class="card">
        <div class="card-body p-4">
          <div class="text-center w-75 m-auto">
            <div class="auth-logo">
              <nuxt-link to="/" class="logo logo-dark text-center">
                <span class="logo-lg">
                  <img src="~/assets/images/logo-dark.png" alt="" height="22" />
                </span>
              </nuxt-link>

              <nuxt-link to="/" class="logo logo-light text-center">
                <span class="logo-lg">
                  <img
                    src="~/assets/images/logo-light.png"
                    alt=""
                    height="22"
                  />
                </span>
              </nuxt-link>
            </div>
            <p class="text-muted mb-4 mt-3">
              Enter your email address and password to access admin panel.
            </p>
          </div>

          <form action="#" @submit.prevent="tryToLogIn">
            <b-alert
              v-if="notification.message"
              :variant="notification.type"
              class="mt-3"
              :show="notificationAutoCloseDuration"
              dismissible
              >{{ notification.message }}</b-alert
            >
            <b-alert
              v-model="isAuthError"
              variant="danger"
              class="mt-3"
              :show="notificationAutoCloseDuration"
              dismissible
              >{{ authError }}</b-alert
            >
            <div class="form-group mb-3">
              <label for="emailaddress">Email address</label>
              <input
                id="emailaddress"
                v-model="email"
                class="form-control"
                type="email"
                placeholder="Enter your email"
                :class="{ 'is-invalid': submitted && $v.email.$error }"
              />
              <div v-if="submitted && $v.email.$error" class="invalid-feedback">
                <span v-if="!$v.email.required">Email is required.</span>
                <span v-if="!$v.email.email">Please enter valid email.</span>
              </div>
            </div>

            <div class="form-group mb-3">
              <label for="password">Password</label>
              <div class="input-group input-group-merge">
                <input
                  id="password"
                  v-model="password"
                  :type="pwdInputType"
                  class="form-control"
                  placeholder="Enter your password"
                  :class="{ 'is-invalid': submitted && $v.password.$error }"
                />
                <div
                  class="input-group-append append-action"
                  data-password="false"
                  @click="
                    pwdInputType =
                      pwdInputType === 'password' ? 'text' : 'password'
                  "
                >
                  <div class="input-group-text">
                    <i v-if="pwdInputType === 'password'" class="fe-eye"></i>
                    <i v-if="pwdInputType === 'text'" class="fe-eye-off"></i>
                  </div>
                </div>
                <div
                  v-if="submitted && !$v.password.required"
                  class="invalid-feedback"
                >
                  Password is required.
                </div>
              </div>
            </div>
            <div class="form-group mb-3">
              <div class="custom-control custom-checkbox">
                <input
                  id="checkbox-signin"
                  type="checkbox"
                  class="custom-control-input"
                  checked
                />
                <label class="custom-control-label" for="checkbox-signin">
                  Remember me
                </label>
              </div>
            </div>
            <div class="form-group mb-0 text-center">
              <b-button
                size="sm"
                class="btn-block loading-btn"
                variant="primary"
                type="submit"
              >
                <span v-if="!tryingToLogIn">Log In</span>
                <b-spinner
                  v-if="tryingToLogIn"
                  small
                  class="m-2"
                  variant="light"
                  role="status"
                ></b-spinner>
              </b-button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12 text-center">
          <p>
            <nuxt-link to="/auth/forgot-password" class="text-muted ml-1"
              >Forgot your password?</nuxt-link
            >
          </p>
          <p class="text-muted">
            Don't have an account?
            <nuxt-link
              to="/auth/register"
              class="text-primary font-weight-medium ml-1"
              >Sign Up</nuxt-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators';
export default {
  layout: 'auth',
  data() {
    return {
      email: '',
      password: '',
      pwdInputType: 'password',
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false
    };
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
    notificationAutoCloseDuration() {
      return this.$store && this.$store.state.notification ? 5 : 0;
    }
  },
  created() {},
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    // Try to log the user in with the username
    // and password they provided.
    tryToLogIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.isLoading = true;
        if (process.env.auth === 'firebase') {
          this.tryingToLogIn = true;
          // Reset the authError if it existed.
          this.authError = null;

          return (
            this.$store
              .dispatch('auth/logIn', {
                email: this.email,
                password: this.password
              })
              // eslint-disable-next-line no-unused-vars
              .then((token) => {
                this.tryingToLogIn = false;
                this.isAuthError = false;
                // Redirect to the originally requested page, or to the home page
                this.$router.push(
                  this.$route.query.redirectFrom || {
                    path: '/'
                  }
                );
              })
              .catch((error) => {
                this.tryingToLogIn = false;
                this.authError = error || '';
                this.isAuthError = true;
              })
          );
        } else if (process.env.auth === 'fakebackend') {
          const { email, password } = this;
          if (email && password) {
            this.$store.dispatch('authfack/login', {
              email,
              password
            });
            this.$store.dispatch('notification/clear');
          }
        }
      }
    }
  }
};
</script>
