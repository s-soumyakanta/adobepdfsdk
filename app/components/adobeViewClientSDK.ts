class ViewSDKClient {
    readyPromise: Promise<void>;
    
    adobeDCView: any;
  
    constructor() {
      this.readyPromise = new Promise<void>((resolve) => {
        if ((window as any).AdobeDC) {
          resolve();
        } else {
          document.addEventListener("adobe_dc_view_sdk.ready", () => {
            resolve();
          });
        }
      });
      this.adobeDCView = undefined;
    }
  
    ready(): Promise<void> {
      return this.readyPromise;
    }
  
    previewFile(divId: string | undefined, viewerConfig: any): Promise<any> {
      const config: any = {
        /* Pass your registered client id */
        clientId: process.env.NEXT_PUBLIC_ADOBE_PDF_SDK_API_KEY,
      };
      if (divId) { /* Optional only for Light Box embed mode */
        /* Pass the div id in which PDF should be rendered */
        config.divId = divId;
      }
      /* Initialize the AdobeDC View object */
      this.adobeDCView = new (window as any).AdobeDC.View(config);
  
      /* Invoke the file preview API on Adobe DC View object */
      const previewFilePromise = this.adobeDCView.previewFile({
        /* Pass information on how to access the file */
        content: {
          /* Location of file where it is hosted */
          location: {
            url: "https://acrobatservices.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf",
            /*
            If the file URL requires some additional headers, then it can be passed as follows:-
            headers: [
                {
                    key: "<HEADER_KEY>",
                    value: "<HEADER_VALUE>",
                }
            ]
            */
          },
        },
        /* Pass meta data of file */
        metaData: {
          /* file name */
          fileName: "Bodea Brochure.pdf",
          /* file ID */
          id: "6d07d124-ac85-43b3-a867-36930f502ac6",
        }
      }, viewerConfig);
  
      return previewFilePromise;
    }
  
    previewFileUsingFilePromise(divId: string, filePromise: Promise<any>, fileName: string): void {
      /* Initialize the AdobeDC View object */
      this.adobeDCView = new (window as any).AdobeDC.View({
        /* Pass your registered client id */
        clientId: process.env.NEXT_PUBLIC_ADOBE_PDF_SDK_API_KEY,
        /* Pass the div id in which PDF should be rendered */
        divId,
      });
  
      /* Invoke the file preview API on Adobe DC View object */
      this.adobeDCView.previewFile({
        /* Pass information on how to access the file */
        content: {
          /* pass file promise which resolve to arrayBuffer */
          promise: filePromise,
        },
        /* Pass meta data of file */
        metaData: {
          /* file name */
          fileName
        }
      }, {});
    }
  
    registerSaveApiHandler(): void {
      /* Define Save API Handler */
      const saveApiHandler = (metaData: any, content: any, options: any): Promise<any> => {
        console.log(metaData, content, options);
        return new Promise(resolve => {
          /* Dummy implementation of Save API, replace with your business logic */
          setTimeout(() => {
            const response = {
              code: (window as any).AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
              data: {
                metaData: Object.assign(metaData, { updatedAt: new Date().getTime() })
              },
            };
            resolve(response);
          }, 2000);
        });
      };
  
      (this.adobeDCView as any).registerCallback(
        (window as any).AdobeDC.View.Enum.CallbackType.SAVE_API,
        saveApiHandler,
        {}
      );
    }
  
    registerEventsHandler(): void {
      /* Register the callback to receive the events */
      (this.adobeDCView as any).registerCallback(
        /* Type of call back */
        (window as any).AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
        /* call back function */
        (event: any) => {
          console.log(event);
        },
        /* options to control the callback execution */
        {
          /* Enable PDF analytics events on user interaction. */
          enablePDFAnalytics: true,
        }
      );
    }
  }
  
  export default ViewSDKClient;
  