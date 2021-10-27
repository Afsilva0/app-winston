import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Storage } from '@ionic/storage-angular';
import { UsuarioDto } from 'src/app/schemas/UsuarioDto';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  peleadores: UsuarioDto[] = [];
  _storage: Storage;

  constructor(
    private usuarioService: UsuarioService,
    public toastController: ToastController,
    private storage: Storage
  ) {
    this.init();
  }

  ngOnInit(): void {
    this.consultarPeleador();
  }

  async consultarPeleador(): Promise<void> {
    let sesion: UsuarioDto = new UsuarioDto(
      JSON.parse(await this.storage.get('sesion'))
    );

    this.usuarioService.consultarPeleadores(sesion).subscribe(
      (data: any) => {
        const respuesta = data.docs.filter((element) => {
          return element.id != sesion.id;
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

        console.log(this.peleadores);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }
}
