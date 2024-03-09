import React from 'react';
import './ProductItem.css'
import Button from "../Button/Button";

const ProductItem = ({product, className, onAdd}) => {
    const onAddHandler = () =>{
        onAdd(product);

    }
    return (
        <div className={'product ' + className}>
            <div className={'img'}/>
            <div className={'title'}>{product.title}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}/>
                <span>Стоимость: <b>{product.price}</b></span>

        <Button className = {'add-btn'} onClick = {onAddHandler}>
                Добавить в Корзину
        </Button>
        </div>
    );
};

export default ProductItem;