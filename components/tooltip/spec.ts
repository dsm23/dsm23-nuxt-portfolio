// @vitest-environment nuxt
import { describe, expect, it } from "vitest";
import { renderSuspended } from "@nuxt/test-utils/runtime";
import { screen } from "@testing-library/vue";
import Tooltip from "./index.vue";

describe("[Component: Tooltip]", () => {
  it("renders", async () => {
    await renderSuspended(Tooltip, {
      slots: {
        default: () => "Helpful Text",
      },
    });

    expect(screen.getByText("Helpful Text")).toBeInTheDocument();
  });
});
