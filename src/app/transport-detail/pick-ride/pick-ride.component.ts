import { Component, OnInit } from '@angular/core';
import { TransportDetailService } from '../transport-detail.service';

@Component({
  selector: 'app-pick-ride',
  templateUrl: './pick-ride.component.html',
  styleUrls: ['./pick-ride.component.css']
})

export class PickRideComponent implements OnInit {

  rides: any[] = [];

  bookingList: any[] = [];

  tempBookingList: any[] = [];

  bookingDetails: any = {};

  showBookingDialog: boolean = false;

  currentPage = 1;

  pageSize = 10;

  totalItems = 0;

  timeMatchingRiders: any[] = [];

  filteredRiders: any[] = [];

  filterRidesBasedOnType: string = '';

  constructor(public transportService: TransportDetailService) {}

  ngOnInit() {
    this.rides = this.transportService.getRideDetails();
    this.bookingList = this.transportService.getBookingDetails();
    this.updateTempRideList();
    this.bookingDetails = this.transportService.initializeBookingDetail();
  }

  showAddRideDialog() {
    this.bookingDetails = this.transportService.initializeBookingDetail();
    this.timeMatchingRiders = this.rides
      .filter(ride => {
        const [h, m] = ride.time.split(':').map(Number);
        const t = new Date();
        t.setHours(h, m, 0, 0);

        return Math.abs(new Date().getTime() - t.getTime()) <= 3600000;
      });
    this.filteredRiders = structuredClone(this.timeMatchingRiders);
    this.filterRidesBasedOnType = this.transportService.ALL;
    this.showBookingDialog = true;
  }

  closeDialog() {
    this.showBookingDialog = false;
    this.bookingDetails = this.transportService.initializeBookingDetail();
  }

  bookRide() {
    let msg = '';
    const ride = this.rides.find(r => r.employeeId === this.bookingDetails.riderId);
    if (!this.bookingDetails.riderId || !this.bookingDetails.employeeId) {
      msg = 'Please fill all fields';
    } else if (!ride) {
      msg = 'Rider ID not found';
    } else if(!this.rides.some(r => r.employeeId === this.bookingDetails.employeeId)) {
      msg = 'Employee ID not found';
    } else if (ride.employeeId === this.bookingDetails.employeeId) {
      msg = 'You cannot book your own ride';
    } else if (this.bookingList.some(b => b.riderId === this.bookingDetails.riderId && b.employeeId === this.bookingDetails.employeeId)) {
      msg = 'You cannot book the same ride twice';
    } else if (ride.vacantSeats === 0) {
      msg = 'No seats available';
    } else {
      msg = 'Ride booked successfully!';
    }

    alert(msg);
    if (msg !== 'Ride booked successfully!') {
      return;
    }
    this.bookingList.push(this.bookingDetails);
    ride.vacantSeats -= 1;
    this.transportService.setBookingDetails(this.bookingList);
    this.transportService.setRideDetails(this.rides);
    console.log(this.rides);
    this.updateTempRideList();
    this.closeDialog();
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
    this.tempBookingList = this.bookingList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    this.totalItems = this.bookingList.length;
  }

  filterRiderId(vehicleType: string) {
    if (vehicleType === this.transportService.ALL) {
      this.filterRidesBasedOnType = this.transportService.ALL;
      this.filteredRiders = structuredClone(this.timeMatchingRiders);
    } else {
      this.filterRidesBasedOnType = vehicleType;
      this.filteredRiders = this.timeMatchingRiders.filter(rider => rider.vehicleType === vehicleType);
    }
    if (!this.filteredRiders.some(rider => rider.employeeId === this.bookingDetails.riderId)) {
      this.bookingDetails.riderId = '';
    }
  }
}
