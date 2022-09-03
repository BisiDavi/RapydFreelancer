export type UIStateType = {
  modal: null | string;
  accordion: null | string;
  apploaded: boolean;
  sidebar: null | "signup-sidebar" | "login-sidebar";
  mediaUpload: boolean;
};

export type FormStateType = {
  postJobForm: { [key: string]: string };
};
