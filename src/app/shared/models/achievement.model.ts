export class AchievementModel{
  private _beschrijving: string;
  private _icon: string;
  private _naam: string;
  private _punten: number;

  constructor(beschrijving: string, icon: string, naam: string, punten: number) {
    this._beschrijving = beschrijving;
    this._icon = icon;
    this._naam = naam;
    this._punten = punten;
  }

  get beschrijving(): string {
    return this._beschrijving;
  }

  set beschrijving(value: string) {
    this._beschrijving = value;
  }

  get icon(): string {
    return this._icon;
  }

  set icon(value: string) {
    this._icon = value;
  }

  get naam(): string {
    return this._naam;
  }

  set naam(value: string) {
    this._naam = value;
  }

  get punten(): number {
    return this._punten;
  }

  set punten(value: number) {
    this._punten = value;
  }
}
