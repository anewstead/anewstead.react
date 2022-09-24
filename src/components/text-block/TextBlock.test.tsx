import React from "react";
import { render } from "@testing-library/react";

import TextBlock from "./TextBlock";

test("renders TextBlock with good HMTL", async () => {
  const html = "<p>check it</p>";
  const { container: Comp } = render(<TextBlock htmlText={html} />);
  expect(Comp).toContainHTML(html);
});

test("renders TextBlock with bad HMTL", async () => {
  const unsafe = "<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>";
  const safe = "<p>abc</p>";
  const { container: Comp } = render(<TextBlock htmlText={unsafe} />);
  expect(Comp).toContainHTML(safe);
});
