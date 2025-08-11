export interface GoogleDriveItem {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
  webContentLink: string;
  createdTime: string;
  modifiedTime: string;
  owners: {
    displayName: string;
    emailAddress: string;
  }[];
}
