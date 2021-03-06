const fs = require('fs')

let db = []
class Contenedor{
    constructor(archivo){
        this.archivo = archivo
    }

    save(o){        
        
        const escribirProductos = async () => {
            try{
                const res = await fs.promises.readFile(this.archivo, 'UTF-8')
                if(res.length == 0){
                    o.id = 1
                    db.push(o)
                }else {
                    db = JSON.parse(res)
                    o.id = db[db.length - 1].id + 1
                    db.push(o)
                }
                await fs.promises.writeFile(this.archivo, JSON.stringify(db))
            }
            catch (err) {
                console.log(`${err} No se encuentra el archivo ${this.archivo}, se procede a crearlo`)
                await fs.promises.writeFile(this.archivo, '')
            }
        }
        escribirProductos().then(res => res)
        
    }

    getById(n){

        const buscarIdObjetos = async () => {
            try {
                const res = await fs.promises.readFile(this.archivo, 'UTF-8')
            
                if (res.length == 0) {
                    return console.log('El contenedor esta vacio')
                } else {
                    const objetos = JSON.parse(res)
                    let filtroId = objetos.filter(el => el.id == n)
                    if (!filtroId.length) {
                        console.log(`No se encontraron objetos con id ${n}`)
                        return null
                    } else {
                        console.log(`Resultado de la busqueda> ${JSON.stringify(filtroId)}`)
                        return filtroId
                    }
                }
            }
            catch (err){
                console.log(err)
            }
        }
        buscarIdObjetos().then(res => res)

    }

    getAll(){

        const recuperarObjetos = async () => {
            try {
                const res = await fs.promises.readFile(this.archivo, 'UTF-8')
                if (res.length == 0) {
                    return console.log('El contenedor esta vacio')
                } else {
                    const db = JSON.parse(res)
                    console.log(db);
                    return db
                }
            }
            catch (err){
                console.log(err);
            }
        }
        recuperarObjetos().then(res => res)

    }

    deleteById(n){

        const eliminarIdObjetos = async () => {
            try {
                const res = await fs.promises.readFile(this.archivo, 'UTF-8')
                const objetos = JSON.parse(res);
                let filtroId = objetos.filter(el => el.id == n)
                if (filtroId.length) {
                    let objetosRestantes = objetos.filter(el => el.id !== n)
                    await fs.promises.writeFile(this.archivo, JSON.stringify(objetosRestantes))
                    return console.log(`Se ha borrado el objeto ${n}`)
                } else  {
                    return console.log(`No se encontraron objetos con id ${n}`)
                }
            }
            catch (err){
                console.log(err)
            }
        }
        eliminarIdObjetos().then(res => res)
    }

    deleteAll(){
        const eliminarObjetos = async () => {
            try {
                await fs.promises.writeFile(this.archivo, '');
                console.log('Se han eliminado todos los objetos')
            }
            catch (err) {
                console.log(err);
            } 
        }
        eliminarObjetos().then(res => res)
    }
}
module.exports = Contenedor

