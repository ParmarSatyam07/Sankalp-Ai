# app.py now
from flask import Flask, jsonify, request, redirect, render_template
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import mysql.connector
import datetime, requests

# doc Engine imports
from search_engine import *

app = Flask(__name__)
app.secret_key = "SECRET_KEY"
CORS(app)
# CORS(app, supports_credentials=True)
# app.config.update(
#     SESSION_COOKIE_SECURE=False,  # Should be True if using HTTPS
#     SESSION_COOKIE_HTTPONLY=True,
#     SESSION_COOKIE_SAMESITE='None'
# )

bcrypt = Bcrypt(app)

# In-memory flag to track login status
session = {}

# MySQL Connection
mycon = mysql.connector.connect(
    host="localhost",
    user="root",
    password="gatij",
    database="user"
)

cur = mycon.cursor()
mycon.autocommit = True

# @app.after_request
# def add_cors_headers(response):
#     response.headers['Access-Control-Allow-Origin'] = request.headers.get('Origin', '*')
#     response.headers['Access-Control-Allow-Credentials'] = 'true'
#     return response

# -------------------------Search Engine Routes---------------------------------
click_chat = {"query":"", "summary":""}

@app.route('/')
def index():
    """Render the main search page."""
    return render_template('index.html')


merged_query=""
@app.route('/search_and_summarize', methods=['GET'])
def search_and_summarize():
    # data = request.get_json()
    # query = data.get('query')
    query = request.args.get('query')

    search_results = get_google_search_results(query)

    links = []
    combined_content = ""
    site_count = 0

    for item in search_results:
        title = item.get('title')
        link = item.get('link')
        links.append({"title": title, "link": link})

        # Print each link separately
        print(f"Link: {link} | Title: {title}")

        html_content = fetch_page_content(link)

        if "Failed to fetch content" in html_content:
            print(f"Skipping {title}: Failed to fetch content")
            continue

        # Prepare content for summary
        query_title = "title: " + query 
        html_content =  html_content
        content_for_summary = summarizer_system_prompt + query_title + "\n " + html_content
        
        # Extract visible text and combine it
        visible_text = extract_text_from_html(content_for_summary)
        combined_content += f"\n{visible_text}\n"

        site_count += 1
        if site_count >= 5:
            break

    # Generate summary
    summarized_text = summarize_with_gemini(combined_content)

    # Print summary separately
    print(f"Summary: {summarized_text}")

    response_data = {
        "query": query,
        "links": links,
        "summary": summarized_text.strip("`json ")
    }

    
    global click_chat, merged_query
    click_chat['query'] = query
    click_chat['summary'] = summarized_text.strip("`json")

    merged_query = chat_system_prompt + click_chat['query'] + click_chat['summary'] # Always generate a merged query
    return jsonify(response_data)

# chat_system_prompt = chat_system_prompt+ click_chat['summary']

# @app.route('/chat', methods=['GET'])
# def chat_bot():
#     summary = request.args.get('summary')
#     return render_template('chat.html', summary=summary)

# @app.route('/chat_with_gemini', methods=['GET','POST'])

def chat_with_gemini(query):
    # global click_chat
    # user_message = request.args.get('query')
    user_message=query
    # click_chat['query'] = user_message # click_chat['query']=empty
    print(user_message)
    # summary = request.json.get('summary')
    # chat_system_prompt = chat_system_prompt+ click_chat['response']
    
    # chat_with_gemini.chat_memory = f"{chat_system_prompt} {summary}"
    context = f"User: {user_message}"
    # print(context)
    # chat_mem=chat_with_gemini.chat_memory
    # Build the context for the chat with the user message and summary
    # context = f"{summary}\n\nUser: {user_message}"

    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "contents": [
            {
                "parts": [
                    {"text": context},
                    # {"chat_memory":chat_mem}
                ]
            }
        ]
    }
    try:
        response = requests.post(GEMINI_API_URL, headers=headers, json=data)
        response.raise_for_status()
        response_data = response.json()
        print("Response Data : ",response_data)


        candidates = response_data.get('candidates', [])
        if candidates and isinstance(candidates, list):
            content = candidates[0].get('content', {})
            parts = content.get('parts', [])
            if parts and isinstance(parts, list):
                gemini_reply = parts[0].get('text', "No response available")
            else:
                gemini_reply = "Failed to parse Gemini's response."
        else:
            gemini_reply = "Unexpected response structure from Gemini API."

    except requests.exceptions.RequestException as e:
        print(f"Failed to interact with Gemini API: {str(e)}")
        gemini_reply = "Failed to interact with Gemini API."

    return str(gemini_reply)

