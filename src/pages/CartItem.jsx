import {
    Container,
    Divider,
    Segment,
    HeaderSubheader,
    HeaderContent,
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableCell,
    TableBody,
    Header,
    Image,
    Table,
    TableFooter,
    Button,
    Icon
} from "semantic-ui-react";
import { MenuNavBar } from "../components/MenuNavBar";
import { useNavigate } from "react-router-dom";
import { useCartsItem } from "../hooks/useCartsItem";
import { NumericFormat } from "react-number-format";
import { addSales } from "../service/ItemsCardService";
import Swal from "sweetalert2";
import "@sweetalert2/theme-bootstrap-4";
import { useItem } from "../hooks/useItem";
import { useAuth } from "../auth/hooks/useAuth";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

export function CartItem() {

    const navigate = useNavigate();
    const { cartItems, total, handlerAddProductCart, handlerMinusProductCart, handlerDeleteProductCart, handlerFlushStateCartItems } = useCartsItem();
    const {items} = useItem();
    const {login} = useAuth();


    const sendSales = async () => {

        let allItemsIsAvalable = false;

        for (let c of cartItems) {
            let itemFound = items.find(i => i.product.id == c.product.id );
            if (itemFound.quantity < c.quantity) {
                allItemsIsAvalable = true;
                break;
            }
        }
       
        if (cartItems.length != 0 && allItemsIsAvalable != true) {

            try {
                const newCartItems = cartItems.map( item => {
                    let newItem = {...item, owner: login.user.username}
                    return newItem;
                });
                let res = await addSales(newCartItems);
                if (res.status == 200) {

                    Swal.fire({
                        title: `${res.data}`,
                        text: "Click para continuar!",
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        title: `Hubo un error en la transacción.`,
                        icon: "error"
                    });
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    title: `Hubo un error en la respuesta del servidor.`,
                    icon: "error"
                });
            }


            handlerFlushStateCartItems();
            navigate("/home");
        } else {
            Toast.fire({
                icon: "warning",
                title: `No se pudo concretar la compra, no has seleccionado artículos o no hay suficientes en el almacén. Verifíca si hay items disponibles a comprar.`
            });
        }
    };

    return (<>
        <Container style={{ height: '100vh', width: '100%' }}>
            <MenuNavBar />
            <br /><br />
            <Segment basic >
                <Header as='h3'>
                    <Icon name='in cart' />
                    <HeaderContent>Shopping Cart</HeaderContent>
                </Header>          
            </Segment>
            <Divider />
            <Container>
                <Table basic='very' celled selectable size="large">
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Product Name</TableHeaderCell>
                            <TableHeaderCell>Price</TableHeaderCell>
                            <TableHeaderCell>Quantity</TableHeaderCell>
                            <TableHeaderCell>SubTotal</TableHeaderCell>
                            <TableHeaderCell>Add more ?</TableHeaderCell>
                            <TableHeaderCell>Delete</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cartItems.map(item => {
                            return (<>
                                <TableRow>
                                    <TableCell>
                                        <Header as='h4' image>
                                            <Image src={item.product.urlImg} rounded size='massive' />
                                            <HeaderContent>
                                                {item.product.name}
                                                <HeaderSubheader>{item.product.model}</HeaderSubheader>
                                            </HeaderContent>
                                        </Header>
                                    </TableCell>
                                    <TableCell>{<NumericFormat value={Number(item.product.price).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{<NumericFormat value={Number(item.subTotal).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</TableCell>
                                    <TableCell>
                                        <div className='ui two buttons'>
                                            
                                            
                                                <Button icon basic color='green' onClick={() => handlerAddProductCart(item)}>
                                                    <Icon name="add" />
                                                </Button>
                                            

                                            {(item.quantity == 1) ?
                                                <Button disabled icon basic color='red' >
                                                    <Icon name="minus" />
                                                </Button>
                                                :
                                                <Button icon basic color='red' onClick={() => handlerMinusProductCart(item.product)}>
                                                    <Icon name="minus" />
                                                </Button>
                                            }
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Button icon basic color='blue' onClick={() => handlerDeleteProductCart(item.product)}>
                                            <Icon name="trash" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </>)
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableHeaderCell><b>Total: </b></TableHeaderCell>
                            <TableHeaderCell textAlign="center"><b>{<NumericFormat value={Number(total).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</b></TableHeaderCell>
                        </TableRow>
                    </TableFooter>
                </Table>
                <div>
                    <Button color="blue" icon labelPosition='left' onClick={() => sendSales()}>
                        <Icon name='shopping cart' />
                        Buy
                    </Button>
                    <Button icon labelPosition='right' onClick={() => navigate("/home")}>
                        Continue Shopping
                        <Icon name='right arrow' />
                    </Button>
                </div>
            </Container>
        </Container>
    </>);
}