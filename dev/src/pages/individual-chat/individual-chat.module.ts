import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndividualChatPage } from './individual-chat';

@NgModule({
  declarations: [
    IndividualChatPage,
  ],
  imports: [
    IonicPageModule.forChild(IndividualChatPage),
  ],
})
export class IndividualChatPageModule {}
