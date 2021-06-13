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