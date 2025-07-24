import React from "react";

const ImagePreview = ({ link }) => {
  return (
    <div className="w-[200px] h-[200px] flex justify-center items-center">
      <img
        className="h-full w-full object-contain"
        src={link}
        alt={"image-preview"}
      />
    </div>
  );
};

export default ImagePreview;
