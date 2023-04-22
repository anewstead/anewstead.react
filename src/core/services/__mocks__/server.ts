import { setupServer } from "msw/node";

import { mswDetectAdBlock } from "./detectAdBlockHandlers";
import { mswLoadMainData } from "./loadMainDataHandlers";

export const handlers = [mswLoadMainData, mswDetectAdBlock];

export const server = setupServer(...handlers);
