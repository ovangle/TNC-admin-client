import {
    Component, Input, Output, EventEmitter, ViewEncapsulation,
    ChangeDetectionStrategy, ViewChild, ElementRef
} from 'angular2/core';

import {KeyCode} from '../keycodes.enum';
import {formatPhoneNumber, DIGIT_PLACEHOLDER} from '../pipes/phone_number.pipe';



@Component({
    selector: 'phone-input',
    template: `
    <div class="form-group">
        <label for="phone">{{label}}</label>
        <input #phoneInput name="phone" type="tel" 
            class="form-control"
            [disabled]="disabled"
            [value]="_phoneNumber"
            (keyup)="_phoneNumberChange($event)">
    </div>
    `,
    styles: [],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhoneInput {
    @Input() format:string;
    @Input() label: string;

    _phoneNumber: string;

    @Input()
    set phoneNumber(value: string) {
        this._phoneNumber = formatPhoneNumber(value, this.format);
    }

    /// Only emit a new phone number when we have a complete phone number.
    @Output() phoneNumberChange = new EventEmitter<string>();

    @Input() disabled:boolean = false;

    @ViewChild('phoneInput') _input: ElementRef;

    _handleKeyUp(event: KeyboardEvent) {
        var input: HTMLInputElement = this._input.nativeElement;

        return true;
    }


    _phoneNumberChange(event: KeyboardEvent) {
        var input = this._input.nativeElement;
        if (input.disabled) {
            return true;
        }
        var caretPosition = input.selectionStart;
        var caretAtEnd = false;

        if (caretPosition === input.value.length) {
            caretAtEnd = true;
        }
        if (event.which === KeyCode.Backspace
            && this.format.charAt(input.value.length) !== DIGIT_PLACEHOLDER) {
            input.value = input.value.substr(0, input.value.length - 1);
            return;
        }

        var formatted = formatPhoneNumber(input.value, this.format);

        if (formatted === input.value) {
            this.phoneNumberChange.emit(formatted);
            return true;
        }

        input.value = formatted;

        if (caretAtEnd) {
            caretPosition = input.value.length;
        }

        input.setSelectionRange(caretPosition, caretPosition);
        input.focus();
        return true;
    }

}

