import json, os

def enlistcopy(newentry=None):
    if not os.path.isfile('clip.json'):
        f=open('clip.json', 'w+')
        f.write('[]')
        f.close()
    f=open('clip.json', 'r')
    copylist=json.load(f)
    f.close()
    if newentry is None:
        f.close()
        return copylist
    copylist.insert(0, newentry)
    copylist=copylist[:100]
    f=open(os.path.join('clip.json'), 'w+')
    json.dump(copylist, f)
    f.close()
    return copylist