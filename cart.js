var sum = 0;
var cart = [];
const food_items = [
    {
        "Name":"Spanish Mixed Tapas",
        "Image":"media/menu/spanish tapas.jpg",
        "Description":"A selection of delicious spanish tapas including ham croquettes, spanish omelette, stuffed olives and tomato bread.",
        "Price1":"9 SGD",
        "Price2":9.00
    },
    {
        "Name":"Tacos Al Pastor",
        "Image":"media/menu/tacos al pastor.jpg",
        "Description":"Marinated pork tacos grilled to perfection and served with onion, pineapple, and cilantro.",
        "Price1":"11 SGD",
        "Price2":11.00
    },
    {
        "Name": "Mexican Enchiladas",
        "Image": "media/menu/Mexican Enchiladas.jpg",
        "Description": "Corn tortillas filled with chicken or cheese, smothered in tomato sauce and served with guacamole, sour cream, and refried beans.",
        "Price1": "11 SGD",
        "Price2": 11.00
    },
    {
        "Name": "Pizza Margherita con Chorizo Picante",
        "Image": "media/menu/chorizopizza.jpg",
        "Description": "A Mexican twist featuring tangy tomato sauce, spicy chorizo, mouthwatering mozzarella all on a 16-inch classic Margherita pizza.",
        "Price1": "16 SGD",
        "Price2": 16.00
    },
    {
        "Name": "Mediterranean Fiesta Pizza",
        "Image": "media/menu/mediterranean fiesta pizza.jpg",
        "Description": "Combining the vibrant colors of bell peppers, the tanginess of feta cheese, and the aromatic basil into a 16-inch pizza.",
        "Price1": "16 SGD",
        "Price2": 16.00
    },
    {
        "Name": "Mixed Paella",
        "Image": "media/menu/mixed paella.jpg",
        "Description": "A delightful mixed paella with rice, fresh seafood, chicken, chorizo, and vegetables, capturing Spanish flavors.",
        "Price1": "13 SGD",
        "Price2": 13.00
    },
    {
        "Name": "Ratatouille Vegetable Stew",
        "Image": "media/menu/ratatouille vegetable stew.jpg",
        "Description": "Originating from France, a tasty vegetable stew made with fresh eggplant, zucchini, peppers, and tomatoes, served with white rice.",
        "Price1": "15 SGD",
        "Price2": 15.00
    },
    {
        "Name": "Crème Brûlée",
        "Image": "media/menu/creme brulee.jpg",
        "Description": "A classic French dessert of smooth custard with a caramelized sugar topping.",
        "Price1": "7 SGD",
        "Price2": 7.00
    },
    {
        "Name": "Cheese Fondue",
        "Image": "media/menu/cheese fondue.jpg",
        "Description": "Melted Swiss cheese with herbs de Provence, served with crispy bread.",
        "Price1": "8 SGD",
        "Price2": 8.00
    },
    {
        "Name": "Perrier Sparkling Water",
        "Image": "media/menu/perrier.jpg",
        "Price1": "5 SGD",
        "Price2": 5.00
    },
    {
        "Name": "Mexican Horchata",
        "Image": "media/menu/horchata.jpg",
        "Price1": "4 SGD",
        "Price2": 4.00
      },
    {
        "Name":"Café au lait",
        "Image":"media/menu/cafedulait.jpg",
        "Price1": "5 SGD",
        "Price2": 5.00
    }
];
//Add to cart function
function addtocart(num) {
    sum = sum + food_items[num].Price2;
    cart.push(food_items[num]);
    document.getElementById('cartnumber').innerText = cart.length;
    document.getElementById('carttotal').innerText = sum.toFixed(2);
    popup(food_items[num].Name);
    setTimeout(popupOff, 8000);
}
// Remove items from cart
function removecart (num) {
    sum = sum - parseFloat(cart[num].Price2);
    popupremove(cart[num].Name);
    setTimeout(popupOff, 8000);
    cart.splice(num,1);
    if (cart.length == 0) {
        cartpage();
    }
    cartpage();
    document.getElementById('cartnumber').innerText = cart.length;
    document.getElementById('carttotal').innerText = sum.toFixed(2);
}
// View item 
function viewitem(num) {
    document.body.style.overflow = 'hidden'
    overlayon();
    var itemHTML = '';
    const itemviewer = document.getElementById('itemviewer');
    itemviewer.style.display = 'block';
    itemHTML += "<img src='" + food_items[num].Image + "'><h2>" + food_items[num].Name + "</h2><h3>" + food_items[num].Price1 + "</h3>";
    if (food_items[num].Description != undefined) {
        itemHTML += "<p>" + food_items[num].Description + "</p>";
    }
    itemHTML += "<a onclick='addtocart("+ num +")'>Add to Cart</a><a onclick='viewitemoff()'>Cancel</a>";
    itemviewer.innerHTML = itemHTML;
    document.getElementById('overlay').addEventListener('click', viewitemoff);
}
function viewitemoff() {
    document.body.style.overflow = 'auto'
    const itemviewer = document.getElementById('itemviewer');
    itemviewer.style.display = 'none';
    overlayoff();
}
//For adding items in summary page
function addsame(num) { 
    cart.push(cart[num]);
    sum = sum + cart[num].Price2;
    same = same + 1;
    document.getElementById('cartnumber').innerText = cart.length;
    document.getElementById('carttotal').innerText = sum.toFixed(2);
    popup(food_items[num].Name);
    setTimeout(popupOff, 8000);
    cartpage();
}
//Display popup during add to cart function
function popup(name1) {
    document.getElementById('popup').style.display='block';
    var newelement = document.createElement('h3');
    newelement.innerText = name1 + " has been added to cart <br> <input type='button' value='OK' onclick='popupOff()'>";
    document.getElementById('popup').innerHTML = newelement.innerText;
}
function popupremove(name1) {
    document.getElementById('popup').style.display='block';
    var newelement = document.createElement('h3');
    newelement.innerText = name1 + " has been removed from cart <br> <input type='button' value='OK' onclick='popupOff()'>";
    document.getElementById('popup').innerHTML = newelement.innerText;
}
function popupOff() {
    document.getElementById('popup').style.display='none';
}
// Activate overlay
function overlayon() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
}
function overlayoff() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}
// Go to cart page
function cartpage() {
    overlayon();
    document.getElementById('overlay').addEventListener('click', closecartpage)
    const cart_page = document.getElementById("cartpage");
    let menuHTML = "";
    menuHTML = "<h1>ORDER SUMMARY</h1><br>"
    if (cart.length == 0) {
        menuHTML += "<p>Your cart is empty.</p>"
        document.body.style.overflow = "hidden";
        cart_page.style.overflow = "auto";
        menuHTML += "<a onclick='closecartpage()'>BACK</a>"
    }
    else {
        for (i = 0; i < cart.length; i++) {
            same = 0;
            menuHTML += "<h2>" + cart[i].Name + "</h2>";
            menuHTML += "<p>" + cart[i].Price2 + " SGD</p>" + "<div class='function'><a onclick='removecart("+i+")'>Remove</a><a onclick='addsame("+i+")'>+</a></div></p>";
            menuHTML += "<hr>";
        }
        document.body.style.overflow = "hidden";
        cart_page.style.overflow = "auto";
        menuHTML += "<h3 id='total'>Total: $" + sum.toFixed(2) + "</h3><a onclick='closecartpage()'>BACK</a><a href='checkout.html' onclick='localStorageStore()'>CHECKOUT</a>"
    }
    cart_page.style.display = "block";
    cart_page.innerHTML = menuHTML;
}
//Closes cart page
function closecartpage() {
    overlayoff();
    const cart_page = document.getElementById("cartpage");
    cart_page.style.display = "none";
    document.body.style.overflow = "scroll";
}
//Loading cart on menu page
function loadmenu() {
    document.getElementById('cartnumber').innerText = cart.length;
    sum = 0
    for (i=0;i<cart.length;i++) {
        sum += cart[i].Price2 
    }
    document.getElementById('carttotal').innerText = sum.toFixed(2);
}
//Loading cart on checkout page 
window.onload = localStorageGet();
if (cart == null) {
    cart = [];
}
function summary() {
    const summary = document.getElementById("summary");
    const summary2 = document.getElementById("summary2")
    let total = 0;
    let menuHTML = "";
    for (i = 0; i < cart.length; i++) {
        same = 0;
        menuHTML += "<h2>" + cart[i].Name + "</h2>";
        menuHTML += "<p>" + cart[i].Price2 + " SGD</p>";
        menuHTML += "<hr>";
        total += cart[i].Price2
    }
    let subtotal = total;
    summary.innerHTML = menuHTML;
    summary2.innerHTML += "<h4>Subtotal: $" + subtotal.toFixed(2) +"</h4><h4 id='delivery-charge'>Delivery Charge: $4.00</h4><h3 id='total'>Total: $" + (total + 4).toFixed(2) + "</h3>";
}
//Local storage
function localStorageStore() {
    const jsonString = JSON.stringify(cart);
    const key = "ArrayData";
    localStorage.setItem(key,jsonString); 
}
function localStorageGet() {
    const key = "ArrayData";
    const jsonString = localStorage.getItem(key);
    cart = JSON.parse(jsonString);
}
//Payment mode
function paymentmode() {
    let payment_mode = document.getElementById("payment");
    let value = payment_mode.value;
    let div = document.getElementById("credit-card-div");
    if (value=='credit-card') {
        div.innerHTML = `<label for="creditcard">Credit Card Number</label><br>
        <input type="number" name="creditcard" maxlength="16" minlength="16" required><br>
        <label for="expiry">Expiry date</label><br>
        <input type="text" name="expiry" placeholder="DD/YY" required><br>
        <label for="CVV">CVV</label><br>
        <input type="number" name="cvv" required><br>`
    }
    else {
        div.innerHTML = "";
    }
}
//Checkout submit button/Place order button
function place_order() {
    const form = document.getElementById('form');
    var name = form.elements.name.value;
    var contact = form.elements.contact.value;
    var email = form.elements.email.value;
    var payment = form.elements.payment.value;
    var address = form.elements.address.value;
    var unitNumber = form.elements['unit-number'].value;
    var specialInstructions = form.elements['special-instructions'].value;
    var dateObj = new Date()
    var orderNumber = parseInt(4000000*Math.random())
    var date = dateObj.toDateString() + " " + dateObj.toTimeString();
    if (payment == 'credit-card'){
        var creditCardNumber = form.elements.creditcard.value;
        var expiryDate = form.elements.expiry.value;
        var cvv = form.elements.cvv.value;
        var formData = {
            name: name,
            contact: contact,
            email: email,
            payment: "Credit Card",
            creditCardNumber: creditCardNumber,
            expiryDate: expiryDate,
            cvv: cvv,
            address: address,
            'unit-number': unitNumber,
            'special-instructions': specialInstructions,
            date: date,
            orderNumber: orderNumber
          };
    }
    else {
        var formData = {
            name: name,
            contact: contact,
            email: email,
            payment: "Cash",
            address: address,
            'unit-number': unitNumber,
            'special-instructions': specialInstructions,
            date: date,
            orderNumber: orderNumber
          };
    }
    localStorage.setItem('orderData', JSON.stringify(formData));
    window.location.href = 'Successful.html';
    return false;
}
// Load and Display result on the success page
function success() {
    const savedData = localStorage.getItem('orderData');
    const formData = JSON.parse(savedData);
    localStorageGet();
    const divright = document.getElementById("div-right")
    document.getElementById("name").innerHTML = formData.name;
    document.getElementById("email").innerHTML = formData.email;
    document.getElementById("email1").innerHTML = formData.email;
    document.getElementById("address").innerHTML = formData.address;
    document.getElementById("paymentmode").innerHTML = formData.payment;
    document.getElementById("contact").innerHTML = formData.contact;
    document.getElementById("contact1").innerHTML = formData.contact;
    document.getElementById("order-number").innerHTML = '#' + formData.orderNumber
    document.getElementById("date").innerHTML = formData.date;
    if (formData['special-instructions'] == '') {
        document.getElementById("special-instructions").innerHTML = "None";
    }
    else {
        document.getElementById("special-instructions").innerHTML = formData['special-instructions'];
    }
    if (formData['unit-number'] != undefined) {
        document.getElementById("address").innerHTML = formData.address + "<br>" + formData['unit-number'];
    }
    const summary = document.getElementById("summary");
    const summary2 = document.getElementById("summary2")
    let total = 0;
    let menuHTML = "";
    for (i = 0; i < cart.length; i++) {
        same = 0;
        menuHTML += "<img src='" + cart[i].Image + "'>"
        menuHTML += "<h2>" + cart[i].Name + "</h2>";
        menuHTML += "<p class='price'>" + cart[i].Price2 + " SGD</p>"
        menuHTML += "<hr>";
        total += cart[i].Price2
    }
    let subtotal = total;
    summary.innerHTML = menuHTML;
    summary2.innerHTML += "<h4>Subtotal: $" + subtotal.toFixed(2) +"</h4><h4 id='delivery-charge'>Delivery Charge: $4.00</h4><h3 id='total'>Total: $" + (total + 4).toFixed(2) + "</h3>";
}

//clear local storage
function clear_storage() {
    localStorage.clear();
}






