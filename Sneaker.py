class Sneaker:
    """ Represents a single pair of sneakers."""

    def __init__(self, brand, size, model, price, url, img_url):
        """Initialize a new pair of sneakers.

        Arguments:
            (str) brand: The brand of this pair of shoes.
            (int) size: The size of the pair shoes.
            (str) model: The specific model of the shoes.
            (float) price: The current listing price for the pair.
            (str) url: The URL for this pair.
            (str) img_url: The URL for the posted picture of this pair of shoes.

        Returns:
            nothing
        """
        self.brand = brand
        self.size = size
        self.model = model
        self.price = price
        self.url = url
        self.img_url = img_url

    def __str__(self):
        """ Prints all of the information for this pair of shoes."""
        return ('Brand: ' + self.brand + '\n' + 'Size: ' + self.size + '\n' + 'Model: ' + self.model + '\n' + 'Price : '
                + self.price + '\n' + 'URL: ' + self.url + '\n' + 'Image URL: ' + self.img_url)

    def get_brand(self):
        """ Getter method for the brand."""
        return self.brand

    def get_size(self):
        """ Getter method for the size."""
        return self.size

    def get_model(self):
        """ Getter method for the model."""
        return self.model

    def get_price(self):
        """ Getter method for the price."""
        return self.price

    def get_url(self):
        """ Getter method for the URL."""
        return self.url

    def get_img(self):
        """ Getter method for the image URL."""
        return self.img_url
