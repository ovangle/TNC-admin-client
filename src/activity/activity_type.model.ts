import {Observable} from 'rxjs/Observable';
import {RouterState} from '@angular/router';
import {TaskType} from './task';


export interface ActivityType {
    type: TaskType;
    subtype?: any;
}

export function fromRouterState(routerState: RouterState): Observable<ActivityType> {
    return routerState.queryParams
        .filter(queryParams => queryParams['activity'])
        .map(queryParams => {
            let taskType = queryParams['activity'];
            return {type: taskType};
        });
}

