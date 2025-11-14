// Gestion du menu mobile
function setupMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Vérifier que les éléments existent
    if (!menuButton || !mobileMenu) {
        console.error('Éléments du menu mobile non trouvés');
        return;
    }
    
    console.log('Initialisation du menu mobile...');
    
    // Gérer le clic sur le bouton menu
    menuButton.addEventListener('click', (e) => {
        console.log('Clic sur le bouton menu');
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
        console.log('Menu hidden:', mobileMenu.classList.contains('hidden'));
    });
    
    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
    
    // Fermer le menu quand on clique sur un lien
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Gestion du bouton de retour en haut
function setupBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) {
        console.error('Bouton de retour en haut non trouvé');
        return;
    }
    
    // Afficher/cacher le bouton au défilement
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible', 'translate-y-20');
            backToTopButton.classList.add('opacity-100', 'visible', 'translate-y-0');
        } else {
            backToTopButton.classList.add('opacity-0', 'invisible', 'translate-y-20');
            backToTopButton.classList.remove('opacity-100', 'visible', 'translate-y-0');
        }
    });
    
    // Défilement fluide vers le haut
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialisation des boutons de filtre
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            console.log('Filtrage par catégorie :', filterValue);
            filterProjects(filterValue);
        });
    });
}

// Initialisation au chargement du document
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM chargé, initialisation...');
    setupMobileMenu();
    setupBackToTop();
    initFilterButtons();
    
    // Afficher tous les projets par défaut
    filterProjects('all');
    
    // Vérifier la visibilité du menu mobile
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        console.log('Menu mobile trouvé, hidden:', mobileMenu.classList.contains('hidden'));
    } else {
        console.error('Menu mobile non trouvé dans le DOM');
    }
});

// Fonction de filtrage des projets avec animations
function filterProjects(category) {
    console.log(`Filtrage des projets par catégorie: ${category}`);
    const projects = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Mettre à jour l'état actif des boutons
    filterButtons.forEach(button => {
        if (button.getAttribute('data-filter') === category) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Animer la disparition des projets non sélectionnés
    let visibleCount = 0;
    projects.forEach((project, index) => {
        const projectCategories = project.getAttribute('data-category') || '';
        const isVisible = category === 'all' || 
                         (projectCategories && projectCategories.toLowerCase().includes(category.toLowerCase()));
        
        console.log(`Projet ${index}:`, {
            title: project.querySelector('h3')?.textContent || 'Sans titre',
            categories: projectCategories,
            isVisible: isVisible
        });
        
        if (isVisible) {
            // Calculer le délai pour l'animation en fonction de la position
            const delay = (visibleCount % 3) * 100;
            visibleCount++;
            
            // Réinitialiser les styles avant d'appliquer l'animation
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            project.style.display = 'block';
            
            // Forcer le navigateur à traiter les changements de style
            void project.offsetWidth;
            
            // Ajouter la classe pour l'animation d'apparition
            project.style.animation = `fadeInUp 0.6s ease-out ${delay}ms forwards`;
            project.classList.add('visible');
        } else {
            // Animation de disparition
            project.style.animation = 'fadeOut 0.4s ease-out forwards';
            setTimeout(() => {
                project.style.display = 'none';
                project.classList.remove('visible');
            }, 400);
        }
    });
    
    console.log(`${visibleCount} projets visibles avec la catégorie "${category}"`);
    
    // Animation de secousse si aucun projet n'est trouvé
    if (visibleCount === 0) {
        console.warn('Aucun projet trouvé pour la catégorie:', category);
        const filterContainer = document.querySelector('#MesProjet .flex.justify-center') || 
                              document.querySelector('body');
        filterContainer.style.animation = 'shake 0.5s';
        setTimeout(() => {
            filterContainer.style.animation = '';
        }, 500);
    }
}

// Gestion du bouton de retour en haut
function setupBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) return;
    
    // Afficher/cacher le bouton lors du défilement
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('translate-y-20', 'opacity-0');
            backToTopButton.classList.add('translate-y-0', 'opacity-100');
            backToTopButton.setAttribute('aria-hidden', 'false');
        } else {
            backToTopButton.classList.add('translate-y-20', 'opacity-0');
            backToTopButton.classList.remove('translate-y-0', 'opacity-100');
            backToTopButton.setAttribute('aria-hidden', 'true');
        }
    });
    
    // Gestion du clic sur le bouton
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Animation de clic
        backToTopButton.classList.add('animate-ping');
        setTimeout(() => {
            backToTopButton.classList.remove('animate-ping');
        }, 500);
    });
    
    // Animation au survol
    backToTopButton.addEventListener('mouseenter', () => {
        backToTopButton.classList.add('scale-110');
    });
    
    backToTopButton.addEventListener('mouseleave', () => {
        backToTopButton.classList.remove('scale-110');
    });
}

