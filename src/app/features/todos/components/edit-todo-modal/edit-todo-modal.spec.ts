import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTodoModal } from './edit-todo-modal';

describe('EditTodoModal', () => {
  let component: EditTodoModal;
  let fixture: ComponentFixture<EditTodoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTodoModal],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTodoModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
