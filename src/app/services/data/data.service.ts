import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Character } from 'src/app/models/character';
import { CharacterPageInfo } from 'src/app/models/characterPageInfo';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly BASE_URL = 'https://rickandmortyapi.com/api';

  readonly CHARACTERS_URL = this.BASE_URL + '/character';

  readonly LOCATIONS_URL = this.BASE_URL + '/location';

  characterPageInfo: CharacterPageInfo={
    "count": 826,
    "pages": 42,
    "next": "",
    "prev": null
  };
  locationPageInfo={};
  episodesPageInfo={};

  constructor(private http:HttpClient) { }


  getCharacters(url:string): Observable<Character[]>{
    console.log('chiamati');
    return this.http.get<Character[]>(url)
    .pipe(
      map((data: any) =>{
          this.characterPageInfo = data.info;
          console.log('characterPageInfo in dataserv', this.characterPageInfo);
          return data.results as Character[]})
    )
  }

  getLocations(url:string): Observable<Location[]>{
    return this.http.get<any>(url)
    .pipe(
      map((data: any) => {
        this.locationPageInfo = data.info;
        console.log(this.locationPageInfo);

        return data.results})
    )
  }

  getEpisodes(url:string): Observable<Location[]>{
    return this.http.get<any>(url)
    .pipe(
      map((data: any) => {
        this.episodesPageInfo = data.info;
        console.log(this.episodesPageInfo);

        return data.results})
    )
  }
}
