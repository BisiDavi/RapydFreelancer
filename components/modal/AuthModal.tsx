import Modal from "@/components/modal";
import Tabs from "@/components/tab";
import SignupForm from "@/components/form/SignupForm";
import LoginForm from "@/components/form/LoginForm";
import type { modalStateType } from "@/types/redux-types";

interface Props {
  modal: modalStateType | null;
  toggleModal: (modal: modalStateType) => void;
}

export default function AuthModal({ modal, toggleModal }: Props) {
  return (
    <Modal
      title="You need to Login or Signup before posting job"
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
