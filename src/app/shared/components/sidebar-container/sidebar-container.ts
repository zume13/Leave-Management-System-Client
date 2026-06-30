import { Component, input, output, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { MenuItems } from '../../models/auth';

@Component({
  selector: 'app-sidebar-container',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-container.html',
  styleUrl: './sidebar-container.css',
})
export class SidebarContainer implements OnInit {

  auth = inject(AuthService);

  menuItems : MenuItems[] = [];
  
  ngOnInit() : void{
    this.getMenuItems();
  }

  getMenuItems(){

    const role = this.auth.getRole();

    if (!role) {
      this.menuItems = [];
      return; 
    }

    const adminRoles = [ 'Admin', 'Manager'];

    this.menuItems = adminRoles.includes(role) ? this.adminMenu : this.employeeMenu;

  } 

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
