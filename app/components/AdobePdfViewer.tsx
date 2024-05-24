'use client';

import React, { useEffect } from 'react';

interface AdobeViewerProps {
    pdfUrl: string;
    fileName: string;
}

const AdobePdfViewer: React.FC<AdobeViewerProps> = ({ pdfUrl, fileName }) => {
    useEffect(() => {
        let isScriptLoaded = false;
        const scriptId = 'adobe-view-sdk';

        const loadViewer = () => {
            const clientId = process.env.NEXT_PUBLIC_ADOBE_CLIENT_ID as string; // Replace with your actual client ID
            const divId = "adobe-dc-view";
            if (window.AdobeDC) {
                const adobeDCView = new window.AdobeDC.View({ clientId, divId });
                adobeDCView.previewFile({
                    content: { location: { url: pdfUrl } },
                    metaData: { fileName }
                });
            }
        };

        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = "https://acrobatservices.adobe.com/view-sdk/viewer.js";
            script.async = true;
            script.onload = () => {
                document.addEventListener("adobe_dc_view_sdk.ready", loadViewer);
                isScriptLoaded = true;
            };
            document.body.appendChild(script);
        } else {
            loadViewer();  // Script already loaded, directly initialize viewer
        }

        return () => {
            if (isScriptLoaded) {
                // Remove event listener if this effect created it
                document.removeEventListener("adobe_dc_view_sdk.ready", loadViewer);
                // Try to cleanup the Adobe Viewer instance if needed
            }
        };
    }, [pdfUrl, fileName]); // React only on changes to pdfUrl or fileName

    return <div id="adobe-dc-view" style={{ width: "100%", height: "100vh" }} />
};

export default AdobePdfViewer;
