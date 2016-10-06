function showTab(event, tab) {
    'use strict';
    
    var i, tabcontent, tablinks;
    
    // hide all tabs
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i += 1) {
        tabcontent[i].style.display = "none";
    }
    
    // remove the class 'active'
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i += 1) {
        tablinks[i].className = tablinks[i].
            className.replace(" active", "");
    }
    
    document.getElementById(tab).style.display = "block";
    event.currentTarget.className += " active";
}