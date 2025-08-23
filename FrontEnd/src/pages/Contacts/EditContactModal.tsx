import { useState, useEffect } from 'react';
import { FiX, FiUser, FiUpload, FiTrash2, FiLock, FiUnlock } from 'react-icons/fi';
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
  onDelete: (id: number) => void;
}

export default function EditContactModal({ isOpen, contact, onClose, onSave, onDelete }: EditContactModalProps) {
  const [name, setName] = useState(contact?.name ?? '');
  const [phone, setPhone] = useState(contact?.phone ?? '');
  const [email, setEmail] = useState(contact?.email ?? '');
  const [avatar, setAvatar] = useState<string | undefined>(contact?.avatar);
  const [hidden, setHidden] = useState(false);

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
      const data = response.data as any;
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

  async function handleDelete() {
    if (contact) {
      try {
        await api.delete(`/contacts/${contact.id}`);
        onDelete(contact.id);
      } catch {
        alert('Erro ao deletar contato!');
      }
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
          <button onClick={onClose}><FiX size={22} /></button>
        </Styles.ModalHeader>
        <Styles.ModalBody>
          <Styles.AvatarBox>
            {hidden ? (
              <Styles.AvatarIcon><FiLock size={48} /></Styles.AvatarIcon>
            ) : avatar ? (
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
            <Styles.Input value={hidden ? '••••••••••' : name} onChange={e => setName(e.target.value)} placeholder="Nome do contato" disabled={hidden} />
          </Styles.FormGroup>
          <Styles.FormGroup>
            <Styles.Label>Telefone</Styles.Label>
            <Styles.Input value={hidden ? '••••••••••' : phone} onChange={e => setPhone(e.target.value)} placeholder="Número de telefone" disabled={hidden} />
          </Styles.FormGroup>
          <Styles.FormGroup>
            <Styles.Label>E-mail</Styles.Label>
            <Styles.Input value={hidden ? '••••••••••' : email} onChange={e => setEmail(e.target.value)} placeholder="Email do contato" disabled={hidden} />
          </Styles.FormGroup>
        </Styles.ModalBody>
        <Styles.ModalFooter>
          <button onClick={handleDelete} style={{ background: '#222', color: '#ff3b3b', borderRadius: 8, padding: '12px 18px', fontWeight: 600, marginRight: 8, border: 'none', cursor: 'pointer' }}>
            <FiTrash2 /> Apagar
          </button>
          <button onClick={() => setHidden(h => !h)} style={{ background: '#222', color: '#fff', borderRadius: 8, padding: '12px 18px', fontWeight: 600, marginRight: 8, border: 'none', cursor: 'pointer' }}>
            {hidden ? <FiUnlock /> : <FiLock />} {hidden ? 'Mostrar' : 'Esconder'}
          </button>
          <Styles.CancelBtn onClick={handleCancel}>Cancelar</Styles.CancelBtn>
          <Styles.SaveBtn onClick={handleSave}>Salvar</Styles.SaveBtn>
        </Styles.ModalFooter>
      </Styles.ModalContent>
    </Styles.ModalOverlay>
  );
}
