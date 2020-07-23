import contentElement from './content.js';
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
export default function elTag({ 
// collect = true,
attr = 'ref', keepAttribute = false, to = {}, } = {}) {
    return function content(strings, ...args) {
        const contentDocumentFragment = contentElement(strings, args);
        const refElements = contentDocumentFragment.querySelectorAll(`[${attr}]`);
        const collectionOfReferences = [...refElements].reduce((acc, element) => {
            const propName = element.getAttribute(attr).trim();
            if (!keepAttribute) {
                element.removeAttribute(attr);
            }
            if (acc[propName]) {
                acc[propName] = Array.isArray(acc[propName])
                    ? [...acc[propName], element]
                    : [acc[propName], element];
            }
            else {
                acc[propName] = element;
            }
            return acc;
        }, to);
        return [contentDocumentFragment, collectionOfReferences];
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxjQUFjLE1BQU0sY0FBYyxDQUFDO0FBRTFDOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsS0FBSyxDQUFDO0FBQzVCLGtCQUFrQjtBQUNsQixJQUFJLEdBQUcsS0FBSyxFQUNaLGFBQWEsR0FBRyxLQUFLLEVBQ3JCLEVBQUUsR0FBRyxFQUFFLE1BTUwsRUFBRTtJQUNKLE9BQU8sU0FBUyxPQUFPLENBQUMsT0FBNkIsRUFBRSxHQUFHLElBQVc7UUFDbkUsTUFBTSx1QkFBdUIsR0FBRyxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlELE1BQU0sV0FBVyxHQUFHLHVCQUF1QixDQUFDLGdCQUFnQixDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztRQUUxRSxNQUFNLHNCQUFzQixHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDdEUsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNwRCxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNsQixPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9CO1lBRUQsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2pCLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDMUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsT0FBTyxDQUFDO29CQUM3QixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDOUI7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE9BQU8sQ0FBQzthQUN6QjtZQUVELE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRVAsT0FBTyxDQUFDLHVCQUF1QixFQUFFLHNCQUFzQixDQUFDLENBQUM7SUFDM0QsQ0FBQyxDQUFDO0FBQ0osQ0FBQyJ9