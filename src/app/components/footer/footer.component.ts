import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../core/audio.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    showPlayer: boolean = false;
    constructor(private audioService: AudioService) {}

    ngOnInit() {
        console.log('footer.component', 'ngOnInit');
        this.audioService.playStateChanged.subscribe(s => {
            this.showPlayer = s !== -1;
        });
    }
}
