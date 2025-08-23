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
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  if (!isOpen) return null;

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  function handleSave() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Usuário não autenticado. Faça login novamente.');
      return;
    }

    api.post(
      '/contacts',
      { nome: name, telefone: phone, email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        console.log('Contato salvo com sucesso:', response.data);
        onSave(response.data as { name: string; phone: string; email: string; avatar?: string });
        setName('');
        setPhone('');
        setEmail('');
        setAvatar(undefined);
        setAvatarFile(null);
        onClose();
      })
      .catch((error) => {
        console.error('Erro ao salvar contato:', error);
        alert('Erro ao salvar contato: ' + (error?.response?.data?.message || error.message));
      });
  }

  function handleCancel() {
    setName('');
    setPhone('');
    setEmail('');
    setAvatar(undefined);
    setAvatarFile(null);
    onClose();
  }

  return (
    <Styles.ModalOverlay>
      <Styles.ModalContent>
        <Styles.ModalHeader>
          <span>Adicionar contato</span>
          <button onClick={onClose}><FiX size={22} /></button>
        </Styles.ModalHeader>
        <Styles.ModalBody>
          <Styles.AvatarBox>
            {avatar ? (
              <img src={avatar} alt="Avatar" />
            ) : (
              <Styles.AvatarIcon><FiUser size={48} /></Styles.AvatarIcon>
            )}
            <Styles.UploadLabel htmlFor="avatar-upload">
              <FiUpload /> + Adicionar foto
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
          <Styles.CancelBtn onClick={handleCancel}>Cancelar</Styles.CancelBtn>
          <Styles.SaveBtn onClick={handleSave}>Salvar</Styles.SaveBtn>
        </Styles.ModalFooter>
      </Styles.ModalContent>
    </Styles.ModalOverlay>
  );
}
