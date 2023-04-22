// import { handlers as foo } from "../src/core/services/__mocks__/server";
import { mswDetectAdBlock } from "../src/core/services/__mocks__/detectAdBlockHandlers";
import { mswLoadMainData } from "../src/core/services/__mocks__/loadMainDataHandlers";

const xx = [mswDetectAdBlock, mswLoadMainData];

export const mswConfig = {
  handlers: xx,
};
