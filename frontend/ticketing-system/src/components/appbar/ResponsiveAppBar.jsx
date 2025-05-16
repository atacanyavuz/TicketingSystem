import AppBarContainer from './AppBarContainer';
import { useSelector} from "react-redux";
import LogoTitle from './LogoTitle';
import NavMenu from './NavMenu';
import UserMenu from './UserMenu';
import LoginButton from '../loginButton/loginButton';

const pages = ['Tickets'];

function ResponsiveAppBar() {
  const user = useSelector((state) => state.auth.user);

  return (
    <AppBarContainer>
      <LogoTitle />
      {user ? (
        <NavMenu pages={pages} />
      ) : null}
      {user ? (
        <UserMenu sx={{ ml: "auto" }}/>
      ) : <LoginButton/>}      
    </AppBarContainer>
  );
}

export default ResponsiveAppBar;
