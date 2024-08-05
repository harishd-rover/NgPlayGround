import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempFormsComponent } from './temp-forms.component';

describe('TempFormsComponent', () => {
  let component: TempFormsComponent;
  let fixture: ComponentFixture<TempFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
