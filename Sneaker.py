class Sneaker:
    def __init__(self, brand, size, model, price, url, img_url):
        self.brand = brand
        self.size = size
        self.model = model
        self.price = price
        self.url = url
        self.img_url = img_url

    def __str__(self):
        return ('Brand: ' + self.brand + '\n' + 'Size: ' + self.size + '\n' + 'Model: ' + self.model + '\n' + 'Price : '
                + self.price + '\n' + 'URL: ' + self.url)