@app.route('/generate_document', methods=['POST'])
def generate_document():
    # Get the data sent from the user
    data = request.get_json()
    chat_data = data.get('chat_data')          
    summary_data = data.get('summary_data', '')    
    previous_doc_data = data.get('previous_doc_data', '')  
    format_prompts = """
    # Summary of Research Findings
    **Generated by: [Pragati.ai-Research Engine]**
    **Date and Time: [Generation Date and Time] catch it reatime time and date generator**

    ## Case Reference: [Case Number/Identifier]

    ### I. Introduction
    A. Background of the Case
    B. Scope of Research

    ### II. Summary of Saved Chat Data
    A. Key Points from Decision Facilitator Engine
    B. Relevant User Interactions
    C. Model Consultancy Insights

    ### III. Analysis of Saved Summary Data
    A. Overview of summary Results
    B. LLM Summarizer Findings
    C. Synthesis of Information from Various Sources

    ### IV. Review of Previously Saved Document Data
    A. Relevant Legal Precedents
    B. Applicable Procedures and Arguments
    C. Potential Case Outcomes

    ### V. Conclusions and Recommendations
    A. Primary Findings
    B. Suggested Course of Action
    C. Potential Implications

    ### VI. Appendices
    A. List of Referenced Documents
    B. Glossary of Key Terms
    C. Additional Supporting Information

    ------------------------------------------------------------------------------

    *This document is a computer-generated summary based on the data collected and analyzed by [Research Engine Name]. While efforts have been made to ensure accuracy, this summary should not be considered as legal advice. Please consult with a qualified legal professional for interpretation and application of this information.*"""

    # Combine all data into one prompt
    prompt = f"""
    Definitions for the terms used in the prompts below
    Saved_chat_data : It is a collection of previously saved chat information that has been generated while using decision facilitator engine( a decision facilitator in gym is used for having interaction with user and model consultancy to have help in their decision making process provide procedure arguments acts and further case outcome consideration and another related queries)
    Saved_summary_data : It is a collection of previously saved summary information that has been generated while using Search engine and llm summarizer of the data extracted from different websites and the relvent resources according the user query to the search engine
    Previously_saved_document_data : These are the previously generated document via the document generator also get some format ides from these legal documents
    
    
    use this Saved_Chat_Data for summary document Generation:
    {chat_data}

    use this Saved_summary_data Data:
    {summary_data}

    use this Previously_saved_document_data for generating newer summary documents:
    {previous_doc_data}

    use these Formatting_Instructions for the according to the proper document required by the user need to provide by summary document generation:
    {format_prompts}

    RESPONSE:: Please generate a summary of the all the data used from chat_data,summary data and previous_doc_data Formatting Instructions above.
    """

    # Send the prompt to the Gemini API
    document_content = generate_document_with_gemini(prompt)

    # Return the document content as JSON
    return jsonify({"document_content": document_content})
# -----------------------------------------------------------------------------------
@app.route('/api/register', methods=['GET', 'POST'])
def register_user():
    if request.method == "POST":
        data = request.get_json()

        first_name = data.get("firstName")
        last_name = data.get("lastName")
        email = data.get("email")
        dob = data.get("dob")
        username = data.get("username")
        password = data.get("password")
        gender = data.get("gender")

        date_obj = datetime.datetime.strptime(dob, '%Y-%m-%d')
        dob = date_obj.strftime('%Y-%m-%d')
        profession = data.get('profession')
        bio = data.get('bio')
        
        hash_password = bcrypt.generate_password_hash(password, 10).decode('utf-8')
        
        cur.execute("SELECT username FROM user WHERE username=%s OR email=%s", (username, email))
        user = cur.fetchall()
        if not user:
            cur.execute("INSERT INTO user (first_name, last_name, email, dob, username, password_hash, gender, profession, bio) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)", 
                        (first_name, last_name, email, dob, username, hash_password, gender, profession, bio))
            cur.execute("SELECT id, username FROM user WHERE username=%s OR email=%s", (username, email))
            user = cur.fetchall()
            # session['user_id'] = user[0][0]
            # session['username'] = user[0][1]
            cur.execute("INSERT INTO library (user_id, list_of_chat_id, list_of_search_id, list_of_doc_id) VALUES (%s, '[]', '[]', '[]')", (user[0][0],))
            return jsonify({"message": "Registration successful", "redirect": "/api/login/"}), 200
        else:
            return jsonify({"message": "Username or Email already exists"}), 401

    return jsonify({'message': 'Load Registration page'}), 200

