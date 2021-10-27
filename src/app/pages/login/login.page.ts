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

/* import { AppPreferences } from '@ionic-native/app-preferences/ngx'; */

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  verMenuLateral: boolean;

  form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    public toastController: ToastController /*   private appPreferences: AppPreferences */
  ) {}

  ngOnInit() {
    this.buildForm();
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

  async iniciarSesion(): Promise<void> {
    this.form.markAsTouched();

    if (this.form.valid) {
      console.log(this.form.value);
      this.usuarioService
        .iniciarSesion(new UsuarioDto(this.form.value))
        .subscribe(
          (data: any) => {
            console.log(data.docs);
            if (data.docs.length != 0) {
              console.log(data.docs[0].id);
              console.log(data.docs[0].data());

              /*    this.appPreferences.store('sesion', 'hola');

              this.appPreferences.fetch('sesion').then((res) => {
                console.log(res);
              }); */

              this.router.navigateByUrl('/inicio');
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
