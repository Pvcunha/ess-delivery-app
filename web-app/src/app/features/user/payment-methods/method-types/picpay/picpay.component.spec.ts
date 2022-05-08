import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicpayComponent } from './picpay.component';

describe('PicpayComponent', () => {
  let component: PicpayComponent;
  let fixture: ComponentFixture<PicpayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicpayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
