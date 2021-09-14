import { Component, OnInit } from '@angular/core';
import {FormGroup, Form, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {ProspectoService} from '../services/prospecto.service'
import {Prospecto} from '../interfaces/prospecto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  userForm;
  titulo_doc:any;
  archivos = []
  allprospectos: Prospecto[]=[];
  arrProspectos: any;
  respaldo: any;
  file: File;
  constructor(private formBuilder: FormBuilder,private prospectoService: ProspectoService,  private router: Router) {
    this.getAllProspectos();
    this.userForm = formBuilder.group({
      nombre: ['', Validators.required],
      apaterno: ['', [Validators.required]],
      amaterno: ['',],
      calle: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      colonia: ['', [Validators.required]],
      codigopostal: ['', [Validators.required]],
      rfc: ['', [Validators.required, Validators.pattern("^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))((-)?([A-Z0-9]{3}))?$")]],
      telefono: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      documento:['', Validators.required],
      titulo_doc:['', Validators.required]
    });
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

  ngOnInit(): void {
  }
  search = (text) => this.respaldo.filter(({rfc}) => rfc.toLowerCase().includes(text));
  saveUser() {
    var rfc_existe:any;
    rfc_existe = this.search(this.userForm.value.rfc.toLowerCase());
    
    if(rfc_existe.length<=0){
        if (this.archivos.length > 0){ 
        
          if (this.userForm.dirty && this.userForm.valid) {
            var prospecto ={
              'nombre':this.userForm.value.nombre,
              'apaterno':this.userForm.value.apaterno,
              'amaterno':this.userForm.value.amaterno,
              'calle':this.userForm.value.calle,
              'numero':this.userForm.value.numero,
              'colonia':this.userForm.value.colonia,
              'codigopostal':this.userForm.value.codigopostal,
              'telefono':this.userForm.value.telefono,
              'rfc':this.userForm.value.rfc,
              'estado':'e'        
            }
      
          this.prospectoService.createProspecto(prospecto)  
          .then((res) =>{
            
            for(var arc_file of this.archivos){
              let formData  = new FormData();
              formData.append("file", arc_file.file);
              formData.append("namedoc", arc_file.nombre);
              formData.append("rfc", this.userForm.value.rfc);
              this.prospectoService.uploadFile(formData).then((res) =>{
                this.router.navigate(['']);
              },error => {
                alert("algo salio mal al cargar el archivo")
                this.router.navigate(['']);
              } 
              );
            }
            
          },error => {
            alert("algo salio mal por favor intentelo nuevamente")
          } 
          );
          
          }
        }else{
          alert('Favor de agregar documentos para proceder con el registro')
        } 
      }else{
        alert('El RFC que intenta registar ya existe en nuestra base de datos')
      }
  }


  AddFile(){
    this.archivos.push({
      'nombre': this.userForm.value.titulo_doc,
      'file':this.file})
    console.log(this.archivos)
  }

  deleteTodo( index) {
    this.archivos.splice(index,1);
    console.log(this.archivos)  
  }

  LoadFile(event){
    this.file = event.target.files[0];
  }

}
