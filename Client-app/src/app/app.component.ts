import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "./layout/header/header.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
 
 
  
 baseUrl ='http://localhost:5000/api/';
 
  private http = inject(HttpClient);
  

  activities:any[] = [];

 ngOnInit(){
     this.getActivity();   
 }
  
 getActivity(){

  this.http.get<any[]>(this.baseUrl + 'activities')
     .subscribe({   
       next: (response) => {
        //this.activities = response as string[]
        this.activities = response 
       },
       error: (error) => console.log(error),
       complete: () => console.log('complete')
    })
  
 }
}
