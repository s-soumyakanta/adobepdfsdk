"use client";

import { useEffect, useState } from "react";
import AdobeFilePreviewDialog from "../components/AdobeFilePreviewDialog";
import AdobePdfViewer from "../components/AdobePdfViewer";
import { useBoolean } from "../hooks/use-boolean";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(()=>{
    setDocUrl('https://dbegkrglt48mx.cloudfront.net/cms_documents/qwertyuiop.pdf')
  },[])
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [docUrl, setDocUrl] = useState<string>("")
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const adobeFilePreview = useBoolean();
  const fileUrl = 'https://dbegkrglt48mx.cloudfront.net/cms_documents/qwertyuiop.pdf'
  return (
    <>
      <div>
        <div>
          <div>
            <h1>Adobe PDF Viwer</h1>
          </div>
          <div>
            <button onClick={() => adobeFilePreview.onTrue()}>Open</button>
            <button onClick={() => adobeFilePreview.onFalse()}>Close</button>
          </div>
        </div>
        <AdobeFilePreviewDialog
          onClose={adobeFilePreview.onFalse}
          open={adobeFilePreview.value}
          fileUrl={fileUrl}
          fileName="Test file"
        />
         <AdobePdfViewer pdfUrl={docUrl} fileName="Test File" /> 
      </div>
    </>
  );
}

export default page