var ShoppingCart = /** @class */ (function () {
    function ShoppingCart() {
        this.cartItems = [];
        this.subtotal = 0;
    }
    ShoppingCart.prototype.calculateTax = function (subtotal) {
        var tax = subtotal * 0.13;
        return parseFloat(tax.toFixed(2));
    };
    ShoppingCart.prototype.calculateTotal = function (subtotal) {
        var tax = this.calculateTax(subtotal);
        return parseFloat((subtotal + tax).toFixed(2));
    };
    ShoppingCart.prototype.getImgLink = function (title) {
        switch (title) {
            case 'French Fries with Ketchup':
                return 'https://assets.codepen.io/687837/plate__french-fries.png';
            case 'Salmon and Vegetables':
                return 'https://assets.codepen.io/687837/plate__salmon-vegetables.png';
            case 'Spaghetti with Sauce':
                return 'https://assets.codepen.io/687837/plate__spaghetti-meat-sauce.png';
            case 'Tortellini':
                return 'https://assets.codepen.io/687837/plate__tortellini.png';
            case 'Chicken Salad':
                return 'https://assets.codepen.io/687837/plate__chicken-salad.png';
            default:
                return 'https://assets.codepen.io/687837/plate__chicken-salad.png';
        }
    };
    ShoppingCart.prototype.updateCart = function () {
        var _this = this;
        this.subtotal = 0;
        $('.cart-items').empty();
        this.cartItems.forEach(function (item) {
            var element = "\n                <li class=\"cart-item\">\n                    <img src=\"".concat(_this.getImgLink(item.title), "\" alt=\"").concat(item.title, "\">\n                    <div class=\"cart-item-dets\">\n                        <p class=\"cart-item-heading\">").concat(item.title, "</p>\n                        <p class=\"g-price\">$").concat(item.price, " x ").concat(item.quantity, "</p>\n                        <button class=\"delete-button\">&#10006;</button>\n                        <button class=\"decrease-quantity\">\u2212</button>\n                    </div>\n                </li>\n            ");
            $('.cart-items').append(element);
            _this.subtotal += item.subtotal;
        });
        var formattedSubtotal = this.subtotal.toFixed(2);
        var tax = this.calculateTax(this.subtotal).toFixed(2);
        var total = this.calculateTotal(this.subtotal).toFixed(2);
        $('.cart-math').html("\n            <p class=\"cart-math-item\">\n                <span class=\"cart-math-header\">Subtotal:</span>\n                <span class=\"g-price subtotal\">$".concat(formattedSubtotal, "</span>\n            </p>\n            <p class=\"cart-math-item\">\n                <span class=\"cart-math-header\">Tax:</span>\n                <span class=\"g-price tax\">$").concat(tax, "</span>\n            </p>\n            <p class=\"cart-math-item\">\n                <span class=\"cart-math-header\">Total:</span>\n                <span class=\"g-price total\">$").concat(total, "</span>\n            </p>\n        "));
    };
    ShoppingCart.prototype.addItemToCart = function (title, price) {
        var existingItem = this.cartItems.find(function (item) { return item.title === title; });
        if (existingItem) {
            existingItem.quantity++;
            existingItem.subtotal += price;
        }
        else {
            this.cartItems.push({
                title: title,
                price: price,
                quantity: 1,
                subtotal: price,
            });
        }
        this.updateCart();
    };
    ShoppingCart.prototype.removeItemFromCart = function (title) {
        var indexToDelete = this.cartItems.findIndex(function (item) { return item.title === title; });
        if (indexToDelete !== -1) {
            this.cartItems.splice(indexToDelete, 1);
            this.updateCart();
        }
    };
    ShoppingCart.prototype.decreaseItemQuantity = function (title) {
        var item = this.cartItems.find(function (item) { return item.title === title; });
        if (item && item.quantity > 1) {
            item.quantity--;
            item.subtotal -= item.price;
            this.updateCart();
        }
    };
    return ShoppingCart;
}());
var shoppingCart = new ShoppingCart();
$('.add-button').on('click', function () {
    var title = $(this).data('title');
    var price = $(this).data('price');
    shoppingCart.addItemToCart(title, price);
});
$('.cart-items').on('click', '.delete-button', function () {
    var title = $(this).closest('.cart-item').find('.cart-item-heading').text();
    shoppingCart.removeItemFromCart(title);
});
$('.cart-items').on('click', '.decrease-quantity', function () {
    var title = $(this).closest('.cart-item').find('.cart-item-heading').text();
    shoppingCart.decreaseItemQuantity(title);
});
