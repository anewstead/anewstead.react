import { getStoryContext } from "@storybook/test-runner";

/**
 * Ensure test-runner tests with custom viewport.\
 * Just create a story with specified viewport with relating tests.\
 * Note.\
 * If using chromatic, it takes regression screenshots of each story in
 * different viewports, so having to setup unit/interaction test like this may
 * lead to duplicates hopefully a solution is coming!\
 * https://github.com/storybookjs/storybook/issues/21828
 * https://github.com/storybookjs/test-runner/issues/85
 * https://github.com/storybookjs/test-runner/issues/78
 */
const ensureTestRunnerHasExpectedViewport = async (page, story) => {
  const context = await getStoryContext(page, story);
  const viewPortParams = context.parameters?.viewport;
  const defaultViewport = viewPortParams?.defaultViewport;
  const viewport =
    defaultViewport && viewPortParams.viewports[defaultViewport].styles;
  const parsedViewportSizes =
    viewport &&
    Object.entries(viewport).reduce((acc, [screen, size]) => {
      return {
        ...acc,
        [screen]: parseInt(String(size), 10),
      };
    }, {});
  if (parsedViewportSizes) {
    page.setViewportSize(parsedViewportSizes);
  }
};

// eslint-disable-next-line import/no-default-export
export default {
  async preVisit(page, story) {
    await ensureTestRunnerHasExpectedViewport(page, story);
  },
};
