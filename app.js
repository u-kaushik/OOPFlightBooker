class Flight {
  constructor(title, fullName, destination, departureDate, returnDate) {
    this.title = title;
    this.fullName = fullName;
    this.destination = destination;
    this.departureDate = departureDate;
    this.returnDate = returnDate;
  }
}

class UI {
  addFlightToList(flight) {
    // Get booking list variable from DOM
    const list = document.getElementById("booking-list");
    // Create table row element
    const row = document.createElement("tr");
    // Insert columns into row
    row.innerHTML = `<td>${flight.title}</td><td>${flight.fullName}</td><td>${flight.destination}</td><td>${flight.departureDate}</td><td>${flight.returnDate}</td><td><a href="#" class="delete">X</a></td>`;
    // Add new row to list
    list.appendChild(row);
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("fullName").value = "";
    document.getElementById("destination").value = "";
    document.getElementById("departureDate").value = "";
    document.getElementById("returnDate").value = "";
  }

  showAlert(message, className) {
    // Create div
    const div = document.createElement("div");
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector(".container");
    // Get form
    const form = document.querySelector("#booking-form");
    // Insert alert
    container.insertBefore(div, form);
    // Timeout after 3 secs
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteFlight(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
}

// Event listener for adding flight
document
  .getElementById("booking-form")
  .addEventListener("submit", function (e) {
    //Get form values
    const title = document.getElementById("title").value;
    const fullName = document.getElementById("fullName").value;
    const destination = document.getElementById("destination").value;
    const departureDate = document.getElementById("departureDate").value;
    const returnDate = document.getElementById("returnDate").value;

    // Get today's date
    let today = new Date();
    console.log(today);

    // Create new flight object
    const flight = new Flight(
      title,
      fullName,
      destination,
      departureDate,
      returnDate
    );
    // Create new UI
    const ui = new UI();
    // Validate entry

    if (
      title === "" ||
      fullName === "" ||
      destination === "" ||
      departureDate === "" ||
      returnDate === ""
    ) {
      // Error alert
      ui.showAlert("Please fill in all fields", "error");
    } else if (today < departureDate) {
      // Error alert
      ui.showAlert(
        "Earliest booking is for today. Please check departure date",
        "error"
      );
    } else if (departureDate >= returnDate) {
      // Error alert
      ui.showAlert(
        "Cannot return before departure. Please check return date",
        "error"
      );
    } else {
      // Add new book to list
      ui.addFlightToList(flight);
      // Show success alert
      ui.showAlert("Flight Added", "success");
      //Clear fields
      ui.clearFields();
    }
    e.preventDefault();
  });

// Event listener for delete
document.getElementById("booking-list").addEventListener("click", function (e) {
  // Create new UI
  const ui = new UI();
  // Delete book
  ui.deleteFlight(e.target);
  // Show message
  ui.showAlert("Flight removed", "success");
  e.preventDefault();
});
