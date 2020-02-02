import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Hrana } from 'src/models/Hrana';

@Component({
  selector: 'app-smart-search-bar',
  templateUrl: './smart-search-bar.component.html',
  styleUrls: ['./smart-search-bar.component.css']
})
export class SmartSearchBarComponent implements OnInit {

  @Input() titlePretrage:string;
  @Input() obsPretrage:Observable<any>;
  @Input() changing: Subject<any[]>;
  @Output() onEnter: EventEmitter<any> = new EventEmitter<any>();
  myControl = new FormControl();
  allPodaci:any[]=[];
  filtriraniPodaci: Observable<any>;
  
  constructor(private router: Router) { }

  async ngOnInit() {
    this.changing.subscribe(v => { 
      console.log('value is changing', v);
      this.allPodaci = v;
   });
    this.subskrajbujSeNaUlaznePodatke();
  }

  subskrajbujSeNaUlaznePodatke(){
    this.obsPretrage.subscribe(podaci=>{
      console.log(podaci);
      this.allPodaci=podaci;
    });
    this.filtriraniPodaci = this.myControl.valueChanges
    .pipe(
      startWith('/[a-zA-Z]/'),
      map(value => this._filter(value))
    );
  }

  private _filter(value: any): string[] {
    let filterValue;
    if(value.ime)
      filterValue= value.toLowerCase().ime;
    else
      filterValue= value.toLowerCase();
    if(this.allPodaci[0] && this.allPodaci[0].ime)
    {
      if(value.length>2)
        return this.allPodaci.filter(podatak =>podatak.ime.toLowerCase().includes(filterValue));
    }
    else {
      if(value.length>2){
        return this.allPodaci.filter(podatak => podatak.toLowerCase().includes(filterValue));
      }
    }
  }

  prikaz(podatak){
    if(this.allPodaci[0].ime){
      return podatak.ime;
    }
    else{
      return podatak;
    }
  }

  vratiVrednost(podatak){
    if(this.allPodaci[0].ime){
      return podatak.ime;
    }
    else{
      return podatak;
    }
  }

  pretraziTrenutno(){
    if(this.allPodaci[0].ime){
    let vratiHranu:Hrana =null;
    this.allPodaci.forEach(hrana => {
      if(hrana.ime == this.myControl.value)
        vratiHranu = hrana;
    });
    this.onEnter.emit(vratiHranu);
  }
  else{
    this.onEnter.emit(this.myControl.value);
  }
}
}