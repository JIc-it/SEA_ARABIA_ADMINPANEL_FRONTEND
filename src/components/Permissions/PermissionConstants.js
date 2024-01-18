export const permissions = [
  {
    title: "Vendor Management",
    permissionCategory: [
      { item: "Lead", value: true },
      { item: "Onboard Operation", value: false },
      { item: "View", value: true },
      { item: "Action", value: false },
    ],
  },
  {
    title: "Booking",
    permissionCategory: [
      { item: "View", value: false },
      { item: "Edit", value: false },
      { item: "Action", value: false },
      { item: "Cancel", value: true },
      { item: "Refund", value: true },
    ],
  },
  {
    title: "Service Management",
    permissionCategory: [
      { item: "Create", value: false },
      { item: "View", value: false },
      { item: "Edit", value: true },
      { item: "Action", value: false },
      { item: "Availability", value: false },
      { item: "Calendar", value: true },
    ],
  },
  {
    title: "Offer",
    permissionCategory: [
      { item: "Create", value: true },
      { item: "View", value: false },
      { item: "Edit", value: false },
      { item: "Status", value: false },
      { item: "Action", value: true },
    ],
  },
  {
    title: "Users",
    permissionCategory: [
      { item: "Create", value: true },
      { item: "View", value: false },
      { item: "Edit", value: false },
      { item: "Reset Password", value: false },
      { item: "Action", value: false },
      { item: "Permission", value: true },
    ],
  },
  {
    title: "Review",
    permissionCategory: [{ item: "View", value: true }],
  },
  {
    title: "Events and Packages",
    permissionCategory: [
      { item: "Create", value: true },
      { item: "View", value: false },
      { item: "Edit", value: true },
      { item: "Action", value: false },
    ],
  },
];
