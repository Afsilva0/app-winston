import { Injectable } from '@angular/core';

import { AngularFirestore, QueryGroupFn } from '@angular/fire/compat/firestore';

import { UsuarioDto } from 'src/app/schemas/UsuarioDto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  sesion: UsuarioDto;
  constructor(private firestore: AngularFirestore) {}

  set setSesion(sesion: UsuarioDto) {
    this.sesion = sesion;
  }

  get getSesion() {
    return this.sesion;
  }

  public registrarUsuario(usuarioDto: UsuarioDto) {
    return this.firestore
      .collection('usuario')
      .doc()
      .set(Object.assign({}, usuarioDto));
  }

  public actualizarUsuario(usuarioDto: UsuarioDto) {
    return this.firestore
      .collection('usuario')
      .doc(usuarioDto.id)
      .update(Object.assign({}, usuarioDto));
  }

  public iniciarSesion(usuarioDto: UsuarioDto) {
    let consulta: QueryGroupFn = (ref) =>
      ref
        .where('correo', '==', usuarioDto.correo)
        .where('contrasenia', '==', usuarioDto.contrasenia)
        .limit(1);

    return this.firestore.collection('usuario', consulta).get();
  }

  public consultarPeleadores(usuario: UsuarioDto) {
    let consulta: QueryGroupFn;
    if (usuario.peso < 70) {
      consulta = (ref) =>
        ref
          .where('peso', '<', 70)
          .where('experiencia', '==', usuario.experiencia);
    } else if (usuario.peso >= 70 && usuario.peso < 90) {
      consulta = (ref) =>
        ref
          .where('peso', '>=', 70)
          .where('peso', '<', 90)
          .where('experiencia', '==', usuario.experiencia);
    } else {
      consulta = (ref) =>
        ref
          .where('peso', '>=', 90)
          .where('experiencia', '==', usuario.experiencia);
    }
    return this.firestore.collection('usuario', consulta).get();
  }
}
