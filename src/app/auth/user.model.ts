export class User{
  constructor(public email,public userId,private _token,private _expirationDate){}

  get token(){

  if(! this._token || this._expirationDate < new Date())
    return null;

    return this._token;

  }

}
