const ChannelVideoSkeleton = () => {
    return (
      <div className="flex animate-pulse gap-2 sm:flex-col">
        <div className="Thumbnail h-[87.1833px] w-[155px] rounded-lg bg-gray-300 sm:h-[166px] sm:w-full md:h-[132px] 2xl:h-[162px]"></div>
        <div className="text--area flex-grow">
          <p className="my-1 h-3 bg-gray-300"></p>
          <p className="my-1 h-3 bg-gray-300"></p>
          <p className="my-1 h-3 bg-gray-300 sm:hidden"></p>
          <p className="my-1 h-3 bg-gray-300 sm:hidden"></p>
          <p className="my-1 h-3 bg-gray-300 sm:hidden"></p>
        </div>
      </div>
    );
  };
  export default ChannelVideoSkeleton