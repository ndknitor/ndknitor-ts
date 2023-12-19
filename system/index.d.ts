export declare function replaceElement<T>(array: T[], replacer: T, comparator: (v: T) => boolean): T[];
export declare function mergeElement<T>(array: T[], merger: T, comparator: (v: T) => boolean): T[];
export declare function range(start: number, end: number): number[];
export declare function propertyName(propertyFunction: Function): string;
export declare function formatNumber(num: number | undefined, separator?: string): string;
export declare function truncateString(str: string | undefined, wordCount: number): string;
export declare function randomInt(min: number, max: number): number;
