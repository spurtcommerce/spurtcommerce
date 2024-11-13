
import { AuthGuard } from "../../src/app/core/providers/guards/auth-guard";
import { ContactStaticComponent } from "./contact-static/contact-static.component";





// components paths
export const componentLists = [ContactStaticComponent];

// route paths
export const routePath = [
    {
        path:'list',
        component:ContactStaticComponent
    },

    
 
];