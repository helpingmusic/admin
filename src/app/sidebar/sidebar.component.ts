import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuLinks = [
    { href: '/members', title: 'Members', icon: 'people' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
