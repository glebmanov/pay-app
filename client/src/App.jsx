import React, { useEffect } from 'react';
import { Form, Button, Input } from 'antd';
import { useHttp } from './hooks/http.hook';
import { useMessage } from './hooks/message.hook';

import './styles/index.scss';

const App = () => {
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const handlerPayment = async values => {
    try {
      const data = await request('/api/pay', 'POST', values);
      console.log(data);
      message(data.message);
    } catch (e) {}
  };

  return (
    <div className='wrapper'>
      <Form
        layout='vertical'
        onFinish={values => {
          handlerPayment(values);
        }}
      >
        <Form.Item
          name='CardNumber'
          label='Card Number'
          validateTrigger='onBlur'
          rules={[
            { whitespace: false },
            {
              validator: (_, value) =>
                value && value.match('[0-9]{16}')
                  ? Promise.resolve()
                  : Promise.reject('Номер должен состоять из 16 цифр'),
            },
          ]}
        >
          <Input
            inputMode='numeric'
            maxLength='16'
            className='card-number'
            placeholder='1111222233334444'
            controls={false}
          ></Input>
        </Form.Item>
        <Form.Item
          name='ExpDate'
          label='Expiration Date'
          validateTrigger='onBlur'
          rules={[
            { whitespace: false },
            {
              validator: (_, value) =>
                value && value.match('(0[1-9]|1[0-2])[/](19|20)?[0-9]{2}')
                  ? Promise.resolve()
                  : Promise.reject('Дата должна быть формата 05/2023'),
            },
          ]}
        >
          <Input inputMode='numeric' className='exp-date' placeholder='05/2023'></Input>
        </Form.Item>
        <Form.Item
          name='Cvv'
          label='CVV'
          validateTrigger='onBlur'
          rules={[
            { whitespace: false },
            {
              validator: (_, value) =>
                value && value.match('[0-9]{3}') ? Promise.resolve() : Promise.reject('Номер cvv состоит из 3-х цифр'),
            },
          ]}
        >
          <Input inputMode='numeric' className='cvv' maxLength='3' placeholder='***'></Input>
        </Form.Item>
        <Form.Item
          name='Amount'
          label='Amount'
          validateTrigger='onBlur'
          rules={[
            { whitespace: false },
            {
              validator: (_, value) =>
                value && value.match('[0-9]{1,9}') ? Promise.resolve() : Promise.reject('Здесь должна быть сумма'),
            },
          ]}
        >
          <Input inputMode='numeric' className='amount'></Input>
        </Form.Item>
        <Form.Item>
          <Button block type='primary' htmlType='submit' disabled={loading}>
            Оплатить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
