import {
    Component, Inject
} from '@angular/core';

import {Modal, ModalContext, MODAL_CONTEXT} from 'utils/modal';
import {Member} from '../member.model';


@Component({
    selector: 'member-signup-success',
    template: `
    <div class="modal-content">
        <div class="modal-header">
             <h4>Member created</h4>
        </div>
        <div class="modal-body">
            <p><strong>id</strong> {{member.id}}</p> 
            <p><strong>name</strong> {{member.name | name }}</p>
            <p><strong>expires</strong>{{ member.term.expires | date }}</p>
        </div> 
        <div class="modal-footer">
            <button class="btn btn-primary" (click)="confirm($event)">OK</button> 
        </div>
    </div>
    `
})
export class MemberSignupSuccess {
    constructor(
        private modal: Modal,
        @Inject(MODAL_CONTEXT) private context: ModalContext
    ) {}

    get member(): Member {
        return this.context['member'];
    }

    get confirm(): (evt: any) => void {
        this.modal.close();
        return this.context['confirm'];
    }

}
