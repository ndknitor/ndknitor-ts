export function replaceElement(array, replacer, comparator) {
    return array.map((item) => (comparator(item) ? replacer : item));
}
export function mergeElement(array, merger, comparator) {
    const index = array.findIndex(comparator);
    if (index !== -1) {
        array[index] = merger;
    }
    else {
        array.push(merger);
    }
    return array;
}
export function range(start, end) {
    return Array.from(Array(end - start + 1).keys()).map(x => x + start);
}
export function propertyName(propertyFunction) {
    const token = propertyFunction.toString().split('.');
    return token[token.length - 1];
}
export function formatNumber(num, separator = ".") {
    if (num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + separator);
    }
    return "";
}
// export function sleep(ms: number): Promise<void> {
//     return new Promise((resolve) => setTimeOut(resolve, ms));
// }
export function truncateString(str, wordCount) {
    if (str) {
        const words = str.split(" ");
        if (words.length <= wordCount) {
            return str;
        }
        else {
            return words.slice(0, wordCount).join(" ") + "...";
        }
    }
    return "";
}
export function randomInt(min, max) {
    min = Math.floor(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min + 1));
    return randomNumber + min;
}
