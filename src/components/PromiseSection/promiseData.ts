export interface AmenityItem {
  id: string;
  label: string;
}

export interface PromiseItem {
  id: string;
  label: string;
  color: string;
}

export const amenitiesHeading = "because we give you everything you need,";
export const promiseHeading = "and nothing you don't.";

export const amenityItems: AmenityItem[] = [
  {
    id: "parking",
    label: "Free Gated Parking At Every Location",
  },
  {
    id: "access",
    label: "Open 24/7, 365 Days with Full Access",
  },
  {
    id: "staff",
    label: "Service Staff at Your Own Desks",
  },
  {
    id: "layout",
    label: "Custom Office Or Desk Layouts",
  },
  {
    id: "ev",
    label: "EV Charging Stations For All Wheelers",
  },
  {
    id: "green",
    label: "Real Green Spaces",
  },
  {
    id: "cleaning",
    label: "On Site Car and Bike Cleaning",
  },
  {
    id: "pets",
    label: "Permission To Bring Your Pets",
  },
  {
    id: "quiet",
    label: "Quiet and Secure Peaceful Environment",
  },
  {
    id: "dining",
    label: "Indoor & Outdoor Dining Spaces",
  },
];

export const promiseItems: PromiseItem[] = [
  {
    id: "fee",
    label: "No Hidden Fee",
    color: "#f2bec8",
  },
  {
    id: "charges",
    label: "No Surprises Charges",
    color: "#a9c3e8",
  },
  {
    id: "compromise",
    label: "No Compromises Ever.",
    color: "#d5ff73",
  },
];
