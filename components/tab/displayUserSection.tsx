import ChatView from "@/views/ChatView";
import MessageView from "@/views/MessageView";
import ProfileVliew from "@/views/ProfileView";
import SettingsView from "@/views/SettingsView";

export default function displayUserSection(view: string) {
  switch (view) {
    case "messages":
      return <MessageView />;
    case "chat":
      return <ChatView />;
    case "profile":
      return <ProfileVliew />;
    case "settings":
      return <SettingsView />;
    default:
      return <ProfileVliew />;
  }
}
