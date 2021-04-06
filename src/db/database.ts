import { dbConfig } from '../config';
const Connection = require('tedious').Connection;

class DatabaseConnection {
  private dbConnection: any;

  constructor() {
    this.initConnection();
  }

  private initConnection() {
    const this_ = this;
    this.dbConnection = new Connection(dbConfig);
    this.dbConnection.on('connect', function(err) {
        if(err) {
        console.log('Error: Cannot connect database');
        setTimeout(() => {
            this_.initConnection();
        }, 10000);
      }
    });
    this.dbConnection.connect();
  }

  private closeDatabaseConnection() {
    this.dbConnection.close(err => {
      if (err) {
        console.log('Database error.', err)
      } else {
        console.log('Successfully disconnected to DB.')
      }
    })
  }

  public callRequest(request) {
    const this_ = this;

    request.on('done', function (rowCount, more, returnStatus, rows) {
      this_.closeDatabaseConnection();
    });

    this.dbConnection.on('connect', (err) => {
      if (err) {
        console.log('Database error.', err)
      } else {
        console.log('Successfully connected to DB.')
        this_.dbConnection.callProcedure(request);
      }
    });
  }

  public getConnection() {
    return this.dbConnection;
  }

  public closeConnection() {
    this.dbConnection.close();
    return true;
  }
}

export default DatabaseConnection;

