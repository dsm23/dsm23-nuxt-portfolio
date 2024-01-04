import type { Options } from "../rich-text-vue-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

enum MARKS {
  BOLD = "bold",
}

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) =>
      h("span", { class: "font-bold text-gray-900 dark:text-white" }, text),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) =>
      h("p", { class: "mt-2 text-gray-900 dark:text-white" }, children),
    [BLOCKS.UL_LIST]: (_, children) =>
      h("ul", { class: "my-2 list-outside list-disc" }, children),
    [BLOCKS.LIST_ITEM]: (_, children) => h("li", { class: "ml-8" }, children),
    // [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
    //   <Image
    //     class="text-center shadow-lg mx-auto max-w-screen-md"
    //     contentfulId={node?.data?.target?.sys?.contentful_id}
    //   />
    // ),
    [INLINES.HYPERLINK]: (node, children) =>
      h(
        "a",
        {
          href: node.data.uri,
          class: "italic",
        },
        children,
      ),
  },
  // renderText: text => text.replace('!', '?'),
};

export default options;
