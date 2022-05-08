import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertdebitComponent } from './insertdebit.component';

describe('InsertdebitComponent', () => {
  let component: InsertdebitComponent;
  let fixture: ComponentFixture<InsertdebitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertdebitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertdebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
