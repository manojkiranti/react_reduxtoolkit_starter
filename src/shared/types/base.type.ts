export type SelectCardDataType = {
  id: number;
  icon: string;
  title: string;
  subTitle?: string;
  name?: string;
};

export type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  data: T;
  message?: string;
};
