const contentElement = (
  strings: TemplateStringsArray,
  args: readonly any[]
) => {
  let result: string = '';
  const appends: { [key: string]: any } = {};

  for (let index = 0; index < args.length; index += 1) {
    if (
      args[index] instanceof HTMLElement ||
      args[index] instanceof DocumentFragment
    ) {
      const id = `id${index}`;
      appends[id] = args[index];
      result += `${strings[index]}<div append="${id}"></div>`;
    } else {
      result += strings[index] + args[index];
    }
  }

  result += strings[strings.length - 1];

  const template = document.createElement('template');

  template.innerHTML = result;

  const content = template.content as DocumentFragment;

  [...content.querySelectorAll('[append]')].forEach((refNode) => {
    const newNode = appends[refNode.getAttribute('append')!];
    refNode.parentNode!.insertBefore(newNode, refNode);
    refNode.parentNode!.removeChild(refNode);
  });

  return content;
};

/**
 * Method for extracting DOM references. E.g:
 *  ```js
 *
 *  `;
 *  let {title, list, items} = node.collect();
 *  // ~> title is a dom reference to the inner h1 element.
 *  // ~> list is a dom reference to the inner ul element.
 *  // ~> items is an array of dom references to each li element.
 *  // ~> node is by default the outer most element.
 *
 * @param options.ref options to start the application with
 * @typeParam T  Comment for type `T`.
 * @param app the application to start
 * @returns
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
  return function content(strings: TemplateStringsArray, ...args: any[]) {
    const contentDocumentFragment = contentElement(strings, args);
    const refElements = contentDocumentFragment.querySelectorAll(`[${attr}]`);

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

    return [contentDocumentFragment, collectionOfReferences];
  };
}
