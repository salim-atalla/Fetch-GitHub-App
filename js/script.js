

// Global Variables
let searchInput, searchBtn, results, dataBox;

searchInput = document.querySelector(".search-box input");
searchBtn = document.querySelector(".search-box .search-btn");
dataBox = document.querySelector(".data-box");
results = document.querySelector(".results");



// Event Listeners
searchBtn.onclick = (event) => {
    getRepos();
}

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchBtn.click();
    }
});



// Functions
function getRepos () {
    if (searchInput.value === "") {
        dataBox.innerHTML = `<span style="color: #FF6347;">Please Write A Username</span>`;
        searchInput.focus();
    } else {
        fetch(`https://api.github.com/users/${searchInput.value}/repos`)
            .then ((response) => response.json())
            .then ( (repos) => {

                // Add Results Number
                results.innerHTML = "";
                results.appendChild(document.createTextNode(`We have found ${repos.length} ${repos.length <= 1 ? "repository" : "repositories"}`));
                results.style.display = "block";

                // Empty the data box
                dataBox.innerHTML = "";

                repos.forEach((repo) => {
                    // Create the repo container
                    repoDiv = document.createElement("div");
                    repoDiv.className = "repo-box";
                    // Add repo name
                    repoDiv.appendChild(document.createTextNode(repo.name));

                    // Create info holder
                    let repoInfo = document.createElement("div");
                    repoInfo.className = "repo-info";
                    
                    // Create stars number span 
                    let stars = document.createElement("span");
                    stars.appendChild(document.createTextNode(`Stars: ${repo.stargazers_count}`));
                    repoInfo.appendChild(stars);

                    // Create the url visit button
                    let repoUrl = document.createElement("a");
                    repoUrl.href = `https://github.com/${searchInput.value}/${repo.name}`;
                    repoUrl.setAttribute("target", "_blank");
                    repoUrl.appendChild(document.createTextNode("Visit"));
                    repoInfo.appendChild(repoUrl);

                    repoDiv.appendChild(repoInfo);

                    // Add repo container to the main data box
                    dataBox.appendChild(repoDiv);
                });
            });
    }
}