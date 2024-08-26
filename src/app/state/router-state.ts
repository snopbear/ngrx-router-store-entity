import { RouterStateSnapshot, Params } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

// Define the shape of your router state
export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

// Implement the RouterStateSerializer interface
export class CustomRouterStateSerializer
  implements RouterStateSerializer<RouterStateUrl>
{
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    return {
      url: routerState.url,
      params: routerState.root.params,
      queryParams: routerState.root.queryParams,
    };
  }
}
