export interface IUsuarios{
    id:number;
    persona_id: number;
    rol_id: number;
    correo: string;
    usuario: string;
    img: string;
    password: string;
}


export class Usuario{
    id:number = 0;
    persona_id: number = 0;
    rol_id: number = 0;
    correo: string = '';
    usuario: string = '';
    img: string = '';
    password: string = '';
    estado: string = '';
    created_at:string = '';
    updated_at:string = '';
    persona :any = [Persona];
    rol: any = [Rol];
}

class Persona{
    id:number = 0;
    cedula: string = '';
    nombre: string = '';
    apellido: string = '';
    telefono: string = '';
    direccion: string = '';
    estado: string = '';
    created_at:string = '';
    updated_at:string = '';
}

class Rol{
    id:number = 0;
    cargo: string = '';
    estado: string = '';
    created_at:string = '';
    updated_at:string = '';
}