// Animation au défilement
function animateOnScroll() {
    const elements = document.querySelectorAll('.section-fade-in, .project-card');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementPosition < windowHeight - elementVisible) {
            element.classList.add('section-visible');
        }
    });
}

// Animation des compétences au survol
function setupSkillAnimations() {
    const skills = document.querySelectorAll('.skill-item');
    
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.querySelector('.skill-bar').style.transform = 'scaleX(1.05)';
            this.querySelector('.skill-percent').style.transform = 'translateY(0)';
            this.querySelector('.skill-percent').style.opacity = '1';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.querySelector('.skill-bar').style.transform = 'scaleX(1)';
            this.querySelector('.skill-percent').style.transform = 'translateY(10px)';
            this.querySelector('.skill-percent').style.opacity = '0';
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation du menu mobile
    setupMobileMenu();
    
    // Initialisation du bouton de retour en haut
    setupBackToTop();
    
    // Gestion des boutons du menu mobile
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }
    
    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', closeMobileMenu);
    }

    // Gestion du filtrage des projets avec animations
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Animation du bouton cliqué
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            const category = this.getAttribute('data-filter');
            filterProjects(category);
        });
    });
    
    // Initialiser avec le filtre 'Tous les projets' et animation
    setTimeout(() => {
        filterProjects('all');
        
        // Ajouter la classe visible aux projets après un court délai
        setTimeout(() => {
            document.querySelectorAll('.project-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, 100 * (index % 4)); // Délai progressif basé sur l'index
            });
        }, 300);
    }, 500);
    
    // Configurer les animations des compétences
    setupSkillAnimations();
    
    // Gestion du défilement fluide pour la navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Animation de transition fluide
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Mettre en surbrillance la section active dans la navigation
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('text-blue-600', 'font-medium');
                    link.classList.add('text-gray-700');
                });
                
                this.classList.remove('text-gray-700');
                this.classList.add('text-blue-600', 'font-medium');
                
                // Fermer le menu mobile si ouvert
                closeMobileMenu();
            }
        });
    });
    
    // Observer les sections pour la navigation active
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('text-blue-600', 'font-medium');
            link.classList.add('text-gray-700');
            
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.remove('text-gray-700');
                link.classList.add('text-blue-600', 'font-medium');
            }
        });
    });
    
    // Animation au défilement
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Exécuter une fois au chargement
    
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs du formulaire
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation simple
            if (!name || !email || !subject || !message) {
                alert('Veuillez remplir tous les champs du formulaire.');
                return;
            }
            
            // Vérification de l'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }
            
            // Ici, vous pouvez ajouter le code pour envoyer le formulaire
            // Par exemple, en utilisant fetch() pour envoyer les données à un serveur
            
            // Simulation d'envoi réussi
            alert('Votre message a été envoyé avec succès ! Je vous recontacterai bientôt.');
            contactForm.reset();
        });
    }
    
    // Animation au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('opacity-100', 'translate-y-0');
                element.classList.remove('opacity-0', 'translate-y-8');
            }
        });
    };
    
    // Écouteur d'événement pour l'animation au défilement
    window.addEventListener('scroll', animateOnScroll);
    
    // Exécuter une fois au chargement de la page
    animateOnScroll();
    
    // Gestion du défilement fluide pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajustement pour la hauteur du header
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile si ouvert
                closeMobileMenu();
            }
        });
    });
});