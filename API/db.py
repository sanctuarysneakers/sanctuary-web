import mysql.connector
from mysql.connector import cursor

class DB:
	host = "mysql-db-master.cmamugrum56i.us-west-2.rds.amazonaws.com"
	user = "admin"
	password = "4tDqfnvbQ8R8RGuh"

	def __init__(self):
		self.connect()

	def connect(self):
		self.conn = mysql.connector.connect(
			host=DB.host, user=DB.user, passwd=DB.password
		)
		self.cursor = self.conn.cursor(dictionary=True)
		self.cursor.execute("USE sneakers;")

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
			self.conn.commit()
	
	def fetchone(self):
		return self.cursor.fetchone()
