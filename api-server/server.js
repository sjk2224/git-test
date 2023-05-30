const config = require('./config')[process.env.NODE_ENV];
const express = require('express');
const http = require('http');

const app = express();
const port = config.PORT;
const cors = require('cors');
const path = require('path');
const fs = require('fs')

//cors
const corsOptions = {
	origin: 'http://localhost:8080', // 출처 허용 옵션
	credentials: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};
app.use(cors(corsOptions));

//body parser
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//autoRouter
const autoRoute = require('./autoRoute');
autoRoute('/api',app);

//server
const webServer = http.createServer(app);
webServer.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})

//global setting
global.UPLOAD_PATH = path.join("upload/");
global.MEMBER_PHOTO_PATH = path.join("upload/memberPhoto");
fs.mkdirSync(MEMBER_PHOTO_PATH,{recursive:true});

//image
app.use("/upload/memberPhoto",express.static("upload/memberPhoto"));
