import { h } from "vue";
import type { VNode } from "vue";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import type {
  Block,
  Document,
  Inline,
  Text,
} from "@contentful/rich-text-types";
import { nodeToVueComponent } from "./util/nodeListToVueComponents";

const defaultNodeRenderers: RenderNode = {
  [BLOCKS.DOCUMENT]: (node, children) =>
    h("div", { class: "contents" }, children),
  [BLOCKS.PARAGRAPH]: (node, children) => h("p", {}, children),
  [BLOCKS.HEADING_1]: (node, children) => h("h1", {}, children),
  [BLOCKS.HEADING_2]: (node, children) => h("h2", {}, children),
  [BLOCKS.HEADING_3]: (node, children) => h("h3", {}, children),
  [BLOCKS.HEADING_4]: (node, children) => h("h4", {}, children),
  [BLOCKS.HEADING_5]: (node, children) => h("h5", {}, children),
  [BLOCKS.HEADING_6]: (node, children) => h("h6", {}, children),
  [BLOCKS.EMBEDDED_ENTRY]: (node, children) => h("div", {}, children),

  [BLOCKS.UL_LIST]: (node, children) => h("ul", {}, children),
  [BLOCKS.OL_LIST]: (node, children) => h("ol", {}, children),
  [BLOCKS.LIST_ITEM]: (node, children) => h("li", {}, children),
  [BLOCKS.QUOTE]: (node, children) => h("blockquote", {}, children),
  [BLOCKS.HR]: () => h("hr"),
  [BLOCKS.TABLE]: (node, children) => h("table", [h("tbody", children)]),
  [BLOCKS.TABLE_ROW]: (node, children) => h("tr", {}, children),
  [BLOCKS.TABLE_HEADER_CELL]: (node, children) => h("th", {}, children),
  [BLOCKS.TABLE_CELL]: (node, children) => h("td", {}, children),
  [INLINES.ASSET_HYPERLINK]: (node) =>
    defaultInline(INLINES.ASSET_HYPERLINK, node as Inline),
  [INLINES.ENTRY_HYPERLINK]: (node) =>
    defaultInline(INLINES.ENTRY_HYPERLINK, node as Inline),
  [INLINES.EMBEDDED_ENTRY]: (node) =>
    defaultInline(INLINES.EMBEDDED_ENTRY, node as Inline),
  [INLINES.HYPERLINK]: (node, children) =>
    h("a", { href: node.data.uri }, children),
};

enum MARKS {
  BOLD = "bold",
  ITALIC = "italic",
  UNDERLINE = "underline",
  CODE = "code",
  SUPERSCRIPT = "superscript",
  SUBSCRIPT = "subscript",
}

const defaultMarkRenderers: RenderMark = {
  [MARKS.BOLD]: (text) => h("b", {}, text),
  [MARKS.ITALIC]: (text) => h("i", {}, text),
  [MARKS.UNDERLINE]: (text) => h("u", {}, text),
  [MARKS.CODE]: (text) => h("code", {}, text),
  [MARKS.SUPERSCRIPT]: (text) => h("sup", {}, text),
  [MARKS.SUBSCRIPT]: (text) => h("sub", {}, text),
};

const defaultInline = (type: string, node: Inline) => {
  return h(
    "span",
    {
      type,
      id: node.data.target.sys.id,
    },
    "test",
  );
};

export type CommonNode = Text | Block | Inline;

export interface NodeRenderer {
  (node: Block | Inline, children: VNode): VNode;
}

export interface RenderNode {
  [k: string]: NodeRenderer;
}

export interface RenderMark {
  [k: string]: (text: VNode) => VNode;
}

export interface RenderText {
  (text: string): VNode;
}

export interface Options {
  /**
   * Node renderers
   */
  renderNode?: RenderNode;
  /**
   * Mark renderers
   */
  renderMark?: RenderMark;
  /**
   * Text renderer
   */
  renderText?: RenderText;
  /**
   * Keep line breaks and multiple spaces
   */
  preserveWhitespace?: boolean;
}

/**
 * Serialize a Contentful Rich Text `document` to React tree
 */
export function documentToVueComponents(
  richTextDocument: Document,
  options: Options = {},
): VNode {
  if (!richTextDocument) {
    return h("div");
  }

  return nodeToVueComponent(richTextDocument, {
    renderNode: {
      ...defaultNodeRenderers,
      ...options.renderNode,
    },
    renderMark: {
      ...defaultMarkRenderers,
      ...options.renderMark,
    },
    renderText: options.renderText,
    preserveWhitespace: options.preserveWhitespace,
  });
}
