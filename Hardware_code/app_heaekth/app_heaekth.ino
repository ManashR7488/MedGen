#include <WiFi.h>
#include <HTTPClient.h>
#include <ESPAsyncWebServer.h>
#include <Preferences.h>
#include <DHT.h>
#include <PulseSensorPlayground.h>

#define USE_ARDUINO_INTERRUPTS true

// —— CONFIG ——
static const char* SERVER_URL      = "http://192.168.239.7:5000/api/moniter/storedata";
static const int   PULSE_PIN       = 32;
static const int   DHT_PIN         = 33;
static const int   DHT_TYPE        = DHT11;
static const int   SEND_INTERVAL   = 800;    // ms between sends

// —— GLOBALS ——
DHT dht(DHT_PIN, DHT_TYPE);
PulseSensorPlayground pulseSensor;
Preferences prefs;
AsyncWebServer server(80);

unsigned long lastSendMs = 0;

void setup() {
  Serial.begin(115200);
  dht.begin();

  // Pulse sensor setup
  pulseSensor.analogInput(PULSE_PIN);
  pulseSensor.setThreshold(550);
  if (!pulseSensor.begin()) {
    Serial.println("PulseSensor init failed!");
  }

  // Load Wi‑Fi creds
  prefs.begin("wifi", false);
  String ssid = prefs.getString("ssid", "iQOO MR2");
  String pass = prefs.getString("pass", "ManashR7488");
  if (ssid.length() && pass.length()) {
    WiFi.begin(ssid.c_str(), pass.c_str());
  } else {
    startConfigMode();
  }

  // Config AP & web server
  server.on("/", HTTP_GET, [](AsyncWebServerRequest* req){
    req->send(200, "text/html", R"rawliteral(
      <form action="/save" method="post">
        SSID: <input name="ssid"><br>
        PASS: <input name="pass"><br>
        <button>Save</button>
      </form>
    )rawliteral");
  });
  server.on("/save", HTTP_POST, [](AsyncWebServerRequest* req){
    if (req->hasParam("ssid", true) && req->hasParam("pass", true)) {
      prefs.putString("ssid", req->getParam("ssid", true)->value());
      prefs.putString("pass", req->getParam("pass", true)->value());
      req->send(200, "text/html", "<h1>Saved! Restarting...</h1>");
      delay(1000);
      ESP.restart();
    } else {
      req->send(400, "text/html", "<h1>Missing fields</h1>");
    }
  });
  server.begin();
}

void loop() {
  unsigned long now = millis();

  // Read raw BPM
  int rawBPM = pulseSensor.getBeatsPerMinute();

  // Send each raw reading at interval
  if (now - lastSendMs >= SEND_INTERVAL) {
    lastSendMs = now;
    sendData(rawBPM);
  }

  // Reconnect Wi‑Fi if needed (non‑blocking)
  if (WiFi.status() != WL_CONNECTED && now % 5000 < 50) {
    reconnectWiFi();
  }
}

// Send raw BPM + DHT data
void sendData(int bpm) {
  if (WiFi.status() != WL_CONNECTED) return;

  float temp = dht.readTemperature();
  float hum  = dht.readHumidity();

  String json = "{";
  json += "\"sensorId\":\"ESP32-Pulse\",";
  json += "\"type\":\"pulse\",";
  json += "\"value\":" + String(bpm) + ",";
  json += "\"temp\":" + String(temp,1) + ",";
  json += "\"humd\":" + String(hum,1) + ",";
  json += "\"unit\":\"bpm\"}";

  HTTPClient http;
  http.begin(SERVER_URL);
  http.addHeader("Content-Type", "application/json");
  int code = http.POST(json);
  if (code <= 0) {
    Serial.println("HTTP error: " + String(code));
  }
  http.end();
}

void reconnectWiFi() {
  String ssid = prefs.getString("ssid", "");
  String pass = prefs.getString("pass", "");
  if (ssid.length() && pass.length()) {
    WiFi.begin(ssid.c_str(), pass.c_str());
    Serial.println("Reconnecting to Wi-Fi...");
  } else {
    startConfigMode();
  }
}

void startConfigMode() {
  WiFi.softAP("ESP32_Config", "12345678");
  Serial.println("AP mode IP: " + WiFi.softAPIP().toString());
}
