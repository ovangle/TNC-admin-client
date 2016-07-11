import {forwardRef, Directive, ChangeDetectorRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

import {EnumSelect2} from './enum_select.component';

export const ENUM_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EnumSelectValueAccessor),
    multi: true
};

@Directive({
    selector:
        'enum-select2[formControlName],enum-select2[formControl],enum-select2[ngModel]',
    host: {
        '(valueChange)': 'onChange($event)',
        '(touch)': 'onTouched()'
    },
    providers: [ENUM_VALUE_ACCESSOR, EnumSelect2]
})
export class EnumSelectValueAccessor implements ControlValueAccessor {
    onChange = (_: any) => {};
    onTouched = () => {};
    value: any;

    constructor(private enumSelect: EnumSelect2) {}

    writeValue(value: any) {
        this.enumSelect.value = value;
    }

    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }
}
