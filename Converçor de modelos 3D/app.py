import trimesh
import os

# --- CONFIGURAÇÃO ---
# Nome da pasta onde os arquivos convertidos serão salvos
PASTA_DE_SAIDA = 'convertidos_glb'

# Diretório onde o script está rodando (onde os arquivos .STL estão)
DIRETORIO_ATUAL = '.' 

# --- INÍCIO DO SCRIPT ---

def converter_arquivos_em_lote():
    """
    Função principal que encontra, converte e salva os arquivos STL para GLB.
    """
    print("Iniciando o script de conversão em lote...")
    
    # 1. Cria a pasta de saída se ela não existir
    if not os.path.exists(PASTA_DE_SAIDA):
        print(f"Criando a pasta de destino: '{PASTA_DE_SAIDA}'")
        os.makedirs(PASTA_DE_SAIDA)

    # 2. Encontra todos os arquivos .STL no diretório atual
    # O .lower() garante que encontremos .stl, .STL, .sTl, etc.
    arquivos_stl = [f for f in os.listdir(DIRETORIO_ATUAL) if f.lower().endswith('.stl')]

    if not arquivos_stl:
        print("Nenhum arquivo .STL encontrado na pasta atual. Encerrando o script.")
        return

    total_arquivos = len(arquivos_stl)
    print(f"Encontrados {total_arquivos} arquivos .STL para converter.")
    
    # Contadores para o relatório final
    sucesso = 0
    falhas = 0

    # 3. Itera sobre cada arquivo encontrado e o converte
    for i, nome_arquivo_stl in enumerate(arquivos_stl):
        # Monta o caminho completo do arquivo de entrada
        caminho_entrada = os.path.join(DIRETORIO_ATUAL, nome_arquivo_stl)

        # Cria o nome do arquivo de saída (ex: 'meu_modelo.stl' -> 'meu_modelo.glb')
        nome_base = os.path.splitext(nome_arquivo_stl)[0]
        nome_arquivo_glb = f"{nome_base}.glb"
        
        # Monta o caminho completo do arquivo de saída
        caminho_saida = os.path.join(PASTA_DE_SAIDA, nome_arquivo_glb)
        
        print(f"\n[{i+1}/{total_arquivos}] Convertendo '{nome_arquivo_stl}'...")

        try:
            # Carrega a malha do arquivo STL
            mesh = trimesh.load_mesh(caminho_entrada, process=False)
            
            # Exporta a malha para o formato GLB
            mesh.export(file_obj=caminho_saida, file_type='glb')
            
            print(f"✅ Sucesso! Salvo como '{caminho_saida}'")
            sucesso += 1
            
        except Exception as e:
            print(f"❌ ERRO ao converter '{nome_arquivo_stl}': {e}")
            falhas += 1

    # 4. Exibe o relatório final
    print("\n--- Processo Concluído! ---")
    print(f"Arquivos convertidos com sucesso: {sucesso}")
    print(f"Arquivos que falharam na conversão: {falhas}")
    print(f"Todos os arquivos convertidos estão na pasta '{PASTA_DE_SAIDA}'.")

# Executa a função principal do script
if __name__ == "__main__":
    converter_arquivos_em_lote()
