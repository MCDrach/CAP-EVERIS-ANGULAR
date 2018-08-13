export class Usuario {

    constructor(
        public codigo: number,
        public nombre: string,
        public idTipoUsuario: number,
        public email?: string,
        public password?: string,
        public image?: string
    ) {
    }
}
