import {
    FormGroup,
    FormField,
    Form,
    Input,
    Button,
    Container,
    Segment,
    Divider,
    Header,
    HeaderContent,
    Icon,
    Checkbox
} from 'semantic-ui-react';
import { MenuNavBar } from './MenuNavBar';
import { useUsers } from '../hooks/useUsers';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function UserForm() {

    const {initialUserForm, handlerAddOrUpdateUser, users, errors} = useUsers();
    const [userForm, setUserForm] = useState(initialUserForm);
    const { username, password, email, isAdmin} = userForm;
    const [checked, setChecked] = useState(userForm.isAdmin);

    // helping to recieve the path variable from url;
    const {id} = useParams();

    useEffect( () => {
        if (id) {
            const user = users.find( u => u.id == id) || initialUserForm;
            setUserForm(user);
        }
    }, [id]);


    const onInputChange = ({ target }) => {
        let { name, value } = target;
        setUserForm({
            ...userForm,
            [name]: value
        });
    };

    const onCheckBoxChange = () => {
        setChecked(!checked);
        setUserForm({
            ...userForm,
            isAdmin: !checked
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        handlerAddOrUpdateUser(userForm);
    };

    return (<>
        <Container style={{ height: '100vh', width: '100%' }}>
            <MenuNavBar />
            <br /><br />
            <Segment basic >
                <Header as='h3'>
                    <Icon name='user' />
                    {id == null ? <HeaderContent>Add Users</HeaderContent> : <HeaderContent>Update Users</HeaderContent>}
                </Header>
            </Segment>
            <Divider />
            <Container>
                <Header as='h3'>
                    <HeaderContent>Register User</HeaderContent>
                </Header>
                <Divider/>
                <Form onSubmit={onSubmit}>
                    <FormGroup widths='equal'>
                        <FormField
                            id='username'
                            name="username"
                            control={Input}
                            label='Username'
                            placeholder='Type your username'
                            onChange={onInputChange}
                            value={username}
                            error={ (errors.username != undefined && errors.username != '') ? { content: errors.username, pointing: 'below' }: false }
                        />
                        {id == null ? <FormField
                            id='password'
                            name="password"
                            control={Input}
                            label='Password'
                            placeholder='Type your password'
                            onChange={onInputChange}
                            type='password'
                            value={password}
                            error={ (errors.password != undefined && errors.password != '') ? { content: errors.password, pointing: 'below' }: false }
                        />:
                        <></>}
                    </FormGroup>
                    <FormField
                        id='email'
                        control={Input}
                        label='Email'
                        name='email'
                        placeholder='user@dominio.com'
                        onChange={onInputChange}
                        type='email'
                        value={email}
                        error={ (errors.email != undefined && errors.email != '') ? { content: errors.email, pointing: 'below' }: false }
                    />
                    <FormField
                        id='checkbox-isAdmin'
                        name="isAdmin"
                        control={Checkbox}
                        label={'is admin ?'}
                        onClick={onCheckBoxChange}
                        checked={isAdmin}
                        toggle
                    />
                    {id == null ? <Button color='green' type='submit'>Submit</Button> : <Button color='green' type='submit'>Update</Button>}
                </Form>
            </Container>
        </Container>  
    </>);
}