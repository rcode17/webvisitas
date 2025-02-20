import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordPersonComponent } from './record-person.component';

describe('RecordPersonComponent', () => {
  let component: RecordPersonComponent;
  let fixture: ComponentFixture<RecordPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordPersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
