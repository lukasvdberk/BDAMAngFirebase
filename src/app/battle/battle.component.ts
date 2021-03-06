import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PokemonModel} from '../shared/models/pokemon.model';
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
    trigger('openCloseFast', [
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        opacity: 0,
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
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
  beginBattle3 = false;
  eindBattle = false;
  eindBattleAnim = false;
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
          if (num[0] !== undefined){
            this.pokemonGroep1 = await this.battle.getPokemonsFromGroup(num[0]);
            this.groep1 = String(num[0]);
          }
          if (num[1] !== undefined){
            this.pokemonGroep2 = await this.battle.getPokemonsFromGroup(num[1]);
            this.groep2 = String(num[1]);
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
      this.beginBattle3 = true;
    }, 1500);
    // Begin van het gevecht;

    setTimeout(() => {
      this.fight(this.pok1, 'rechts');
    }, 3500);
    setTimeout(() => {
      this.fight(this.pok2, 'links');
    }, 5000);
    setTimeout(() => {
      this.fade('out', this.pok1, this.pok2);
    }, 6500);
    setTimeout(() => {
      this.ListIndex++;
      this.fade('in', this.pok1, this.pok2);
    }, 8000);
    setTimeout(() => {
      this.fight(this.pok1, 'rechts');
    }, 9500);
    setTimeout(() => {
      this.fight(this.pok2, 'links');
    }, 11000);
    setTimeout(() => {
      this.fade('out', this.pok1, this.pok2);
    }, 12500);
    setTimeout(() => {
      this.ListIndex++;
      this.fade('in', this.pok1, this.pok2);
    }, 14000);
    setTimeout(() => {
      this.fight(this.pok1, 'rechts');
    }, 15500);
    setTimeout(() => {
      this.fight(this.pok2, 'links');
    }, 17000);
    setTimeout(() => {
      this.fade('out', this.pok1, this.pok2);
    }, 18500);
    setTimeout(() => {
      this.switch = !this.switch;
    }, 20000);
    setTimeout(() => {
      this.beginBattle2 = false;
      this.eindBattle = !this.eindBattle;
      this.eindBattleAnim = !this.eindBattleAnim;
    }, 24000);

    // Aan het einde switch weer terug.
    audio.addEventListener('ended', res => {
      setTimeout(() => {
        setTimeout(() => {
          this.beginBattle3 = false;
          this.beginBattle = false;
          this.clearArray();
        }, 10);
      }, 1500);
    });
  }

  pokemonBattle(): void {
    if (!this.pokemonGroep1.length || !this.pokemonGroep2.length){
      this.main.createSimpleNotification('error', '1 of meerdere groepen moeten nog ingeladen worden!');
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

  private clearArray(): void {
    this.main.db.collection('battle').doc('current').set({
      group: []
    });
    this.pokemonGroep1.length = 0;
    this.pokemonGroep2.length = 0;
    this.groep1 = '';
    this.groep2 = '';
  }
}
