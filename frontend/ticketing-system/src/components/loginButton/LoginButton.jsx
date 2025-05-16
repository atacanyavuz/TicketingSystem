import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <Button color="inherit" onClick={() => navigate("/login")}
        sx={{
        ml: "auto"
    }}
    >
      Login
    </Button>
  );
};

export default LoginButton;