/**
 * Course section accordions — enhances native <details> panels.
 */
(function () {
    'use strict';

    function initAccordions() {
        const root = document.querySelector('.course-accordion');
        if (!root) return;

        root.querySelectorAll('.course-accordion-item').forEach(function (item) {
            const trigger = item.querySelector('.course-accordion-trigger');
            if (!trigger) return;

            trigger.addEventListener('click', function () {
                requestAnimationFrame(function () {
                    item.classList.toggle('is-open', item.open);
                });
            });

            item.addEventListener('toggle', function () {
                item.classList.toggle('is-open', item.open);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAccordions);
    } else {
        initAccordions();
    }
})();