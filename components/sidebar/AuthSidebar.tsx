import { useAppSelector } from "@/hooks/useRedux";
import Sidebar from "@/components/sidebar";
import LoginForm from "@/components/form/LoginForm";
import SignupForm from "@/components/form/SignupForm";

export default function AuthSidebar() {
  const { sidebar } = useAppSelector((state) => state.UI);
  return (
    <Sidebar>
      {sidebar === "login-sidebar" ? <LoginForm /> : <SignupForm />}
    </Sidebar>
  );
}
