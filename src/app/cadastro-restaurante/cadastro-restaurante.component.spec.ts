import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroRestauranteComponent } from './cadastro-restaurante.component';

describe('CadastroRestauranteComponent', () => {
  let component: CadastroRestauranteComponent;
  let fixture: ComponentFixture<CadastroRestauranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroRestauranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
