import { useState, FormEvent } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

import styles from './styles.module.scss';
import seal from '../../assets/seal.svg';

export function SendMessageForm() {
    const [message, setMessage] = useState('');
    const [isSendingMessage, setIsSendingMessage] = useState(false);

    const { user, signOut } = useAuth();

    async function handleSendMessage(event: FormEvent) {
        event.preventDefault();

        if (!message.trim()) {
            return;
        }

        setIsSendingMessage(true);

        try {
            await api.post('messages', { message });

            setMessage("");
        } finally {
            toast.success('Mensagem enviada com sucesso!', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                icon: false,
                style: {
                    backgroundColor: 'green',
                    color: 'white',
                    textAlign: 'center',
                    fontSize: '16px',
                }
            });
            setIsSendingMessage(false);
        }
    }

    return (
        <div className={styles.sendMessageFormWrapper}>
            <img src={seal} alt="Build The Future - Rocketseat" />
            <button onClick={signOut} className={styles.signOutButton}>
                <VscSignOut size="32" />
            </button>

            <header className={styles.userInformation}>
                <div className={styles.userImage}>
                    <img src={user?.avatar_url} alt={user?.name} />
                </div>
                <strong className={styles.userName}>{user?.name}</strong>
                <span className={styles.userGithub}>
                    <VscGithubInverted size="16" />
                    {user?.login}
                </span>
            </header>

            <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
                <label htmlFor="message">Mensagem</label>
                <textarea
                    name="message"
                    id="message"
                    placeholder="Qual sua expectativa para o evento?"
                    onChange={event => setMessage(event.target.value)}
                    value={message}
                />

                <button
                    disabled={isSendingMessage}
                    type="submit"
                >
                    Enviar mensagem
                </button>
            </form>
        </div>
    )
}