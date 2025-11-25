import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemsState, itemsFeatureKey } from './items.reducer';

export const selectItemsState =
  createFeatureSelector<ItemsState>(itemsFeatureKey);

export const selectItemsList = createSelector(
  selectItemsState,
  state => state.items
);

export const selectItemsListLoading = createSelector(
  selectItemsState,
  state => state.listLoading
);

export const selectItemsListError = createSelector(
  selectItemsState,
  state => state.listError
);

export const selectSelectedItem = createSelector(
  selectItemsState,
  state => state.selectedItem
);

export const selectItemDetailsLoading = createSelector(
  selectItemsState,
  state => state.detailsLoading
);

export const selectItemDetailsError = createSelector(
  selectItemsState,
  state => state.detailsError
);
