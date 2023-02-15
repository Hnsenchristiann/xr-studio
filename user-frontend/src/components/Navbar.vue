<template>
  <header class="border-b">
    <div>
      <nav
        class="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between"
      >
        <div class="px-6 w-full flex flex-wrap items-center justify-between">
          <div class="flex items-center">
            <button
              class="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContentY"
              aria-controls="navbarSupportedContentY"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                class="w-5"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                ></path>
              </svg>
            </button>
          </div>
          <div
            class="navbar-collapse collapse grow items-center"
            id="navbarSupportedContentY"
          >
            <ul
              v-if="envVars.VUE_APP_SHOW_HOMEPAGE === 'true'"
              class="navbar-nav mr-auto lg:flex lg:flex-row"
            >
              <li class="nav-item">
                <router-link
                  class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                  to="/"
                  >Home</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                  to="/contact-us"
                  >Contact Us</router-link
                >
              </li>
              <li
                v-if="envVars.VUE_APP_SHOW_ASSETS === 'true'"
                class="nav-item"
              >
                <router-link
                  class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                  to="/assets"
                  >XR Assets</router-link
                >
              </li>
              <li
                v-if="envVars.VUE_APP_SHOW_ASSETS === 'true'"
                class="nav-item mb-2 lg:mb-0"
              >
                <router-link
                  class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                  to="/equipments"
                  >Equipments</router-link
                >
              </li>
              <li class="nav-item mb-2 lg:mb-0">
                <div
                  class="dropdown nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                >
                  <button
                    class="dropdown-toggle flex items-center text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out font-bold"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Studio Rental
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="caret-down"
                      class="w-2 ml-2"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path
                        fill="currentColor"
                        d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                      ></path>
                    </svg>
                  </button>
                  <ul
                    class="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <router-link
                        class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                        to="/studio/about-shoot"
                        >Our Studio</router-link
                      >
                    </li>
                    <li>
                      <router-link
                        class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                        to="/studio/register-shoot"
                        >Schedule Shoot</router-link
                      >
                    </li>
                    <li>
                      <router-link
                        class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                        to="/studio/calendar"
                        >Studio Calendar</router-link
                      >
                    </li>
                    <li v-if="isLoggedIn">
                      <router-link
                        class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                        to="/studio/my-calendar"
                        >My Calendar</router-link
                      >
                    </li>
                    <li class="nav-item">
                      <router-link
                        class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                        to="/contact-us"
                        >Contact Us</router-link
                      >
                    </li>
                  </ul>
                </div>
              </li>
              <li v-if="itemCount > 0" class="nav-item mb-2 lg:mb-0">
                <router-link
                  class="flex rounded shadow-md pr-4 lg:px-4 py-2 bg-gray-600 text-white hover:bg-gray-700 focus:bg-gray-700 transition duration-150 ease-in-out"
                  to="/shopping/cart"
                >
                  Cart
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="caret-down"
                    class="w-4 ml-1"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"
                    />
                  </svg>
                  <span
                    class="inline-block py-1 px-1.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded ml-2"
                    >{{ itemCount }}</span
                  >
                </router-link>
              </li>
            </ul>
            <ul v-else class="navbar-nav mr-auto lg:flex lg:flex-row">
              <li class="nav-item">
                <router-link
                  class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                  to="/studio/about-shoot"
                  >Our Studio</router-link
                >
              </li>
              <li class="nav-item mb-2 lg:mb-0">
                <router-link
                  class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                  to="/studio/register-shoot"
                  >Schedule Shoot</router-link
                >
              </li>
              <li class="nav-item mb-2 lg:mb-0">
                <router-link
                  class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                  to="/studio/calendar"
                  >Studio Calendar</router-link
                >
              </li>
              <li v-if="isLoggedIn" class="nav-item mb-2 lg:mb-0">
                <router-link
                  class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                  to="/studio/my-calendar"
                  >My Calendar</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                  to="/contact-us"
                  >Contact Us</router-link
                >
              </li>
              <li v-if="itemCount > 0" class="nav-item mb-2 lg:mb-0">
                <router-link
                  class="flex rounded shadow-md pr-4 lg:px-4 py-2 bg-gray-600 text-white hover:bg-gray-700 focus:bg-gray-700 transition duration-150 ease-in-out"
                  to="/shopping/cart"
                >
                  Cart
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="caret-down"
                    class="w-4 ml-1"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"
                    />
                  </svg>
                  <span
                    class="inline-block py-1 px-1.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded ml-2"
                    >{{ itemCount }}</span
                  >
                </router-link>
              </li>
            </ul>
          </div>
          <div v-if="isLoggedIn">
            <div class="flex justify-center">
              <div>
                <div class="dropdown relative">
                  <button
                    class="p-2 bg-gray-200 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span>
                      <img
                        v-if="isLoggedIn && profile_image_url"
                        class="h-8 w-8 rounded-full"
                        :src="profile_image_url"
                        alt=""
                      />
                      <svg
                        v-else-if="isLoggedIn"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="{2}"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>
                  </button>
                  <ul
                    class="dropdown-menu absolute hidden bg-white z-50 right-0 py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <router-link
                        class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                        to="/my-account"
                        >My Account</router-link
                      >
                    </li>
                    <li>
                      <router-link
                        class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                        to="/logout"
                        >Logout</router-link
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="flex items-center items-center lg:ml-auto">
            <router-link to="/login">
              <button
                type="button"
                class="inline-block px-6 py-2.5 mr-2 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Login
              </button>
            </router-link>
            <router-link to="/register">
              <button
                type="button"
                class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Sign up
              </button>
            </router-link>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";
import { mapState } from "pinia";
export default {
  name: "Navbar",
  setup() {
    const authStore = useAuthStore();
    const cartStore = useCartStore();
    return {
      authStore,
      cartStore,
    };
  },
  computed: {
    ...mapState(useAuthStore, [
      "user",
      "isLoggedIn",
      "profile_image_url",
      "unreadCount",
    ]),
    ...mapState(useCartStore, ["itemCount"]),
  },
};
</script>
