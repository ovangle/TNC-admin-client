import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/publishReplay';


import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Member} from './member.model';
import {MemberManager} from './member.manager';

@Injectable()
export class MemberContext {
    constructor(
        private route: ActivatedRoute,
        private memberManager: MemberManager
    ) {}

    member = this.route.params
        .switchMap((params: any) => {
            let id = params['id'];
            let response = this.memberManager.getById(id);
            return response.handle({select: 200, decoder: this.memberManager.modelCodec})
        })
        .switchMap((member: Member) => {
            return member.resolvePartner(this.memberManager);
        })
        .publishReplay(1).refCount();
}
