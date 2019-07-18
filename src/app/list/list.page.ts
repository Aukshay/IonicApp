import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  userPosts
  list: Recipe[];
  constructor(private afs: AngularFirestore,
              private user: UserService,
              public router: Router) { 
                const posts = afs.collection('posts');
                this.userPosts = posts.snapshotChanges();
              }

  ngOnInit() {
    this.user.getRecipes().subscribe(actionArray => {
        this.list = actionArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Recipe;
        });
    });
  }

  goSearch() {
    this.router.navigate(['/search']);
  }

}
