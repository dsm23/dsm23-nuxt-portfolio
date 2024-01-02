// @vitest-environment nuxt
import { describe, expect, it } from "vitest";
import { renderSuspended } from "@nuxt/test-utils/runtime";
import { screen } from "@testing-library/vue";
import Main from "./index.vue";

describe("[Component: Main]", () => {
  it("renders", async () => {
    await renderSuspended(Main, {
      slots: {
        default: () => "Children",
      },
    });

    expect(screen.getByText("Children")).toBeInTheDocument();
  });
});
