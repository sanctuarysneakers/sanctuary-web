class Sneaker:
    def __init__(self, brand, size, model, price):
        self.brand = brand
        self.size = size
        self.model = model
        self.price = price

    def __str__(self):
        return ('Brand: ' + self.brand + '\n' + 'Size: ' + self.size + '\n' + 'Model: ' + self.model + '\n' + 'Price : '
                + self.price)