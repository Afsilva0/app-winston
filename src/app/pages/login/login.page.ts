import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { UsuarioDto } from 'src/app/schemas/UsuarioDto';

import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  verMenuLateral: boolean;

  form: FormGroup;
  _storage: Storage;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    public toastController: ToastController,
    private storage: Storage
  ) {
    this.init();
  }

  async ngOnInit() {
    this.buildForm();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      correo: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ],
      ],
      contrasenia: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  get getCorreo(): AbstractControl {
    return this.form.get('correo');
  }

  get getContrasenia(): AbstractControl {
    return this.form.get('contrasenia');
  }

  validarCorreoCampo(): boolean {
    return this.getCorreo.errors && this.getCorreo.dirty;
  }

  validarContraseniaCampo(): boolean {
    return this.getContrasenia.errors && this.getContrasenia.dirty;
  }

  async iniciarSesion() {
    this.form.markAsTouched();

    if (this.form.valid) {
      console.log(this.form.value);
      this.usuarioService
        .iniciarSesion(new UsuarioDto(this.form.value))
        .subscribe(
          async (data: any) => {
            console.log(data.docs);
            if (data.docs.length != 0) {
              let sesion: UsuarioDto = {
                id: data.docs[0].id,
                correo: data.docs[0].data().correo,
                experiencia: data.docs[0].data().experiencia,
                peso: data.docs[0].data().peso,
              };

              this.storage.remove('sesion');

              await this.storage.set('sesion', JSON.stringify(sesion));

              this.router.navigateByUrl('/inicio');

              const toast = await this.toastController.create({
                message: 'Bienvenido',
                duration: 2000,
              });
              toast.present();
            } else {
              console.log('no hay datos');
            }
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      const toast = await this.toastController.create({
        message: 'Diligencie los campos correctamente.',
        duration: 2000,
      });
      toast.present();
    }
  }

  redireccionarRegister(): void {
    this.router.navigateByUrl('/register');
  }
}
