// declare global {
//     interface Array<T> {
//         replace(replacer: T, comparator: (v: T) => boolean): T[];
//         merge(array: T[], merger: T, comparator: (v: T) => boolean): T[];
//     }
// }

// Array.prototype.replace = function <T>(replacer: T, comparator: (v: T) => boolean): T[] {
//     return this.map((item) => (comparator(item) ? replacer : item));
// };

// Array.prototype.merge = function <T>(merger: T, comparator: (v: T) => boolean): T[] {
//     const index = this.findIndex(comparator);
//     if (index !== -1) {
//         this[index] = merger;
//     } else {
//         this.push(merger);
//     }
//     return this;
// };

export function range(start: number, end: number) {
    const result: number[] = [];
    for (let i = start; i <= end; i++) {
        result.push(parseInt(i.toString()));
    }
    return result;
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