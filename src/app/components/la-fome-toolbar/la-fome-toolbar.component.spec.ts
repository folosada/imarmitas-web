import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaFomeToolbarComponent } from './la-fome-toolbar.component';

describe('LaFomeToolbarComponent', () => {
  let component: LaFomeToolbarComponent;
  let fixture: ComponentFixture<LaFomeToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaFomeToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaFomeToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
