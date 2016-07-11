import {identityConverter} from 'caesium-core/converter';
import {SearchParameter} from 'caesium-model/manager';

export const ID_SEARCH: SearchParameter = {
    name: 'id',
    encoder: identityConverter,
    accessor: (model) => model.id.toString(),
    matcher: (modelValue: string, paramValue: string) => {
        return modelValue.startsWith(paramValue);
    }
};
