import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertcreditComponent } from './insertcredit.component';

describe('InsertcreditComponent', () => {
  let component: InsertcreditComponent;
  let fixture: ComponentFixture<InsertcreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertcreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertcreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
