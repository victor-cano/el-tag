/**
 * https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces
 */
interface DocumentFragment extends Node, NonElementParentNode, ParentNode {
  collect: (options: {
    attr?: string;
    keepAttribute?: boolean | undefined;
    to?: any;
  }) => void;
}
