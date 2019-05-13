import * as React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Button, Container, Segment, Grid, Form, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

interface PageInterface {
    color: string;
}

class Index extends React.Component<PageInterface, {}> {
    render() {
        return (
            <div>
                <Segment inverted vertial textAlign="center">
                    <p>Welcome to React with Typescript</p>
                    <p>The color of this page is: {this.props.color}</p>
                    <Button content="Click me hards as you can!" />
                </Segment>

                <Container>
                    <Form>
                        <Form.Field>
                            <label>Login:</label>
                            <input type="text" placeholder="Login" minLength={3} maxLength={13} />
                        </Form.Field>
                        <Form.Field>
                            <label>Password:</label>
                            <input type="password" placeholder="Password" minLength={6} maxLength={32} />
                        </Form.Field>
                        <Button type="submit">Log-in</Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default Index;