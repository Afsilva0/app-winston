import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { UsuarioDto } from 'src/app/schemas/UsuarioDto';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  verMenuLateral: boolean;
  form: FormGroup;

  sesion: UsuarioDto;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    public toastController: ToastController
  ) {}

  async ngOnInit(): Promise<void> {
    this.consultarSesion();
    this.buildForm();
    this.setInfromacionPerfil();
  }

  consultarSesion() {
    this.sesion = this.usuarioService.getSesion;
  }

  setInfromacionPerfil(): void {
    this.getCorreo.setValue(this.sesion.correo);
    this.getCorreo.disable();
    this.getApodo.setValue(this.sesion.apodo);
    this.getExperiencia.setValue(this.sesion.experiencia.toString());
    this.getPeso.setValue(this.sesion.peso);
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

  async actualizar(): Promise<void> {
    this.form.markAsTouched();

    if (this.form.valid) {
      console.log(this.form.value);

      let usuario: UsuarioDto = {
        id: this.sesion.id,
        apodo: this.getApodo.value,
        peso: parseInt(this.getPeso.value),
        experiencia: parseInt(this.getExperiencia.value),
      };

      this.usuarioService.actualizarUsuario(usuario);

      const toast = await this.toastController.create({
        message: 'Actualización Exitosa',
        duration: 2000,
      });

      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: 'Diligencie los campos correctamente.',
        duration: 2000,
      });
      toast.present();
    }
  }
}
