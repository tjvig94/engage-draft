import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UnitCard } from './components/unit-stack/unit-card.component';

@NgModule({
  declarations: [
    AppComponent,
    UnitCard,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
