import {Modal} from './modal/modal.service';

export * from './component_host';
export {Modal};
export {ModalDialog} from './modal/modal_dialog.component';


export const MODAL_PROVIDERS: Array<any> = [
    Modal
];
