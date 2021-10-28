import { Component } from '@angular/core';
import { SolicitudService } from 'src/app/core/services/solicitud.service';
import { UsuarioDto } from 'src/app/schemas/UsuarioDto';
import { Tab1Page } from '../tab1/tab1.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  verMenuLateral: boolean;
  peleadores: UsuarioDto[] = [];
  _storage: Storage;

  sesion: UsuarioDto;
  constructor(
    private solicitudService: SolicitudService,
    private storage: Storage,
    private tab1Page: Tab1Page
  ) {
    /*     this.init(); */
  }

  /*   async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  } */

  async ngOnInit(): Promise<void> {
    this.consultarSesion();
    this.consultarSolicitudes();
  }

  consultarSesion() {
    this.tab1Page.consultarSesionLocal().subscribe((data) => {
      this.sesion = data;
    });
  }

  consultarSolicitudes() {
    this.solicitudService.consultarSolicitudesByUsuario(this.sesion).subscribe(
      (data: any) => {
        data.docs.forEach((element) => {
          let peleador: UsuarioDto = {
            id: element.id,
            correo: element.data().correo,
            apodo: element.data().apodo,
            experiencia: element.data().experiencia,
            peso: element.data().peso,
          };

          this.peleadores.push(peleador);
        });

        console.log(this.peleadores);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
