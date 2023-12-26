import { mswDetectAdBlock } from "./mswDetectAdBlock";
import { mswLoadMainData } from "./mswLoadMainData";

/*
Default handlers array:

there cam only be 1 handler per resource URL at a time
if the same resouce url is referenced twice then the last overwrites previous
ensure only add the primary use-case handler from each handler file here
alternative scenarios are then used as overrides on a per test basis

E.G.
primary case (returns 200 OK):

set here:
handers = [myMockRequestHandler, other, etc] 

test load error (returns 400 bad): 

myUtil.test.ts
import { server } from "../../test-utils/msw/server";
server.use(myMockRequestHandlerReject);

MyComponent.stories.tsx (storybook & msw addon):
parameters: {
  msw: {
    handlers: [myMockRequestHandlerReject],
  },
},
*/

export const handlers = [mswLoadMainData, mswDetectAdBlock];
