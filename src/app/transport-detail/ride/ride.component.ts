import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransportDetailService } from '../transport-detail.service';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit, OnDestroy {

  rideList: any = [];

  tempRideList: any = [];

  rideDetailProperties: string[] = [];

  rideDetail: any = {};

  showRideDialog: boolean = false;

  minTime: any = new Date().toISOString().substring(11, 16);

  currentPage = 1;

  pageSize = 10;

  totalItems = 0;

  minTimeSetTimeout: any;

  constructor(public transportService: TransportDetailService) { }

  ngOnInit() {
    this.rideDetailProperties = this.transportService.rideDetailProperties;
    this.rideList = this.transportService.getRideDetails();
    this.tempRideList = this.rideList.slice(0, this.pageSize);
    this.totalItems = this.rideList.length;
  }

  showAddRideDialog() {
    this.rideDetail = this.transportService.initializeRiderDetail();
    this.minTimeSetTimeout = setTimeout(() => {
      this.minTime = new Date().toISOString().substring(11, 16);
    }, 100);
    this.showRideDialog = true;
  }

  closeDialog() {
    this.showRideDialog = false;
    this.rideDetail = this.transportService.initializeRiderDetail();
    clearTimeout(this.minTimeSetTimeout);
  }

  addNewRide() {
    let msg = '';
    if (!this.rideDetail.employeeId || !this.rideDetail.vehicleNo || !this.rideDetail.time ||
      !this.rideDetail.pickUpPoint || !this.rideDetail.destination) {
      msg = 'All fields are mandatory';
    } else if (this.rideList.some((ride: any) => ride.employeeId.toLowerCase() === this.rideDetail.employeeId.toLowerCase())) {
      msg = 'Employee ID must be unique for adding a ride.';
    } else if (this.validateTime()) {
      msg = "Please select a future time";
      this.rideDetail.time = "";
    } else if (this.rideDetail.vacantSeats <= 0) {
      msg = "Vacant seats must be at least 1";
    } else if (this.rideDetail.vehicleType == this.transportService.BIKE
      && this.rideDetail.vacantSeats > 1) {
      msg = "Vacant seats cannot exceed 1 for Bike";
    } else if (this.rideDetail.vehicleType == this.transportService.CAR
      && this.rideDetail.vacantSeats > 4) {
      msg = "Vacant seats cannot exceed 4 for Car";
    }

    if (msg !== '') {
      alert(msg);
      return;
    }

    this.rideList.push(structuredClone(this.rideDetail));
    this.transportService.setRideDetails(this.rideList);
    alert("Ride added successfully!");
    this.updateTempRideList();
    this.closeDialog();
  }

  validateTime() {
    const now = new Date();
    const current = now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
    return this.rideDetail.time < current;
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.totalItems) {
      this.currentPage++;
      this.updateTempRideList();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateTempRideList();
    }
  }

  updateTempRideList() {
    this.tempRideList = this.rideList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    this.totalItems = this.rideList.length;
  }

  ngOnDestroy() {
    clearTimeout(this.minTimeSetTimeout);
  }

}
