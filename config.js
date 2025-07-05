
        
        function toggleSidebar() {
    document.getElementById('tabs').classList.toggle('show');
    document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('tabs');
    const hamburger = document.getElementById('hamburger');
    // Only run on mobile
    if (window.innerWidth <= 768) {
        if (
            sidebar.classList.contains('show') &&
            !sidebar.contains(event.target) &&
            !hamburger.contains(event.target)
        ) {
            sidebar.classList.remove('show');
        }
    }
});
}

       

        // Function to handle tab switching
        function openTab(evt, tabName) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.className += " active";
        }
        let batchNum;
        // Function to generate and download the settings file based on the tab
        