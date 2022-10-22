import React, { FC } from "react";

type Props = {
  width: number;
  imageSrc: any;
};
const IPhone14: FC<Props> = ({ width, imageSrc }) => {
  const height = (868 / 428) * width;

  return (
    <div
      style={{
        width: `min(100%, ${width}px)`,
        paddingTop: `min(${height}px, ${(height / width) * 100}%)`,
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          background: "#010101",
          border: "1px solid #101315",
          borderRadius: `min(15vw, ${0.15 * width}px)`, // 15% of width prop
          boxShadow: " inset 0 0 0 1px #b0b8c0, inset 0 0 0 3px #3b4147",
          height: "100%",
          padding: `min(4vw, ${0.04 * width}px)`, // 4% of width prop
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "darkgrey",
            width: "100%",
            height: "100%",
            borderRadius: `min(11vw, ${0.11 * width}px)`, // 12% of width prop
            overflow: "hidden",
          }}
        >
          <img src={imageSrc} alt="" width="100%" height="100%" />
        </div>
      </div>
    </div>
  );
};

export default IPhone14;
