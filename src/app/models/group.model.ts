export class GroupModel {
  get achievements(): string {
    return this._achievements;
  }

  set achievements(value: string) {
    this._achievements = value;
  }

  get groepsnummer(): number {
    return this._groepsnummer;
  }

  set groepsnummer(value: number) {
    this._groepsnummer = value;
  }

  get inlogcode(): string {
    return this._inlogcode;
  }

  set inlogcode(value: string) {
    this._inlogcode = value;
  }

  get punten(): number {
    return this._punten;
  }

  set punten(value: number) {
    this._punten = value;
  }
  private _achievements: string;
  private _groepsnummer: number;
  private _inlogcode: string;
  private _punten: number;

  constructor(achievements: string, groepsnummer: number, inlogcode: string, punten: number) {
    this._achievements = achievements;
    this._groepsnummer = groepsnummer;
    this._inlogcode = inlogcode;
    this._punten = punten;
  }
}
