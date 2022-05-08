import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpayComponent } from './editpay.component';

describe('EditpayComponent', () => {
  let component: EditpayComponent;
  let fixture: ComponentFixture<EditpayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
