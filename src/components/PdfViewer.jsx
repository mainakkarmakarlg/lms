const PDFViewer = ({ file }) => {
  return (
    <iframe
      src={`${file}#toolbar=0&navpanes=0&scrollbar=0`}
      width="100%"
      height="600px"
      style={{ border: "none" }}
      className="h-full w-full"
    ></iframe>
  );
};

export default PDFViewer;
