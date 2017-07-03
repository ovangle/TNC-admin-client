import {
    Component, Input, Output, EventEmitter,
    ChangeDetectionStrategy,
    SimpleChange
} from '@angular/core';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';

import {formatPhoneNumber, DIGIT_PLACEHOLDER} from '../pipes/phone_number.pipe';

@Component({
    selector: 'phone-input',
    template: `
    <div class="form-group" [ngClass]="{
        'has-errors': control.touched && !control.valid
    }">
        <label class="control-label" for="phone">{{label}}</label>
        <input #phoneInput name="phone" type="tel"
            class="form-control"
            [formControl]="control"
            (keyup)="_phoneNumberChanged($event)">
        <span class="help-block" *ngIf="control.touched && control.errors?.required">
            A value is required
        </span>
        <span class="help-block" *ngIf="control.touched && control.errors?.phoneNumberInvalid">
            Invalid phone number
        </span>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhoneInput {
    @Input() format:string;
    @Input() label: string;

    @Input() phoneNumber: string;

    /// Only emit a new phone number when we have a complete phone number.
    @Output() phoneNumberChange = new EventEmitter<string>();
    @Output() validityChange = new EventEmitter<boolean>();

    @Input() required: boolean = false;
    @Input() disabled:boolean = false;

    control: FormControl;

    ngOnInit() {
        var validators: any[] = [
            phoneNumberValidator(this.format)
        ];
        if (this.required) {
            validators.push(Validators.required)
        }
        this.control = new FormControl({
            value: this.phoneNumber,
            disabled: this.disabled
        }, validators);

        this.control.registerOnChange((value: string) => {
            this.phoneNumberChange.emit(value);
            this.validityChange.emit(this.control.valid);
        });
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (this.control && changes.disabled) {
            let disabled = changes.disabled.currentValue;
            if (disabled) {
                this.control.disable()
            } else {
                this.control.enable();
            }
        }
    }

    _phoneNumberChanged(event: KeyboardEvent) {
        var input = event.target as HTMLInputElement;
        if (input.disabled) {
            return true;
        }
        var caretPosition = input.selectionStart;
        var caretAtEnd = false;

        if (caretPosition === input.value.length) {
            caretAtEnd = true;
        }
        if (event.key === "Backspace"
            && this.format.charAt(input.value.length) !== DIGIT_PLACEHOLDER) {
            input.value = input.value.substr(0, input.value.length - 1);
            return true;
        }

        var formatted = formatPhoneNumber(input.value, this.format);

        //input.value = formatted;
        this.control.setValue(formatted, {emitEvent: true});

        if (caretAtEnd) {
            caretPosition = input.value.length;
        }

        input.setSelectionRange(caretPosition, caretPosition);
        input.focus();
        return true;
    }

}

function phoneNumberValidator(phoneFormat: string): ValidatorFn {
    return (control: FormControl) => {
        if (control.value.length > 0 && control.value.length !== phoneFormat.length) {
            return {
                phoneNumberInvalid: true
            };
        }
        return null;

    }
}


