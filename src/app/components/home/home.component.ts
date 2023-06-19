import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
constructor(private dataServ:DataService){
  dataServ.getCharacters().subscribe({
    next: data=> console.log(data),
    error: err => console.log(err),


  })
 }
}
