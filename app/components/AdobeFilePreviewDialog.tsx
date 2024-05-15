'use client';

import { useEffect } from 'react';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import useTheme from '@mui/system/useTheme';
import { Stack } from '@mui/system';
import ViewSDKClient from "../components/adobeViewClientSDK"

type Props = DrawerProps & {
  fileUrl?: string;
  onClose: VoidFunction;
  open: boolean;
};


export default function AdobeFilePreviewDialog({ onClose, open, fileUrl, ...other }: Props) {
    const theme = useTheme();

    useEffect(() => {
        const loadPDF = async () => {
          const viewSDKClient = new ViewSDKClient();
          await viewSDKClient.ready();
          viewSDKClient.previewFile(
            "pdf-div",
            {
              defaultViewMode: "FIT_WIDTH",
              showAnnotationTools: true,
              showLeftHandPanel: true,
              showPageControls: true,
              showDownloadPDF: true,
              showPrintPDF: true,
            },
            
          );
        };
        loadPDF();
      }, []);

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        anchor="right"
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{
          sx: {
            width: 300,
            [theme.breakpoints.up('md')]: {
              width: 800
            },
            [theme.breakpoints.up('sm')]: {
              width: 550
            },
          },
        }}
        {...other}
      >
        <div id='pdf-div' style={{ height: "100vh"}} />         
      </Drawer>
    </>
  );
}
