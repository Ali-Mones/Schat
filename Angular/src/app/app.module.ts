import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastComponent } from './toast/toast.component';
import { ChatInstanceComponent } from './chat/chat-instance/chat-instance.component';
import { FriendsBarComponent } from './chat/friends-bar/friends-bar.component';
import { ChatPageComponent } from './chat/chat-page/chat-page.component';
import { FindFriendsComponent } from './chat/find-friends/find-friends.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ToastComponent,
    ChatInstanceComponent,
    FriendsBarComponent,
    ChatPageComponent,
    FindFriendsComponent,
    HeaderBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
