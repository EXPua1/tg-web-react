import React, {useCallback, useEffect, useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";

const products = [
    {id: '1', title: 'Джинсы', price: 13000, description: 'Синего цвета прямые'},
    {id: '2', title: 'Куртка', price: 3000, description: 'Зеленого цвета теплая'},
    {id: '3', title: 'Джинсы', price: 2000, description: 'Синего цвета узкие'},
    {id: '4', title: 'Куртка', price: 12000, description: 'Красного цвета легкая'},
    {id: '5', title: 'Джинсы', price: 54000, description: 'Синего цвета короткие'},
    {id: '6', title: 'Куртка', price: 2000, description: 'Оранжевого цвета долгая'},
    {id: '7', title: 'Джинсы', price: 3000, description: 'Черного цвета прямые'},
    {id: '8', title: 'Куртка', price: 12000, description: 'Зеленого цвета, битая'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}
const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);



    const {tg, queryId} = useTelegram();


    const onSendData = useCallback(()=>{
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,

        }
        fetch('https://35.247.72.229:8081/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData]);
    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if (alreadyAdded){
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)
        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }
    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product = {item}
                    onAdd = {onAdd}
                    className = {'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;