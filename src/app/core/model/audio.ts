export class AudioProcessingMessage {
    processingStatus: number;
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
                return 'Processing';
            case 2:
                return 'Downloading';
            case 3:
                return 'Converting';
            case 4:
                return 'Uploading';
            case 5:
                return 'Processed';
            case 6:
                return 'Failed';
            case 7:
                return 'Deferred';
        }
    }
}
