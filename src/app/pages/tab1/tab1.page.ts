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
        const filtered = data.docs.filter(function(element){
          return element.id != sesion.id;
        });
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
