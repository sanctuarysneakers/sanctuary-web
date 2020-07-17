from flask import Flask, render_template
import sqlite3

application = Flask(__name__)

# Setup connection to database
conn = sqlite3.connect("sneakers.db")
conn.row_factory = sqlite3.Row
c = conn.cursor()

c.execute("""SELECT ROUND(100*((lowest_ask_price-average_price)/(1.0*average_price))) AS "Percent Change", *
            FROM stockx_sneakers
            WHERE ((lowest_ask_price-average_price)/(1.0*average_price)) IS NOT NULL
                AND annual_sold > 150
                AND average_price > 120
                AND size=12
            ORDER BY 100*((lowest_ask_price-average_price)/(1.0*average_price));""")
conn.commit()
sneakers = [dict(row) for row in c.fetchall()]

@application.route("/")
@application.route("/home")
def home():
    return render_template('home.html', data=sneakers)

if __name__ == '__main__':
    application.run(debug=True)


conn.close()
