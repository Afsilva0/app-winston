import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Storage } from '@ionic/storage-angular';
import { UsuarioDto } from 'src/app/schemas/UsuarioDto';

import SwiperCore, { Navigation } from 'swiper';
import { SolicitudService } from 'src/app/core/services/solicitud.service';
import { SolicitudDto } from 'src/app/schemas/SolicitudDto';
import { Observable } from 'rxjs';
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
    private usuarioService: UsuarioService,
    private solicitudService: SolicitudService,
    public toastController: ToastController,
    private storage: Storage
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
    this.consultarSesionLocal().subscribe((data) => {
      this.sesion = data;
    });
  }

  consultarSesionLocal(): Observable<UsuarioDto> {
    return new Observable((observer) => {
      this.consultarSesion();
      this.storage
        .get('sesion')
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((err) => {
          observer.error(err);
          observer.complete();
        });
    });
  }

  async consultarPeleador(): Promise<void> {
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
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async registarSolicitud(ev: any, peleador: UsuarioDto) {
    let solicitud: SolicitudDto = {
      id_usuario: this.sesion.id,
      id_interesado: peleador.id,
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
}
