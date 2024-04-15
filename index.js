document.addEventListener("DOMContentLoaded", function() {
  fetch("db.json")
  .then(response => response.json())
  .then(data => {
      const filmsList = document.getElementById("films");
      const showingInfo = document.getElementById("showing");

  
      function createFilmListItem(film) {
          const listItem = document.createElement("li");
          listItem.classList.add("film", "item");
          listItem.textContent = film.title;
          listItem.addEventListener("click", function() {
              updateMovieInfo(film);
          });
          return listItem;
      }

    
      function updateMovieInfo(film) {
          const poster = document.getElementById("poster");
          const title = document.getElementById("title");
          const runtime = document.getElementById("runtime");
          const filmInfo = document.getElementById("film-info");
          const showtime = document.getElementById("showtime");
          const ticketNum = document.getElementById("ticket-num");
          const buyTicketBtn = document.getElementById("buy-ticket");

          poster.src = film.poster;
          poster.alt = film.title;
          title.textContent = film.title;
          runtime.textContent = film.runtime + " minutes";
          filmInfo.textContent = film.description;
          showtime.textContent = film.showtime;
          ticketNum.textContent = film.capacity - film.tickets_sold + " remaining tickets";

          buyTicketBtn.addEventListener("click", function() {
              if (film.tickets_sold < film.capacity) {
                  film.tickets_sold++;
                  ticketNum.textContent = film.capacity - film.tickets_sold + " remaining tickets";
                  alert("Ticket bought successfully!");
              } else {
                  alert("Sorry, all tickets sold out!");
              }
          });
      }

      
      data.films.forEach(film => {
          filmsList.appendChild(createFilmListItem(film));
      });

    
      updateMovieInfo(data.films[0]);
  })
  .catch(error => console.error("Error fetching data:", error));
});
