import {PokemonModel} from '../models/pokemon.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';

@Injectable()
export class BattleService {
  constructor(private db: AngularFirestore) {}

  async getPokemonsFromGroup(id: number): Promise<PokemonModel[]> {
    const pokemonGroep: PokemonModel[] = [];
    await this.db.collection('groepen').doc(String(id)).get().forEach(value => {
      for (const i of value.data()['pokemon']) {
        this.db.collection('pokemon').doc(String(i)).get().forEach(value2 => {
          let p = value2.data();
          // @ts-ignore
          pokemonGroep.push(new PokemonModel(p.attack, p.defense, p.height, p.weight, p.name[0].toUpperCase() + p.name.substr(1), p.type, i));
        });
      }
    });
    return pokemonGroep;
  }
}
