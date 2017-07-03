import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import {Map} from 'immutable';
import {Observable} from 'rxjs/Observable';

import {
    Component, Output, EventEmitter, ChangeDetectionStrategy
} from '@angular/core';
import {Response as HttpResponse} from '@angular/http';

import {Member, member} from '../member.model';
import {MemberManager} from '../member.manager';
import {MemberTerm} from '../term';

import {GENDER_VALUES} from '../basic';

@Component({
    selector: 'partner-create',
    template: `
    <style>
    :host {
        display: block;
    }    
    
    button + button {
        margin-left: 30px;
    }
    
    date-input {
        margin-left: 30px;
    }
    </style>
    
    <div class="well">
        <name-input [name]="partner.name"
            (nameChange)="propChanged('name', $event)"    
            (validityChange)="propValidityChanged('name', $event)">
        </name-input>
        
        <div class="layout horizontal">
            <enum-select2 class="flex"
                [label]="'Gender'"
                [enumValues]="genderValues"
                [value]="partner.gender"
                (valueChange)="propChanged('gender', $event)"></enum-select2>
                
            <date-input class="flex"
                [label]="'Date of Birth'"
                [date]="partner.dateOfBirth"
                (dateChange)="propChanged('dateOfBirth', $event)"
                (validityChange)="propValidityChanged('dateOfBirth', $event)"
                [defaultToday]="false"></date-input>
        </div>
        
        <address-input
            [address]="partner.address"
            (addressChange)="propChanged('address', $event)"></address-input>
            
        <div class="layout horizontal center-justified">
            <button class="btn btn-primary" (click)="_save()" [disabled]="!isValid">
                <i class="fa fa-save"></i> Save
            </button>
            <button class="btn btn-danger" (click)="cancel.emit(true)">
                <i class="fa fa-close"></i> Cancel
            </button>
        </div>
    </div>        
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerCreate {
    private genderValues = GENDER_VALUES;
    private partner: Member;

    @Output() save = new EventEmitter<Member>();
    @Output() cancel = new EventEmitter<any>();
    @Output() validityChange = new EventEmitter<boolean>();

    private errors = Map<string,boolean>({
        name: false,
        dateOfBirth: true
    });

    get isValid() { return this.errors.valueSeq().every(v => v); }

    constructor(private memberManager: MemberManager) { }

    ngOnInit() {
        this.partner = member({
            term: new MemberTerm({type: 'PARTNER'}),
            partnerId: null
        });
    }

    private propChanged(prop: string, value: any) {
        this.partner = this.partner.set(prop, value);
    }

    private propValidityChanged(prop: string, value: boolean) {
        this.errors = this.errors.set(prop, value);
    }

    private _save(): Promise<any> {
        var response = this.memberManager.save(this.partner);

        return response.handle({select: 201, decoder: this.memberManager.modelCodec})
            .forEach((member: Member) => {
                this.save.emit(member);
            })
            .catch((response: HttpResponse) => {
                if (response.status === 400) {
                    this._setServerErrors(response.json());
                    return Observable.of(null);
                }
                return Observable.throw(response);
            })
    }

    private _setServerErrors(serverErrors: {[err: string]: string}): void {

    }
}
