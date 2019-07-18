import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { Route } from '@angular/compiler/src/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userPosts
  constructor(private afs: AngularFirestore,
              public afauth: AngularFireAuth,
              private user: UserService,
              public router: Router) { 
    const posts = afs.doc('users/'+ user.getUID())
    this.userPosts = posts.valueChanges();
  }
  goTo(postID: string){
    this.router.navigate(['/tabs/post/' + postID]);
  }

  ngOnInit() {
  }

}
