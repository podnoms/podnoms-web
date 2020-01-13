export class AudioProcessingMessage {
    processingStatus: number;
    progress: string;
    payload: any;
    /*
    percentage: number;
    totalSize: string;
    currentSpeed: string;
    eTA: string;
    */
    static getProcessingStatus(status: number) {
        switch (status) {
            case 0:
                return 'Accepted';
            case 1:
                return 'Parsing';
            case 2:
                return 'Processing';
            case 3:
                return 'Downloading';
            case 4:
                return 'Converting';
            case 5:
                return 'Uploading';
            case 6:
                return 'Processed';
            case 7:
                return 'Failed';
            case 8:
                return 'Deferred';
            case 9:
                return 'Caching';
        }
    }
}
