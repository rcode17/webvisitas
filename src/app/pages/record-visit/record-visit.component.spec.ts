import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordVisitComponent } from './record-visit.component';

describe('RecordVisitComponent', () => {
  let component: RecordVisitComponent;
  let fixture: ComponentFixture<RecordVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordVisitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
