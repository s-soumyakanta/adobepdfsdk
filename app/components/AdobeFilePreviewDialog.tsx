'use client';

import { useEffect } from 'react';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import useTheme from '@mui/system/useTheme';
import AdobePdfViewer from './AdobePdfViewer';


type Props = DrawerProps & {
  fileUrl: string;
  onClose?: VoidFunction;
  open?: boolean;
  fileName:string;
};



// interface AdobeViewerProps {
//   pdfUrl: string;
//   fileName: string;
// }

export default function AdobeFilePreviewDialog({ onClose, open, fileUrl, fileName, ...other }: Props) {
    const theme = useTheme();

  console.log(fileUrl);
  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        anchor="right"
        // slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{
          sx: {
            width: 300,
            [theme.breakpoints.up('md')]: {
              width: 1000
            },
            [theme.breakpoints.up('sm')]: {
              width: 650
            },
          },
        }}
        {...other}
      >
        <AdobePdfViewer pdfUrl={fileUrl} fileName={fileName} /> 
      </Drawer>
    </>
  );
}
