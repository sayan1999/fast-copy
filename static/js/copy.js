window.onload = fetchclipboard();
document.getElementById('text').focus();

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
        hiddentxt.value = copy.replace('<br>', '\n');
        hiddentxt.id = i.toString() + 'text';
        hiddentxt.style = "width:1px;height:1px;"

        let textnode = document.createElement('div');
        textnode.innerText = copy;


        let button = document.createElement("button");
        button.innerHTML = 'Copy Text'
        button.className = 'buttonModifier'
        button.id = i.toString();
        button.onclick = copytext
        node.appendChild(button);
        node.appendChild(textnode);
        node.appendChild(hiddentxt);
        document.getElementById("copylist").appendChild(node);
    }
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
        });
}