import { InputField } from '@/components/Form';

import {
  useResendRegisterEmailMutation,
  useUserRegisterMutation,
} from '@/store/apis/authApi';

import { displayError, displaySuccess } from '@/shared/utils/display-message-utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Col, Flex, Row, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Link,
} from 'react-router-dom';
import * as yup from 'yup';

const registerSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .test('password-strength', 'Password does not meet requirements', (value) =>
      passwordRequirements.every((requirement) =>
        requirement.test(value || ''),
      ),
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required('Repeat password is required'),
});

const passwordRequirements = [
  {
    test: (password: string) => password && password?.length >= 8,
    message: 'Minimum 8 characters',
  },
  {
    test: (password: string) => /[A-Z]/.test(password),
    message: 'At least one uppercase letter',
  },
  {
    test: (password: string) => /[!@#$&*]/.test(password),
    message: 'At least one special character (!@#$&*)',
  },
];
type RegisterFormData = yup.InferType<typeof registerSchema>;
const RegisterForm = () => {

  const [showResend, setShowResend] = useState(false);
  const [userRegister, { isLoading: registerLoading }] =
    useUserRegisterMutation();
  const [
    resendVerificationEmail,
    { isLoading: resendVerificationEmailLoading },
  ] = useResendRegisterEmailMutation();

  const {
    control,
    watch,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const password = watch('password', '');

  const onSubmit = (data: RegisterFormData) => {
    const payload = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    userRegister({
      body: payload
    })
      .unwrap()
      .then((data) => {
        displaySuccess(data.data.message);
        setShowResend(true);
      })
      .catch((err) => {
        displayError(err);
      });
  };

  const handleResendEmail = () => {
    const email = getValues('email');
    resendVerificationEmail({ email })
      .unwrap()
      .then((data) => {
        displaySuccess(data.data.message);
      })
      .catch((err) => {
        displayError(err);
      });
  };

  return (
    <>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={30}>
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
                size="large"
                name="password"
                type="password"
                control={control}
                error={errors.password?.message ?? ''}
              />
            </Col>
            <Col xs={24} md={24}>
              <Label label="Confirm Password" />
              <InputField
                size="large"
                type="password"
                name="confirmPassword"
                control={control}
                error={errors.confirmPassword?.message ?? ''}
              />
            </Col>
            <Col xs={24} md={24}>
              <ul
                style={{
                  margin: '1rem 0',
                  paddingLeft: '0',
                  listStyle: 'none',
                }}
              >
                {passwordRequirements.map((requirement, index) => {
                  const isMet = requirement.test(password);
                  return (
                    <li
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '8px',
                        color: isMet ? 'green' : 'red',
                        fontWeight: 500,
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-block',
                          marginRight: '10px',
                        }}
                      >
                        {isMet ? '✅' : '❌'}
                      </span>
                      {requirement.message}
                    </li>
                  );
                })}
              </ul>
            </Col>
            <Col xs={24} md={24}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ width: '100%' }}
                loading={registerLoading}
                disabled={!isValid}
              >
                Register
              </Button>
              <Flex justify="center" style={{ marginTop: '1rem' }} gap={10}>
                <Typography>Already have an account? </Typography>{' '}
                <Link to="/auth">Login</Link>
              </Flex>
            </Col>
          </Row>
        </form>
      </Card>
      {showResend && (
        <Flex align="center" justify="center">
          <Paragraph style={{ margin: '0' }}>
            Didn't receive the verification email? Check your spam folder or try
            resending it.
          </Paragraph>
          <Button
            loading={resendVerificationEmailLoading}
            disabled={resendVerificationEmailLoading}
            type="link"
            onClick={handleResendEmail}
          >
            Resend
          </Button>
        </Flex>
      )}
      {showResend && (
        <Paragraph type="warning" style={{ textAlign: 'center' }}>
          You can only resend the verification email once every minute.
        </Paragraph>
      )}
    </>
  );
};

export default RegisterForm;

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
