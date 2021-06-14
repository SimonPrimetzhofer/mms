import { PictureEntry, PortalUser } from "src/app/api/models";

export class LoadPictures {
    static readonly type = '[Portal] Load pictures';

    constructor(public tag?: string) {}
}

export class DeletePicture {
    static readonly type = '[Portal] Delete pictures';

    constructor(public pictureId?: number) {}
}

export class LoadUserPictures {
    static readonly type = '[Portal] Load user pictures';

    constructor(public userId?: string) {}
}

export class EditPicture {
    static readonly type = '[My-Pictures] Edit picture';

    constructor(public payload: {pictureId: number, pictureEntry: any}) {}
}

export class SetUser {
    static readonly type = '[Portal] Set user';

    constructor(public user: PortalUser) {}
}

export class UploadImage {
    static readonly type = '[Editing] Upload image';

    constructor(public pictureEntry: any) {}
}

export class Login {
    static readonly type = '[Portal] Login';
    
    constructor(public payload: { userName: string, password: string }) {}
}

export class Register {
    static readonly type = '[Portal] Register';
    
    constructor(public payload: { userName: string, email: string, password: string }) {}
}
  
export class Logout {
    static readonly type = '[Portal] Logout';
}