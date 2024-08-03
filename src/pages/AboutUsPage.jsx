import { ListItem, ListIcon, ListContent, List , Container, Divider, Header, Image, Segment, Icon } from "semantic-ui-react";
import { MenuNavBar } from "../components/MenuNavBar";

export function AboutUsPage() {
    return (<>
        <Container style={{ height: '100vh', width: '100%' }}>
            <MenuNavBar />
            <br /><br />
            <Segment basic >
                <Header  as='h3'>About us</Header>
            </Segment>
            <Divider />
            <Container >
                <Segment color="blue" style={{ "display": "flex", "alignItems": "center", "justifyContent": "center", "width": "100%", "height": "50%", "flexDirection": "column" }}>
                    <Image size="medium" src="/src/assets/author.jpeg" circular />
                    <Segment color="blue">
                        <p>🤖🤖🤖</p>
                        <p>This is a project created by me, where I use my coding and programming skills for both frontend and backend development 🧑‍💻.</p>
                        <p>You can find information about me:</p>
                        <List>
                            <ListItem>
                                <ListIcon name='instagram' />
                                <ListContent><a href='https://www.instagram.com/juancamilom.ruiz/'>My Instagram</a></ListContent>
                            </ListItem>
                            <ListItem>
                                <ListIcon name='marker' />
                                <ListContent>Cali, Colombia</ListContent>
                            </ListItem>
                            <ListItem>
                                <ListIcon name='mail' />
                                <ListContent>
                                    <a href='mailto:mr.machineman98@gmail.com'>mr.machineman98@gmail.com</a>
                                </ListContent>
                            </ListItem>
                            <ListItem>
                                <ListIcon name='linkedin' />
                                <ListContent>
                                    <a href='https://www.linkedin.com/in/juanca98/'>Linkedin about me</a>
                                </ListContent>
                            </ListItem>
                        </List>
                    </Segment>
                </Segment>
            </Container>
            <br />
        </Container>
    </>);
}