# search_engine.py now

import requests
from urllib.parse import urlparse
from bs4 import BeautifulSoup

# app = Flask(__name__)
# CORS(app)

summarizer_system_prompt = (
    """Role: {commercial courts research engine} {act} summarize the text by following the summarizer template: Task: Summarize the provided text.

Input:

Context: The text provided is about [brief context of the text]. The goal is to condense the main points into a shorter summary.
Data: The text includes details about [specific points or topics covered in the text].
Instructions:

Step 1: Read the entire text carefully to understand the main ideas.
Step 2: Identify the key points or arguments presented in the text.
Step 3: Write a brief summary that captures the essence of these points, ensuring it remains concise and clear.
Output Format:

Title: Summary of [title or subject of the text]
Sections:
Main Points: List or describe the 3 most important points or themes discussed in the text.
Key Details: Highlight any specific data, examples, or arguments that are crucial to understanding the text.
Summary: Provide a brief conclusion that encapsulates the overall message or takeaway from the text.
Additional Notes: Ensure the summary is no longer than [desired length, e.g., one paragraph]. Avoid including minor details or repetitive information."""
)

chat_system_prompt = (
    "Role: {commercial courts chat engine} and act: {discuss the user inquiry according to the laws, acts, and regulations of the commercial court and the high court}"
)

GOOGLE_API_KEY = "AIzaSyAdbpw9MNQZyMW-otDmKNpw5T0tkJ_wpG8"
CSE_ID = "c15a707c2b3424e24"
GEMINI_API_KEY = "AIzaSyAydnCg1CrsXj2Li3Br1tiNRnhzSNs84Wg"
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={GEMINI_API_KEY}"
# @app.route('/query', methods=['GET'])
def get_google_search_results(query):
    url = f"https://www.googleapis.com/customsearch/v1?q={query}&key={GOOGLE_API_KEY}&cx={CSE_ID}&gl=IN"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json().get('items', [])[:5]
    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch Google search results: {str(e)}")
        return []

def fetch_page_content(url):
    try:
        parsed_url = urlparse(url)
        if not all([parsed_url.scheme, parsed_url.netloc]):
            raise ValueError("Invalid URL format")

        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch content from {url}: {str(e)}")
        return f"Failed to fetch content from {url}"
    except ValueError as ve:
        print(f"Invalid URL: {ve}")
        return f"Invalid URL: {ve}"
    except Exception as e:
        print(f"An unexpected error occurred while fetching content: {str(e)}")
        return f"An unexpected error occurred while fetching content: {str(e)}"

def extract_text_from_html(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    for script in soup(["script", "style"]):
        script.extract()  # Remove JavaScript and CSS
    text = soup.get_text(separator=' ')
    return ' '.join(text.split())  # Clean up extra spaces

def summarize_with_gemini(text):
    headers = {
        "Content-Type": "application/json",
        "X-Google-Options": "tokenize=2048"
    }
    data = {
        "contents": [
            {
                "parts": [
                    {"text": text}
                ]
            }
        ],
        "model": "gemini-1.5-flash-latest"
    }
    try:
        response = requests.post(GEMINI_API_URL, headers=headers, json=data)
        response.raise_for_status()
        response_data = response.json()

        print("Gemini API Full Response:", response_data)

        candidates = response_data.get('candidates', [])
        if candidates and isinstance(candidates, list):
            content = candidates[0].get('content', {})
            parts = content.get('parts', [])
            if parts and isinstance(parts, list):
                return parts[0].get('text', "No summary available")
            else:
                return "Failed to parse response"
        else:
            return "Unexpected response structure from Gemini API"
    except requests.exceptions.RequestException as e:
        print(f"Failed to summarize text: {str(e)}")
        return "Summarization failed."
    except Exception as e:
        print(f"An unexpected error occurred: {str(e)}")
        return "Summarization failed."



def generate_document_with_gemini(prompt):
    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ]
    }

    try:
        response = requests.post(GEMINI_API_URL, headers=headers, json=data)
        response.raise_for_status()
        response_data = response.json()

        # Extract the text from Gemini's response
        candidates = response_data.get('candidates', [])
        if candidates:
            content = candidates[0].get('content', {})
            parts = content.get('parts', [])
            if parts:
                gemini_reply = parts[0].get('text', "No response available")
            else:
                gemini_reply = "Failed to get a valid response."
        else:
            gemini_reply = "No candidates found in response."

    except requests.exceptions.RequestException as e:
        print(f"Error communicating with Gemini API: {str(e)}")
        gemini_reply = "Error communicating with Gemini API."

    return gemini_reply