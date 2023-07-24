# Importing the necessary Libraries
import requests
from main import text_to_speech

# import request
app = Flask(__name__)

url = "https://api.quicknode.com/quickalerts/rest/v1/notifications"

payload = {}

headers = {
    'accept': 'application/json',
    'x-api-key': 'QN_90ad0eaca19a48298614366f8474d087'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)


if __name__ == "__main__":
    app.run(port=8000, debug=True)
