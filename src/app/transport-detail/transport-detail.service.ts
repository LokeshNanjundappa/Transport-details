
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TransportDetailService {
  RIDE_TAB = 'Ride';
  PICKUP_TAB = 'Pick';
  DROP_TAB = 'Drop';
  BIKE = 'Bike';
  CAR = 'Car';
  ALL = 'All';

  rideDetailList: any[] = [];

  bookingDetailList: any[] = [];

  dropDetailList: any[] = [];

  rideDetailProperties: string[] = [
    'employeeId',
    'vehicleType',
    'vehicleNo',
    'vacantSeats',
    'time',
    'pickUpPoint',
    'destination'
  ];

  tabsMap = new Map<string, string>([
    [this.RIDE_TAB, 'Ride'],
    [this.PICKUP_TAB, 'Pick-up'],
    [this.DROP_TAB, 'Drop']
  ]);

  initializeRiderDetail() {
    let riderDetail = {
      employeeId: '',
      vehicleType: 'Bike',
      vehicleNo: '',
      vacantSeats: 1,
      time: '',
      pickUpPoint: '',
      destination: ''
    };
    return riderDetail;
  }

  initializeBookingDetail() {
    let bookingDetail = {
      riderId: '',
      employeeId: ''
    };
    return bookingDetail;
  }

  setRideDetails(rideList: any) {
    this.rideDetailList = rideList;
    localStorage.setItem('rideDetailList', JSON.stringify(this.rideDetailList));
  }

  getRideDetails() {
    const storedRides = localStorage.getItem('rideDetailList');
    if (storedRides) {
      this.rideDetailList = JSON.parse(storedRides);
    }
    return this.rideDetailList;
  }

  setBookingDetails(bookingList: any) {
    this.bookingDetailList = bookingList;
    localStorage.setItem('bookingList', JSON.stringify(this.bookingDetailList));
  }

  getBookingDetails() {
    const storedBookings = localStorage.getItem('bookingList');
    if (storedBookings) {
      this.bookingDetailList = JSON.parse(storedBookings);
    }
    return this.bookingDetailList;
  }

  setDropDetails(dropList: any) {
    this.dropDetailList = dropList;
    localStorage.setItem('dropDetailList', JSON.stringify(dropList));
  }

  getDropDetails() {
    const storedDrops = localStorage.getItem('dropDetailList');
    if (storedDrops) {
      this.dropDetailList = JSON.parse(storedDrops);
    }
    return this.dropDetailList;
  }
}
