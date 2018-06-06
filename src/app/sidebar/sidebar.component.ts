import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fj-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuLinks = [
    { href: '/dashboard', title: 'Dashboard', icon: 'dashboard' },
    { href: '/members', title: 'Members', icon: 'people' },
    { href: '/subscriptions', title: 'Subscriptions', icon: 'loop' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
