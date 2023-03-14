import React from "react";
import { useState, useEffect } from "react";
import CountryCodes from "./CountryCode.json";
import { Button, Col, Form, Select } from "antd";
const { Option } = Select;
const Intl = () => {
  const [data, setData] = useState();
  useEffect(() => {
    setData(CountryCodes);
  }, [CountryCodes]);
  let handelFinish = (value) => {
    console.log(value);
  };
  return (
    <div>
      <Col>
        <Form onFinish={handelFinish}>
          <Form.Item labal="select a country" name="phoneNo">
            <Select>
              {data?.map((value, index) => {
                return <Option value={value?.dial_code}>{value?.name}</Option>;
              })}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit">submit</Button>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
};

export default Intl;
