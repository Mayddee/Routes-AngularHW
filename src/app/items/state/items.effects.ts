import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ItemsService } from '../../services/items.service';
import {
  loadItems,
  loadItemsSuccess,
  loadItemsFailure,
  loadItem,
  loadItemSuccess,
  loadItemFailure
} from './items.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ItemsEffects {
  constructor(
    private actions$: Actions,
    private itemsService: ItemsService
  ) {}

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadItems),
      mergeMap(action =>
        this.itemsService.getItems(action.query).pipe(
          map(items => loadItemsSuccess({ items })),
          catchError(err =>
            of(
              loadItemsFailure({
                error: err?.message || 'Failed to load characters'
              })
            )
          )
        )
      )
    )
  );

  loadItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadItem),
      mergeMap(action =>
        this.itemsService.getItemById(action.id).pipe(
          map(item => loadItemSuccess({ item })),
          catchError(err =>
            of(
              loadItemFailure({
                error:
                  err?.message || 'Failed to load character details'
              })
            )
          )
        )
      )
    )
  );
}
