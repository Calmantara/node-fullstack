// console.log("hello world")

// Assessment
// satu function 
// yang akan menerima
// dua input a dan b
// dan menghasilkan 
// output a pangkat b

// package
// module
// built in function

// export / memanggil module yang kita perlukan
// const {add, add3} = require("./calculation/add") 
const http = require("http")
const event = require("events")
const fileSystem = require("fs")
const config = require("./config.json")


// moment => untuk mendapatkan waktu dan bisa kita format
// const moment = require("moment")
// console.log(moment())
// console.log(add(1,2), add3(1,2,3))

// apa itu server? 
// apa itu http server?

const myEvent = new event()
myEvent.on("called_by_client", () => {
    console.log("hey, you triggered the event")
})

function callMessage(){
    console.log("calling message")
}

// Assessment
// membuat http server
// yang akan menampilkan
// Hello, <<Nama>>
// Jam sekarang
// myEvent.

// const myBuff = Buffer.allocUnsafe(100)
// myBuff.
// console.log(myBuff.byteOffset, myBuff.buffer)

const server = http.createServer((req, res)=>{
    const buf = fileSystem.readFileSync("log.txt", 'utf8')
    const data = buf.split("\n")

    // get last data
    let dataRes = "timestamp 1"
    if (data.length > 1){
      dataRes = data[data.length-1]
    }

    // write data
    const datFile = dataRes.split(" ")
    
    if (data.length > 0 && data[0] !== ""){
        fileSystem.appendFileSync("./log.txt", `\ntimestamp ${Number(datFile[1])+1}`)
    }else{
        fileSystem.writeFileSync("./log.txt", dataRes)
    }

    res.writeHead(200, {"Content-Type":"text/html"})
    res.end(dataRes)
})

process.on("SIGTERM", graceful(server))
process.on("SIGINT", graceful(server))

// mengikuti config.json
server.listen(config.server.port)

function graceful(server){
    return () => {
        server.close()
        fileSystem.closeSync()
        console.log("shutting down the server")
    }
}

// ASSESSMENT
// buat sebuah http server
// yang akan mati secara graceful
// request akan dihitung dan dimasukkan
// ke dalam txt file
// sehingga waktu dan jumlah request
// akan tercatat di log file
// response dari request adalah
// last requst sebelum req tsb dijalankan