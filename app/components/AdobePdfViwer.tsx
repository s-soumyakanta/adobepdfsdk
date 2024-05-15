"use client"

import { useBoolean } from "../hooks/use-boolean";
import AdobeFilePreviewDialog from "./AdobeFilePreviewDialog";

const AdobePdfViwer = () => {
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
        />
      </div>
    </>
  );
};

export default AdobePdfViwer;
