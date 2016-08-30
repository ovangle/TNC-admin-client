

/**
 * Rounds the given number to the nearest lower multiple of toNearest
 * TODO: Should be added to caesium-core
 */
export function roundToFloor(num: number, toNearest: number) {
    return toNearest * Math.floor(num / toNearest);
}

export function roundToCeil(num: number, toNearest: number) {
    return toNearest * Math.ceil(num / toNearest);
}
