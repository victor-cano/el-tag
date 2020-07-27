import contentElement from './content.js';

interface References {
  [key: string]:Element|[Element]
}

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
 * @returns Array [Element, References], first item is the Element with content, second position is an Object witht the references is there any.
 *
 */
export default function elTag({
  // collect = true,
  attr = 'ref',
  keepAttribute = false,
  to = {},
}: {
  // collect?: boolean;
  attr?: string;
  keepAttribute?: boolean;
  to?: any;
} = {}) {
  return function content(strings: TemplateStringsArray, ...args: any[]) : [Element, References] {
    const contentDocumentFragment = contentElement(strings, args);
    const refElements = contentDocumentFragment.querySelectorAll(`[${attr}]`);
    let elementReturn : Element;

    const collectionOfReferences = [...refElements].reduce((acc, element) => {
      const propName = element.getAttribute(attr)!.trim();
      if (!keepAttribute) {
        element.removeAttribute(attr);
      }

      if (acc[propName]) {
        acc[propName] = Array.isArray(acc[propName])
          ? [...acc[propName], element]
          : [acc[propName], element];
      } else {
        acc[propName] = element;
      }

      return acc;
    }, to);

    if(contentDocumentFragment.childElementCount === 1){
      elementReturn = contentDocumentFragment.firstElementChild!;
    } else {
      elementReturn = document.createElement('div');
      elementReturn.appendChild(contentDocumentFragment);
    }

    return [elementReturn, collectionOfReferences];
  };
}
