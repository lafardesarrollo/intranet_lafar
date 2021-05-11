import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalesComponent } from './regionales.component';

describe('RegionalesComponent', () => {
  let component: RegionalesComponent;
  let fixture: ComponentFixture<RegionalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
