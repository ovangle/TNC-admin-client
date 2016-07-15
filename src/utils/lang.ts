import {isDefined} from 'caesium-core/lang';

export function provideDefaults(options: any, defaults: any) {
    for (let k of Object.keys(defaults)) {
        if (!isDefined(options[k])) {
            options[k] = defaults[k];
        }
    }
    return options;
}
