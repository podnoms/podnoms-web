import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { EntityAction, ofEntityOp, OP_ERROR, OP_SUCCESS } from 'ngrx-data';

import { filter } from 'rxjs/operators';
import { ToastService } from '../core';
import { environment } from '../../environments/environment';
@Injectable()
export class NgrxDataToastService {
    constructor(actions$: Actions, toast: ToastService) {
        actions$
            .pipe(
                ofEntityOp(),
                filter(
                    (ea: EntityAction) => ea.op.endsWith(OP_SUCCESS) || ea.op.endsWith(OP_ERROR)
                )
            )
            .subscribe(action => {
                if (!environment.production) {
                    toast.showToast(`${action.entityName} action`, action.op);
                }
            });
    }
}
