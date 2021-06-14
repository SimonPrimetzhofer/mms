/* tslint:disable */
/* eslint-disable */
import { PictureEntry } from './picture-entry';
import { PortalUser } from './portal-user';
export interface RequestItem {
  description: string;
  relatedPerson: PortalUser;
  relatedPersonUserId?: null | number;
  relatedPicture: PictureEntry;
  relatedPicturePictureId?: null | number;
  requestId?: number;
  title: string;
}
