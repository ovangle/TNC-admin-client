import {Injectable} from '@angular/core';
import {FormBuilder} from '@angular/forms';

import {Type} from 'caesium-core/lang';
import {ModelMetadata} from 'caesium-model/model/metadata';

@Injectable()
export class ModelFormBuilder {

    constructor(
        private formBuilder: FormBuilder
    ) {}

    buildForm(type: Type) {
        var metadata = ModelMetadata.forType(type);

        for (var prop in metadata.properties) {

        }
    }
}
