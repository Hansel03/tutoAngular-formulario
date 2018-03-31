import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

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
        email: 'hansel@hotmail.com',
        /*pasaTiempos: ['Correr', 'Dormir', 'Comer']*/
    };

    constructor() {
        /* El FormControl recibde tres parametros
        1.valor
        2.validaciones
        3. validaciones asincronas */
        this.forma = new FormGroup({
            'nombreCompleto': new FormGroup({
                'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
                'apellido': new FormControl('',
                    [Validators.required, Validators.minLength(3), this.noHerrera])
            }),
            'email': new FormControl(
                '',
                [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]
            ),
            'pasaTiempos': new FormArray([
                new FormControl('Correr', Validators.required)
            ]),
            'password1': new FormControl('', Validators.required),
            'password2': new FormControl()
        });

        /*Cargamos los valores por defecto del objeto usuario */
        /* this.forma.setValue(this.usuario);*/

        this.forma.controls['password2'].setValidators([
            Validators.required,
            this.noIgual.bind(this.forma)
        ]);
    }


    guardarCambios() {
        console.log(this.forma);
        console.log(this.forma.value);
    }

    limpiar() {
        /*Resetea el formulario a su forma inicial, sin haberlo tocado */
        this.forma.reset();
    }


    agregarPasatiempo() {
        (<FormArray>this.forma.controls['pasaTiempos']).push(
            new FormControl('', Validators.required)
        );
    }

    noHerrera(controls: FormControl): { [s: string]: boolean } {
        if (controls.value === 'herrera') {
            return {
                noherrera: true
            };
        }
        return null;
    }

    noIgual(controls: FormControl): { [s: string]: boolean } {
        const forma: any = this;
        if (controls.value !== forma.controls['password1'].value) {
            return {
                noiguales: true
            };
        }
        return null;
    }



}
