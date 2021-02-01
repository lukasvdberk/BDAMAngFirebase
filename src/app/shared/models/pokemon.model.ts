export class PokemonModel {
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
  private _attack: number;
  private _defense: number;
  private _height: number;
  private _weight: number;
  private _name: string;
  private _type: string;
  private _id: number;

  constructor(attack: number, defense: number, height: number, weight: number, name: string, type: string, id: number) {
    this._attack = attack;
    this._defense = defense;
    this._height = height;
    this._weight = weight;
    this._name = name;
    this._type = type;
    this._id = id;
  }

  get attack(): number {
    return this._attack;
  }

  set attack(value: number) {
    this._attack = value;
  }

  get defense(): number {
    return this._defense;
  }

  set defense(value: number) {
    this._defense = value;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  get weight(): number {
    return this._weight;
  }

  set weight(value: number) {
    this._weight = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }
}