@app.route('/api/login', methods=['GET', 'POST'])
def login_user():
    # if request.method == 'OPTIONS':
    #     response = jsonify()
    #     response.headers['Access-Control-Allow-Methods'] = 'POST'
    #     response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    #     response.headers['Access-Control-Allow-Credentials'] = 'true'
    #     return response
    if 'user_id' in session:
        return jsonify({"message": "You are already logged in as " + session['username']}), 401
    else:
        if request.method == "POST":
            data = request.get_json()
            username = data.get('username')
            password = data.get('password')

            cur.execute("SELECT * FROM user WHERE username=%s", (username,))
            user = cur.fetchall()
            if user:
                if bcrypt.check_password_hash(user[0][3], password):
                    session['user_id'] = user[0][0]
                    session['username'] = user[0][1]
                    return jsonify({'message': 'Login Successful', 'username': username}), 200
                else:
                    return jsonify({'message': 'Invalid password'}), 401
            else:
                return jsonify({'message': 'User does not exist'}), 401
        return jsonify({'message': 'Load Login Page'}), 200

@app.route('/api/logout', methods=['GET'])
def logout_user():
    if 'user_id' in session:
        session.clear()    
        return jsonify({'message': 'Logout Successful'}), 200
    else:
        return jsonify({'message': 'No user logged in'}), 400



@app.route('/api/<string:username>/dashboard', methods=['GET'])
def user_dashboard(username):
    if 'user_id' in session:
        if session['username'] == username:
            cur.execute("SHOW COLUMNS FROM user")
            fields=[item[0] for item in cur.fetchall()]
            # print(fields)
            cur.execute("SELECT * FROM user WHERE id=%s AND username=%s", (session['user_id'], session['username']))
            user = cur.fetchone()
            user_data={fields[i]:user[i] for i in range(len(fields))}
            
            # print(user_data)
            return jsonify({'message': 'Dashboard Loaded', 'user_data': user_data})
        else:
            return jsonify({'message': 'You are not the owner of this chat', 'task': 'redirect the user to /api/login'}), 401
    else:
        return jsonify({'message': 'You are not logged in', 'task': 'redirect the user to /api/login'}), 401

# @app.route('/api/dummy_post', methods=['POST'])
# def dummy_post():
#     return jsonify({'message': 'Dummy POST request received'}), 200

@app.route('/api/<string:username>/chats', methods=['GET', 'POST'])
def chatrooms(username):
    if 'user_id' in session:
        if session['username'] == username:
            if request.method == "POST": # When user clicks on Chat with Summary
                global click_chat
                title = click_chat['query']
                query = click_chat['query']
                response = chat_with_gemini(merged_query) # Send merged query to Gemini API and get back the response

                cur.execute("INSERT INTO chatroom_data (user_id, title) VALUES (%s, %s)", (session['user_id'], title))
                cur.execute("SELECT chatroom_id FROM chatroom_data WHERE user_id=%s ORDER BY chatroom_id DESC LIMIT 1", (session['user_id'],))
                new_chatroom_id = cur.fetchall()[0][0]
                print(new_chatroom_id)

                cur.execute("INSERT INTO chat_data (chatroom_id, query, response) VALUES (%s, %s, %s)", (new_chatroom_id, query, response))

                return redirect("/api/{}/chats/{}".format(session['username'], new_chatroom_id))
            
            else:
                cur.execute("SELECT chatroom_id, title FROM chatroom_data WHERE user_id=%s", (session['user_id'],))
                result = [{'chatroom_id': item[0], 'title': item[1]} for item in cur.fetchall()][::-1]
                return jsonify({'user_id': session['user_id'], 'username': session['username'], 'chatrooms': result})
        else:
            return jsonify({'message': 'You are not the owner of this chat', 'task': 'redirect the user to /api/login'}), 401
    else:
        return jsonify({'message': 'You are not logged in', 'task': 'redirect the user to /api/login'}), 401

