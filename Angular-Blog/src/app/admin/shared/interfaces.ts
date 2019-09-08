export interface IUser{
    email:String,
    password:String,
    returnSecureToken?:boolean
}

export interface IFirebaseResponse{
    idToken:string;
    expiresIn:string;
}