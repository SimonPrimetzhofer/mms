import { PictureEntry, PortalUser } from "src/app/api/models";

export class LoadPictures {
    static readonly type = '[Portal] Load pictures';

    constructor() {}
}

export class SetUser {
    static readonly type = '[Portal] Set user';

    constructor(public user: PortalUser) {}
}

export class UploadImage {
    static readonly type = '[Editing] Upload image';

    constructor(public pictureEntry: PictureEntry) {}
}