import iconUser from "/src/assets/iconUser.png";
import { useState } from "react";
import { 
    Container,
    Grid, 
    GridColumn,
    Segment,
    Image,
    Divider,
    Form,
    Input
} from "semantic-ui-react";
import { useAuth } from "../hooks/useAuth";

const initialValuesFormLogin = {
    username: '',
    password: ''
}

// login Component
function LoginPage({title}) {
    
    // State about form Login
    const [stateLoginForm, setStateLoginForm] = useState(initialValuesFormLogin);
    // handler useAuth
    const { doLogin } = useAuth();
    

    // (function) When form is submitting
    const onSubmit = (event) => {
        // interrump submit
        event.preventDefault();
        let userLogin = {...stateLoginForm};
        doLogin(userLogin);
    };

    // (function) this function catches when user type on inputs.
    const onInputChange = ({target}) => {
        setStateLoginForm({
            ...stateLoginForm,
            [target.name] : target.value
        })
    };

    // Login Form
    return (<>
        <Container style={{ height: '100vh' }}>
            <Grid verticalAlign='middle' centered style={{ height: '100%' }}>
                <GridColumn style={{ maxWidth: 450 }}>
                    <Segment>
                        <Image centered src={iconUser} size='small' circular />
                        <Divider horizontal>{title}</Divider>
                        <Form onSubmit={onSubmit}>
                            <Form.Field>
                                <label htmlFor="input-username">Username</label>
                                <Input id="input-username" onChange={onInputChange} iconPosition="left" icon='user' placeholder='Username' defaultValue={stateLoginForm.username}
                                name="username" />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="input-password">Password</label>
                                <Input id="input-password" onChange={onInputChange} iconPosition="left" icon='lock' type='password' placeholder='Password' defaultValue={stateLoginForm.password} 
                                name="password"/>
                            </Form.Field>
                            <Form.Button color="blue" fluid type='submit'>Sign in</Form.Button>
                        </Form>
                    </Segment>
                </GridColumn>
            </Grid>
        </Container>
    </>)
}

export default LoginPage;