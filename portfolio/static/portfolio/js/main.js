document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed'); // Confirming DOM is ready

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dynamic content loading for portfolio section
    const loadMoreButton = document.querySelector('.btn');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            fetch('/load-more-portfolio-items')
                .then(response => response.json())
                .then(data => {
                    const workList = document.querySelector('.work-list');
                    data.items.forEach(item => {
                        const work = document.createElement('div');
                        work.classList.add('work');
                        work.innerHTML = `
                            <img src="${item.image}">
                            <div class="layer">
                                <h3>${item.title}</h3>
                                <p>${item.description}</p>
                                <a href="${item.link}"><i class="fa-solid fa-up-right-from-square"></i></a>
                            </div>
                        `;
                        workList.appendChild(work);
                    });
                })
                .catch(error => console.error('Error:', error));
        });
    }

    // Form submission with AJAX
    const contactForm = document.querySelector('form[name="submit-to-django"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const csrftoken = getCookie('csrftoken');

            fetch('/contact', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrftoken
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('msg').innerText = data.message;
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Utility function to get CSRF token
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Tab switching functionality
    function opentab(tabname, event) {
        var tablinks = document.getElementsByClassName("tab-links");
        var tabcontents = document.getElementsByClassName("tab-contents");
        for (let tablink of tablinks) {
            tablink.classList.remove("active-link");
        }
        for (let tabcontent of tabcontents) {
            tabcontent.classList.remove("active-tab");
        }
        event.currentTarget.classList.add("active-link");
        document.getElementById(tabname).classList.add("active-tab");
    }

    document.querySelectorAll('.tab-links').forEach(tablink => {
        tablink.addEventListener('click', function(event) {
            opentab(this.getAttribute('data-tab'), event);
        });
    });

    // Side menu toggle functionality
    const sidemenu = document.getElementById("sidemenu");

    function openmenu() {
        if (sidemenu) {
            sidemenu.style.right = "0";
        }
    }

    function closemenu() {
        if (sidemenu) {
            sidemenu.style.right = "-200px";
        }
    }

    const menuOpenBtn = document.querySelector('.fa-bars');
    const menuCloseBtn = document.querySelector('.fa-times');
    if (menuOpenBtn) {
        menuOpenBtn.addEventListener('click', openmenu);
    }
    if (menuCloseBtn) {
        menuCloseBtn.addEventListener('click', closemenu);
    }
});
