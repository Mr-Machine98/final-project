import {
    Container,
    Divider,
    Header,
    Segment,
    Icon,
    HeaderContent,
    Table,
    TableHeader,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    HeaderSubheader,
    Image,
    Button,
    ButtonContent,
    MessageHeader,
    Message,
    Pagination
} from "semantic-ui-react";
import { MenuNavBar } from "../components/MenuNavBar";
import iconUser from "/src/assets/iconUser.png";
import { useUsers } from "../hooks/useUsers";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";
import { useParams } from "react-router-dom";

export function Userspage() {

    const {
        users,
        paginator,
        findAllUsers,
        handlerGoToAddUser,
        handlerDeleteUser
    } = useUsers();
    const navigate = useNavigate();
    const {login} = useAuth();
    const {page} = useParams();

    const exeFindAll = async (page) => findAllUsers(page);
    const onDeleteUser = (id) => handlerDeleteUser(id);
    const onUpdateUser = (id) => navigate("/users/edit/" + id);

    const onPageChange = (e, data) => {
        let selectPage = data.activePage - 1;
        navigate("/users/page/" + selectPage  );
    }

    useEffect(() => {
        exeFindAll(page);
    }, [page]);

    return (<>
        <Container style={{ height: '100vh', width: '100%' }}>
            <MenuNavBar />
            <br /><br />
            <Segment basic >
                <Header as='h3'>
                    <Icon name='user' />
                    <HeaderContent>Users</HeaderContent>
                </Header>
            </Segment>
            <Divider />
            <Container>
                
                {login.isAdmin ? 
                    <Button 
                        positive
                        content={"Add User"} 
                        onClick={() => handlerGoToAddUser()}
                    /> : 
                    <Button
                        disabled 
                        positive 
                        content={"Add User"} 
                    />
                }

                <Divider horizontal>
                    <Header as='h4'>
                    <Icon name='table' />
                    Tabla de Usuarios
                    </Header>
                </Divider>
                {users.length == 0 ?
                    <Message warning>
                        <MessageHeader>No se encuentra ningún usuario!</MessageHeader>
                        <p>Por favor, comunicate con algún técnico ya que el servidor no ha devuelto información.</p>
                    </Message>
                    :
                    <>
                        <Table basic='very' celled selectable size="large">
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell>Username</TableHeaderCell>
                                    <TableHeaderCell>Email</TableHeaderCell>
                                    <TableHeaderCell textAlign="center">Is Admin?</TableHeaderCell>
                                    <TableHeaderCell textAlign="center"></TableHeaderCell>
                                    <TableHeaderCell textAlign="center"></TableHeaderCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    users.map(user => {
                                        return <>
                                            <TableRow key={user.id}>
                                                <TableCell>
                                                    <Header as='h4' image>
                                                        <Image src={iconUser} rounded size='mini' />
                                                        <HeaderContent>
                                                            {user.username}
                                                            <HeaderSubheader>{user.rol}</HeaderSubheader>
                                                        </HeaderContent>
                                                    </Header>
                                                </TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                { user.isAdmin ? <TableCell textAlign="center"><Icon color="green" name='check' /></TableCell> : <TableCell textAlign="center"><Icon color="red" name='cancel' /></TableCell>}
                                                <TableCell textAlign="center">
                                                    {login.isAdmin ? <>
                                                        <Button color="blue" animated='vertical' size="mini" onClick={() => onUpdateUser(user.id)} >
                                                            <ButtonContent hidden>Update</ButtonContent>
                                                            <ButtonContent visible>
                                                                <Icon name='edit outline' />
                                                            </ButtonContent>
                                                        </Button>
                                                    </> : <>
                                                        <Button disabled color="blue" animated='vertical' size="mini"  >
                                                            <ButtonContent hidden>Update</ButtonContent>
                                                            <ButtonContent visible>
                                                                <Icon name='edit outline' />
                                                            </ButtonContent>
                                                        </Button>
                                                    </>}
                                                </TableCell>
                                                <TableCell textAlign="center">
                                                    {login.isAdmin ? <>
                                                        <Button color="red" animated='vertical' size="mini" onClick={() => onDeleteUser(user.id)} >
                                                            <ButtonContent hidden>Delete</ButtonContent>
                                                            <ButtonContent visible>
                                                                <Icon name='trash alternate outline' />
                                                            </ButtonContent>
                                                        </Button>
                                                    </>:<>
                                                        <Button disabled color="red" animated='vertical' size="mini" >
                                                            <ButtonContent hidden>Delete</ButtonContent>
                                                            <ButtonContent visible>
                                                                <Icon name='trash alternate outline' />
                                                            </ButtonContent>
                                                        </Button>
                                                    </>}
                                                </TableCell>
                                            </TableRow>
                                        </>;
                                    })
                                }
                            </TableBody>
                        </Table>
                        <Pagination defaultActivePage={0} totalPages={paginator.totalPages} onPageChange={onPageChange}/>
                    </>
                }
            </Container>
        </Container>
    </>);
}