import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {MatDialog, MatSort, MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import * as Papa from 'papaparse';
import * as moment from 'moment';

import {User} from "models/user";
import {UserService} from "app/core/user.service";
import {CheckUserProfileComponent} from "./check-user-profile.component";

@Component({
  selector: 'home-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {

  usersSubscription: Subscription;
  usersData = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['status', 'profileComplete', 'name', 'email', 'tier', 'active_until', 'created_at'];

  isLoading: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
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
        case 'tier': return user.stripe && user.stripe.tier;
        case 'status': return user.stripe && user.stripe.status;
        case 'name': return `${user.first_name} ${user.last_name}`;
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

  checkProfile(user, event) {
    // Don't click whole row
    if (event) event.stopPropagation();

    const dialogRef = this.dialog.open(CheckUserProfileComponent, {
      width: '400px',
      data: { user },
    });
  }

  exportMembers() {
    const data = this.usersData.data
      .map((u: User) => ({
        'Name': `${u.first_name || ''} ${u.last_name || ''}`,
        'Email': u.email,
        'Phone Number': u.phone_number || '',
        'Plan': u.stripe && `${u.stripe.tier || ''} (${u.stripe.frequency || ''})`,
        'Status': u.stripe && u.stripe.status,
        'Is Active': u.isActive ? 'yes' : 'no',
        'Next Billing': moment(u.active_until).format('MMM Do, YYYY'),
        'Joined On': moment(u.created_at).format('MMM Do, YYYY')
      }));

    const csv = Papa.unparse(data);
    const blob = new Blob([csv]);
    if (window.navigator.msSaveOrOpenBlob)  // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
      window.navigator.msSaveBlob(blob, `HOME_members_${moment().format('YYYY-MM-DD')}.csv`);
    else {
      const a = window.document.createElement("a");
      a.href = window.URL.createObjectURL(blob, <any>{ type: "text/plain" });
      a.download = `HOME_members_${moment().format('YYYY-MM-DD')}.csv`;
      document.body.appendChild(a);
      a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
      document.body.removeChild(a);
    }

  }

}
