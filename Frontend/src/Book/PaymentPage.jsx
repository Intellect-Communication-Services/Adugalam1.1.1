import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";
import './payment.css';

import { useNavigate } from "react-router-dom";
import paypal from "../assets/Symbol.svg";
import apple from "../assets/image copy.png";
import stripe from "../assets/image copy 2.png";
import razor from "../assets/image copy 3.png";

const PAYMENT_METHODS = [     
  { id: "razor", label: "Razor pay", icon: <img src={razor} alt="" /> },
];

const PaymentPage = () => {



const navigate=useNavigate();

  const [method, setMethod] = useState("paypal");

  const price = 20;
  const discount = 2;
  const grandTotal = price - discount;

  const handlePay = () => {
    alert(`Paying ${grandTotal.toFixed(2)} via ${method}`);
  };

  return (
    <div className="payment-page1 text-black">
      <Container fluid className="container1 py-4 px-3 px-lg-5">

        {/* Header */}
        <Row className="row1 align-items-center mb-4">
          <Col xs="auto1">
            <Button
              variant="dark"
              className="rounded-circle1 px-3 py-1 back-btn2"
              onClick={() => window.history.back()}
            >
              &lt;
            </Button>
          </Col>
          <Col className="col1 text-center">
            <h3 className="hlo1 mb-0">Payment</h3>
          </Col>
          <Col xs="auto1" />
        </Row>

        {/* Choose option text */}
        <Row className="row1 mb-3">
          <Col>
            <h4 className="pay1">Choose a option to pay</h4>
            <small className="smalll1">
              You will able to review all the things in next page
            </small>
          </Col>
        </Row>
<br></br>
        {/* Payment options */}
        <Form className="form1">
          {PAYMENT_METHODS.map((m) => (
            <Row className="row101 mb-3" key={m.id}>
              <Col>
                <div
                  className={`payment-option1 d-flex align-items-center ${
                    method === m.id ? "payment-option-active" : ""
                  }`}
                  onClick={() => setMethod(m.id)}
                >
                  <div className="payment-option-left1 d-flex align-items-center">
                    <span className="payment-icon1 me-3">{m.icon}</span>
                    <span className="payment-label1 text-white">
                      {m.label}
                    </span>
                  </div>
                  <div className="ra1 ml-auto">
                    <Form.Check
                      type="radio"
                      name="paymentMethod"
                      checked={method === m.id}
                      onChange={() => setMethod(m.id)}
                      className="payment-radio1"
                    />
                  </div>
                </div>
              </Col>
            </Row>
          ))}
        </Form>

        {/* Payment summary */}
        <Row className="ps1 mt-4 mb-3">
          <Col>
            <h4 className="row11 row1 mb-3">Payment summary</h4>

            <Row className="flex1 mb-1">
              <Col className="payment-head1 text-muted">Price</Col>
              <Col className="payment-price1 text-end1 text-white">
                ${price.toFixed(2)}
              </Col>
            </Row>
            <Row className="flex1 mb-1">
              <Col className="payment-discount1 text-muted">Discount</Col>
              <Col className="payment-price-discount1 payment-price1 col11 text-end1">
                -${discount.toFixed(2)}
              </Col>
            </Row>
             
 <div className="grandcheck1">
  
    <p className="grand-label">Total payment amount</p>
    <h2 className="grand-amount am">$20.00</h2>
  
  
</div>


<div className="grandcheck2">
  <div className="grand-left">
    <p className="grand-label">Grand total</p>
    <h2 className="grand-amount">$20.00</h2>
  </div>
  <button className="checkout-btn-fixed1" onClick={()=>navigate("/summary")}>Pay now</button>
</div>


            
          </Col>
        </Row>

               
      </Container>
    </div>
  );
};

export default PaymentPage;
