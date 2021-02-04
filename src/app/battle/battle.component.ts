import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PokemonModel} from '../shared/models/pokemon.model';
import Swal from 'sweetalert2';
import {MainService} from '../shared/services/main.service';
import {BattleService} from '../shared/services/battle.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css'],
  providers: [BattleService],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        opacity: 0,
      })),
      transition('open => closed', [
        animate('1.5s')
      ]),
      transition('closed => open', [
        animate('1.5s')
      ]),
    ]),
  ],
})
export class BattleComponent implements OnInit {
  public pokemonGroep1: PokemonModel[] = [];
  public groep1: string;
  public pokemonGroep2: PokemonModel[] = [];
  public groep2: string;
  beginBattle = false;
  beginBattle2 = false;
  switch = false;

  @ViewChild('pok1') pok1: ElementRef;
  @ViewChild('pok2') pok2: ElementRef;
  ListIndex = 0;

  constructor(private main: MainService, public battle: BattleService) { }

  async ngOnInit(): Promise<void> {
    this.setUpLink();
  }

  async setUpLink(): Promise<void> {
    await this.battle.getBattle();
    this.battle.battle.forEach(async value => {
      for (const i of value) {
        const val = i.payload.doc;
        if (val.id === 'current') {
          const num = val.data().group;
          this.pokemonGroep1.length = 0;
          this.pokemonGroep2.length = 0;
          if (num[0] !== undefined){
            this.pokemonGroep1 = await this.battle.getPokemonsFromGroup(num[0]);
            this.groep1 = String(num[0]);
            if (num[1] !== undefined){
              this.pokemonGroep2 = await this.battle.getPokemonsFromGroup(num[1]);
              this.groep2 = String(num[1]);
            }
          }
        }
      }
    });
  }

  async battleStart(): Promise<void> {
    this.beginBattle = true;
    const audio = new Audio('../../assets/audio/battle.mp3');
    audio.load();
    audio.play();
    setTimeout(() => {
      this.switch = true;
      this.beginBattle2 = true;
    }, 1500);
    // Begin van het gevecht;

    setTimeout(() => {
      this.fight(this.pok1, 'rechts');
    }, 2500);
    setTimeout(() => {
      this.fight(this.pok2, 'links');
    }, 3500);
    setTimeout(() => {
      this.fade('out', this.pok1, this.pok2);
    }, 4500);
    setTimeout(() => {
      this.ListIndex++;
      this.fade('in', this.pok1, this.pok2);
    }, 5500);
    setTimeout(() => {
      this.fight(this.pok1, 'rechts');
    }, 6500);
    setTimeout(() => {
      this.fight(this.pok2, 'links');
    }, 7500);
    setTimeout(() => {
      this.fade('out', this.pok1, this.pok2);
    }, 8500);
    setTimeout(() => {
      this.ListIndex++;
      this.fade('in', this.pok1, this.pok2);
    }, 9500);
    setTimeout(() => {
      this.fight(this.pok1, 'rechts');
    }, 10500);
    setTimeout(() => {
      this.fight(this.pok2, 'links');
    }, 11500);
    setTimeout(() => {
      this.fade('out', this.pok1, this.pok2);
    }, 12500);

    // Aan het einde switch weer terug.
    audio.addEventListener('ended', res => {
      this.switch = !this.switch;
      setTimeout(() => {
        this.beginBattle2 = !this.beginBattle2;
        setTimeout(() => {
          this.beginBattle = false;
        }, 10);
      }, 1500);
    });
  }

  pokemonBattle(): void {
    if (!this.pokemonGroep1.length){
      // Do nothing
    } else {
      if (this.pokemonGroep1.length > 3 || this.pokemonGroep2.length > 3){
        this.main.createSimpleNotification('warning', 'Kies 3 pokemons per groep');
      } else {
        this.battleStart();
      }
    }
  }

  moveDownwards(groep: number, eigenIndex: number): void {
    if (groep === 1){
      this.pokemonGroep1.splice(eigenIndex + 1, 0, this.pokemonGroep1.splice(eigenIndex, 1)[0]);
    } else if (groep === 2){
      this.pokemonGroep2.splice(eigenIndex + 1, 0, this.pokemonGroep2.splice(eigenIndex, 1)[0]);
    }
  }

  moveUpwards(groep: number, eigenIndex: number): void {
    if (groep === 1){
      this.pokemonGroep1.splice(eigenIndex - 1, 0, this.pokemonGroep1.splice(eigenIndex, 1)[0]);
    } else if (groep === 2){
      this.pokemonGroep2.splice(eigenIndex - 1, 0, this.pokemonGroep2.splice(eigenIndex, 1)[0]);
    }
  }

  removeFromList(lijst: number, index: number): void {
    if (lijst === 1){
      this.pokemonGroep1.splice(index, 1);
    } else if (lijst === 2){
      this.pokemonGroep2.splice(index, 1);
    }
  }

  fight(el: ElementRef, richting: string): void{
    if (richting === 'rechts'){
      setTimeout(() => {
        const audio = new Audio('../../assets/audio/Tackle.mp3');
        audio.load();
        audio.play();
      }, 250 );
      el.nativeElement.animate(
        [
          {transform: 'translateX(0)'},
          {transform: 'translateX(200px)'},
          {transform: 'translateX(0)'},
        ],
        {
          duration: 500,
          delay: 0,
          fill: 'both',
          easing : 'ease-in-out'
        }
      );
    } else if (richting === 'links'){
      setTimeout(() => {
        const audio = new Audio('../../assets/audio/Tackle.mp3');
        audio.load();
        audio.play();
      }, 250 );
      el.nativeElement.animate(
        [
          {transform: 'translateX(0)'},
          {transform: 'translateX(-200px)'},
          {transform: 'translateX(0)'},
        ],
        {
          duration: 500,
          delay: 0,
          fill: 'both',
          easing : 'ease-in-out'
        }
      );
    }

  }

  private fade(fade: string, pok1: ElementRef, pok2: ElementRef): void {
    if (fade === 'out'){
      pok1.nativeElement.animate([
          {opacity: 0},
        ],
        {
          duration: 500,
          delay: 0,
          fill: 'both',
          easing : 'ease-out'
        }
      );
      pok2.nativeElement.animate([
          {opacity: 0},
        ],
        {
          duration: 500,
          delay: 0,
          fill: 'both',
          easing : 'ease-out'
        }
      );
    }
    else if (fade === 'in'){
      pok1.nativeElement.animate([
          {opacity: 1},
        ],
        {
          duration: 500,
          delay: 0,
          fill: 'both',
          easing : 'ease-out'
        }
      );
      pok2.nativeElement.animate([
          {opacity: 1},
        ],
        {
          duration: 500,
          delay: 0,
          fill: 'both',
          easing : 'ease-out'
        }
      );
    }
  }

}
