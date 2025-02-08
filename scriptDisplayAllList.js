
      //generate data
      document
        .getElementById("regenerateButton")
        .addEventListener("click", (e) => {
          e.preventDefault();
          const storedData = localStorage.getItem("jsonData");
          if (storedData) {
            const jsonData = JSON.parse(storedData);
            generatePosts(jsonData);
         
          } else {
            alert(
              "No data found to regenerate posts. Please upload and convert an Excel file first."
            );
          }
        });
      //display data
      function displayTable(data) {
        const tableHeader = document.getElementById("tableHeader");
        const tableBody = document.getElementById("tableBody");

        tableHeader.innerHTML = "";
        tableBody.innerHTML = "";

        if (data.length === 0) {
          return;
        }
        const headers = Object.keys(data[0]);
        headers.forEach((header) => {
          const th = document.createElement("th");
          th.textContent = header;
          tableHeader.appendChild(th);
        });
        data.forEach((row) => {
          const tr = document.createElement("tr");
          headers.forEach((header) => {
            const td = document.createElement("td");
            td.textContent = row[header ] || "";
            tr.appendChild(td);
          });
          tableBody.appendChild(tr);
        });
      }