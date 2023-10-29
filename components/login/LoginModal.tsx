import React, {CSSProperties, useState} from 'react';
import { Input } from '@nextui-org/react';
import { AuthApi } from '../../api';


interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const authApi = new AuthApi();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [email, setEmail] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [password, setPassword] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await authApi.authControllerLogin({
                email: email,
                password: password
            });

            if (response.status === 201) {
                localStorage.setItem('token', response.data.accessToken);
                window.location.reload();
            } else {
                setError('No valid login.');
            }
        } catch (err) {
            setError('Ein Fehler ist aufgetreten.');
        }
    };


    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <p style={styles.p}>
                    Please login to HelixHub - CMS
                </p>
                <br />
                <form onSubmit={handleSubmit}>
                    <div>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                            clearable
                            contentLeftStyling={false}
                            css={{
                                w: '100%',
                                transition: 'all 0.2s ease',
                                '@xsMax': {
                                    w: '100%',
                                },
                                '& .nextui-input-content--left': {
                                    h: '100%',
                                    ml: '$4',
                                    dflex: 'center',
                                },
                            }}
                            placeholder="Input your email..."
                            required
                        />
                    </div>
                    <br />
                    <div>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e: any) => setPassword(e.target.value)}
                            clearable
                            contentLeftStyling={false}
                            css={{
                                w: '100%',
                                transition: 'all 0.2s ease',
                                '@xsMax': {
                                    w: '100%',
                                },
                                '& .nextui-input-content--left': {
                                    h: '100%',
                                    ml: '$4',
                                    dflex: 'center',
                                },
                            }}
                            placeholder="Input your password..."
                            required
                        />
                    </div>
                    <br />
                    {error && <p>{error}</p>}
                    <button type="submit" style={{color: "green"}}>Login</button>
                </form>

            </div>
        </div>
    );
};

const styles: { [key: string]: CSSProperties } = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    modal: {
        width: '300px',
        padding: '20px',
        backgroundColor: '#ffffffff',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: '10px',
        top: '5px',
        fontSize: '24px',
        cursor: 'pointer',
    },
    p: {
        color: "black"
    }
};

export default LoginModal;
