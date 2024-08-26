import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { bookReducer } from './state/book.reducer';
import { BookEffects } from './state/book.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { CustomRouterStateSerializer } from './state/router-state';
import {
  HttpClientModule,
  withFetch,
  provideHttpClient,
} from '@angular/common/http';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { FormsModule } from '@angular/forms';
import { BookEditComponent } from './book-edit/book-edit.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookDetailsComponent,
    BookEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ books: bookReducer }),
    EffectsModule.forRoot([BookEffects]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomRouterStateSerializer,
    }),
    // Configure StoreDevtoolsModule
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode in production
    }),
  ],
  providers: [
    provideHttpClient(withFetch()), // Provide HttpClient with fetch configuration
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
