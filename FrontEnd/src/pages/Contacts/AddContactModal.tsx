import { useState } from 'react';
import * as Styles from './addContactModalStyles';
import { FiX, FiUser, FiUpload } from 'react-icons/fi';
import api from '../../services/api';

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contact: { name: string; phone: string; email: string; avatar?: string }) => void;
}

export default function AddContactModal({ isOpen, onClose, onSave }: AddContactModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState<string | undefined>(undefined);

  if (!isOpen) return null;

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  async function handleSave() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Usuário não autenticado. Faça login novamente.');
      return;
    }

    try {
      await api.get('/contacts');
      const response = await api.post(
        '/contacts',
        { nome: name, telefone: phone, email, avatar }
      );

      const contactData = response.data as { nome: string; telefone?: string; email?: string; _id: string };
      const savedContact = {
        name: contactData.nome,
        phone: contactData.telefone || '',
        email: contactData.email || '',
        avatar: avatar
      };

      onSave(savedContact);
      setName('');
      setPhone('');
      setEmail('');
      setAvatar(undefined);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar contato:', error);
      const errorObj = error as { response?: { data?: { message?: string } }, message?: string };
      alert('Erro ao salvar contato: ' + (errorObj?.response?.data?.message || errorObj.message || 'Erro desconhecido'));
    }
  }

  function handleCancel() {
    setName('');
    setPhone('');
    setEmail('');
    setAvatar(undefined);
    onClose();
  }

  return (
    <Styles.ModalOverlay>
      <Styles.ModalContent>
        <Styles.ModalHeader>
          <span>Adicionar contato</span>
          <button onClick={onClose}><FiX /></button>
        </Styles.ModalHeader>
        <Styles.ModalBody>
          <Styles.AvatarBox>
            {avatar ? (
              <img src={avatar} alt="Avatar" />
            ) : (
              <Styles.AvatarIcon><FiUser size={48} /></Styles.AvatarIcon>
            )}
            <Styles.UploadLabel htmlFor="avatar-upload">
              <FiUpload /> Adicionar foto
              <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
            </Styles.UploadLabel>
          </Styles.AvatarBox>
          <Styles.FormGroup>
            <Styles.Label>Nome</Styles.Label>
            <Styles.Input value={name} onChange={e => setName(e.target.value)} placeholder="Nome do contato" />
          </Styles.FormGroup>
          <Styles.FormGroup>
            <Styles.Label>Telefone</Styles.Label>
            <Styles.Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Número de telefone" />
          </Styles.FormGroup>
          <Styles.FormGroup>
            <Styles.Label>E-mail</Styles.Label>
            <Styles.Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email do contato" />
          </Styles.FormGroup>
        </Styles.ModalBody>
        <Styles.ModalFooter>
          <div></div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Styles.CancelBtn onClick={handleCancel}>Cancelar</Styles.CancelBtn>
            <Styles.SaveBtn onClick={handleSave}>Salvar</Styles.SaveBtn>
          </div>
        </Styles.ModalFooter>
      </Styles.ModalContent>
    </Styles.ModalOverlay>
  );
}
