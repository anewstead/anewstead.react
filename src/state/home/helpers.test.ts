import { thumbHelper } from "./helpers";

import type { ICheckbox } from "./state";
import type { IMainData } from "../main-data/state";

describe("thumbHelper", () => {
  const site = { type: "site" } as IMainData;
  const app = { type: "app" } as IMainData;
  const banner = { type: "banner" } as IMainData;
  const data = [site, site, site, site, app, app, banner];

  const cb = [
    { id: "site", checked: true },
    { id: "app", checked: true },
    { id: "banner", checked: true },
  ] as ICheckbox[];

  test("return all (length 7/7)", () => {
    const thumbs = thumbHelper(data, cb);
    expect(thumbs).toHaveLength(7);
  });

  test("return none (length 0/7)", () => {
    cb[0].checked = false;
    cb[1].checked = false;
    cb[2].checked = false;
    const thumbs = thumbHelper(data, cb);
    expect(thumbs).toHaveLength(0);
  });

  test("return site only (length 4/7)", () => {
    cb[0].checked = true;
    cb[1].checked = false;
    cb[2].checked = false;
    const thumbs = thumbHelper(data, cb);
    expect(thumbs).toHaveLength(4);
  });

  test("return app only (length 2/7)", () => {
    cb[0].checked = false;
    cb[1].checked = true;
    cb[2].checked = false;
    const thumbs = thumbHelper(data, cb);
    expect(thumbs).toHaveLength(2);
  });

  test("return banner only (length 1/7)", () => {
    cb[0].checked = false;
    cb[1].checked = false;
    cb[2].checked = true;
    const thumbs = thumbHelper(data, cb);
    expect(thumbs).toHaveLength(1);
  });

  test("return app and banner (length 3/7)", () => {
    cb[0].checked = false;
    cb[1].checked = true;
    cb[2].checked = true;
    const thumbs = thumbHelper(data, cb);
    expect(thumbs).toHaveLength(3);
  });
});
