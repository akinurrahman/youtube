export const recommendedSkeleton = () => {
    return (
      <div className="container my-2  flex justify-between px-4 lg:my-5">
        <div className="h-[107px] w-[48%] rounded-lg bg-gray-300 sm:h-[133px] sm:w-[38%] lg:h-[107px] lg:w-[48%] "></div>
        <div className="w-[48%] sm:w-[60%] lg:w-[48%]">
          <div className="my-[6px] h-[14px] bg-gray-300 sm:h-[18px]  "></div>
          <div className="my-[6px] h-[14px] bg-gray-300 sm:h-[18px]  "></div>
          <div className="my-[6px] h-[14px] bg-gray-300 sm:h-[18px]  "></div>
          <div className="my-[6px] h-[14px] bg-gray-300 sm:h-[18px]  "></div>
          <div className="my-[6px] h-[14px] bg-gray-300 sm:h-[18px]  lg:hidden "></div>
        </div>
      </div>
    );
  };