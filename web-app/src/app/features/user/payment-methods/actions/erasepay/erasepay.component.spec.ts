import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErasepayComponent } from './erasepay.component';

describe('ErasepayComponent', () => {
  let component: ErasepayComponent;
  let fixture: ComponentFixture<ErasepayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErasepayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErasepayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
