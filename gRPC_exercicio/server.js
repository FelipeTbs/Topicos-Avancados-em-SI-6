const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("calculadora.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const calculadoraPackage = grpcObject.calculadoraPackage;

const server = new grpc.Server();
server.bind('0.0.0.0:50051',
grpc.ServerCredentials.createInsecure());

server.addService(calculadoraPackage.ObjetoCalculadora.service,
    {
        'calculadora': calculadora
    });
server.start();

function calculadora(call, callback) {

    console.log(call);

    /*let[op, var1, var2] = call.toString().split(',');
    op = parseInt(op);
    var1 = parseInt(var1);
    var2 = parseInt(var2);

    switch (op) {
        case 1: //Soma
        callback(null, {message: 'Resultado: ' + var1 + var2});
        break;
        case 2: //Subtração
        callback(null, {message: 'Resultado: ' + var1 - var2});
        break;
        case 3: //Multiplicação
        callback(null, {message: 'Resultado: ' + var1 * var2});
        break;
        case 4: //Divisão
        callback(null, {message: 'Resultado: ' + var1 / var2});
        break;
        default:
        callback(null, {message: 'Erro em algum lugar'});
    }*/

}
 