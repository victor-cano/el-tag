/** @ignore */ /** */

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

export default contentElement;
