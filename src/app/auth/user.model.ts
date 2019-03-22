


export class User {
    public nombre: string;
    public email: string;
    public uid: string;


    constructor( nombre: string, email: string, uid: string ) {
        this.email = email;
        this.nombre = nombre;
        this.uid = uid;
    }

}
