import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthComponent } from './auth/auth.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ShoppingListModule,
    AuthModule,
    SharedModule,
    CoreModule
  ],
  providers: [
],
  bootstrap: [AppComponent]
})
export class AppModule { }
