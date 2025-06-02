# Stripe React Integration

Полноценный пример интеграции Stripe:
- React frontend с вводом суммы
- Node.js backend (Express)
- PostgreSQL для хранения платежей
- Stripe Webhook

## 🚀 Запуск

1. Установи Stripe CLI и выполни:
   ```bash
   stripe login
   stripe listen --forward-to localhost:4242/webhook
