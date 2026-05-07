import { Routes } from '@angular/router';

import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { Profile } from './components/profile/profile';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'register', component: Register },
    { path: 'profile', component: Profile, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];