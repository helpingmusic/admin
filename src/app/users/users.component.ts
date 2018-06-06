import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {MatSort, MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

import {User} from "models/user";
import {UserService} from "app/core/user.service";

@Component({
  selector: 'fj-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {

  usersSubscription: Subscription;
  usersData = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['status', 'name', 'subCount', 'origin', 'joinedOn'];

  isLoading: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.usersSubscription = this.userService.index()
      .do(() => this.isLoading = false)
      .subscribe(users => this.usersData.data = users);
  }
  ngAfterViewInit() {
    // for sorting embedded props
    this.usersData.sortingDataAccessor = (user: User, property: string) => {
      switch(property) {
        case 'joinedOn': return user.created_at;
        case 'subCount': return user.Subscriptions.length;
        case 'origin': return user.OriginCoupon && user.OriginCoupon.code;
        default: return user[property];
      }
    };
    this.usersData.sort = this.sort;
    this.usersData.filterPredicate = this.filterPredicate;
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }

  filterPredicate(user: User, filter: string) {
    return JSON.stringify(user).toLowerCase().includes(filter.toLowerCase());
  }

  applyFilter(filterValue: string) {
    this.usersData.filter = filterValue.trim().toLowerCase();
  }

  showUser(user) {
    this.router.navigate(['/members', user._id]);
  }

}
