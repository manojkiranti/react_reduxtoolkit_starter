import { customBaseQuery } from '@/lib/baseQuery';
import { ApiResponse } from '@/shared/types';
import { GoogleDriveItem } from '@/shared/types';
import { createApi } from '@reduxjs/toolkit/query/react';

export const driveApi = createApi({
  reducerPath: 'driveApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    searchFolderInFileInvite: builder.query<
      ApiResponse<GoogleDriveItem[]>,
      { name: string }
    >({
      query: ({ name }) =>
        `/v1/google-drive/drive/search-folders?name=${encodeURIComponent(name)}`,
    }),
    getFileListOfFolder: builder.query<ApiResponse<GoogleDriveItem[]>, string>({
      query: (folderId) => `/v1/google-drive/drive/files/${folderId}`,
    }),
    getMetaData: builder.query<ApiResponse<any>, string>({
      query: (fileId) => `/v1/google-drive/drive/file/${fileId}`,
    }),
    extractDataFromDriveFile: builder.query<ApiResponse<any>, string>({
      query: (fileId) => `/v1/google-drive/drive/file/data/${fileId}`,
    }),
    extractIdDataFromDriveFile: builder.query<ApiResponse<any>, string>({
      query: (fileId) => `/v1/google-drive/drive/file/id-data/${fileId}`,
    }),
  
  }),
});

export const {
  useSearchFolderInFileInviteQuery,
  useGetFileListOfFolderQuery,
  useGetMetaDataQuery,
  useExtractDataFromDriveFileQuery,
  useExtractIdDataFromDriveFileQuery,
} = driveApi;
