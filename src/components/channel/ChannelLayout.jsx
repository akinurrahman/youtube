import ChannelSidebar from "../../pages/channel/ChannelSidebar";
import ChannelTop from "../../pages/channel/ChannelTop";

const ChannelLayout = ({ children }) => {
  return (
    <div>
      <ChannelTop />
      <ChannelSidebar />
      <div>{children}</div>
    </div>
  );
};

export default ChannelLayout;
