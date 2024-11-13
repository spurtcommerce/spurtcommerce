import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { ChatStaticsComponent } from './chat-statics/chat-statics.component';

// components paths
export const componentLists = [ChatStaticsComponent]; 

export const routePath = [
    {
        path: 'chatconversation',
        component: ChatStaticsComponent,
        canActivate: [AuthGuard],
        data: {
          Permission: 'chat-list'
        }
      }
];