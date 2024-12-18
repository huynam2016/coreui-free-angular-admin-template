import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Phân quyền'
    },
    children : [
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full'
      },
      {
        path: 'role',
        loadComponent: () => import('./role/role.component').then(r => r.RoleComponent),
        data: {
          title: 'Vai trò'
        }
      },
      {
        path: 'user',
        loadComponent: () => import('./user/user.component').then(r => r.UserComponent),
        data: {
          title: 'Người dùng'
        }
      }
    ]
  }
]
