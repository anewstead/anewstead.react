// https://github.com/vitejs/vite/issues/15012
//
// USAGE vite.config.ts :
//
// import { muteWarningsPlugin } from "./vite-mute-warnings-plugin"
//
// const warningsToIgnore = [
//   ['SOURCEMAP_ERROR', "Can't resolve original location of error"],
//   ['INVALID_ANNOTATION', 'contains an annotation that Rollup cannot interpret'],
// ]
//
// export default defineConfig(({ mode }) => ({
//   plugins: [
//    ...
//     muteWarningsPlugin(warningsToIgnore),
//   ],
//

import type { Plugin } from "vite";

export const muteWarningsPlugin = (warningsToIgnore: string[][]): Plugin => {
  const mutedMessages = new Set();
  return {
    name: "mute-warnings",
    enforce: "pre",
    config: (userConfig) => {
      return {
        build: {
          rollupOptions: {
            onwarn(warning, defaultHandler) {
              if (warning.code) {
                const muted = warningsToIgnore.find(([code, message]) => {
                  return (
                    code === warning.code && warning.message.includes(message)
                  );
                });

                if (muted) {
                  mutedMessages.add(muted.join());
                  return;
                }
              }

              if (userConfig.build?.rollupOptions?.onwarn) {
                userConfig.build.rollupOptions.onwarn(warning, defaultHandler);
              } else {
                defaultHandler(warning);
              }
            },
          },
        },
      };
    },
    closeBundle() {
      const diff = warningsToIgnore.filter((x) => {
        return !mutedMessages.has(x.join());
      });
      if (diff.length > 0) {
        this.warn(
          "Some of your muted warnings never appeared during the build process:"
        );
        diff.forEach((m) => {
          return this.warn(`- ${m.join(": ")}`);
        });
      }
    },
  };
};
