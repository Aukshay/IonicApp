import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {
  imageURL: string;
  desc: string;
  title: string;

  busy: boolean = false;

  @ViewChild('fileButton') fileButton
  constructor(public http: Http,
              public afstore: AngularFirestore,
              public user: UserService,
              private alertController: AlertController,
              private router: Router) { }

  ngOnInit() {
  }

  async createPost(){
    this.busy = true;
    const image = this.imageURL;
    const desc = this.desc;
    const title = this.title;
    
    this.afstore.doc('users/' + this.user.getUID()).update({
      posts: firestore.FieldValue.arrayUnion(image)
    });
    this.afstore.collection('posts').add({
      image,
      title,
      desc,
      author: this.user.getUsername()
      
    });

    this.busy = false;
    this.imageURL = "";
    this.title = "";
    this.desc = "";
    const alert = await this.alertController.create({
      header: 'Done',
      message: 'Your Post was created',
      buttons: ['OK']
    });

    await alert.present();
    this.router.navigate(['/tabs/list']);
  }

  uploadFile(){
    this.fileButton.nativeElement.click();
  }

  fileChanged(event){
    this.busy = true;
    const files = event.target.files;

    const data = new FormData();
    data.append('file', files[0]);
    data.append('UPLOADCARE_STORE', '1');
    data.append('UPLOADCARE_PUB_KEY', '5ab059aaa2aeb1d4e40a');
    console.log(files);
    this.http.post('https://upload.uploadcare.com/base/', data)
    .subscribe(event => {
      console.log(event);
      this.imageURL = event.json().file;
    });
    this.busy = false;
  }
}
