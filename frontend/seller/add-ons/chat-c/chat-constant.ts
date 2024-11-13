import { AuthGuard } from '../../src/app/core/providers/guards/auth-guard';
import { ChatStaticComponent } from './chat-static/chat-static.component';

// components paths

export const addonAction = 'Routing'

export const componentLists = [ChatStaticComponent];

export const routePath = [
  {
    path: 'chatconversation',
    component: ChatStaticComponent,
    canActivate: [AuthGuard],
  }
];