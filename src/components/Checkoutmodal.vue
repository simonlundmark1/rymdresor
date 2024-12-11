<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <header class="modal-header">
        <h2>BankID Betalning</h2>
      </header>
      <div class="modal-body">
        <img src="../../src/assets/qr.jpg" alt="QR Code to BankID" class="qr-code" />
        <p>Verifiera din betalning i BankID-appen.</p>
        <p>Om du inte har appen öppnad, starta den manuellt.</p>
        <button class="cancel-button" v-on:click="$emit('close')">Avbryt</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  inset: 0; /* Shorthand for top, right, bottom, left */
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeInOverlay 0.3s ease-in-out;
}

/* Modal Content */
.modal-content {
  background: #ffffff;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: slideUp 0.3s ease-in-out;
}

/* Header */
.modal-header {
  background: #005bac; /* BankID Blue */
  color: #ffffff;
  padding: 16px;
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
}

/* Body */
.modal-body {
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
  color: #333;
}

.modal-body p {
  margin: 16px 0;
  font-size: 1rem;
  line-height: 1.5;
}

.qr-code {
  display: block;
  margin: 0 auto 16px;
  width: 150px;
  height: 150px;
  object-fit: cover; /* Ensures QR code maintains aspect ratio */
  border: 2px solid #ddd;
  border-radius: 8px;
}

/* Cancel Button */
.cancel-button {
  background: #ff4444;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;
}

.cancel-button:hover {
  background: #ff6666;
}

/* Animations */
@keyframes fadeInOverlay {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>

