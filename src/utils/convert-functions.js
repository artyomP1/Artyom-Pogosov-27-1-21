export function convertFahrToCels(fTemp) {
    return (((fTemp - 32) * 5) / 9).toFixed(0);
}