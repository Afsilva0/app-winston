import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SolicitudService } from 'src/app/core/services/solicitud.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { SolicitudDto } from 'src/app/schemas/SolicitudDto';
import { UsuarioDto } from 'src/app/schemas/UsuarioDto';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  verMenuLateral: boolean;
  peleadores: SolicitudDto[] = [];

  sesion: UsuarioDto;
  constructor(
    private usuarioService: UsuarioService,
    private solicitudService: SolicitudService,
    public loadingController: LoadingController
  ) {}

  async ngOnInit(): Promise<void> {
    this.consultarSesion();
    this.consultarSolicitudes();
  }

  consultarSesion() {
    this.sesion = this.usuarioService.getSesion;
  }

  async consultarSolicitudes() {
    this.peleadores = [];
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      translucent: true,

      backdropDismiss: true,
    });
    await loading.present();

    this.solicitudService.consultarSolicitudesByUsuario(this.sesion).subscribe(
      (data: any) => {
        data.docs.forEach((element) => {
          let peleador: SolicitudDto = {
            estado: element.data().estado,
            id_usuario: element.data().id_usuario,
            interesado: element.data().interesado,
          };

          this.peleadores.push(peleador);
        });

        console.log(this.peleadores);
        loading.remove();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  recargar(event) {
    setTimeout(() => {
      this.consultarSolicitudes();
      event.target.complete();
    }, 500);
  }
}
