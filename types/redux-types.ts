export type modalStateType = "auth-modal" | null;

export type UIStateType = {
  modal: modalStateType;
  accordion: null | string;
  apploaded: boolean;
  sidebar: null | "signup-sidebar" | "login-sidebar";
  mediaUpload: boolean;
};

export type FormStateType = {
  postJobForm: { [key: string]: string };
};
