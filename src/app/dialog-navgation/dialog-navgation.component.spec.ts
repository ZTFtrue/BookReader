import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNavgationComponent } from './dialog-navgation.component';

describe('DialogNavgationComponent', () => {
  let component: DialogNavgationComponent;
  let fixture: ComponentFixture<DialogNavgationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNavgationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNavgationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
