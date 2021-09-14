import { Component, OnInit } from '@angular/core';
import {ProspectoService} from '../services/prospecto.service'
import {Prospecto} from '../interfaces/prospecto';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  id: number;
  prospecto: any;
  documentos: any;
  obser: any ="";
  constructor(private route: ActivatedRoute,private prospectoService: ProspectoService,  private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getProspecto(this.id);
  }
  getProspecto(id:any){
    
    this.prospectoService.getProspecto(id)
    .then(prospecto=>{
      this.prospecto = prospecto[0];
      this.documentos = prospecto[0].documentos
      
    })
  }

  aprovar(): void{
    
      this.prospecto.observacion = this.obser
      this.prospecto.estado = 'a'
      this.prospectoService.updateProspecto(this.prospecto)  
      .then((res) =>{
        alert("Prospecto evaluado correctamente")
        this.router.navigate(['']);
      },error => {
        alert("algo salio mal por favor intentelo nuevamente")
      } 
      );
    
    

  }
  rechazar(): void{
    if(this.obser!=""){
      this.prospecto.observacion = this.obser
      this.prospecto.estado = 'r'
      this.prospectoService.updateProspecto(this.prospecto)  
      .then((res) =>{
        alert("Prospecto evaluado correctamente")
        this.router.navigate(['']);
      },error => {
        alert("algo salio mal por favor intentelo nuevamente")
      } 
      );
    }else{
      alert("Por favor ingrese observación de la causa de rechazo")
    }

  }
}
