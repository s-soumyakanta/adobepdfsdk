// global.d.ts
declare namespace AdobeDC {
    interface ViewConfig {
        clientId: string;
        divId: string;
    }

    class View {
        constructor(config: ViewConfig);
        previewFile(config: {
            content: {
                location: {
                    url: string;
                };
            };
            metaData: {
                fileName: string;
            };
        }): void;
    }
}
