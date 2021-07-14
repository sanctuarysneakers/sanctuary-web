import mysql.connector as mc
import os
from dotenv import load_dotenv

load_dotenv()
host = os.environ.get("DB_HOST")
user = os.environ.get("DB_USER")
password = os.environ.get("DB_PASSWORD")

class Client:

	def __init__(self):
		self.connect()

	def connect(self):
		self.conn = mc.connect(host=host, user=user, passwd=password)
		self.cursor = self.conn.cursor(dictionary=True)
		self.cursor.execute("USE Main;")

	def execute(self, query, values=None):
		try:
			self.cursor.execute(query, values)
		except:
			self.connect()
			self.cursor.execute(query, values)
	
	def commit(self):
		try:
			self.conn.commit()
		except:
			self.connect()
	
	def fetchone(self):
		return self.cursor.fetchone()
