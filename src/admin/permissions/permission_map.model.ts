import {Iterable, List, Map, Set} from 'immutable';

import {list, map, str, JsonObject} from 'caesium-model/json_codecs';
import {composeCodecs, setToList} from '../../utils/codecs';

export type PermissionMap = Map<string,Set<string>>;

export function mergePermissionMaps(
    permissionMap: PermissionMap,
    ...permissionMaps: PermissionMap[]
) {
    return permissionMap.mergeWith((a1, a2) => a1.union(a2), ...permissionMaps);
}

export const PERMISSION_MAP_CODEC = map<Set<string>>(
    composeCodecs(setToList, list(str))
);

