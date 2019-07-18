import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import firebaseConfig from './firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { ShareModule } from './shared.module';
import { AngularFireFunctionsModule, FunctionsRegionToken } from '@angular/fire/functions';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(),
            AppRoutingModule,
            AngularFireModule.initializeApp(firebaseConfig),
          AngularFireAuthModule,
          AngularFirestoreModule,    
          AngularFireFunctionsModule,
          HttpModule,
          ShareModule],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    { provide: FunctionsRegionToken, useValue: ''},
    AuthService,
    // tslint:disable-next-line: deprecation
    HttpClientModule,
    HttpModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
