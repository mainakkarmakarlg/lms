import { useEffect, useState } from "react";
import { IoMdDocument } from "react-icons/io";
import { MdClose, MdDelete } from "react-icons/md";
import Icon from "../../common/Icon";
import Modal from "../../common/modal/Modal";
import PDFViewer from "../../PdfViewer";
import { twMerge } from "tailwind-merge";
import ImagePreview from "../popups/ImagePreview";
import isBlob from "../../../utils/common/isBlob";

const Attachments = ({
  attachments,
  setAttachments,
  width = "full",
  className,
  setError,
  editable = true,
  removedAttachment,
  setRemovedAttachments,
}) => {
  const [localAttachmentPreviews, setLocalAttachmentPreviews] = useState([]);

  useEffect(() => {
    const localImageAttachmentsPreview =
      attachments?.map((file) => {
        const preview = isBlob(file.link)
          ? URL.createObjectURL(file.link)
          : file.link;
        const name = isBlob(file.link) ? file.name : file.link.split("/").pop();
        return {
          id: file.id,
          name: name,
          link: preview,
          type: file.type,
        };
      }) || [];

    setLocalAttachmentPreviews(localImageAttachmentsPreview);
  }, [attachments]);

  const removeAttachment = (e, index) => {
    e.stopPropagation();
    setError("");
    const newAttachments = [...attachments];
    if (
      editable &&
      !isBlob(newAttachments[index]?.link && newAttachments[index]?.link)
    ) {
      const attachmentsIds = [...removedAttachment];

      attachmentsIds.push(newAttachments[index]?.link);
      setRemovedAttachments(attachmentsIds);
    }
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  const removePDFAttachment = (e, index) => {
    e.stopPropagation();
    setError("");
    const newAttachments = [...attachments];
    if (
      editable &&
      !isBlob(newAttachments[index]?.link && newAttachments[index]?.link)
    ) {
      const attachmentsIds = [...removedAttachment];

      attachmentsIds.push(newAttachments[index]?.link);
      setRemovedAttachments(attachmentsIds);
    }

    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  return (
    <div
      className={twMerge(
        "flex items-center space-x-5 justify-center",
        width === "full" ? "w-full" : "w-fit",
        className
      )}
    >
      {localAttachmentPreviews.length > 0 &&
        localAttachmentPreviews.map((attachment, idx) => (
          <div
            className=""
            key={attachment?.id ? attachment.id : new Date().getTime() + idx}
          >
            {attachment?.type === "pdf" && (
              <EachPdfAttachment
                editable={editable}
                attachment={attachment}
                index={idx}
                removeAttachment={removePDFAttachment}
                width={width}
              />
            )}

            {attachment?.type === "image" && (
              <EachAttachment
                editable={editable}
                attachment={attachment}
                index={idx}
                removeAttachment={removeAttachment}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default Attachments;

const EachAttachment = ({ attachment, index, removeAttachment, editable }) => {
  const [open, setOpen] = useState(false);

  const handleCloseViewer = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <div className="mx-auto relative w-[50px] h-[50px] flex items-center space-x-3 justify-center rounded-md bg-gray-200">
      <img
        src={attachment.link}
        alt={`question-attachment-${index}`}
        className="w-[40px] h-[40px] rounded-md object-contain"
      />
      {editable && (
        <div
          onClick={(e) => removeAttachment(e, index)}
          className="cursor-pointer absolute -top-2 -right-2 w-[15px] h-[15px] text-xs bg-gray-100 rounded-full shadow-custom flex items-center justify-center"
        >
          <MdClose />
        </div>
      )}
      <Modal open={open} handleClose={(e) => handleCloseViewer(e)}>
        <div className="w-fit h-[400px]">
          <ImagePreview file={attachment.link} />
        </div>
      </Modal>
    </div>
  );
};

const EachPdfAttachment = ({
  attachment,
  index,
  removeAttachment,
  editable,
  width,
}) => {
  const [open, setOpen] = useState(false);

  const handleCloseViewer = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <div
      onClick={() => setOpen(true)}
      className={twMerge(
        "cursor-pointer relative h-fit flex items-center justify-between rounded-md px-3 py-1 space-x-1 border border-gray-200",
        width === "full" ? "w-full" : "w-fit max-w-[250px]"
      )}
    >
      <Icon onClick={(e) => removeAttachment(e, index)}>
        <IoMdDocument className="text-base text-primary" />
      </Icon>

      <div className="flex items-center space-x-2 overflow-x-hidden w-full">
        <span className="text-sm text-gray-600 mt-[1px] truncate">
          {attachment.name}
        </span>
      </div>
      {editable && (
        <Icon
          onClick={(e) => removeAttachment(e, index)}
          hoverClass="hover:bg-gray-200"
        >
          <MdDelete className="cursor-pointer text-red-500 text-base" />
        </Icon>
      )}

      <Modal open={open} handleClose={(e) => handleCloseViewer(e)}>
        <div className="w-fit h-[400px]">
          <PDFViewer file={attachment.link} />
        </div>
      </Modal>
    </div>
  );
};
