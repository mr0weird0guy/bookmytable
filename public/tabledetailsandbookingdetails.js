import { getBooking, deleteBooking } from "./firebase.js";

const bookingTableBody = document.querySelector("#bookingTableBody");

// Fetch data from Firebase and populate the table
async function fetchBookings() {
  try {
    const querySnapshot = await getBooking();
    let index = 1; // Counter for serial number
    if (typeof querySnapshot === String) {
      bookingTableBody.innerHTML = `<tr><td colspan="10">${querySnapshot}</td></tr>`;
      return;
    }
    if (querySnapshot.length === 0) {
      bookingTableBody.innerHTML = `<tr><td colspan="10">No bookings found</td></tr>`;
      return;
    }
    console.log("querySnapshot", querySnapshot);
    querySnapshot.forEach((data) => {
      // Create a new row
      const row = document.createElement("tr");

      row.innerHTML = `
                <td>${index++}</td>
                <td>${data.date}</td>
                <td>${data.tableNo}</td>
                <td>${data.startTime}</td>
                <td>${data.endTime}</td>
                <td>${data.duration} mins</td>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.phone}</td>
                <td>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${
                      data.id
                    }">Delete</button>
                </td>
            `;

      bookingTableBody.appendChild(row);
    });

    // Attach event listeners to delete buttons
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const bookingId = event.target.getAttribute("data-id");
        await deleteBooking(bookingId);
        event.target.closest("tr").remove(); // Remove row from UI
      });
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
}

// Delete booking function
// async function deleteBooking(bookingId) {
//   try {
//     await deleteDoc(doc(db, "booking", bookingId));
//     console.log("Booking deleted successfully:", bookingId);
//   } catch (error) {
//     console.error("Error deleting booking:", error);
//   }
// }

// Fetch bookings on page load
fetchBookings();
