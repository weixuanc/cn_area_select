/**
 * 创建时间: 2019-08-30
 * 功能：对统计局的数据按省市县镇村进行分类
 * 作者： 陈维烜 
 * 脚本运行环境： node v10.1.0
*/
const fs = require('fs')
console.log('任务开始执行，请等待执行结果...')
try {
    fs.accessSync(`./dist`, fs.constants.R_OK)
} catch(err) {
    fs.mkdirSync(`./dist`)
}

let srcDir = fs.readdirSync('./area_data')
srcDir.forEach(item => {
    fs.readFile(`./area_data/${item}`, 'utf8', (err, data) => {
        if (err) console.log('err')
        // 将文本转化为json数组处理
        let strArray = data.replace(/超时异常/g, "").replace(/[ | ]*\n/g,'\n').replace(/\n[\s| | ]*\r/g,'\n').replace(/ /ig,'').replace(/^[\s　]+|[\s　]+$/g, "").replace(/[\r\n]/g, "").replace(/,"'/g, ',"{\'').replace(/"/g, "").replace(/'/g, '"').replace(/::/g, ':').split('')
        strArray.unshift('[')
        strArray.push(']')
        let result = strArray.join('').replace(/\["/g, '[{"').replace(/\}\{/g, '},{')
        JSON.parse(result).forEach(item => {
            try {
                fs.accessSync(`./dist/${item.area_code.substring(0, 2)}`, fs.constants.R_OK)
            } catch(err) {
                // 新建省级文件夹
                fs.mkdirSync(`./dist/${item.area_code.substring(0, 2)}`)
            }
            try {
                fs.accessSync(`./dist/${item.area_code.substring(0, 2)}/${item.area_code.substring(2, 4)}`, fs.constants.R_OK)
            } catch(err) {
                // 不存在则新建市级文件夹
                fs.mkdirSync(`./dist/${item.area_code.substring(0, 2)}/${item.area_code.substring(2, 4)}`)
            }
            try {
                fs.accessSync(`./dist/${item.area_code.substring(0, 2)}/${item.area_code.substring(2, 4)}/${item.area_code.substring(4, 6)}`, fs.constants.R_OK)
            } catch(err) {
                // 不存在则新建县级文件夹
                fs.mkdirSync(`./dist/${item.area_code.substring(0, 2)}/${item.area_code.substring(2, 4)}/${item.area_code.substring(4, 6)}`)
            }
            try {
                fs.accessSync(`./dist/${item.area_code.substring(0, 2)}/${item.area_code.substring(2, 4)}/${item.area_code.substring(4, 6)}/${item.area_code.substring(6, 9)}`, fs.constants.R_OK)
            } catch(err) {
                // 不存在则新建镇级文件夹
                fs.mkdirSync(`./dist/${item.area_code.substring(0, 2)}/${item.area_code.substring(2, 4)}/${item.area_code.substring(4, 6)}/${item.area_code.substring(6, 9)}`)
            }
            if (item.area_code.endsWith('00000000')) {
                // console.log(item)
                // 市级数据
                try {
                    fs.accessSync(`./dist/${item.area_code.substring(0, 2)}/city.json`, fs.constants.R_OK);
                } catch (err) {
                    fs.writeFileSync(`./dist/${item.area_code.substring(0, 2)}/city.json`, '[]')
                }
                let data = fs.readFileSync(`./dist/${item.area_code.substring(0, 2)}/city.json`, 'utf8')
                let dataArray = JSON.parse(data)
                dataArray.push(item)
                fs.writeFileSync(`./dist/${item.area_code.substring(0, 2)}/city.json`, JSON.stringify(dataArray))
            } else if (item.area_code.endsWith('000000')) {
                // 县级数据
                try {
                    fs.accessSync(`./dist/${item.area_code.substring(0, 2)}/${item.area_code.substring(2, 4)}/county.json`, fs.constants.R_OK);
                } catch (err) {
                    fs.writeFileSync(`./dist/${item.area_code.substring(0, 2)}/${item.area_code.substring(2, 4)}/county.json`, '[]')
                }
                let data = fs.readFileSync(`./dist/${item.area_code.substring(0, 2)}/${item.area_code.substring(2, 4)}/county.json`, 'utf8')
                let dataArray = JSON.parse(data)
                dataArray.push(item)
                fs.writeFileSync(`./dist/${item.area_code.substring(0, 2)}/${item.area_code.substring(2, 4)}/county.json`, JSON.stringify(dataArray))
            } else if (item.area_code.endsWith('000')) {
                // 镇级数据
                try {
                    fs.accessSync(`./dist/${item.area_code.substring(0, 2)}/${item.area_code.substring(2, 4)}/${item.area_code.substring(4, 6)}/town.json`, fs.constants.R_OK);
                } catch (err) {
                    fs.writeFileSync(`./dist/${item.area_code.substring(0, 2)}/${item.area_code.substring(2, 4)}/${item.area_code.substring(4, 6)}/town.json`, '[]')
                }
                let data = fs.readFileSync(`./dist/${item.area_code.substring(0, 2)}/${item.area_code.substring(2, 4)}/${item.area_code.substring(4, 6)}/town.json`, 'utf8')
                let dataArray = JSON.parse(data)
                dataArray.push(item)
                fs.writeFileSync(`./dist/${item.area_code.substring(0, 2)}/${item.area_code.substring(2, 4)}/${item.area_code.substring(4, 6)}/town.json`, JSON.stringify(dataArray))
            } else {
                // 村级数据
                try {
                    fs.accessSync(`./dist/${item.area_code.substring(0, 2)}/${item.area_code.substring(2, 4)}/${item.area_code.substring(4, 6)}/${item.area_code.substring(6, 9)}/village.json`, fs.constants.R_OK);
                } catch (err) {
                    fs.writeFileSync(`./dist/${item.area_code.substring(0, 2)}/${item.area_code.substring(2, 4)}/${item.area_code.substring(4, 6)}/${item.area_code.substring(6, 9)}/village.json`, '[]')
                }
                let data = fs.readFileSync(`./dist/${item.area_code.substring(0, 2)}/${item.area_code.substring(2, 4)}/${item.area_code.substring(4, 6)}/${item.area_code.substring(6, 9)}/village.json`, 'utf8')
                let dataArray = JSON.parse(data)
                dataArray.push(item)
                fs.writeFileSync(`./dist/${item.area_code.substring(0, 2)}/${item.area_code.substring(2, 4)}/${item.area_code.substring(4, 6)}/${item.area_code.substring(6, 9)}/village.json`, JSON.stringify(dataArray))
            }
        })
    })
})