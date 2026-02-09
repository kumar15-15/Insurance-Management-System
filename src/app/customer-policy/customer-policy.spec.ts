import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPolicy } from './customer-policy';

describe('CustomerPolicy', () => {
  let component: CustomerPolicy;
  let fixture: ComponentFixture<CustomerPolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerPolicy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPolicy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
