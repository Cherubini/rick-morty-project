import { Component, Input, SimpleChanges } from '@angular/core';
import { Character } from 'src/app/models/character';
import { Episode } from 'src/app/models/episode';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-episode-card',
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.scss']
})
export class EpisodeCardComponent {

  @Input() episode!: Episode;
  characters: Character[]=[];

  constructor(private dataServ:DataService){
  }

  ngOnInit(): void {
      // Esegui le istruzioni quando 'episode' cambia
      this.dataServ.getEpisodesCharactersData(this.episode.characters).subscribe((results: Character[]) => {
        this.characters=results;
      });
    }

}
