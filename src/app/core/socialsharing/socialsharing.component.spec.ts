import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialsharingComponent } from './socialsharing.component';

describe('SocialsharingComponent', () => {
  let component: SocialsharingComponent;
  let fixture: ComponentFixture<SocialsharingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialsharingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialsharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
