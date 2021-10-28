import { Injectable } from '@angular/core';

import { AngularFirestore, QueryGroupFn } from '@angular/fire/compat/firestore';
import { SolicitudDto } from 'src/app/schemas/SolicitudDto';
import { UsuarioDto } from 'src/app/schemas/UsuarioDto';
@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  constructor(private firestore: AngularFirestore) {}

  public registrarSolicitud(solicitud: SolicitudDto) {
    return this.firestore
      .collection('solicitud')
      .doc()
      .set(Object.assign({}, solicitud));
  }

  public consultarSolicitudesByUsuario(usuario: UsuarioDto) {
    let consulta: QueryGroupFn;

    consulta = (ref) =>
      ref.where('id_usuario', '==', usuario.id).where('estado', '==', 'P');

    return this.firestore.collection('usuario', consulta).get();
  }
}
