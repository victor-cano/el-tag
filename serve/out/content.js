/** @ignore */ /** */
const contentElement = (strings, args) => {
    let result = '';
    const appends = {};
    for (let index = 0; index < args.length; index += 1) {
        if (args[index] instanceof HTMLElement ||
            args[index] instanceof DocumentFragment) {
            const id = `id${index}`;
            appends[id] = args[index];
            result += `${strings[index]}<div append="${id}"></div>`;
        }
        else {
            result += strings[index] + args[index];
        }
    }
    result += strings[strings.length - 1];
    const template = document.createElement('template');
    template.innerHTML = result;
    const content = template.content;
    [...content.querySelectorAll('[append]')].forEach((refNode) => {
        const newNode = appends[refNode.getAttribute('append')];
        refNode.parentNode.insertBefore(newNode, refNode);
        refNode.parentNode.removeChild(refNode);
    });
    return content;
};
export default contentElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWMsQ0FBQSxNQUFNO0FBRXBCLE1BQU0sY0FBYyxHQUFHLENBQ3JCLE9BQTZCLEVBQzdCLElBQW9CLEVBQ3BCLEVBQUU7SUFDRixJQUFJLE1BQU0sR0FBVyxFQUFFLENBQUM7SUFDeEIsTUFBTSxPQUFPLEdBQTJCLEVBQUUsQ0FBQztJQUUzQyxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFO1FBQ25ELElBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLFdBQVc7WUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLGdCQUFnQixFQUN2QztZQUNBLE1BQU0sRUFBRSxHQUFHLEtBQUssS0FBSyxFQUFFLENBQUM7WUFDeEIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLFVBQVUsQ0FBQztTQUN6RDthQUFNO1lBQ0wsTUFBTSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEM7S0FDRjtJQUVELE1BQU0sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUV0QyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXBELFFBQVEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO0lBRTVCLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUEyQixDQUFDO0lBRXJELENBQUMsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUM1RCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFDO1FBQ3pELE9BQU8sQ0FBQyxVQUFXLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuRCxPQUFPLENBQUMsVUFBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMsQ0FBQztBQUVGLGVBQWUsY0FBYyxDQUFDIn0=