import { FaImages } from "react-icons/fa";
import { VscFilePdf } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
import {
  MAX_IMAGE_UPLOAD_COUNT,
  MAX_IMAGE_UPLOAD_SIZE,
  MAX_PDF_UPLOAD_COUNT,
  VALID_IMAGE_TYPES,
  VALID_PDF_TYPES,
} from "../../../constants/doubtForum";

const UploadButtons = ({ attachments, setAttachments, setError, error }) => {
  const handleImageChange = (e) => {
    const uploadedFiles = e.target.files;
    let tempA = [...attachments];
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      if (!VALID_IMAGE_TYPES?.includes(file.type)) {
        setError("Rest uploaded files are not image");
      } else if (tempA.length === MAX_IMAGE_UPLOAD_COUNT) {
        setError(`You can upload maximum ${MAX_IMAGE_UPLOAD_COUNT} images`);
        break;
      } else if (file?.size > MAX_IMAGE_UPLOAD_SIZE) {
        setError(
          `Image size should be less than ${MAX_IMAGE_UPLOAD_SIZE / 1024}MB`
        );
      } else {
        tempA = [
          ...tempA,
          { id: tempA.length + 1, name: file.name, link: file, type: "image" },
        ];
      }
    }
    setAttachments(tempA);
  };

  const handlePDFChange = (e) => {
    const uploadedFiles = e.target.files;
    let tempPdfA = [...attachments];

    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];

      if (!VALID_PDF_TYPES?.includes(file.type)) {
        setError("Rest uploaded files are not PDF");
      } else if (tempPdfA.length === MAX_PDF_UPLOAD_COUNT) {
        setError(`You can upload maximum ${MAX_PDF_UPLOAD_COUNT} PDFs`);
        break;
      } else if (file?.size > MAX_IMAGE_UPLOAD_SIZE) {
        setError(
          `PDF size should be less than ${MAX_IMAGE_UPLOAD_SIZE / 1024}MB`
        );
      } else {
        tempPdfA = [
          ...tempPdfA,
          { id: Date.now(), name: file.name, link: file, type: "pdf" },
        ];
      }
      setAttachments(tempPdfA);
    }
  };

  const checkImageDisabled = () => {
    // if any of attachmentPreviews is pdf or attachments length > 4
    return (
      attachments?.find((file) => file.type === "pdf") || attachments.length > 4
    );
  };

  const checkPDFDisabled = () => {
    // if any of attachmentPreviews is pdf or attachments length > 0
    return (
      attachments?.find((file) => file.type === "pdf") || attachments.length > 0
    );
  };

  return (
    <div className="">
      <div className="flex items-center justify-center w-full space-x-3">
        <FileChipButton
          icon={<FaImages />}
          title="Upload Image"
          onChange={handleImageChange}
          id={"upload-doubt-question-image"}
          accept="image/*"
          disabled={checkImageDisabled()}
        />
        <FileChipButton
          icon={<VscFilePdf />}
          title="Upload PDF"
          onChange={handlePDFChange}
          id={"upload-doubt-question-pdf"}
          accept="application/pdf"
          disabled={checkPDFDisabled()}
        />
      </div>
      <div className="mt-2 w-full text-xs text-gray-400 flex flex-col space-y-3 items-center justify-center">
        <span>Permitted file uploads: Upto 5 images or 1 PDF.</span>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    </div>
  );
};

export default UploadButtons;

const FileChipButton = ({ disabled, icon, title, id, onChange, accept }) => {
  return (
    <label htmlFor={id}>
      <div
        className={twMerge(
          "bg-white border py-2 text-sm px-2 lg:px-6 rounded-full text-primary flex items-center space-x-3 hover:bg-primary/10 duration-300 cursor-pointer",
          disabled &&
            "cursor-not-allowed hover:bg-gray-100 bg-gray-100 opacity-50"
        )}
      >
        <span>{icon}</span>

        <span className="hidden lg:flex">{title}</span>
      </div>
      <input
        disabled={disabled}
        onChange={onChange ? (e) => onChange(e) : null}
        accept={accept}
        multiple={accept === "image/*" ? true : false}
        type="file"
        name={id}
        id={id}
        className="hidden"
      />
    </label>
  );
};
