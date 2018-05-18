import { Observable } from 'rxjs';

export abstract class BaseService {
    constructor() {}

    protected handleError(response: any) {
        const applicationError = response.headers.get('Application-Error');

        // either applicationError in header or model error in body
        if (applicationError) {
            return Observable.throw(applicationError);
        }

        let modelStateErrors: string = '';
        const serverError = response.error;

        if (!serverError.type) {
            for (const key in serverError) {
                if (serverError[key]) {
                    modelStateErrors += serverError[key] + '\n';
                }
            }
        }

        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
        return Observable.throw(modelStateErrors || 'Server error');
    }
}
