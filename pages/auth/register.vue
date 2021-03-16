<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6 col-xl-5">
      <div class="card">
        <div class="card-body p-4">
          <div class="text-center w-75 m-auto">
            <div class="auth-logo">
              <nuxt-link to="/" class="logo logo-dark text-center">
                <span class="logo-lg">
                  <img src="~/assets/images/logo-dark.png" alt height="22" />
                </span>
              </nuxt-link>

              <nuxt-link to="/" class="logo logo-light text-center">
                <span class="logo-lg">
                  <img src="~/assets/images/logo-light.png" alt height="22" />
                </span>
              </nuxt-link>
            </div>
            <p class="text-muted mb-4 mt-3">
              Don't have an account? Create your own account, it takes less than
              a minute
            </p>
          </div>

          <form action="#" @submit.prevent="tryToRegisterIn">
            <b-alert
              v-model="registerSuccess"
              class="mt-3"
              variant="success"
              dismissible
              >Registration successfull.</b-alert
            >

            <b-alert
              v-model="isRegisterError"
              class="mt-3"
              variant="danger"
              dismissible
              :show="notificationAutoCloseDuration"
              >{{ regError }}</b-alert
            >

            <b-alert
              v-if="notification.message"
              :variant="notification.type"
              class="mt-3"
              :show="notificationAutoCloseDuration"
              dismissible
              >{{ notification.message }}</b-alert
            >

            <div class="form-group">
              <label for="fullname">Username</label>
              <input
                id="fullname"
                v-model="user.username"
                class="form-control"
                type="text"
                placeholder="Enter your name"
                :class="{ 'is-invalid': submitted && $v.user.username.$error }"
              />
              <div
                v-if="submitted && !$v.user.username.required"
                class="invalid-feedback"
              >
                Username is required.
              </div>
            </div>
            <div class="form-group">
              <label for="emailaddress">Email address</label>
              <input
                id="emailaddress"
                v-model="user.email"
                class="form-control"
                type="email"
                :class="{ 'is-invalid': submitted && $v.user.email.$error }"
                placeholder="Enter your email"
              />
              <div
                v-if="submitted && $v.user.email.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.user.email.required">Email is required.</span>
                <span v-if="!$v.user.email.email"
                  >Please enter valid email.</span
                >
              </div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <div class="input-group input-group-merge">
                <input
                  id="password"
                  v-model="user.password"
                  :type="pwdInputType"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.user.password.$error
                  }"
                  placeholder="Enter your password"
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
                  v-if="submitted && !$v.user.password.required"
                  class="invalid-feedback"
                >
                  Password is required.
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="custom-control custom-checkbox">
                <input
                  id="checkbox-signup"
                  type="checkbox"
                  class="custom-control-input"
                />
                <label class="custom-control-label" for="checkbox-signup">
                  I accept
                  <a href="javascript: void(0);" class="text-dark"
                    >Terms and Conditions</a
                  >
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
                <span v-if="!tryingToRegister">Sign Up</span>
                <b-spinner
                  v-if="tryingToRegister"
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
          <p class="text-muted">
            Already have account?
            <nuxt-link
              to="/auth/login"
              class="text-primary font-weight-medium ml-1"
              >Sign In</nuxt-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

/**
 * Register component
 */
export default {
  name: 'AuthRegister',
  layout: 'auth',
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      submitted: false,
      regError: null,
      tryingToRegister: false,
      isRegisterError: false,
      registerSuccess: false,
      pwdInputType: 'password'
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
  validations: {
    user: {
      username: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  created() {},
  methods: {
    // Try to register the user in with the email, username
    // and password they provided.
    tryToRegisterIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (!this.$v.$invalid) {
        if (process.env.auth === 'firebase') {
          this.tryingToRegister = true;
          // Reset the regError if it existed.
          this.regError = null;
          return (
            this.$store
              .dispatch('auth/register', {
                email: this.user.email,
                password: this.user.password
              })
              // eslint-disable-next-line no-unused-vars
              .then((token) => {
                this.tryingToRegister = false;
                this.isRegisterError = false;
                this.registerSuccess = true;
                if (this.registerSuccess) {
                  this.$router.push(
                    this.$route.query.redirectFrom || {
                      path: '/'
                    }
                  );
                }
              })
              .catch((error) => {
                this.tryingToRegister = false;
                this.regError = error || '';
                this.isRegisterError = true;
              })
          );
        } else if (process.env.auth === 'fakebackend') {
          const { email, username, password } = this.user;
          if (email && username && password) {
            this.$store.dispatch('authfack/registeruser', this.user);
            this.$store.dispatch('notification/clear');
          }
        }
      }
    }
  }
};
</script>
