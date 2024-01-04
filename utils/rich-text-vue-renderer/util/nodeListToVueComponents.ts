import type { VNode } from "vue";
import { helpers } from "@contentful/rich-text-types";
import type { Mark } from "@contentful/rich-text-types";
import type { CommonNode, Options } from "..";
import { appendKeyToValidElement } from "./appendKeyToValidElement";

export function nodeListToVueComponents(
  nodes: CommonNode[],
  options: Options,
): VNode {
  return nodes.map((node: CommonNode, index: number): VNode => {
    return appendKeyToValidElement(nodeToVueComponent(node, options), index);
  });
}

export function nodeToVueComponent(node: CommonNode, options: Options): VNode {
  const { renderNode, renderMark, renderText } = options;

  if (helpers.isText(node)) {
    return node.marks.reduce(
      (value: VNode, mark: Mark): VNode => {
        if (!renderMark[mark.type]) {
          return value;
        }
        return renderMark[mark.type](value);
      },
      renderText ? renderText(node.value) : node.value,
    );
  } else {
    const children: VNode = nodeListToVueComponents(node.content, options);
    if (!node.nodeType || !renderNode[node.nodeType]) {
      return h("div", { class: "contents" }, children);
    }
    return renderNode[node.nodeType](node, children);
  }
}
