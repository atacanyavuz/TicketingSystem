import * as React from 'react';
import AppBarContainer from './AppBarContainer';
import LogoTitle from './LogoTitle';
import NavMenu from './NavMenu';
import UserMenu from './UserMenu';

const pages = ['Tickets'];
const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {
  return (
    <AppBarContainer>
      <LogoTitle />
      <NavMenu pages={pages} />
      <UserMenu settings={settings} />
    </AppBarContainer>
  );
}

export default ResponsiveAppBar;
