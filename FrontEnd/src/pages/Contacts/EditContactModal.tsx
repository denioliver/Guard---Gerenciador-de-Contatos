import { useState, useEffect } from 'react';
import { FiX, FiUser, FiUpload } from 'react-icons/fi';
import * as Styles from './addContactModalStyles';
import api from '../../services/api';

type ContactType = {
  id: number;
  name: string;
  type: string;
  phone: string;
  email: string;
  avatar?: string;
};

interface EditContactModalProps {
  isOpen: boolean;
  contact: ContactType | null;
  onClose: () => void;
  onSave: (contact: ContactType) => void;
}

export default function EditContactModal({ isOpen, contact, onClose, onSave }: EditContactModalProps) {
  const [name, setName] = useState(contact?.name ?? '');
  const [phone, setPhone] = useState(contact?.phone ?? '');
  const [email, setEmail] = useState(contact?.email ?? '');
  const [avatar, setAvatar] = useState<string | undefined>(contact?.avatar);

  useEffect(() => {
    setName(contact?.name ?? '');
    setPhone(contact?.phone ?? '');
    setEmail(contact?.email ?? '');
    setAvatar(contact?.avatar);
  }, [contact]);

  useEffect(() => {
    setName(contact?.name ?? '');
    setPhone(contact?.phone ?? '');
    setEmail(contact?.email ?? '');
    setAvatar(contact?.avatar);
  }, [contact]);

  if (!isOpen || !contact) return null;

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  async function handleSave() {
    if (!contact) return;
    try {
      const response = await api.put(`/contacts/${contact.id}`, {
        nome: name,
        telefone: phone,
        email,
        avatar,
        type: contact.type,
      });
      const data = response.data as {
        _id?: number | string,
        nome?: string,
        telefone?: string,
        email?: string,
        avatar?: string,
        type?: string
      };
      onSave({
        id: data._id || contact.id,
        name: data.nome || name,
        phone: data.telefone || phone,
        email: data.email || email,
        avatar: data.avatar || avatar,
        type: data.type || contact.type,
      });
    } catch {
      alert('Erro ao editar contato!');
    }
    onClose();
  }

  function handleCancel() {
    if (contact) {
      setName(contact.name);
      setPhone(contact.phone);
      setEmail(contact.email);
      setAvatar(contact.avatar);
    }
    onClose();
  }

  return (
    <Styles.ModalOverlay>
      <Styles.ModalContent>
        <Styles.ModalHeader>
          <span>Editar contato</span>
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
              <FiUpload /> Substituir
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
          <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
            <Styles.CancelBtn onClick={handleCancel}>Cancelar</Styles.CancelBtn>
            <Styles.SaveBtn onClick={handleSave}>Salvar</Styles.SaveBtn>
          </div>
        </Styles.ModalFooter>
      </Styles.ModalContent>
    </Styles.ModalOverlay>
  );
}
