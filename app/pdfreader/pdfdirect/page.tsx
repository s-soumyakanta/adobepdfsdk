"use client";

import AdobeFilePreviewDialog from "../../components/AdobeFilePreviewDialog";
import AdobePdfViewer from "../../components/AdobePdfViewer";
import { useBoolean } from "../../hooks/use-boolean";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const adobeFilePreview = useBoolean();
  const fileUrl = 'https://dbegkrglt48mx.cloudfront.net/cms_documents/qwertyuiop.pdf'
  return (
    <>
      <div>
            <h1>Adobe PDF Viwer</h1>

         <AdobePdfViewer pdfUrl={fileUrl} fileName="Test File" /> 
      </div>
    </>
  );
}

export default page