class PlayersList {
    constructor (playersUrl, renderContainer) {
        fetch(playersUrl)
            .then(result => result.json() )
            .then(players => {
                this.players = players;
                this.renderPlayers(renderContainer, players);
                this.addEventListeners();
            });
    }
    getPlayerById(id) {
        return this.players.find(el => el.id === id);
    }
    renderPlayers(container, players) {
        let playersListDomString = '';
        players.forEach(player => {
            playersListDomString += 
                `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                  <div class="card players">
                    <div class="card-body">
                      <h4 class="card-title">${player.title}</h4>
                      <h6 class="card-subtitle">${player.position}</h4>
                      <img class="card-img-top" src="img/players/${player.image}" 
                        alt="${player.title}">
                      <p class="card-text">${player.number}</p>
                    </div>
                    <div class="modal-footer"> 
                      <button class="btn btn-info" data-toggle="modal"
                        data-target="#playerInfoModal" data-id="${player.id}">Info
                      </button>
                    </div>
                  </div>
                </div>`;
        });
        container.html(playersListDomString);
    }
    addEventListeners() {
        $('#playerInfoModal').on('show.bs.modal', event => {
            const button = $(event.relatedTarget); // Button that triggered the modal
            const id  = String(button.data('id')); // Extract info from data-* attributes
            const player = this.getPlayerById(id);
            const modal = $('#playerInfoModal');
            modal.find('.modal-body .card-img-top')
                .attr('src', 'img/players/'+player.image)
                .attr('alt', player.title);
            modal.find('.modal-body .card-title').text(player.title);
            modal.find('.modal-body .card-subtitle').text(player.position);
            modal.find('.modal-body .card-text').text(player.number);
            
        });
    }
}
