from scapy.all import *
import sys
from io import StringIO
from scapy.layers import inet
import re
import codecs
from dummyval import *
import json

def pkt_callback(pkt):
    data = None
    with open('output.json') as json_file:
        data = json.load(json_file)
    c = pkt.show(dump=True)
    x = re.search(".*load      = .*",c)
    if(x==None):
        return
    else:
        mal = False
        pstr = c[(x.start()+23):]
        pstr = codecs.decode(pstr, 'unicode_escape')
        pstr = pstr[1:-2]
        pb = bytes(pstr,'utf-8')
        pshex =  pb.hex()
        plist = re.findall('..',pshex)
        dataplaceholder = pshex[:30]
        if not validate(plist):
            mal = True
        print(mal)
        print(dataplaceholder)
        print("---")
        data.append({'mal':mal,'data':dataplaceholder})
        
    with open('output.json', 'w') as outfile:  
        json.dump(data, outfile)


print('sniff')
sniff(prn=pkt_callback, filter="tcp", store=0)
