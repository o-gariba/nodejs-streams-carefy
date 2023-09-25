import { randomUUID } from "node:crypto";
import { Readable, Transform } from "node:stream";
import { createWriteStream } from "node:fs";

const readable = Readable(
  // new ... é opcional (será q sempre é opcional?)
  {
    read() {
      // 1.000.000
      for (let i = 0; i < 1e6; i++) {
        const person = {
          id: randomUUID(),
          name: `Pedro-${i}`,
        };
        const data = JSON.stringify(person);
        this.push(data);
      }
      // indica q não tem mais nada para ser consumido. É o fim
      this.push(null);
    },
  }
);
// .on('data', msg => {
//     // vai contar até 1.000.000, ou seja, consumiu tudo
//     console.count('data')
// })

// não vamos usar métodos que dependem de eventos, isso não é bom

// vamos pegar os dados e transformar em .csv
const mapFields = Transform({
  transform(chunk, encoding, callback) {
    const data = JSON.parse(chunk);
    const result = `${data.id},${data.name.toUpperCase()}\n`;
    // uma callback smp recebe primeiro a arrow function dpois o resultado (string após a função ser executada)
    callback(null, result);
  },
});
const mapHeaders = Transform({
  transform(chunk, enc, cb) {
    this.counter = this.counter ?? 0;
    if (this.counter) {
      return cb(null, chunk);
    }
    this.counter += 1;
    cb(null, "id,name\n".concat(chunk));
  },
});
const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
// .pipe(process.stdout);
  .pipe(createWriteStream('my.csv'))

pipeline.on('end', () => console.log('task finished...'))
