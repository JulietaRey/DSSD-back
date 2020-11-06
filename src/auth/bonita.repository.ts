import axios from 'axios';

export class BonitaRepository {
  async signIn(): Promise<string>{
    return axios.post('http://localhost:8080/bonita/loginservice', 'username=walter.bates&password=Prueba.123&redirect=false').then(res => { 
      const value = res.headers['set-cookie'].find(cookie => cookie.startsWith('X-Bonita-API'));
      return (value.split('=')[1]).split(';')[0];
    });    
  }
}