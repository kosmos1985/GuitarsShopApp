import { Component, OnDestroy, OnInit } from '@angular/core';
import { GuitarsService } from './service/guitars.service';
import { Guitars } from './models/guitars';
import { Observable, Subscription } from 'rxjs';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';


function autocompleteObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (typeof control.value === 'string') {
      return { 'invalidAutocompleteObject': { value: control.value } }
    }
    return null  /* valid option selected */
  }
}





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy{
  guitars: Guitars[];
  editMode = false;
 
  config: { [key: string]: string } = null;
  public filteredGuitarsOptions: Observable<Guitars[]>
  private subscriptions = new Subscription();
 
  constructor(private http: GuitarsService) { };
  
  public contactAutocompleteControl = new FormControl('', 
    { validators: [autocompleteObjectValidator(), Validators.required] })
  
  public validation_msgs = {
    'contactAutocompleteControl': [
      { type: 'invalidAutocompleteObject', message: 'Guitar name not recognized. Click one of the autocomplete options.' },
      { type: 'required', message: 'Guitar name is required.' }
    ]
  };
 
  ngOnInit() {
      const sub = this.http.getGuitars().subscribe(guitarsList => {
        this.guitars = guitarsList;
        console.log(this.guitars);
      }, error => console.error(error),
        ()=>console.log('Complite')
      );
    this.subscriptions.add(sub);
    
    this.filteredGuitarsOptions = this.contactAutocompleteControl.valueChanges.pipe(
      startWith(''),
      map(value => value ? value.name : undefined),
      map(name => name ? this._filterGuitars(name) : this.guitars)
    )

    
    setTimeout(() => {
      this.config = {
        title: 'Guitars Shop',
        footer: ' © Guitars Shop, All rights reserved.',
        date: new Date().toDateString()
      };
    }, 500);

  };
  private _filterGuitars(name: string): Guitars[] {
    if (name === '') {
      return this.guitars.slice()
    }
    const filterValue = name.toLowerCase()
    return this.guitars.filter(option => option.name.toLowerCase().includes(filterValue))
  };
  public displayGuitarsFn(guitar?: Guitars): string | undefined {
    return guitar ? guitar.name : undefined
  }
  
  clearGrades() {
    this.guitars = [];
  };
  addGuitars() {
    console.log();
    
  }
  
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  };

}




