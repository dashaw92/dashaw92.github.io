console_open = false;
window.onload = function() { init() };
window.addEventListener("scroll", scroll, true);
window.onkeyup = function(e) {
    
    var key = e.keyCode ? e.keyCode : e.which;
    if(key == 192 && document.activeElement != document.getElementById("name") && document.activeElement != document.getElementById("addr") ) {
        var consoleEl = document.getElementById("console");
        if(console_open) {
            consoleEl.style.height = "0px";
            consoleEl.style.visibility = "hidden";
            console_open = false;
        } else {
            document.getElementById("console").style.visibility = "visible";
            consoleEl.style.transition = "height .3s linear 0s";
            consoleEl.style.height = "400px";
            
            console_open = true;
        }
    }
};

function scroll() {
    if(typeof this.opened == 'undefined') this.opened = false;
    if(typeof this.animid == 'undefined') this.animid = null;
    var consoleEl = document.getElementById("console");
    if(!this.opened) {
        if(this.opened) return;
        this.opened = true;
        
        consoleEl.innerHTML += '<iframe width="560" height="315" id="bounce" class="bounce meme" src="https://www.youtube.com/embed/I7zHvszFw9k?autoplay=1&rel=0&showinfo=0&controls=0&modestbranding=1&playlist=I7zHvszFw9k&loop=1" frameborder="0"></iframe>';
        
        document.getElementById("bounce").style.top = "10px";
        document.getElementById("bounce").style.left = "10px";
        document.getElementById("bounce").style.width = "560px";
        document.getElementById("bounce").style.height = "315px";
        
        setTimeout('document.getElementById("console").style.overflowY = "hidden"; document.getElementById("console").scrollTop = 1000', 500);
        
        
        if(this.animid != null) {
            window.cancelAnimationFrame(this.animid);
        }
        this.animid = window.requestAnimationFrame(animateBounce);
    }
}

function animateBounce() {
    
    var dx = 5;
    var dy = 5;
    
    var intTop = parseInt(document.getElementById("bounce").style.top.replace("px", ""));
    var intLeft = parseInt(document.getElementById("bounce").style.left.replace("px", ""));
    
    if(intTop >= 895) {
        document.getElementById("bounce").style.top = "0px";
        dy = -dy;
    }
    else if(intLeft >= window.innerWidth - 10) {
        document.getElementById("bounce").style.left = (0-parseInt(document.getElementById("bounce").style.width.replace("px",""))) + "px";
        dx = -dx;
    } else {
        document.getElementById("bounce").style.top = (intTop + dy) + "px"; 
        document.getElementById("bounce").style.left = (intLeft + dx) + "px";
    }
    window.requestAnimationFrame(animateBounce);
}

function init() {
    document.getElementById("console").scrollTop = 0;
    //if no entries found, display info text
    if(localStorage.length < 1) {
        document.getElementById("info").style.visibility = "visible";
        return;
    }
    
    for(var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i); //Name
        var item = localStorage.getItem(key); //Address
        
        update(key, item);
    }
}
                         
//http://stackoverflow.com/a/19937750
function getDomainName(hostName) {
    return hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
}

function add() {
    //name and addr
    var valid = true;
    var name = document.getElementById("name").value;
    var addr = document.getElementById("addr").value;
    if(name == undefined || name.trim() == "") {
        document.getElementById("name").style.borderColor = "#670000";
        valid = false;
    } else {
        document.getElementById("name").style.borderColor = "#000";
    }
    if(addr == undefined || addr.trim() == "") {
        document.getElementById("addr").style.borderColor = "#670000";
        valid = false;
    } else {
        document.getElementById("addr").style.borderColor = "#000";
    }
    if(!valid) return;
    if(localStorage.getItem(name) != null) {
        document.getElementById("name").style.borderColor = "#670000";
        return;
    }
    localStorage.setItem(name, addr);
    update(name, addr);
    document.getElementById("name").value = "";
    document.getElementById("addr").value = "";
    document.getElementById("name").focus();
}

function remove(name) {
    localStorage.removeItem(name);
    //http://stackoverflow.com/a/14066534
    var elements = document.getElementsByClassName("entry");
    while(elements.length > 0){
        elements[0].remove();
    }
    init();
}

function openurl(addr) {
    window.location.href = addr;
}

function update(name, addr) {
    if(typeof update.odd == 'undefined') update.odd = true;
    document.getElementById("info").style.visibility = "hidden";
    
    var body = window.document.createElement("div");
    body.setAttribute("title", "Double click to open: " + addr);
    body.setAttribute("ondblclick", "openurl(\"" + addr + "\")");
    if(update.odd) {
        body.setAttribute("class", "entry odd");
        update.odd = false;
    } else {
        body.setAttribute("class", "entry");
        update.odd = true;
    }
    var img = window.document.createElement("img");
    img.setAttribute("src", "https://www.google.com/s2/favicons?domain=" + getDomainName(addr));
    img.setAttribute("width", "16");
    img.setAttribute("height", "16");
    img.setAttribute("alt", getDomainName(addr));
    img.setAttribute("class", "icon");

    body.appendChild(img);
    body.innerHTML += "&nbsp;&nbsp;" + name;
    body.innerHTML += '<span onclick=remove(\'' + name + '\'); title="Click to remove this link" class="remove">-</span>';
    document.getElementById("links").appendChild(body);
}