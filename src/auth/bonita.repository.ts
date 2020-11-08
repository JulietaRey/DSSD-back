import axios from 'axios';

export class BonitaRepository {
  async signIn(): Promise<{
    bonitaToken: string,
    JSESSIONID: string
  }>{
    return axios.post('http://localhost:8080/bonita/loginservice', 'username=walter.bates&password=Prueba.123&redirect=false')
      .then(res => { 
        const token = res.headers['set-cookie'].find(cookie => cookie.startsWith('X-Bonita-API'));
        const sessionId = res.headers['set-cookie'].find(cookie => cookie.startsWith('JSESSION'));
        return {
          bonitaToken: (token.split('=')[1]).split(';')[0],
          JSESSIONID: (sessionId.split('=')[1]).split(';')[0],
        }
      });    
    }

  async startProcess(): Promise<number>{
    const processId = await this.getProcessId('Testeo de medicamentos');
    
    const headers = {
      'Cookie': 
        'JSESSIONID='+'FF9414B4ABA5954E8AC49E0671A40241'+'; '+ //estos datos estan hardcodeados y deberian ser distintos
        'X-Bonita-API-Token='+'3205a5fb-9120-4fb2-8db5-37a98a88ae15',
      'X-Bonita-API-Token': '3205a5fb-9120-4fb2-8db5-37a98a88ae15'
    }
    return axios.post('http://localhost:8080/bonita/API/bpm/process/'+processId+'/instantiation', {},
    {
      headers: headers
    })
    .then(result => {
      return result.data.caseId;
    });
  }

  async getProcessId(processName: string): Promise<number>{
    const headers = {
      'Cookie': 
        'JSESSIONID='+'FF9414B4ABA5954E8AC49E0671A40241'+'; '+ //estos datos estan hardcodeados y deberian ser distintos
        'X-Bonita-API-Token='+'3205a5fb-9120-4fb2-8db5-37a98a88ae15',
      'X-Bonita-API-Token': '3205a5fb-9120-4fb2-8db5-37a98a88ae15'
    }
    return axios.get('http://localhost:8080/bonita/API/bpm/process',
    {
      params: {
        s: processName,
      },
      headers: headers
    })
    .then(result => {
      return result.data[0].id;
    });
  }
}