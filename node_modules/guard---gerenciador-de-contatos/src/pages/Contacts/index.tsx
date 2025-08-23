import { useState } from 'react';
import { useEffect } from 'react';
import api from '../../services/api';
import * as Styles from './styles';
import { FiEdit2, FiLock, FiTrash2, FiUserPlus, FiSearch } from 'react-icons/fi';
import { FiUnlock, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import AddContactModal from './AddContactModal';
import EditContactModal from './EditContactModal';

type ContactType = {
  id: number;
  name: string;
  type: string;
  phone: string;
  email: string;
  avatar?: string;
};

const initialContacts: ContactType[] = [
];

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];

export default function Contacts() {
  const navigate = useNavigate();
  const [hiddenContacts, setHiddenContacts] = useState<number[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(null);
  const [selectedLetter, setSelectedLetter] = useState('A');
  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState<ContactType[]>(initialContacts);

  useEffect(() => {
    api.get('/contacts')
      .then(response => {
        setContacts(Array.isArray(response.data) ? response.data as ContactType[] : []);
      });
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredContacts = contacts.filter(
    c => c.name.toUpperCase().startsWith(selectedLetter) && c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Styles.Container>
      <Styles.Sidebar>
        <Logo size="small" />
        <Styles.Menu>
          <Styles.MenuItem active>
            <FiUserPlus />
          </Styles.MenuItem>
          <Styles.MenuItem>
            <FiLock />
          </Styles.MenuItem>
          <Styles.MenuItem>
            <FiTrash2 />
          </Styles.MenuItem>
          <Styles.MenuItem
            onClick={() => {
              localStorage.removeItem('token');
              sessionStorage.removeItem('token');
              navigate('/');
            }}
            title="Sair"
          >
            <FiLogOut />
          </Styles.MenuItem>
        </Styles.Menu>
        <Styles.LoggedInfo>
          Logado como:<br />
          <span>FrancisB8@hotmail.com</span>
        </Styles.LoggedInfo>
      </Styles.Sidebar>
      <Styles.Content>
        <Styles.Header>
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
            <Styles.AddButton onClick={() => setIsModalOpen(true)}>
              <FiUserPlus /> Adicionar contato
            </Styles.AddButton>
          </Styles.SearchAdd>
        </Styles.Header>
        <Styles.MainCard>
          <Styles.LetterBar>
            {letters.map(l => (
              <Styles.LetterItem
                key={l}
                active={l === selectedLetter}
                onClick={() => setSelectedLetter(l)}
              >
                {l}
              </Styles.LetterItem>
            ))}
          </Styles.LetterBar>
          {filteredContacts.length === 0 ? (
            <div style={{ margin: '120px auto', color: '#bdbdbd', fontSize: '1.2rem', textAlign: 'center', width: '100%' }}>
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
                            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bdbdbd' }}>
                              <FiUserPlus size={32} />
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
                              setHiddenContacts(prev =>
                                isHidden
                                  ? prev.filter(id => id !== c.id)
                                  : [...prev, c.id]
                              );
                            }}
                          >
                            {isHidden ? <FiUnlock /> : <FiLock />}
                          </Styles.ActionBtn>
                          <Styles.ActionBtn title="Excluir" onClick={() => {
                            setContacts(prev => prev.filter(ct => ct.id !== c.id));
                          }}><FiTrash2 /></Styles.ActionBtn>
                        </Styles.Actions>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Styles.ContactsTable>
          )}
          <EditContactModal
            isOpen={editModalOpen}
            contact={selectedContact}
            onClose={() => setEditModalOpen(false)}
            onSave={updated => {
              setContacts(prev => prev.map(ct => ct.id === updated.id ? updated : ct));
            }}
            onDelete={id => {
              setContacts(prev => prev.filter(ct => ct.id !== id));
            }}
          />
        </Styles.MainCard>
        <AddContactModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={contact => setContacts(prev => [
            ...prev,
            {
              id: prev.length + 1,
              name: contact.name,
              phone: contact.phone,
              email: contact.email,
              avatar: contact.avatar,
              type: '',
            }
          ])}
        />
      </Styles.Content>
    </Styles.Container>
  );
}
