import { Component, OnInit } from '@angular/core';
import {ProspectoService} from '../services/prospecto.service'
import {Prospecto} from '../interfaces/prospecto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: []
})
export class InicioComponent implements OnInit {
  allprospectos: Prospecto[]=[];
  arrProspectos: any;
  respaldo: any;
  textoDeInput: string = null;
  observacin : any;
  constructor(private prospectoService: ProspectoService,  private router: Router) {
    
   }

  ngOnInit(): void {
    
    this.getAllProspectos();
  }

  getAllProspectos(){
    this.prospectoService.getProspectos()
    .then(prospectos=>{
      this.allprospectos = prospectos;
      this.allprospectos = this.allprospectos;
      this.arrProspectos=this.allprospectos
      this.respaldo =this.allprospectos
      
    });

  }
  
  search = (text) => this.respaldo.filter(({nombre, apaterno,amaterno }) => nombre.toLowerCase().includes(text) || apaterno.toLowerCase().includes(text) || amaterno.toLowerCase().includes(text));
  applyFilter() {
    var list : any;
   
    list=this.arrProspectos
    if(this.textoDeInput==""){
  
      this.allprospectos=this.arrProspectos
    }
    let filterValueLower = this.textoDeInput.toLowerCase()
    this.allprospectos = this.search(filterValueLower); 
   
  }
  
 
  detallesProspecto(IdProspecto:any){
    this.router.navigate(['/detalles/prospecto/', IdProspecto]);
  }

  textObservacion(observacion:any){
     this.observacin = observacion
    
  }

  filtrarEstatus(estado:any){
    var list : any;
    list=this.respaldo
    if(estado == "x"){
      this.allprospectos = this.arrProspectos;
    }else{
      this.allprospectos = list.filter(prospecto => prospecto.estado == estado);
    }
    
    
  }
  
}
