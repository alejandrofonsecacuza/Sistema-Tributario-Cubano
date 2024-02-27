import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPersonasComponent } from './tabla-personas.component';

describe('TablaPersonasComponent', () => {
  let component: TablaPersonasComponent;
  let fixture: ComponentFixture<TablaPersonasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaPersonasComponent]
    });
    fixture = TestBed.createComponent(TablaPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
