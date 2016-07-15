import 'rxjs/add/observable/fromEventPattern';
import {Observable} from 'rxjs/Observable';

import {Injectable, ElementRef, Renderer} from '@angular/core';

/**
 * A service which can be used to determine whether a given event
 * is outside the host element.
 *
 * The service should be injected in the providers of the host element,
 * so that it shares the injected `ElementRef`.
 */
@Injectable()
export class MouseEventsOutsideElement {
    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer
    ) {}

    private isOutsideElement(event: MouseEvent) {
        var elementNode: Node = this.elementRef.nativeElement;
        // event.path is not recognised by typescript.
        var eventPath: Array<Node> = (event as any).path;
        return eventPath.every((pathElement:Node) => pathElement !== elementNode);
    }

    private listenDocument(eventName: string): Observable<MouseEvent> {
        var remover: Function;
        return Observable.fromEventPattern<MouseEvent>(
            (handler: Function) => {
                remover = this.renderer.listenGlobal('document', eventName, handler)
            },
            (handler: Function) => {
                console.log(eventName, ' unsubscribed');
                remover();
            }
        ).filter((event) => this.isOutsideElement(event))
    }

    /// Mousedown events which were fired from sources outside the element
    /// The observable must be explicitly unsubscribed when finished.
    get onMousedown(): Observable<MouseEvent> {
        return this.listenDocument('mousedown');
    }

    /// Mouseup events which were fired from sources outside the element
    /// The observable must be explicitly unsubscribed when finished
    get onMouseup(): Observable<MouseEvent> {
        return this.listenDocument('mouseup');

    }

    /// Click events which were fired from sources outside the element
    /// The observable must be unsubscribed when finished.
    get onClick(): Observable<MouseEvent> {
        return this.listenDocument('click');
    }
}
