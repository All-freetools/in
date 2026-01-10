document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.card');
    const loadBtn = document.getElementById('loadMoreBtn');
    let itemsToShow = 16; // Initially show 16 tools

    // 1. Show first 16 items on load
    showItems(itemsToShow);

    // 2. Load More Button Logic
    window.loadMore = function() {
        itemsToShow += 16;
        showItems(itemsToShow);
    };

    function showItems(n) {
        let visibleCount = 0;
        cards.forEach((card) => {
            // Check if card is not hidden by filter
            if (!card.classList.contains('hidden-by-filter')) {
                if (visibleCount < n) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            }
        });

        // Hide button if all items are shown
        if (visibleCount >= cards.length || visibleCount === 0) {
            loadBtn.style.display = 'none';
        } else {
            loadBtn.style.display = 'inline-block';
        }
    }

    // 3. Category Filter Logic
    window.filterCategory = function(category) {
        // Change button color
        document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
        event.currentTarget.classList.add('active');

        // Check all cards
        cards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-cat') === category) {
                card.classList.remove('hidden-by-filter');
            } else {
                card.classList.add('hidden-by-filter');
                card.style.display = 'none';
            }
        });
        
        // Reset view for "All", show everything for categories
        if(category === 'all') {
            itemsToShow = 16;
            showItems(16);
        } else {
            // Show all tools of selected category
            cards.forEach(card => {
                if (!card.classList.contains('hidden-by-filter')) {
                    card.style.display = 'flex';
                }
            });
            loadBtn.style.display = 'none';
        }
    }

    // 4. Search Bar Logic
    window.filterTools = function() {
        let input = document.getElementById('searchInput').value.toLowerCase();
        
        cards.forEach(card => {
            let title = card.querySelector('h3').innerText.toLowerCase();
            if (title.includes(input)) {
                card.classList.remove('hidden-by-filter');
                card.style.display = 'flex';
            } else {
                card.classList.add('hidden-by-filter');
                card.style.display = 'none';
            }
        });
        
        // Hide load more button during search
        loadBtn.style.display = 'none';
        
        // If search is cleared, reset to default view
        if(input === "") {
            showItems(16);
        }
    }
});
