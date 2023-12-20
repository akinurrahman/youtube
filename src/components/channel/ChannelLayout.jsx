import ChannelSidebar from "./ChannelSidebar";
import ChannelTopSection from "./ChannelTopSection";


const ChannelLayout = ({ children }) => {
  return (
    <div>
      <ChannelTopSection />
      <ChannelSidebar />
      <div>{children}</div>
    </div>
  );
};

export default ChannelLayout;
