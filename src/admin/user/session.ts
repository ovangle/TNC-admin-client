import {isBlank} from 'caesium-core/lang';
import {date, JsonObject, Codec} from 'caesium-model/json_codecs';

export interface SessionToken {
    key: string;
    expires: Date;
}

export const sessionTokenCodec: Codec<SessionToken,JsonObject> = {
    encode: (token) => {
        if (isBlank(token))
            return token;
        return {key: token.key, expires: date.encode(token.expires)};
    },
    decode: (rawToken: JsonObject) => {
        if (isBlank(rawToken))
            return rawToken as SessionToken;
        return {key: rawToken['key'], expires: date.decode(rawToken['key'])};
    }
}

/**
 * Retrieves the current session token from local storage, if one exists.
 *
 * @returns {SessionToken}
 * if both the 'session::key' and 'session::expires' exist in local storage, otherwise `null`.
 */
export function loadToken(): SessionToken {
    var key = window.localStorage.getItem('session::key');
    var timestamp = Number.parseInt(window.localStorage.getItem('session::expires'));
    if (isBlank(key) || isNaN(timestamp))
        return null;
    return {key: key, expires: new Date(timestamp)};
}

export function saveToken(sessionToken: SessionToken) {
    window.localStorage.setItem('session::key', sessionToken.key);
    window.localStorage.setItem('session::expires', `${sessionToken.expires.valueOf()}`);
}

export function isExpired(sessionToken: SessionToken) {
    return sessionToken.expires >= new Date();
}
