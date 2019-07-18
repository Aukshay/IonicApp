import { Injectable } from '@angular/core'; 
import { from } from 'rxjs';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
interface user {
   username: string;
   uid: string;
}
@Injectable()
export class UserService {
    private user: user;

    constructor(private afAuth: AngularFireAuth, public afStore: AngularFirestore
               ) {

    }

    setUser(user: user) {
        this.user = user;
    }

    async isAuthenticated(){
        if(this.user) return true;
        const user = await this.afAuth.authState.pipe(first()).toPromise();

        if(user){
            this.setUser({
                username: user.email,
                uid: user.uid
            });
            return true
        }
        return false;
    }


    getUID() {
        return this.user.uid;
}

    getUsername(): string{
    return this.user.username;
    }

    getRecipes(){
      return this.afStore.collection('posts').snapshotChanges();
    }
}