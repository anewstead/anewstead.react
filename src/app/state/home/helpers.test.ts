import type { ICheckbox } from "./state";
import type { IMainData } from "../main-data/state";
import { thumbHelper } from "./helpers";

const site: IMainData = {
  id: 0,
  client: "client",
  brand: "brand",
  project: "project",
  type: "site",
  tech: "html",
  thumb: "url",
  view: {
    type: "gallery",
    width: 300,
    height: 250,
    href: "url",
    poster: "url",
    still: "url",
    stills: ["url"],
  },
  info: "info",
};

const app: IMainData = { ...site, type: "app" };
const banner: IMainData = { ...site, type: "banner" };
const allThumbs: IMainData[] = [site, site, site, site, app, app, banner];

const cb: ICheckbox[] = [
  {
    id: "site",
    label: "Websites",
    checked: true,
  },
  {
    id: "app",
    label: "Apps",
    checked: true,
  },
  {
    id: "banner",
    label: "Adverts",
    checked: true,
  },
];

test("return 'all (length 7/7)' thumb array", () => {
  const thumbs = thumbHelper(allThumbs, cb);
  expect(thumbs).toHaveLength(7);
});

test("return 'none (length 0/7)' thumb array", () => {
  cb[0].checked = false;
  cb[1].checked = false;
  cb[2].checked = false;
  const thumbs = thumbHelper(allThumbs, cb);
  expect(thumbs).toHaveLength(0);
});

test("return 'site only (length 4/7)' thumb array", () => {
  cb[0].checked = true;
  cb[1].checked = false;
  cb[2].checked = false;
  const thumbs = thumbHelper(allThumbs, cb);
  expect(thumbs).toHaveLength(4);
});

test("return 'app only (length 2/7)' thumb array", () => {
  cb[0].checked = false;
  cb[1].checked = true;
  cb[2].checked = false;
  const thumbs = thumbHelper(allThumbs, cb);
  expect(thumbs).toHaveLength(2);
});

test("return 'banner only (length 1/7)' thumb array", () => {
  cb[0].checked = false;
  cb[1].checked = false;
  cb[2].checked = true;
  const thumbs = thumbHelper(allThumbs, cb);
  expect(thumbs).toHaveLength(1);
});

test("return 'app and banner (length 3/7)' thumb array", () => {
  cb[0].checked = false;
  cb[1].checked = true;
  cb[2].checked = true;
  const thumbs = thumbHelper(allThumbs, cb);
  expect(thumbs).toHaveLength(3);
});
