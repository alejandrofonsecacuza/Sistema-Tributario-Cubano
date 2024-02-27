import { Component, Input, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';


@Component({
  selector: 'app-tabla-personas',
  templateUrl: './tabla-personas.component.html',
  styleUrls: ['./tabla-personas.component.css']
})
export class TablaPersonasComponent  implements OnInit{
  elementos: any[] = [];
  atributos: any[]=  [];

  constructor(private DataService:DataServiceService) {

    
  }
  ngOnInit(): void {
     this.DataService.OptenerDatos().subscribe((data:any)=>{
      if(data===null || data["mensaje"]){
        
    }
    else{
      data.forEach((item:any) => {
        this.elementos.push(item);
      });
    }
    });


    this.DataService.OptenerColumnas().subscribe((data:any)=>{
      if(data["mensaje"]){
        alert(data["mensaje"])
    }else{
      data.forEach((item:any) => {
        this.atributos.push(item);
      });
    }
    });
  }


  BuscarTablaBTN(value:string="",name_table:any=null){
    let element=document.getElementById("name_table");
   
   if(element && name_table){
    element.focus()
    name_table.value=''
   }
    this.elementos=[]
    this.atributos=[]
    
    
    this.DataService.SetTabla(value);
    this.ngOnInit();


  }
}

