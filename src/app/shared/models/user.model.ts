export class UserModel{
  get naam() {
    return this._naam;
  }

  set naam(value) {
    this._naam = value;
  }

  get wachtwoord() {
    return this._wachtwoord;
  }

  set wachtwoord(value) {
    this._wachtwoord = value;
  }

  private _naam;
  private _wachtwoord;

  constructor(naam, wachtwoord) {
    this._naam = naam;
    this._wachtwoord = wachtwoord;
  }
}
