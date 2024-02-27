
import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class DataServiceService{
  public data:any[]=[];
  constructor(private http:HttpClient) { 
    


  }
  tabla="personas";

  SetTabla(value:string){
    this.tabla=value;
  }

 
OptenerDatos() {
  return this.http.get<any>('http://localhost/ServidorImpuestos/registros.php', { params: { nombre_tabla: this.tabla } });
}


OptenerColumnas() {
  return this.http.get<any>('http://localhost/ServidorImpuestos/columnas.php', { params: { nombre_tabla: this.tabla } });
}

Consulta1() {
  return this.http.get<any>('http://localhost/ServidorImpuestos/consulta1.php');
}
Consulta2() {
  return this.http.get<any>('http://localhost/ServidorImpuestos/consulta2.php');
}
Consulta3() {
  return this.http.get<any>('http://localhost/ServidorImpuestos/consulta3.php');
}
Consulta4() {
  return this.http.get<any>('http://localhost/ServidorImpuestos/consulta4.php');
}
Consulta5() {
  return this.http.get<any>('http://localhost/ServidorImpuestos/consulta5.php');
}


}
