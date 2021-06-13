/* tslint:disable */
/* eslint-disable */
import { PictureEntry } from './picture-entry';
export interface PortalUser {
  isAdmin?: boolean;
  mail: string;
  pictureEntries: Array<PictureEntry>;
  userId?: number;
  username: string;
}
