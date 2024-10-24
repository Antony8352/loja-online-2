const games = [
    {
        id: 1,
        title: "Jogo 1",
        price: "R$ 49,99",
        description: "Um jogo incrível que vai te levar a uma nova aventura.",
        image: "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/pt_BR/games/switch/c/crash-bandicoot-4-its-about-time-switch/hero"
    },
    {
        id: 2,
        title: "Jogo 2",
        price: "R$ 59,99",
        description: "Desafie seus amigos e prove suas habilidades neste jogo competitivo.",
        image: "https://cdn1.epicgames.com/offer/carnation/Share_Image_1920x1080-3_1920x1080-6e2d079f24db0a35285007191358978b"
    },
    {
        id: 3,
        title: "Jogo 3",
        price: "R$ 69,99",
        description: "Uma história épica que te manterá grudado na tela.",
        image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/814380/capsule_616x353.jpg?t=1726158438"
    },
    {
        id: 4,
        title: "Jogo 4",
        price: "R$ 39,99",
        description: "Um jogo de estratégia para os amantes do desafio.",
        image: "https://cdn1.epicgames.com/spt-assets/764b2d57552c436590f50318bd7587f9/bloons-td-6-offer-1jl6n.jpg?resize=1&w=480&h=270&quality=medium"
    },
    {
        id: 5,
        title: "Jogo 5",
        price: "R$ 79,99",
        description: "Uma aventura em um mundo aberto cheio de mistérios.",
        image: "https://assetsio.gnwcdn.com/eurogamer-zjp1vx.jpg?width=1200&height=630&fit=crop&enable=upscale&auto=webp"
    },
    {
        id: 6,
        title: "Jogo 6",
        price: "R$ 89,99",
        description: "Um jogo de RPG com gráficos impressionantes.",
        image: "https://windowsclub.com.br/wp-content/uploads/2023/08/baldurs-gate.jpg"
    }
];

function displayGames() {
    const gameList = document.getElementById('game-list');
    games.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game');
        gameDiv.innerHTML = `
            <img src="${game.image}" alt="${game.title}">
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <p><strong>${game.price}</strong></p>
            <button onclick="openModal(${game.id})">Comprar</button>
        `;
        gameList.appendChild(gameDiv);
    });
}

function openModal(gameId) {
    const game = games.find(g => g.id === gameId);
    document.getElementById('modal-title').innerText = game.title;
    document.getElementById('modal-description').innerText = game.description;
    document.getElementById('modal-price').innerText = game.price;
    document.getElementById('purchase-modal').style.display = 'block';

    // Limpar informações de pagamento
    document.getElementById('card-number').value = '';
    document.getElementById('card-name').value = '';
    document.getElementById('card-expiry').value = '';
    document.getElementById('card-cvv').value = '';

    document.getElementById('payment-method').onchange = function() {
        if (this.value === 'credit-card') {
            document.getElementById('credit-card-info').style.display = 'block';
        } else {
            document.getElementById('credit-card-info').style.display = 'none';
        }
    };

    document.getElementById('confirm-purchase').onclick = () => confirmPurchase(game.title);
}

function confirmPurchase(gameTitle) {
    const paymentMethod = document.getElementById('payment-method').value;
    let message = `Você comprou ${gameTitle} com pagamento via ${paymentMethod}.`;

    if (paymentMethod === 'credit-card') {
        const cardNumber = document.getElementById('card-number').value;
        const cardName = document.getElementById('card-name').value;
        const cardExpiry = document.getElementById('card-expiry').value;
        const cardCvv = document.getElementById('card-cvv').value;

        // Aqui você pode adicionar validações para os dados do cartão
        if (cardNumber && cardName && cardExpiry && cardCvv) {
            message += `\nDetalhes do cartão: ${cardNumber} (somente para demonstração)`;
        } else {
            alert("Por favor, preencha todas as informações do cartão.");
            return;
        }
    }

    alert(message);
    closeModal();
}

function closeModal() {
    document.getElementById('purchase-modal').style.display = 'none';
}

document.getElementById('close-modal').onclick = closeModal;
window.onclick = (event) => {
    if (event.target === document.getElementById('purchase-modal')) {
        closeModal();
    }
};

document.addEventListener('DOMContentLoaded', displayGames);
