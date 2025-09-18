
use axum::{
    http::{header,Method}, routing::{get, post}, Router,Json
};
use serde::{Serialize,Deserialize};
use tower_http::cors::{CorsLayer, Any};

use jsonwebtoken::{encode, EncodingKey, Header};
use chrono::{Utc, Duration};

#[derive(Deserialize)]
struct Up{
    username : String,
    password : String,
}

#[derive(Serialize)]
struct Loginresult{
    status : bool,
    token: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    un: String,  // subject (username)
    exp: usize,   // expire time
}


async fn checkup(payload:Json<Up>)-> Json<Loginresult>{
   if payload.username == "Admin" && payload.password == "Admin" {
    let expiration = Utc::now()  
            .checked_add_signed(Duration::minutes(60))
            .unwrap()
            .timestamp() as usize;
    let claims = Claims {
            un: payload.username.clone(),
            exp: expiration,
        };
        let secret = "mysecret"; 
        let token = encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_bytes())).unwrap();

        Json(Loginresult {
            status: true,
            token: Some(token),
        })
    }
    else {
        Json(Loginresult {
            status: false,
            token: None,
        })
    }
}

async fn test()-> &'static str{
    "true"
}

#[tokio::main]
async fn main() {
    // build our application with a single route
    let cors_layer = CorsLayer::new().allow_origin(Any).allow_methods([Method::GET , Method::POST])
        .allow_headers([header::CONTENT_TYPE, header::AUTHORIZATION]);
    let app = Router::new().route("/login",post(checkup))
        .route("/", get(test))
        .layer(cors_layer);
        

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
