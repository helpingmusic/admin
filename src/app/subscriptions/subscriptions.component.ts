import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {MatSort, MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";
import {UserService} from "../core/user.service";
import {Subscription} from "../../models/subscription";

@Component({
  selector: 'fj-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit, AfterViewInit, OnDestroy {

  subSubscription: any;
  subsData = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['status', 'user', 'orders', 'filterGrade', 'frequency', 'nextShipDate', 'joinedOn', 'address'];
  isLoading: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.subSubscription = this.userService.index()
      .do(() => this.isLoading = false)
      .subscribe(users => {
        const subscriptions = users.reduce((all, u) => {
          const subs = u.Subscriptions.map(s => {
            (<any>s).User = { _id: u._id, name: u.name, email: u.email };
             return s;
          });
          return all.concat(subs);
        }, []);
        this.subsData.data = subscriptions;
      });
  }
  ngAfterViewInit() {
    // for sorting embedded props
    this.subsData.sortingDataAccessor = (sub: Subscription, property: string) => {
      switch(property) {
        case 'joinedOn': return sub.created_at;
        case 'user': return (<any>sub).User.name;
        case 'orders': return sub.Orders.length;
        case 'address': return sub.Address.line1;
        default: return sub[property];
      }
    };
    this.subsData.sort = this.sort;
    this.subsData.filterPredicate = this.filterPredicate;
  }

  ngOnDestroy() {
    this.subSubscription.unsubscribe();
  }

  filterPredicate(sub: Subscription, filter: string) {
    return JSON.stringify(sub).toLowerCase().includes(filter.toLowerCase());
  }

  applyFilter(filterValue: string) {
    this.subsData.filter = filterValue.trim().toLowerCase();
  }

  showUser(userId) {
    this.router.navigate(['/members', userId]);
  }

}
