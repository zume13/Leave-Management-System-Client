import { Component, input, output, inject, OnInit, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { MenuItems } from '../../models/auth';

@Component({
  selector: 'app-sidebar-container',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-container.html',
  styleUrl: './sidebar-container.css',
})
export class SidebarContainer {

  auth = inject(AuthService);

  menuItems = computed(() => {
    const role = this.auth.currentUser()?.role

    if(!role){
      return [];
    }

    return ['Admin', 'Manager'].includes(role) ? 
      this.adminMenu : 
      this.employeeMenu;
  });

employeeMenu = 
[
  {
    label: 'Dashboard',
    route: '/employee/dashboard',
  },
  {
    label: 'Leave Requests',
    route: '/employee/requests',
  },
  {
    label: 'Leave Allocations',
    route: '/employee/allocations',
  },
];

adminMenu = 
[
  {
    label: 'Dashboard',
    route: '/admin/dashboard'
  },
  {
    label: 'Employees',
    route: '/admin/employees'
  },
  {
    label: 'Leave Requests',
    route: '/admin/requests'
  },
  {
    label: 'Leaves',
    route: '/admin/leaves'
  }
];

}
