import { Component, OnInit } from '@angular/core';
import { TransportDetailService } from './transport-detail.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transport-detail',
  templateUrl: './transport-detail.component.html',
  styleUrls: ['./transport-detail.component.css']
})
export class TransportDetailComponent implements OnInit {

  selectedTab: string = '';

  riderDetail: any;

  constructor(public transportService: TransportDetailService, private router: Router) {}

  ngOnInit() {
    this.riderDetail = this.transportService.initializeRiderDetail();
    this.onChangeNavBarItem(this.transportService.RIDE_TAB);
  }

  onChangeNavBarItem(tab: string) {
    this.selectedTab = tab;
    this.router.navigate(['/' + tab.toLowerCase()]);
  }

}
