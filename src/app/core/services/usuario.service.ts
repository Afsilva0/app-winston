import { Injectable } from '@angular/core';

import { AngularFirestore, QueryGroupFn } from '@angular/fire/compat/firestore';

import { UsuarioDto } from 'src/app/schemas/UsuarioDto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private firestore: AngularFirestore) {}

  public registrarUsuario(usuarioDto: UsuarioDto) {
    return this.firestore
      .collection('usuario')
      .doc()
      .set(Object.assign({}, usuarioDto));
  }

  public iniciarSesion(usuarioDto: UsuarioDto) {
    let consulta: QueryGroupFn = (ref) =>
      ref
        .where('correo', '==', usuarioDto.correo)
        .where('contrasenia', '==', usuarioDto.contrasenia)
        .limit(1);

    return this.firestore.collection('usuario', consulta).get();
  }

  public consultarPeleadores(usuarioDto: UsuarioDto) {
    let consulta: QueryGroupFn;
    if (usuarioDto.peso < 70) {
      consulta = (ref) =>
        ref
          .where('peso', '<', 70)
          .where('experiencia', '==', usuarioDto.experiencia);
    } else if (usuarioDto.peso >= 70 && usuarioDto.peso < 90) {
      consulta = (ref) =>
        ref
          .where('peso', '>=', 70)
          .where('peso', '<', 90)
          .where('experiencia', '==', usuarioDto.experiencia);
    } else {
      consulta = (ref) =>
        ref
          .where('peso', '>=', 90)
          .where('experiencia', '==', usuarioDto.experiencia);
    }
    return this.firestore.collection('usuario', consulta).get();
  }
}
