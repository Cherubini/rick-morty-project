import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CharacterCardComponent } from './components/character-card/character-card.component';

import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from './components/header/header.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { EpisodesComponent } from './components/episodes/episodes.component';
import { EpisodeCardComponent } from './components/episode-card/episode-card.component';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: '', component: HomeComponent },   // Route principale
  { path: 'episodes', component: EpisodesComponent}, // Esempio di altra route
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CharacterCardComponent,
    HeaderComponent,
    EpisodesComponent,
    EpisodeCardComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
