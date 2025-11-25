import { createAction, props } from '@ngrx/store';
import { Character } from '../../services/items.service';

export const loadItems = createAction(
  '[Items List] Load Items',
  props<{ query?: string }>()
);

export const loadItemsSuccess = createAction(
  '[Items API] Load Items Success',
  props<{ items: Character[] }>()
);

export const loadItemsFailure = createAction(
  '[Items API] Load Items Failure',
  props<{ error: string }>()
);

export const loadItem = createAction(
  '[Item Details] Load Item',
  props<{ id: string | number }>()
);

export const loadItemSuccess = createAction(
  '[Items API] Load Item Success',
  props<{ item: Character }>()
);

export const loadItemFailure = createAction(
  '[Items API] Load Item Failure',
  props<{ error: string }>()
);
