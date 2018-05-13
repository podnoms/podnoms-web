import { Component, OnInit } from '@angular/core';
import { AudioService } from 'app/services/audio.service';
import { PodnomsAuthService } from 'app/services/podnoms-auth.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    showPlayer: boolean = false;
    constructor(
        private _audioService: AudioService
    ) {}

    ngOnInit() {
        console.log('footer.component', 'ngOnInit');
        this._audioService.playStateChanged.subscribe((s) => {
            this.showPlayer = s != -1;
        });
    }
}
