const { runFactory } = require('../runFactory')
const storeMock = require("./__mocks__/storeMock");
const fs = require('fs')
const path = require('path')

test('User Factory', async () => {
    await runFactory().then((fact) => {
        const pathName = path.resolve('test', 'result', 'generatedData.json')
        return new Promise((resolve, reject) => {
            fs.writeFile(pathName, JSON.stringify(storeMock.state, null, 2), (err) => {
                if(err){
                    reject(err)
                }else{
                    resolve(fact)
                }
            })
        })
    })
}, 2 * 60 * 1000)