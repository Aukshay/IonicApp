import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public goalList: any[];
  public loadedGoalList: any[];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.firestore.collection(`posts`).valueChanges().subscribe(goalList => {
      this.goalList = goalList;
      this.loadedGoalList = goalList;
    });

  }

  initializeItems(): void {
    this.goalList = this.loadedGoalList;
    }

    filterList(evt) {
      this.initializeItems();
      
      const searchTerm = evt.srcElement.value;
      
      if (!searchTerm) {
      return;
      }
      
      this.goalList = this.goalList.filter(currentGoal => {
      if (currentGoal.desc && searchTerm) {
      if (currentGoal.desc.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
      return true;
      }
      return false;
      }
      });
      }
}
