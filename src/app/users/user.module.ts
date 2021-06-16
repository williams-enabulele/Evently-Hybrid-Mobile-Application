import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimelineComponent } from './timeline/timeline.component';
import { Ionic4EmojiPickerModule, Ionic4EmojiPickerComponent } from 'ionic4-emoji-picker';
import { IonicModule } from '@ionic/angular';
import { SScheduleComponent } from './s-schedule/s-schedule.component';
import { SEditScheduleComponent } from './s-edit-schedule/s-edit-schedule.component';
import { SAddScheduleComponent } from './s-add-schedule/s-add-schedule.component';
import { RootingListComponent } from './rooting-list/rooting-list.component';
import { RootersListComponent } from './rooters-list/rooters-list.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { MChatListComponent } from './m-chat-list/m-chat-list.component';
import { MChatsComponent } from './m-chats/m-chats.component';
import { CommentsComponent } from './comments/comments.component';
import { CEditChannelComponent } from './c-edit-channel/c-edit-channel.component';
import { CChannelsComponent } from './c-channels/c-channels.component';
import { CAddChannelComponent } from './c-add-channel/c-add-channel.component';
import { BaseComponent } from './base/base.component';
import { BEditBroadcastComponent } from './b-edit-broadcast/b-edit-broadcast.component';
import { BBroadcastComponent } from './b-broadcast/b-broadcast.component';
import { BAddBroadcastComponent } from './b-add-broadcast/b-add-broadcast.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { MySubscriptionsComponent } from './my-subscriptions/my-subscriptions.component';
import { AboutComponent } from './about/about.component';
import { FeedDetailsComponent } from './feed-details/feed-details.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

import { AvatarModule } from 'ngx-avatar';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };

@NgModule({
  declarations: [
    SScheduleComponent,
    SEditScheduleComponent,
    SAddScheduleComponent,
    RootingListComponent,
    RootersListComponent,
    ProfileComponent,
    FeedDetailsComponent,
    NotificationsComponent,
    ProfileEditComponent,
    MChatsComponent,
    MChatListComponent,
    CommentsComponent,
    CEditChannelComponent,
    CChannelsComponent,
    CAddChannelComponent,
    BaseComponent,
    BEditBroadcastComponent,
    BBroadcastComponent,
    BAddBroadcastComponent,
    TimelineComponent,
    AboutComponent,
    MySubscriptionsComponent,
    PublicProfileComponent

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    // Ionic4EmojiPickerComponent,
    Ionic4EmojiPickerModule,
    IonicModule,
    AvatarModule,
  ],

})
export class UserModule { }
