// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";
import AddOrderView from "@/views/AddOrderView.vue";
import ManageOrdersView from "@/views/ManageOrdersView.vue";
import OrderDetailView from "@/views/OrderDetailView.vue";
import EditOrderView from "@/views/EditOrderView.vue";
import LoginView from "@/views/LoginView.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ProfileView from "@/views/ProfileView.vue";
import AddRoomTypeView from "@/views/AddRoomTypeView.vue";
import ManageRoomTypesView from "@/views/ManageRoomTypesView.vue";
import AddRoomView from "@/views/AddRoomView.vue";
import ManageRoomView from "@/views/ManageRoomView.vue";
import AddGuestView from "@/views/AddGuestView.vue";
import ManageGuestView from "@/views/ManageGuestView.vue";
import AddBookingView from "@/views/AddBookingView.vue";
import ManageBookingView from "@/views/ManageBookingView.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: LoginView,
    },
    {
      path: "/dashboard",
      component: DefaultLayout,
      children: [
        {
          // path: "/dashboard",
          path: "",
          component: DashboardView,
        },
        {
          path: "/orders/add",
          component: AddOrderView,
        },
        {
          path: "/orders/manage",
          component: ManageOrdersView,
        },
        {
          path: "/room-types/add",
          component: AddRoomTypeView,
        },
        {
          path: "/room-types/manage",
          component: ManageRoomTypesView,
        },
        {
          path: "/rooms/add",
          component: AddRoomView,
        },
        {
          path: "/rooms/manage",
          component: ManageRoomView,
        },
        {
          path: "/guests/add",
          component: AddGuestView,
        },
        {
          path: "/guests/manage",
          component: ManageGuestView,
        },
        {
          path: "/bookings/add",
          component: AddBookingView,
        },
        {
          path: "/bookings/manage",
          component: ManageBookingView,
        },
        {
          path: "/profile",
          component: ProfileView,
        },
      ],
    },
  ],
});

// ✅ Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const publicPages = ["/"]; // routes that don't require auth
  const authRequired = !publicPages.includes(to.path);
  const token = localStorage.getItem("access");

  if (authRequired && !token) {
    return next("/"); // redirect to login if not authenticated
  }

  next(); // proceed normally
});

export default router;
