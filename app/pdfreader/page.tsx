"use client";

import AdobeFilePreviewDialog from "../components/AdobeFilePreviewDialog";
import { useBoolean } from "../hooks/use-boolean";

const page = () => {
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
          open={true}
          fileUrl={fileUrl}
          fileName="Test file"
        />
      </div>
    </>
  );
}

export default page