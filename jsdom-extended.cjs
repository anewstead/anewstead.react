// https://github.com/mswjs/msw/issues/1916

/**
 * Fix to enable MSW 2.0 with jest:\
 * (missing globals)\
 * https://github.com/mswjs/msw/issues/1916
 *
 * Being a more stable fix instead of:\
 * https://mswjs.io/docs/migrations/1.x-to-2.x#requestresponsetextencoder-is-not-defined-jest
 * that required install 'undici'. which was fine at v5\
 * However undici updated to v6 and as of 6.2.0 still errors with ReadableStream\
 * So the inter-dependancy is currently unstable, hence this fix instead.\
 *
 * Side note:\
 * Future update maybe to swap jest for vitest if/when fully adopted in
 * storybook testrunner
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const JSDOMEnvironment = require("jest-environment-jsdom").default; // or import JSDOMEnvironment from 'jest-environment-jsdom' if you are using ESM modules

class JSDOMEnvironmentExtended extends JSDOMEnvironment {
  constructor(...args) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    super(...args);

    this.global.ReadableStream = ReadableStream;
    this.global.TextDecoder = TextDecoder;
    this.global.TextEncoder = TextEncoder;

    this.global.Blob = Blob;
    this.global.File = File;
    this.global.Headers = Headers;
    this.global.FormData = FormData;
    this.global.Request = Request;
    this.global.Response = Response;
    this.global.Request = Request;
    this.global.Response = Response;
    this.global.fetch = fetch;
    this.global.structuredClone = structuredClone;
  }
}

module.exports = JSDOMEnvironmentExtended;
