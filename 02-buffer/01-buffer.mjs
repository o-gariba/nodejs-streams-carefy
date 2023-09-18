const buffer = Buffer.alloc(5) // tenho 5 indices (bytes) de memoria dedicada a esse buffer

buffer.fill('hi', 0, 2) // vou ocupar do indice 0 ao 2 (2 bytes)
buffer.fill(0x3a, 2, 3) // hexadecimal char code for :

// console.log({ buffer }) // { buffer: <Buffer 68 69 3a 00 00> }

// console.log(buffer.toString()) // hi:

// buffer.fill('h', 5, 6) // RangeError

const buffer2 = Buffer.alloc(6)
buffer2.set(buffer, buffer.byteOffset) // Passo todas as infos do primeiro buffer para o 2o
// console.log(buffer2.toString())

// preenchendo um buffer com um dado completo

const msg = 'ola, tudo bem?'
// const bufferPreAlocado = Buffer.alloc(msg.length, msg)
// é o mesmo que
const bufferPreAlocado = Buffer.from(msg) // isso é inclusive mais usado em produção

// console.log(bufferPreAlocado.toString(), bufferPreAlocado, bufferPreAlocado.byteLength) // ola, tudo bem? <Buffer 6f 6c 61 2c 20 74 75 64 6f 20 62 65 6d 3f> 14

// --------

const str = 'ola mundo!'
const charCodes = []
const byteCodes = []

for (const index in str) {
  const charCode = str.charCodeAt(index)
  const byteCode = '0x' + Math.abs(charCode).toString(16)
  charCodes.push(charCode)
  byteCodes.push(byteCode)
}

console.log({
  charCodes,
  byteCodes,
  contentFromCharCodes: Buffer.from(charCodes).toString(),
  contentFromByteCodes: Buffer.from(byteCodes).toString()
})

// podemos usar decimais ou hexadecimais para criar um buffer