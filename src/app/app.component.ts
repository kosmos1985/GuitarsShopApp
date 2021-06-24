import { Component, OnDestroy, OnInit } from '@angular/core';
import { GuitarsService } from './service/guitars.service';
import { Guitars } from './models/guitars';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy{
  guitars: Guitars[];
  editMode = false;
 
  config: { [key: string]: string } = null;
  private subscriptions = new Subscription();
 
  constructor(private http: GuitarsService) {};
 
  ngOnInit() {
      const sub = this.http.getGuitars().subscribe(gradesList => {
        this.guitars = gradesList;
        console.log(this.guitars);
      }, error => console.error(error),
        ()=>console.log('Complite')
      );
      this.subscriptions.add(sub);
    setTimeout(() => {
      this.config = {
        title: 'Guitars Shop',
        footer: ' © Guitars Shop, All rights reserved.',
        date: new Date().toDateString()
      };
    }, 500);

  }; 
  
  clearGrades() {
    this.guitars = [];
  };
  removeGrades() {
    console.log('coś');
    
  }
  
  switchEditMode() {
    this.editMode = !this.editMode;
  }
  
  
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}

