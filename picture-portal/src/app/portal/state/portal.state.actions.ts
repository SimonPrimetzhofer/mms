import { PortalUser } from "src/app/api/models";

export class LoadPictures {
    static readonly type = '[Portal] Load pictures';

    constructor() {}
}

export class SetUser {
    static readonly type = '[Portal] Set user';

    constructor(public user: PortalUser) {}
}

export class Login {
    static readonly type = '[Auth] Login';
    
    constructor(public payload: { userName: string; password: string }) {}
}
  
export class Logout {
    static readonly type = '[Auth] Logout';
}