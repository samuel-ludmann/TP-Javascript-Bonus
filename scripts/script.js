const clicker_button = document.getElementById("clicker");
const display = document.getElementById("display");
const upgrades_wrapper = document.getElementById("upgrades_wrapper");

var counter = 0;
var click_amount = 1;
var auto_click = 0;

setInterval(() => {
    counter += auto_click;
    display.innerText = counter;
}, 1000);

const UPGRADES = [
    {
        name: "click",
        description: "Améliorer le click",
        upgrade_count: 0,
        get_price: (u) => {
            return click_amount * 10;
        },
        on_buy: (u) => {
            click_amount += 1;
        }
    },
    {
        name: "Auto Click",
        description: "Augmentez les clicks/s",
        upgrade_count: 0,
        get_price: (u) => {
            return 50 + u.upgrade_count * 15
        },
        on_buy: (u) => {
            auto_click += 1
        }
    }
]

clicker_button.addEventListener("click", () => {
    counter += click_amount;
    display.innerText = counter;
});

UPGRADES.forEach((upgrade) => {
    var upgradeEl = `<div class="upgrade" data-upgrade="${upgrade.name}">
        <div class="upgrade_name">${upgrade.name}</div>
        <div class="upgrade_description">${upgrade.description}</div>
        <div class="upgrade_price">${upgrade.get_price(upgrade)}</div>
        <button class="buy_upgrade">Acheter</button>
        <div class="upgrade_count">0</div>
    </div>`

    upgrades_wrapper.insertAdjacentHTML('beforeend', upgradeEl);

    var upgradeElement = upgrades_wrapper.querySelector('.upgrade:last-of-type');
    
    var buttonElement = upgradeElement.querySelector(".buy_upgrade")
    var priceElement = upgradeElement.querySelector(".upgrade_price")
    var countElement = upgradeElement.querySelector(".upgrade_count");

    buttonElement.addEventListener('click', () => {
        if (counter >= upgrade.get_price(upgrade))
        {
            counter -= upgrade.get_price(upgrade);
            display.innerText = counter;
            upgrade.on_buy(upgrade);
            upgrade.upgrade_count++;
            countElement.innerText = upgrade.upgrade_count;
            priceElement.innerText = upgrade.get_price(upgrade);
        }
    });

});