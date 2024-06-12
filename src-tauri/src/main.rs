// // Prevents additional console window on Windows in release, DO NOT REMOVE!!
// #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// use dotenv::dotenv;
// use reqwest::Client;
// use serde::{Deserialize, Serialize};
// use std::env;
// use tauri::{command, State};
// use log::error;
// use tauri::{SystemTray, SystemTrayMenu, SystemTrayMenuItem, SystemTrayEvent};

// // Struct to hold OpenAI API key
// struct OpenAIConfig {
//     api_key: String,
// }

// #[derive(Serialize, Deserialize, Debug)]
// struct OpenAIResponse {
//     choices: Vec<Choice>,
// }

// #[derive(Serialize, Deserialize, Debug)]
// struct Choice {
//     message: Message,
// }

// #[derive(Serialize, Deserialize, Debug)]
// struct Message {
//     content: String,
// }

// #[command]
// async fn write_text_and_get_response(text: String, openai_config: State<'_, OpenAIConfig>) -> Result<String, String> {
//     let client = Client::new();
//     let response = client.post("https://api.openai.com/v1/chat/completions")
//         .header("Authorization", format!("Bearer {}", openai_config.api_key))
//         .json(&serde_json::json!({
//             "model": "gpt-4o",
//             "max_tokens": 50,
//             "messages": [{"role": "user", "content": text}]
//         }))
//         .send()
//         .await;

//     match response {
//         Ok(resp) => {
//             let status = resp.status();
//             let response_body = resp.text().await.unwrap_or_else(|_| "Failed to get response text".to_string());
//             if status.is_success() {
//                 match serde_json::from_str::<OpenAIResponse>(&response_body) {
//                     Ok(parsed) => {
//                         let response_text = parsed.choices.get(0).map_or_else(|| "No response".to_string(), |choice| choice.message.content.clone());
//                         Ok(format!("OpenAI: {}", response_text))
//                     },
//                     Err(err) => {
//                         error!("Failed to parse response from OpenAI: {err}");
//                         Err(format!("Failed to parse response from OpenAI: {}", err))
//                     }
//                 }
//             } else {
//                 error!("OpenAI API request failed with status {}: {}", status, response_body);
//                 Err(format!("OpenAI API request failed with status {}: {}", status, response_body))
//             }
//         },
//         Err(err) => {
//             error!("Failed to send request to OpenAI: {err}");
//             Err(format!("Failed to send request to OpenAI: {}", err))
//         }
//     }
// }

// #[tokio::main]
// async fn main() {
//     dotenv().ok(); // Load environment variables from .env file
//     env_logger::init(); // Initialize the logger
//     let openai_api_key = env::var("OPENAI_API_KEY").expect("OPENAI_API_KEY must be set");

//     tauri::Builder::default()
//         .manage(OpenAIConfig { api_key: openai_api_key })
//         .invoke_handler(tauri::generate_handler![write_text_and_get_response])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }




// Working
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dotenv::dotenv;
use enigo::*;
use log::error;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::env;
use tauri::{command, CustomMenuItem, State, SystemTray, SystemTrayEvent, SystemTrayMenu, Manager}; // Added Manager here

// Struct to hold OpenAI API key
struct OpenAIConfig {
    api_key: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct OpenAIResponse {
    choices: Vec<Choice>,
}

#[derive(Serialize, Deserialize, Debug)]
struct Choice {
    message: Message,
}

#[derive(Serialize, Deserialize, Debug)]
struct Message {
    content: String,
}

#[command]
async fn write_text_and_get_response(text: String, openai_config: State<'_, OpenAIConfig>) -> Result<String, String> {
    let client = Client::new();
    let response = client.post("https://api.openai.com/v1/chat/completions")
        .header("Authorization", format!("Bearer {}", openai_config.api_key))
        .json(&serde_json::json!({
            "model": "gpt-4",
            "max_tokens": 50,
            "messages": [{"role": "user", "content": text}]
        }))
        .send()
        .await;

    match response {
        Ok(resp) => {
            let status = resp.status();
            let response_body = resp.text().await.unwrap_or_else(|_| "Failed to get response text".to_string());
            if status.is_success() {
                match serde_json::from_str::<OpenAIResponse>(&response_body) {
                    Ok(parsed) => {
                        let response_text = parsed.choices.get(0).map_or_else(|| "No response".to_string(), |choice| choice.message.content.clone());
                        Ok(format!("OpenAI: {}", response_text))
                    },
                    Err(err) => {
                        error!("Failed to parse response from OpenAI: {err}");
                        Err(format!("Failed to parse response from OpenAI: {}", err))
                    }
                }
            } else {
                error!("OpenAI API request failed with status {}: {}", status, response_body);
                Err(format!("OpenAI API request failed with status {}: {}", status, response_body))
            }
        },
        Err(err) => {
            error!("Failed to send request to OpenAI: {err}");
            Err(format!("Failed to send request to OpenAI: {}", err))
        }
    }
}

#[tokio::main]
async fn main() {
    dotenv().ok(); // Load environment variables from .env file
    env_logger::init(); // Initialize the logger
    // let openai_api_key = env::var("NEXT_PUBLIC_OPENAI_API_KEY").expect("OPENAI_API_KEY must be set");
    let openai_api_key = "NEXT_PUBLIC_OPENAI_API_KEY";
    let show_item = CustomMenuItem::new("show".to_string(), "Show");
    let hide_item = CustomMenuItem::new("hide".to_string(), "Hide");
    let quit_item = CustomMenuItem::new("quit".to_string(), "Quit");
    let tray_menu = SystemTrayMenu::new()
        .add_item(show_item)
        .add_item(hide_item)
        .add_item(quit_item);
    let system_tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
        .manage(OpenAIConfig { api_key: openai_api_key.to_string() })
        .invoke_handler(tauri::generate_handler![write_text_and_get_response])
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => {
                let window = app.get_window("main").unwrap();
                match id.as_str() {
                    "show" => window.show().unwrap(),
                    "hide" => window.hide().unwrap(),
                    "quit" => std::process::exit(0),
                    _ => {}
                }
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}