import { Pipe, PipeTransform } from '@angular/core';
import { serializer } from './safe.util';

@Pipe({
    name: 'prettyprint',
    pure: false
})
export class PrettyPrintPipe implements PipeTransform {
    transform(obj: any, spaces = 2): string {
        return this._syntaxHighlight(obj, serializer(), spaces);
    }

    private _syntaxHighlight(json: any, serializer: any, spacing: number): string {
        if (json === undefined) {
            return '<span class="undefined"></span>';
        }
        // Credits to the accepted answer here http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
        if (typeof json !== 'string') {
            json = JSON.stringify(json, serializer, spacing);
        }
        json = json
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        return json.replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            function(match: any) {
                let cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key text-primary';
                    } else {
                        cls = 'string text-secondary';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return `<span class="${cls}">${match}</span>`;
            }
        );
    }
}
