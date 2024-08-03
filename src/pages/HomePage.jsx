import {
    Container,
    Divider,
    Grid,
    GridColumn,
    Header,
    Segment,
    Icon,
    HeaderContent,
    Dimmer,
    Loader
} from 'semantic-ui-react';
import { MenuNavBar } from "../components/MenuNavBar";
import CardItem from '../components/CardItem';
import { useItem } from '../hooks/useItem';

export function HomePage() {

    const {items} = useItem();

    return (<>
        <Container style={{ height: '100vh', width: '100%' }}>
            <MenuNavBar/>
            <br /><br />
                <Segment basic >
                    <Header as='h3'>
                        <Icon name='motorcycle' />
                        <HeaderContent>Dual Purpose Motorcycles 150 CC</HeaderContent>
                    </Header>          
                </Segment>
                <Divider />
                <Segment>
                    { items.length != 0 ?
                        <div style={{"marginLeft" : "10rem", "marginRight" : "10rem"} } >
                            <Grid stretched textAlign='center'  columns={3}  >
                                {
                                    items.map(i => {
                                        return (<>
                                            <GridColumn>
                                                <CardItem item={i} />
                                            </GridColumn>
                                        </>);
                                    })
                                }
                            </Grid>
                        </div>
                        :
                        <div style={{"height": "50rem", "display": "flex", "justifyContent": "center"}}>
                            <Segment style={{"width": "100%"}}>
                                <Dimmer active inverted >
                                    <Loader size='large'>Loading</Loader>
                                </Dimmer>   
                            </Segment>
                        </div>
                    }
                </Segment>
            <br />
        </Container>
    </>);
}