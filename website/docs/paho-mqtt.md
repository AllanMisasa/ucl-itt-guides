---
title: MQTT
---

## Kommando til at starte Mosquitto broker

```terminal
mosquitto -v -c mosquitto.conf
```

## Kommando til at start subscribe client med Mosquitto

```terminal
mosquitto_sub -h hostname -t topic_name
```

## Eksempel på publish i Python

```python
import socket
import paho.mqtt.client as mqtt

"""
De første 2 linjer finder hostname på din egen computer, for det er den vi skal kommunikere til, og definerer porten vi kommunikerer med MQTT over. Standard er 1883 og 1884. 
"""

hostname = socket.gethostname()
port = 1883

"""
on_connect og on_publish er bare funktioner der kan give os feedback når der er forbindelse til brokeren, og når vi har haft success med at publicere en besked.
Publish 
"""

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))

def on_publish(client, userdata, mid):
    print("Data published \n")

"""
Vi sætter retain=True for så bliver den sidste besked i topic tilgængelig for ny
"""

def publish_message(topic, payload):
    mqtt.publish(topic, payload, qos=0, retain=True)

try: 
    client = mqtt.Client()
    client.on_publish = on_publish
    client.connect(hostname, port)
    client.publish("messages/non_critical", "Test message")
except:
    print("Something failed. Please try again later.")
```

## Subscribe i Python

```python
import paho.mqtt.client as mqtt
import socket
import time

broker = socket.gethostname()
topic = 'topic'

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))

def on_publish(client, userdata, mid):
    print("Data published \n")

def on_message(client, userdata, message):
    print("message received " , str(message.payload.decode("utf-8")))
    print("message topic=", message.topic)

client = mqtt.Client()
print("connecting to broker")
client.connect(broker, port=1883)
client.on_connect = on_connect
client.on_message = on_message

client.loop_start()

while True:
    print("Subscribing to topic", topic)
    client.subscribe(topic)
    time.sleep(10)
```