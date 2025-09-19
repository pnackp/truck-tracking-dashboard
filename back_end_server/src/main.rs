use axum::{ // for Call get , post
    http::{header,Method}, routing::{get, post}, Router,Json
};
use serde::{Serialize,Deserialize}; // Convert struct , json
use tower_http::cors::{CorsLayer, Any}; // Middleware

use jsonwebtoken::{encode, EncodingKey, Header}; // JWT for encypt to 16b
use chrono::{Utc, Duration}; // Timer

#[derive(Deserialize)]
struct Up{
    username: String,
    password: String,
}
#[derive(Serialize,Deserialize)]
struct Back{
    token: Option<String>,
}

#[derive(Serialize)]
struct Enc {
    us: String,
    dr: usize, // หรือ DateTime<Utc>
}

async fn login(payload : Json<Up>)-> Json<Back>{
    if payload.username == "Admin" && payload.password == "Admin" {
        let expiration = (Utc::now() + Duration::minutes(60)).timestamp() as usize;

        let claims = Enc {
            us: payload.username.clone(),
            dr: expiration, 
        };

        let secret = "testest_Mqtt";

        let tokenkey = encode(
            &Header::default(),
            &claims,
            &EncodingKey::from_secret(secret.as_bytes())
        ).expect("Token generation failed");

        Json(Back {token : Some(tokenkey)})
    } else {
        // ถ้า login ผิด
        Json(Back {token:None})
    }
}

#[tokio::main]
async fn main(){
    let app = Router::new().route("/Login" , post(login)).route("/api_test", get(|| async {"Hello"}));
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods([Method::GET, Method::POST])
        .allow_headers([header::CONTENT_TYPE]);
    let app = app.layer(cors);
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000").await.unwrap();
    axum::serve(listener,app).await.unwrap();
}
