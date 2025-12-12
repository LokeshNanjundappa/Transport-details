import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TransportDetailComponent } from './transport-detail/transport-detail.component';
import { FormsModule } from '@angular/forms';
import { RideComponent } from './transport-detail/ride/ride.component';
import { PickRideComponent } from './transport-detail/pick-ride/pick-ride.component';
import { DropRideComponent } from './transport-detail/drop-ride/drop-ride.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'ride', component: RideComponent },
  { path: 'pick', component: PickRideComponent },
  { path: 'drop', component: DropRideComponent }
];

@NgModule({
  declarations: [
    AppComponent, TransportDetailComponent, RideComponent, PickRideComponent, DropRideComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule, FormsModule,
],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
