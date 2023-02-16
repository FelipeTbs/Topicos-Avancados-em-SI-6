const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("calculadora.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);
const calculadoraPackage = grpcObject.calculadoraPackage;

const op = parseInt(process.argv[2]); //process pega a linha utilizada no terminal, o terceiro elemento é a operação
const var1 = parseInt(process.argv[3]); //o quarto e o quinto elemnto são as variaveis
const var2 = parseInt(process.argv[4]);

const client = new calculadoraPackage.ObjetoCalculadora('localhost:50051',
grpc.credentials.createInsecure())

console.log(var2)

client.calculadora({
    'op': op,
    'var1':var1,
    'var2':var2

}, (err, response) => {
    console.log(JSON.stringify(response))
})