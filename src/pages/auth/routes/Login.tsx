import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { Col, Divider, Modal, Row, Typography, theme } from 'antd';
import {
  setAuthToken,
  setUserDetails,
  setTempToken,
} from '@/store/slices/auth/authSlice';
import {
  useFetchGoogleAuthLinkQuery,
  useVerifyGoogleTokenMutation,
} from '@/store/apis/authApi';
import { useAppDispatch } from '@/hooks/reduxHooks';
import {
  displayError,
  displayErrorText,
  displaySuccess,
} from '@/shared/utils/display-message-utils';

import { GoogleLoginButton } from '@/components/Elements';
import styles from '../styles/Login.module.scss';
import AuthLayout from '../components/AuthLayout';
import Verify2faCode from '../components/Verify2faCode';
import LoginBanner from '../components/LoginBanner';
import LoginForm from '../components/LoginForm';

const { useToken } = theme;
const Login = () => {
  const { token } = useToken();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const search = location.search;
  const hasRun = useRef(false);
  const [openCodeVerifyModel, setOpenCodeVerifyModel] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const {
    data: googleAuthUrl,
    isLoading: isGoogleAuthUrlLoading,
    isError: isGoogleAuthUrlError,
  } = useFetchGoogleAuthLinkQuery();

  const [
    verifyGoogleToken,
    {
      isSuccess: isVerifyGoogleTokenSuccess,
      isLoading: verifyGoogleTokenLoading,
    },
  ] = useVerifyGoogleTokenMutation();

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const queryParams = queryString.parse(location.search);
    const code = queryParams.code;

    // If the URL contains a Valid auth "code" parameter, 
    // immediately verify the token and log the user in.
    if (queryParams && queryParams.code && !isVerifyGoogleTokenSuccess) {
      if (typeof code === 'string') {
        verifyGoogleToken({ code })
          .unwrap()
          .then((response) => {
            if (response?.data.is2FAEnabled) {
              dispatch(
                setTempToken({
                  tempToken: response?.data.tempToken as string,
                }),
              );
              setOpenCodeVerifyModel(true);
            } else {
              dispatch(
                setAuthToken({
                  token: response.data.accessToken,
                  refreshToken: response.data.accessToken,
                }),
              );
              dispatch(
                setUserDetails({
                  email: response.data.email,
                  name: response.data.name ?? '',
                  userId: response.data.userId,
                  phone: response.data?.phone,
                  designation: response.data?.designation,
                }),
              );
              if (response.message) {
                displaySuccess(response.message);
              }

              navigate(from, { replace: true });
            }
          })
          .catch((error) => {
            displayError(error);
          });
      } else {
        displayErrorText(
          `Expected code to be a string, received: ${typeof code}`,
        );
      }
    }
  }, [search]);

  const handleLoginWithGoogle = () => {
    if (googleAuthUrl) {
      window.location.replace(googleAuthUrl);
    }
  };

  const handleCloseVerifyModel = () => {
    setOpenCodeVerifyModel(false);
  };

  const handeVerifySuccess = () => {
    navigate(from, { replace: true });
  };

  return (
    <>
      <AuthLayout banner={<LoginBanner />}>
        <div>
          <div className={styles.loginTitleContainerStyles}>
            <Typography.Title level={2}>Login</Typography.Title>
            <Typography.Paragraph
              style={{
                color: token.colorTextSecondary,
              }}
            >
              Kindly fill in the information to continue.
            </Typography.Paragraph>
          </div>
          <Row gutter={16}>
            <Col xs={24} md={24}>
              <div className={styles.googleButtonContainerStyles}>
                <GoogleLoginButton
                  handleButtonClick={handleLoginWithGoogle}
                  isLoading={isGoogleAuthUrlLoading}
                  isError={isGoogleAuthUrlError}
                />
              </div>
            </Col>
          </Row>
          <Divider>Or sign in with username</Divider>
          <LoginForm />
        </div>
        <div className={styles.regsiterLink}>
          Don't have an account? <Link to="/auth/register">Create Account</Link>
        </div>
      </AuthLayout>

      <Modal
        title="Two-factor authentication (2FA) has been enabled for your account. Please enter the verification code to proceed"
        open={openCodeVerifyModel}
        onCancel={handleCloseVerifyModel}
        footer={null}
      >
        <Verify2faCode handeVerifySuccess={handeVerifySuccess} />
      </Modal>
    </>
  );
};

export default Login;
