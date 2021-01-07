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

  get studentnummer() {
    return this._studentnummer;
  }

  set studentnummer(value) {
    this._studentnummer = value;
  }

  get groep() {
    return this._groep;
  }

  set groep(value) {
    this._groep = value;
  }
  private _naam;
  private _wachtwoord;
  private _studentnummer;
  private _groep;

  constructor(naam, wachtwoord, studentnummer, groep) {
    this._naam = naam;
    this._wachtwoord = wachtwoord;
    this._studentnummer = studentnummer;
    this._groep = groep;
  }
}
