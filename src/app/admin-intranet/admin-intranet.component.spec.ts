import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIntranetComponent } from './admin-intranet.component';

describe('AdminIntranetComponent', () => {
  let component: AdminIntranetComponent;
  let fixture: ComponentFixture<AdminIntranetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminIntranetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIntranetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
