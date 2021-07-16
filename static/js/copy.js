window.onload = init()
checksyncinterval = 5000


function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function synctime() {
    fetch(window.location.href + 'sync')
        .then(response => response.json())
        .then(response => {
            globalsync = response[0]
        });
}

function init() {
    sleep(500).then(() => {
        document.getElementById('text').addEventListener("keyup", function(event) {
            if (event.key == "Enter") {
                document.getElementById('pushbutton').click();
            }
        });
        document.getElementById('url').innerText = 'Visit ' + window.location.href + ' on other devices'
        document.getElementById('url').classList.add('pinktext')
        fetchclipboard();
        synctime();
        document.getElementById('text').focus();
        autorefresh().then();
    });
}

function fetchclipboard() {
    fetch(window.location.href + 'fetch')
        .then(response => response.json())
        .then(copylist => showlist(copylist))
}

function copytext() {
    let textid = this.id + 'text'
    document.getElementById(textid).select();
    document.execCommand("copy")
}

function showlist(copylist) {

    let i = 0;
    for (let copy of copylist) {
        i = i + 1
        let node = document.createElement("LI");
        let hiddentxt = document.createElement('textarea');
        hiddentxt.value = copy;
        hiddentxt.id = i.toString() + 'text';
        hiddentxt.classList.add('hiddentext')

        let textnode = document.createElement('div');
        textnode.classList.add('preview')
        textnode.innerText = copy


        let button = document.createElement("button");
        button.innerHTML = 'Copy'
        button.classList.add('buttonModifier')
        button.classList.add('copybutton')
        button.id = i.toString();
        button.onclick = copytext
        node.appendChild(button);
        node.appendChild(textnode);
        document.getElementById("hiddendiv").appendChild(hiddentxt);
        document.getElementById("copylist").appendChild(node);
    }
}

var globalsync = 0

async function autorefresh() {
    while (true) {
        await sleep(checksyncinterval);
        fetch(window.location.href + 'sync')
            .then(response => response.json())
            .then(response => {
                if (globalsync != response[0]) {
                    refreshclipboard()
                    globalsync = response[0]
                }
            });
    }
}

function refreshclipboard() {
    document.getElementById("copylist").innerHTML = '';
    fetchclipboard();
}

function posttext() {
    if (!document.getElementById('text').value.replace(/\s/g, "").length) {
        alert("Don't Paste NULL")
        return
    }
    fetch(window.location.href + "posttext", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'text': document.getElementById('text').value
            })
        })
        .then(response => response.json())
        .then(text => {
            document.getElementById("copylist").innerHTML = '';
            showlist(text);
            synctime()
        });

}