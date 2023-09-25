import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Episode } from 'src/app/models/episode';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent {

  episodes:Episode[] = []
  length = 51;
  pageSize = 20;
  pageIndex = 1;
  hidePageSize = true;
  showFirstLastButtons = true;
  pageEvent: PageEvent = new PageEvent;
  query: string = '';
  searchResults: Episode[]=[];
  error='';

  constructor(private dataServ:DataService){
    dataServ.getEpisodes(dataServ.EPISODE_URL).subscribe({
      next: data=> this.episodes=data,
      error: err => console.log(err),
    })
    dataServ.getEpisodes(dataServ.EPISODE_URL)

  }

  onSearch(): void {
    this.dataServ.searchEpisode(this.query).subscribe({
      next: (data) => {
        this.error='';
        console.log('data', data);
        this.dataServ.characterPageInfo=data.info;
        this.episodes = data.results;
        console.log(this.episodes);
        this.length=data.info.count;
      },
      error: (error) => {
        this.episodes=[]
        console.error('Error during search:', error);
        this.error=error.error.error;
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    console.log('e');
    console.log(e);

    if(e.previousPageIndex==null || e.pageIndex===e.previousPageIndex+1)
      {
        this.dataServ.getEpisodes(this.dataServ.characterPageInfo.next).subscribe({
          next: data=> this.episodes=data,
          error: err => console.log(err),
        })
      }
     else if(e.pageIndex===e.previousPageIndex-1)
      {
        this.dataServ.getEpisodes(this.dataServ.characterPageInfo.prev).subscribe({
          next: data=> this.episodes=data,
          error: err => console.log(err),
        })
      }
     else if(e.pageIndex===Math.floor(this.length/this.pageSize))
      {
        this.dataServ.getEpisodes(this.dataServ.EPISODE_URL+'?page='+Math.floor(this.length/this.pageSize+1)).subscribe({
          next: data=> this.episodes=data,
          error: err => console.log(err),
        })
      }
     else if(e.pageIndex===0)
      {
        this.dataServ.getEpisodes(this.dataServ.EPISODE_URL+'?page=1').subscribe({
          next: data=> this.episodes=data,
          error: err => console.log(err),
        })
      }
  }
}
