import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Storage } from '@ionic/storage-angular';
import { UsuarioDto } from 'src/app/schemas/UsuarioDto';

import { SolicitudService } from 'src/app/core/services/solicitud.service';
import { SolicitudDto } from 'src/app/schemas/SolicitudDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  verMenuLateral: boolean;
  peleadores: UsuarioDto[] = [];
  _storage: Storage;

  sesion: UsuarioDto;

  constructor(
    private storage: Storage,
    private usuarioService: UsuarioService,
    public toastController: ToastController,
    private solicitudService: SolicitudService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private route: Router
  ) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async ngOnInit(): Promise<void> {
    await this.consultarSesion();
    this.consultarPeleador();
  }

  async consultarSesion() {
    this.sesion = new UsuarioDto(JSON.parse(await this.storage.get('sesion')));
    this.usuarioService.setSesion = this.sesion;
  }

  async consultarPeleador(): Promise<void> {
    console.log(this.sesion);

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      translucent: true,

      backdropDismiss: true,
    });
    await loading.present();

    this.usuarioService.consultarPeleadores(this.sesion).subscribe(
      (data: any) => {
        const respuesta = data.docs.filter((element) => {
          return element.id != this.sesion.id;
        });

        respuesta.forEach((element) => {
          let peleador: UsuarioDto = {
            id: element.id,
            correo: element.data().correo,
            apodo: element.data().apodo,
            experiencia: element.data().experiencia,
            peso: element.data().peso,
          };

          this.peleadores.push(peleador);
        });

        loading.remove();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async registarSolicitud(ev: any, peleador: UsuarioDto) {
    console.log(this.sesion);
    let solicitud: SolicitudDto = {
      id_usuario: peleador.id,
      interesado: {
        id: this.sesion.id,
        apodo: this.sesion.apodo,
        experiencia: this.sesion.experiencia,
        peso: this.sesion.peso,
        correo: this.sesion.correo,
      },
      estado: ev.detail.value,
    };

    const respuesta = this.peleadores.filter((element) => {
      return element.id != peleador.id;
    });

    this.peleadores = respuesta;

    this.solicitudService.registrarSolicitud(solicitud);

    const toast = await this.toastController.create({
      message: 'Solicitud enviada',
      duration: 2000,
    });
    toast.present();
  }

  async cerrarSesion() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Winston!',
      message: '¿Esta seguro que desea  <strong>Cerrar la sesión?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.storage.clear();

            this.usuarioService.setSesion = {};

            this.route.navigateByUrl('/login');
          },
        },
      ],
    });

    await alert.present();
  }
}
