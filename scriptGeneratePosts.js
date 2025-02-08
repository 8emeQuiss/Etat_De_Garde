
      // generations des posts
        function generatePosts(data) {
          const postsContainer = document.getElementById("postsContainer");
          postsContainer.innerHTML = "";
          if (data.length === 0) {
            return;
          }
          const shuffledData = [...data].sort(() => Math.random() - 0.5);
          var Postnom = JSON.parse(localStorage.getItem('tasks'))

          const totalPosts = Postnom.length;
          const namesPerPost = 3;
          let savedPostsArray = []; // Store generated posts
          // var Postnom = ["Port Pricipale","Port Pricipale","Port Yoppy","Les arrets",
          //   "Magasin","Derrier 8","Derrier 9","Citern","Garage","Terrain"];
          for (let i = 0; i < totalPosts; i++) {
            const postCard = document.createElement("tr");
            postCard.className = "col";
            let listItems = "";
            let postNames = []; // Store names for this post
            let count =[];
            for (let j = 0; j < namesPerPost; j++) {
              const randomIndex = (i * namesPerPost + j) % shuffledData.length;
              const keys = Object.keys(shuffledData[randomIndex]);
              const nameKey =
                keys.find((key) => key.toLowerCase().includes("name")) || keys[1];
              const name =
                shuffledData[randomIndex][nameKey] || `Name ${randomIndex + 1}`;
              listItems += `<td class="col" id="nameM">${name}</td>`;
              postNames.push(name);
            }
            postCard.innerHTML = `            
                           <div class="row "><div class="col ">
      <h4 class="card-title"> ${Postnom[i]}</h4></div>  
         ${listItems}
       </div> `;                       
          postsContainer.appendChild(postCard);
            savedPostsArray.push({ post: Postnom[i], names: postNames });
          }
          localStorage.setItem("savedPostsArray", JSON.stringify(savedPostsArray)); 
           alert('Generated posts saved successfully.');
  console.log(savedPostsArray)
        }
     
        document.addEventListener("DOMContentLoaded", () => {
          const storedData = localStorage.getItem("jsonData");
          if (storedData) {
            const jsonData = JSON.parse(storedData);
            displayTable(jsonData);
            generatePosts(jsonData);
          }
        });