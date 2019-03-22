import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth,
               private router: Router,
               private afDB: AngularFirestore ) { }

  initAuthListener() {

    this.afAuth.authState.subscribe( (fbUser: firebase.User ) => {

      console.log(fbUser);

    });

  }

  crearUsuario( nombre: string, email: string, password: string) {

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( resp => {
        // console.log(resp);
        const user: User = {
          nombre,
          email: resp.user.email,
          uid: resp.user.uid
        };

        this.afDB.doc(`${ user.uid }/usuario`)
          .set( user )
            .then( () => {
              this.router.navigate(['/']);
            });

        this.router.navigate(['/']);
      })
      .catch( error => {
        console.error( error );
        Swal.fire('Error en el login', error.message, 'error');
      });

  }

  login( email: string, password: string ) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then( resp => {
        this.router.navigate(['/']);
      })
      .catch( err => {
        console.error( err );
        Swal.fire('Error en el login', err.message, 'error');
      });
  }

  logout() {

    this.router.navigate( ['/login'] );
    this.afAuth.auth.signOut();

  }

  isAuth() {
    return this.afAuth.authState
      .pipe(
        map( fbUser => {

          if ( fbUser == null ) {
              this.router.navigate(['/login']);
          }

          return fbUser != null;
        } )
      );
  }


}
