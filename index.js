let Client_ID = '1654645518';
let Client_secret = '654de9204e47f9442567599eaf721ff0';
let code = 'f9k6JelavI5C6zXA4h38';
let redirect_uri = 'https%3A%2F%2Ffatmab2809.github.io%2FDemo1%2F';
let grant_type = 'authorization_code';
let id_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FjY2Vzcy5saW5lLm1lIiwic3ViIjoiVTFjNTcwMGUxOGE2YzkzM2FjY2E3ZGFmYjE5NDJhNDRjIiwiYXVkIjoiMTY1NDY0NTUxOCIsImV4cCI6MTU5Nzc0Mjg1NCwiaWF0IjoxNTk3NzM5MjU0LCJhbXIiOlsibGluZXNzbyJdLCJuYW1lIjoiRmF0bWEiLCJlbWFpbCI6ImZhdG1hYjI4MDlAZ21haWwuY29tIn0.fiYWorr6472yxsVpRYjW_-1dhDt6WReAb05wEvYnSgs';

var request = require('request');
// document.getElementById('generate').addEventListener('click',generate)
// function generate()
// {
    function callMeAPI(access_token, done){
request.get({url:"https://api.line.me/v2/profile",headers:{"Authorization": "Bearer "+access_token}}, function(err,res,responseBody){
    if (err) {
        console.log(err);
        done(err,null); 
    }
    else {
        done(null,JSON.parse(responseBody)); 
    }
});
}

function callEmailAPI(idToken, done){
    request.post({url:"https://api.line.me/oauth2/v2.1/verify",form:{
            id_token:idToken,
            client_id:'1654645518',
            scope:'openid',
    }}, function(err,res,responseBody){
    if (err) {
        console.log(err);
        done(err,null); 
        }
    else {
        console.log(responseBody);
        done(null,JSON.parse(responseBody)); 
        }
    });
}
main(function(a){});
function main(done){
    getAccessToken(function(err,res){
        if (err) {done(err)}
        else
        {
        var access_token = res.access_token;
        var id_token = res.id_token;
        callMeAPI(access_token,function(err, res){
            if (err) {done(err)}
            else{
                var name = res.displayName;
                console.log("Name: "+name);
                if(res.statusMessage){
                            // output +=`<p>Status Message- ${res.statusMessage}</p>`
                        console.log("Status Message: "+res.statusMessage);
                        document.getElementById('output').innerHTML += 'Status Message: '` ${res.statusMessage}`;
                    }
                // callEmailAPI(id_token,function(err, res){
                //     if (err) {done(err)}
                //     else{
                //         var email = res.email;
                //         done(null,"success");
                //         console.log("Email Address: "+email);
                //         // document.getElementById('output').innerHTML += 'Email Address: '` ${res.email}`;
                //     }
                // });
            }
        });}
    });

function getAccessToken(done){
    request.post({url:'https://api.line.me/oauth2/v2.1/token', 
    headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    form:{
        grant_type:'refresh_token',
        refresh_token:'nhb6UdxjppqXXoCCWyC0',
       client_id:Client_ID,
        client_secret:Client_secret,
        
        // grant_type:'authorization_code',
        // code:'f9k6JelavI5C6zXA4h38', 
        // redirect_uri:redirect_uri,
        // client_id:Client_ID,
        // client_secret:Client_secret,
    }}, function(err,res, responseBody){
        if (err) {
            console.log(err);
			done(err,null); 
		}
		else {
			console.log(responseBody);
			done(null,JSON.parse(responseBody)); 
		}
    });
}

const line = require('@line/bot-sdk');
const client = new line.client({
    accesstoken: access_token
});
const message = {
    type:'text',
    text:'Hello world'
};
client.replyMessage('',message)
.then(() =>{

})
.catch(err => console.log(err));
}