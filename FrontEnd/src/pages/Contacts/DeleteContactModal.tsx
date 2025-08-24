import React from 'react';
import api from '../../services/api';
import * as Styles from './addContactModalStyles';
import { FiTrash2, FiX } from 'react-icons/fi';

interface DeleteContactModalProps {
  isOpen: boolean;
  contactId: string | number | null;
  contactName?: string;
  onClose: () => void;
  onDelete: (id: string | number) => void;
}

const DeleteContactModal: React.FC<DeleteContactModalProps> = ({ isOpen, contactId, contactName, onClose, onDelete }) => {
  if (!isOpen || !contactId) return null;

  async function handleDelete() {
    try {
      await api.delete(`/contacts/${contactId}`);
      onDelete(contactId as string | number);
      onClose();
    } catch {
      alert('Erro ao deletar contato!');
    }
  }

  return (
    <Styles.ModalOverlay>
      <Styles.ModalContent>
        <Styles.ModalHeader>
          <span>Excluir contato</span>
          <button onClick={onClose}><FiX size={22} /></button>
        </Styles.ModalHeader>
        <Styles.ModalBody>
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <FiTrash2 size={48} color="#ff3b3b" />
            <p style={{ marginTop: 16, fontSize: 18 }}>
              Tem certeza que deseja excluir <strong>{contactName || 'este contato'}</strong>?
            </p>
          </div>
        </Styles.ModalBody>
        <Styles.ModalFooter>
          <Styles.CancelBtn onClick={onClose}>Cancelar</Styles.CancelBtn>
          <Styles.SaveBtn style={{ background: '#ff3b3b' }} onClick={handleDelete}>Excluir</Styles.SaveBtn>
        </Styles.ModalFooter>
      </Styles.ModalContent>
    </Styles.ModalOverlay>
  );
};

export default DeleteContactModal;
