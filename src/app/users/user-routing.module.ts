import { MySubscriptionsComponent } from './my-subscriptions/my-subscriptions.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsComponent } from './notifications/notifications.component';
import { TimelineComponent } from './timeline/timeline.component';
import { MChatListComponent } from './m-chat-list/m-chat-list.component';
import { MChatsComponent } from './m-chats/m-chats.component';
import { BaseComponent } from './base/base.component';
import { MenuPage } from './../menu/menu.page';
import { FeedDetailsComponent } from './feed-details/feed-details.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { AuthGuard } from '@app/auth.guard';




const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'timeline', pathMatch: 'full' },
      {
        path: 'timeline',
        component: TimelineComponent
      },
      {
        path: 'home',
        component: BaseComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        path: 'chat',
        component: MChatListComponent
      },
      {
        path: 'chats/:id',
        component: MChatsComponent
      },
      {
        path: 'feed/:id',
        component: FeedDetailsComponent
      },
      {
        path: 'profile-public/:id',
        component: PublicProfileComponent
      },
      {
        path: 'subscriptions',
        component: MySubscriptionsComponent
      }

    ]
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
