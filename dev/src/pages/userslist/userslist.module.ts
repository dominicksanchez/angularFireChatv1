import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserslistPage } from './userslist';

@NgModule({
  declarations: [
    UserslistPage,
  ],
  imports: [
    IonicPageModule.forChild(UserslistPage),
  ],
})
export class UserslistPageModule {}
