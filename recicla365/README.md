# Recicla365 - Plataforma de Gerenciamento de Resíduos e Pontos de Coleta

🌱 O Recicla365 é uma plataforma que visa facilitar o gerenciamento de resíduos e o acesso a pontos de coleta de materiais recicláveis. Com recursos como cadastro de novos pontos de coleta, localização de pontos próximos em um mapa interativo, visualização de informações sobre os materiais aceitos em cada ponto e registro de contribuições para a reciclagem, a plataforma busca incentivar práticas sustentáveis.

## Páginas

- **Login:** 🚪 Página de entrada para os usuários, onde é possível realizar o login na plataforma.
- **Cadastro de Usuários:** ✏️ Página para novos usuários se cadastrarem na plataforma.
- **Cadastro de Pontos de Coleta:** 📍 Permite o cadastro de novos pontos de coleta. Disponível apenas para usuários autenticados.
- **Dashboard:** 📊 Área restrita para usuários autenticados, apresentando uma visão geral e acesso rápido às funcionalidades principais.
- **Visualização de Usuários:** 👥 Permite visualizar informações sobre os usuários cadastrados. Disponível apenas para usuários autenticados.
- **Visualização de Pontos de Coleta:** 🗺️ Página pública para visualização de informações sobre os pontos de coleta disponíveis.
- **Gerenciamento de Pontos de Coleta:** 🛠️ Permite visualizar, editar e excluir pontos de coleta. Disponível apenas para usuários autenticados.

## Recursos

- **Cards:** 🃏 Utilizados para exibir informações sobre locais de coleta, usuários e dados relacionados.
- **ContextAPI:** 🔒 Gerencia o controle de acesso de usuários autenticados, garantindo a segurança das informações.
- **Integração com APIs:** 🌐 Utilização do viaCEP para obtenção automática de endereços e do nominatim (API OpenStreet Maps) para obtenção automática de coordenadas geográficas.
- **Responsividade:** 📱 Implementada com Material UI e Joy UI, garantindo uma experiência consistente em diferentes dispositivos.
- **Integração com Google Maps:** 🗺️ Ao visualizar o local de coleta, é possível acessar diretamente o Google Maps com a localização cadastrada (@profBruno o mapa com Leaflet não deu, mas isso aqui ficou muito bom também).
- **Modal de Confirmação:** ❓ Implementado para alteração e exclusão de informações, com confirmação do usuário antes da ação ser efetivada.
- **Página de Login Dinâmica:** 🎨 Utiliza wallpapers dinâmicos obtidos via API Unsplash Images, proporcionando uma experiência visual agradável.

## Próximos Passos

O MVP (Minimum Viable Product) da aplicação Front-End do Recicla365 foi desenvolvido com sucesso, oferecendo funcionalidades essenciais para a gestão de resíduos e pontos de coleta. Os próximos passos incluem a implementação de recursos adicionais, melhorias na interface do usuário e a integração com o back-end para uma experiência completa e integrada.

## Como Contribuir

Você pode contribuir para o Recicla365 de diversas formas:

- 💡 Sugerindo novas funcionalidades ou melhorias.
- 🐛 Reportando bugs ou problemas encontrados.
- 🌟 Compartilhando o projeto com outras pessoas.

## Licença

Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT).
