import { Usuario } from '../models/Usuario.model';

export interface ListadoUsuarios {
  total: number;
  usuarios: Usuario[];
}
