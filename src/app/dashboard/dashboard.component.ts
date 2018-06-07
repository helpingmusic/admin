import { Component, OnInit } from '@angular/core';
import {UserService} from "../core/user.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'fj-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stats$: Observable<any>;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {

    const countUsers = (subs) => {
      const userMap = subs.reduce((um, s) => {
        um[s.user__id] = true;
        return um;
      }, {});
      return Object.keys(userMap).length;
    };


    this.stats$ = this.userService.index()
      .map(users => {

        const subs = users.reduce((subs, u) => subs.concat(u.Subscriptions), []);

        const joined = subs.filter(s => s.status !== 'admin_cancelled');

        const active = subs.filter(s => s.isActive || s.status === 'paused');
        const paused = subs.filter(s => s.status === 'paused');
        const adminCancelled = subs.filter(s => s.status === 'admin_cancelled');
        const userCancelled = subs.filter(s => s.status === 'user_cancelled');
        const retention = Math.round(active.length / joined.length * 100);

        const userJoined = countUsers(joined);
        const userActive = countUsers(active);
        const userRetention = Math.round(userActive / userJoined * 100);

        return {
          users: {
            total: users.length,
            joined: userJoined,
            active: userActive,
            paused: countUsers(paused),
            userCancelled: countUsers(userCancelled),
            adminCancelled: countUsers(adminCancelled),
            retention: userRetention,
          },
          subs: {
            total: subs.length,
            joined: joined.length,
            active: active.length,
            paused: paused.length,
            userCancelled: userCancelled.length,
            adminCancelled: adminCancelled.length,
            retention: retention,
          }
        };
      })
      .share();

  }

}