@app.route('/api/<string:username>/chats/<int:chatroom_id>', methods=['GET','POST'])
def chat(username, chatroom_id):
    if 'user_id' in session:
        if session['username'] == username:
            if request.method == "POST":
                # Get the new user query
                data = request.get_json()
                query = data.get("query")
                
                
                # Check if there exists any chatroom with the given chatroom_id
                cur.execute("SELECT * FROM chatroom_data WHERE user_id=%s AND chatroom_id=%s", (session['user_id'], chatroom_id))
                
                if cur.fetchone():
                    # Fetch all chat history of the given chatroom in a single query
                    cur.execute("SELECT query, response FROM chat_data WHERE chatroom_id=%s", (chatroom_id,))
                    chat_history = cur.fetchall()
                    
                    # Create conversation text efficiently using join
                    if chat_history:
                        conversation_text = 'Previous conversation:-\n' + '\n'.join(
                            'Query: {}\nResponse: {}\n'.format(chat[0], chat[1]) for chat in chat_history
                        )
                    else:
                        conversation_text = 'Previous conversation:-\nNo conversation yet\n'
                    
                    # Add the new query to the conversation text and get the response
                    response = chat_with_gemini(conversation_text + "Now reply this:\n" + query)
                    
                    # Insert new chat data into the database
                    cur.execute("INSERT INTO chat_data (chatroom_id, query, response) VALUES (%s, %s, %s)", (chatroom_id, query, response))
                else:
                    # Create a new chatroom and add the new query when selectedChatroom(0)=>POST request
                    title = query # When selectedChatroom(0)=>POST request
                    cur.execute("INSERT INTO chatroom_data (user_id, title) VALUES (%s, %s)", (session['user_id'], title))
                    
                    # Retrieve the newly created chatroom_id
                    cur.execute("SELECT LAST_INSERT_ID()")
                    new_chatroom_id = cur.fetchone()[0]
                    
                    # Get the response for the new query
                    response = chat_with_gemini(query)
                    
                    # Insert new chat data into the database
                    cur.execute("INSERT INTO chat_data (chatroom_id, query, response) VALUES (%s, %s, %s)", (new_chatroom_id, query, response))
                
                # Redirect to the GET endpoint for the updated chatroom
                return redirect("/api/{}/chats/{}".format(session['username'], chatroom_id if 'new_chatroom_id' not in locals() else new_chatroom_id))
            else:
                cur.execute("SELECT chat_id, query, response FROM chatroom_data, chat_data WHERE (chat_data.chatroom_id=%s AND chatroom_data.chatroom_id=%s) AND user_id=%s", 
                            (chatroom_id, chatroom_id, session['user_id']))
                result = [{'chat_id': item[0], 'query': item[1], 'response': item[2]} for item in cur.fetchall()]
                return jsonify({'user_id': session['user_id'], 'username': session['username'], 'chatroom_id': chatroom_id, 'chat_data': result})
        else:
            return jsonify({'message': 'You are not the owner of this chat', 'task': 'redirect the user to /api/login'}), 401
    else:
        return jsonify({'message': 'You are not logged in', 'task': 'redirect the user to /api/login'}), 401

@app.route('/api/<string:username>/recent_chats', methods=['GET'])
def get_recent_chats(username):
    if 'user_id' in session:
        if session['username'] == username:
            cur.execute("SELECT chat_id, query, response FROM chatroom_data, chat_data WHERE chatroom_data.chatroom_id=chat_data.chatroom_id AND user_id=%s", (session['user_id'],))
            recent_chats = [{'chat_id': item[0], 'query': item[1],'response': item[2]} for item in cur.fetchall()][-4:][::-1]
            return jsonify({'recent_chats': recent_chats})
        else:
            return jsonify({'message': 'You are not the owner of this chat', 'task': 'redirect the user to /api/login'}), 401
    else:
        return jsonify({'message': 'You are not logged in', 'task': 'redirect the user to /api/login'}), 401

@app.route('/api/<string:username>/library', methods=['GET'])
def get_library_data(username):
    if 'user_id' in session:
        if session['username'] == username:
            cur.execute("SELECT list_of_chat_id, list_of_search_id, list_of_doc_id FROM library WHERE user_id=%s", (session['user_id'],))
            library_data=cur.fetchall()[0]
            print(library_data)
            library_chat_list = eval(library_data[0])
            library_search_list =eval(library_data[1])
            library_doc_list = eval(library_data[2])

            chat_data_list = []
            search_data_list = []
            doc_data_list = []
            
            for chat_id in library_chat_list:
                cur.execute("SELECT query, response FROM chat_data WHERE chat_id=%s", (int(chat_id),))
                row = cur.fetchone()
                if row:
                    chat_data_list.append({"chat_id": chat_id, "query": row[0], "response": row[1]})
            for search_id in library_search_list:
                cur.execute("SELECT query, response FROM search_data WHERE search_id=%s", (int(search_id),))
                row = cur.fetchone()
                if row:
                    search_data_list.append({"search_id": search_id, "query": row[0], "response": row[1]})
            for doc_id in library_doc_list:
                cur.execute("SELECT generated_doc FROM doc_data WHERE doc_id=%s", (int(doc_id),))
                row = cur.fetchone()
                print(row)
                if row:
                    doc_data_list.append({"doc_id": doc_id, "generated_doc": row[0]})
            return jsonify({"library_chat_data": chat_data_list, "library_search_data": search_data_list, "library_doc_data": doc_data_list, "username": username})
    return jsonify({'message': 'You are not logged in', 'task': 'redirect the user to /api/login'}), 401

