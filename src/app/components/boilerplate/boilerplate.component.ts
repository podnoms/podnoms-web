import { Component, OnInit } from '@angular/core';
import { BoilerplateService } from 'app/shared/services/boilerplate.service';
import { Observable } from 'rxjs';
import { UiStateService } from 'app/core/ui-state.service';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-boilerplate',
    templateUrl: './boilerplate.component.html',
    styleUrls: ['./boilerplate.component.scss']
})
export class BoilerplateComponent implements OnInit {
    boilerplate$: Observable<string>;
    constructor(
        private boilerplateService: BoilerplateService,
        private uiStateService: UiStateService
    ) {
        this.uiStateService.setNakedPage(true);
    }

    ngOnInit(): void {
        this.boilerplate$ = this.boilerplateService
            .getBoilerplate('about')
            .pipe(
                tap(r => {
                    console.log('boilerplate.component', 'tap', r);
                })
            );
    }
}
