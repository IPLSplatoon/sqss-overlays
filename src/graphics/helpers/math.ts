export function easeOutCirc(x: number): number {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
}

export function distanceBetween(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}
