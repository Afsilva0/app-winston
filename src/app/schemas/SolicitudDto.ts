import { UsuarioDto } from './UsuarioDto';

export class SolicitudDto {
  id_usuario?: string;
  interesado?: UsuarioDto;
  estado?: string;

  constructor(init?: Partial<SolicitudDto>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
