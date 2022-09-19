export type jobType = {
  _id: string;
  durationPeriod: number;
  price: number;
  duration: string;
  description: string;
  title: string;
  pricePeriod: string;
  media: string[];
  skills: { label: string; value: string }[];
  id: string;
  user: { email: string; displayName: string };
  createdAt: string;
  active: boolean;
  projectId: string;
  paid: boolean;
  bids: [];
};

export interface MenubarType {
  onClick: () => void;
  className: string;
}

export type paymentMethodType = {
  type: string;
  name: string;
  category: string;
  image?: string;
  country: string;
  currencies: string[];
  is_refundable: boolean;
  maximum_expiration_seconds: number;
  amount_range_per_currency: {
    currency: string;
    maximum_amount: null | number;
    minimum_amount: null | number;
  }[];
};

export type linkType = "connect" | "fund-wallet" | "job";
