import db
import json
from datetime import datetime, timedelta

class Cache:
	
	def __init__(self):
		self.db = db.Client()

	def get(self, params, hours=0, minutes=30):
		self.db.commit()
		query = "SELECT * FROM Cache WHERE RequestBody=%s;"
		self.db.execute(query, (json.dumps(params),))
		cached_data = self.db.fetchone()
		acceptable_time = datetime.now() - timedelta(hours=hours, minutes=minutes)

		if cached_data and cached_data["RequestTime"] > acceptable_time:
			return json.loads(cached_data["ResponseData"])
		return None

	def set(self, source, params, data):
		if data:
			query = "REPLACE INTO Cache VALUES (%s, %s, %s, %s);"
			self.db.execute(query, 
				(source, json.dumps(params), json.dumps(data), datetime.now())
			)
			self.db.commit()
