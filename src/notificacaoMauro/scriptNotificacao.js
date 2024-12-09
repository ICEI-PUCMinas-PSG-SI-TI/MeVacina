// Função para buscar notificações da API
async function fetchNotifications() {
    try {
      const response = await fetch("http://localhost:3000/notifications");
      const notifications = await response.json();
      displayNotifications(notifications);
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    }
  }

  // Função para exibir notificações na lista
  function displayNotifications(notifications) {
    const notificationList = document.getElementById("notification-list");
    notificationList.innerHTML = ""; // Limpar lista de notificações

    notifications.forEach(notification => {
      const listItem = document.createElement("div");
      listItem.classList.add("notification-list-item");

      listItem.innerHTML = `
        <div class="notification-icon"></div>
        <div>
          <h4>${notification.title}</h4>
          <p>${notification.source}</p>
        </div>
      `;

      // Adiciona evento de clique para exibir a notificação completa
      listItem.addEventListener("click", () => {
        displayNotificationDetails(notification);
      });

      notificationList.appendChild(listItem);
    });
  }

  // Função para exibir detalhes da notificação selecionada
  function displayNotificationDetails(notification) {
    const notificationWindow = document.getElementById("notification-window");
    notificationWindow.innerHTML = `
      <h3>${notification.title} - ${notification.source}</h3>
      <p>${notification.content}</p>
    `;
  }

  // Carregar notificações ao carregar a página
  window.onload = fetchNotifications;

 