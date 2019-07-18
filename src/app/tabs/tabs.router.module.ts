import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { TabsPage } from './tabs.page';
import { NgModule } from '@angular/core';



const routes: Routes = [
    {
      path: '',
      component: TabsPage,
      children: [
        { path: 'uploader', loadChildren: '../uploader/uploader.module#UploaderPageModule' },
        { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
        { path: 'list', loadChildren: '../list/list.module#ListPageModule' },
        { path: 'post/:id', loadChildren: '../post/post.module#PostPageModule' },
      ]
    }

    
];


@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class TabsRoutingModule { }