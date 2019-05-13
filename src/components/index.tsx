import * as React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Button, Container, Segment, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

interface PageInterface {
    color: string;
}

class Index extends React.Component<PageInterface, {}> {
    render() {
        return (
            <Segment inverted vertical masthead>
                <Grid>
                    <Grid.Column textAlign='center'>
                        <h1>Welcome to React with Typescript</h1>
                        <p>The color of this page is: {this.props.color}</p>
                        <Button content="Click me hards as you can!" />
                    </Grid.Column>
                </Grid>
            </Segment>

        );
    }
}

export default Index;