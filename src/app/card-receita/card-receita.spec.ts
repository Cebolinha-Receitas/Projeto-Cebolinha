import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardReceita } from './card-receita';

describe('CardReceita', () => {
  let component: CardReceita;
  let fixture: ComponentFixture<CardReceita>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardReceita],
    }).compileComponents();

    fixture = TestBed.createComponent(CardReceita);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
