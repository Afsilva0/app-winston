export class SolicitudDto {
  id_usuario?: string;
  id_interesado?: string;
  estado?: string;

  constructor(init?: Partial<SolicitudDto>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
