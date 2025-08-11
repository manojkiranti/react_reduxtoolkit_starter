import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileFormSchema, ProfileFormType } from '../schema/profileSchema';
import { Button, Col, Row } from 'antd';
import { InputField, SelectField } from '@/components/Form';
import PhoneInputField from '@/components/Form/PhoneInputField';
import { useGetOptionsListQuery } from '@/store/apis/coreApi';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { FC, useEffect } from 'react';
import { useUpdateProfileMutation } from '@/store/apis/userApi';
import { displayError, displaySuccess } from '@/shared/utils/display-message-utils';
import { updateUserDetails } from '@/store/slices/auth/authSlice';

interface ProfileProps {
  handleProfileUpdate?: () => void;
}

const Profile: FC<ProfileProps> = ({ handleProfileUpdate }) => {
  const { userData } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileFormSchema),
    defaultValues: {},
  });

  const { data: optionList, isLoading: optionListLoading } =
    useGetOptionsListQuery({ types: ['designation'] });
  const [updateProfile, { isLoading: updateProfileLoading }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (userData) {
      if (userData?.name && userData.name !== '') {
        setValue('name', userData?.name);
      }
      if (userData?.phone && userData.phone !== '') {
        setValue('phone', userData?.phone);
      }
      if (userData?.designation) {
        setValue('designationId', userData?.designation.id);
      }
    }
  }, [userData]);
  const onSubmit: SubmitHandler<ProfileFormType> = (data) => {
    updateProfile(data)
      .unwrap()
      .then((res) => {
        dispatch(
          updateUserDetails({
            name: res.data.name,
            phone: res.data.phone,
            designation: res.data.designation,
          }),
        );
        if(handleProfileUpdate) {
          handleProfileUpdate();
        }        
        displaySuccess('Profile Updated Successfully')
      })
      .catch((errors) => {
        displayError(errors);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={15}>
          <Col xs={24} md={24}>
            <InputField
              label="Full Name"
              name="name"
              control={control}
              error={errors.name?.message ?? ''}
            />
          </Col>
          <Col xs={24} md={24}>
            <PhoneInputField
              label="Phone Number"
              name="phone"
              control={control}
              error={errors.phone?.message ?? ''}
            />
          </Col>
          <Col xs={24} md={24}>
            <SelectField
              options={optionList?.data?.designation ?? []}
              loading={optionListLoading}
              label="Designation"
              name="designationId"
              control={control}
              error={errors.designationId?.message ?? ''}
              showSearch={true}
            />
          </Col>
          <Col xs={24} md={24}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={updateProfileLoading}
            >
              Save Changes
            </Button>
          </Col>
        </Row>
      </form>
    </>
  );
};

export default Profile;
