export const navConfig = {
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
    },
    {
      title: "Products",
      href: "/dashboard/products",
    },
    {
      title: "Customers",
      href: "/dashboard/customers",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
      icon: "shopping-cart",
    },
    {
      title: "Products",
      href: "/dashboard/products",
      icon: "package",
    },
    {
      title: "Customers",
      href: "/dashboard/customers",
      icon: "users",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
};

export type NavConfig = typeof navConfig;
