export type elementType = {
  content: {
    name: string;
    label: string;
    placeholder?: string;
    elementType: string;
    type: string;
    options?: Array<{ text: string; value: string }>;
    inputStyle?: string;
    name2?: string;
  };
};
