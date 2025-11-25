import { createReducer, on } from '@ngrx/store';
import { Character } from '../../services/items.service';
import {
  loadItems,
  loadItemsSuccess,
  loadItemsFailure,
  loadItem,
  loadItemSuccess,
  loadItemFailure
} from './items.actions';

export const itemsFeatureKey = 'items';

export interface ItemsState {
  items: Character[];
  selectedItem: Character | null;
  listLoading: boolean;
  listError: string | null;
  detailsLoading: boolean;
  detailsError: string | null;
}

export const initialState: ItemsState = {
  items: [],
  selectedItem: null,
  listLoading: false,
  listError: null,
  detailsLoading: false,
  detailsError: null
};

export const itemsReducer = createReducer(
  initialState,

  // list
  on(loadItems, (state): ItemsState => ({
    ...state,
    listLoading: true,
    listError: null
  })),

  on(loadItemsSuccess, (state, { items }): ItemsState => ({
    ...state,
    items,
    listLoading: false,
    listError: null
  })),

  on(loadItemsFailure, (state, { error }): ItemsState => ({
    ...state,
    listLoading: false,
    listError: error
  })),

  // details
  on(loadItem, (state): ItemsState => ({
    ...state,
    selectedItem: null,
    detailsLoading: true,
    detailsError: null
  })),

  on(loadItemSuccess, (state, { item }): ItemsState => ({
    ...state,
    selectedItem: item,
    detailsLoading: false,
    detailsError: null
  })),

  on(loadItemFailure, (state, { error }): ItemsState => ({
    ...state,
    selectedItem: null,
    detailsLoading: false,
    detailsError: error
  }))
);
