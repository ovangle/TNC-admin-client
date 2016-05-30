
import {Iterable} from 'immutable';

import {Injectable} from "angular2/core";

export const enum LabelSeverity {
    Info,
    Warning,
    Danger
}

export interface AlertLabel {
    text: string;
    severity: LabelSeverity;
    tooltip: string;
    /**
     * A parameter that label detectors can add and use
     * if they want to maintain a static list of labels which
     * may or may not be emitted to the detector.
     * @param obj
     */
    test?: (obj: any) => boolean;
}

/**
 * Implemented by classes which check for alert labels.
 *
 */
export interface CheckForAlertLabels {
    /**
     * Check for any alert labels which apply to `this`.
     */
    checkForAlertLabels(): Iterable<any,AlertLabel | Iterable<any,any>>;
}


