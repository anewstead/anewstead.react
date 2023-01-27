import type { Meta, StoryObj } from "@storybook/react";

import HeaderNavThumbs from "./HeaderNavThumbs";
import { initialState } from "../../core/state/home/state";

type Story = StoryObj<typeof HeaderNavThumbs>;
const meta: Meta<typeof HeaderNavThumbs> = {
  component: HeaderNavThumbs,
};
export default meta;

const BRAND = "test brand 123";
const DUMMY = () => {};

export const Default: Story = {
  args: {
    brandName: BRAND,
    checkboxData: initialState.nav.checkboxes,
    onBrandClick: DUMMY,
    onThemeClick: DUMMY,
    onCheckboxChange: DUMMY,
  },
};
