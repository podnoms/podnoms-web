export class NotificationOptionBase<T> {
    key: string;
    value: T;
    label: string;
    description: string;
    required: boolean;
    controlType: string;

    constructor(
        options: {
            key?: string;
            value?: T;
            label?: string;
            description?: string;
            required?: boolean;
            controlType?: string;
        } = {}
    ) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.description = options.description || '';
        this.required = !!options.required;
        this.controlType = options.controlType || '';
    }
}
