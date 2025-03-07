document
        .getElementById("convertButton")
        .addEventListener("click", (e) => {
          e.preventDefault();
          //file uploader
          const fileInput = document.getElementById("excelFile");
          const file = fileInput.files[0];

          if (!file) {
            alert("Please upload an Excel file.");
            return;
          }

          const reader = new FileReader();
          //function to read excel file
          reader.onload = function (e) {
            e.preventDefault();
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
           
      //    // Add a new key "status" with value "active" to each object
      //    json = json.map((item) => {
      //     return{ 
      //      ...item, count : "0", // Change the key and value as needed
      //   }
      //  });

            //stock data json
            localStorage.setItem("jsonData", JSON.stringify(json));

            // Retrieve JSON from localStorage
const jsonData = JSON.parse(localStorage.getItem("jsonData")) || {};

// Add a new key-value pair
jsonData["newKey"] = "newValue";
            displayTable(jsonData);
            generatePosts(jsonData);
          };

          reader.readAsArrayBuffer(file);
          alert("data importer");
          console.log(localStorage.getItem("jsonData"))

        });