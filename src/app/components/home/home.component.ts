import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Character } from 'src/app/models/character';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  characters:Character[] = []
  length = 826;
  pageSize = 20;
  pageIndex = 1;
  hidePageSize = true;
  showFirstLastButtons = true;
  pageEvent: PageEvent = new PageEvent;

  constructor(private dataServ:DataService){
    dataServ.getCharacters(dataServ.CHARACTERS_URL).subscribe({
      next: data=> this.characters=data,
      error: err => console.log(err),
    })
  }

  handlePageEvent(e: PageEvent) {

    console.log(this.dataServ.characterPageInfo);
    this.pageEvent = e;
    console.log(e);

    if(e.previousPageIndex==null || e.pageIndex===e.previousPageIndex+1)
      {
        this.dataServ.getCharacters(this.dataServ.characterPageInfo.next).subscribe({
          next: data=> this.characters=data,
          error: err => console.log(err),
        })
      }
     else if(e.pageIndex===e.previousPageIndex-1)
      {
        this.dataServ.getCharacters(this.dataServ.characterPageInfo.prev).subscribe({
          next: data=> this.characters=data,
          error: err => console.log(err),
        })
      }
     else if(e.pageIndex===Math.floor(this.length/this.pageSize))
      {
        console.log('AAAAAAAA');

        this.dataServ.getCharacters(this.dataServ.CHARACTERS_URL+'?page='+Math.floor(this.length/this.pageSize+1)).subscribe({
          next: data=> this.characters=data,
          error: err => console.log(err),
        })
      }
     else if(e.pageIndex===0)
      {
        this.dataServ.getCharacters(this.dataServ.CHARACTERS_URL+'?page=1').subscribe({
          next: data=> this.characters=data,
          error: err => console.log(err),
        })
      }
  }

}
