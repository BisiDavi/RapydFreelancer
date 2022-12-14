import AccountView from "@/views/AccountView";
import BidView from "@/views/BidView";
import ChatView from "@/views/ChatView";
import MessageView from "@/views/MessageView";
import PostedJobsView from "@/views/PostedJobsView";
import ProfileView from "@/views/ProfileView";
import SettingsView from "@/views/SettingsView";

export default function displayUserSection(view: string) {
  switch (view) {
    case "messages":
      return <MessageView />;
    case "chat":
      return <ChatView />;
    case "profile":
      return <ProfileView />;
    case "settings":
      return <SettingsView />;
    case "bids":
      return <BidView />;
    case "posted jobs":
      return <PostedJobsView />;
    case "account":
      return <AccountView />;
    default:
      return <ProfileView />;
  }
}
