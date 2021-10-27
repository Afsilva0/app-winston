export class UsuarioDto {
  correo?: string;
  contrasenia?: string;
  apodo?: string;
  peso?: number;
  experiencia?: number;

  constructor(init?: Partial<UsuarioDto>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
