import { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import * as Styles from './styles';
import { FiEdit2, FiLock, FiTrash2, FiUserPlus, FiSearch } from 'react-icons/fi';
import { FiUnlock, FiLogOut, FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import ContactIcon from '../../components/ContactIcon';
import AddContactModal from './AddContactModal';
import EditContactModal from './EditContactModal';
import DeleteContactModal from './DeleteContactModal';
import PasswordModal from './PasswordModal';

type ContactType = {
  id: number | string;
  name: string;
  type: string;
  phone: string;
  email: string;
  avatar?: string;
};

const initialContacts: ContactType[] = [
];

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export default function Contacts() {
  const navigate = useNavigate();
  const [hiddenContacts, setHiddenContacts] = useState<number[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(null);
  const [selectedLetter, setSelectedLetter] = useState('');
  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState<ContactType[]>(initialContacts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<ContactType | null>(null);
  const [showSpecialTooltip, setShowSpecialTooltip] = useState(false);
  const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [hideAllContacts, setHideAllContacts] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordVerificationAction, setPasswordVerificationAction] = useState<() => void>(() => { });

  const fetchContacts = () => {
    api.get('/contacts')
      .then(response => {
        if (Array.isArray(response.data)) {
          const mappedContacts = response.data.map((c: { _id?: string, id?: number, nome?: string, name?: string, type?: string, telefone?: string, phone?: string, email?: string, avatar?: string }) => ({
            id: c._id || c.id,
            name: c.nome || c.name || '',
            type: c.type || '',
            phone: c.telefone || c.phone || '',
            email: c.email || '',
            avatar: c.avatar || '',
          }));
          setContacts(mappedContacts);
        } else {
          setContacts([]);
        }
      });
  };

  const getUserEmail = () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        const base64Url = token.split('.')[1];
        if (base64Url) {
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const payload = JSON.parse(window.atob(base64));
          if (payload.email) {
            setUserEmail(payload.email);
            return;
          }
        }

        api.get('/auth/profile')
          .then(response => {
            if (response.data && response.data.email) {
              setUserEmail(response.data.email);
            }
          })
          .catch(() => {
            const savedEmail = localStorage.getItem('userEmail');
            if (savedEmail) {
              setUserEmail(savedEmail);
            }
          });
      }
    } catch (error) {
      console.error('Erro ao recuperar o email do usuário:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
    getUserEmail();
  }, []);

  useEffect(() => {
    if (contacts.length > 0 && hideAllContacts) {
      setHiddenContacts(contacts.map(c => c.id));
    }
  }, [contacts, hideAllContacts]);

  const filteredContacts = contacts.filter(
    c => typeof c.name === 'string' &&
      (selectedLetter === '' || c.name.toUpperCase().startsWith(selectedLetter)) &&
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Styles.Container>
      <Styles.Sidebar>
        <div style={{ marginTop: '20px' }}>
          <Logo size="small" showText={false} />
        </div>
        <Styles.Menu>
          <Styles.MenuItem $active title="Lista de Contatos">
            <ContactIcon size={24} color="currentColor" />
          </Styles.MenuItem>
          <Styles.MenuItem title="Configurações">
            <FiSettings size={22} />
          </Styles.MenuItem>
          <Styles.MenuItem
            onClick={() => {
              localStorage.removeItem('token');
              sessionStorage.removeItem('token');
              localStorage.removeItem('userEmail');
              setUserEmail('');
              navigate('/');
            }}
            title="Sair"
          >
            <FiLogOut size={22} />
          </Styles.MenuItem>
        </Styles.Menu>
        <Styles.LoggedInfo>
          Logado como:<br />
          <span>{userEmail || 'Usuário'}</span>
        </Styles.LoggedInfo>
      </Styles.Sidebar>
      <Styles.Content>
        <Styles.MainCard>
          <Styles.CardHeader>
            <Styles.Title>Lista de contatos</Styles.Title>
            <Styles.SearchAdd>
              <Styles.SearchBox>
                <FiSearch />
                <input
                  type="text"
                  placeholder="Pesquisar"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </Styles.SearchBox>
              <Styles.AddButtonWrapper>
                <Styles.AddButton
                  onClick={() => setIsModalOpen(true)}
                  onMouseEnter={() => {
                    tooltipTimerRef.current = setTimeout(() => {
                      setShowSpecialTooltip(true);
                    }, 7000);
                  }}
                  onMouseLeave={() => {
                    if (tooltipTimerRef.current) {
                      clearTimeout(tooltipTimerRef.current);
                      tooltipTimerRef.current = null;
                    }
                    setShowSpecialTooltip(false);
                  }}
                >
                  <FiUserPlus /> Adicionar contato
                </Styles.AddButton>
                <Styles.SpecialTooltip $show={showSpecialTooltip}>
                  Tá esperando o quê? Boraa moeer!! 🚀
                </Styles.SpecialTooltip>
              </Styles.AddButtonWrapper>
              <Styles.GlobalActionBtn
                title={hideAllContacts ? "Mostrar todos os dados" : "Esconder todos os dados"}
                $active={!hideAllContacts}
                onClick={() => {
                  const showAllContacts = () => {
                    setHideAllContacts(false);
                    setHiddenContacts([]);
                  };

                  if (hideAllContacts) {
                    setPasswordVerificationAction(() => showAllContacts);
                    setIsPasswordModalOpen(true);
                  } else {
                    setHideAllContacts(true);
                    setHiddenContacts(contacts.map(c => c.id));
                  }
                }}
              >
                {hideAllContacts ? <FiUnlock /> : <FiLock />}
              </Styles.GlobalActionBtn>
            </Styles.SearchAdd>
          </Styles.CardHeader>
          <Styles.LetterBar>
            {letters.map(l => (
              <Styles.LetterItem
                key={l}
                $active={l === selectedLetter}
                onClick={() => setSelectedLetter(l)}
              >
                {l}
              </Styles.LetterItem>
            ))}
          </Styles.LetterBar>
          <Styles.TableContainer>
            {filteredContacts.length === 0 ? (
              <div style={{ margin: '60px auto', color: '#bdbdbd', fontSize: '1rem', textAlign: 'center', width: '100%' }}>
                Nenhum contato cadastrado.
              </div>
            ) : (
              <Styles.ContactsTable>
                <thead>
                  <tr>
                    <th>NOME</th>
                    <th>TELEFONE</th>
                    <th>EMAIL</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map(c => {
                    const isHidden = hiddenContacts.includes(c.id);
                    return (
                      <tr key={c.id}>
                        <td>
                          <Styles.ContactInfo>
                            {c.avatar ? (
                              <img src={c.avatar} alt={c.name} />
                            ) : (
                              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bdbdbd' }}>
                                <FiUserPlus size={18} />
                              </div>
                            )}
                            <div>
                              <strong>{c.name}</strong>
                              <span>{isHidden ? '••••••••••' : c.type}</span>
                            </div>
                          </Styles.ContactInfo>
                        </td>
                        <td>{isHidden ? '••••••••••' : c.phone}</td>
                        <td>{isHidden ? '••••••••••' : c.email}</td>
                        <td>
                          <Styles.Actions>
                            <Styles.ActionBtn title="Editar" onClick={() => { setSelectedContact(c); setEditModalOpen(true); }}><FiEdit2 /> Editar</Styles.ActionBtn>
                            <Styles.ActionBtn
                              title={isHidden ? 'Mostrar dados' : 'Esconder dados'}
                              onClick={() => {
                                if (isHidden) {
                                  const showContact = () => {
                                    setHiddenContacts(prev => prev.filter(id => id !== c.id));
                                    if (hiddenContacts.length === 1) {
                                      setHideAllContacts(false);
                                    }
                                  };
                                  setPasswordVerificationAction(() => showContact);
                                  setIsPasswordModalOpen(true);
                                } else {
                                  setHiddenContacts(prev => [...prev, c.id]);
                                  if (hiddenContacts.length === contacts.length - 1) {
                                    setHideAllContacts(true);
                                  }
                                }
                              }}
                            >
                              {isHidden ? <FiUnlock /> : <FiLock />}
                            </Styles.ActionBtn>
                            <Styles.ActionBtn title="Excluir" onClick={() => {
                              setContactToDelete(c);
                              setDeleteModalOpen(true);
                            }}><FiTrash2 /></Styles.ActionBtn>
                          </Styles.Actions>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Styles.ContactsTable>
            )}
          </Styles.TableContainer>
          <EditContactModal
            isOpen={editModalOpen}
            contact={selectedContact}
            onClose={() => setEditModalOpen(false)}
            onSave={() => {
              fetchContacts();
              setEditModalOpen(false);
            }}
          />
        </Styles.MainCard>
        <AddContactModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={() => {
            fetchContacts();
            setIsModalOpen(false);
          }}
        />
        <DeleteContactModal
          isOpen={deleteModalOpen}
          contactId={contactToDelete?.id ?? ''}
          contactName={contactToDelete?.name}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={() => {
            fetchContacts();
            setDeleteModalOpen(false);
          }}
        />
        <PasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          onPasswordVerified={() => {
            if (passwordVerificationAction) {
              passwordVerificationAction();
            }
          }}
        />
      </Styles.Content>
    </Styles.Container>
  );
}
