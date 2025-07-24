import { FaImages } from "react-icons/fa";
import { VscFilePdf } from "react-icons/vsc";
import {
  MAX_IMAGE_UPLOAD_COUNT,
  MAX_IMAGE_UPLOAD_SIZE,
  MAX_PDF_UPLOAD_COUNT,
  VALID_IMAGE_TYPES,
  VALID_PDF_TYPES,
} from "../../../../../../constants/doubtForum";
import Icon from "../../../../../../components/common/Icon";

const UploadButtons = ({ attachments, setAttachments, setError }) => {
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
    <div className="flex items-start justify-center space-x-2">
      <IconButton
        id={"upload-doubt-answer-image"}
        accept="image/*"
        disabled={checkImageDisabled()}
        onChange={handleImageChange}
        icon={<FaImages className="text-gray-500" />}
      />
      <IconButton
        id={"upload-doubt-answer-pdf"}
        accept="application/pdf"
        disabled={checkPDFDisabled()}
        onChange={handlePDFChange}
        icon={<VscFilePdf className="text-gray-500" />}
      />
    </div>
  );
};

export default UploadButtons;

const IconButton = ({ disabled, icon, id, onChange, accept }) => {
  return (
    <label htmlFor={id}>
      <Icon disabled={disabled} hoverClass="hover:bg-gray-200">
        {icon}
      </Icon>
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
