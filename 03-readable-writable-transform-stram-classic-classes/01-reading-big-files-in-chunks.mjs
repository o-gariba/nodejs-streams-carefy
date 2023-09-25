// for i in `seq 1 25`; do node -e "process.stdout.write('ola-mundo'.repeat(1e7))" >> big-file.txt; done

import {
    promises,
    createReadStream,
    statSync
} from 'node:fs'

const filename = './big-file.txt' // 2.1 GiB
// const file = await promises.readFile(filename)

// console.log('fileBuffer', file) // RangeError file size is greater than 2 GiB

const { size } = statSync(filename)
console.log('\nfile size', size/1e9, 'GB', '\n')

let chunkConsumed = 0

const stream = createReadStream(filename)
// .once('data', msg => {
//     console.log('on data length', msg.toString().length) // 65K per readable
// })
// .on('readable', _ => {
//     // stream.read(9) altera o quanto é lido dentro do .once(). Por algum motivo eu tenho 2 console.logs deste trecho, ainda não sei o pq (o evento readable é disparado 2x). Posso substituir o .on() pelo .once() para obter apenas 1 console.log()
//     console.log('lendo 9 chunk bytes', stream.read(9).toString())
// })
// .once('readable', _ => {
//     console.log('lendo 9 chunk bytes', stream.read(9).toString())
//     console.log('lendo 3 chunk bytes', stream.read(3).toString())

//     chunkConsumed += 9 + 3
// })
.on('readable', _ => {
    let chunk;
    while(null !== (chunk = stream.read())) {
        chunkConsumed += chunk.length
    }
})
.on('end', _ => {
    console.log(`Read ${chunkConsumed / 1e9} GB of data...`)
})