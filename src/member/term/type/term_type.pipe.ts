import {Pipe, PipeTransform} from '@angular/core';

import {MemberTermType} from './term_type.model';

@Pipe({name: 'termType'})
export class MemberTermTypePipe implements PipeTransform {
    transform(value: any, args: any[]): any {
        switch(value) {
            case MemberTermType.Temporary:
                return 'Temporary';
            case MemberTermType.Associate:
                return 'Associate';
            case MemberTermType.General:
                return 'General';
        }
    }
}
