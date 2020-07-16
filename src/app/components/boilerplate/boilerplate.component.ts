import { Component, OnInit } from '@angular/core';
import { BoilerplateService } from 'app/shared/services/boilerplate.service';
import { Observable, of } from 'rxjs';
import { UiStateService } from 'app/core/ui-state.service';
import { tap, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-boilerplate',
    templateUrl: './boilerplate.component.html',
    styleUrls: ['./boilerplate.component.scss'],
})
export class BoilerplateComponent implements OnInit {
    boilerplate$: Observable<string>;
    title: string = '';
    content: string = '';
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private boilerplateService: BoilerplateService,
        private uiStateService: UiStateService
    ) {}

    ngOnInit(): void {
        const key = this.route.snapshot.paramMap.get('key');
        if (key) {
            this.boilerplateService.getBoilerplate(key).subscribe(
                (r) => {
                    this.title = r.title;
                    this.content = r.content;
                },
                (err) => this.router.navigateByUrl('/404')
            );
        } else {
            this.router.navigateByUrl('/404');
        }
    }
}
