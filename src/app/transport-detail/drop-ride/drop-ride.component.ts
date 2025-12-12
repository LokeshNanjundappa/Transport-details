import { Component, OnInit } from '@angular/core';
import { TransportDetailService } from '../transport-detail.service';

@Component({
  selector: 'app-drop-ride',
  templateUrl: './drop-ride.component.html',
  styleUrls: ['./drop-ride.component.css']
})
export class DropRideComponent implements OnInit {

  currentPage = 1;

  pageSize = 10;

  totalItems = 0;

  tempDropList: any[] = [];

  dropList: any[] = [];

  dropDetails: any = {};

  showDropDialog: boolean = false;

  filteredRiders: any[] = [];

  filteredEmployees: any[] = [];

  constructor(public transportService: TransportDetailService) {}

  ngOnInit() {
    this.dropList = this.transportService.getDropDetails();
    this.updateTempRideList();
    this.dropDetails = this.transportService.initializeBookingDetail();
  }

  showAddRideDialog() {
    this.dropDetails = this.transportService.initializeBookingDetail();
    this.filteredRiders = this.transportService.getBookingDetails();
    this.showDropDialog = true;
  }

  closeDialog() {
    this.showDropDialog = false;
    this.dropDetails = this.transportService.initializeBookingDetail();
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
    this.tempDropList = this.dropList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    this.totalItems = this.dropList.length;
  }

  onRiderSelect(event: any) {
    const selectedRiderId = event.target.value;
    this.filteredEmployees = this.filteredRiders.filter(rider => rider.riderId === selectedRiderId);
  }

  addDrop() {
    if (!this.dropDetails.riderId || !this.dropDetails.employeeId) {
      alert("All fields are mandatory");
      return;
    }

    this.dropList.push(structuredClone(this.dropDetails));
    this.transportService.setDropDetails(this.dropList);
    alert("Drop added successfully!");
    this.updateTempRideList();
    this.closeDialog();
  }

}
