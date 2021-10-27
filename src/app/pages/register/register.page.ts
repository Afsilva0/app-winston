import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { UsuarioDto } from 'src/app/schemas/UsuarioDto';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  verMenuLateral: boolean;

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    public toastController: ToastController
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
      apodo: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ],
      ],
      peso: [0, [Validators.required]],
      experiencia: [[Validators.required]],
    });
  }

  get getCorreo(): AbstractControl {
    return this.form.get('correo');
  }

  get getContrasenia(): AbstractControl {
    return this.form.get('contrasenia');
  }

  get getApodo(): AbstractControl {
    return this.form.get('apodo');
  }

  get getPeso(): AbstractControl {
    return this.form.get('peso');
  }

  get getExperiencia(): AbstractControl {
    return this.form.get('experiencia');
  }

  validarCorreoCampo(): boolean {
    return this.getCorreo.errors && this.getCorreo.dirty;
  }

  validarContraseniaCampo(): boolean {
    return this.getContrasenia.errors && this.getContrasenia.dirty;
  }

  validarApodoCampo(): boolean {
    return this.getApodo.errors && this.getApodo.dirty;
  }

  validarPesoCampo(): boolean {
    return this.getPeso.errors && this.getPeso.dirty;
  }

  validarExperienciaCampo(): boolean {
    return this.getExperiencia.errors && this.getExperiencia.dirty;
  }

  async registrarse(): Promise<void> {
    this.form.markAsTouched();

    if (this.form.valid) {
      console.log(this.form.value);

      let usuario: UsuarioDto = new UsuarioDto(this.form.value);
      console.log(usuario);
      this.usuarioService.registrarUsuario(usuario);
    } else {
      const toast = await this.toastController.create({
        message: 'Diligencie los campos correctamente.',
        duration: 2000,
      });
      toast.present();
    }
  }
}
