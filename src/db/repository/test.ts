import DBProcedures from '../procedures/procedures';
const Request = require('tedious').Request;
import DatabaseConnection from '../database';

export class TestRepository {
    async getList(returnedData) {
        try {
            const this_ = this;
            const procedure = await DBProcedures.procedureWithoutParams();
            const request: any = DBProcedures.configureProcedure(procedure.name, procedure.params, (results) => {
                returnedData(this_.formatResults(results));
            });
            (new DatabaseConnection).callRequest(request);
        } catch(e) {
            throw(`Cannot get the list: ${e}`);
        }
    }

    private formatResults(response: Array<any>): any {
        const list = [];
        for(const element of response) {
            const newElement = {
                name: element[1].value,
                id: element[0].value
            }
            list.push(newElement);
        }
        return list;
    }
}