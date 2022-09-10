import ChatView from "@/views/ChatView";
import MessageView from "@/views/MessageView";
import ProfileVliew from "@/views/ProfileVliew";
import SettingsView from "@/views/SettingsView";

export default function displayUserSection(view: string) {
  switch (view) {
    case "message":
      return <MessageView />;
    case "chat":
      return <ChatView />;
    case "profile":
      return <ProfileVliew />;
    case "settings":
      return <SettingsView />;
  }
}
