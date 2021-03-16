<template>
  <!-- Topbar Start -->
  <div class="navbar-custom">
    <div class="container-fluid">
      <ul class="list-unstyled topnav-menu float-right mb-0">
        <b-nav-item-dropdown
          right
          class="notification-list topbar-dropdown"
          menu-class="profile-dropdown"
          toggle-class="p-0"
        >
          <template slot="button-content" class="nav-link dropdown-toggle">
            <div class="nav-user mr-0">
              <i class="fe-user rounded-circle" />
              <span class="pro-user-name ml-1">
                <!-- {{ $t('navbar.dropdown.name.text') }} -->
                <i class="mdi mdi-chevron-down"></i>
              </span>
            </div>
          </template>
          <a class="dropdown-item" @click="logoutUser">
            <i class="fe-log-out mr-1"></i>
            <span>{{ $t('navbar.dropdown.name.list.logout') }}</span>
          </a>
        </b-nav-item-dropdown>
      </ul>

      <!-- LOGO -->
      <div class="logo-box">
        <nuxt-link to="/" class="logo logo-dark text-center">
          <span class="logo-sm">
            <img src="~/assets/images/logo-sm-dark.png" alt height="24" />
            <!-- <span class="logo-lg-text-light">Minton</span> -->
          </span>
          <span class="logo-lg">
            <img src="~/assets/images/logo-dark.png" alt height="20" />
            <!-- <span class="logo-lg-text-light">M</span> -->
          </span>
        </nuxt-link>

        <nuxt-link to="/" class="logo logo-light text-center">
          <span class="logo-sm">
            <img src="~/assets/images/logo-sm.png" alt height="24" />
          </span>
          <span class="logo-lg">
            <img src="~/assets/images/logo-light.png" alt height="20" />
          </span>
        </nuxt-link>
      </div>

      <ul class="list-unstyled topnav-menu topnav-menu-left m-0">
        <li>
          <button
            class="button-menu-mobile waves-effect waves-light"
            @click="toggleMenu"
          >
            <i class="fe-menu"></i>
          </button>
        </li>

        <!-- <li> -->
        <!-- Mobile menu toggle (Horizontal Layout)-->
        <!-- <a
            class="navbar-toggle nav-link"
            data-toggle="collapse"
            data-target="#topnav-menu-content"
            @click="horizonalmenu()"
          >
            <div class="lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </a> -->
        <!-- End mobile menu toggle-->
        <!-- </li> -->
        <li>
          <nuxt-link to="/dashboard" class="nav-link top-nav-link">
            <span>Home</span>
          </nuxt-link>
        </li>
      </ul>
      <div class="clearfix"></div>
    </div>
  </div>
  <!-- end Topbar -->
</template>

<script>
/**
 * Topbar component
 */
export default {
  name: 'Home',
  data() {
    return {
      current_language: this.$i18n.locale
    };
  },
  mounted() {},
  methods: {
    /**
     * Toggle menu
     */
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    /**
     * Horizontal-toggle menu
     */
    horizonalmenu() {
      const element = document.getElementById('topnav-menu-content');
      element.classList.toggle('show');
    },
    /**
     * Logout user
     */
    logoutUser() {
      if (process.env.auth === 'firebase') {
        this.$store.dispatch('auth/logOut');
      } else if (process.env.auth === 'fakebackend') {
        this.$store.dispatch('authfack/logout');
      }
      this.$router.push({
        path: '/home'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.top-nav-link {
  font-size: 1rem;
  font-weight: 600;
}
</style>
