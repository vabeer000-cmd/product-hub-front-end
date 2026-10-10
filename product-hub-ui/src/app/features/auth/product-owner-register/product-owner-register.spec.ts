import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOwnerRegister } from './product-owner-register';

describe('ProductOwnerRegister', () => {
  let component: ProductOwnerRegister;
  let fixture: ComponentFixture<ProductOwnerRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductOwnerRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductOwnerRegister);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
