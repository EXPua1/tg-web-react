import React, {useCallback, useEffect, useState} from 'react';
import './Form.css'
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram();

    const onSendData = useCallback(()=>{
        const data = {
            country,
            street,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [country,street,subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData())
        return () => {
            tg.offEvent('mainButtonClicked', onSendData())
        }
    }, []);

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить Данные'
        })

    }, []);

    useEffect(() => {
        if (!street || !country){
            tg.MainButton.hide();
        } else {
            tg.MainButton.show()
        }
    }, [country, street]);

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }
    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }
    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    let div = <>
        <div className={"form"}>
            <h3>Введите ваши данные</h3>
            <input className={'input'}
                   type="text"
                   placeholder={'Страна'}
                   value={country}
                   onChange={onChangeCountry}
            />
            <input className={'input'}
                   type="text"
                   placeholder={'Улица'}
                   value={street}
                   onChange={onChangeStreet}
            />
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'legal'}>Физ. лицо</option>
                <option value={'legal'}>Юр. лицо</option>
            </select>

        </div>
    </>;
    return div;
};

export default Form;