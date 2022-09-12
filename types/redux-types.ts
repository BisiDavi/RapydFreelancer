export type modalStateType = "auth-modal" | "confirm-job-modal" | null;

export type UIStateType = {
  modal: modalStateType;
  accordion: null | string;
  apploaded: boolean;
  sidebar: null | "signup-sidebar" | "login-sidebar" | "mobile-sidebar";
  mediaUpload: boolean;
};

export type FormStateType = {
  postJobForm: { [key: string]: string };
};
