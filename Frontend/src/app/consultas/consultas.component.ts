import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  elementos:any[]=[]
  atributos:any[]=[]

  obj_atrib:any={
    0:["SELECT personas.CI,personas.nombre,personasnaturales.RUT FROM personas INNER JOIN personasnaturales ON personas.CI=personasnaturales.CI INNER JOIN impuestoscontribuyentes ON personasnaturales.RUT=impuestoscontribuyentes.RUT GROUP BY personas.CI,personas.nombre,personasnaturales.RUT HAVING COUNT(*) = (SELECT COUNT(*) FROM impuestos);",],
    1:["SELECT empresas.RUT as RutEmpresa,COUNT(titularempesa.CI) as CantidadTitulares FROM empresas INNER JOIN titularempesaON titularempesa.RUT=empresas.RUTGROUP BY empresas.RUT;"],
    2:["SELECT personasnaturales.RUT,personas.CI,personas.nombre FROM personasINNER JOIN personasnaturales ON personas.CI=personasnaturales.CI INNER JOIN pagosimpuestos ON pagosimpuestos.RUT=personasnaturales.RUT INNER JOIN localespago ON pagosimpuestos.CodEntidad=localespago.CodEntidad GROUP BY personasnaturales.RUT,personas.CI,personas.nombre HAVING COUNT(*) = (SELECT COUNT(*) FROM pagosimpuestos WHERE pagosimpuestos.RUT=personasnaturales.RUT)"],
    3:["SELECT empresas.RUT, SUM(pagosimpuestos.monto) as SumaDinero FROM empresas INNER JOIN pagosimpuestos ON empresas.RUT=pagosimpuestos.RUT WHERE pagosimpuestos.fechaPago BETWEEN '2024-02-12' AND '2024-02-16';"],
    4:["SELECT pagosimpuestos.NumeroFormulario AS CodigoImpuesto,SUM(pagosimpuestos.monto) as TotalRecaudado FROM pagosimpuestos GROUP BY pagosimpuestos.NumeroFormulario ORDER BY TotalRecaudado DESC LIMIT 3"]
  }

constructor(private DataService:DataServiceService) {

}

ngOnInit(){

}
  RealizarConsulta(value:number){
    // let elemnt:any=document.getElementById("consulta_p");
    this.elementos=[];
  
 if(value==0){

  this.DataService.Consulta1().subscribe((data:any)=>{
    console.log(data);
    if(data["mensaje"]){
      alert(data["mensaje"])
  }else{
    data.forEach((item:any) => {
     this.atributos=Object.keys(item)
      this.elementos.push(item);
    });
    // elemnt.textContent=this.obj_atrib[0];
  }
  });

 }else if(value==1){
  this.DataService.Consulta2().subscribe((data:any)=>{
    console.log(data);
    if(data["mensaje"]){
      alert(data["mensaje"])
  }else{  
    
    data.forEach((item:any) => {
     this.atributos=Object.keys(item)
      this.elementos.push(item);
    });
    // elemnt.textContent=this.obj_atrib[1];
  }
  });
 }
 else if(value==2){
  this.DataService.Consulta3().subscribe((data:any)=>{
    console.log(data);
    if(data["mensaje"]){
      alert(data["mensaje"])
  }else{  
    data.forEach((item:any) => {
     this.atributos=Object.keys(item)
      this.elementos.push(item);
    });
    // elemnt.textContent=this.obj_atrib[2];
  }
  });
 }
 else if(value==3){
  this.DataService.Consulta4().subscribe((data:any)=>{
    console.log(data);
    if(data["mensaje"]){
      alert(data["mensaje"])
  }else{  
    data.forEach((item:any) => {
     this.atributos=Object.keys(item)
      this.elementos.push(item);
    });
    // elemnt.textContent=this.obj_atrib[3];
  }
  });
 }
 else if(value==4){
  this.DataService.Consulta5().subscribe((data:any)=>{
    console.log(data);
    if(data["mensaje"]){
      alert(data["mensaje"])
  }else{  
    data.forEach((item:any) => {
     this.atributos=Object.keys(item)
      this.elementos.push(item);
    });
    // elemnt.textContent=this.obj_atrib[4];
  }
  });
 }

  }
}
