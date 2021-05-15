/* tslint:disable */
/* eslint-disable */
import { PortalUser } from './portal-user';
export interface PictureEntry {
  creationDate: string;
  creator?: PortalUser;
  image: string;
  pictureId?: number;
  tag?: null | string;
  title: string;
}
