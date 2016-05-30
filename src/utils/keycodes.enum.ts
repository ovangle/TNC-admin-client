import {ArgumentError} from 'caesium-model/exceptions';

export const enum KeyCode {
    Backspace = 8,
    Tab = 9,
    Enter = 13,
    Shift = 16,
    Ctrl = 17,
    Alt  = 18,
    Pause = 19,
    Break = 19,
    CapsLock = 20,
    Esc = 27,
    Space = 32,
    PgUp = 33,
    PdDown = 34,
    End = 35,
    Home = 36,
    LeftArrow = 37,
    UpArrow = 38,
    RightArrow = 39,
    DownArrow = 40,
    Insert = 45,
    Delete = 46,

    Num0 = 48, Num1, Num2, Num3, Num4, Num5, Num6, Num7, Num8, Num9,

    CharA = 65, CharB, CharC, CharD, CharE, CharF, CharG, CharH, CharI, CharJ, CharK, CharL, CharM, CharN,
    CharO, CharP, CharQ, CharR, CharS, CharT, CharU, CharV, CharW, CharX, CharY, CharZ,

    LeftWinKey = 91,
    RightWinKey = 92,
    Select = 93,

    Numpad0 = 96, Numpad1, Numpad2, Numpad3, Numpad4, Numpad5, Numpad6, Numpad7, Numpad8, Numpad9,

    Multiply = 106,
    Add = 107,
    Subtract = 109,
    DecimalPoint = 110,
    Divide = 111,

    Function1 = 112, Function2, Function3, Function4, Function5, Function6, Function7, Function8, Function9,
    Function10, Function11, Function12,

    NumLock = 144,
    ScrollLock = 145,
    SemiColon = 186,
    EqualSign = 187,
    Comma = 188,
    Dash = 189,
    Period = 190,
    ForwardSlash = 191,
    GraveAccent = 192,
    OpenBracket = 219,
    Backslash = 220,
    CloseBracket = 221,
    SingleQuote = 222
}

export function isNumeric(keycode: KeyCode): boolean {
    return (keycode >= KeyCode.Num0 && keycode <= KeyCode.Num9)
        || (keycode >= KeyCode.Numpad0 && keycode <= KeyCode.Numpad9);
}


export function numericValue(keycode: KeyCode): number {
    if (!isNumeric(keycode))
        throw new ArgumentError(`Not a numeric keycode: ${keycode}`);
    if (keycode <= KeyCode.Num9) {
        return keycode - KeyCode.Num0;
    } else {
        return keycode - KeyCode.Numpad0;
    }
}

export function isAlphabetic(keycode: KeyCode): boolean {
    return (keycode >= KeyCode.CharA && keycode <= KeyCode.CharZ);
}

export function getChar(keycode: KeyCode): string {
    return String.fromCharCode(keycode);
}

export function isAlphanumeric(keycode: KeyCode): boolean {
    return isAlphabetic(keycode) || isNumeric(keycode);
}

