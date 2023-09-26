import { sampleAllData } from "../../../test-utils/msw/mockJson";

import {
  getSessionMainData,
  setSessionMainData,
  removeSessionMainData,
} from "./helpers";

import type { AllDataQuery } from "../../services/hygraph/generated/graphql";

describe("sessionMainData", () => {
  const TEST_VALUE: AllDataQuery = sampleAllData;

  beforeEach(() => {
    sessionStorage.clear();
  });

  test("should save, retrieve and remove data from sessionStorage", () => {
    const pre = getSessionMainData();
    expect(pre).toBe(null);

    setSessionMainData(TEST_VALUE);
    const data = getSessionMainData();

    expect(data).toStrictEqual(TEST_VALUE);

    removeSessionMainData();
    const post = getSessionMainData();
    expect(post).toBe(null);
  });
});
