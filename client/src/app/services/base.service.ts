import { Observable } from 'rxjs/Rx';

export abstract class BaseService {
    constructor() {}

    protected handleError(error: any) {
        const applicationError = error.headers.get('Application-Error');

        // either applicationError in header or model error in body
        if (applicationError) {
            return Observable.throw(applicationError);
        }

        const serverError = error.error.errors[0].description;
        return Observable.throw(serverError || 'Server error');
    }
}
