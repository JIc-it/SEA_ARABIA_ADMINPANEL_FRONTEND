export const permissions = [
  {
    title: "Vendor Management",
    permissionCategory: [
      { item: "Lead", value: false },
      { item: "Onboard Operation", value: false },
      { item: "View", value: false },
      { item: "Action", value: false },
    ],
  },
  {
    title: "Booking",
    permissionCategory: [
      { item: "View", value: false },
      { item: "Edit", value: false },
      { item: "Action", value: false },
      { item: "Cancel", value: false },
      { item: "Refund", value: false },
    ],
  },
  {
    title: "Service Management",
    permissionCategory: [
      { item: "Create", value: false },
      { item: "View", value: false },
      { item: "Edit", value: false },
      { item: "Action", value: false },
      { item: "Availability", value: false },
      { item: "Calendar", value: false },
    ],
  },
  {
    title: "Offer",
    permissionCategory: [
      { item: "Create", value: false },
      { item: "View", value: false },
      { item: "Edit", value: false },
      { item: "Status", value: false },
      { item: "Action", value: false },
    ],
  },
  {
    title: "Users",
    permissionCategory: [
      { item: "Create", value: false },
      { item: "View", value: false },
      { item: "Edit", value: false },
      { item: "Reset Password", value: false },
      { item: "Action", value: false },
      { item: "Permission", value: false },
    ],
  },
  {
    title: "Review",
    permissionCategory: [{ item: "View", value: false }],
  },
  {
    title: "Events and Packages",
    permissionCategory: [
      { item: "Create", value: false },
      { item: "View", value: false },
      { item: "Edit", value: false },
      { item: "Action", value: false },
    ],
  },
];

export const menuIdConstant = {
  vendorManagent: "1",
  booking: "2",
  serviceManagement: "3",
  offer: "4",
  users: "5",
  review: "6",
  eventsPackages: "7",
};

export const permissionCategory = {
  lead: "Lead",
  onboardOperation: "Onboard Operation",
  view: "View",
  action: "Action",
  edit: "Edit",
  bookingCancel: "Booking Cancel",
  refund: "Refund",
  create: "Create",
  availability: "Availability",
  calendar: "Calendar",
  status: "Status",
  resetPassword: "Reset Password",
  permission: "Permission",
};
