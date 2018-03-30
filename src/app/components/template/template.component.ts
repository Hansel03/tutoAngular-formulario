import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-template',
    templateUrl: './template.component.html',
    styles: []
})
export class TemplateComponent implements OnInit {


    usuario: Object = {
        nombre: 'Fernnado',
        apellido: 'Herrera',
        email: 'hansel@hotmail.com'
    };

    constructor() { }

    ngOnInit() {
    }


    guardar(forma: NgForm) {
        console.log('Formulario guardado');
        console.log('NgForm', forma);
        console.log('Valor', forma.value);

        console.log('Usuario', this.usuario);
    }

}
