import { setupServer } from "msw/node";

import { getStatus, resetStatus, setStatus, statusCodes } from "./status";
import { handlers } from "./handlers";

// This configures a request mocking server with the given request handlers.
const msw = setupServer(...handlers);

// extends server to add status response functionality
export const server = {
  ...msw,
  getStatus,
  resetStatus,
  setStatus,
  statusCodes,
};
