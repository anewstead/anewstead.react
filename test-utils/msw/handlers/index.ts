import { mswDetectAdBlock } from "./mswDetectAdBlock";
import { mswLoadMainData } from "./mswLoadMainData";

/*
there cam only be 1 handler per URL at a time
I.E. if the same resouce url is referenced twice here only the later is registered
therefore only add the primary use-case handler from each handler file
any alternatives therein are for use per test
E.G.
primary > here: myMockRequestHandler (200 OK)
expect load error > use override in test(): server.use(myMockRequestHandlerReject) (400 bad);
*/

const handlers = [mswLoadMainData, mswDetectAdBlock];
export default handlers;
