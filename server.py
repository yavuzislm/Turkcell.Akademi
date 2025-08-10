from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

users = {
    "admin@example.com": "yavuz1234",
    "yavuz@example.com": "yavuz1234"
}


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    print("Email:", email)
    print("Password:", password)

    # Örnek dönüş: İlerde kontrol buraya gelebilir
    if email == "admin@example.com" and password == "yavuz1234":
        return jsonify({'status': 'success', 'message': 'Giriş başarılı!','user': 'admin'})
    if email == "yavuz@example.com" and password == "yavuz1234":
        return jsonify({'status': 'success', 'message': 'Giriş başarılı!','user': 'student'})
    else:
        return jsonify({'status': 'fail', 'message': 'Geçersiz bilgiler'}), 401


if __name__ == '__main__':
    app.run(debug=True)