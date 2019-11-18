import { Component, OnInit, Input } from '@angular/core';
import { UtilityService } from '../../services/utility.service';

@Component({
    selector: 'app-file-size',
    templateUrl: './file-size.component.html',
    styleUrls: ['./file-size.component.scss']
})
export class FileSizeComponent implements OnInit {
    @Input()
    remoteUrl: string;

    fileSize: number = -1;
    constructor(private utilityService: UtilityService) {}

    ngOnInit() {
        if (this.remoteUrl) {
            this.utilityService.getRemoteFileSize(this.remoteUrl).subscribe(size => (this.fileSize = size));
        }
    }
}
