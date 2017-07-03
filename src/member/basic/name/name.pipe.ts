import {Pipe, PipeTransform} from '@angular/core';
import {isBlank} from 'caesium-core/lang';
import {ArgumentError} from 'caesium-json/exceptions';

import {Name} from './name.model';

function capitalizeFirstLetter(name: string) {
    var name = name || '';
    var names = name.split(/\W+/);
    return names.map((n) => {
        return n.charAt(0).toUpperCase() + n.slice(1);
    }).join(' ');
}

@Pipe({name: 'name'})
export class NamePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (isBlank(value))
            return value;
        if (value instanceof Name) {
            if (!value.isAnonymous) {
                return 'Anonymous';
            }
            var fmt = capitalizeFirstLetter(value.firstName);
            fmt += ' ';

            if (value.alias) {
                fmt += `(${capitalizeFirstLetter(value.alias)})`;
                fmt += ' '
            }
            fmt += capitalizeFirstLetter(value.lastName);
            return fmt;
        } else {
            throw new ArgumentError(`Expected a 'Name', got: ${value}`);
        }
    }
}
