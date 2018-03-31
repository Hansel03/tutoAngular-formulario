import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-data',
    templateUrl: './data.component.html',
    styles: []
})
export class DataComponent {
    /*Definicion del formulario*/
    forma: FormGroup;

    constructor() {
        /* El FormControl recibde tres parametros
        1.valor
        2.validaciones
        3. validaciones asincronas */
        this.forma = new FormGroup({
            'nombre': new FormControl('Gernando', Validators.required),
            'apellido': new FormControl('', Validators.required),
            'email': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')])
        });
    }


    guardarCambios() {
        console.log(this.forma);
        console.log(this.forma.value);
    }



}
