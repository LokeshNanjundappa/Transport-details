import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropRideComponent } from './drop-ride.component';

describe('DropRideComponent', () => {
  let component: DropRideComponent;
  let fixture: ComponentFixture<DropRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropRideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
