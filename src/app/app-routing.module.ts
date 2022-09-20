import { AuthGuard } from './core/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// import { Guard2Guard } from './core/guard-2.guard';
import { Guard2Guard } from './core/guard-2.guard';


 const routes: Routes = [
   { path: '', redirectTo: 'SmartFret', pathMatch: 'full' },
   {
     path: 'commands',
     loadChildren: './pages/commands/commands.module#CommandsPageModule',
     canLoad: [AuthGuard],
   },
   {
     path: 'colis',
     loadChildren: './pages/commands/colis/colis.module#ColisPageModule',
   },
   {
     path: 'FgP',
     loadChildren:
       './pages/forgetpassword/forgetpassword.module#ForgetPasswordModule',
   },
   {
     path: 'validatePassword',
     loadChildren:
       './pages/validation-code/validation-code.module#ValidationCodePageModule',
     // canLoad: [Guard2Guard],
   },
   {
     path: 'newPassword',
     loadChildren: './pages/new-pass/new-pass.module#NewPassPageModule',
   },
   {
     path: 'SmartFret',
     loadChildren:
       './pages/splash-screen/splash-screen.module#SplashScreenPageModule',
   },
   {
     path: 'profilsUser',
     loadChildren: './pages/users/profils/profils.module#ProfilsPageModule',
     canLoad: [AuthGuard],
   },
   {
     path: 'box',
     loadChildren: () =>
       import('./pages/box/box.module').then((m) => m.BoxPageModule),

     canLoad: [AuthGuard],
   },
   {
     path: 'retreivement',
     loadChildren: () =>
       import('./pages/retreivement/retreivement.module').then(
         (m) => m.RetreivementPageModule
       ),
     canLoad: [AuthGuard],
   },
   {
     path: 'reclamation',
     loadChildren: () =>
       import('./pages/reclamation/reclamation.module').then(
         (m) => m.ReclamationPageModule
       ),
     // canLoad: [AuthGuard],
   },
   {
     path: 'signin',
     loadChildren: () =>
       import('./pages/signin/signin.module').then((m) => m.SigninPageModule),
   },
   {
     path: 'validation-code',
     loadChildren: () =>
       import('./pages/validation-code/validation-code.module').then(
         (m) => m.ValidationCodePageModule
       ),
   },
   {
     path: 'profils',
     loadChildren: () =>
       import('./pages/users/profils/profils.module').then(
         (m) => m.ProfilsPageModule
       ),
   },  {
    path: 'admin-dcb',
    loadChildren: () => import('./pages/admin-dcb/admin-dcb.module').then( m => m.AdminDCBPageModule)
  },

 ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
