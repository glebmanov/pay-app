import React, { useEffect } from 'react';
import { Form, Button, Input } from 'antd';
import { useHttp } from './hooks/http.hook';

import './styles/index.scss';

const App = () => {
  const [form] = Form.useForm();

  const { loading, request, error, clearError } = useHttp();

  useEffect(() => {
    clearError();
  }, [error, clearError]);

  const submitForm = async values => {
    try {
      const data = await request('/api/pay', 'POST', values);
      console.log(data);
    } catch (e) {}
  };

  return (
    <div className='wrapper'>
      <Form
        form={form}
        layout='vertical'
        onFinish={values => {
          submitForm(values);
          form.resetFields();
        }}
      >
        <Form.Item
          name='CardNumber'
          label='Card Number'
          validateTrigger='onBlur'
          rules={[
            { whitespace: false },
            {
              validator: (_, value) => {
                if (value && value.match('[0-9]{16}')) {
                  return Promise.resolve();
                }
                return Promise.reject('Номер должен состоять из 16 цифр');
              },
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
              validator: (_, value) => {
                if (value && value.match('(0[1-9]|1[0-2])[/](19|20)[0-9]{2}')) {
                  return Promise.resolve();
                }
                return Promise.reject('Дата должна быть формата 05/2023');
              },
            },
          ]}
        >
          <Input inputMode='numeric' maxLength='7' className='exp-date' placeholder='05/2023'></Input>
        </Form.Item>
        <Form.Item
          name='Cvv'
          label='CVV'
          validateTrigger='onBlur'
          rules={[
            { whitespace: false },
            {
              validator: (_, value) => {
                if (value && value.match('[0-9]{3}')) {
                  return Promise.resolve();
                }
                return Promise.reject('Номер cvv состоит из 3-х цифр');
              },
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
              validator: (_, value) => {
                if (value && value.match('^[0-9]*[1-9][0-9]*$')) {
                  return Promise.resolve();
                }
                return Promise.reject('Здесь должна быть сумма');
              },
            },
          ]}
        >
          <Input maxLength='9' className='amount'></Input>
        </Form.Item>
        <Form.Item shouldUpdate>
          <Button block type='primary' htmlType='submit' disabled={loading}>
            Оплатить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
