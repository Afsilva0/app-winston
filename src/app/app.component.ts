import { Component, OnInit } from '@angular/core';
import { UsuarioDto } from './schemas/UsuarioDto';

import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  loggedIn = false;
  dark = false;
  _storage: Storage;

  constructor(private storage: Storage, private router: Router) {
    this.init();
  }

  async ngOnInit(): Promise<void> {
    let sesion: UsuarioDto = new UsuarioDto(
      JSON.parse(await this.storage.get('sesion'))
    );

    if (sesion.id) {
      this.router.navigateByUrl('/inicio');
    }
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }
}
