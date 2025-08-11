import { useNavigate, Link, useLocation } from 'react-router-dom';

import { useAppDispatch } from '@/hooks/reduxHooks';
import {
  Button,
  Checkbox,
  Col,
  Flex,
  Modal,
  Row,
} from 'antd';
import type { CheckboxProps } from 'antd';
import { InputField } from '@/components/Form';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  setAuthToken,
  setUserDetails,
  setTempToken,
} from '@/store/slices/auth/authSlice';
import { useUserLoginMutation } from '@/store/apis/authApi';
import { displayError } from '@/shared/utils/display-message-utils';
import { useState } from 'react';
import Verify2faCode from './Verify2faCode';

const loginSchema = yup.object().shape({
  email: yup.string().required('email is required'),
  password: yup.string().required('Password is required'),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [openCodeVerifyModel, setOpenCodeVerifyModel] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const [userLogin, { isLoading: isUserLoginLoading }] = useUserLoginMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const result = await userLogin(data).unwrap();

      if (result?.data.is2FAEnabled) {
        dispatch(
          setTempToken({ tempToken: result?.data.tempToken as string }),
        );
        setOpenCodeVerifyModel(true);
      } else {
        dispatch(
          setAuthToken({
            token: result.data.accessToken,
            refreshToken: result.data.accessToken,
          }),
        );
        dispatch(
          setUserDetails({
            email: result.data.email,
            name: result.data.name ?? "",
            userId: result.data.userId,
            phone: result.data.phone,
            designation: result.data?.designation
          }),
        );
        navigate(from, { replace: true });
      }

    } catch (err) {
      displayError(err);
    }
  };
  const onChange: CheckboxProps['onChange'] = (e) => {
    // handle remembr me
  };

  const handleCloseVerifyModel = () => {
    setOpenCodeVerifyModel(false);
  };

  const handeVerifySuccess = () => {
    navigate(from, { replace: true });
  };
  return (
    <>
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={12}>
            <Col xs={24} md={24}>
              <Label label="Email" />
              <InputField
                size="large"
                name="email"
                control={control}
                error={errors.email?.message ?? ''}
              />
            </Col>
            <Col xs={24} md={24}>
              <Label label="Password" />
              <InputField
                type="password"
                size="large"
                name="password"
                control={control}
                error={errors.password?.message ?? ''}
              />
            </Col>
            <Col xs={24} md={24}>
              <Flex style={{ marginBottom: '1.5rem' }} justify="space-between">
                <Checkbox onChange={onChange} style={{ fontWeight: '500' }}>
                  Remember Me
                </Checkbox>
                <Link style={{ fontWeight: 500 }} to="/auth/forget-password">
                  Forget Password?
                </Link>
              </Flex>
            </Col>

            <Col xs={24} md={24}>
              <Button
                type="primary"
                loading={isUserLoginLoading}
                htmlType="submit"
                size="large"
                style={{ width: '100%' }}
              >
                Login
              </Button>
            </Col>
          </Row>
        </form>
      </>
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

export default LoginForm;

const Label = ({ label }: { label: string }) => {
  return (
    <div className="form-label-wrap">
      <label
        style={{
          fontWeight: 500,
          display: 'inline-block',
          marginBottom: '5px',
        }}
      >
        {label}
      </label>
    </div>
  );
};
