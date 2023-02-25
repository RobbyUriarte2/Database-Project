require('dotenv').config();
const mysql = require('mysql2');
const { Client } = require('ssh2');
const sshClient = new Client();
const dbServer = {
    host: process.env.HOSTNAME,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}
const tunnelConfig = {
    host: process.env.SSH_HOST,
    port: 22,
    username:process.env.SSH_USER,
    password: process.env.SSH_PASSWORD
}
const forwardConfig = {
    srcHost: process.env.HOSTNAME,
    srcPort: process.env.PORT,
    dstHost: dbServer.host,
    dstPort: dbServer.port
};
const SSHConnection = new Promise((resolve, reject) => {
    sshClient.on('ready', () => {
        sshClient.forwardOut(
        forwardConfig.srcHost,
        forwardConfig.srcPort,
        forwardConfig.dstHost,
        forwardConfig.dstPort,
        (err, stream) => {
             if (err) reject(err);
             const updatedDbServer = {
                 ...dbServer,
                 stream
            };
            const connection =  mysql.createConnection(updatedDbServer);
           connection.connect((error) => {
            if (error) {
                reject(error);
            }
            resolve(connection);
            });
        });
    }).connect(tunnelConfig);
});