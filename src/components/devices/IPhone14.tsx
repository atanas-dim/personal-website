import React, { FC } from "react";

import iphoneFrameImg from "../../assets/images/iphone-14-frame.png";

type Props = {
  imageSrc: string;
  imageAlt: string;
};
const IPhone14: FC<Props> = ({ imageSrc, imageAlt = "" }) => {
  return (
    <div className="w-[50vw] md:w-[25vw] max-w-[300px] object-contain relative aspect-[390/788]">
      <img
        src={imageSrc}
        alt={imageAlt}
        width="100%"
        height="100%"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[89%] h-full object-contain rounded-[min(4vw,48px)]"
      />
      <img
        src={iphoneFrameImg}
        alt=""
        width="100%"
        height="100%"
        className="absolute top-0 left-0 w-full h-full object-contain"
      />
    </div>
  );
};

export default IPhone14;
