import * as React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import { Button, Segment, Modal, Form, Menu, Icon, Message } from 'semantic-ui-react';
import { type } from 'os';

interface IndexState {
    [name: string]: any,
    regModalOpened: boolean,
    authModalOpened: boolean,
    login: string,
    password: string,
    repeatPassword: string,
    email: string,
    reponseAwait: boolean
    error: boolean,
    errorMessages: {
        [key: string]: string
    },
}

class Index extends React.Component<any, IndexState> {

    state = {
        regModalOpened: false,
        authModalOpened: false,
        login: "",
        password: "",
        repeatPassword: "",
        email: "",
        reponseAwait: false,
        error: false,
        errorMessages: {}
    };

    showModal(modalName: string) {
        switch (modalName) {
            case 'register':
                this.setState({
                    regModalOpened: true
                });
                break;
            case 'login':
                this.setState({
                    authModalOpened: true
                });
                break;
        }
    }

    hideModal(modalName: string) {
        switch (modalName) {
            case 'register':
                this.setState({
                    regModalOpened: false
                });
                break;
            case 'login':
                this.setState({
                    authModalOpened: false
                });
                break;
        }
    }

    handleChange = (_e, { name, value }) => this.setState({ [name]: value })

    tryToRegister = () => {
        this.setState({
            reponseAwait: true,
            error: false,
            errorMessages: {}
        });

        const errorMessages = {};
        const { login, password, repeatPassword, email } = this.state;

        if (login.length < 3 || login.length > 16) {
            errorMessages['login'] = 'Login must be longer than 3 and lower than 16 symbols!';
        }

        if (password.length < 6) {
            errorMessages['password'] = 'Password length must be longer than 6!';
        }

        if (repeatPassword.length < 6) {
            errorMessages['repeatPassword'] = 'Repeated password length must be longer than 6!';
        }

        if (repeatPassword !== password) {
            errorMessages['repeatPassword'] = 'Repeated password are not matching with password!';
        }

        const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailRegex.test(email)) {
            errorMessages['email'] = 'Wrong email!';
        }

        if (Object.keys(errorMessages).length > 0) {
            this.setState({
                reponseAwait: false,
                error: true,
                errorMessages
            });
        }
    }

    tryToLogin = () => {
        this.setState({
            reponseAwait: true,
            error: false,
            errorMessages: {}
        });

        const errorMessages = {};
        const { login, password} = this.state;

        if (login.length < 3 || login.length > 16) {
            errorMessages['login'] = 'Login must be longer than 3 and lower than 16 symbols!';
        }

        if (password.length < 6) {
            errorMessages['password'] = 'Password length must be longer than 6!';
        }

        if (Object.keys(errorMessages).length > 0) {
            this.setState({
                reponseAwait: false,
                error: true,
                errorMessages
            });
        }
    }

    render() {
        return (
            <div>
                <Segment inverted vertical textAlign="center">
                    <Menu inverted pointing secondary>
                        <Menu.Item name='Home' active={true} />
                        <Menu.Item name='Pages' />
                        <Menu.Menu position='right'>
                            <Menu.Item name='register' onClick={() => this.showModal('register')} />
                            <Menu.Item name='login' onClick={() => this.showModal('login')} />
                        </Menu.Menu>
                    </Menu>
                    <h2>React + Webpack + TypeScript + Semantic UI</h2>
                    <p>Example project</p>
                </Segment>

                <Modal basic dimmer="blurring" open={this.state.regModalOpened} closeIcon
                    onClose={() => this.hideModal('register')}
                >
                    <Modal.Header>Registration</Modal.Header>
                    <Modal.Content>
                        <Form inverted error>
                            <Form.Field required>
                                <Form.Input label="Login" type="text" placeholder="Login" name="login"
                                    value={this.state.login}
                                    onChange={this.handleChange}
                                    disabled={this.state.reponseAwait}
                                    minLength={3}
                                    maxLength={16}
                                    error={typeof this.state.errorMessages['login'] !== 'undefined'}
                                    required
                                />
                            </Form.Field>
                            <Form.Field required>
                                <Form.Input label="Password" type="password" placeholder="Password" name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    disabled={this.state.reponseAwait}
                                    error={typeof this.state.errorMessages['password'] !== 'undefined'}
                                    required
                                />
                            </Form.Field>
                            <Form.Field required>
                                <Form.Input label="Repeat password" type="password" placeholder="Password" name="repeatPassword"
                                    value={this.state.repeatPassword}
                                    onChange={this.handleChange}
                                    disabled={this.state.reponseAwait}
                                    error={typeof this.state.errorMessages['repeatPassword'] !== 'undefined'}
                                    required
                                />
                            </Form.Field>
                            <Form.Field required>
                                <Form.Input label="E-mail" type="email" placeholder="E-mail" name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    disabled={this.state.reponseAwait}
                                    error={typeof this.state.errorMessages['email'] !== 'undefined'}
                                    required
                                />
                            </Form.Field>
                            <Button.Group fluid>
                                <Button type="submit" color="red"
                                    onClick={() => this.hideModal('register')}
                                    inverted
                                >
                                    <Icon name='remove' />Cancel
                                    </Button>
                                <Button.Or />
                                <Button type="button" color="green" loading={this.state.reponseAwait}
                                    onClick={this.tryToRegister}
                                    inverted
                                >
                                    <Icon name='checkmark' />Register
                                    </Button>
                            </Button.Group>
                            <Message error header="Form validation error" list={Object.values(this.state.errorMessages)}
                                className={this.state.error ? "visible" : "hidden"} />
                        </Form>
                    </Modal.Content>
                </Modal>

                <Modal basic dimmer="blurring" open={this.state.authModalOpened} closeIcon
                    onClose={() => this.hideModal('login')}
                >
                    <Modal.Header>Authorization</Modal.Header>
                    <Modal.Content>
                        <Form inverted error>
                            <Form.Field required>
                                <Form.Input label="Login" type="text" placeholder="Login" name="login"
                                    value={this.state.login}
                                    onChange={this.handleChange}
                                    disabled={this.state.reponseAwait}
                                    minLength={3}
                                    maxLength={16}
                                    error={typeof this.state.errorMessages['login'] !== 'undefined'}
                                    required
                                />
                            </Form.Field>
                            <Form.Field required>
                                <Form.Input label="Password" type="password" placeholder="Password" name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    disabled={this.state.reponseAwait}
                                    error={typeof this.state.errorMessages['password'] !== 'undefined'}
                                    required
                                />
                            </Form.Field>
                            
                            <Button.Group fluid>
                                <Button type="submit" color="red"
                                    onClick={() => this.hideModal('login')}
                                    inverted
                                >
                                    <Icon name='remove' />Cancel
                                    </Button>
                                <Button.Or />
                                <Button type="button" color="green" loading={this.state.reponseAwait}
                                    onClick={this.tryToLogin}
                                    inverted
                                >
                                    <Icon name='checkmark' />Log-in
                                    </Button>
                            </Button.Group>
                            <Message error header="Form validation error" list={Object.values(this.state.errorMessages)}
                                className={this.state.error ? "visible" : "hidden"} />
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default Index;