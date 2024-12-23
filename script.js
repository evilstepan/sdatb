document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        const email = document.getElementById('email').value;
        if (!validateEmail(email)) {
            alert('Пожалуйста, введите действительный адрес электронной почты.');
            event.preventDefault();
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    document.getElementById('loadProjects').addEventListener('click', function() {
        fetch('projects.json') 
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('projectsContainer');
                container.innerHTML = '';
                data.projects.forEach(project => {
                    const projectDiv = document.createElement('div');
                    projectDiv.classList.add('project-item', 'scroll-effect'); 
                    projectDiv.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p>`;
                    container.appendChild(projectDiv);
                });
                checkVisibility();
            })
            .catch(error => console.error('Ошибка загрузки проектов:', error));
    });
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const projectItems = document.querySelectorAll('.project-item');
    const languageItems = document.querySelectorAll('.language-box');

    function checkVisibility() {
        [...portfolioItems, ...projectItems, ...languageItems].forEach(item => {
            const position = item.getBoundingClientRect().top;

            if (position <= window.innerHeight) { 
                item.classList.add('visible'); 
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); 
});
function toggleText(element) {
    const description = element.nextElementSibling; 
    const overlay = element.parentElement; 

    if (description.style.display === "none" || description.style.display === "") {
        description.style.display = "block"; 
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.6)"; 
        element.querySelector("i").classList.remove("fa-check-circle"); 
        element.querySelector("i").classList.add("fa-times-circle"); 
    } else {
        description.style.display = "none"; 
        overlay.style.backgroundColor = "transparent"; 
        element.querySelector("i").classList.remove("fa-times-circle"); 
        element.querySelector("i").classList.add("fa-check-circle"); 
    }
}

const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');


openModalBtn.onclick = function() {
    modal.style.display = "block";
}

closeModalBtn.onclick = function() {
    modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


