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

    usuario: any = {
        nombreCompleto: {
            nombre: 'Hansel',
            apellido: 'Suarez'
        },
        email: 'hansel@hotmail.com'
    };

    constructor() {
        /* El FormControl recibde tres parametros
        1.valor
        2.validaciones
        3. validaciones asincronas */
        this.forma = new FormGroup({
            'nombreCompleto': new FormGroup({
                'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
                'apellido': new FormControl('', [Validators.required, Validators.minLength(3)])
            }),
            'email': new FormControl(
                '',
                [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]
            )
        });

        /*Cargamos los valores por defecto del objeto usuario */
        this.forma.setValue(this.usuario);
    }


    guardarCambios() {
        console.log(this.forma);
        console.log(this.forma.value);
        /*Resetea el formulario a su forma inicial, sin haberlo tocado */
        this.forma.reset();
    }



}
