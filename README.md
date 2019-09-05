#### 中国区域选择器数据使用

1. 将dis目录及index.html部署到nginx服务器的静态目录
2. 将adcode_parse_server.js部署至服务器，并通过nginx反向代理

*说明
app.js这个文件是将area_data的数据转为dist的数据，可根据业务需要改动数据

```
# nginx添加以下配置，方便前端调用 
try_files $uri $uri/ /404.json
```