@app.route('/api/<string:username>/library/save_chat', methods=["POST"])
def save_chat_to_library(username):
    if 'user_id' in session:
        if session['username'] == username:
            if request.method=="POST":
                data = request.json
                chat_id = data['chat_id']
                # Retrieve the list of chat IDs from the library table
                cur.execute("SELECT list_of_chat_id FROM library WHERE user_id={}".format(session['user_id']))
                library_chat_list = eval(cur.fetchone()[0])
                if chat_id in library_chat_list:
                    return jsonify({"message":"Chat already saved in Library"}), 400
                else:
                    library_chat_list.append(chat_id)
                    cur.execute("UPDATE library SET list_of_chat_id = '{}' WHERE user_id={}".format(library_chat_list, session['user_id']))
                    return jsonify({"message":"Saved to library"})
        else:
            return jsonify({'message':'You are not the owner of this chat', 'task':'redirect the user to /api/login'}), 401
    else:
        return jsonify({'message':'You are not logged in', 'task':'redirect the user to /api/login'}), 401
@app.route('/api/<string:username>/library/save_search', methods=["POST"])
def save_search_to_library(username):
    if 'user_id' in session:
        if session['username'] == username:
            if request.method=="POST":
                data = request.json
                query= data.get('query')
                response = data.get('response')
                print(response)
                print(type(response))
                response_to_save=response['summary']+" ".join(items['title'] + ' -> ' + items['link'] + '\n' for items in response['links'])
                cur.execute("INSERT INTO search_data (user_id, query, response) VALUES(%s, %s, %s)", (session['user_id'], query, response_to_save))
                cur.execute("SELECT search_id FROM search_data WHERE user_id=%s ORDER BY search_id DESC LIMIT 1", (session['user_id'],))
                search_id = cur.fetchall()[0][0]
                # Retrieve the list of chat IDs from the library table
                cur.execute("SELECT list_of_search_id FROM library WHERE user_id={}".format(session['user_id']))
                library_search_list = eval(cur.fetchone()[0])
                if search_id in library_search_list:
                    return jsonify({"message":"Search already saved in Library"}), 400
                else:
                    library_search_list.append(search_id)
                    cur.execute("UPDATE library SET list_of_search_id = '{}' WHERE user_id={}".format(library_search_list, session['user_id']))
                    return jsonify({"message":"Saved to library"})
        else:
            return jsonify({'message':'You are not the owner of this chat', 'task':'redirect the user to /api/login'}), 401
    else:
        return jsonify({'message':'You are not logged in', 'task':'redirect the user to /api/login'}), 401
@app.route('/api/<string:username>/library/save_doc', methods=["POST"])
def save_doc_to_library(username):
    if 'user_id' in session:
        if session['username'] == username:
            if request.method=="POST":
                data = request.json
                generated_doc = data.get('generated_doc')
                print(generated_doc)
                print(type(generated_doc))
                
                cur.execute("INSERT INTO doc_data (user_id, generated_doc) VALUES(%s, %s)", (session['user_id'], generated_doc))
                cur.execute("SELECT doc_id FROM doc_data WHERE user_id=%s ORDER BY doc_id DESC LIMIT 1", (session['user_id'],))
                doc_id = cur.fetchall()[0][0]
                # Retrieve the list of chat IDs from the library table
                cur.execute("SELECT list_of_doc_id FROM library WHERE user_id={}".format(session['user_id']))
                library_doc_list = eval(cur.fetchone()[0])
                if doc_id in library_doc_list:
                    return jsonify({"message":"doc already saved in Library"}), 400
                else:
                    library_doc_list.append(doc_id)
                    cur.execute("UPDATE library SET list_of_doc_id = '{}' WHERE user_id={}".format(library_doc_list, session['user_id']))
                    return jsonify({"message":"Saved to library"})
        else:
            return jsonify({'message':'You are not the owner of this chat', 'task':'redirect the user to /api/login'}), 401
    else:
        return jsonify({'message':'You are not logged in', 'task':'redirect the user to /api/login'}), 401
if __name__ == '__main__':
    app.run(debug=True)
