// Main Variaables
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

// Get Repos Function

function getRepos() {
  if (theInput.value == "") {
    reposData.innerHTML = "<span>Please Write Github Username</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((response) => response.json())
      .then((repositories) => {
        // Empty The Container
        reposData.innerHTML = "";

        // Loop On Repositories
        repositories.forEach((repo) => {
          // Create Main Div
          let mainDiv = document.createElement("div");

          // Create Repo name Text
          let repoName = document.createTextNode(repo.name);

          // Append text node to main div
          mainDiv.appendChild(repoName);

          // Create repo URL
          let theUrl = document.createElement("a");

          // Create url text
          let theUrlText = document.createTextNode(" Visit ");

          // Append url text to A
          theUrl.appendChild(theUrlText);

          // Create Url hrf
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

          // set attribute Blank
          theUrl.setAttribute("target", "_blank");

          // Append repoUrl to main Div
          mainDiv.appendChild(theUrl);

          // Create Stars Span
          let starSpan = document.createElement("span");

          // Create Span text
          let starText = document.createTextNode(
            `Stars ${repo.stargazers_count}`
          );

          // Append star text to span
          starSpan.appendChild(starText);

          // Append star span to main div
          mainDiv.appendChild(starSpan);

          // Add class name to main div
          mainDiv.className = "repo-box";

          // Append main di to show-data container
          reposData.appendChild(mainDiv);
        });
      });
  }
}
