import json, os, configparser
cfg = configparser.RawConfigParser()
cfg.read('config.txt')
historylimit=int(cfg.get('clipconfig', 'history'))

def enlistcopy(newentry=None):
    if not os.path.isfile('clip.json'):
        f=open('clip.json', 'w+')
        f.write('[]')
        f.close()
    copylist=[]
    f=open('clip.json', 'r')
    try:
        copylist=json.load(f)
    except:
        pass
    f.close()
    if newentry is None:
        f.close()
        return copylist
    try:
        copylist.insert(0, newentry)
    except:
        copylist=[newentry]
    copylist=copylist[:historylimit]
    f=open(os.path.join('clip.json'), 'w+')
    json.dump(copylist, f)
    f.close()
    return copylist