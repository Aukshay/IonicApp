import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController} from '@ionic/angular';
import { UserService } from '../user.service';
@Component({
  selector: 'app-reguser',
  templateUrl: './reguser.page.html',
  styleUrls: ['./reguser.page.scss'],
})
export class ReguserPage {

  username: string = "";
  password: string = "";
  cpassword: string = "";

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public afstore: AngularFirestore,
    public user: UserService,
    public alertController: AlertController) {}

  ngOnInit(){

  }

  async presentAlert(title: string, content: string){
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });
  }

  async signup() {
    const { username, password } = this;
    if (password !== this.cpassword) {
      this.showAlert('Error!', 'Password didnt matched');
      return console.error("Password didnt matched");

    }
    try {
      
      
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username, password);
      this.afstore.doc('users/' + res.user.uid).set({
        username
      });
      
      this.user.setUser({
        username,
        uid: res.user.uid
      });

      this.presentAlert("Success", "You are registered! ");
      // tslint:disable-next-line: no-unused-expression
      this.router.navigate(['/tabs']);
    } catch(err) {
      console.log(err);
      this.showAlert('Error!', err.message);

  }

  }

  async showAlert(header: string, message: string ) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    });
    await alert.present();
  }
}
