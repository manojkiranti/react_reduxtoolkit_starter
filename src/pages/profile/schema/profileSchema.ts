import * as yup from 'yup';
export const profileFormSchema = yup.object().shape({
  name: yup.string(),
  phone: yup.string(),
  designationId: yup.number()
});
export type ProfileFormType = yup.InferType<
  typeof profileFormSchema
>;