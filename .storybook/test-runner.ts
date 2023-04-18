import { getStoryContext } from "@storybook/test-runner";

/**
 * ensure test-runner tests with custom viewport.
 * just create a story with specified viewport with relating tests.
 * note.
 * if using chromatic, it takes regression screenshots of each story in different viewports,
 * so having to setup unit/interaction test like this may lead to duplicates
 * hopefully a solution is coming!
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

export default {
  async preRender(page, story) {
    await ensureTestRunnerHasExpectedViewport(page, story);
  },
};
