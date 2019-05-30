import sys
from io import StringIO
import re
import json
from tensorflow import keras
from tensorflow.keras.models import load_model
import numpy as np
import socket
import json

model = load_model("model-final.hd5")
print("ok")
while True:
    # hex encoded packet payload - no split, no colons
    data = input()
    # print(len(data.split("\n")))
    print(data)
    dst = socket.gethostbyname(socket.gethostname())
    hexplist = re.findall('..',data)
    # Convert hex list to list of integers
    # For come reason it has to be a list with a single element, described above
    plist = [list(map(lambda x: int(x,16),hexplist))]
    parsed = keras.preprocessing.sequence.pad_sequences(plist,
                                                value=0,
                                                padding='post',
                                                maxlen=2048)
    confidence = float(model.predict(np.array([parsed[0]]), batch_size=1)[0][0])
    isMalicious = (confidence >=0.5)

    output = {
        "mal":isMalicious,
        "data":data[:30],
        "confidence":confidence,
        "destip":dst
    }
    print("Output: ",json.dumps(output))
