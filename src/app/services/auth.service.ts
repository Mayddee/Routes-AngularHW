import { Injectable } from '@angular/core';
import {
  Auth,
  User,
  authState,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // наблюдаемый текущий пользователь
  currentUser$: Observable<User | null>;

  constructor(private auth: Auth) {
    this.currentUser$ = authState(this.auth);
  }

  signup(email: string, password: string): Observable<User> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      map(cred => cred.user),
      catchError(err => throwError(() => new Error(this.mapAuthError(err))))
    );
  }

  login(email: string, password: string): Observable<User> {
    return from(
      signInWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      map(cred => cred.user),
      catchError(err => throwError(() => new Error(this.mapAuthError(err))))
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      catchError(err => throwError(() => new Error(this.mapAuthError(err))))
    );
  }

  private mapAuthError(error: any): string {
    const code = error?.code as string | undefined;
    switch (code) {
      case 'auth/user-not-found':
        return 'User not found. Please check your email or sign up.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/email-already-in-use':
        return 'This email is already registered.';
      case 'auth/weak-password':
        return 'Password is too weak (minimum 6 characters).';
      case 'auth/invalid-email':
        return 'Invalid email format.';
      default:
        return 'Authentication error. Please try again later.';
    }
  }
}
