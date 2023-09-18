// script bash para criar um arquivo de 100 linhas de texto
// for i in `seq 1 100`; do node -e "process.stdout.write('$i-ola-mundo\n')" >> text.txt; done

// Como o streams trabalha por debaixo dos panos (resumidamente)

import {
  readFile
} from 'fs/promises'

const data = (await readFile('./text.txt')).toString().split('\n')
const LINES_PER_ITERATION = 10
const iterations = data.length / LINES_PER_ITERATION
let page = 0

for (let index = 1; index < iterations; index++) {
  const chunk = data.slice(page, page += LINES_PER_ITERATION).join('\n')

  // imagine que aqui eu tenho o máximo de memória que o Node é capaz de processar por ciclo
  const buffer = Buffer.from(chunk)

  const amountOfBytes = buffer.byteOffset
  const bufferData = buffer.toString().split('\n')
  const amoutOfLines = bufferData.length

  // agra o bufferData seria dividido em pedaços ainda menores e processados individualmente, sob demanda
  console.log('processando', bufferData, `linhas: ${amoutOfLines}, bytes: ${amountOfBytes}`)
}