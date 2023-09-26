import { Component, ViewChild } from '@angular/core';
import { MatPaginator,  MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { Character } from 'src/app/models/character';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  subscription: Subscription | undefined;
  characters:Character[] = []
  length = 826;
  pageSize = 20;
  pageIndex = 0;
  hidePageSize = true;
  showFirstLastButtons = true;
  pageEvent: PageEvent = new PageEvent;
  query: string = '';
  searchResults: Character[]=[];
  error='';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private dataServ:DataService){


   }

  ngOnInit(): void {
    this.subscription=this.dataServ.getCharacters(this.dataServ.CHARACTERS_URL).subscribe({
      next: data=> this.characters=data,
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
    this.subscription=this.dataServ.searchCharacter(this.query).subscribe({
      next: (data) => {
        this.paginator.firstPage()
        this.dataServ.characterPageInfo=data.info;
        this.characters = data.results;
        console.log(this.characters);
        this.length=data.info.count;
      },
      error: (error) => {
        this.characters=[];
        this.length=0;
        this.error=error.error.error;
        console.error('Error during search:', error);
      }
    });
  }

  resetSearch(){
    this.query='';
    this.paginator.firstPage();
    this.length=826;
    this.unsubscribe(this.subscription);
    this.dataServ.getCharacters(this.dataServ.CHARACTERS_URL).subscribe({
      next: data=> this.characters=data,
      error: err => console.log(err),
    })
    this.dataServ.getCharacters(this.dataServ.CHARACTERS_URL)
  }

  handlePageEvent(e: PageEvent) {
    console.log(this.dataServ.characterPageInfo);
    this.pageEvent = e;
    console.log('e');

    console.log(e);

    if(e.previousPageIndex==null || e.pageIndex===e.previousPageIndex+1)
      {
      this.unsubscribe(this.subscription);
      this.subscription=this.dataServ.getCharacters(this.dataServ.characterPageInfo.next).subscribe({
          next: data=>  {
                        this.characters=data;
                        console.log(this.dataServ.characterPageInfo.next);

                        },
          error: err => console.log(err),
        })
      }
     else if(e.pageIndex===e.previousPageIndex-1)
      {
        this.unsubscribe(this.subscription);
        this.subscription=this.dataServ.getCharacters(this.dataServ.characterPageInfo.prev).subscribe({
          next: data=>  {
                        this.characters=data;

                        },
          error: err => console.log(err),
        })
      }
     else if(e.pageIndex===Math.floor(this.length/this.pageSize))
      {
      this.unsubscribe(this.subscription);
      this.subscription=this.dataServ.getCharacters(this.dataServ.CHARACTERS_URL+'?page='+Math.floor(this.length/this.pageSize+1)+'&name='+this.query).subscribe({
          next: data=> this.characters=data,
          error: err => console.log(err),
        })
      }
     else if(e.pageIndex===0)
      {
        this.unsubscribe(this.subscription);
        this.subscription=this.dataServ.getCharacters(this.dataServ.CHARACTERS_URL+'?page=1'+'&name='+this.query).subscribe({
          next: data=> this.characters=data,
          error: err => console.log(err),
        })
      }
  }


}
