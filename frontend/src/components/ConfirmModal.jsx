import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', type = 'danger' }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content glass-panel" style={{ maxWidth: '400px', padding: '32px' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{ 
            padding: '16px', 
            borderRadius: '50%', 
            background: type === 'danger' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)',
            color: type === 'danger' ? '#ef4444' : 'var(--accent-color)'
          }}>
            <AlertTriangle size={32} />
          </div>
        </div>

        <h3 className="auth-title" style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '32px', lineHeight: '1.5' }}>
          {message}
        </p>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="glass-button secondary" style={{ flex: 1 }} onClick={onClose}>
            Cancel
          </button>
          <button 
            className="glass-button" 
            style={{ 
              flex: 1, 
              background: type === 'danger' ? 'linear-gradient(135deg, #ef4444, #b91c1c)' : 'var(--accent-gradient)',
              boxShadow: type === 'danger' ? '0 8px 20px rgba(239, 68, 68, 0.2)' : 'var(--accent-glow)'
            }} 
            onClick={() => { onConfirm(); onClose(); }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
