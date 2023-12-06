
export function replaceElement<T>(array: T[], replacer: T, comparator: (v: T) => boolean) {
    return array.map((item) => (comparator(item) ? replacer : item));
}

export function mergeElement<T>(array: T[], merger: T, comparator: (v: T) => boolean){
    const index = array.findIndex(comparator);
    if (index !== -1) {
      array[index] = merger;
    } else {
      array.push(merger);
    }
    return array;
}

export function range(start: number, end: number) {
    return Array.from(Array(end - start + 1).keys()).map(x => x + start);
}

export function propertyName(propertyFunction: Function): string {
    const token = propertyFunction.toString().split('.');
    return token[token.length - 1];
}

export function formatNumber(num: number | undefined, separator: string = ".") {
    if (num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + separator);
    }
    return "";
}

export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function truncateString(str: string | undefined, wordCount: number): string {
    if (str) {
        const words = str.split(" ");
        if (words.length <= wordCount) {
            return str;
        } else {
            return words.slice(0, wordCount).join(" ") + "...";
        }
    }
    return "";
}

export function randomInt(min: number, max: number): number {
    min = Math.floor(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min + 1));
    return randomNumber + min;
}

