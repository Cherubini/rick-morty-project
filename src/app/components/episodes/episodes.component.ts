import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
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
  pageIndex = 0;
  hidePageSize = true;
  showFirstLastButtons = true;
  pageEvent: PageEvent = new PageEvent;
  query: string = '';
  searchResults: Episode[]=[];
  error='';
  subscription: Subscription | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private dataServ:DataService){ }

  ngOnInit(): void {
    this.dataServ.getEpisodes(this.dataServ.EPISODE_URL).subscribe({
      next: data=> this.episodes=data,
      error: err => console.log(err),
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

 unsubscribe(subscription:Subscription | undefined){
   if (subscription) {
     subscription.unsubscribe();
   }
 }

  onSearch(): void {
    this.unsubscribe(this.subscription);
    this.dataServ.searchEpisode(this.query).subscribe({
      next: (data) => {
        this.paginator.firstPage();
        this.error='';
        console.log('data', data);
        this.dataServ.characterPageInfo=data.info;
        this.episodes = data.results;
        console.log(this.episodes);
        this.length=data.info.count;
      },
      error: (error) => {
        this.episodes=[];
        this.length=0;
        console.error('Error during search:', error);
        this.error=error.error.error;
      }
    });
  }

  resetSearch(){
    this.paginator.firstPage();
    this.query='';
    this.unsubscribe(this.subscription);
    this.subscription=this.dataServ.getEpisodes(this.dataServ.EPISODE_URL).subscribe({
      next: data=> this.episodes=data,
      error: err => console.log(err),
    })
    this.dataServ.getEpisodes(this.dataServ.EPISODE_URL)
    this.length = 51;
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    console.log('e');
    console.log(e);

    if(e.previousPageIndex==null || e.pageIndex===e.previousPageIndex+1)
      {
        console.log('pagina up');
      this.unsubscribe(this.subscription);
      this.subscription=this.dataServ.getEpisodes(this.dataServ.episodesPageInfo.next).subscribe({
          next: data=> this.episodes=data,
          error: err => console.log(err),
        })
      }
     else if(e.pageIndex===e.previousPageIndex-1)
      {
        this.unsubscribe(this.subscription);
        this.subscription=this.dataServ.getEpisodes(this.dataServ.episodesPageInfo.prev).subscribe({
          next: data=> this.episodes=data,
          error: err => console.log(err),
        })
      }
     else if(e.pageIndex===Math.floor(this.length/this.pageSize))
      {
        this.unsubscribe(this.subscription);
        this.subscription=this.dataServ.getEpisodes(this.dataServ.EPISODE_URL+'?page='+Math.floor(this.length/this.pageSize+1)+'&name='+this.query).subscribe({
          next: data=> this.episodes=data,
          error: err => console.log(err),
        })
      }
     else if(e.pageIndex===0)
      {
        this.unsubscribe(this.subscription);
        this.subscription=this.dataServ.getEpisodes(this.dataServ.EPISODE_URL+'?page=1'+'&name='+this.query).subscribe({
          next: data=> this.episodes=data,
          error: err => console.log(err),
        })
      }
  }
}
