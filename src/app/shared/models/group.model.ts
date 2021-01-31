export class GroupModel {
  get achievements(): string {
    return this._achievements;
  }

  set achievements(value: string) {
    this._achievements = value;
  }

  get punten(): number {
    return this._punten;
  }

  set punten(value: number) {
    this._punten = value;
  }
  private _achievements: string;
  private _punten: number;

  constructor(achievements: string, punten: number) {
    this._achievements = achievements;
    this._punten = punten;
  }
}
