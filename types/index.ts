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
