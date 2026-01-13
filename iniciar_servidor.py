import http.server
import socketserver
import webbrowser
import os

# --- Configurações ---
PORTA = 8000
ENDERECO_WEB = f"http://localhost:{PORTA}"

# --- Lógica do Servidor ---

# Define o manipulador para servir os arquivos do diretório atual
Handler = http.server.SimpleHTTPRequestHandler

# Cria o servidor
httpd = socketserver.TCPServer(("", PORTA), Handler)

# Mensagem de inicialização que aparecerá na janela preta
print(f"Servidor local iniciado para o site Aurum!")
print(f"Acesse o site em: {ENDERECO_WEB}")
print("Pressione Ctrl+C ou feche esta janela para parar o servidor.")

# Tenta abrir o navegador automaticamente
try:
    webbrowser.open_new(ENDERECO_WEB)
    print("Seu navegador deve abrir automaticamente.")
except Exception as e:
    print(f"Não foi possível abrir o navegador automaticamente: {e}")

# Inicia o servidor e o mantém rodando até ser interrompido
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServidor interrompido.")
    httpd.server_close()