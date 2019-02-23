import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorelistComponent } from './explorelist.component';

describe('ExplorelistComponent', () => {
  let component: ExplorelistComponent;
  let fixture: ComponentFixture<ExplorelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplorelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
