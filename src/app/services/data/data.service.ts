import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, tap } from 'rxjs';
import { Character } from 'src/app/models/character';
import { CharacterPageInfo } from 'src/app/models/characterPageInfo';
import { Episode } from 'src/app/models/episode';
import { EpisodePageInfo } from 'src/app/models/episodePageInfo';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly BASE_URL = 'https://rickandmortyapi.com/api';

  readonly CHARACTERS_URL = this.BASE_URL + '/character';

  readonly LOCATIONS_URL = this.BASE_URL + '/location';

  readonly EPISODE_URL = this.BASE_URL + '/episode';



  characterPageInfo: CharacterPageInfo={
    "count": 826,
    "pages": 42,
    "next": "",
    "prev": null
  };
  locationPageInfo={};
  episodesPageInfo: EpisodePageInfo={
    count: 51,
    pages: 3,
    next: "",
    prev: null
  };


  constructor(private http:HttpClient) { }

  searchCharacter(query: string): Observable<any> {
    return this.http.get<any>(`${this.CHARACTERS_URL}?name=${query}`);
  }

  searchEpisode(query: string): Observable<any> {
    return this.http.get<any>(`${this.EPISODE_URL}?name=${query}`);
  }


  getCharacters(url:string): Observable<Character[]>{
    console.log('getCharacters');
    return this.http.get<Character[]>(url)
    .pipe(
      map((data: any) =>{
          this.characterPageInfo = data.info;
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

  getEpisodes(url:string): Observable<Episode[]>{
    return this.http.get<any>(url)
    .pipe(
      map((data: any) => {
        this.episodesPageInfo = data.info;
        return data.results})
    )
  }

  getEpisodesCharactersData(charactersUrls:string[]): Observable<Character[]> {
    const requests = charactersUrls.map(url => this.http.get<Character>(url));
    return forkJoin(requests); // Effettua le chiamate in parallelo
  }
}
