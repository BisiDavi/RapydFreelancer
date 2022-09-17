export type elementType = {
  content: {
    name: string;
    label: string;
    placeholder?: string;
    elementType: string;
    type: string;
    options?: Array<{ text: string; value: string }>;
    inputStyle?: string;
    radios?: Array<{ text: string; value: string }> 
  };
};

export type skillType = { label: string; value: string }[];
