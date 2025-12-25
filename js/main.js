document.addEventListener('DOMContentLoaded', () => {

    // Tab Switching Logic
    const navItems = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('.tab-content');

    // Function to activate tab
    window.switchTab = (tabName) => {
        // Update Nav
        navItems.forEach(item => {
            if (item.dataset.tab === tabName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update Content
        sections.forEach(section => {
            if (section.id === tabName) {
                section.classList.add('active-tab');

                // Bug Fix: Re-initialize CV embed to ensure visibility after display:none
                if (tabName === 'cv') {
                    const pdfContainer = section.querySelector('.pdf-container');
                    const embed = pdfContainer ? pdfContainer.querySelector('embed') : null;
                    if (embed) {
                        const newEmbed = embed.cloneNode(true);
                        pdfContainer.removeChild(embed);
                        setTimeout(() => {
                            pdfContainer.appendChild(newEmbed);
                        }, 50);
                    }
                }
            } else {
                section.classList.remove('active-tab');
            }
        });

        window.scrollTo(0, 0);
    };

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            hamburger.classList.toggle('active');
        });
    }

    // Event Listeners for Nav
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabName = item.dataset.tab;
            window.switchTab(tabName);

            // Close mobile menu after selection
            if (navLinks && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                hamburger.classList.remove('active');
            }
        });
    });

    // Research Sub-navigation
    window.scrollToSub = (id) => {
        const element = document.getElementById(id);
        if (element) {
            // Scroll the element into view within its scrollable container
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Highlight active sidebar item
            const sidebar = element.closest('.research-layout')?.querySelector('.research-sidebar');
            if (sidebar) {
                sidebar.querySelectorAll('li').forEach(li => {
                    if (li.getAttribute('onclick')?.includes(`'${id}'`)) {
                        li.classList.add('active-sub');
                    } else {
                        li.classList.remove('active-sub');
                    }
                });
            }
        }
    };

    // Generic Scroll to Top for sidebars
    window.scrollToTop = () => {
        const activeTab = document.querySelector('.tab-content.active-tab');
        if (activeTab) {
            const scrollArea = activeTab.querySelector('.scrollable-area');
            const sidebar = activeTab.querySelector('.research-sidebar');
            if (scrollArea) scrollArea.scrollTo({ top: 0, behavior: 'smooth' });
            if (sidebar) sidebar.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Blog sub-navigation (using the same unified logic)
    window.scrollToBlog = window.scrollToSub;

    // Publication Year Filter (Simple toggle for now)
    window.filterPubs = (year) => {
        // This is a placeholder; in full version we would toggle visibility of year divs
        console.log("Filtering for year: " + year);
        // Remove active class from buttons
        document.querySelectorAll('.year-btn').forEach(btn => btn.classList.remove('active'));
        // Add to clicked (this needs the event target, simplest way is finding by text or passing this)
        // For MVP, just alerting or assume logic matches button text
    };

});
