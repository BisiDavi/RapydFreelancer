import BidView from "@/views/BidView";
import BuyConnectView from "@/views/BuyConnectView";
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
    case "buy connect":
      return <BuyConnectView />;
    default:
      return <ProfileView />;
  }
}
