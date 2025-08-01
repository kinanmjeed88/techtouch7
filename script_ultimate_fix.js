document.addEventListener("DOMContentLoaded", function() {
    // Create search container
    const searchContainer = document.createElement("div");
    searchContainer.className = "search-container";

    // Create search icon button
    const searchIcon = document.createElement("button");
    searchIcon.id = "search-icon";
    searchIcon.className = "search-icon";
    searchIcon.textContent = "🔍"; // Unicode search icon

    // Create search box
    const searchBox = document.createElement("div");
    searchBox.id = "search-box";
    searchBox.className = "search-box";

    // Create search input
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.id = "search-input";
    searchInput.placeholder = "ابحث عن عنوان المنشور...";

    // Create search button inside search box
    const searchButton = document.createElement("button");
    searchButton.id = "search-button";
    searchButton.className = "search-button";
    searchButton.textContent = "🔍"; // Unicode search icon

    // Append input and button to search box
    searchBox.appendChild(searchInput);
    searchBox.appendChild(searchButton);

    // Append icon and search box to search container
    searchContainer.appendChild(searchIcon);
    searchContainer.appendChild(searchBox);

    // Find the main content area to append the search bar
    const mainContent = document.querySelector(".main-content");
    if (mainContent) {
        // Insert search container before the main content of the page
        mainContent.insertBefore(searchContainer, mainContent.firstChild);
    }

    // Add CSS for the search bar dynamically
    const style = document.createElement("style");
    style.textContent = `
        .search-container {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-bottom: 20px;
            padding: 10px;
            border: 1px solid #eee;
            border-radius: 8px;
            background-color: #f9f9f9;
        }

        .search-icon {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #007bff;
            cursor: pointer;
            margin-left: 10px;
            display: block; /* Ensure the icon is always visible */
        }

        .search-box {
            display: none; /* Hidden by default */
            align-items: center;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            overflow: hidden;
            flex-grow: 1;
        }

        .search-box.active {
            display: flex; /* Show when active */
        }

        .search-input {
            border: none;
            padding: 10px;
            outline: none;
            flex-grow: 1;
        }

        .search-button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 15px;
            cursor: pointer;
        }

        .search-button:hover {
            background-color: #0056b3;
        }
    `;
    document.head.appendChild(style);

    // Search functionality
    const allPostCards = Array.from(document.querySelectorAll(".post-card-thin"));

    searchIcon.addEventListener("click", function() {
        searchBox.classList.toggle("active");
        if (searchBox.classList.contains("active")) {
            searchInput.focus();
        } else {
            searchInput.value = "";
            filterPosts(""); // Clear filter when search box is hidden
        }
    });

    searchButton.addEventListener("click", function() {
        filterPosts(searchInput.value);
    });

    searchInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            filterPosts(searchInput.value);
        }
    });

    function filterPosts(searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        allPostCards.forEach(card => {
            const title = card.querySelector(".post-info a").textContent.toLowerCase();
            if (title.includes(lowerCaseSearchTerm)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    }
});


