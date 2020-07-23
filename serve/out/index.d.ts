/**
 * Method for extracting DOM references. E.g:
 * ```typescript
 * // Or you can specify the language explicitly
 * const instan
 * ```
 *
 * @param attr- Description attr
 * @param keepAttribute - Description keepAttribute
 * @param to - Description to
 * @returns content - DocumentFragment
 *
 */
export default function elTag({ attr, keepAttribute, to, }?: {
    attr?: string;
    keepAttribute?: boolean;
    to?: any;
}): (strings: TemplateStringsArray, ...args: any[]) => any[];
