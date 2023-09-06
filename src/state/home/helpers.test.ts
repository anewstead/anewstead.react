import { thumbHelper } from "./helpers";

import type { ICheckbox } from "./state";
import type { IMainData, IProject } from "../main-data/state";

const website = { type: "website" } as IProject;
const app = { type: "app" } as IProject;
const advert = { type: "advert" } as IProject;

const data: IMainData = {
  projects: [website, website, website, website, app, app, advert],
};

describe("thumbHelper", () => {
  const cb = [
    { id: "website", checked: true },
    { id: "app", checked: true },
    { id: "advert", checked: true },
  ] as ICheckbox[];

  test("return all (length 7/7)", () => {
    const thumbs = thumbHelper(data.projects, cb);
    expect(thumbs).toHaveLength(7);
  });

  test("return none (length 0/7)", () => {
    cb[0].checked = false;
    cb[1].checked = false;
    cb[2].checked = false;
    const thumbs = thumbHelper(data.projects, cb);
    expect(thumbs).toHaveLength(0);
  });

  test("return website only (length 4/7)", () => {
    cb[0].checked = true;
    cb[1].checked = false;
    cb[2].checked = false;
    const thumbs = thumbHelper(data.projects, cb);
    expect(thumbs).toHaveLength(4);
  });

  test("return app only (length 2/7)", () => {
    cb[0].checked = false;
    cb[1].checked = true;
    cb[2].checked = false;
    const thumbs = thumbHelper(data.projects, cb);
    expect(thumbs).toHaveLength(2);
  });

  test("return advert only (length 1/7)", () => {
    cb[0].checked = false;
    cb[1].checked = false;
    cb[2].checked = true;
    const thumbs = thumbHelper(data.projects, cb);
    expect(thumbs).toHaveLength(1);
  });

  test("return app and advert (length 3/7)", () => {
    cb[0].checked = false;
    cb[1].checked = true;
    cb[2].checked = true;
    const thumbs = thumbHelper(data.projects, cb);
    expect(thumbs).toHaveLength(3);
  });
});
