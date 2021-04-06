const TYPES = require('tedious').TYPES;
const Request = require('tedious').Request;

class DBProcedures {
  /* Example of a procedure with params */
  public async procedureWithParams(p1: string, p2: string): Promise<{name: string, params: Array<any>}> {
    const name = 'Table.procedure_name';
    const params: Array<any> = [
      {
        name: 'pTest1',
        value: parseInt(p1),
        type: TYPES.Int
      },
      {
        name: 'pTest2',
        value: parseInt(p2),
        type: TYPES.Int
      }
    ];
    return { name, params };
  }

  /* Example of a procedure without params */
  public async procedureWithoutParams(): Promise<{name: string, params: Array<any>}> {
    const name = 'Table.procedure_name';
    return { name, params: []};
  }

  /******************************************************
  ************ Configure TediousJs procedure ************
  * https://tediousjs.github.io/tedious/parameters.html *
  *******************************************************/
  public configureProcedure(name: string, params: Array<any>, returnedData): Request {
    const request = new Request(name, (err) => {
      if (err) {
        console.log(`Cannot configure the procedure ${name}.`, err);
        throw(err);
      }
    });

    for(const param of params) {
      request.addParameter(param.name, param.type, param.value);
    }

    request.on('doneInProc', function (rowCount, more, rows) {
      if (rows) {
        returnedData(rows)
      }
    });
    return request;
  }
}

export default new DBProcedures();
