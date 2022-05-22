import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './layout/header/header.component';
import { AuthGuard } from './auth.guard';
import { DefaultInterceptor } from './interceptors/default.interceptor';
import { NotFoundComponent } from './layout/not-found/not-found.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, NotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
