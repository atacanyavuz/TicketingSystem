import AppBarContainer from './AppBarContainer';
import { useSelector} from "react-redux";
import LogoTitle from './LogoTitle';
import NavMenu from './NavMenu';
import UserMenu from './UserMenu';
import LoginButton from '../loginButton/loginButton';


function ResponsiveAppBar() {
  const user = useSelector((state) => state.auth.user);

  return (
    <AppBarContainer>
      <LogoTitle />
      {user ? (
        <NavMenu/>
      ) : null}
      {user ? (
        <UserMenu sx={{ ml: "auto" }}/>
      ) : <LoginButton/>}      
    </AppBarContainer>
  );
}

export default ResponsiveAppBar;
