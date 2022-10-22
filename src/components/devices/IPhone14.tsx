import React, { FC } from "react";

const ASPECT_RATIO = 390 / 844;

type Props = {
  width: number;
  imageSrc: any;
};
const IPhone14: FC<Props> = ({ width, imageSrc }) => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#010101",
          border: "1px solid #101315",
          borderRadius: `min(13vw, ${0.15 * width}px)`, // 15% of width prop
          boxShadow: " inset 0 0 0 1px #b0b8c0, inset 0 0 0 3px #3b4147",

          padding: `min(4vw, ${0.04 * width}px)`, // 4% of width prop
          width: `min(calc(100% - 32px), ${width}px)`,

          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "#000",
            width: "100%",
            aspectRatio: ASPECT_RATIO,
            position: "relative",
            borderRadius: `min(11vw, ${0.11 * width}px)`, // 12% of width prop
            overflow: "hidden",
          }}
        >
          <img
            src={imageSrc}
            alt=""
            width="100%"
            height="100%"
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default IPhone14;
