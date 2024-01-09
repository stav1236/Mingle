import { useLayoutEffect } from "react";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { nonTokenAxios } from "@/utilities/axios";
import { useAuth } from "@/contexts/AuthContext";
const birthDayScope = "https://www.googleapis.com/auth/user.birthday.read";
const genderScope = "https://www.googleapis.com/auth/user.gender.read";

const scope = `${birthDayScope} ${genderScope}`;

const GoogleAuthButton = () => {
  const navigate = useNavigate();
  const { onSuccessLogin, clearAuth } = useAuth();

  const responseGoogle = (response) => {
    const { googleId, accessToken, profileObj } = response;
    const { email, familyName, givenName, imageUrl } = profileObj;
    const googleAuthInfo = {
      googleId,
      accessToken,
      email,
      firstName: givenName,
      lastName: familyName,
      imgSrc: imageUrl,
    };

    nonTokenAxios
      .post("/auth/google/", googleAuthInfo)
      .then((response) => {
        onSuccessLogin(response);
        navigate("/");
      })
      .catch((error: any) => {
        clearAuth();
        console.error(error);
      });
  };

  useLayoutEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
        scope,
      });
    };
    gapi.load("client:auth2", start);
  });

  return (
    <GoogleLogin
      scope={scope}
      onFailure={responseGoogle}
      onSuccess={responseGoogle}
      cookiePolicy={"single_host_origin"}
      clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}
      render={(renderProps) => (
        <Button
          startIcon={<GoogleIcon />}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          הזדהות באמצעות גוגל
        </Button>
      )}
    />
  );
};

export default GoogleAuthButton;
