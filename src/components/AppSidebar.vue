<!-- <script setup lang="ts"> -->
<script setup>
import {
  Home,
  Package,
  ShoppingCart,
  Settings,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  User,
  Menu,
  SquareMenu,
  BedDouble,
  Hotel,
  Users,
  NotebookPen,
  DollarSign,
  ScrollText,
} from "lucide-vue-next";

import {
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { RouterLink } from "vue-router";
import axios from "axios";
import { useRouter } from "vue-router";
import { onMounted, ref, reactive } from "vue";
import AppSidebar from "@/components/AppSidebar.vue";
import {
  API_BASE_URL_LOGIN,
  API_ENDPOINTS,
  API_BASE_PROFILE,
} from "@/utils/apiConfig";

const router = useRouter();

const user = ref({});

const fetchUser = async () => {
  const token = localStorage.getItem("access");

  try {
    const response = await axios.get(
      `${API_BASE_PROFILE}${API_ENDPOINTS.PROFILE}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    user.value = response.data.data;
  } catch (err) {
    console.log(err);
  }
};

const logoIcon = ChevronRight;

const logout = () => {
  try {
    // console.log("Clicked from AppSidebar");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    axios.defaults.headers.common["Authorization"] = undefined;
    router.push("/");
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

// Sidebar menu structure
const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Room Type",
    icon: Hotel,
    children: [
      { title: "Add Room Type", href: "/room-types/add" },
      { title: "Manage Room Types", href: "/room-types/manage" },
    ],
  },
  {
    title: "Room",
    icon: BedDouble,
    children: [
      { title: "Add Room", href: "/rooms/add" },
      { title: "Manage Rooms", href: "/rooms/manage" },
    ],
  },
  {
    title: "Guest",
    icon: Users,
    children: [
      { title: "Add Guest", href: "/guests/add" },
      { title: "Manage Guests", href: "/guests/manage" },
    ],
  },
  {
    title: "Booking",
    icon: NotebookPen,
    children: [
      { title: "Add Booking", href: "/bookings/add" },
      { title: "Manage Bookings", href: "/bookings/manage" },
    ],
  },
  {
    title: "Invoice",
    icon: DollarSign,
    children: [
      { title: "Add Invoice", href: "/invoices/add" },
      { title: "Manage Invoices", href: "/invoices/manage" },
    ],
  },
  {
    title: "Audit Log",
    icon: ScrollText,
    children: [{ title: "Audit Logs", href: "/audit-logs" }],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "Profile", href: "/profile" },
      { title: "Preferences", href: "/settings/preferences" },
    ],
  },
];

onMounted(async () => {
  fetchUser();
});
</script>
<template>
  <Sidebar variant="floating" collapsible="icon">
    <SidebarHeader class="bg-gray-100 rounded-lg border mb-4">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <!-- <Menu :size="40" class="mr-auto" /> -->
                <SquareMenu :size="44" class="mr-auto" />
                Poo Tech
                <ChevronDown class="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-[--bits-dropdown-menu-anchor-width]">
              <DropdownMenuItem>
                <span>Acme Inc</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Acme Corp.</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarMenu class="overflow-y-auto">
      <template v-for="item in menuItems" :key="item.title">
        <!-- No sub items -->
        <SidebarMenuItem v-if="!item.children">
          <SidebarMenuButton asChild>
            <RouterLink :to="item.href" class="flex items-center w-full">
              <component :is="item.icon" class="w-4 h-4" />
              <span>{{ item.title }}</span>
            </RouterLink>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <!-- With sub items -->
        <Collapsible v-else defaultClose class="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton asChild>
                <a :href="item.href" class="flex items-center w-full">
                  <component :is="item.icon" class="w-4 h-4" />
                  <span>{{ item.title }}</span>
                  <ChevronRight
                    class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                  />
                </a>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem
                  v-for="(child, i) in item.children"
                  :key="i"
                >
                  <SidebarMenuSubButton asChild>
                    <RouterLink :to="child.href">
                      <span>{{ child.title }}</span>
                    </RouterLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </template>
    </SidebarMenu>
    <SidebarFooter class="bg-gray-100 rounded-lg border mt-auto mb-0 ml-0 mr-0">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton class="p-4">
                <User :size="28" class="mr-auto" />
                <div class="flex flex-col">
                  <span class="text-xs">Email: {{ user.email }}</span>
                  <span class="text-xs">Name: {{ user.name }}</span>
                </div>
                <ChevronRight class="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              class="w-[--reka-popper-anchor-width] ml-3 mb-7"
            >
              <DropdownMenuItem>
                <SidebarMenuButton @click="logout">
                  <span class="m-auto">Logout</span>
                </SidebarMenuButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
