/*
 *  Node controle tempurateur 
 *
 */
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ArduinoJson.h>

const String CONFIG       = "[C] ";
const String SUCCESS      = "[S] ";
const String FAILED       = "[F] ";
const String WAITING      = "[W] ";
const String DATA_INPUT   = "[I] ";
const String DATA_OUTPUT  = "[O] ";


ESP8266WiFiMulti WiFiMulti;
WiFiClient client;

typedef struct Configuration {
  const String serialNumber   = "THG01";
  const String type           = "thg";
  const String wifiAP         = "idoomAdsl";
  const String wifiPassword   = "FlexyDz2016"; 
  const String hostName       = "192.168.1.2";
  const uint16_t port         = 5000;
  const int timer             = 5000; // 5000 ms
} Configuration;

typedef struct Data {
  float temperature = 0;
  float humidity    = 0;
  float gaz         = 0;
  float light       = 0;
} Data;

Configuration configuration;
Data data;

void setup() {
  Serial.begin(115200);
  delay(100);

  Serial.println(CONFIG + "Wifi AP       : " + configuration.wifiAP);
  Serial.println(CONFIG + "Wifi Password : " + configuration.wifiPassword);
  Serial.println(CONFIG + "HostName      : " + configuration.hostName);
  Serial.println(CONFIG + "Port          : " + String(configuration.port));
  Serial.println(CONFIG + "Timer         : " + String(configuration.timer));
 
  
  // We start by connecting to a WiFi network
  WiFiMulti.addAP(configuration.wifiAP.c_str(), configuration.wifiPassword.c_str());

  Serial.print(WAITING + "connecting to WiFi ");

  while(WiFiMulti.run() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  
  Serial.println(SUCCESS + "Connected to Wifi -> node IP : " + WiFi.localIP());
  delay(500);
}


void loop() {
    client_TCP();

    readData();
    delay(configuration.timer);
    dataOutput();
}

void client_TCP(){
  while(!client.connected()) {
    client.connect(configuration.hostName.c_str(), configuration.port);
    if(client.connected()) {
      Serial.println(SUCCESS + "connected to [" + configuration.hostName + "] with success");
      delay(50);
      dataOutput();
      return;
    }
    delay(configuration.timer);
    Serial.println(FAILED + "connection failed : retry after " + String(configuration.timer) + "ms");
    //blink_led(5000,LED_BUILTIN);
  }
}

void dataOutput() {
  StaticJsonBuffer<255> jsonBuffer;

  JsonObject& root = jsonBuffer.createObject();
  
  root["serial_number"] = configuration.serialNumber;
  root["type"]          = configuration.type;
  root["temperature"]   = data.temperature;
  root["humidity"]      = data.humidity;
  root["gaz"]           = data.gaz;
  root["light"]         = data.light;
  
  char buffer[512];
  root.printTo(buffer, sizeof(buffer));
  
  client.print(buffer);
  
  Serial.println(DATA_OUTPUT + buffer);
}

void readData() {
  /* Read From DHT */
  data.temperature  = randomfloat();
  data.humidity     = randomfloat();
  data.gaz          = randomfloat();
  data.light        = randomfloat();
}

float randomfloat() {
  return static_cast <float> (rand()) / (static_cast <float> (RAND_MAX/100));
}
