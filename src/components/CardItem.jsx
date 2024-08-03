import { NumericFormat } from "react-number-format";
import {
    Header,
    Icon,
    Image,
    CardDescription,
    Divider,
    CardContent,
    CardMeta,
    CardHeader,
    Card,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Button,
    MessageHeader,
    Message 
} from "semantic-ui-react";
import { useCartsItem } from "../hooks/useCartsItem";

function CardItems({item}) {

    const {handlerAddProductCart} = useCartsItem();

    return (<>
        <Card fluid  >
            <CardContent >
                <Image src={item.product.urlImg} label={ (item.quantity > 0) ? 
                    {as: 'a', color: 'blue', content: item.quantity, icon: 'motorcycle', ribbon: true } 
                        : 
                    {as: 'a', color: 'red', content: item.quantity, icon: 'motorcycle', ribbon: true }} 
                />
                <CardHeader>{item.product.name}</CardHeader>
                <CardMeta>{item.product.model}</CardMeta>
                <CardMeta>{<NumericFormat value={Number(item.product.price).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</CardMeta>
                <CardDescription>
                
                { (item.quantity > 0) ? 
                    <>
                        <Divider horizontal>
                            <Header as='h4'>
                                <Icon name='tag' />
                                Description
                            </Header>
                        </Divider>
                        <p>
                            {item.product.description}
                        </p>
                        <Divider horizontal>
                            <Header as='h4'>
                                <Icon name='bar chart' />
                                Specifications
                            </Header>
                        </Divider>
                        <Table definition>
                            <TableBody>
                                <TableRow>
                                    <TableCell width={2}>Peso en seco</TableCell>
                                    <TableCell>{item.product.specification.peso}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Motor</TableCell>
                                    <TableCell>{item.product.specification.motor}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Potencia</TableCell>
                                    <TableCell>{item.product.specification.potenciaMotor}</TableCell>
                                </TableRow>
                                <TableRow>  
                                    <TableCell>Torque</TableCell>
                                    <TableCell>{item.product.specification.torqueMotor}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </>
                        :
                    <>
                        <Divider horizontal>
                            <Header as='h4'>
                                <Icon name='tag' />
                                Description
                            </Header>
                        </Divider>
                        <Message negative>
                            <MessageHeader>Lo sentimos, no hay más artículos en el almacen!</MessageHeader>
                            <p>El artículo no está disponible, se agotaron todas las existencias en nuestros almacenes, pero no te procupes, en pocos días llegarán próximos lotes.</p>
                        </Message>
                    </> 
                }            
                </CardDescription>
            </CardContent>
            { (item.quantity > 0) ?
                <Button primary fluid onClick={() => handlerAddProductCart(item)} ><Icon name="plus cart"/>Add</Button>
                : 
                <Button disabled primary fluid  ><Icon name="plus cart"/>Add</Button>
            }
        </Card>
    </>);
}
export default CardItems;