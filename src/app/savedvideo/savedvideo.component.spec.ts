import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedvideoComponent } from './savedvideo.component';

describe('SavedvideoComponent', () => {
  let component: SavedvideoComponent;
  let fixture: ComponentFixture<SavedvideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedvideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedvideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
