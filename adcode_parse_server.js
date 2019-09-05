const express = require('express')
const axios = require('axios')
const app = express()

const host = 'http://area.c2lightlink.com'

app.get('/area/parse', (req, res) => {
  let areaCode = req.query.adCode || undefined
  if (areaCode == undefined) {
    res.json({
      success: false,
      message: '未检到正确的查询参数',
      data: null
    })
  }
  if (/^[0-9]{12}$/.test(areaCode)) {
    axios.all([searchProvinceName(), searchCityName(areaCode), searchCountyName(areaCode), searchTownName(areaCode), searchvillageName(areaCode)])
    .then(axios.spread(function (province, city, county, town, village) {
      let areaObj = {}
      // 省
      try {
        let provinceData = province.data.filter(item => {
          return item.area_code.substring(0, 2) == areaCode.substring(0, 2)
        })
        areaObj.province = {
          name: provinceData[0]['area_name'],
          code: provinceData[0]['area_code']
        }
      } catch (e) {
        areaObj.province = undefined
      }
      // 市
      try {
        let cityData = city.data.filter(item => {
          return item.area_code.substring(0, 4) == areaCode.substring(0, 4)
        })
        areaObj.city = {
          name: cityData[0]['area_name'],
          code: cityData[0]['area_code']
        }
      } catch (e) {
        areaObj.city = undefined
      }
      // 县
      try {
        let countyData = county.data.filter(item => {
          return item.area_code.substring(0, 6) == areaCode.substring(0, 6)
        })
        areaObj.county = {
          name: countyData[0]['area_name'],
          code: countyData[0]['area_code']
        }
      } catch (e) {
        areaObj.county = undefined
      }
      // 镇
      try {
        let townData = town.data.filter(item => {
          return item.area_code.substring(0, 9) == areaCode.substring(0, 9)
        })
        areaObj.town = {
          name: townData[0]['area_name'],
          code: townData[0]['area_code']
        }
      } catch (e) {
        areaObj.town = undefined
      }
      // 村
      try {
        let villageData = village.data.filter(item => {
          return item.area_code.substring(0, 12) == areaCode.substring(0, 12)
        })
        areaObj.village = {
          name: villageData[0]['area_name'],
          code: villageData[0]['area_code']
        }
      } catch (e) {
        areaObj.village = undefined
      }
      // 输出
      res.json({
        success: true,
        data: areaObj
      })
    }))
  } else {
    res.json({
      success: false,
      message: 'adcode为12位纯数字',
      data: null
    })
  }
})

app.listen(3000)
// 查找省名称
function searchProvinceName() {
  return axios.get(`${host}/area/province.json`)
}
// 查找市名称
function searchCityName(area_code) {
  return axios.get(`${host}/area/${String(area_code).substring(0, 2)}/city.json`)
  .catch(err => {
  })
}
// 查找县名称
function searchCountyName(area_code) {
  return axios.get(`${host}/area/${String(area_code).substring(0, 2)}/${String(area_code).substring(2, 4)}/county.json`)
  .catch(err => {
  })
}
// 查找镇名称
function searchTownName(area_code) {
  return axios.get(`${host}/area/${String(area_code).substring(0, 2)}/${String(area_code).substring(2, 4)}/${String(area_code).substring(4, 6)}/town.json`)
  .catch(err => {
  })
}
// 查找村名称
function searchvillageName(area_code) {
  return axios.get(`${host}/area/${String(area_code).substring(0, 2)}/${String(area_code).substring(2, 4)}/${String(area_code).substring(4, 6)}/${String(area_code).substring(6, 9)}/village.json`)
  .catch(err => {
  })
}
 