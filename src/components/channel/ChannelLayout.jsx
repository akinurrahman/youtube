import ChannelSidebar from "./ChannelSidebar";
import ChannelTop from "./ChannelTop";

const ChannelLayout = ({ children }) => {
  return (
    <div>
      {/* <ChannelTop /> */}
      <ChannelSidebar />
      <div>{children}</div>
    </div>
  );
};

export default ChannelLayout;
