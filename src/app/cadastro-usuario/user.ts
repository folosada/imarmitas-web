export class User {
  private id: number;
  private login: String;
  private email: String;
  private administrador: boolean;
  
  public getId(): number {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getLogin(): String {
    return this.login;
  }

  public setLogin(login: String) {
    this.login = login;
  }

  public getEmail(): String {
    return this.email;
  }

  public setEmail(email: String) {
    this.email = email;
  }

  public isAdministrador(): boolean {
    return this.administrador;
  }

  public setAdministrador(administrador: boolean) {
    this.administrador = administrador;
  }

  constructor(id: number, login: String, email: String, administrador: boolean) {
    this.id = id;
    this.login = login;
    this.email = email;
    this.administrador = administrador;    
  }

}