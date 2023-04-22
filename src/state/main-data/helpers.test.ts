import {
  SS_KEY_MAINDATA,
  getSessionMainData,
  setSessionMainData,
} from "./helpers";

describe("sessionMainData", () => {
  const TEST_VALUE = { foo: 1, bar: "2" };

  beforeEach(() => {
    setSessionMainData(TEST_VALUE);
  });

  test("should save to sessionStorage", async () => {
    // eslint-disable-next-line no-underscore-dangle
    expect(sessionStorage.__STORE__[SS_KEY_MAINDATA]).toStrictEqual(
      JSON.stringify(TEST_VALUE)
    );
  });

  test("should retrieve data from sessionStorage", async () => {
    const data = getSessionMainData();
    expect(data).toStrictEqual(TEST_VALUE);
  });

  test("should retrieve null from sessionStorage", async () => {
    sessionStorage.clear();
    const data = getSessionMainData();
    expect(data).toBe(null);
  });
});
