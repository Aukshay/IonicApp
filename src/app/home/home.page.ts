import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string = "";
  password: string = "";

  constructor(public afAuth: AngularFireAuth,
              public user: UserService,
              public router: Router) {}

  async login() {
    const { username, password } = this;
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password);
      
      if(res.user){
        this.user.setUser({
          username,
          uid: res.user.uid
        });
        this.router.navigate(['/tabs']);
      }

    } catch (err) {
      console.dir(err);
      
    }
  }

  gotoref(){
    this.router.navigate(['/reguser']);
  }

}
