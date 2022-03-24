const {google} = require("googleapis");
const ouath2Client=new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
)
 
ouath2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN})
const drive=google.drive({
    version:'v3',
    auth:ouath2Client
})
// const filePath=path.join(__dirname,"1.png");
module.exports={
    drive
}