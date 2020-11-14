import axios from 'axios';

export class BonitaRepository {
  //datos temporales para poder probarlo rápido
  private bonitaAuthHeaders = {
    'Cookie': 
      'JSESSIONID='+'DC0B75A5188CF79A3049A182BF0811A9'+'; '+
      'X-Bonita-API-Token='+'c9fe99c5-f1a3-47d8-bac7-94e8a96c88ce',
    'X-Bonita-API-Token': 'c9fe99c5-f1a3-47d8-bac7-94e8a96c88ce'
  }
  async signIn(): Promise<{
    bonitaToken: string,
    JSESSIONID: string
  }>{
    return axios.post('http://localhost:8080/bonita/loginservice', 'username=walter.bates&password=Prueba.123&redirect=false')
      .then(res => { 
        var token = res.headers['set-cookie'].find(cookie => cookie.startsWith('X-Bonita-API'));
        var sessionId = res.headers['set-cookie'].find(cookie => cookie.startsWith('JSESSION'));
  
        return {
          bonitaToken: (token.split('=')[1]).split(';')[0],
          JSESSIONID: (sessionId.split('=')[1]).split(';')[0],
        }
      });    
    }

  async startProcess(): Promise<number>{
  
    const processId = await this.getProcessId('Testeo de medicamentos');
    
    return axios.post('http://localhost:8080/bonita/API/bpm/process/'+processId+'/instantiation', {},
    {
      headers: this.bonitaAuthHeaders
    })
    .then(result => {
      return result.data.caseId;
    });
  }

  async getProcessId(processName: string): Promise<number>{
    return axios.get('http://localhost:8080/bonita/API/bpm/process',
    {
      params: {
        s: processName,
      },
      headers: this.bonitaAuthHeaders
    })
    .then(result => {
      return result.data[0].id;
    });
  }

  async finishHumanTask(caseId: number): Promise<void>{
    axios.get('http://localhost:8080/bonita/API/bpm/humanTask', 
    {
      params: {
        f: 'rootCaseId=' + caseId
      },
      headers: this.bonitaAuthHeaders
    })
    .then(result => {
      axios.put('http://localhost:8080/bonita/API/bpm/humanTask/'+result.data[0].id, 
      {
        "assigned_id": "1", //el id del usuario que hace la tarea, aunque no entiendo bien qué es este ID porque si pongo cualquier cosa que no sea 1 da error
        "state": "completed" //ready - completed - failed
      },
      {
        headers: this.bonitaAuthHeaders
      })
    });
  }

  async getProcessVariable(caseId: number, variableName: string): Promise<{
   name: string,
   value: string,
   case_id: string,
   type: string,
  }> {
    return axios.get('http://localhost:8080/bonita/API/bpm/caseVariable/'+caseId+'/'+variableName, 
    {
      headers: this.bonitaAuthHeaders
    })
    .then(response => {
      return {
        name: response.data.name,
        value: response.data.value,
        case_id: response.data.case_id,
        type: response.data.type
      }
    })
  }

  async updateProcessCaseVariable(caseId: number, variableName: string, javaTypeName: string, newValue: string): Promise<void>{
    await axios.put('http://localhost:8080/bonita/API/bpm/caseVariable/'+caseId+'/'+variableName, 
    {
      "type": javaTypeName, //java.lang.String, java.lang.Integer, java.lang.Double, java.lang.Long, java.lang.Boolean, java.lang.Date
      "value": newValue
    },
    {
      headers: this.bonitaAuthHeaders
    })
  }
}