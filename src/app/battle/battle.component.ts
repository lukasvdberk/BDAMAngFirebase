import { Component, OnInit } from '@angular/core';
import {PokemonModel} from '../shared/models/pokemon.model';
import Swal from 'sweetalert2';
import {MainService} from '../shared/services/main.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {BattleService} from '../shared/services/battle.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css'],
  providers: [BattleService]
})
export class BattleComponent implements OnInit {
  public pokemonGroep1: PokemonModel[] = [];
  public groep1: string;
  public pokemonGroep2: PokemonModel[] = [];
  public groep2: string;

  constructor(private db: AngularFirestore, private main: MainService, private battle: BattleService) { }

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(): void {
    const groepen = {};
    this.db.collection('groepen').get().toPromise().then(querySnapshot2 => {
      querySnapshot2.forEach(res => {
        groepen[res.id] = 'Groep ' + res.id;
      });
      Swal.fire({
        title: 'Selecteer de eerste groep',
        input: 'select',
        inputOptions: groepen,
        inputPlaceholder: 'Selecteer',
        confirmButtonText: 'Oke',
        cancelButtonText: 'Annuleren',
        showCancelButton: true,
      }).then((result2) => {
        if (result2.isConfirmed) {
          const groepen2 = groepen;
          delete groepen2[result2.value];
          Swal.fire({
            title: 'Selecteer de tegenpartij',
            input: 'select',
            inputOptions: groepen,
            inputPlaceholder: 'Selecteer',
            confirmButtonText: 'Oke',
            cancelButtonText: 'Annuleren',
            showCancelButton: true,
          }).then(async res => {
            if (res.isConfirmed){
              this.pokemonGroep1 = await this.battle.getPokemonsFromGroup(result2.value);
              this.pokemonGroep2 = await this.battle.getPokemonsFromGroup(res.value);
              this.groep1 = result2.value;
              this.groep2 = res.value;
            }
          });
        }
      });
    });
  }

  pokemonBattle(): void {
    if (!this.pokemonGroep1.length){
      this.loadGroups();
    } else {
      if (this.pokemonGroep1.length > 3 || this.pokemonGroep2.length > 3){
        this.main.createSimpleNotification('warning', 'Kies 3 pokemons per groep');
      }
    }
  }
}
