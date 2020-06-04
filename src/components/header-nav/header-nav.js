import { styled, useTheme } from '@material-ui/core/styles';

import HeaderNavDetail from '../header-nav-detail/header-nav-detail';
import HeaderNavMain from '../header-nav-main/header-nav-main';
import { IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness';
import { toggleTheme } from '../../app/store';
import { useDispatch } from 'react-redux';

const HeaderNav = ({ navType }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const onToggleThemeClick = () => {
    dispatch(toggleTheme());
  };

  const ThemeBtn = styled(IconButton)({
    color: theme.palette.primary['contrastText'],
  });

  const ThemeToggleButton = (
    <ThemeBtn
      edge="start"
      color="inherit"
      aria-label="theme"
      onClick={onToggleThemeClick}
    >
      <SettingsBrightnessIcon fontSize="large" />
    </ThemeBtn>
  );

  const nav =
    navType === 'detail' ? (
      <HeaderNavDetail themeToggleButton={ThemeToggleButton} />
    ) : (
      <HeaderNavMain themeToggleButton={ThemeToggleButton} />
    );

  return <>{nav}</>;
};

HeaderNav.propTypes = {
  navType: PropTypes.string.isRequired,
};

export default HeaderNav;
