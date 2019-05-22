from scapy.all import *
import sys
from io import StringIO
from scapy.layers import inet
import re
import codecs
import json
from tensorflow import keras
from tensorflow.keras.models import load_model
import numpy as np

def pkt_callback(pkt):
    model = load_model("model2.h5")
    data = None
    with open('output.json') as json_file:
        data = json.load(json_file)
    c = pkt.show(dump=True)
    x = re.search(".*load      = .*",c)
    if(x==None):
        return
    else:
        src = re.findall(".*src.*",c)[1][17:]
        dst = re.findall(".*dst.*",c)[1][17:]
        mal = False
        pstr = c[(x.start()+23):]
        pstr = codecs.decode(pstr, 'unicode_escape')
        pstr = pstr[1:-2]
        pb = bytes(pstr,'utf-8')
        pshex =  pb.hex()
        plist = re.findall('..',pshex)
        parsed = keras.preprocessing.sequence.pad_sequences(plist,
                                                    value=0,
                                                    padding='post',
                                                    maxlen=2048)
        output = model.predict_classes(np.array([parsed]))
        dataplaceholder = pshex[:30]
        if output[np.argmax(output)]:
            mal = True
        print(c)
        print(src)
        print(dst)
        print(mal)
        print(dataplaceholder)
        print("---")
        data.append({'mal':mal,'confidence':1,'data':dataplaceholder,'srcip':src,'destip':dst})
        
    with open('output.json', 'w') as outfile:  
        json.dump(data, outfile)


print('sniff')
sniff(prn=pkt_callback, filter="tcp and not arp", store=0)
