export default {
  server: process.env.DB_HOST,
  options: {
    port: parseInt(process.env.DB_PORT),
    encrypt: false,
    trustServerCertificate: true,
    database: process.env.DB_NAME,
    rowCollectionOnDone: true
  },
  authentication: {
    type: "default",
    options: {  
      userName: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    }
  }
};
