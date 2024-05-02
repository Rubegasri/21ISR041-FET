class ShoppingCart {
    cartItems: { title: string, price: number, quantity: number, subtotal: number }[];
    subtotal: number;

    constructor() {
        this.cartItems = [];
        this.subtotal = 0;
    }

    calculateTax(subtotal: number): number {
        const tax = subtotal * 0.13;
        return parseFloat(tax.toFixed(2));
    }

    calculateTotal(subtotal: number): number {
        const tax = this.calculateTax(subtotal);
        return parseFloat((subtotal + tax).toFixed(2));
    }

    getImgLink(title: string): string {
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
    }

    updateCart(): void {
        this.subtotal = 0;
        $('.cart-items').empty();
        this.cartItems.forEach(item => {
            const element = `
                <li class="cart-item">
                    <img src="${this.getImgLink(item.title)}" alt="${item.title}">
                    <div class="cart-item-dets">
                        <p class="cart-item-heading">${item.title}</p>
                        <p class="g-price">$${item.price} x ${item.quantity}</p>
                        <button class="delete-button">&#10006;</button>
                        <button class="decrease-quantity">−</button>
                    </div>
                </li>
            `;
            $('.cart-items').append(element);
            this.subtotal += item.subtotal;
        });

        const formattedSubtotal = this.subtotal.toFixed(2);
        const tax = this.calculateTax(this.subtotal).toFixed(2);
        const total = this.calculateTotal(this.subtotal).toFixed(2);

        $('.cart-math').html(`
            <p class="cart-math-item">
                <span class="cart-math-header">Subtotal:</span>
                <span class="g-price subtotal">$${formattedSubtotal}</span>
            </p>
            <p class="cart-math-item">
                <span class="cart-math-header">Tax:</span>
                <span class="g-price tax">$${tax}</span>
            </p>
            <p class="cart-math-item">
                <span class="cart-math-header">Total:</span>
                <span class="g-price total">$${total}</span>
            </p>
        `);
    }

    addItemToCart(title: string, price: number): void {
        const existingItem = this.cartItems.find(item => item.title === title);
        if (existingItem) {
            existingItem.quantity++;
            existingItem.subtotal += price;
        } else {
            this.cartItems.push({
                title: title,
                price: price,
                quantity: 1,
                subtotal: price,
            });
        }
        this.updateCart();
    }

    removeItemFromCart(title: string): void {
        const indexToDelete = this.cartItems.findIndex(item => item.title === title);
        if (indexToDelete !== -1) {
            this.cartItems.splice(indexToDelete, 1);
            this.updateCart();
        }
    }

    decreaseItemQuantity(title: string): void {
        const item = this.cartItems.find(item => item.title === title);
        if (item && item.quantity > 1) {
            item.quantity--;
            item.subtotal -= item.price;
            this.updateCart();
        }
    }
}

const shoppingCart = new ShoppingCart();

$('.add-button').on('click', function() {
    const title = $(this).data('title');
    const price = $(this).data('price');
    shoppingCart.addItemToCart(title, price);
});

$('.cart-items').on('click', '.delete-button', function() {
    const title = $(this).closest('.cart-item').find('.cart-item-heading').text();
    shoppingCart.removeItemFromCart(title);
});

$('.cart-items').on('click', '.decrease-quantity', function() {
    const title = $(this).closest('.cart-item').find('.cart-item-heading').text();
    shoppingCart.decreaseItemQuantity(title);
});
