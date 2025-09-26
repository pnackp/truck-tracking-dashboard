use axum::{ // for Call get , post
    http::{header,Method}, routing::post, Router,Json
}; // http is protocal to save {head is type of body you want to tell ex body is json and header
// need to tell server my body is json} Method is Type or what do you want ex POST get ,
// routing::post is function you want to call from method
use serde::{Serialize,Deserialize}; // Convert struct , json
use tower_http::cors::{CorsLayer, Any}; // Middleware //CorsLayer is set layer before go in server 

use jsonwebtoken::{encode, EncodingKey, Header}; // JWT for encypt to 16b 
use chrono::{Utc, Duration}; // Timer

use jsonwebtoken::{decode, DecodingKey, Validation, Algorithm};

#[derive(Deserialize)]
struct Up{
    username: String,
    password: String,
}
#[derive(Serialize,Deserialize,Debug)]
struct Back{
    token: Option<String>,
}


#[derive(Serialize,Deserialize)]
struct Enc {
    us: String,
    exp: usize, 
}
#[derive(Serialize)]
struct Sta{
    status  : bool,
}

async fn login(payload : Json<Up>)-> Json<Back>{
    if payload.username == "Admin" && payload.password == "Admin" {
        let expiration = (Utc::now() + Duration::minutes(60)).timestamp() as usize;

        let claims = Enc {
            us: payload.username.clone(),
            exp: expiration, 
        };

        let secret = "testest_Mqtt";

        let tokenkey = encode(
            &Header::default(),
            &claims,
            &EncodingKey::from_secret(secret.as_bytes())
        ).expect("Token generation failed");

        Json(Back {token : Some(tokenkey)})
    } else {
        
        Json(Back {token:None})
    }
}

async fn checklogin(payload: Json<Back>) -> Json<Sta> {
    println!("payload: {:?}", payload);
    if let Some(token_str) = &payload.token {
        let mut validation = Validation::new(Algorithm::HS256);
        validation.validate_exp = false; // ถ้าแค่ test ไม่อยาก validate exp
        
        let token_message = decode::<Enc>(
            token_str,
            &DecodingKey::from_secret("testest_Mqtt".as_ref()),
            &validation
        );

        match token_message {
            Ok(_data) => Json(Sta { status: true }),  // decode สำเร็จ
            Err(err) => {
                println!("decode error: {:?}", err); // แสดง error จริง
                Json(Sta { status: false })
            }
        }
    } else {
        Json(Sta { status: false })
    }
}

#[tokio::main] // tokio is libary to used async tokio:main would tell complier this function == fn
// main 
async fn main(){
    let app = Router::new().route("/Login" , post(login)).route("/CheckLogin", post(checklogin)); 
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods([Method::POST])
        .allow_headers([header::CONTENT_TYPE]);
    let app = app.layer(cors);
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000").await.unwrap();
    axum::serve(listener,app).await.unwrap();
}
