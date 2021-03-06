import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

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
            'username': new FormControl('', Validators.required, this.existeUsuario),
            'password1': new FormControl('', Validators.required),
            'password2': new FormControl()
        });

        /*Cargamos los valores por defecto del objeto usuario */
        /* this.forma.setValue(this.usuario);*/

        this.forma.controls['password2'].setValidators([
            Validators.required,
            this.noIgual.bind(this.forma)
        ]);

        this.forma.controls['username'].valueChanges.subscribe(data => {
            console.log(data);
        });

        this.forma.controls['username'].statusChanges.subscribe(data => {
            console.log(data);
        });

    }

    /**
     * Funcion para mostrar los campos del formulario
     * @memberof DataComponent.guardarCambios
     */
    guardarCambios() {
        console.log(this.forma);
        console.log(this.forma.value);
    }
    /**
     * Funcion para limpiar los campos del formulario
     * @memberof DataComponent.limpiar
     */
    limpiar() {
        /*Resetea el formulario a su forma inicial, sin haberlo tocado */
        this.forma.reset();
    }

    /**
     * Funcion para agregar otro campo para pasatiempos
     * @memberof DataComponent.agregarPasatiempo
     */
    agregarPasatiempo() {
        (<FormArray>this.forma.controls['pasaTiempos']).push(
            new FormControl('', Validators.required)
        );
    }
    /**
     * Funcion que valida que no se pueda digitar el apellido herrera
     * @param {FormControl} control
     * @returns {{ [s: string]: boolean }}
     * @memberof DataComponent.noHerrera
     */
    noHerrera(control: FormControl): { [s: string]: boolean } {
        if (control.value === 'herrera') {
            return {
                noherrera: true
            };
        }
        return null;
    }
    /**
     * Funcion que valida que las contraseñas no sean iguales
     * @param {FormControl} control
     * @returns {{ [s: string]: boolean }}
     * @memberof DataComponent.noIgual
     */
    noIgual(control: FormControl): { [s: string]: boolean } {
        const forma: any = this;
        if (control.value !== forma.controls['password1'].value) {
            return {
                noiguales: true
            };
        }
        return null;
    }
    /**
     * Funcion que valida que el usuario ya exista
     * @param {FormControl} control
     * @returns {(Promise<any> | Observable<any>)}
     * @memberof DataComponent.existeUsuario
     */
    existeUsuario(control: FormControl): Promise<any> | Observable<any> {
        const promesa = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    if (control.value === 'hansel') {
                        resolve({ existe: true });
                    } else {
                        resolve(null);
                    }
                }, 3000);
            }
        );
        return promesa;
    }



}
