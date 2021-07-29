import { Subscription } from 'rxjs';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editItem: Ingredient;


  constructor( private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.editItem = stateData.editedIngredient;
        // this.editItemIndex = stateData.editedIngredientIndex;
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
      }
      else {
        this.editMode = false;
      }
    })
    // this.subscription = this.slService.startEditing.subscribe(
    //   (index: number) => {
    //     this.editItemIndex = index;
    //     this.editMode = true;
    //     this.editItem = this.slService.getIngredient(index);
    //     this.slForm.setValue({
    //       name: this.editItem.name,
    //       amount: this.editItem.amount
    //     });
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onSubmit(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode)
    {
      // this.slService.updateIngredient(this.editItemIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(
        newIngredient
      ));
    } else{
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  onClear(){
    this.slForm.reset()
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
