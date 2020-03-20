import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSettingsComponent } from './dialog-settings.component';

describe('DialogNavgationComponent', () => {
  let component: DialogSettingsComponent;
  let fixture: ComponentFixture<DialogSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
