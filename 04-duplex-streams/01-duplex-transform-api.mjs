import { Duplex, Transform } from 'node:stream'

// vou simular uma API que persiste e lê dados usando streams
const server = Duplex({
    objectMode: true, // isso indica que vamos processar não mais como buffer, mas como objetos js. Pode consumir mais memório, mas dispensa o uso de .toString() smp que quisermos ver o que está trafegando
    write(chunk, enc, callback){
        console.log(`[duplex-writable] salvando:\n`, chunk)
        callback()
    },
    read(){
        const everySecond = (intervalContext) => {
            this.counter = this.counter ?? 0
            if(this.counter++ <= 5){
                this.push(`meu nome é Pedro[${this.counter }]`)
                return
            }
            clearInterval(intervalContext)
            this.push(null)
        }
        setInterval(function(){everySecond(this)})
    }
})

// server.write('[duplex-writable] olá mundo')

// server.push(`[duplex-readable] lendoo`)

const transformToUpperCase = Transform({
    objectMode: true,
    transform(chunk, enc, callback) {
        callback(null, chunk.toUpperCase())
    }
})

transformToUpperCase.write(`[transform] olá do writer`)

server.pipe(transformToUpperCase)
.pipe(server)