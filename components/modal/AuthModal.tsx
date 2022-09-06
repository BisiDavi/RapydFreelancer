import Modal from "@/components/modal";
import { modalStateType } from "@/types/redux-types";
import Tabs from "@/components/tab";
import SignupForm from "@/components/form/SignupForm";
import LoginForm from "@/components/form/LoginForm";

interface Props {
  modal: modalStateType | null;
  toggleModal: (modal: modalStateType) => void;
}

export default function AuthModal({ modal, toggleModal }: Props) {
  return (
    <Modal
      title="Please Login or Signup"
      modal={modal}
      toggleModal={toggleModal}
    >
      <Tabs
        tabHeader={["Login", "Signup"]}
        tabBody1={<LoginForm />}
        tabBody2={<SignupForm type="big" />}
      />
    </Modal>
  );
}
