export const generalTabs = [
  {
    name: "Overview",
    icon: "solar:spedometer-low-bold-duotone",
    link: "/",
  },
  {
    name: "Inventory",
    icon: "solar:hospital-bold-duotone",
    subs: [
      {
        name: "Drugs",
        icon: "solar:jar-of-pills-bold-duotone",
        link: '/drugs'
      },
      {
        name: "Categories",
        icon: "solar:pills-bold-duotone",
        link: '/categories'
      },
      {
        name: "Stock Adjustment",
        icon: "solar:delivery-bold-duotone",
        link: '/stock-adjustment'
      },
    ],
  },
  {
    name: "Orders",
    icon: "solar:cart-large-bold-duotone",
    subs: [
      {
        name: "Drug orders",
        icon: "solar:box-bold-duotone",
        link: '/drug-orders'
      },
      {
        name: "Suppliers",
        icon: "solar:buildings-3-bold-duotone",
        link: '/suppliers'
      },

    ],
  },
  {
    name: "Sales",
    icon: "solar:bill-list-bold-duotone",
    link: "/sales",
  },
  {
    name: "Department Requests",
    icon: "solar:box-bold-duotone",
    link: "/department-requests",
  },
  {
    name: "Reports",
    icon: "solar:graph-up-bold-duotone",
    link: "/reports",
  },
];

export const helpTabs = [
  {
    name: "Video Tutorials",
    icon: "solar:video-frame-bold-duotone",
    link: "/tutorials",
  },

  {
    name: "Support",
    icon: "solar:help-bold-duotone",
    link: "/support",
  },
];